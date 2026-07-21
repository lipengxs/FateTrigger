import type { Metadata } from "next";
import { Header } from "@/components/header-nav";
import { Footer, IndependenceBanner, JsonLd } from "@/components/site";
import { absoluteUrl, siteContent } from "@/lib/content";
import { videoGameJsonLd } from "@/lib/seo";
import "./globals.css";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteContent.domain}`),
  title: {
    default: `${siteContent.siteName} - ${siteContent.gameName} News, Guides, Release Date`,
    template: `%s | ${siteContent.siteName}`
  },
  description: siteContent.hero.dek,
  verification: {
    other: {
      "msvalidate.01": "B362957FC36C5EDDD6079B6D78330424",
      "yandex-verification": "78812f18147f0c75"
    }
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: siteContent.siteName,
    description: siteContent.hero.dek,
    url: absoluteUrl("/"),
    siteName: siteContent.siteName,
    type: "website",
    images: [{ url: absoluteUrl("/images/hero/fate-trigger-hero.jpg"), width: 1280, height: 720, alt: `${siteContent.siteName} gameplay media hero` }]
  },
  twitter: { card: "summary_large_image", title: siteContent.siteName, description: siteContent.hero.dek, images: [absoluteUrl("/images/hero/fate-trigger-hero.jpg")] }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"site-" + siteContent.theme.body}>
        <JsonLd data={videoGameJsonLd()} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteContent.siteName, url: `https://${siteContent.domain}`, potentialAction: { "@type": "SearchAction", target: `https://${siteContent.domain}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } }} />
        <Header />
        <aside className="site-status" aria-label="Guide source status"><a href="/release-date">Source check: {siteContent.sourceChecked} · release status is source-linked</a></aside>
        <IndependenceBanner />
        <AdSlot placement="leaderboard" />
        <AdSlot placement="mobile" />
        <main>{children}</main>
        <AdSlot placement="rectangle" />
        <Footer />
      </body>
    </html>
  );
}
