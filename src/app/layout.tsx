import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaOrg } from "@/components/SchemaOrg";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "news.thinkflow.ro — AI & Tech News Aggregator",
    template: "%s — news.thinkflow.ro",
  },
  description:
    "Daily curated AI, cloud, DevOps, and web development news. Aggregated from Hacker News, Reddit, GitHub, and RSS. AI-summarized with GEO-optimized metadata.",
  metadataBase: new URL("https://news.thinkflow.ro"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "news.thinkflow.ro",
    title: "news.thinkflow.ro — AI & Tech News Aggregator",
    description:
      "Daily curated AI, cloud, DevOps, and web development news from HN, Reddit, GitHub, and RSS. AI-summarized.",
  },
  twitter: {
    card: "summary_large_image",
    title: "news.thinkflow.ro",
    description:
      "Daily curated AI & tech news from HN, Reddit, GitHub, and RSS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.variable} ${geistMono.variable} font-sans mesh-bg antialiased min-h-screen flex flex-col`}
      >
        <SchemaOrg />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
