import Link from "next/link";
import { Card, FactPanel, FaqBlock, FeaturedMediaWall, HomeHero, JsonLd, ReleaseBlock, SectionHeading, SourceList, Tags, VideoFeature, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { faqJsonLd, videoJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={videoJsonLd()} />
      <HomeHero />
      <section className="section">
        <SectionHeading eyebrow="Field Snapshot" title={siteContent.gameName + " release date, platforms, and status"} href="/release-date" cta="Release page" />
      <FactPanel />
      </section>
      <ReleaseBlock />
      <VideoFeature />
      <FeaturedMediaWall />
      <section className="section">
        <SectionHeading eyebrow="Latest Updates" title="News built for long-tail search intent" href="/news" cta="All news" />
        <div className="grid-2">
          {siteContent.news.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.date} href={`/news/${item.slug}`} image={cardImageFor("news", item.slug)} imageAlt={`${item.title} visual briefing`}><p>{item.excerpt}</p><Tags tags={item.tags} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Start With Movement" title="Featured guides with practical decisions" href="/guides" cta="Guide index" />
        <div className="grid-3">
          {siteContent.guides.slice(0, 6).map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Advanced Search Guides" title="Scenario pages for high-intent player questions" href="/guides" cta="All guides" />
        <div className="grid-3">
          {siteContent.guides.slice(-6).map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Deep Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} thumbnail artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Database Preview" title="Characters, equipment, maps, systems, and lore" href="/database" cta="Open database" />
        <div className="grid-3">
          {siteContent.entries.slice(0, 6).map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} database artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Internal Rankings" title="Editorial rankings, not official tier lists" href="/rankings" cta="Rankings" />
        <div className="grid-3">
          {siteContent.rankings.map((ranking) => <Card key={ranking.slug} title={ranking.title} eyebrow="Editorial"><ol className="rank-list">{ranking.items.map((item) => <li key={item}>{item}</li>)}</ol></Card>)}
        </div>
      </section>
      <FaqBlock />
      <SourceList />
    </>
  );
}
