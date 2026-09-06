import type { MetadataRoute } from "next";
import { absoluteUrl, guideFreshnessFor, indexableEntrySlugs, indexableGuideSlugs, siteContent } from "@/lib/content";

function reviewedAt(url: string) {
  if (url === "/news") return siteContent.news[0]?.date;
  if (url.startsWith("/news/")) return siteContent.news.find((item) => "/news/" + item.slug === url)?.date;
  if (url.startsWith("/guides/")) return guideFreshnessFor(url.split("/").pop() || "").lastChecked;
  if (url === "/release-date" || url === "/characters" || url === "/weapons" || url === "/maps" || url === "/gun-chip") return siteContent.sourceChecked;
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/","/news","/guides","/gun-chip","/characters","/weapons","/maps","/media","/release-date"];
  const routes = [
    ...staticRoutes,
    ...siteContent.news.map((item) => "/news/" + item.slug),
    ...siteContent.guides.filter((item) => indexableGuideSlugs.has(item.slug)).map((item) => "/guides/" + item.slug),
    ...siteContent.entries.filter((item) => item.category === "characters" && ["fally", "tata-and-bibi"].includes(item.slug)).map((item) => "/characters/" + item.slug),
    ...siteContent.videos.map((item) => "/media/" + item.slug),
    ...siteContent.comparisons.filter((item) => item.slug === "fate-trigger-vs-apex-legends").map((item) => "/comparisons/" + item.slug),
    ...siteContent.entries.filter((item) => indexableEntrySlugs.has(item.slug)).map((item) => "/database/" + item.category + "/" + item.slug),
  ];
  return [...new Set(routes)].map((url) => {
    const isNews = url.startsWith("/news/");
    const isGuide = url.startsWith("/guides/");
    const isDatabase = url.startsWith("/database/");
    const isRelease = url === "/release-date";
    const lastModified = reviewedAt(url);
    return {
      url: absoluteUrl(url),
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      changeFrequency: isRelease || isNews ? "weekly" : isGuide || isDatabase ? "monthly" : "monthly",
      priority: url === "/" ? 1 : isRelease ? 0.95 : isNews || isGuide ? 0.85 : isDatabase ? 0.75 : 0.65
    };
  });
}
