export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All or nothing vs streaming</h1>
      <p>
        Both pages need the same three slow pieces: a footer (0.5s), a sidebar (1s) and the main content
        (3s).
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <a href="/blocking" className="text-blue-700 hover:underline">/blocking</a>: a white screen for 3
          seconds, then everything at once.
        </li>
        <li>
          <a href="/streaming" className="text-blue-700 hover:underline">/streaming</a>: the header at once,
          then each part as soon as it is ready. Try clicking the sidebar button before the main content
          arrives.
        </li>
      </ul>
    </div>
  );
}
