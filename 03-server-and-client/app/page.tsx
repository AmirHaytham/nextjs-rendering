import { GradesTable } from "./_components/grades-table";
import { HighlightToggle } from "./_components/highlight-toggle";

// The page is a Server Component too. It mixes both kinds: a Client Component
// (the toggle) wrapping a Server Component (the table) passed in as children.
export default function Home() {
  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Server and Client Components</h1>
      <HighlightToggle>
        <GradesTable />
      </HighlightToggle>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li>The table reads the &quot;database&quot; directly. No API, no fetch.</li>
        <li>The button works because its component is a Client Component.</li>
        <li>
          Run <code>npm run check-bundle</code> after a build: the client marker is in the browser&apos;s
          JavaScript, the server marker and the database password are not.
        </li>
      </ul>
    </div>
  );
}
