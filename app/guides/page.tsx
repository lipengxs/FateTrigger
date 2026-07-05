import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Guides", "Beginner, advanced, system, and setup guides.", "/guides");

export default function Page() {
  const items = siteContent.guides;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }])} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <header className="page-header"><span className="eyebrow">Guide Library</span><h1>Guides</h1><p>Beginner, advanced, system, and setup guides.</p></header>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Guides" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={"Guide"} href={`/guides/${item.slug}`} image={cardImageFor("guide", item.slug)} imageAlt={`${item.title} guide artwork`}><><p>{item.excerpt}</p><Tags tags={item.keywords} /></></Card>)}
      </div></section>
    </>
  );
}
