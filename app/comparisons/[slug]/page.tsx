import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

const comparisonDetails: Record<string, { rows: Array<[string, string, string]>; bestFor: string[]; next: Array<[string, string]> }> = {
  "fate-trigger-vs-apex-legends": {
    rows: [
      ["Current access", "Not released. Steam lists a 2026 window, with exact launch timing and beta access still unconfirmed.", "Live and playable, with established updates, queues, and public gameplay information."],
      ["Core identity", "A free-to-play anime-style hero tactical shooter with Awakeners and a publicly discussed Gun-Chip system.", "A live battle royale hero shooter with established Legends, maps, and a mature competitive ecosystem."],
      ["Characters and systems", "Named-character and system pages should be read as confirmed-status watches until official kits and data are published.", "Legend abilities, balance context, and most system rules are documented through the live game and official updates."],
      ["Platforms", "Steam is the confirmed public PC storefront. Console, cross-play, progression, and input rules need official confirmation.", "Available across established PC and console platforms; players should still check current regional/platform support."],
      ["Monetization and purchase boundary", "Public material positions Fate Trigger as free-to-play, but launch monetization details should be verified from official store pages.", "Free-to-play with live-service monetization already documented by its publisher."],
      ["Who should follow it", "Players who want to track a new anime hero shooter and are comfortable waiting for verified beta, platform, and system details.", "Players who want a playable, established hero battle royale today."]
    ],
    bestFor: ["Players deciding whether to follow Fate Trigger before launch or keep playing Apex Legends now.", "Apex players comparing a new hero-shooter watchlist without assuming a direct replacement.", "Readers who need platform, release, and system-confirmation boundaries before making a choice."],
    next: [["Release status", "/release-date"], ["Platform status", "/guides/ps5-steam-platform-choice-guide"], ["Awakeners", "/characters"]]
  },
  "fate-trigger-vs-marvel-rivals": {
    rows: [
      ["Match format", "Fate Trigger should be evaluated as a source-watched tactical shooter with floating arenas, weapon range bands, Awakeners, and pre-launch release questions.", "Marvel Rivals is a team hero shooter, so comparisons are strongest around hero readability, role clarity, cooldown communication, and team-fight pacing."],
      ["Player skill transfer", "Hero ability timing can transfer, but Fate Trigger readers also need route exits, bridge safety, weapon discipline, and third-party awareness.", "Marvel Rivals players may understand ability combos quickly, but direct team-fight habits do not fully answer battle-arena movement and loadout questions."],
      ["Content angle", "Best Awakeners, weapon learning order, Gun-Chip builds, floating arena routes, release tracker, and source timeline.", "Useful competitor context for hero roles, visual readability, team composition, and whether Fate Trigger can communicate character jobs clearly."],
      ["Trust boundary", "Do not treat Fate Trigger character kits, weapon numbers, or launch timing as final until primary sources confirm them.", "Marvel Rivals has live-service public data and official hero pages, so it is a comparison benchmark rather than proof of Fate Trigger systems."]
    ],
    bestFor: ["Marvel Rivals players curious about an anime-styled shooter with more map-route and weapon-range pressure.", "Fate Trigger readers who want to separate hero-shooter appeal from confirmed launch data.", "SEO readers comparing role clarity, team composition, and ability readability."],
    next: [["Character status", "/characters"], ["Platform status", "/guides/ps5-steam-platform-choice-guide"], ["Release tracker", "/release-date"]]
  },
  "fate-trigger-vs-fortnite": {
    rows: [
      ["Core identity", "Fate Trigger is positioned around hero tactical shooting, Awakeners, floating arenas, and source-linked pre-launch systems.", "Fortnite is a massive live platform with building, no-build, UGC, events, and cross-media scale."],
      ["Skill pressure", "Fate Trigger players should study ability timing, range bands, and escape routes.", "Fortnite adds construction, editing, item cycles, and frequent seasonal rule changes."],
      ["Map reading", "Floating platforms make vertical exits and bridge safety the key early topics.", "Fortnite map knowledge changes through seasonal POIs, mobility items, and storm pressure."],
      ["Best search intent", "Fate Trigger map guide, Awakeners role guide, Gun-Chip system explained.", "Fortnite comparison readers mostly need to know whether Fate Trigger is a focused shooter rather than a platform ecosystem."]
    ],
    bestFor: ["Players who want hero-shooter clarity instead of UGC platform complexity.", "Fortnite no-build players looking for ability-based squad fights.", "SEO readers comparing anime shooter identity with mainstream BR scale."],
    next: [["Map status", "/maps"], ["Gun-Chip status", "/gun-chip"]]
  }
};

export function generateStaticParams() {
  return siteContent.comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteContent.comparisons.find((comparison) => comparison.slug === slug);
  if (!item) return {};
  const metadata = pageMeta(item.title, item.excerpt, "/comparisons/" + item.slug);
  return item.slug === "fate-trigger-vs-apex-legends" ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteContent.comparisons.find((comparison) => comparison.slug === slug);
  if (!item) notFound();
  const detail = comparisonDetails[item.slug] || {
    rows: [["Gameplay loop", item.excerpt, "Use public footage and official store pages as the comparison baseline."]],
    bestFor: ["Players comparing confirmed public systems before launch."],
    next: [["Guides", "/guides"], ["Database", "/database"]]
  };
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Comparisons", href: "/resources" }, { name: item.title, href: "/comparisons/" + item.slug }])} />
      {item.slug === "fate-trigger-vs-apex-legends" ? <JsonLd data={articleJsonLd(item.title, item.excerpt, "/comparisons/" + item.slug)} /> : null}
      <Breadcrumbs items={[{ label: "Comparisons", href: "/resources" }, { label: item.title, href: "/comparisons/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">Independent Comparison</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="comparison" slug={item.slug} title={item.title} />
      <section className="section article-body"><article className="article-main"><h2>Gameplay comparison matrix</h2><p>{item.excerpt}</p><p>This is an independent comparison for player research, not a claim that Fate Trigger is officially positioned against this competitor.</p><table className="info-table"><thead><tr><th>Dimension</th><th>{siteContent.gameName}</th><th>Competitor context</th></tr></thead><tbody>{detail.rows.map(([dimension, game, competitor]) => <tr key={dimension}><th>{dimension}</th><td>{game}</td><td>{competitor}</td></tr>)}</tbody></table><div className="content-block"><h2>Who should watch this game?</h2><ul className="check-list">{detail.bestFor.map((point) => <li key={point}>{point}</li>)}</ul></div></article><aside className="article-aside"><h2>Read next</h2>{detail.next.map(([label, href]) => <p key={href}><a className="button" href={href}>{label}</a></p>)}<p><a className="button" href="/resources">Source list</a></p></aside></section>
      <SourceList />
    </>
  );
}
