import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Guides", "Beginner, advanced, system, and setup guides.", "/guides");

export default function Page() {
  const items = siteContent.guides;
  const clusters = [
    ["Start Here", "Release tracker, beginner route, first-day plan, and safe setup pages.", ["fate-trigger-release-date-tracker", "fate-trigger-beginner-guide", "first-day-route-plan", "system-requirements-settings"]],
    ["Characters", "Awakener roles, beginner picks, solo queue, and squad composition.", ["awakeners-role-guide", "best-awakeners-for-beginners", "solo-queue-awakener-picks", "squad-composition-guide"]],
    ["Weapons and Maps", "Weapon learning order, Gun-Chip planning, floating routes, and endgame movement.", ["best-weapons-to-learn-first", "gun-chip-loadout-guide", "floating-arena-route-guide", "endgame-zone-rotation-guide"]]
  ] as const;
  const topicHubs = [
    ["Beginner Hub", "/beginner", "A source-safe onboarding path for release checks, first-day routes, beginner Awakeners, settings, and solo queue."],
    ["Gun-Chip Hub", "/gun-chip", "A focused route through weapon range bands, Gun-Chip planning, loadout scenarios, and progression notes."],
    ["Release Tracker", "/release-date", "The current 2026 public window, adjusted Early Access context, and source hierarchy."]
  ] as const;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger guide library", "Independent Fate Trigger beginner, character, weapon, map, release, and setup guides.", "/guides", items.map((item) => ({ name: item.title, href: `/guides/${item.slug}`, description: item.excerpt })))} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <header className="page-header"><span className="eyebrow">Guide Library</span><h1>Fate Trigger Guides</h1><p>Independent beginner, character, weapon, map, release, and setup guides. Pre-launch pages avoid final stat claims until official sources or repeatable launch data confirm them.</p></header>
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
