import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger News Intel", "Release-window updates, beta signals, platform reporting, and source-aware Fate Trigger news notes.", "/news");

export default function Page() {
  const [lead, ...rest] = siteContent.news;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "News", href: "/news" }])} />
      <Breadcrumbs items={[{ label: "News", href: "/news" }]} />
      <header className="page-header news-command-header">
        <span className="eyebrow">Awakener Intel Feed</span>
        <h1>Fate Trigger news, release signals, and public source checks</h1>
        <p>Every update is written as independent guide analysis: what changed, why it matters for players, and which official or public source should be checked next.</p>
      </header>
      <section className="section fate-news-board">
        <a className="news-lead-panel" href={`/news/${lead.slug}`}>
          <img src={cardImageFor("news", lead.slug)} alt={`${lead.title} news artwork`} />
          <div>
            <span className="eyebrow">{lead.date} / release watch</span>
            <h2>{lead.title}</h2>
            <p>{lead.excerpt}</p>
            <Tags tags={lead.tags} />
          </div>
        </a>
        <div className="intel-timeline">
          {rest.map((item, index) => (
            <a className="timeline-item" key={item.slug} href={`/news/${item.slug}`}>
              <span className="timeline-index">0{index + 2}</span>
              <img src={cardImageFor("news", item.slug)} alt={`${item.title} visual briefing`} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.excerpt}</p>
                <Tags tags={item.tags} />
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="News Clusters" title="What Fate Trigger players should verify next" />
        <div className="grid-3">
          <Card title="Release Date Proof" eyebrow="Search intent" href="/release-date" image={cardImageFor("release")} imageAlt="Fate Trigger release tracker artwork"><p>Use Steam and official channels as the baseline before trusting reposted countdowns or access claims.</p></Card>
          <Card title="Platform Watch" eyebrow="PC / Console" href="/guides/ps5-steam-platform-choice-guide" image={cardImageFor("guide", "ps5-steam-platform-choice-guide")} imageAlt="Fate Trigger platform choice artwork"><p>Compare Steam visibility, reported PlayStation plans, cross-play questions, and input matchmaking unknowns.</p></Card>
          <Card title="Beta Footage Signals" eyebrow="Gameplay" href="/media" image={cardImageFor("media")} imageAlt="Fate Trigger trailer analysis artwork"><p>Use embeddable YouTube footage to check movement, ability timing, and floating route pressure.</p></Card>
        </div>
      </section>
    </>
  );
}
