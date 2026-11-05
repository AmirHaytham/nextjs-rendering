import { Suspense } from "react";
import { Greeting, ProductDetails, Skeleton, Stock } from "./_components/parts";

// One page, two kinds of content. Next.js builds the static parts and the
// Suspense fallbacks into an HTML shell ahead of time, sends that instantly,
// then streams the dynamic parts into the holes. That is Partial Prerendering.
export default function ProductPage() {
  return (
    <div className="mx-auto max-w-xl space-y-3 p-6">
      <header className="rounded bg-slate-800 p-3 text-white">Lab 7 Shop (static)</header>
      <ProductDetails />
      <Suspense fallback={<Skeleton label="Checking who you are..." />}>
        <Greeting />
      </Suspense>
      <Suspense fallback={<Skeleton label="Checking the warehouse..." />}>
        <Stock />
      </Suspense>
    </div>
  );
}
