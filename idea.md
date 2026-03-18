# Архив веб-страниц — концепция

Единый сервис для просмотра истории любого сайта через все доступные веб-архивы.

## Проблема
Чтобы найти старую версию сайта, нужно вручную заходить на Wayback Machine, Archive.today,
архив Library of Congress и т.д. — неудобно.

## Решение
Пользователь вводит URL → сервис параллельно опрашивает все архивы → показывает:
- карточки по каждому архиву с количеством снимков и датами
- интерактивную временную шкалу (столбики по годам)
- список ссылок на конкретные снимки с фильтром по году

## Архивы

| Сервис | Способ интеграции |
|--------|-----------------|
| Wayback Machine | CDX API (бесплатный, без регистрации) |
| Archive.today | Только ссылка (нет публичного API) |
| Memento Time Travel | Timemap JSON (агрегирует несколько архивов) |
| Library of Congress | Memento endpoint |
| UK Web Archive | Memento endpoint |
| Arquivo.pt | Memento endpoint |

## Стек
- **Frontend**: Vanilla HTML/CSS/JS, деплой → Cloudflare Pages
- **Backend**: Cloudflare Pages Functions (`/functions/api/search.js`)
  - проксирует запросы к архивам, обходя CORS
  - кэширует ответы через Cloudflare Cache API (TTL 1 час)

## Проект
Реализован в `web-archive-search/`

## Деплой на Cloudflare Pages
```bash
cd web-archive-search
npm install
npx wrangler pages dev public   # локально
npx wrangler pages deploy public # продакшн
```
