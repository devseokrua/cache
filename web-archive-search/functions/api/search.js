/**
 * Cloudflare Pages Function — /api/search?url=example.com
 * Queries Wayback Machine (full snapshots) + direct CDX for other archives.
 */

const CACHE_TTL = 3600; // 1 hour

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; web-archive-search/1.0)',
};

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const rawUrl = url.searchParams.get('url');

  if (!rawUrl) return jsonResponse({ error: 'Missing url parameter' }, 400);

  const cleanUrl = normalizeUrl(rawUrl);
  if (!cleanUrl) return jsonResponse({ error: 'Invalid URL' }, 400);

  // Turnstile verification
  const turnstileToken = url.searchParams.get('turnstile');
  if (!turnstileToken) return jsonResponse({ error: 'Security verification required' }, 400);
  const secret = context.env?.TURNSTILE_SECRET ?? '0x4AAAAAACFyt2ZktPhBpEeVuxOzU1q5yU8';
  const verified = await verifyTurnstile(turnstileToken, request.headers.get('CF-Connecting-IP') || '', secret);
  if (!verified) return jsonResponse({ error: 'Security verification failed. Please reload and try again.' }, 403);

  // Cloudflare cache
  const cacheKey = new Request(`https://cache.internal/archive/v3/${encodeURIComponent(cleanUrl)}`);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  // Fetch all archives in parallel with per-source timeouts
  const [waybackRes, locRes, ukRes, ptRes] = await Promise.allSettled([
    withTimeout(fetchWayback(cleanUrl), 20000),
    withTimeout(fetchCdx(`https://webarchive.loc.gov/cdx/search/cdx?url=${encodeURIComponent(cleanUrl)}&output=json&fl=timestamp&collapse=timestamp:6&limit=200&filter=statuscode:200`), 8000),
    withTimeout(fetchCdx(`https://www.webarchive.org.uk/wayback/archive/cdx?url=${encodeURIComponent(cleanUrl)}&output=json&fl=timestamp&collapse=timestamp:6&limit=200&filter=statuscode:200`), 8000),
    withTimeout(fetchCdx(`https://arquivo.pt/cdx?url=${encodeURIComponent(cleanUrl)}&output=json&fl=timestamp&collapse=timestamp:6&limit=200&statuscode=200`), 8000),
  ]);

  const wayback = waybackRes.status === 'fulfilled' ? waybackRes.value : null;
  const loc     = locRes.status === 'fulfilled' ? locRes.value : null;
  const uk      = ukRes.status === 'fulfilled' ? ukRes.value : null;
  const pt      = ptRes.status === 'fulfilled' ? ptRes.value : null;

  const services = buildServices(cleanUrl, { wayback, loc, uk, pt });
  const result = { url: cleanUrl, services };

  const response = jsonResponse(result, 200);

  // Only cache if at least Wayback Machine responded with data
  const hasAnyData = !!wayback && wayback.total > 0;
  if (hasAnyData) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
    context.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}

// ─── Wayback Machine CDX — parallel fast+full fetch ──────────────────────────

async function fetchWayback(url) {
  const base = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&output=json&fl=timestamp`;

  // Run all in parallel: fast first/last, full timeline (no status filter = faster),
  // and Availability API as independent fallback
  const [firstRes, lastRes, fullRes, availRes] = await Promise.allSettled([
    withTimeout(fetchCdxRaw(`${base}&limit=1`), 15000),
    withTimeout(fetchCdxRaw(`${base}&limit=1&reverse=true`), 15000),
    withTimeout(fetchCdxRaw(`${base}&collapse=timestamp:6&limit=500`), 18000),
    withTimeout(fetchAvailability(url), 8000),
  ]);

  const firstRow = firstRes.status === 'fulfilled' ? firstRes.value : null;
  const lastRow  = lastRes.status  === 'fulfilled' ? lastRes.value  : null;
  const fullRows = fullRes.status  === 'fulfilled' ? fullRes.value  : null;
  const avail    = availRes.status === 'fulfilled' ? availRes.value : null;

  // Build snapshot list from full data if available
  let snapshots;
  if (fullRows && fullRows.length > 1) {
    snapshots = fullRows.slice(1).map(([ts]) => makeSnap(ts, url));
  }

  // Take true min/max across all sources — fullRows may be truncated so
  // limit=1 queries are more authoritative when they succeed
  const firstCandidates = [firstRow?.[1]?.[0], fullRows?.[1]?.[0], avail].filter(Boolean);
  const lastCandidates  = [lastRow?.[1]?.[0], fullRows?.[fullRows?.length - 1]?.[0]].filter(Boolean);
  const firstTs = firstCandidates.length ? firstCandidates.sort()[0]     : null;
  const lastTs  = lastCandidates.length  ? lastCandidates.sort().at(-1)  : firstTs;

  if (!firstTs) return { snapshots: [], total: 0 };

  if (!snapshots) {
    snapshots = [...new Set([firstTs, lastTs].filter(Boolean))].map(ts => makeSnap(ts, url));
  }

  return {
    total: snapshots.length,
    firstSeen: formatTimestamp(firstTs),
    lastSeen: formatTimestamp(lastTs),
    snapshots,
    partial: !fullRows,
  };
}

function makeSnap(timestamp, url) {
  return {
    timestamp,
    date: formatTimestamp(timestamp),
    viewUrl: `https://web.archive.org/web/${timestamp}/${url}`,
  };
}

// Raw CDX fetch — returns parsed JSON rows or throws
async function fetchCdxRaw(cdxUrl) {
  const res = await fetch(cdxUrl, { headers: HEADERS });
  if (!res.ok) throw new Error(`CDX ${res.status}`);
  return res.json();
}

// Wayback Availability API — fast single-snapshot check, returns timestamp or null
async function fetchAvailability(url) {
  try {
    const res = await withTimeout(
      fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, { headers: HEADERS }),
      8000,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.archived_snapshots?.closest?.timestamp ?? null;
  } catch {
    return null;
  }
}

// ─── Generic CDX query (for LoC, UK, Arquivo.pt) ─────────────────────────────

async function fetchCdx(cdxUrl) {
  let rows;
  try { rows = await fetchCdxRaw(cdxUrl); } catch { return null; }
  if (!Array.isArray(rows) || rows.length < 2) return null;
  const timestamps = rows.slice(1).map(r => r[0]);
  return {
    total: timestamps.length,
    firstSeen: formatTimestamp(timestamps.at(0)),
    lastSeen: formatTimestamp(timestamps.at(-1)),
  };
}

// ─── Build unified service list ───────────────────────────────────────────────

function buildServices(url, { wayback, loc, uk, pt }) {
  return [
    {
      id: 'wayback',
      name: 'Wayback Machine',
      description: 'Internet Archive — крупнейший веб-архив с 1996 года',
      color: '#1a73e8',
      hasData: !!wayback && wayback.total > 0,
      totalSnapshots: wayback?.total ?? 0,
      firstSeen: wayback?.firstSeen ?? null,
      lastSeen: wayback?.lastSeen ?? null,
      searchUrl: `https://web.archive.org/web/*/${url}`,
      snapshots: wayback?.snapshots ?? [],
    },
    {
      id: 'archive_today',
      name: 'Archive.today',
      description: 'Точные копии страниц с отображением CSS и JavaScript',
      color: '#c0392b',
      hasData: true, // always linkable
      totalSnapshots: null,
      firstSeen: null,
      lastSeen: null,
      searchUrl: `https://archive.ph/${url}`,
      snapshots: [],
    },
    {
      id: 'loc',
      name: 'Library of Congress',
      description: 'Веб-архив Библиотеки Конгресса США',
      color: '#8e44ad',
      hasData: !!loc,
      totalSnapshots: loc?.total ?? null,
      firstSeen: loc?.firstSeen ?? null,
      lastSeen: loc?.lastSeen ?? null,
      searchUrl: `https://webarchive.loc.gov/all/*/${url}`,
      snapshots: [],
    },
    {
      id: 'uk',
      name: 'UK Web Archive',
      description: 'Архив Британской библиотеки',
      color: '#16a085',
      hasData: !!uk,
      totalSnapshots: uk?.total ?? null,
      firstSeen: uk?.firstSeen ?? null,
      lastSeen: uk?.lastSeen ?? null,
      searchUrl: `https://www.webarchive.org.uk/wayback/archive/*/${url}`,
      snapshots: [],
    },
    {
      id: 'pt',
      name: 'Arquivo.pt',
      description: 'Национальный веб-архив Португалии',
      color: '#e67e22',
      hasData: !!pt,
      totalSnapshots: pt?.total ?? null,
      firstSeen: pt?.firstSeen ?? null,
      lastSeen: pt?.lastSeen ?? null,
      searchUrl: `https://arquivo.pt/wayback/*/${url}`,
      snapshots: [],
    },
  ];
}

// ─── Turnstile verification ───────────────────────────────────────────────────

async function verifyTurnstile(token, ip, secret) {
  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const res = await withTimeout(
      fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form }),
      5000,
    );
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

// ─── Timeout helper ───────────────────────────────────────────────────────────

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms);
    promise.then(
      v => { clearTimeout(timer); resolve(v); },
      e => { clearTimeout(timer); reject(e); },
    );
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeUrl(input) {
  const s = input.trim().replace(/^https?:\/\//, '').replace(/^www\./, '');
  if (!s.includes('.') || s.length < 3) return null;
  return s;
}

function formatTimestamp(ts) {
  if (!ts || ts.length < 6) return ts ?? null;
  return `${ts.slice(0, 4)}-${ts.slice(4, 6)}`;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
