import { cacheLife, cacheTag } from "next/cache";
import { now, readPrice } from "../_lib/db";

// The public product page. Cached for as long as possible, like SSG, but
// labelled with the tag "price" so it can be thrown away on demand.
export default async function ProductPage() {
  "use cache";
  cacheLife("max");
  cacheTag("price");

  const price = await readPrice();

  return (
    <div className="space-y-2 rounded border bg-white p-5">
      <h1 className="text-xl font-semibold">Mechanical keyboard</h1>
      <p className="text-4xl font-bold">${price}</p>
      <p className="font-mono text-sm text-slate-500">page built at {now()}</p>
    </div>
  );
}
