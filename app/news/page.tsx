import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceTimeline, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger News and Official Updates", "Fate Trigger news, official release updates, beta signals, platform reporting, trailer announcements, and source-linked timelines.", "/news");

export default function Page() {
  const [lead, ...rest] = siteContent.news;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "News", href: "/news" }])} />
      <Breadcrumbs items={[{ label: "News", href: "/news" }]} />
      <header className="page-header news-command-header">
        <span className="eyebrow">Official Update Desk</span>
        <h1>Fate Trigger News and Official Updates</h1>
        <p>Track release, beta, platform, trailer, and official character announcements in one place. Every entry links back to the primary source and distinguishes a confirmed update from editorial context.</p>
      </header>
      <SourceTimeline />
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
          <Card title="Confirmed Characters" eyebrow="Awakeners" href="/characters" image={cardImageFor("characters")} imageAlt="Fate Trigger official character media"><p>Review named Awakener pages with confirmed information, open questions, and official footage links.</p></Card>
        </div>
      </section>
    </>
  );
}
