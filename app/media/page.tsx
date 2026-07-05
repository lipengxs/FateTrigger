import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Media", "Embedded videos, YouTube thumbnails, and visible-footage notes.", "/media");

export default function Page() {
  const items = siteContent.videos;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Media", href: "/media" }])} />
      <Breadcrumbs items={[{ label: "Media", href: "/media" }]} />
      <header className="page-header"><span className="eyebrow">Trailer Analysis</span><h1>Media</h1><p>Embedded videos, YouTube thumbnails, and visible-footage notes.</p></header>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Media" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.source} href={`/media/${item.slug}`}><><img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt={item.title + " YouTube thumbnail"} /><p>{item.excerpt}</p></></Card>)}
      </div></section>
    </>
  );
}
