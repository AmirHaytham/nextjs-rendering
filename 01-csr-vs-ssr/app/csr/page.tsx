"use client";

import { useEffect, useState } from "react";
import type { Product } from "../_lib/products";
import { LikeButton } from "../_components/like-button";

// Client-Side Rendering: the HTML arrives empty, then the browser
// downloads the JavaScript, calls the API and builds the list itself.
export default function CsrPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Client-Side Rendering</h1>
      {!products ? (
        <p className="text-slate-500">Loading in the browser...</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded border bg-white p-3">
              <span>{p.name}, {p.price} EGP</span>
              <LikeButton />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
