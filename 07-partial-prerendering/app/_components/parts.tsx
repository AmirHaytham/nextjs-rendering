import { cacheLife } from "next/cache";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { signIn, signOut } from "../actions";

// STATIC: the same for every visitor, so it is cached and baked into the
// static shell at build time.
export async function ProductDetails() {
  "use cache";
  cacheLife("max");
  await new Promise((resolve) => setTimeout(resolve, 500)); // a slow CMS, paid once at build time

  return (
    <section className="space-y-2 rounded border bg-white p-4">
      <p className="text-xs text-slate-500">STATIC SHELL: built once, cached</p>
      <h1 className="text-2xl font-semibold">Mechanical keyboard</h1>
      <p>Hot-swappable switches, aluminium case, USB-C. 1800 EGP.</p>
    </section>
  );
}

// DYNAMIC: depends on who is asking (a cookie), so it can never be in the shell.
export async function Greeting() {
  const name = (await cookies()).get("name")?.value;

  return (
    <section className="space-y-2 rounded border bg-white p-4">
      <p className="text-xs text-slate-500">DYNAMIC: read from your cookie on each request</p>
      {name ? (
        <form action={signOut} className="flex items-center gap-3">
          <p>Welcome back, {name}. Your cart has 2 items.</p>
          <button className="text-sm text-blue-700 underline">Sign out</button>
        </form>
      ) : (
        <form action={signIn} className="flex gap-2">
          <input name="name" placeholder="Your name" className="rounded border p-1" />
          <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white">Sign in</button>
        </form>
      )}
    </section>
  );
}

// A slow warehouse API.
async function getStock() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 3 + (Math.floor(Date.now() / 1000) % 5);
}

// DYNAMIC: live data that must be fresh on every request.
export async function Stock() {
  await connection();
  const left = await getStock();

  return (
    <section className="rounded border bg-white p-4">
      <p className="text-xs text-slate-500">DYNAMIC: live stock, 2 seconds to fetch</p>
      <p>Only {left} left in stock</p>
    </section>
  );
}

export function Skeleton({ label }: { label: string }) {
  return <section className="animate-pulse rounded border border-dashed bg-white p-4 text-slate-400">{label}</section>;
}
