import { Breadcrumbs, Card, SectionHeading, SourceList } from "@/components/site";
import { pageMeta } from "@/lib/seo";
import { siteContent } from "@/lib/content";

export const metadata = pageMeta("Fate Trigger Resources", "Official links, video sources, community resources, and source notes for Fate Trigger.", "/resources");

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }]} />
      <header className="page-header"><span className="eyebrow">Resources</span><h1>{siteContent.gameName} resources</h1><p>Official links, trailers, store pages, and community resources used by this independent guide.</p></header>
      <section className="section"><SectionHeading eyebrow="Video Sources" title="Embedded public videos" /><div className="grid-3">{siteContent.videos.map((video) => <Card key={video.slug} title={video.title} eyebrow={video.source} href={`/media/${video.slug}`} image={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} imageAlt={`${video.title} YouTube thumbnail`}><p>{video.excerpt}</p></Card>)}</div></section>
      <SourceList />
    </>
  );
}
