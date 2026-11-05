# 06. On-demand revalidation

On-demand revalidation is on the agenda slide (page 003). This folder shows it,
starting from the slide's ISR horror story: the price changed in the database,
and the website still shows the old one.

`/product` is cached forever, like SSG, and tagged `"price"`. `/admin` changes
the price three different ways.

## Run it

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3006/admin
```

Keep `/product` open in a second tab and refresh it after each button.

## Worth showing

Start at $100, and refresh `/product` twice after each button:

| Button | Visit 1 | Visit 2 |
|---|---|---|
| 1. Change the database only (80) | $100 | $100, forever |
| 2. Change + `revalidateTag` (70) | $100 | $70 |
| 3. Change + `updateTag` (60) | $60 | $60 |

**Button 1 is the slide's horror story.** The database says 80, the page says
100, and it stays that way until the next build. Caching without a way to clear
it.

**Button 2 is ISR, but on demand.** The cache is marked stale the moment the
data changes, instead of waiting for a timer. One more visitor gets the old
page while the new one is built.

**Button 3 is "read your own writes".** The cache is thrown away at once, so
the very next visit waits for a fresh page. Use it when the person who made the
change must see it immediately, like an admin editing a product.

**Open `admin/actions.ts`.** The three functions differ by one line each.
