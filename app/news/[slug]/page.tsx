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
  const guides = relatedGuides(item);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: base, href: "/" + base }, { name: item.title, href: "/" + base + "/" + item.slug }])} />
      <JsonLd data={articleJsonLd(item.title, item.excerpt, '/' + base + '/' + item.slug, item.date) } />
      <Breadcrumbs items={[{ label: base, href: "/" + base }, { label: item.title, href: "/" + base + "/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">{item.date}</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="news" slug={item.slug} title={item.title} />
      <section className="section article-body">
        <article className="article-main">
          <p>{item.excerpt}</p>
          <div className="content-block"><h2>What happened</h2><p>This brief tracks a public {siteContent.gameName} signal and turns it into practical context for players. It is written as editorial analysis, not as an official announcement, and it should be read alongside the source links below.</p></div>
          <div className="content-block"><h2>Why it matters</h2><p>{angle.why}</p><table className="info-table"><tbody><tr><th>{angle.label}</th><td>{angle.action}</td></tr><tr><th>Confidence level</th><td>Moderate. The article uses public sources and cautious wording because release windows, test access, balance details, and platform plans can change before launch.</td></tr><tr><th>Update rule</th><td>Refresh this page when an official store page, publisher post, trailer card, or patch note changes the current player takeaway.</td></tr></tbody></table></div>
          <div className="content-block"><h2>Player takeaway</h2><ul className="check-list"><li>Use official sources before trusting social reposts, countdown screenshots, or download links.</li><li>Compare this update with the release tracker and media notes before making platform or build decisions.</li><li>Treat rankings and guide recommendations as editorial until live data and patch notes confirm the details.</li></ul></div>
          <div className="content-block"><h2>Timeline to watch</h2><table className="info-table"><tbody><tr><th>{item.date}</th><td>{item.title}</td></tr><tr><th>Next official signal</th><td>Storefront change, official trailer, developer post, beta notice, or launch FAQ.</td></tr><tr><th>After launch</th><td>Replace pre-launch analysis with tested routes, settings, character data, weapon data, and updated screenshots where usage is appropriate.</td></tr></tbody></table></div>
          <Tags tags={item.tags} />
        </article>
        <aside className="article-aside"><h2>Read next</h2><p>Use these pages to verify this update from more than one angle.</p><p><a className="button" href="/release-date">Release tracker</a></p><p><a className="button" href="/media">Media notes</a></p>{guides.map((guide) => <p key={guide.slug}><a className="button" href={`/guides/${guide.slug}`}>{guide.title}</a></p>)}</aside>
      </section>
      <SourceList />
    </>
  );
}
