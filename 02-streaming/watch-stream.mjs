// Reads each page's HTML as it arrives and prints when every part shows up.
// Start the app first (npm run build, then npm start).
const base = process.env.APP_URL ?? "http://localhost:3002";

const markers = [
  ["Header", "Header (no data"],
  ["Footer", "Footer ready"],
  ["Sidebar", "Sidebar ready"],
  ["Main", "Main ready"],
];

for (const path of ["/blocking", "/streaming"]) {
  const start = performance.now();
  const res = await fetch(base + path);
  const decoder = new TextDecoder();
  const seen = new Set();
  let html = "";
  let firstByte = null;

  console.log(path);
  for await (const chunk of res.body) {
    firstByte ??= performance.now() - start;
    html += decoder.decode(chunk, { stream: true });
    for (const [name, text] of markers) {
      if (!seen.has(name) && html.includes(text)) {
        seen.add(name);
        console.log(`  ${name.padEnd(8)} arrived at ${(performance.now() - start).toFixed(0).padStart(5)} ms`);
      }
    }
  }
  console.log(`  first byte at ${firstByte.toFixed(0)} ms\n`);
}
