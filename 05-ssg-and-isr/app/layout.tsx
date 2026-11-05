import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSG and ISR",
  description: "Static, incrementally regenerated and server-rendered pages side by side",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="flex gap-4 border-b bg-white p-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          <a href="/ssg" className="text-blue-700 hover:underline">/ssg</a>
          <a href="/isr" className="text-blue-700 hover:underline">/isr</a>
          <a href="/ssr" className="text-blue-700 hover:underline">/ssr</a>
        </nav>
        <main className="mx-auto max-w-xl p-6">{children}</main>
      </body>
    </html>
  );
}
