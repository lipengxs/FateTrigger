import Link from "next/link";
import { Card, FactPanel, FaqBlock, FeaturedMediaWall, HomeHero, JsonLd, QuickStartRail, ReleaseBlock, SectionHeading, SourceList, Tags, VideoFeature, cardImageFor } from "@/components/site";
import { indexableEntrySlugs, siteContent } from "@/lib/content";
import { faqJsonLd, videoJsonLd } from "@/lib/seo";

export default function Home() {
  const guideSlugs = ["fate-trigger-beginner-guide", "awakeners-role-guide", "system-requirements-settings", "ps5-steam-platform-choice-guide", "omnisight-anti-cheat-fair-play-guide"];
  const guides = guideSlugs
    .map((slug) => siteContent.guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is typeof siteContent.guides[number] => Boolean(guide));
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={videoJsonLd()} />
      <HomeHero />
      <QuickStartRail />
      <section className="section">
        <SectionHeading eyebrow="Field Snapshot" title="Release window, platforms, and official-source status" href="/release-date" cta="Release tracker" />
        <FactPanel />
      </section>
      <ReleaseBlock />
      <FeaturedMediaWall />
      <section className="section">
        <SectionHeading eyebrow="Latest Intel" title="Fate Trigger news and launch signals" href="/news" cta="All news" />
        <div className="grid-2">
          {siteContent.news.map((item) => <Card key={item.slug} title={item.title} eyebrow={item.date} href={`/news/${item.slug}`} image={cardImageFor("news", item.slug)} imageAlt={`${item.title} visual briefing`}><p>{item.excerpt}</p><Tags tags={item.tags} /></Card>)}
        </div>
      </section>
      <VideoFeature />
      <section className="section">
        <SectionHeading eyebrow="Verified Starting Points" title="Start with release, platform, PC, and Awakener status" href="/guides" cta="Guide library" />
        <div className="grid-3">
          {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Database Preview" title="Characters, equipment, maps, systems, and lore" href="/database" cta="Open database" />
        <div className="grid-3">
          {siteContent.entries.filter((entry) => indexableEntrySlugs.has(entry.slug)).slice(0, 6).map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} database artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}
        </div>
      </section>
      <FaqBlock />
      <SourceList />
    </>
  );
}
