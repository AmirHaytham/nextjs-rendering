import { cacheLife } from "next/cache";
import { getPrice, now } from "../_lib/db";
import { PriceCard } from "../_components/price-card";

// ISR: served from the cache like SSG, but rebuilt in the background once it
// is older than 10 seconds. The slide's "revalidate: 10". In Next.js 16 that is
// cacheLife with a revalidate time.
export default async function IsrPage() {
  "use cache";
  cacheLife({ revalidate: 10, expire: 3600 });

  const price = await getPrice();
  return (
    <PriceCard
      mode="ISR (revalidate: 10 seconds)"
      price={price}
      builtAt={now()}
      note="Fast like SSG. After 10 seconds the next visitor still gets this old copy, and that visit triggers a rebuild for the one after."
    />
  );
}
