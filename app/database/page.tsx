import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Database", "Characters, equipment, maps, lore, systems, and source-aware entries.", "/database");

export default function Page() {
  const items = siteContent.entries;
  const categoryCards = [
    ["Characters", "/characters", "Awakeners, named character watch pages, and role identities.", "characters"],
    ["Weapons", "/weapons", "Range bands, Gun-Chip planning, and source-safe loadout entries.", "weapons"],
    ["Maps", "/maps", "Floating arena routes, bridges, flanks, and endgame movement.", "maps"],
    ["Lore and Systems", "/lore", "Worldbuilding, platform watch, fair-play systems, and source context.", "lore"]
  ] as const;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Database", href: "/database" }])} />
      <Breadcrumbs items={[{ label: "Database", href: "/database" }]} />
      <header className="page-header"><span className="eyebrow">Game Database</span><h1>Fate Trigger Database</h1><p>Characters, equipment, maps, lore, systems, and source-aware entries. Pages are marked as independent analysis when final launch stats or official terminology are not yet confirmed.</p></header>
      <section className="section"><SectionHeading eyebrow="Database Hubs" title="Browse by player question" /><div className="grid-4">
        {categoryCards.map(([title, href, text, category]) => <Card key={href} title={title} eyebrow="Hub" href={href} image={cardImageFor(category)} imageAlt={`${title} database hub artwork`}><p>{text}</p></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Database" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.role} href={`/database/${item.category}/${item.slug}`} image={cardImageFor(item.category, item.slug)} imageAlt={`${item.title} database artwork`}><><p>{item.excerpt}</p><Tags tags={item.tags} /></></Card>)}
      </div></section>
    </>
  );
}
