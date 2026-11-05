# 05. SSG, ISR and SSR

From the SSG and ISR slides (pages 013 to 017).

Three pages showing the price of one product. The "database" price drops by $5
every 10 seconds, so you can watch which page notices.

## Run it

Caching only happens in production, so always build first:

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3005
```

In a second terminal:

```bash
npm run watch
```

## Worth showing

**The build output already tells the story.** Next to each route:

```
○ /isr    Revalidate 10s   Expire 1h
○ /ssg    Revalidate 30d   Expire 1y
◐ /ssr
```

**`npm run watch` visits all three every 4 seconds:**

```
time     | /ssg              | /isr              | /ssr
22:25:56 | $75 built 22:24:14 | $80 built 22:25:47 | $75 built 22:25:57 (335 ms)
22:26:01 | $75 built 22:24:14 | $80 built 22:25:47 | $70 built 22:26:01 (329 ms)
22:26:05 | $75 built 22:24:14 | $70 built 22:26:01 | $70 built 22:26:05 (325 ms)
```

- **SSG** never changes. Built at `npm run build`, served as a file, about 15 ms.
- **SSR** is always right, and pays the 300 ms query on every single request.
- **ISR** is as fast as SSG and catches up every 10 seconds. Look at 22:26:01:
  the page was too old, but that visitor still got the old copy ($80) and their
  visit triggered a rebuild. The next visitor got the new one. That is the
  slide's "User C gets stale data, User D gets the new version".

## What is different from the slides

The decision matrix says `revalidate: false` and `revalidate: N`. That is
`export const revalidate = 10` at the top of a page. In a new app it breaks the
build: "Route segment config revalidate is not compatible with
nextConfig.cacheComponents", and `create-next-app` turns Cache Components on.
The same ideas are now written as:

| Slide | Next.js 16 |
|---|---|
| SSG, `revalidate: false` | `"use cache"` + `cacheLife("max")` |
| ISR, `revalidate: 10` | `"use cache"` + `cacheLife({ revalidate: 10 })` |
| SSR, no revalidate | no `"use cache"`, and `await connection()` |

Profiles like `cacheLife("hours")` or `cacheLife("days")` cover the usual cases.
