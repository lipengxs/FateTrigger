import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Rankings", "Internal rankings based on public footage and source-linked discussion.", "/rankings");

export default function Page() {
  const items = siteContent.rankings;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Rankings", href: "/rankings" }])} />
      <Breadcrumbs items={[{ label: "Rankings", href: "/rankings" }]} />
      <header className="page-header"><span className="eyebrow">Editorial Rankings</span><h1>Rankings</h1><p>Internal rankings based on public footage and source-linked discussion.</p></header>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Rankings" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={"Editorial"} href={`/rankings#${item.slug}`}><ol className="rank-list">{item.items.map((point) => <li key={point}>{point}</li>)}</ol></Card>)}
      </div></section>
    </>
  );
}
