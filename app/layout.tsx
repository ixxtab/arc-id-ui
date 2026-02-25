import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Geist_Mono } from "next/font/google";

const mono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arc ID",
  description: "The Identity Layer for Autonomous Agents",
};

export const viewport: Viewport = {
  themeColor: "#0e1013",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.className} min-h-screen bg-background text-foreground bg-grid`}>
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
