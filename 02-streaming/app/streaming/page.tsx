import { Suspense } from "react";
import { Header, Sidebar, MainContent, Footer, Spinner } from "../_components/sections";

// The same page with each slow part wrapped in Suspense, like the slide's
// <Suspense fallback={<Spinner />}><MainContent /></Suspense>.
// The server sends the header and spinners at once, then streams each part
// the moment it is ready, and each part hydrates on its own.
export default function StreamingPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Streaming with Suspense</h1>
      <Header />
      <div className="grid grid-cols-3 gap-3">
        <Suspense fallback={<Spinner label="Loading sidebar..." />}>
          <Sidebar />
        </Suspense>
        <div className="col-span-2">
          <Suspense fallback={<Spinner label="Loading main content..." />}>
            <MainContent />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<Spinner label="Loading footer..." />}>
        <Footer />
      </Suspense>
    </div>
  );
}
