import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

const comparisonDetails: Record<string, { rows: Array<[string, string, string]>; bestFor: string[]; next: Array<[string, string]> }> = {
  "fate-trigger-vs-apex-legends": {
    rows: [
      ["Core loop", "Fate Trigger appears to emphasize anime hero tactical shooting, floating arenas, and pre-launch Gun-Chip questions.", "Apex Legends is the proven hero battle royale benchmark with established legends, ranked habits, and a mature movement meta."],
      ["Role choice", "Awakener choice should be judged by route safety, entry value, control, and revive windows until final stats are public.", "Apex legends have years of balance context, so players can compare stable meta history against a new launch environment."],
      ["Map pressure", "Floating-island routes make bridges, altitude, and reset paths unusually important.", "Apex maps are broader BR spaces with ring pressure, POI knowledge, and third-party timing."],
      ["Best search intent", "Fate Trigger release date, best Awakeners, Gun-Chip loadouts, floating map guide.", "Apex comparison searches usually ask whether Fate Trigger is a new anime alternative or a direct replacement."]
    ],
    bestFor: ["Players who want a new anime-styled hero shooter to track before launch.", "Apex players curious about vertical routes and ability-first tactical pressure.", "Guide readers searching for beginner Awakeners and weapon learning order."],
    next: [["Best Awakeners", "/guides/best-awakeners-for-beginners"], ["Weapon order", "/guides/best-weapons-to-learn-first"]]
  },
  "fate-trigger-vs-marvel-rivals": {
    rows: [
      ["Match format", "Fate Trigger should be evaluated as a source-watched tactical shooter with floating arenas, weapon range bands, Awakeners, and pre-launch release questions.", "Marvel Rivals is a team hero shooter, so comparisons are strongest around hero readability, role clarity, cooldown communication, and team-fight pacing."],
      ["Player skill transfer", "Hero ability timing can transfer, but Fate Trigger readers also need route exits, bridge safety, weapon discipline, and third-party awareness.", "Marvel Rivals players may understand ability combos quickly, but direct team-fight habits do not fully answer battle-arena movement and loadout questions."],
      ["Content angle", "Best Awakeners, weapon learning order, Gun-Chip builds, floating arena routes, release tracker, and source timeline.", "Useful competitor context for hero roles, visual readability, team composition, and whether Fate Trigger can communicate character jobs clearly."],
      ["Trust boundary", "Do not treat Fate Trigger character kits, weapon numbers, or launch timing as final until primary sources confirm them.", "Marvel Rivals has live-service public data and official hero pages, so it is a comparison benchmark rather than proof of Fate Trigger systems."]
    ],
    bestFor: ["Marvel Rivals players curious about an anime-styled shooter with more map-route and weapon-range pressure.", "Fate Trigger readers who want to separate hero-shooter appeal from confirmed launch data.", "SEO readers comparing role clarity, team composition, and ability readability."],
    next: [["Character roles", "/characters"], ["Squad comps", "/guides/squad-composition-guide"], ["Release tracker", "/release-date"]]
  },
  "fate-trigger-vs-fortnite": {
    rows: [
      ["Core identity", "Fate Trigger is positioned around hero tactical shooting, Awakeners, floating arenas, and source-linked pre-launch systems.", "Fortnite is a massive live platform with building, no-build, UGC, events, and cross-media scale."],
      ["Skill pressure", "Fate Trigger players should study ability timing, range bands, and escape routes.", "Fortnite adds construction, editing, item cycles, and frequent seasonal rule changes."],
      ["Map reading", "Floating platforms make vertical exits and bridge safety the key early topics.", "Fortnite map knowledge changes through seasonal POIs, mobility items, and storm pressure."],
      ["Best search intent", "Fate Trigger map guide, Awakeners role guide, Gun-Chip system explained.", "Fortnite comparison readers mostly need to know whether Fate Trigger is a focused shooter rather than a platform ecosystem."]
    ],
    bestFor: ["Players who want hero-shooter clarity instead of UGC platform complexity.", "Fortnite no-build players looking for ability-based squad fights.", "SEO readers comparing anime shooter identity with mainstream BR scale."],
    next: [["Vertical mistakes", "/guides/vertical-map-mistakes"], ["Gun-Chip guide", "/guides/gun-chip-loadout-guide"]]
  }
};

export function generateStaticParams() {
  return siteContent.comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteContent.comparisons.find((comparison) => comparison.slug === slug);
  if (!item) return {};
  return pageMeta(item.title, item.excerpt, "/comparisons/" + item.slug);
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
      <JsonLd data={articleJsonLd(item.title, item.excerpt, "/comparisons/" + item.slug)} />
      <Breadcrumbs items={[{ label: "Comparisons", href: "/resources" }, { label: item.title, href: "/comparisons/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">Independent Comparison</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="comparison" slug={item.slug} title={item.title} />
      <section className="section article-body"><article className="article-main"><h2>Gameplay comparison matrix</h2><p>{item.excerpt}</p><p>This is an independent comparison for player research, not a claim that Fate Trigger is officially positioned against this competitor.</p><table className="info-table"><thead><tr><th>Dimension</th><th>{siteContent.gameName}</th><th>Competitor context</th></tr></thead><tbody>{detail.rows.map(([dimension, game, competitor]) => <tr key={dimension}><th>{dimension}</th><td>{game}</td><td>{competitor}</td></tr>)}</tbody></table><div className="content-block"><h2>Who should watch this game?</h2><ul className="check-list">{detail.bestFor.map((point) => <li key={point}>{point}</li>)}</ul></div></article><aside className="article-aside"><h2>Read next</h2>{detail.next.map(([label, href]) => <p key={href}><a className="button" href={href}>{label}</a></p>)}<p><a className="button" href="/resources">Source list</a></p></aside></section>
      <SourceList />
    </>
  );
}
