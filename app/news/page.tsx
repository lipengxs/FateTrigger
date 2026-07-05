import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("News", "Latest public updates and source-aware notes.", "/news");

export default function Page() {
  const items = siteContent.news;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "News", href: "/news" }])} />
      <Breadcrumbs items={[{ label: "News", href: "/news" }]} />
      <header className="page-header"><span className="eyebrow">News Desk</span><h1>News</h1><p>Latest public updates and source-aware notes.</p></header>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse News" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.date} href={`/news/${item.slug}`} image={cardImageFor("news", item.slug)} imageAlt={`${item.title} news visual`}><><p>{item.excerpt}</p><Tags tags={item.tags} /></></Card>)}
      </div></section>
    </>
  );
}
