// Downloads the raw HTML of both pages, the way a search engine would,
// and checks whether the products are in it. Start the app first.
const base = process.env.APP_URL ?? "http://localhost:3001";

for (const path of ["/csr", "/ssr"]) {
  const start = performance.now();
  const res = await fetch(base + path);
  const html = await res.text();
  const ms = (performance.now() - start).toFixed(0);

  const hasProducts = html.includes("Mechanical keyboard");
  console.log(`${path}`);
  console.log(`  HTML arrived after   ${ms} ms`);
  console.log(`  products in the HTML ${hasProducts ? "yes" : "no, only \"Loading in the browser...\""}`);
}

console.log("\nCSR answers fast but empty. SSR waits for the database, then answers complete.");
