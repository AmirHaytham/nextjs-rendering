"use client";

import { useActionState } from "react";
import { postMessage, type FormState } from "../actions";

// A Client Component only for the extras: the error message and the
// "Posting..." state. The saving itself still happens on the server.
export function MessageForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(postMessage, {});

  return (
    <form action={formAction} className="space-y-2 rounded border bg-white p-4">
      <input name="name" placeholder="Your name" className="w-full rounded border p-2" />
      <input name="text" placeholder="Your message" className="w-full rounded border p-2" />
      <button disabled={pending} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {pending ? "Posting..." : "Post"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && !pending && <p className="text-sm text-green-700">Posted.</p>}
    </form>
  );
}
