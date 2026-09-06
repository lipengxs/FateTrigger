import Link from "next/link";
import { Card, FactPanel, FaqBlock, FeaturedMediaWall, HomeHero, JsonLd, QuickStartRail, ReleaseBlock, SectionHeading, SourceList, Tags, VideoFeature, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { faqJsonLd, videoJsonLd } from "@/lib/seo";

export default function Home() {
  const guideSlugs = ["system-requirements-settings", "ps5-steam-platform-choice-guide"];
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
        <SectionHeading eyebrow="Verified Starting Points" title="Start with release, platform, and PC status" href="/guides" cta="Guide library" />
        <div className="grid-3">
          {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Confirmed Topics" title="Characters, systems, and arena status" href="/characters" cta="Character status" />
        <div className="grid-3">
          <Card title="Fate Trigger Characters and Awakeners" eyebrow="Roster status" href="/characters" image={cardImageFor("characters")} imageAlt="Fate Trigger character trailer media"><p>Read named character watch pages without treating trailers as final kit data.</p></Card>
          <Card title="Fate Trigger Weapons and Gun-Chip" eyebrow="System status" href="/weapons" image={cardImageFor("weapons")} imageAlt="Fate Trigger weapon trailer media"><p>Separate the public Gun-Chip discussion from unconfirmed weapon stats and builds.</p></Card>
          <Card title="Fate Trigger Map Status" eyebrow="Arena status" href="/maps" image={cardImageFor("maps")} imageAlt="Fate Trigger arena trailer media"><p>Check what official footage confirms before trusting interactive maps or route claims.</p></Card>
        </div>
      </section>
      <FaqBlock />
      <SourceList />
    </>
  );
}
