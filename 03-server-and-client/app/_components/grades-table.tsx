import { getGrades } from "../_lib/db";

// A Server Component: no "use client", so it runs only on the server.
// It can read the database directly, and none of this code is sent to the browser.
export async function GradesTable() {
  const grades = await getGrades();
  console.log("GradesTable rendered (this only shows in the server terminal)");

  return (
    <table className="w-full rounded border bg-white text-sm">
      <tbody>
        {grades.map((g) => (
          <tr key={g.course} className="border-b last:border-0">
            <td className="p-2">{g.course}</td>
            <td className="p-2 font-semibold">{g.grade}</td>
          </tr>
        ))}
      </tbody>
      <caption className="caption-bottom p-1 text-xs text-slate-500">
        SERVER_COMPONENT_MARKER: from the server component
      </caption>
    </table>
  );
}
