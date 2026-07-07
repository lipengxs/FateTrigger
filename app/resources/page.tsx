import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList } from "@/components/site";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";
import { siteContent } from "@/lib/content";

export const metadata = pageMeta("Fate Trigger Resources", "Official links, video sources, community resources, and source notes for Fate Trigger.", "/resources");

export default function Page() {
  const resourceItems = [
    ...siteContent.comparisons.map((item) => ({ name: item.title, href: `/comparisons/${item.slug}`, description: item.excerpt })),
    ...siteContent.videos.map((item) => ({ name: item.title, href: `/media/${item.slug}`, description: item.excerpt })),
    ...siteContent.sources.map(([name, href, description]) => ({ name, href, description }))
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger resources", "Official links, embedded videos, comparison pages, and source notes used by this independent Fate Trigger guide.", "/resources", resourceItems)} />
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }]} />
      <header className="page-header"><span className="eyebrow">Resources</span><h1>{siteContent.gameName} resources</h1><p>Official links, trailers, store pages, and community resources used by this independent guide.</p></header>
      <section className="section"><SectionHeading eyebrow="Comparisons" title="Independent competitor context" /><div className="grid-3">{siteContent.comparisons.map((comparison) => <Card key={comparison.slug} title={comparison.title} eyebrow="Comparison" href={`/comparisons/${comparison.slug}`}><p>{comparison.excerpt}</p></Card>)}</div></section>
      <section className="section"><SectionHeading eyebrow="Video Sources" title="Embedded public videos" /><div className="grid-3">{siteContent.videos.map((video) => <Card key={video.slug} title={video.title} eyebrow={video.source} href={`/media/${video.slug}`} image={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} imageAlt={`${video.title} YouTube thumbnail`}><p>{video.excerpt}</p></Card>)}</div></section>
      <SourceList />
    </>
  );
}
