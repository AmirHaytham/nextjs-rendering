# 02. Streaming with Suspense

From the "all or nothing waterfall" and Suspense SSR slide (page 011).

The slide's layout, a header, a sidebar, the main content and a footer, built
twice. The data takes 0.5 seconds for the footer, 1 for the sidebar and 3 for
the main content.

## Run it

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3002
```

In a second terminal:

```bash
npm run watch
```

## Worth showing

**Open `/blocking`, then `/streaming`.** The first is a white screen for three
seconds, then everything at once. The second shows the header and three
spinners immediately, then fills each one in as its data arrives.

**`npm run watch` reads both pages as they download:**

```
/blocking   everything arrives at 3127 ms
/streaming  Header 32 ms, Footer 548 ms, Sidebar 1047 ms, Main 3046 ms
```

Same data, same server, same total time. The only change is `<Suspense>`
around each slow part. That is the slide's "HTML streaming on server".

**Selective hydration.** On `/streaming`, React hydrates each streamed part on
its own instead of the whole page at once, so a part can become interactive
before the slowest one arrives. Try clicking the sidebar button while the main
content is still spinning. That is the slide's second Suspense feature.

**Open the two `page.tsx` files side by side.** The only difference is the
`<Suspense fallback={...}>` wrappers. The components inside are identical.

## What is different from the slides

The slide uses `lazy()` for the main content. In Next.js you don't need it:
Server Components already arrive as separate streamed pieces, so `<Suspense>`
on its own is enough.
