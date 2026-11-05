export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">CSR vs SSR</h1>
      <p>Two pages that show the same three products from the same slow database.</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <a href="/csr" className="text-blue-700 hover:underline">/csr</a>: the browser builds the list
          with JavaScript.
        </li>
        <li>
          <a href="/ssr" className="text-blue-700 hover:underline">/ssr</a>: the server builds the list
          and sends finished HTML.
        </li>
      </ul>
      <p className="rounded border bg-white p-3 text-sm">
        On each page press <b>Ctrl+U</b> (view source) and search for &quot;Mechanical keyboard&quot;.
        That is what Google sees.
      </p>
    </div>
  );
}
