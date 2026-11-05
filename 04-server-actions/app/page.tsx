import { Suspense } from "react";
import { MessageForm } from "./_components/message-form";
import { MessageList } from "./_components/message-list";

export default function Guestbook() {
  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Guestbook with Server Actions</h1>
      <p className="text-sm text-slate-600">
        Posting and deleting call functions that run on the server. There is no API route in this app.
      </p>
      <MessageForm />
      <Suspense fallback={<p className="text-slate-500">Loading messages...</p>}>
        <MessageList />
      </Suspense>
    </div>
  );
}
