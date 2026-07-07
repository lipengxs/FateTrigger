import type { Metadata } from "next";
import { Footer, Header, IndependenceBanner, JsonLd } from "@/components/site";
import { absoluteUrl, siteContent } from "@/lib/content";
import { videoGameJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteContent.domain}`),
  title: {
    default: `${siteContent.siteName} - ${siteContent.gameName} News, Guides, Release Date`,
    template: `%s | ${siteContent.siteName}`
  },
  description: siteContent.hero.dek,
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
        <Header />
        <IndependenceBanner />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
