import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Gun-Chip Hub", "Independent Fate Trigger Gun-Chip, weapon, loadout, range-band, and progression planning guides without unconfirmed final stats.", "/gun-chip");

export default function Page() {
  const guideSlugs = [
    "gun-chip-loadout-guide",
    "gun-chip-build-scenarios",
    "gun-chip-progression-planning",
    "best-weapons-to-learn-first",
    "system-requirements-settings",
    "squad-composition-guide"
  ];
  const guides = guideSlugs
    .map((slug) => siteContent.guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is typeof siteContent.guides[number] => Boolean(guide));
  const weaponEntries = siteContent.entries.filter((entry) => entry.category === "weapons");
  const planningRows = [
    ["Baseline", "Start with a reliable mid-range weapon before chasing rare or highly specialized builds."],
    ["Scenario", "Describe the fight first: bridge pressure, close entry, long sightline, platform trade, or reset safety."],
    ["Role fit", "Pair weapon tuning with the Awakener job: entry, control, anchor, information, or support."],
    ["Evidence limit", "Do not claim final chip names, damage values, unlock paths, or best-in-slot setups until official data exists."],
    ["Launch update", "Convert this hub into dated tables after public builds confirm chip effects, recoil notes, and patch balance."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Gun-Chip", href: "/gun-chip" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger Gun-Chip and weapon guide path", "Independent Fate Trigger weapon and Gun-Chip planning pages focused on source-safe loadout decisions.", "/gun-chip", guides.map((guide) => ({ name: guide.title, href: `/guides/${guide.slug}`, description: guide.excerpt })))} />
      <Breadcrumbs items={[{ label: "Gun-Chip", href: "/gun-chip" }]} />
      <header className="page-header">
        <span className="eyebrow">Weapon System Hub</span>
        <h1>Fate Trigger Gun-Chip Hub</h1>
        <p>Weapon range bands, Gun-Chip planning, loadout scenarios, and progression notes for Fate Trigger. This hub avoids final stat claims until official data or repeatable public match evidence exists.</p>
      </header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Build around repeatable fights</h2>
          <p>Pre-launch Gun-Chip content should help players think, not pretend to be a final calculator. The strongest early framework is to connect a weapon range, an Awakener job, and the route pressure the squad can repeatedly create.</p>
          <table className="info-table"><tbody>{planningRows.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Do not claim</h2>
          <p>No final chip values, drop rates, unlock costs, best builds, or official recommendations are claimed here before launch data supports them.</p>
          <p><a className="button primary" href="/weapons">Weapons hub</a></p>
          <p><a className="button" href="/rankings">Editorial rankings</a></p>
        </aside>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Guide Path" title="Gun-Chip and weapon pages" />
        <div className="grid-3">
          {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Loadout guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Database" title="Weapon entries to watch" />
        <div className="grid-3">
          {weaponEntries.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} weapon artwork`}><><p>{entry.excerpt}</p><Tags tags={entry.tags} /></></Card>)}
        </div>
      </section>
    </>
  );
}
