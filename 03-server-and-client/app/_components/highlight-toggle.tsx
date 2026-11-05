"use client";

import { useState } from "react";

// A Client Component: it needs state and a click handler, things only the
// browser has. Its code is downloaded and hydrated.
export function HighlightToggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  console.log("HighlightToggle rendered on the", typeof window === "undefined" ? "server" : "browser");

  return (
    <div className={`space-y-2 rounded p-3 ${on ? "bg-yellow-100" : "bg-transparent"}`}>
      <button onClick={() => setOn(!on)} className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
        {on ? "Highlight off" : "Highlight on"}
      </button>
      <span className="ml-2 text-xs text-slate-500">CLIENT_COMPONENT_MARKER</span>
      {children}
    </div>
  );
}
