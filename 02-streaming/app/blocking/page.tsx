import { connection } from "next/server";
import { Header, Sidebar, MainContent, Footer } from "../_components/sections";

// Allow this page to block on purpose: it is the "before" picture.
export const instant = false;

// Classic SSR, the slide's "all or nothing" problem. No Suspense anywhere,
// so the server cannot send a single byte until the slowest part is done.
export default async function BlockingPage() {
  await connection();

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">All or nothing (no Suspense)</h1>
      <Header />
      <div className="grid grid-cols-3 gap-3">
        <Sidebar />
        <div className="col-span-2">
          <MainContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
