import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partial Prerendering",
  description: "A static shell with dynamic holes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
