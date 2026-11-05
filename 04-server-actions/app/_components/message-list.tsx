import { getMessages } from "../_lib/messages";
import { deleteMessage } from "../actions";

// A Server Component. The delete button is a plain <form> with a Server Action,
// no "use client" and no JavaScript needed for it to work.
export async function MessageList() {
  const messages = await getMessages();

  if (messages.length === 0) return <p className="text-slate-500">No messages yet.</p>;

  return (
    <ul className="space-y-2">
      {messages.map((m) => (
        <li key={m.id} className="flex items-start justify-between gap-3 rounded border bg-white p-3">
          <div>
            <p className="text-sm font-semibold">
              {m.name} <span className="font-normal text-slate-400">{m.at}</span>
            </p>
            <p>{m.text}</p>
          </div>
          <form action={deleteMessage.bind(null, m.id)}>
            <button className="text-sm text-red-600 hover:underline">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
