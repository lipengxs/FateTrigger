import type { MetadataRoute } from "next";
import { siteContent } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.siteName,
    short_name: siteContent.gameName,
    description: siteContent.hero.dek,
    start_url: "/",
    display: "standalone",
    background_color: siteContent.theme.bg,
    theme_color: siteContent.theme.accent,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
