import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList, cardImageFor } from "@/components/site";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

const startingPoints = [
  ["Fate Trigger Release Date", "/release-date", "Check whether the public Steam window, beta status, or platform information has changed."],
  ["Fate Trigger PC Requirements", "/guides/system-requirements-settings", "Prepare from the Steam listing and avoid copied performance presets before a public build exists."],
  ["Fate Trigger Platforms", "/guides/ps5-steam-platform-choice-guide", "Separate confirmed Steam availability from unconfirmed console and cross-play details."],
  ["Fate Trigger Characters", "/characters", "Review named Awakeners and their evidence boundaries without using a pre-launch tier list."],
  ["Fate Trigger Official News", "/news", "Follow official announcements and trailer updates that can change the information above."]
] as const;

export const metadata = pageMeta("Fate Trigger Beginner Guide: Official Information First", "A safe Fate Trigger beginner path for release status, official news, PC requirements, platform questions, and confirmed Awakener information.", "/beginner");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Beginner Guide", href: "/beginner" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger beginner information path", "A source-aware Fate Trigger starting path centered on confirmed release, platform, PC, and character information.", "/beginner", startingPoints.map(([name, href, description]) => ({ name, href, description })))} />
      <Breadcrumbs items={[{ label: "Fate Trigger Beginner Guide", href: "/beginner" }]} />
      <header className="page-header"><span className="eyebrow">Start Here</span><h1>Fate Trigger Beginner Guide: What to Check First</h1><p>Fate Trigger is still a pre-release game. The best first step is verifying access, PC readiness, platforms, and official character information, not following a made-up route, build, or tier list.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>A safe pre-release checklist</h2>
          <table className="info-table"><tbody>
            <tr><th>Before download</th><td>Use the official Steam page and official channels. This site does not provide game files, keys, cracks, or access offers.</td></tr>
            <tr><th>Before choosing a platform</th><td>Confirm PC, console, cross-play, progression, and input rules from an official storefront or developer announcement.</td></tr>
            <tr><th>Before choosing a character</th><td>Read confirmed named-character information and wait for official kit details before trusting rankings.</td></tr>
            <tr><th>When a public test opens</th><td>Return for dated requirements, official test instructions, and evidence-backed system pages.</td></tr>
          </tbody></table>
        </article>
        <aside className="article-aside"><h2>Primary source</h2><p><a className="button primary" href="/release-date">Release status</a></p><p><a className="button" href="/news">Official updates</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Reading Path" title="Start with the answers that are verifiable" /><div className="grid-3">
        {startingPoints.map(([title, href, text]) => <Card key={href} title={title} eyebrow="Fate Trigger" href={href} image={cardImageFor("guide", title.toLowerCase())} imageAlt={`${title} source guide media`}><p>{text}</p></Card>)}
      </div></section>
      <SourceList />
    </>
  );
}
