import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streaming",
  description: "All or nothing SSR versus streaming with Suspense",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="flex gap-4 border-b bg-white p-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          {/* Plain <a> on purpose: a full page load shows the difference best. */}
          <a href="/blocking" className="text-blue-700 hover:underline">/blocking</a>
          <a href="/streaming" className="text-blue-700 hover:underline">/streaming</a>
        </nav>
        <main className="mx-auto max-w-3xl p-6">{children}</main>
      </body>
    </html>
  );
}
