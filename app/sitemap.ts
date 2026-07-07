import type { MetadataRoute } from "next";
import { absoluteUrl, siteContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/","/news","/guides","/beginner","/gun-chip","/database","/characters","/weapons","/maps","/media","/rankings","/release-date","/resources","/about","/privacy-policy","/feedback","/lore"];
  const routes = [
    ...staticRoutes,
    ...siteContent.news.map((item) => "/news/" + item.slug),
    ...siteContent.guides.map((item) => "/guides/" + item.slug),
    ...siteContent.entries.filter((item) => item.category === "characters" && ["fally", "tata-and-bibi"].includes(item.slug)).map((item) => "/characters/" + item.slug),
    ...siteContent.videos.map((item) => "/media/" + item.slug),
    ...siteContent.comparisons.map((item) => "/comparisons/" + item.slug),
    ...siteContent.categories.map((item) => "/database/" + item),
    ...siteContent.entries.map((item) => "/database/" + item.category + "/" + item.slug),
  ];
  return [...new Set(routes)].map((url) => {
    const isNews = url.startsWith("/news/");
    const isGuide = url.startsWith("/guides/");
    const isDatabase = url.startsWith("/database/");
    const isRelease = url === "/release-date";
    const isLowPriority = ["/about", "/privacy-policy", "/feedback"].includes(url);
    return {
      url: absoluteUrl(url),
      lastModified: new Date(siteContent.contentUpdated),
      changeFrequency: isRelease || isNews ? "weekly" : isGuide || isDatabase ? "monthly" : isLowPriority ? "yearly" : "monthly",
      priority: url === "/" ? 1 : isRelease ? 0.95 : isNews || isGuide ? 0.85 : isDatabase ? 0.75 : isLowPriority ? 0.25 : 0.65
    };
  });
}
