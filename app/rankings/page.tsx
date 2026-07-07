import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Rankings", "Internal rankings based on public footage and source-linked discussion.", "/rankings");

export default function Page() {
  const items = siteContent.rankings;
  const methodRows = [
    ["Not official", "These rankings are editorial reading paths, not official tier lists, balance tables, or Saroasis recommendations."],
    ["Pre-launch confidence", "Low to moderate. Public footage can reveal player questions and visible roles, but it cannot settle final live balance."],
    ["Ranking inputs", "Steam/store language, official media, visible route pressure, role coverage, source-linked reporting, and cautious guide analysis."],
    ["Update trigger", "After launch, replace watch-list rankings with dated patch context, test notes, and links to updated character, weapon, and map pages."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Rankings", href: "/rankings" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger editorial rankings", "Independent watch lists and reading priorities, not official Fate Trigger tier lists.", "/rankings", items.map((item) => ({ name: item.title, href: `/rankings#${item.slug}`, description: item.items.join(", ") })))} />
      <Breadcrumbs items={[{ label: "Rankings", href: "/rankings" }]} />
      <header className="page-header"><span className="eyebrow">Editorial Rankings</span><h1>Fate Trigger Rankings</h1><p>Internal rankings based on public footage and source-linked discussion. These lists are reading priorities and watch lists, not official tier lists.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Ranking methodology</h2>
          <p>Fate Trigger is still handled here as a pre-launch source-watch game, so rankings should help readers decide what to study first rather than pretend to solve the final meta. A release tracker can be ranked highly because it prevents fake-date confusion; a mobility Awakener can be ranked highly because route mistakes are common; a weapon category can be ranked highly because it teaches many fight types.</p>
          <table className="info-table"><tbody>{methodRows.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Use with caution</h2>
          <p>Do not treat these lists as official character strength, official weapon balance, or launch-day meta proof.</p>
          <p><a className="button primary" href="/release-date">Release tracker</a></p>
          <p><a className="button" href="/about">Disclaimer</a></p>
        </aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Rankings" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={"Editorial watch list"} href={`/rankings#${item.slug}`}><ol className="rank-list">{item.items.map((point) => <li key={point}>{point}</li>)}</ol></Card>)}
      </div></section>
    </>
  );
}
