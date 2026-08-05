import { Breadcrumbs, FactPanel, FaqBlock, JsonLd, ReleaseBlock, SourceList, SourceTimeline } from "@/components/site";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { siteContent } from "@/lib/content";

export const metadata = pageMeta("Fate Trigger Release Date, Beta, Platforms, and Early Access Status", "Is Fate Trigger out? Current 2026 Steam release window, beta status, confirmed PC availability, platform watch, and official sources.", "/release-date");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Release Date", href: "/release-date" }])} />
      <JsonLd data={faqJsonLd()} />
      <Breadcrumbs items={[{ label: "Fate Trigger Release Date", href: "/release-date" }]} />
      <header className="page-header"><span className="eyebrow">Official Status Watch</span><h1>Fate Trigger Release Date and Current Launch Status</h1><p>Fate Trigger is not released. Steam currently shows a 2026 release window, while an exact launch day, unlock time, and the next public beta have not been confirmed.</p></header>
      <ReleaseBlock />
      <section className="section article-body">
        <article className="article-main">
          <h2>What is confirmed today</h2>
          <table className="info-table"><tbody>
            <tr><th>Release date</th><td>Steam lists 2026. No precise public launch date or countdown is confirmed.</td></tr>
            <tr><th>PC</th><td>Steam is the confirmed public PC storefront.</td></tr>
            <tr><th>Console and cross-play</th><td>Do not treat reported platform plans as a launch promise. Cross-play, progression, account linking, and input matchmaking need an official platform or developer announcement.</td></tr>
            <tr><th>Earlier Early Access reports</th><td>They are historical context only. The later developer schedule adjustment is the current planning boundary.</td></tr>
          </tbody></table>
          <h2>Next official update trigger</h2>
          <p>This page changes only when Steam, Saroasis, an official platform store, or an official trailer card adds or revises a release date, beta, supported platform, or public access rule.</p>
        </article>
        <aside className="article-aside"><h2>Verify the source</h2><p><a className="button primary" href={siteContent.sources[0][1]} target="_blank" rel="nofollow noopener noreferrer">Open Steam</a></p><p><a className="button" href="/guides/ps5-steam-platform-choice-guide">Platform status</a></p><p><a className="button" href="/news">Official updates</a></p></aside>
      </section>
      <SourceTimeline />
      <section className="section"><FactPanel /></section>
      <FaqBlock />
      <SourceList />
    </>
  );
}
