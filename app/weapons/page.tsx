import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Weapons and Equipment", "Weapons, equipment, loadout, and usage recommendations for Fate Trigger.", "/weapons");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "weapons");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Weapons and Equipment", href: "/weapons" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Weapons and Equipment", href: "/weapons" }]} />
      <header className="page-header"><span className="eyebrow">Topic Hub</span><h1>Fate Trigger Weapons and Equipment</h1><p>Weapons, equipment, loadout, and usage recommendations for Fate Trigger.</p></header>
      <section className="section"><SectionHeading eyebrow="Database" title="Key entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
