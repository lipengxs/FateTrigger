import type { Metadata } from "next";
import { absoluteUrl, faqs, siteContent } from "./content";

export function pageMeta(title: string, description: string, path = "/"): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteContent.siteName,
      type: "website",
      images: [{ url: absoluteUrl("/images/hero/fate-trigger-hero.jpg"), width: 1280, height: 720, alt: `${siteContent.siteName} gameplay media hero` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/images/hero/fate-trigger-hero.jpg")]
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

export function videoGameJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: siteContent.gameName,
    description: siteContent.hero.dek,
    genre: siteContent.facts.genre,
    gamePlatform: siteContent.facts.platforms,
    publisher: siteContent.facts.publisher,
    developer: siteContent.facts.developer,
    url: absoluteUrl("/")
  };
}

export function articleJsonLd(title: string, description: string, path: string, date?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: "2026-07-05",
    author: { "@type": "Organization", name: siteContent.siteName },
    publisher: { "@type": "Organization", name: siteContent.siteName },
    mainEntityOfPage: absoluteUrl(path)
  };
}

export function videoJsonLd() {
  return siteContent.videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.excerpt,
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`],
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    uploadDate: "2026-01-01"
  }));
}
