// Searches every JavaScript file the browser can download for three strings.
// Run after npm run build.
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const root = ".next/static";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith(".js") ? [path] : [];
  });
}

let all;
try {
  all = files(root);
} catch {
  console.log("No .next/static folder. Run npm run build first.");
  process.exit(1);
}

const code = all.map((f) => readFileSync(f, "utf8")).join("\n");
console.log(`Searched ${all.length} JavaScript files sent to the browser.\n`);

for (const [label, text] of [
  ["Client Component code", "CLIENT_COMPONENT_MARKER"],
  ["Server Component code", "SERVER_COMPONENT_MARKER"],
  ["Database password", "SECRET_DB_PASSWORD_7f3a"],
]) {
  console.log(`  ${label.padEnd(22)} ${code.includes(text) ? "FOUND, sent to the browser" : "not there"}`);
}
