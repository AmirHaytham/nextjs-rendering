// Builds every app and starts them all at once, each on its own port.
//   node run-all.js          build, then start in production mode (caching works)
//   node run-all.js --dev    skip the build, start in dev mode (no caching)
//   node run-all.js 05 06    only those folders
// Ctrl+C stops all of them.

const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dev = args.includes('--dev');
const only = args.filter((a) => /^\d+$/.test(a)).map((a) => a.padStart(2, '0'));

const apps = [
  ['01-csr-vs-ssr', '/'],
  ['02-streaming', '/'],
  ['03-server-and-client', '/'],
  ['04-server-actions', '/'],
  ['05-ssg-and-isr', '/'],
  ['06-on-demand-revalidation', '/'],
  ['07-partial-prerendering', '/'],
].filter(([name]) => only.length === 0 || only.includes(name.slice(0, 2)));

const colors = [36, 33, 35, 32, 34, 31, 37];
const tagFor = (name, i) => `\x1b[${colors[i % colors.length]}m[${name.slice(0, 2)}]\x1b[0m`;

if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('Installing dependencies once for all apps...');
  spawnSync('npm install --no-audit --no-fund', { cwd: __dirname, shell: true, stdio: 'inherit' });
}

if (!dev) {
  apps.forEach(([name], i) => {
    console.log(`${tagFor(name, i)} building ${name}...`);
    const result = spawnSync('npm run build --silent', { cwd: path.join(__dirname, name), shell: true, encoding: 'utf8' });
    if (result.status !== 0) {
      console.log(result.stdout + result.stderr);
      process.exit(1);
    }
  });
}

const children = [];
console.log('');
apps.forEach(([name, start], i) => {
  const port = 3000 + Number(name.slice(0, 2));
  const tag = tagFor(name, i);
  const command = dev ? `npx next dev -p ${port}` : `npx next start -p ${port}`;
  const child = spawn(command, { cwd: path.join(__dirname, name), shell: true });
  children.push(child);

  const print = (data) =>
    data
      .toString()
      .split('\n')
      .filter((line) => line.trim())
      .forEach((line) => console.log(`${tag} ${line}`));
  child.stdout.on('data', print);
  child.stderr.on('data', print);

  console.log(`${tag} ${name.padEnd(27)} http://localhost:${port}${start}`);
});

process.on('SIGINT', () => {
  children.forEach((child) => child.kill());
  process.exit();
});
