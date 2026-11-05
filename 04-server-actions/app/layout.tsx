import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Server Actions",
  description: "A guestbook with no API routes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
