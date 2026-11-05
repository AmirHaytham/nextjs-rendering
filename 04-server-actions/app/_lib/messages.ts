import { connection } from "next/server";

export type Message = { id: number; name: string; text: string; at: string };

// Kept in memory to stay simple, so it empties when the server restarts.
// In the project this would be MongoDB.
const messages: Message[] = [
  { id: 1, name: "Dr. Nada", text: "Welcome to the Lab 7 guestbook", at: "09:00" },
];

export async function getMessages() {
  await connection(); // always read fresh, on every request
  return [...messages].reverse();
}

export function saveMessage(name: string, text: string) {
  const at = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  messages.push({ id: Date.now(), name, text, at });
}

export function removeMessage(id: number) {
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) messages.splice(index, 1);
}
