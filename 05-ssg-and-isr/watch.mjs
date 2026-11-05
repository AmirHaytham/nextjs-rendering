// Visits the three pages every 4 seconds for 40 seconds and prints what each
// one shows. Start the production app first: npm run build, then npm start.
const base = process.env.APP_URL ?? "http://localhost:3005";

async function read(path) {
  const start = performance.now();
  const html = await (await fetch(base + path)).text();
  const ms = (performance.now() - start).toFixed(0).padStart(4);
  const price = html.match(/font-bold">\$(?:<!-- -->)?(\d+)/)?.[1] ?? "?";
  const builtAt = html.match(/page built at (?:<!-- -->)?([\d:]+)/)?.[1] ?? "?";
  return `$${price.padStart(3)} built ${builtAt} (${ms} ms)`;
}

console.log("time       | /ssg                          | /isr                          | /ssr");
for (let i = 0; i < Number(process.env.ROUNDS ?? 10); i++) {
  const time = new Date().toLocaleTimeString("en-GB");
  const row = await Promise.all(["/ssg", "/isr", "/ssr"].map(read));
  console.log(`${time}   | ${row.join(" | ")}`);
  await new Promise((resolve) => setTimeout(resolve, 4000));
}
