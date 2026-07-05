import { notFound } from "next/navigation";
import { Breadcrumbs, Card, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return pageMeta(siteContent.gameName + " " + category + " database", "Source-aware " + category + " database for " + siteContent.gameName + ".", "/database/" + category);
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const items = siteContent.entries.filter((entry) => entry.category === category);
  if (!items.length) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Database", href: "/database" }, { label: category, href: "/database/" + category }]} />
      <header className="page-header"><span className="eyebrow">Database</span><h1>{siteContent.gameName} {category}</h1><p>Editorial entries based on public information, footage, and source-linked observations.</p></header>
      <section className="section"><div className="grid-3">{items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} database artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}</div></section>
    </>
  );
}
