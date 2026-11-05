import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Server and Client Components",
  description: "Which code runs where, and which code reaches the browser",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
