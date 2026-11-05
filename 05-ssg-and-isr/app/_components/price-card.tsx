export function PriceCard({ mode, price, builtAt, note }: { mode: string; price: number; builtAt: string; note: string }) {
  return (
    <div className="space-y-2 rounded border bg-white p-4">
      <h1 className="text-xl font-semibold">{mode}</h1>
      <p className="text-3xl font-bold">${price}</p>
      <p className="font-mono text-sm">page built at {builtAt}</p>
      <p className="text-sm text-slate-600">{note}</p>
    </div>
  );
}
