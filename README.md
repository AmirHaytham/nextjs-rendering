# Next.js rendering

Examples for Tutorial 7: every rendering mode on the agenda slide, each one a
small Next.js app you can run, measure and compare.

## Install once

All seven apps share one `node_modules` in this folder, so there is a single
install:

```bash
npm install
```

Then go into any folder and use its own commands. Every app has a fixed port.

## The folders

| # | Folder | Slides | Port |
|---|---|---|---|
| 01 | `01-csr-vs-ssr` | CSR, SSR, hydration (005 to 010) | 3001 |
| 02 | `02-streaming` | All or nothing waterfall, Suspense SSR (011) | 3002 |
| 03 | `03-server-and-client` | React Server Components (012) | 3003 |
| 04 | `04-server-actions` | Server Actions (agenda) | 3004 |
| 05 | `05-ssg-and-isr` | SSG, ISR, decision matrix (013 to 018) | 3005 |
| 06 | `06-on-demand-revalidation` | On-demand revalidation (agenda) | 3006 |
| 07 | `07-partial-prerendering` | Cache Components, PPR (agenda) | 3007 |

Inside a folder:

```bash
npm run build
```

```bash
npm start
```

Always build and start for this lab, not `npm run dev`. In dev mode Next.js
rebuilds every page on every request, so SSG, ISR and caching look exactly
like SSR.

Most folders also have a script that measures what the browser receives
(`npm run compare`, `npm run watch`, `npm run check-bundle`). Each README says
which.

## All seven at once

```bash
node run-all.js
```

Builds every app, then starts all of them on ports 3001 to 3007. Each line of
output is tagged with its folder number. Ctrl+C stops them all. Only some:

```bash
node run-all.js 05 06
```

## The decision matrix, in Next.js 16

The decision matrix slide uses `revalidate: false` and `revalidate: N`, the
older way of configuring caching. `create-next-app` now turns on Cache
Components, where the same choices are written like this:

| Slide | When | Next.js 16 | Folder |
|---|---|---|---|
| SSG, `revalidate: false` | Content never changes | `"use cache"` + `cacheLife("max")` | 05 |
| ISR, `revalidate: N` | Changes sometimes, high traffic, a little stale is fine | `"use cache"` + `cacheLife({ revalidate: N })` | 05 |
| SSR, no revalidate | Real-time, personal, must be exact | no cache, `await connection()` or `cookies()` inside `<Suspense>` | 05, 07 |
| CSR, Client Component | Behind login, no SEO, very interactive | `"use client"` + `useEffect` | 01 |
| On-demand | The data changed, clear the cache now | `revalidateTag` or `updateTag` in a Server Action | 06 |

## Things the examples caught

- The slide's `export const revalidate = 10` fails `npm run build` in a new
  app: "Route segment config revalidate is not compatible with cacheComponents".
  Caching is now `"use cache"` and `cacheLife`. Folder 05.
- A page that waits for slow data with no `<Suspense>` fails `npm run build`
  unless it says `export const instant = false`. Folders 01 and 02.
- Caching does nothing in `npm run dev`. Every demo here needs a build.
- The slide's `lazy()` for streaming is not needed in Next.js, Suspense alone
  does it. Folder 02.

## Suggested order for a live session

1. **01** CSR vs SSR: Ctrl+U on both pages.
2. **02** the white screen, then streaming.
3. **03** what reaches the browser: `npm run check-bundle`.
4. **05** SSG, ISR and SSR side by side: `npm run watch`.
5. **06** the price that won't update, then the fix.
6. **07** everything on one page.
7. **04** if there is time.

Short on time? The spine is **01, 02, 05**.
