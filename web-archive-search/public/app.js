/* ─── Translations ───────────────────────────────────────────────────────── */

const LANGS = {
  en: {
    badge: 'Web Archive Search',
    title: 'History&nbsp;of&nbsp;any&nbsp;website<br>in&nbsp;one&nbsp;click',
    subtitle: 'Enter a URL — we check Wayback Machine, Archive.today,<br class="br-desk"> Library of Congress and other archives simultaneously',
    placeholder: 'example.com or https://example.com',
    searchBtn: 'Search',
    examplesLabel: 'Try:',
    stat1: 'pages in archives',
    stat2: 'archives searched',
    stat3: 'WM founded',
    stat4: 'completely free',
    howTitle: 'How it works',
    how1title: 'Enter website URL',
    how1text: 'Paste a URL into the search bar — with or without the protocol',
    how2title: 'We search all archives',
    how2text: 'Simultaneously query Wayback Machine, LoC, UK National Archives and Arquivo.pt',
    how3title: 'Choose a snapshot',
    how3text: 'View the timeline, filter by year, open the archived copy',
    ucTitle: 'Who benefits',
    uc1title: 'Journalists',
    uc1text: 'Check what a site published a year or a decade ago. Find deleted articles',
    uc2title: 'Lawyers',
    uc2text: 'Capture page content as evidence. Track changes over time',
    uc3title: 'Developers',
    uc3text: 'Recover lost code. Study how competitor designs evolved over time',
    uc4title: 'Researchers',
    uc4text: 'Track the evolution of web resources. Analyze historical data',
    archivesTitle: 'Supported archives',
    archiveSub2: 'precise page copies',
    archiveSub3: 'US archive',
    archiveSub4: 'UK gov archive',
    archiveSub5: 'Portugal archive',
    foundIn: n => `found in ${n} archives`,
    timelineTitle: 'Snapshots by year — Wayback Machine',
    snapshotsTitle: 'All snapshots',
    snapshotsAll: 'All',
    noData: 'No snapshots for the selected period',
    serviceOpenLink: 'Open in archive ↗',
    serviceNoData: 'no data',
    loading: 'Querying archives…',
    ctaTitle: 'Need web development or custom tools?',
    ctaText: 'We build high-performance web products and SEO solutions. Ivatech agency is available for new projects on Upwork.',
    ctaBtn: 'Work with Ivatech on Upwork',
    footerText: 'Aggregates data from open archives:',
    turnstileError: 'Complete the security check below',
  },
  uk: {
    badge: 'Пошук в веб-архівах',
    title: 'Історія&nbsp;будь-якого&nbsp;сайту<br>в&nbsp;один&nbsp;клік',
    subtitle: 'Введіть адресу — перевіримо Wayback Machine, Archive.today,<br class="br-desk"> Library of Congress та інші архіви одночасно',
    placeholder: 'example.com або https://example.com',
    searchBtn: 'Знайти',
    examplesLabel: 'Спробуйте:',
    stat1: 'сторінок в архівах',
    stat2: 'архіви в пошуку',
    stat3: 'рік заснування WM',
    stat4: 'повністю безкоштовно',
    howTitle: 'Як це працює',
    how1title: 'Введіть адресу сайту',
    how1text: 'Вставте URL у рядок пошуку — з протоколом або без нього',
    how2title: 'Паралельний пошук по архівах',
    how2text: 'Одночасно запитуємо Wayback Machine, LoC, UK National Archives та Arquivo.pt',
    how3title: 'Оберіть потрібний знімок',
    how3text: 'Переглядайте шкалу часу, фільтруйте за роком, відкривайте архівну копію',
    ucTitle: 'Кому це корисно',
    uc1title: 'Журналістам',
    uc1text: 'Перевіряйте, що писав сайт рік або десять років тому. Знаходьте видалені матеріали',
    uc2title: 'Юристам',
    uc2text: 'Фіксуйте вміст сторінок як докази. Відстежуйте історію змін',
    uc3title: 'Розробникам',
    uc3text: 'Відновлюйте втрачений код. Вивчайте як змінювався дизайн конкурентів',
    uc4title: 'Дослідникам',
    uc4text: 'Відстежуйте еволюцію веб-ресурсів. Аналізуйте історичні дані',
    archivesTitle: 'Підтримувані архіви',
    archiveSub2: 'точні копії сторінок',
    archiveSub3: 'архів США',
    archiveSub4: 'архів уряду UK',
    archiveSub5: 'архів Португалії',
    foundIn: n => `знайдено в ${n} архівах`,
    timelineTitle: 'Знімки за роками — Wayback Machine',
    snapshotsTitle: 'Всі знімки',
    snapshotsAll: 'Всі',
    noData: 'Немає знімків за вибраний період',
    serviceOpenLink: 'Відкрити в архіві ↗',
    serviceNoData: 'немає даних',
    loading: 'Запитуємо архіви…',
    ctaTitle: 'Потрібна веб-розробка або інструменти під замовлення?',
    ctaText: 'Ми створюємо високопродуктивні веб-продукти та SEO-рішення. Агентство Ivatech відкрите до нових проєктів на Upwork.',
    ctaBtn: 'Співпрацювати з Ivatech на Upwork',
    footerText: 'Агрегує дані з відкритих архівів:',
    turnstileError: 'Пройдіть перевірку безпеки нижче',
  },
  ru: {
    badge: 'Поиск по веб-архивам',
    title: 'История&nbsp;любого&nbsp;сайта<br>в&nbsp;один&nbsp;клик',
    subtitle: 'Введите адрес — проверим Wayback Machine, Archive.today,<br class="br-desk"> Library of Congress и другие архивы одновременно',
    placeholder: 'example.com или https://example.com',
    searchBtn: 'Найти',
    examplesLabel: 'Попробуйте:',
    stat1: 'страниц в архивах',
    stat2: 'архивов в поиске',
    stat3: 'год основания WM',
    stat4: 'полностью бесплатно',
    howTitle: 'Как это работает',
    how1title: 'Введите адрес сайта',
    how1text: 'Вставьте URL в строку поиска — с протоколом или без него',
    how2title: 'Параллельный поиск по архивам',
    how2text: 'Одновременно запрашиваем Wayback Machine, LoC, UK National Archives и Arquivo.pt',
    how3title: 'Выберите нужный снимок',
    how3text: 'Смотрите временну́ю шкалу, фильтруйте по году, открывайте архивную копию',
    ucTitle: 'Кому это полезно',
    uc1title: 'Журналистам',
    uc1text: 'Проверяйте, что писал сайт год или десять лет назад. Находите удалённые материалы',
    uc2title: 'Юристам',
    uc2text: 'Фиксируйте содержимое страниц как доказательства. Отслеживайте историю изменений',
    uc3title: 'Разработчикам',
    uc3text: 'Восстанавливайте потерянный код. Изучайте как менялся дизайн конкурентов',
    uc4title: 'Исследователям',
    uc4text: 'Отслеживайте эволюцию веб-ресурсов. Анализируйте исторические данные',
    archivesTitle: 'Поддерживаемые архивы',
    archiveSub2: 'точные копии страниц',
    archiveSub3: 'архив США',
    archiveSub4: 'архив правительства UK',
    archiveSub5: 'архив Португалии',
    foundIn: n => `найдено в ${n} архивах`,
    timelineTitle: 'Снимки по годам — Wayback Machine',
    snapshotsTitle: 'Все снимки',
    snapshotsAll: 'Все',
    noData: 'Нет снимков за выбранный период',
    serviceOpenLink: 'Открыть в архиве ↗',
    serviceNoData: 'нет данных',
    loading: 'Запрашиваем архивы…',
    ctaTitle: 'Нужна веб-разработка или инструменты под заказ?',
    ctaText: 'Мы создаём высокопроизводительные веб-продукты и SEO-решения. Агентство Ivatech открыто для новых проектов на Upwork.',
    ctaBtn: 'Сотрудничать с Ivatech на Upwork',
    footerText: 'Агрегирует данные из открытых архивов:',
    turnstileError: 'Пройдите проверку безопасности ниже',
  },
};

/* ─── State ──────────────────────────────────────────────────────────────── */

let currentData  = null;
let activeYear   = null;
let lang         = localStorage.getItem('lang') || 'en';
let turnstileId  = null;

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function t(key) {
  return LANGS[lang]?.[key] ?? LANGS.en[key] ?? key;
}

/* ─── DOM refs ───────────────────────────────────────────────────────────── */

const html          = document.documentElement;
const hero          = document.getElementById('hero');
const marketing     = document.getElementById('marketing');
const searchInput   = document.getElementById('searchInput');
const searchBtn     = document.getElementById('searchBtn');
const loading       = document.getElementById('loading');
const errorMsg      = document.getElementById('errorMsg');
const results       = document.getElementById('results');
const resultsUrl    = document.getElementById('resultsUrl');
const resultsSub    = document.getElementById('resultsSub');
const servicesGrid  = document.getElementById('servicesGrid');
const timeline      = document.getElementById('timeline');
const snapshotsFilter = document.getElementById('snapshotsFilter');
const snapshotsList   = document.getElementById('snapshotsList');
const themeToggle   = document.getElementById('themeToggle');
const langSwitcher  = document.getElementById('langSwitcher');

/* ─── Theme ──────────────────────────────────────────────────────────────── */

function initTheme() {
  const saved = localStorage.getItem('theme');
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  html.dataset.theme = saved || preferred;
}

themeToggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('theme', next);
});

/* ─── i18n ───────────────────────────────────────────────────────────────── */

function applyLang() {
  // Update <html lang>
  html.lang = lang;

  // Update all [data-i18n] elements (textContent)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (typeof val === 'string') el.textContent = val;
  });

  // Update all [data-i18n-html] elements (innerHTML — for <br> in titles)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (typeof val === 'string') el.innerHTML = val;
  });

  // Update search input placeholder
  searchInput.placeholder = t('placeholder');

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render dynamic sections if results are visible
  if (results.classList.contains('active') && currentData) {
    renderResults(currentData);
  }
}

langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    lang = btn.dataset.lang;
    localStorage.setItem('lang', lang);
    applyLang();
  });
});

/* ─── Turnstile ──────────────────────────────────────────────────────────── */

window.onTurnstileLoad = function () {
  turnstileId = turnstile.render('#cfTurnstile', {
    sitekey: '0x4AAAAAACFyt9G84DsGoeqJ',
    theme: 'auto',
    size: 'compact',
  });
};

/* ─── Init ───────────────────────────────────────────────────────────────── */

initTheme();
applyLang();

searchBtn.addEventListener('click', onSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') onSearch(); });

document.querySelectorAll('.example-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    searchInput.value = btn.dataset.url;
    onSearch();
  });
});

const initUrl = new URLSearchParams(location.search).get('q');
if (initUrl) {
  searchInput.value = initUrl;
  // Don't auto-search: Turnstile token is required
}

/* ─── Search ─────────────────────────────────────────────────────────────── */

async function onSearch() {
  const raw = searchInput.value.trim();
  if (!raw) return;
  history.pushState({}, '', `?q=${encodeURIComponent(raw)}`);
  doSearch(raw);
}

async function doSearch(url) {
  const token = (turnstileId != null && typeof turnstile !== 'undefined')
    ? turnstile.getResponse(turnstileId)
    : null;

  if (!token) {
    setError(t('turnstileError'));
    return;
  }

  setLoading(true);
  setError(null);
  hideResults();

  try {
    const res = await fetch(`/api/search?url=${encodeURIComponent(url)}&turnstile=${encodeURIComponent(token)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request error');
    currentData = data;
    renderResults(data);
  } catch (err) {
    setError(err.message || 'Failed to fetch data. Please try again.');
  } finally {
    setLoading(false);
    if (turnstileId != null && typeof turnstile !== 'undefined') {
      turnstile.reset(turnstileId);
    }
  }
}

/* ─── Render ─────────────────────────────────────────────────────────────── */

function renderResults(data) {
  hero.classList.add('compact');
  marketing.style.display = 'none';
  results.classList.add('active');

  resultsUrl.textContent = data.url;
  const found = data.services.filter(s => s.hasData && s.totalSnapshots !== null).length;
  resultsSub.textContent = typeof t('foundIn') === 'function'
    ? t('foundIn')(found)
    : t('foundIn');

  renderServiceCards(data.services);

  const wayback = data.services.find(s => s.id === 'wayback');
  if (wayback?.snapshots?.length > 0) {
    renderTimeline(wayback.snapshots);
    renderSnapshotList(wayback.snapshots, null);
    document.querySelector('.timeline-section').style.display = '';
    document.querySelector('.snapshots-section').style.display = '';
  } else {
    document.querySelector('.timeline-section').style.display = 'none';
    document.querySelector('.snapshots-section').style.display = 'none';
  }
}

function renderServiceCards(services) {
  servicesGrid.innerHTML = services.map(s => {
    const hasCount   = s.totalSnapshots != null;
    const isLinkOnly = s.hasData && !hasCount;

    return `
      <a href="${s.searchUrl}" target="_blank" rel="noopener"
         class="service-card${(!s.hasData && !isLinkOnly) ? ' no-data' : ''}"
         style="--service-color:${s.color}">
        <div class="service-name"><span class="service-dot"></span>${s.name}</div>
        <div class="service-desc">${s.description}</div>
        ${s.hasData && hasCount ? `
          <div class="service-stats">
            <div class="service-count">${formatCount(s.totalSnapshots)}<small>${lang === 'en' ? 'snapshots' : lang === 'uk' ? 'знімків' : 'снимков'}</small></div>
            ${s.firstSeen ? `<div class="service-dates">${s.firstSeen} — ${s.lastSeen}</div>` : ''}
          </div>
        ` : isLinkOnly ? `
          <div class="service-link">${t('serviceOpenLink')}</div>
        ` : `
          <div class="service-nodata">${t('serviceNoData')}</div>
        `}
        <span class="service-arrow">→</span>
      </a>`;
  }).join('');
}

function renderTimeline(snapshots) {
  const byYear  = groupByYear(snapshots);
  const years   = Object.keys(byYear).sort();
  const maxCount = Math.max(...Object.values(byYear));

  timeline.innerHTML = years.map(year => {
    const h = Math.max(8, Math.round((byYear[year] / maxCount) * 100));
    return `
      <div class="timeline-bar" data-year="${year}" title="${year}: ${byYear[year]}">
        <div class="timeline-bar-inner" style="height:${h}%"></div>
        <div class="timeline-label">${year}</div>
      </div>`;
  }).join('');

  timeline.querySelectorAll('.timeline-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      const year = bar.dataset.year;
      if (activeYear === year) {
        activeYear = null;
        syncFilters('all');
        renderSnapshotList(snapshots, null);
      } else {
        activeYear = year;
        syncFilters(year);
        renderSnapshotList(snapshots, year);
      }
    });
  });

  renderYearFilter(years, snapshots);
}

function renderYearFilter(years, snapshots) {
  snapshotsFilter.innerHTML = [
    `<button class="filter-btn active" data-year="all" onclick="filterByYear('all')">${t('snapshotsAll')}</button>`,
    ...years.map(y => `<button class="filter-btn" data-year="${y}" onclick="filterByYear('${y}')">${y}</button>`),
  ].join('');
}

function syncFilters(year) {
  document.querySelectorAll('.timeline-bar').forEach(b => b.classList.toggle('active', b.dataset.year === year));
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.year === year));
}

function filterByYear(year) {
  const wayback = currentData?.services?.find(s => s.id === 'wayback');
  if (!wayback) return;
  activeYear = year === 'all' ? null : year;
  syncFilters(year);
  renderSnapshotList(wayback.snapshots, activeYear);
}
window.filterByYear = filterByYear;

function renderSnapshotList(snapshots, year) {
  const filtered = year ? snapshots.filter(s => s.date.startsWith(year)) : snapshots;
  if (filtered.length === 0) {
    snapshotsList.innerHTML = `<div class="snapshots-empty">${t('noData')}</div>`;
    return;
  }
  snapshotsList.innerHTML = filtered.slice(0, 200).map(s => `
    <a href="${s.viewUrl}" target="_blank" rel="noopener" class="snapshot-item">
      <span class="snapshot-date">${s.date}</span>
      <span class="snapshot-icon">↗</span>
    </a>`).join('');
}

/* ─── UI helpers ─────────────────────────────────────────────────────────── */

function setLoading(on) {
  loading.classList.toggle('active', on);
  searchBtn.disabled = on;
  searchBtn.classList.toggle('is-loading', on);
}

function setError(msg) {
  errorMsg.classList.toggle('active', !!msg);
  errorMsg.textContent = msg || '';
}

function hideResults() {
  results.classList.remove('active');
  hero.classList.remove('compact');
  marketing.style.display = '';
  activeYear = null;
}

function groupByYear(snapshots) {
  return snapshots.reduce((acc, s) => {
    const y = s.date.slice(0, 4);
    acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
  return String(n);
}
