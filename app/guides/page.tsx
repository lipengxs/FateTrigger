import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { indexableGuideSlugs, siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Guides: Release, Platforms, PC, and Awakeners", "Source-aware Fate Trigger guides for release status, platforms, PC requirements, official character watch pages, and confirmed systems.", "/guides");

export default function Page() {
  const items = siteContent.guides.filter((item) => indexableGuideSlugs.has(item.slug));
  const clusters = [
    ["Release and platform", "Current release status, PC storefront, console watch, and access safety.", ["system-requirements-settings", "ps5-steam-platform-choice-guide", "omnisight-anti-cheat-fair-play-guide"]],
    ["Awakeners", "Confirmed named-character watch pages and role context without a pre-launch tier list.", ["awakeners-role-guide", "fally-tata-bibi-character-watch", "fally-tata-bibi-role-comparison"]],
    ["Systems and world", "Gun-Chip context and official-world signals with unknown details clearly marked.", ["paleblight-lore-explained"]]
  ] as const;
  const topicHubs = [
    ["Beginner Hub", "/beginner", "A source-safe path through release status, PC setup, official news, and confirmed character watch pages."],
    ["Gun-Chip Hub", "/gun-chip", "A focused explanation of the publicly mentioned Gun-Chip system and the details that remain unconfirmed."],
    ["Release Tracker", "/release-date", "The current 2026 public window, adjusted Early Access context, and source hierarchy."]
  ] as const;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger guide library", "Independent Fate Trigger beginner, character, weapon, map, release, and setup guides.", "/guides", items.map((item) => ({ name: item.title, href: `/guides/${item.slug}`, description: item.excerpt })))} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <header className="page-header"><span className="eyebrow">Guide Library</span><h1>Fate Trigger Guides</h1><p>Source-aware release, platform, PC, Awakener, and system guides. Pages that would require unverified routes, builds, rankings, or weapon data are intentionally held back until public evidence exists.</p></header>
      <section className="section"><SectionHeading eyebrow="Topic Hubs" title="Start with the strongest guide clusters" /><div className="grid-3">
        {topicHubs.map(([title, href, text]) => <Card key={href} title={title} eyebrow="Topic hub" href={href}><p>{text}</p></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Guide Paths" title="Choose a route through the guide library" /><div className="grid-3">
        {clusters.map(([title, text, slugs]) => <Card key={title} title={title} eyebrow="Guide path"><p>{text}</p><div className="link-list compact-links">{slugs.map((slug) => {
          const guide = siteContent.guides.find((item) => item.slug === slug);
          return guide ? <a key={slug} href={`/guides/${guide.slug}`}><strong>{guide.title}</strong></a> : null;
        })}</div></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Index" title="Browse Guides" /><div className="grid-3">
        {items.map((item) => <Card key={item.slug} title={item.title} eyebrow={"Guide"} href={`/guides/${item.slug}`} image={cardImageFor("guide", item.slug)} imageAlt={`${item.title} guide artwork`}><><p>{item.excerpt}</p><Tags tags={item.keywords} /></></Card>)}
      </div></section>
    </>
  );
}
