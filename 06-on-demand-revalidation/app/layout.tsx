import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "On-demand revalidation",
  description: "Throwing away a cached page the moment the data changes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="flex gap-4 border-b bg-white p-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          <a href="/product" className="text-blue-700 hover:underline">/product</a>
          <a href="/admin" className="text-blue-700 hover:underline">/admin</a>
        </nav>
        <main className="mx-auto max-w-xl p-6">{children}</main>
      </body>
    </html>
  );
}
