import Link from "next/link";

const pages = [
  ["/ssg", "SSG", "Built once at build time. Never changes."],
  ["/isr", "ISR", "Cached, rebuilt in the background every 10 seconds."],
  ["/ssr", "SSR", "Rebuilt on every request. Always fresh, always paying."],
];

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">SSG, ISR and SSR</h1>
      <p>
        The &quot;database&quot; price drops by $5 every 10 seconds. Open the three pages and refresh each
        a few times.
      </p>
      <ul className="space-y-2">
        {pages.map(([href, name, what]) => (
          <li key={href} className="rounded border bg-white p-3">
            <Link href={href} className="font-semibold text-blue-700 hover:underline">{name}</Link>
            <p className="text-sm text-slate-600">{what}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-slate-500">
        Caching only happens in production: npm run build, then npm start. In npm run dev every page is
        rebuilt on every request.
      </p>
    </div>
  );
}
