import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Maps and Floating Arena Routes", "Independent Fate Trigger map guide for floating arenas, safe starts, bridge chains, high ground, endgame zones, and route planning.", "/maps");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "maps");
  const guides = siteContent.guides.filter((guide) => ["floating-arena-route-guide", "vertical-map-mistakes", "floating-map-landing-zones", "first-day-route-plan", "endgame-zone-rotation-guide", "boss-fight-third-party-guide"].includes(guide.slug));
  const routeRows = [
    ["First landing", "Name the nearest exit before looting.", "A low-contest start is only safe if the squad can leave before a third party arrives."],
    ["Bridge chains", "Cross with cooldowns, overwatch, and a reason.", "Bridges reveal intent; a bad crossing spends movement and gives enemies a clean angle."],
    ["High ground", "Use height for information and resets, not permanent comfort.", "The best rooftop can become a trap once zone movement or a second squad changes the route."],
    ["Endgame zone", "Save one reset tool for the final island shift.", "Late circles punish squads that win a fight but cannot leave the exposed platform afterward."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Maps and Environments", href: "/maps" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Maps and Floating Arena Routes", href: "/maps" }]} />
      <header className="page-header"><span className="eyebrow">Independent Map Hub</span><h1>Fate Trigger Maps and Floating Arena Routes</h1><p>Read the arena as a route puzzle: safe starts, bridge exposure, rooftop resets, cloudline flanks, and endgame escape options matter as much as raw aim.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>How to study floating maps</h2>
          <p>Fate Trigger's floating arenas make every path a public signal. A bridge crossing tells other squads where you are going. A rooftop hold can protect a revive or trap the team after the zone moves. A cloudline flank can be a safe reset or a low-value detour if the squad arrives too late.</p>
          <p>The beginner goal is not memorizing every location name before launch. It is learning a repeatable decision loop: find an exit, take one controlled fight, reset before the third party arrives, and keep enough cooldown value for the next island shift.</p>
          <table className="info-table"><thead><tr><th>Map moment</th><th>Route rule</th><th>Why it matters</th></tr></thead><tbody>{routeRows.map(([moment, rule, why]) => <tr key={moment}><th>{moment}</th><td>{rule}</td><td>{why}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Map data note</h2>
          <p>Route names and screenshots should be updated after official map terminology and legally usable media are available.</p>
          <p><a className="button primary" href="/guides/floating-arena-route-guide">Route guide</a></p>
          <p><a className="button" href="/guides/vertical-map-mistakes">Common mistakes</a></p>
        </aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Map Guides" title="Routes, landing zones, third parties, and endgame movement" /><div className="grid-3">
        {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Database" title="Map and route entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} map artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
