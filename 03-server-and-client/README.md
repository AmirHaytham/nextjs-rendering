# 03. Server and Client Components (RSC)

From the React Server Components slide (page 012).

A grades table that reads the "database" directly (a Server Component), inside
a highlight toggle that needs a click handler (a Client Component).

## Run it

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3003
```

Then check what reached the browser:

```bash
npm run check-bundle
```

## Worth showing

**`npm run check-bundle`** searches every JavaScript file the browser can
download:

```
Client Component code  FOUND, sent to the browser
Server Component code  not there
Database password      not there
```

That is the slide's "stays on server and never downloaded to client", proven.
The table's HTML reaches the browser, its code and the password don't.

**Where does each `console.log` print?** Run `npm run build` and read its
output: both components log there, because the server renders the page once to
make the HTML. Then open the page with the browser console open: only
`HighlightToggle` logs there. The Client Component ran on the server once (the
slide's "can be executed once on server") and again in the browser. The Server
Component never runs in the browser at all.

**The table needs no API.** `grades-table.tsx` calls `getGrades()` like any
function. No `fetch`, no route handler, no `useEffect`. That is the slide's
"direct access to server side resources".

**`children` is the trick that mixes them.** The page passes the Server
Component into the Client Component as `children`. If the Client Component
imported it instead, it would quietly turn into client code and be sent to the
browser. Passed as `children`, it stays on the server.

**`import "server-only"`** at the top of `_lib/db.ts` makes it impossible to
use the database from a Client Component by accident. Try importing `getGrades`
inside `highlight-toggle.tsx` and run `npm run build`: it fails with a clear
message.
