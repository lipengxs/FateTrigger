import { Breadcrumbs, Card, JsonLd, SectionHeading, cardImageFor } from "@/components/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta("Database", "Characters, equipment, maps, lore, systems, and source-aware entries.", "/database"), robots: { index: false, follow: true } };

export default function Page() {
  const categoryCards = [
    ["Characters", "/characters", "Named Awakener watch pages with clear confirmation boundaries.", "characters"],
    ["Weapons and Gun-Chip", "/weapons", "Official weapon and Gun-Chip status without speculative builds.", "weapons"],
    ["Maps", "/maps", "Official arena and interactive-map availability status.", "maps"]
  ] as const;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Database", href: "/database" }])} />
      <Breadcrumbs items={[{ label: "Database", href: "/database" }]} />
      <header className="page-header"><span className="eyebrow">Reference Directory</span><h1>Fate Trigger Reference Directory</h1><p>This reader directory routes to the primary status hubs. It remains out of search while the official record is too small to support a standalone database.</p></header>
      <section className="section"><SectionHeading eyebrow="Database Hubs" title="Browse by player question" /><div className="grid-4">
        {categoryCards.map(([title, href, text, category]) => <Card key={href} title={title} eyebrow="Hub" href={href} image={cardImageFor(category)} imageAlt={`${title} database hub artwork`}><p>{text}</p></Card>)}
      </div></section>
    </>
  );
}
