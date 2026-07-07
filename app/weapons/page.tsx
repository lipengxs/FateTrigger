import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Weapons and Loadouts", "Independent Fate Trigger weapons guide for range bands, Gun-Chip planning, beginner loadouts, and source-safe pre-launch recommendations.", "/weapons");

export default function Page() {
  const items = siteContent.entries.filter((entry) => entry.category === "weapons");
  const guides = siteContent.guides.filter((guide) => ["best-weapons-to-learn-first", "gun-chip-loadout-guide", "gun-chip-build-scenarios", "gun-chip-progression-planning", "controller-keyboard-settings", "system-requirements-settings"].includes(guide.slug));
  const loadoutRows = [
    ["Default carry", "Flexible mid-range weapon", "Works across bridges, rooftops, platform edges, and sudden short trades."],
    ["Entry pressure", "Close-pressure weapon with a planned exit", "Strong only when an Awakener can create safe short angles and the squad can cover the reset."],
    ["Anchor role", "Long-sightline weapon", "Useful for crossing denial, revive cover, and platform control when the team protects the anchor."],
    ["Build planning", "Gun-Chip reliability first", "Recoil, reload, handling, and range stability should be tested before niche burst experiments."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Weapons and Equipment", href: "/weapons" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Weapons and Loadouts", href: "/weapons" }]} />
      <header className="page-header"><span className="eyebrow">Independent Loadout Hub</span><h1>Fate Trigger Weapons and Loadouts</h1><p>Plan weapons by range band, squad job, and route pressure. Pre-launch recommendations stay cautious until official stat tables, patch notes, and live matches confirm the final weapon meta.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Weapon learning order</h2>
          <p>The best weapon to learn first is the one that keeps a player useful across the most map states. Floating arenas punish loadouts that only work after a perfect engage, so the first priority is usually mid-range stability, then close-pressure entry tools, then long sightline anchoring.</p>
          <p>Gun-Chip planning should follow the same rule. Before launch, avoid final best-build claims. After launch, test reliability first: recoil control, reload exposure, swap timing, ammo pressure, and whether the build still works after a forced rotation.</p>
          <table className="info-table"><thead><tr><th>Use case</th><th>Loadout lens</th><th>Why it matters</th></tr></thead><tbody>{loadoutRows.map(([useCase, lens, why]) => <tr key={useCase}><th>{useCase}</th><td>{lens}</td><td>{why}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Trust rule</h2>
          <p>Damage, recoil, attachments, and Gun-Chip effects should not be treated as final until official or repeatable launch data exists.</p>
          <p><a className="button primary" href="/guides/best-weapons-to-learn-first">Weapon order</a></p>
          <p><a className="button" href="/guides/gun-chip-loadout-guide">Gun-Chip guide</a></p>
        </aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Weapon Guides" title="Learn loadouts by range, role, and build confidence" /><div className="grid-3">
        {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Database" title="Weapon and equipment entries" /><div className="grid-3">
        {items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} weapon artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
      </div></section>
    </>
  );
}
