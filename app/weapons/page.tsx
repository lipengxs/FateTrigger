import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList, cardImageFor } from "@/components/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Weapons: Confirmed Information and Gun-Chip Status", "Fate Trigger weapons and Gun-Chip status: what official material confirms, what remains unknown, and where to verify future weapon details.", "/weapons");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Weapons", href: "/weapons" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Weapons", href: "/weapons" }]} />
      <header className="page-header"><span className="eyebrow">Weapon Status</span><h1>Fate Trigger Weapons and Gun-Chip Status</h1><p>Fate Trigger is a weapon-based hero shooter, but final weapon stats, recoil, attachments, Gun-Chip effects, unlock paths, and best builds are not treated as confirmed before public evidence exists.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Confirmed, unknown, and held back</h2>
          <table className="info-table"><tbody>
            <tr><th>Confirmed topic</th><td>Gun-Chip is a publicly discussed Fate Trigger system and is tracked as a system watch.</td></tr>
            <tr><th>Weapon data</th><td>Exact names, stats, recoil, attachment rules, and unlock paths require official pages or repeatable public-test evidence.</td></tr>
            <tr><th>Best weapon searches</th><td>This site does not publish a pre-launch tier list or pretend that trailer footage proves a final meta.</td></tr>
            <tr><th>Next update trigger</th><td>An official weapon page, public build, patch note, or documented test with reproducible data.</td></tr>
          </tbody></table>
          <h2>How to prepare without a fake loadout guide</h2>
          <p>Use the Steam page for PC readiness, follow official trailers for visible systems, and return to this hub when Saroasis publishes a weapon or Gun-Chip breakdown. At that point, each system entry can cover one confirmed mechanic with its source and version boundary.</p>
        </article>
        <aside className="article-aside"><h2>Read next</h2><p><a className="button primary" href="/gun-chip">Gun-Chip hub</a></p><p><a className="button" href="/guides/system-requirements-settings">PC requirements</a></p><p><a className="button" href="/media">Official footage</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="System Links" title="Use the right source for each question" /><div className="grid-3">
        <Card title="Fate Trigger Gun-Chip" eyebrow="System" href="/gun-chip" image={cardImageFor("weapons")} imageAlt="Fate Trigger official weapon media"><p>See the current source boundary for Gun-Chip without speculative builds.</p></Card>
        <Card title="Fate Trigger PC Requirements" eyebrow="PC" href="/guides/system-requirements-settings" image={cardImageFor("guide", "system-requirements-settings")} imageAlt="Fate Trigger system requirements media"><p>Prepare from the official Steam listing rather than copied spec pages.</p></Card>
        <Card title="Fate Trigger News" eyebrow="Updates" href="/news" image={cardImageFor("news")} imageAlt="Fate Trigger news media"><p>Follow official announcements that can support future weapon and system pages.</p></Card>
      </div></section>
      <SourceList />
    </>
  );
}
