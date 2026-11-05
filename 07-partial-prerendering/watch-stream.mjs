// Reads the page as it arrives and prints when each part shows up,
// once as a stranger and once with a name cookie.
// Start the production app first: npm run build, then npm start.
const base = process.env.APP_URL ?? "http://localhost:3007";

const markers = [
  ["static shell", "STATIC SHELL"],
  ["greeting", "DYNAMIC: read from your cookie"],
  ["stock", "DYNAMIC: live stock"],
];

for (const [who, headers] of [["a stranger", {}], ["Mona (cookie)", { Cookie: "name=Mona" }]]) {
  const start = performance.now();
  const res = await fetch(base + "/", { headers });
  const decoder = new TextDecoder();
  const seen = new Set();
  let html = "";

  console.log(`As ${who}:`);
  for await (const chunk of res.body) {
    html += decoder.decode(chunk, { stream: true });
    for (const [name, text] of markers) {
      if (!seen.has(name) && html.includes(text)) {
        seen.add(name);
        console.log(`  ${name.padEnd(13)} at ${(performance.now() - start).toFixed(0).padStart(5)} ms`);
      }
    }
  }
  console.log(`  says "Welcome back": ${html.includes("Welcome back") ? "yes" : "no"}\n`);
}
