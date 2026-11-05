"use server";

// Every function in this file runs on the server, even when a form in the
// browser calls it. Next.js makes the network request for you: no API route,
// no fetch, no JSON.
import { refresh } from "next/cache";
import { removeMessage, saveMessage } from "./_lib/messages";

export type FormState = { error?: string; ok?: boolean };

export async function postMessage(_previous: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();

  // Always validate on the server. The browser can be bypassed.
  if (!name || !text) return { error: "Name and message are both required." };
  if (text.length > 140) return { error: "Keep it under 140 characters." };

  await new Promise((resolve) => setTimeout(resolve, 800)); // slow enough to see "Posting..."
  saveMessage(name, text);
  refresh(); // re-render the page so the new message shows up
  return { ok: true };
}

export async function deleteMessage(id: number) {
  removeMessage(id);
  refresh();
}
