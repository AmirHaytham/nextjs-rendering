# 07. Cache Components and Partial Prerendering

Cache Components and PPR are the last item on the agenda slide (page 003), and
the default in every new Next.js app today. This folder shows what they do.

One product page with three kinds of content: product details that are the same
for everyone, a greeting that depends on who you are, and live stock that must
always be fresh.

## Run it

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3007
```

In a second terminal:

```bash
npm run watch
```

## Worth showing

**The page loads in pieces.** The header and the product appear instantly, the
two grey boxes fill in after. Sign in with any name: the greeting changes, the
product part doesn't.

**`npm run watch` times each part:**

```
static shell  at    9 ms
greeting      at   17 ms
stock         at 2019 ms
```

The product details take 500 ms to load, yet they arrive in 9 ms. That cost
was paid once at build time, and the result was saved into the page.

**The build marks the route `◐` (Partial Prerender).** Part of it is a ready
HTML file, the static shell. The rest is holes, one per `<Suspense>`, streamed
on each request. Folder 05 showed pages that are all cached or all fresh. This
is both on the same page.

**Open `_components/parts.tsx` and read the three comments.** Each part says
which kind it is and why:

- `"use cache"` means static, in the shell.
- `cookies()` means it depends on the visitor, so it's a hole.
- `connection()` means it must be fresh, so it's a hole.

**This is why the earlier folders kept hitting Suspense rules.** With Cache
Components on, every piece of a page has to be either cached or inside
`<Suspense>`. Next.js checks it at build time, so a slow, uncached piece can
never silently block the whole page.
