import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Database", "Characters, equipment, maps, lore, systems, and source-aware entries.", "/database");

export default function Page() {
  const items = siteContent.entries;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Database", href: "/database" }])} />
      <Breadcrumbs items={[{ label: "Database", href: "/database" }]} />
      <header className="page-header"><span className="eyebrow">Game Database</span><h1>Database</h1><p>Characters, equipment, maps, lore, systems, and source-aware entries.</p></header>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Database" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.role} href={`/database/${item.category}/${item.slug}`} image={cardImageFor(item.category, item.slug)} imageAlt={`${item.title} database artwork`}><><p>{item.excerpt}</p><Tags tags={item.tags} /></></Card>)}
      </div></section>
    </>
  );
}
