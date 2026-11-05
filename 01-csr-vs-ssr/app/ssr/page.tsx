import { connection } from "next/server";
import { getProducts } from "../_lib/products";
import { LikeButton } from "../_components/like-button";

// Let this page block, like classic SSR: nothing is sent until the data is ready.
// (Next.js 16 complains about blocking pages unless you say it on purpose.)
export const instant = false;

// Server-Side Rendering: the server waits for the data, builds the full HTML
// and sends it. The browser shows it at once, then hydrates the buttons.
export default async function SsrPage() {
  await connection(); // render on every request, not once at build time
  const products = await getProducts();

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Server-Side Rendering</h1>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded border bg-white p-3">
            <span>{p.name}, {p.price} EGP</span>
            <LikeButton />
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Built on the server at {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
