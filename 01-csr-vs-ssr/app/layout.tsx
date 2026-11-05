import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSR vs SSR",
  description: "The same page rendered in the browser and on the server",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="flex gap-4 border-b bg-white p-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          <Link href="/csr" className="text-blue-700 hover:underline">/csr</Link>
          <Link href="/ssr" className="text-blue-700 hover:underline">/ssr</Link>
        </nav>
        <main className="mx-auto max-w-2xl p-6">{children}</main>
      </body>
    </html>
  );
}
