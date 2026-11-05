import { Suspense } from "react";
import { connection } from "next/server";
import { getPrice, now } from "../_lib/db";
import { PriceCard } from "../_components/price-card";

// SSR: no cache at all. Every request asks the database again.
export default function SsrPage() {
  return (
    <Suspense fallback={<p>Asking the database...</p>}>
      <FreshPrice />
    </Suspense>
  );
}

async function FreshPrice() {
  await connection();
  const price = await getPrice();
  return (
    <PriceCard
      mode="SSR (no cache)"
      price={price}
      builtAt={now()}
      note="Always the real price, because every single request runs the query again."
    />
  );
}
