import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { siteUrl, isPreviewDeployment } from "@/lib/deployment";
import "./globals.css";

const sans = Barlow({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const base = new URL(siteUrl);

  return {
    metadataBase: base,
    alternates: { canonical: "./" },
    robots: isPreviewDeployment ? { index: false, follow: false } : { index: true, follow: true },
    title: {
      default: "Floyd Labs | Proving Ground",
      template: "%s | Floyd Labs",
    },
    description: "Floyd Labs is a rural Indiana proving ground for useful, human-sized technology tested in real work and real small businesses.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Floyd Labs | Garage-Born AI",
      description: "Human-sized technology, built and tested in real work from rural Indiana.",
      type: "website",
      url: "./",
      siteName: "Floyd Labs",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Floyd Labs proving ground" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Floyd Labs | Garage-Born AI",
      description: "Human-sized technology, built and tested in real work from rural Indiana.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
