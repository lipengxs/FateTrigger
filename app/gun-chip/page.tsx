import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList, cardImageFor } from "@/components/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Gun-Chip: Confirmed System Status", "Fate Trigger Gun-Chip explained with confirmed public context, unknown build details, official-source links, and update triggers.", "/gun-chip");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Gun-Chip", href: "/gun-chip" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Gun-Chip", href: "/gun-chip" }]} />
      <header className="page-header"><span className="eyebrow">System Status</span><h1>Fate Trigger Gun-Chip: What Is Confirmed</h1><p>Gun-Chip is a publicly discussed Fate Trigger system. Exact chip names, effects, slots, unlocks, costs, weapon pairings, and best builds are not presented as confirmed before official or reproducible public-test evidence exists.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Gun-Chip information boundary</h2>
          <table className="info-table"><tbody>
            <tr><th>Confirmed</th><td>Gun-Chip is a player-facing system that is relevant to Fate Trigger weapon and progression searches.</td></tr>
            <tr><th>Unknown</th><td>Exact chips, numeric effects, weapon compatibility, rarity, unlock conditions, costs, and balance implications.</td></tr>
            <tr><th>Not published here</th><td>Best build, best loadout, damage ranking, or day-one progression claims without primary-source support.</td></tr>
            <tr><th>Update trigger</th><td>Official system documentation, a developer trailer with explicit labels, or a public test that permits reproducible evidence.</td></tr>
          </tbody></table>
          <h2>What will make this page more useful</h2>
          <p>Once the evidence exists, this Hub will link to one page per confirmed chip or system rule. Each page will cite its source, name its game version or test period, state what remains unknown, and connect to the relevant weapon and character context.</p>
        </article>
        <aside className="article-aside"><h2>Read next</h2><p><a className="button primary" href="/weapons">Weapon status</a></p><p><a className="button" href="/media">Official footage</a></p><p><a className="button" href="/news">Official updates</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Related Information" title="Keep system claims tied to a source" /><div className="grid-3">
        <Card title="Fate Trigger Weapons" eyebrow="Status" href="/weapons" image={cardImageFor("weapons")} imageAlt="Fate Trigger weapon media"><p>See the boundary between public weapon context and unconfirmed final data.</p></Card>
        <Card title="Fate Trigger PC Requirements" eyebrow="PC" href="/guides/system-requirements-settings" image={cardImageFor("guide", "system-requirements-settings")} imageAlt="Fate Trigger PC requirements media"><p>Prepare the PC baseline from the official Steam listing.</p></Card>
        <Card title="Fate Trigger News" eyebrow="Updates" href="/news" image={cardImageFor("news")} imageAlt="Fate Trigger news media"><p>Track future system announcements before acting on build advice.</p></Card>
      </div></section>
      <SourceList />
    </>
  );
}
