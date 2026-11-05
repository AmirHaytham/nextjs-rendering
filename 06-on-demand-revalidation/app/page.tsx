export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">On-demand revalidation</h1>
      <p>
        <a href="/product" className="text-blue-700 underline">/product</a> is cached forever, like SSG.{" "}
        <a href="/admin" className="text-blue-700 underline">/admin</a> changes the price three different
        ways. Only two of them reach the product page.
      </p>
      <p className="text-sm text-slate-500">Run it in production mode: npm run build, then npm start.</p>
    </div>
  );
}
