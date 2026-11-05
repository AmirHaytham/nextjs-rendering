"use client";

import { useState } from "react";

// Clicking only works after this part of the page has hydrated.
export function ClickMe() {
  const [clicks, setClicks] = useState(0);

  return (
    <button onClick={() => setClicks(clicks + 1)} className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
      clicked {clicks} times
    </button>
  );
}
