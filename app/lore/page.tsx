import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Lore and Story", "Worldbuilding, story hooks, and source-aware lore notes for Fate Trigger.", "/lore");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "lore");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Lore and Story", href: "/lore" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Lore and Story", href: "/lore" }]} />
      <header className="page-header"><span className="eyebrow">Topic Hub</span><h1>Fate Trigger Lore and Story</h1><p>Worldbuilding, story hooks, and source-aware lore notes for Fate Trigger.</p></header>
      <section className="section"><SectionHeading eyebrow="Database" title="Key entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
