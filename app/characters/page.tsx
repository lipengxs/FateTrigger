import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Characters and Awakeners", "Independent Fate Trigger character guide for Awakeners, role choice, team jobs, and source-safe pre-launch expectations.", "/characters");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "characters");
  const namedItems = items.filter((entry) => ["fally", "tata-and-bibi"].includes(entry.slug));
  const guides = siteContent.guides.filter((guide) => ["awakeners-role-guide", "best-awakeners-for-beginners", "solo-queue-awakener-picks", "squad-composition-guide", "fally-tata-bibi-character-watch", "fally-tata-bibi-role-comparison"].includes(guide.slug));
  const roleRows = [
    ["New players", "Start with mobility or control value before chasing burst highlights.", "These roles forgive route mistakes and teach bridge, rooftop, and reset timing."],
    ["Solo queue", "Prioritize self-exit, information, or revive safety.", "A solo player cannot assume perfect trades, so escape value matters more than theoretical damage."],
    ["Premade squads", "Assign jobs: entry, anchor, control, revive cover, and rotation caller.", "A coordinated team can make specialized Awakeners stronger because cooldowns are used as a group plan."],
    ["Tier lists", "Treat every ranking as editorial until final kits, cooldowns, and patch notes exist.", "Pre-launch footage can show style and role signals, but not stable live balance."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Characters and Classes", href: "/characters" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger character and Awakener watch", "Independent Fate Trigger character, Awakener, role, and named-character watch pages.", "/characters", [
        ...namedItems.map((entry) => ({ name: entry.title, href: `/characters/${entry.slug}`, description: entry.excerpt })),
        ...items.filter((entry) => !namedItems.includes(entry)).map((entry) => ({ name: entry.title, href: `/database/${entry.category}/${entry.slug}`, description: entry.excerpt }))
      ])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Characters and Awakeners", href: "/characters" }]} />
      <header className="page-header"><span className="eyebrow">Independent Character Hub</span><h1>Fate Trigger Characters and Awakeners</h1><p>Choose Awakeners by job first: mobility, control, burst, information, revive safety, and route security. This page separates public role signals from unconfirmed final stats and is not an official kit page.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>How to read Fate Trigger characters before launch</h2>
          <p>Fate Trigger character pages should not pretend to know final cooldowns, damage numbers, or tier placements before official launch data is public. The useful pre-launch method is to identify what problem each Awakener appears to solve: starting a fight, escaping a bridge, protecting a revive, controlling a platform, or helping the squad rotate.</p>
          <p>For beginners, the safest first choice is usually a role that keeps mistakes survivable. For experienced squads, the best role is the one that fills a missing job. A burst character can look exciting in footage, but a team with no reset tool, no scan, and no safe bridge crossing plan will still lose good openings.</p>
          <table className="info-table"><thead><tr><th>Player type</th><th>Recommended lens</th><th>Why it matters</th></tr></thead><tbody>{roleRows.map(([type, lens, why]) => <tr key={type}><th>{type}</th><td>{lens}</td><td>{why}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Official-status note</h2>
          <p>This is an independent fan guide. Character names, roles, and kit expectations should be checked against official sources before being treated as final.</p>
          <p><a className="button primary" href="/about">Read disclaimer</a></p>
          <p><a className="button" href="/media">Review footage</a></p>
        </aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Awakener Guides" title="Start with role choice, then named characters" /><div className="grid-3">
        {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Named Watch Pages" title="Character pages with source-safe boundaries" /><div className="grid-3">
        {namedItems.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/characters/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} character artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Database" title="Character and role entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={namedItems.includes(entry) ? `/characters/${entry.slug}` : `/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} character artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
