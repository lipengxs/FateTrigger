import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.entries.map((entry) => ({ category: entry.category, slug: entry.slug }));
}

function getEntry(category: string, slug: string) {
  return siteContent.entries.find((entry) => entry.category === category && entry.slug === slug);
}

type Entry = NonNullable<ReturnType<typeof getEntry>>;
type Guide = typeof siteContent.guides[number];

function categoryGuidance(category: string) {
  if (category === "characters") return ["Role to test", "Pair this identity with route safety and information before judging damage.", "Recheck after official Awakener names, cooldowns, and squad limits are published."];
  if (category === "weapons") return ["Loadout use", "Treat this as a range-band option and compare it against mobility, ammo pressure, and final recoil.", "Recheck after public stat tables or patch notes exist."];
  if (category === "maps") return ["Map decision", "Use this area to plan entry timing, exits, and third-party risk rather than only loot value.", "Recheck when official map names and screenshots are available."];
  return ["Lore / system note", "Use this entry to understand public worldbuilding or system framing without inventing unconfirmed story beats.", "Recheck after official lore posts, patch notes, or launch codex text."];
}

function tokensFor(value: string) {
  const stop = new Set(["fate", "trigger", "guide", "with", "from", "that", "this", "when", "into", "best", "public"]);
  return value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 3 && !stop.has(token));
}

function relatedGuides(entry: Entry) {
  const entryTokens = new Set(tokensFor([entry.title, entry.role, entry.excerpt, ...entry.tags].join(" ")));
  return siteContent.guides
    .map((guide) => {
      const text = [guide.title, guide.excerpt, ...guide.keywords, ...guide.bullets].join(" ");
      const score = tokensFor(text).filter((token) => entryTokens.has(token)).length;
      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.guide);
}

function categoryHub(category: string) {
  if (category === "characters") return "/characters";
  if (category === "weapons") return "/weapons";
  if (category === "maps") return "/maps";
  if (category === "lore") return "/lore";
  return "/database";
}

function deepDiveFor(slug: string) {
  const links: Record<string, string> = {
    "fally": "/guides/fally-tata-bibi-role-comparison",
    "tata-and-bibi": "/guides/fally-tata-bibi-role-comparison",
    "gun-chip-system": "/guides/gun-chip-progression-planning",
    "endgame-zone": "/guides/endgame-zone-rotation-guide",
    "omnisight": "/guides/omnisight-anti-cheat-fair-play-guide",
    "platform-watch": "/guides/ps5-steam-platform-choice-guide",
    "mobility-awakener": "/guides/best-awakeners-for-beginners",
    "control-awakener": "/guides/awakeners-role-guide",
    "burst-awakener": "/guides/awakeners-role-guide",
    "central-platform": "/guides/floating-arena-route-guide",
    "bridge-chains": "/guides/vertical-map-mistakes",
    "cloudline-flanks": "/guides/endgame-zone-rotation-guide"
  };
  return links[slug] || null;
}

function decisionProfile(category: string, entry: Entry) {
  if (category === "characters") {
    return [
      ["Choose this Awakener when", `${entry.excerpt} It fits squads that want a defined ${entry.role.toLowerCase()} job instead of three players chasing the same angle.`],
      ["Avoid forcing it when", "Your team has not agreed on entry order, revive cover, or the escape route after first contact."],
      ["Pair with", "A mid-range rifle user who can trade across floating platforms and a control teammate who can slow bridge pushes."],
      ["Practice focus", "Review public footage for cooldown timing, vertical exits, and whether the Awakener creates safe resets after a failed engage."]
    ];
  }
  if (category === "weapons") {
    return [
      ["Choose this weapon when", `${entry.excerpt} It is strongest when its range band matches the route your squad plans to take.`],
      ["Avoid forcing it when", "The final circle, island gap, or bridge exposure asks for a different range profile than the weapon can cover."],
      ["Pair with", "An Awakener role that can either open the fight safely or disengage before ammo pressure becomes a liability."],
      ["Practice focus", "Track recoil, swap timing, reload exposure, and how often public footage shows the weapon winning without ability support."]
    ];
  }
  if (category === "maps") {
    return [
      ["Choose this route when", `${entry.excerpt} Treat it as a timing decision: strong only if your squad knows the entry and the exit.`],
      ["Avoid forcing it when", "Enemy squads already control height, the bridge is exposed, or your revive path would be visible from multiple islands."],
      ["Pair with", "Information, mobility, and a stable mid-range anchor so the team can cross, scout, and reset without overcommitting."],
      ["Practice focus", "Study entrances, third-party sightlines, cover density, zipline or bridge equivalents, and late-zone escape options."]
    ];
  }
  return [
    ["Use this page for", `${entry.excerpt} It explains the idea as editorial context, not as confirmed codex text.`],
    ["Avoid treating it as", "Official lore, final launch balance, or proof that a feature will ship exactly as early public materials imply."],
    ["Pair with", "Release tracking, trailer notes, and official source links before making platform, build, or competitive assumptions."],
    ["Practice focus", "Revisit this entry whenever Saroasis publishes new lore, anti-cheat notes, platform details, or launch documentation."]
  ];
}

function tacticalRead(category: string, entry: Entry) {
  if (category === "characters") {
    return `${entry.title} should be judged by decision quality before damage output. In a floating-arena shooter, a ${entry.role.toLowerCase()} identity matters only if it helps the squad enter, trade, revive, or leave with fewer exposed seconds. The useful question is not "is this the strongest Awakener?" but "what mistake does this role forgive, and what mistake does it punish?"`;
  }
  if (category === "weapons") {
    return `${entry.title} belongs in a loadout discussion, not a raw DPS chart. Public material is not enough to lock final recoil, damage, attachment, or Gun-Chip value, so this page treats the weapon as a job: what range it owns, what routes it supports, and when it becomes a liability.`;
  }
  if (category === "maps") {
    return `${entry.title} is a route-planning entry. Floating arenas make map value unstable because high ground, exposed crossings, and third-party angles can turn a good loot area into a trap. Read this page as a decision aid for timing, not as a fixed loot ranking.`;
  }
  return `${entry.title} is included because pre-launch players search for more than weapon stats. Lore, platform trust, anti-cheat expectations, and worldbuilding all shape whether Fate Trigger feels worth following. This entry separates confirmed public framing from cautious editorial interpretation.`;
}

function searchAnswer(category: string, entry: Entry) {
  if (category === "characters") return `${entry.title} is currently best understood as a ${entry.role.toLowerCase()} concept for players comparing Fate Trigger characters and team roles before official final names and balance values are public.`;
  if (category === "weapons") return `${entry.title} is a Fate Trigger weapon-category guide for players comparing best weapons, range bands, and pre-launch loadout priorities from public footage.`;
  if (category === "maps") return `${entry.title} is a Fate Trigger map and route note for players looking for floating-island rotations, third-party risk, and beginner-safe pathing.`;
  return `${entry.title} is a Fate Trigger lore and systems note written for players who want the background, fair-play context, and public story framing without mistaking it for an official wiki.`;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const entry = getEntry(category, slug);
  if (!entry) return {};
  return pageMeta(entry.title + " - " + siteContent.gameName, entry.excerpt, `/database/${category}/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const entry = getEntry(category, slug);
  if (!entry) notFound();
  const [angle, recommendation, updateRule] = categoryGuidance(category);
  const image = cardImageFor(category, entry.slug);
  const profile = decisionProfile(category, entry);
  const guides = relatedGuides(entry);
  const deepDive = deepDiveFor(entry.slug);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Database", href: "/database" }, { name: entry.title, href: `/database/${category}/${slug}` }])} />
      <JsonLd data={articleJsonLd(entry.title, entry.excerpt, `/database/${category}/${slug}`)} />
      <Breadcrumbs items={[{ label: "Database", href: "/database" }, { label: category, href: "/database/" + category }, { label: entry.title, href: `/database/${category}/${slug}` }]} />
      <header className="page-header"><span className="eyebrow">{entry.role}</span><h1>{entry.title}</h1><p>{entry.excerpt}</p></header>
      <DetailHeaderImage type={category} slug={entry.slug} title={entry.title} />
      <section className="section article-body">
        <article className="article-main">
          <figure className="article-figure"><img src={image} alt={`${entry.title} Fate Trigger database media`} /><figcaption>Database media favors localized public footage and official-source thumbnails where available, with cautious independent analysis in the text.</figcaption></figure>
          <p>{tacticalRead(category, entry)}</p>
          <p>Best use case: {entry.excerpt}</p>
          <table className="info-table"><tbody><tr><th>{angle}</th><td>{recommendation}</td></tr><tr><th>Current confidence</th><td>Moderate. The recommendation is based on public footage, Steam language, source-linked reporting, and cautious pre-launch analysis rather than final launch stats.</td></tr><tr><th>Update rule</th><td>{updateRule}</td></tr></tbody></table>
          <div className="content-block"><h2>Decision profile</h2><table className="info-table"><tbody>{profile.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table></div>
          <div className="content-block"><h2>Strengths and watch-outs</h2><ul className="check-list">{entry.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
          <div className="content-block"><h2>How to use this entry</h2><p>{searchAnswer(category, entry)}</p><p>Use it with the release tracker and trailer notes before making assumptions about tier lists, best weapons, or day-one builds. The page is intentionally written as an independent fan guide so players can separate observed signals from official confirmation.</p></div>
          {guides.length ? <div className="content-block"><h2>Related Fate Trigger guides</h2><div className="link-list">{guides.map((guide: Guide) => <a key={guide.slug} href={`/guides/${guide.slug}`}><strong>{guide.title}</strong><span>{guide.excerpt}</span></a>)}</div></div> : null}
          <Tags tags={entry.tags} />
        </article>
        <aside className="article-aside"><h2>Read next</h2><p>Use these links to compare this entry with footage, rankings, and broader database context.</p>{deepDive ? <p><a className="button primary" href={deepDive}>Full deep-dive guide</a></p> : null}<p><a className="button" href={categoryHub(category)}>Open category hub</a></p><p><a className="button" href="/rankings">View rankings</a></p><p><a className="button" href="/media">Check footage</a></p><p><a className="button" href="/guides">Guide index</a></p></aside>
      </section>
      <SourceList />
    </>
  );
}
