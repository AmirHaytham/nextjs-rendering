# 04. Server Actions

Server Actions are on the agenda slide (page 003). This folder is the example
for them.

A guestbook where posting and deleting call functions that run on the server.
There is no API route anywhere in the app.

## Run it

```bash
npm run build
```

```bash
npm start
```

```
http://localhost:3004
```

Messages are kept in memory, so they disappear when the server restarts.

## Worth showing

**Open `actions.ts`.** `"use server"` at the top makes every function in it a
Server Action. The form calls `postMessage` directly. Next.js turns that into a
request to the server for you: no `fetch`, no route, no JSON.

**Click Post with empty fields.** The error comes from the server. Validation
always has to live on the server, because the browser can be skipped.

**Post a message.** The button says "Posting..." (from `useActionState`), then
the list updates without a page reload, because the action calls `refresh()`.

**Delete has no JavaScript of its own.** `message-list.tsx` is a Server
Component with a plain `<form>`. Server Action forms are submitted even before
the page's JavaScript has loaded.

**Compare with Lab 1.** There, the same feature needed an Express route, a
`fetch` call and state to hold the result. Here it is one function.
