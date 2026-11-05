"use client";

import { useState } from "react";

// Only works once the page's JavaScript has loaded and hydrated.
export function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)} className="rounded border px-2 py-0.5 text-sm">
      ♥ {likes}
    </button>
  );
}
