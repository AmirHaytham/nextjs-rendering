import { cacheLife } from "next/cache";
import { getPrice, now } from "../_lib/db";
import { PriceCard } from "../_components/price-card";

// SSG: built once during npm run build, then served as a file.
// The slide's "revalidate: false". In Next.js 16 that is "use cache" with
// the longest lifetime, cacheLife("max").
export default async function SsgPage() {
  "use cache";
  cacheLife("max");

  const price = await getPrice();
  return (
    <PriceCard
      mode="SSG"
      price={price}
      builtAt={now()}
      note="Built at npm run build. Refresh all you want: the price and time never change until the next build."
    />
  );
}
