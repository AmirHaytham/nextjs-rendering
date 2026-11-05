# 01. CSR vs SSR

From the CSR and SSR slides (pages 005 to 010).

The same three products, from the same slow database (1.5 seconds), rendered
two ways: `/csr` builds the list in the browser, `/ssr` builds it on the server.

## Run it

Install once from the Lab7 folder (see the main README), then here:

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3001
```

In a second terminal:

```bash
npm run compare
```

## Worth showing

**Press Ctrl+U on both pages** and search for "Mechanical keyboard". On `/csr`
it is not there, only "Loading in the browser...". On `/ssr` the whole list is
in the HTML. That is the slide's SEO point: a search engine reading the raw HTML
of the CSR page finds nothing.

**`npm run compare` prints the numbers:**

```
/csr  HTML arrived after   79 ms   products in the HTML: no
/ssr  HTML arrived after 1714 ms   products in the HTML: yes
```

CSR answers fast with an empty page, then makes the user wait for JavaScript
and the API. SSR makes the user wait for the database, then answers complete.
Neither is free.

**The ♥ buttons are hydration.** On `/ssr` the list is visible before the
JavaScript runs, but the buttons only work once it has: the slide's
"non interactive UI" until hydration.

**Look at the build output.** `/csr` is marked `○` (static) and `/ssr` is
`ƒ` (dynamic, rendered on every request).

## What is different from the slides

`/ssr` has `export const instant = false`. Next.js 16 refuses to build a page
that blocks the whole response on slow data unless you say it is on purpose.
It pushes you towards Suspense, which is folder 02.
