import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Characters and Classes", "Role-focused Fate Trigger character and class guide.", "/characters");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "characters");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Characters and Classes", href: "/characters" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Characters and Classes", href: "/characters" }]} />
      <header className="page-header"><span className="eyebrow">Topic Hub</span><h1>Fate Trigger Characters and Classes</h1><p>Role-focused Fate Trigger character and class guide.</p></header>
      <section className="section"><SectionHeading eyebrow="Database" title="Key entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
