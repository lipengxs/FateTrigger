import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta, videoJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.guides.map((item) => ({ slug: item.slug }));
}

function getItem(slug: string) {
  return siteContent.guides.find((item) => item.slug === slug);
}

const guideRows: Record<string, Array<[string, string, string]>> = {
  "fate-trigger-beginner-guide": [["First match goal", "Stay alive through the first rotation and learn vertical exits before chasing eliminations.", "Works because public footage emphasizes floating lanes, third-party pressure, and ability-based repositioning."], ["Best early habit", "Call cooldowns before crossing exposed bridges or open sky lanes.", "It prevents the most common pre-launch mistake: entering a fight with no escape tool."], ["Update trigger", "Replace role labels with official Awakener names once final launch terminology is published.", "Keeps the guide accurate without pretending balance is final."]],
  "fate-trigger-release-date-tracker": [["Trusted baseline", "Use Steam and official channel posts as the release-date baseline.", "Fate Trigger has had adjusted access timing, so search snippets can lag behind."], ["Countdown rule", "Do not show a timer until an exact date and time is public.", "This avoids fake precision and protects the site's credibility."], ["Player action", "Wishlist the Steam page, follow the official video channel, and ignore key sites.", "Pre-launch shooter searches attract unofficial downloads and misleading access claims."]],
  "awakeners-role-guide": [["Role lens", "Judge Awakeners by entry, scout, control, burst, revive safety, and route security.", "Damage numbers are less useful before official kits and patch notes are locked."], ["Squad pairing", "Pair mobility with information or area denial instead of stacking only duel tools.", "Floating arenas punish isolated pushes and reward safe rotations."], ["Ranking rule", "Keep rankings editorial until official names, cooldowns, and stats are confirmed.", "This keeps tier-list pages useful without claiming official authority."]],
  "floating-arena-route-guide": [["Route priority", "Identify exits before looting central platforms or challenging bridges.", "Sky-island layouts make the escape path as important as the first angle."], ["Fight selection", "Use high ground to reset bad fights, not only to start aggressive ones.", "Vertical maps can turn a winning duel into a third-party collapse."], ["Map update", "Add timestamped screenshots only when clearly credited and legally usable.", "The site should analyze public footage without rehosting protected assets unnecessarily."]],
  "gun-chip-loadout-guide": [["Loadout baseline", "Treat a stable mid-range weapon as the default learning tool.", "Most public footage shows flexible ranges rather than one static duel distance."], ["Build caution", "Avoid declaring a best Gun-Chip build before final stats exist.", "Pre-launch systems can change dramatically between tests and launch."], ["Team use", "Assign one close-pressure option and one anchor option per squad when possible.", "That gives the team a way to enter, stabilize, and disengage."]],
  "system-requirements-settings": [["PC priority", "Prioritize frame stability, clean visibility, and updated GPU drivers.", "Competitive shooters feel worse when settings chase visuals over input clarity."], ["Storage planning", "Leave extra space beyond the Steam requirement for patches and shader caches.", "Live-service style launches often move quickly after release."], ["Verification", "Use Steam requirements before buying hardware or posting final settings.", "Third-party spec pages can go stale."]],
  "best-awakeners-for-beginners": [["If you die rotating", "Start with a mobility-style Awakener and learn safe exits before chasing fights.", "The map teaches faster when mistakes do not end every push."], ["If your squad loses resets", "Pick control or revive-safety value before burst.", "A saved teammate can be worth more than one opener."], ["If you win aim duels but lose matches", "Choose information or route control.", "Floating arenas punish squads that cannot read the next collapse."]],
  "fally-tata-bibi-character-watch": [["Public signal", "Track names and trailer role clues without claiming final kits.", "Character marketing can arrive before confirmed cooldowns or stats."], ["Ranking rule", "Keep watch-list entries separate from official tier lists.", "This protects trust and makes future updates cleaner."], ["Next update", "Split into individual profiles once official kit pages exist.", "Individual pages can target long-tail searches for each character."]],
  "best-weapons-to-learn-first": [["First weapon type", "Use a mid-range rifle or equivalent flexible option.", "It covers bridges, rooftops, and platform edges without forcing overcommitment."], ["Second weapon type", "Add close pressure after you can control entry routes.", "Close weapons need map timing more than raw confidence."], ["Advanced weapon type", "Study long sightlines only when the squad can protect anchors.", "Anchors are strong until a second team collapses the route."]],
  "vertical-map-mistakes": [["Bridge mistake", "Crossing after spending movement cooldowns.", "The bridge becomes a firing lane with no escape plan."], ["Central platform mistake", "Looting without naming an exit.", "High-value zones attract third parties and multiple angles."], ["Height mistake", "Holding high ground after the zone or route has changed.", "Height is information, not a permanent home."]],
  "mistfall-hunter-beginner-guide": [["First extraction goal", "Leave with modest loot instead of forcing boss rooms on the first run.", "Mistfall's PvPvE structure rewards survival knowledge before greed."], ["Best habit", "Mark the Returner Woodling path early and fight only when you still have an exit.", "Extraction games punish players who discover the escape route too late."], ["Update trigger", "Refresh class recommendations after launch patch notes and community data arrive.", "Class strength can swing after anti-cheat, matchmaking, and loot tuning updates."]],
  "class-selection-guide": [["Solo lens", "Pick classes that can disengage, reveal threats, or recover from bad trades.", "Solo extraction players need consistency more than highlight damage."], ["Group lens", "Build around one initiator, one stabilizer, and one finisher.", "Party success depends on role coverage when PvE noise attracts PvP."], ["Ranking rule", "Treat every class list as editorial until final launch numbers are visible.", "Pre-release footage can hide cooldown and scaling details."]],
  "returner-woodling-extraction-guide": [["Route goal", "Plan a safe path to Returner Woodling before greed routes.", "An exit you cannot reach is not a real exit."], ["Risk signal", "If another party hears a boss fight, assume the exit path may be watched.", "PvPvE pressure usually arrives after loud objectives."], ["Update trigger", "Add map-specific exit screenshots only from allowed, credited public material.", "That keeps the guide useful and rights-safe."]],
  "gyldenblood-loot-guide": [["Loot rule", "Value loot by extraction probability, not only rarity.", "A rare item lost to overextension has zero practical value."], ["Inventory habit", "Stop looting once your route, healing, and escape timing are compromised.", "Extraction games reward restraint."], ["SEO angle", "Keep separate answers for Gyldenblood, Dew, and Gyldenmist searches.", "Players search these terms differently after trailers and demo coverage."]],
  "free-aim-combat-guide": [["Combat lens", "Track stamina, spacing, and animation commitment before chasing damage.", "Free-aim melee punishes panic swings."], ["Duel habit", "Use PvE enemies as sound bait only when you know the escape angle.", "Noise can attract players faster than expected."], ["Update trigger", "Replace generic combo notes with weapon-specific timings after launch.", "Frame data and hitboxes need confirmed builds."]],
  "system-requirements-anti-cheat": [["PC priority", "Prepare drivers, storage, and firewall exceptions before launch day.", "Extraction games need stable sessions because disconnects are costly."], ["Trust signal", "Track anti-cheat notes from official sources only.", "Rumors can damage trust quickly around PvPvE launches."], ["Update trigger", "Add exact settings presets once final build performance data is public.", "Beta performance is not always launch performance."]],
  "wardogs-beginner-guide": [["First session goal", "Play the objective, move with a squad, and learn support rewards before chasing K/D.", "WARDOGS positions team actions and cash as core pressure, not decoration."], ["Map habit", "Read routes by vehicles, cover, and control-zone timing.", "Large lobbies punish players who drift without a rotation plan."], ["Update trigger", "Replace broad role names with official class/loadout terms after Early Access opens.", "The current guide is source-aware, not a final stat sheet."]],
  "cash-economy-guide": [["Economy rule", "Treat cash as tempo: transport, support, and survival can be more valuable than one risky elimination.", "Persistent rewards change what useful play looks like."], ["Squad habit", "Assign one player to protect revives and vehicle exits.", "Cash value is lost when a squad wins a fight but cannot reset."], ["Update trigger", "Add exact earning tables only after official values are public.", "Pre-launch economy numbers should not be invented."]],
  "vehicle-coordination-guide": [["Vehicle role", "Use vehicles to move squads into timing windows, not as solo highlight tools.", "Large maps turn transport into an objective-control resource."], ["Risk signal", "A vehicle creates noise, visibility, and anti-vehicle pressure.", "Movement speed can also reveal your plan."], ["Update trigger", "Add counters and handling notes once Early Access footage confirms them.", "Vehicle balance is often tuned heavily."]],
  "objective-rotation-guide": [["Rotation priority", "Leave early enough to arrive organized, not exhausted.", "Three-team pressure makes late rotations especially dangerous."], ["Information habit", "Treat every control-zone approach as watched until proven otherwise.", "Large-scale shooters reward clearing lanes before committing."], ["Update trigger", "Add named map routes after official map terminology is public.", "This avoids inventing names that confuse searchers later."]],
  "building-destruction-guide": [["Cover rule", "Use building and destruction to create exits as much as attack angles.", "Destructible cover changes both offense and retreat."], ["Squad habit", "Call new sightlines immediately after a wall or cover piece changes.", "A destroyed angle helps enemies too."], ["Update trigger", "Document exact destructible objects after public playtests.", "Specific destruction data needs confirmed footage."]],
  "system-requirements-playtest": [["Access rule", "Use official Steam and community signup routes only.", "Playtest scams are common around unreleased multiplayer shooters."], ["PC priority", "Prepare drivers, storage, microphone, and stable networking.", "Team shooters lose value quickly when comms or performance fail."], ["Update trigger", "Add exact requirements when the Steam page publishes them.", "Speculation should stay clearly marked."]]
};

function rowsFor(item: NonNullable<ReturnType<typeof getItem>>) {
  return guideRows[item.slug] || item.bullets.slice(0, 3).map((point, index) => [
    index === 0 ? "Primary decision" : index === 1 ? "Risk check" : "Update trigger",
    point,
    index === 0 ? "This is the first action readers should test in real matches." : index === 1 ? "This prevents the page from becoming generic advice detached from the game's pressure." : "Refresh this recommendation after official footage, patch notes, or confirmed launch data."
  ] as [string, string, string]);
}

function tokensFor(...parts: string[]) {
  return parts.join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3);
}

function relatedGuides(item: NonNullable<ReturnType<typeof getItem>>) {
  const tokens = tokensFor(item.title, item.excerpt, ...item.keywords, ...item.bullets);
  return siteContent.guides
    .filter((guide) => guide.slug !== item.slug)
    .map((guide) => {
      const haystack = [guide.title, guide.excerpt, ...guide.keywords].join(" ").toLowerCase();
      return { guide, score: tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.guide);
}

function relatedEntries(item: NonNullable<ReturnType<typeof getItem>>) {
  const tokens = tokensFor(item.title, item.excerpt, ...item.keywords, ...item.bullets);
  return siteContent.entries
    .map((entry) => {
      const haystack = [entry.title, entry.role, entry.excerpt, ...entry.tags].join(" ").toLowerCase();
      return { entry, score: tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.entry);
}

function intentAnswer(item: NonNullable<ReturnType<typeof getItem>>) {
  const keyword = item.keywords[0] || item.title;
  return `${keyword} searchers usually need a direct answer first, then a practical decision framework. For ${siteContent.gameName}, this page treats public footage, store data, and official-channel signals as planning material rather than final balance proof. Use the checklist and table below to decide what to test first, then revisit the page after launch updates or new patch notes.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return pageMeta(item.title, item.excerpt, "/guides/" + item.slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();
  const base = "guides";
  const image = cardImageFor("guide", item.slug);
  const video = siteContent.videos[0];
  const rows = rowsFor(item);
  const guideLinks = relatedGuides(item);
  const databaseLinks = relatedEntries(item);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: base, href: "/" + base }, { name: item.title, href: "/" + base + "/" + item.slug }])} />
      <JsonLd data={articleJsonLd(item.title, item.excerpt, '/' + base + '/' + item.slug, undefined) } />
      <Breadcrumbs items={[{ label: base, href: "/" + base }, { label: item.title, href: "/" + base + "/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">{"Guide"}</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="guide" slug={item.slug} title={item.title} />
      <section className="section article-body">
        <article className="article-main">
          <figure className="article-figure"><img src={image} alt={`${item.title} Fate Trigger guide media`} /><figcaption>Guide media uses localized public source imagery where available, with official video footage embedded separately for review.</figcaption></figure>
          {item.body.map((para) => <p key={para}>{para}</p>)}
          <table className="info-table"><thead><tr><th>Guide angle</th><th>Practical recommendation</th><th>Why it matters</th></tr></thead><tbody>{rows.map(([angle, recommendation, reason]) => <tr key={angle}><th>{angle}</th><td>{recommendation}</td><td>{reason}</td></tr>)}</tbody></table>
          <div className="content-block"><h2>Action checklist</h2><ul className="check-list">{item.bullets.map((point) => <li key={point}>{point}</li>)}</ul></div>
          <div className="content-block"><h2>Search intent answer</h2><p>{intentAnswer(item)}</p></div>
          {databaseLinks.length ? <div className="content-block"><h2>Related database entries</h2><div className="link-list">{databaseLinks.map((entry) => <a key={entry.slug} href={`/database/${entry.category}/${entry.slug}`}><strong>{entry.title}</strong><span>{entry.role}: {entry.excerpt}</span></a>)}</div></div> : null}
          <div className="content-block"><h2>Video evidence to review</h2><p>Start with {video.title} in the media hub and compare the visible UI, movement, combat pacing, and release-date cards against this guide. The embed is credited and loaded from YouTube.</p><p><a className="button" href={`/media/${video.slug}`}>Open trailer notes</a></p></div>
          <div className="content-block"><h2>Update checklist</h2><ul className="check-list"><li>Replace cautious pre-launch language when an official patch note, class page, weapon page, or map page confirms the detail.</li><li>Add timestamped video references only from embeddable public footage or credited source material.</li><li>Keep rankings editorial and date-stamped so players can tell analysis from official balance information.</li></ul></div>
          <Tags tags={item.keywords} />
        </article>
        <aside className="article-aside"><h2>Read next</h2><p>Contextual links help verify this topic from more than one angle.</p><p><a className="button" href="/release-date">Release tracker</a></p><p><a className="button" href="/media">Media notes</a></p>{guideLinks.map((guide) => <p key={guide.slug}><a className="button" href={`/guides/${guide.slug}`}>{guide.title}</a></p>)}</aside>
      </section>
      <SourceList />
    </>
  );
}
