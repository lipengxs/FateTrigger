import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList, Tags } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.news.map((item) => ({ slug: item.slug }));
}

function getItem(slug: string) {
  return siteContent.news.find((item) => item.slug === slug);
}

function relatedGuides(item: NonNullable<ReturnType<typeof getItem>>) {
  const tokens = [item.title, item.excerpt, ...item.tags].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  return siteContent.guides
    .map((guide) => {
      const haystack = [guide.title, guide.excerpt, ...guide.keywords].join(" ").toLowerCase();
      return { guide, score: tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.guide);
}

function newsAngle(item: NonNullable<ReturnType<typeof getItem>>) {
  const text = [item.title, item.excerpt, ...item.tags].join(" ").toLowerCase();
  if (text.includes("release") || text.includes("launch") || text.includes("access")) {
    return {
      label: "Release impact",
      why: `${siteContent.gameName} has high release-date search intent, so the safest article angle is to separate confirmed storefront data from reposted countdown claims.`,
      action: "Use official store pages and publisher channels as the baseline before planning downloads, content calendars, or launch-day sessions."
    };
  }
  if (text.includes("platform") || text.includes("console") || text.includes("playstation") || text.includes("xbox")) {
    return {
      label: "Platform impact",
      why: "Platform news can change player expectations quickly, especially when PC, console, cross-play, or controller support are still being watched.",
      action: "Track official platform pages first, then use media reporting as context rather than final confirmation."
    };
  }
  if (text.includes("beta") || text.includes("demo") || text.includes("playtest")) {
    return {
      label: "Hands-on impact",
      why: "Public test footage is useful for route, class, and system analysis, but it can become outdated when launch tuning changes.",
      action: "Treat visible gameplay as a planning signal, then re-check guides after the next official build or patch note."
    };
  }
  return {
    label: "Player impact",
    why: `This update matters because it changes what players should verify before relying on a ${siteContent.gameName} guide, ranking, or release-date snippet.`,
    action: "Read the source links, compare them with current official channels, and avoid treating pre-launch analysis as final balance data."
  };
}

const reportingNotes: Record<string, { happened: string; context: string; impact: string[]; verify: Array<[string, string]> }> = {
  "steam-2026-release-window": {
    happened: "The current release-date story is not a new exact launch date. It is the absence of one: the safest public baseline remains a 2026 Steam window, while older exact or quarter-based expectations should be treated as historical context after the schedule adjustment.",
    context: "This matters because unreleased free-to-play shooters attract fake countdowns, download mirrors, key pages, and search snippets that preserve outdated dates. A good player-facing news page should explain why the answer is cautious instead of inventing precision.",
    impact: ["Wishlist and follow primary channels instead of planning around reposted dates.", "Keep guide pages in pre-launch mode until official launch data exists.", "Do not publish launch-day tier lists, stat tables, or countdown widgets before an exact source-backed date appears."],
    verify: [["Primary source", "Steam store page and official Fate Trigger/Saroasis channels."], ["Secondary context", "Media reports can explain history, but should not override current primary-source status."], ["Update trigger", "Storefront date change, official roadmap, launch FAQ, trailer date card, or platform store page update."]]
  },
  "early-access-roadmap-adjusted": {
    happened: "The useful news angle is that earlier Early Access expectations were adjusted, so old Q1-style planning should not be copied into current release pages without a clear superseded label.",
    context: "A schedule adjustment is not failure analysis; it is a source hierarchy problem. Players need to know which statement is newest, which source is official, and what action remains safe while the date is unsettled.",
    impact: ["Refresh any page that still implies Q1 2026 as the current promise.", "Avoid countdowns until an exact official date and unlock time are public.", "Warn readers away from unofficial access, keys, installers, and mirrored launch pages."],
    verify: [["Primary source", "Developer notice or official community post about the adjusted timing."], ["Player action", "Wishlist, follow official channels, and wait for a public roadmap."], ["Update trigger", "New Early Access announcement, playtest signup, or official launch FAQ."]]
  },
  "playstation-platform-watch": {
    happened: "PlayStation reporting keeps console interest alive, but the visible planning baseline for this guide remains Steam until platform store pages and launch rules are public.",
    context: "Platform pages are high-intent because players need to choose where to wishlist, whether to wait for console news, and whether cross-platform language affects their squad plans.",
    impact: ["Treat console coverage as watch-list context, not a final platform promise.", "Track cross-play, account linking, input matchmaking, and launch-day parity as separate unknowns.", "Keep PC setup guidance anchored to Steam until official console pages provide more detail."],
    verify: [["Primary source", "Official store pages and publisher/developer platform announcements."], ["Secondary context", "Credible media reporting about platform plans."], ["Update trigger", "PlayStation/Xbox store page, cross-play FAQ, controller/input matchmaking note, or platform launch trailer."]]
  },
  "closed-beta-footage-signals": {
    happened: "Closed beta and public footage are useful for studying movement, verticality, and readability, but they should not be treated as final balance proof.",
    context: "Footage can show route pressure, bridge exposure, cooldown style, UI clues, and weapon ranges. It usually cannot confirm final recoil, damage values, map names, matchmaking rules, or launch meta.",
    impact: ["Use footage to build beginner routes and questions to test later.", "Separate visible gameplay signals from final character, weapon, and map data.", "Update guide pages after new builds, patch notes, or launch footage changes the assumptions."],
    verify: [["Primary source", "Official YouTube uploads, Steam media, and public official footage."], ["Safe evidence", "Visible movement, UI, ability readability, and map-route pressure."], ["Update trigger", "New trailer, new beta, patch note, or launch build footage."]]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return pageMeta(item.title, item.excerpt, "/news/" + item.slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();
  const base = "news";
  const angle = newsAngle(item);
  const notes = reportingNotes[item.slug];
  const guides = relatedGuides(item);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: base, href: "/" + base }, { name: item.title, href: "/" + base + "/" + item.slug }])} />
      <JsonLd data={articleJsonLd(item.title, item.excerpt, '/' + base + '/' + item.slug, item.date) } />
      <Breadcrumbs items={[{ label: base, href: "/" + base }, { label: item.title, href: "/" + base + "/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">{item.date} / independent source check</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="news" slug={item.slug} title={item.title} />
      <section className="section article-body">
        <article className="article-main">
          <p>{item.excerpt}</p>
          <div className="content-block"><h2>What happened</h2><p>{notes?.happened || `This brief tracks a public ${siteContent.gameName} signal and turns it into practical context for players. It is written as independent editorial analysis, not as an official announcement, and it should be read alongside the source links below.`}</p></div>
          {notes ? <div className="content-block"><h2>Reporting context</h2><p>{notes.context}</p></div> : null}
          <div className="content-block"><h2>Why it matters</h2><p>{angle.why}</p><table className="info-table"><tbody><tr><th>{angle.label}</th><td>{angle.action}</td></tr><tr><th>Confidence level</th><td>Moderate. The article uses public sources and cautious wording because release windows, test access, balance details, and platform plans can change before launch.</td></tr><tr><th>Update rule</th><td>Refresh this page when an official store page, publisher post, trailer card, or patch note changes the current player takeaway.</td></tr></tbody></table></div>
          <div className="content-block"><h2>Source check</h2><table className="info-table"><tbody><tr><th>Checked</th><td>{siteContent.sourceChecked}</td></tr><tr><th>Official status</th><td>This page is not an official Fate Trigger announcement. Use Steam, Saroasis, and official channels as the final source for launch, beta, and platform decisions.</td></tr></tbody></table></div>
          <div className="content-block"><h2>Player takeaway</h2><ul className="check-list">{(notes?.impact || ["Use official sources before trusting social reposts, countdown screenshots, or download links.", "Compare this update with the release tracker and media notes before making platform or build decisions.", "Treat rankings and guide recommendations as editorial until live data and patch notes confirm the details."]).map((point) => <li key={point}>{point}</li>)}</ul></div>
          <div className="content-block"><h2>Verification checklist</h2><table className="info-table"><tbody>{(notes?.verify || [[item.date, item.title], ["Next official signal", "Storefront change, official trailer, developer post, beta notice, or launch FAQ."], ["After launch", "Replace pre-launch analysis with tested routes, settings, character data, weapon data, and updated screenshots where usage is appropriate."]]).map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table></div>
          <Tags tags={item.tags} />
        </article>
        <aside className="article-aside"><h2>Read next</h2><p>Use these pages to verify this update from more than one angle.</p><p><a className="button" href="/release-date">Release tracker</a></p><p><a className="button" href="/media">Media notes</a></p>{guides.map((guide) => <p key={guide.slug}><a className="button" href={`/guides/${guide.slug}`}>{guide.title}</a></p>)}</aside>
      </section>
      <SourceList />
    </>
  );
}
