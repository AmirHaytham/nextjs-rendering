import { getFooter, getMainContent, getSidebar } from "../_lib/data";
import { ClickMe } from "./click-me";

export function Header() {
  return <header className="rounded bg-slate-800 p-3 text-white">Header (no data, instant)</header>;
}

export async function Sidebar() {
  const items = await getSidebar();
  return (
    <aside className="space-y-2 rounded border bg-white p-3">
      <p className="text-xs text-slate-500">Sidebar ready (1 second)</p>
      <ul className="text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>
      <ClickMe />
    </aside>
  );
}

export async function MainContent() {
  const text = await getMainContent();
  return (
    <section className="space-y-2 rounded border bg-white p-3">
      <p className="text-xs text-slate-500">Main ready (3 seconds)</p>
      <p>{text}</p>
      <ClickMe />
    </section>
  );
}

export async function Footer() {
  const text = await getFooter();
  return <footer className="rounded border bg-white p-3 text-sm">Footer ready (0.5 seconds): {text}</footer>;
}

export function Spinner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded border border-dashed bg-white p-3 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      {label}
    </div>
  );
}
