import { notFound } from "next/navigation";
import { Breadcrumbs, Card, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return pageMeta(siteContent.gameName + " " + category + " database", "Source-aware " + category + " database for " + siteContent.gameName + ".", "/database/" + category);
}

function categoryIntro(category: string) {
  if (category === "characters") return {
    title: "Character entries are role notes, not final kit pages",
    body: "Use these entries to understand Awakener jobs, named character watch pages, and team-role questions. Final abilities, cooldowns, and counters need official or launch evidence.",
    checks: ["Separate confirmed names from inferred roles.", "Avoid final tier claims before launch data.", "Link character entries to guides and footage."]
  };
  if (category === "weapons") return {
    title: "Weapon entries are loadout planning notes",
    body: "Use these entries to compare range bands, Gun-Chip questions, and squad jobs. Damage, recoil, attachments, and build values should be updated after official stats or repeatable tests.",
    checks: ["Rank reliability before burst hype.", "Mark Gun-Chip numbers as unknown until confirmed.", "Connect weapons to map routes and Awakener roles."]
  };
  if (category === "maps") return {
    title: "Map entries are route decisions",
    body: "Use these entries to study safe starts, bridge chains, high ground, flank resets, and endgame exits. Official location names and screenshots should be updated only from usable source material.",
    checks: ["Treat routes as timing decisions.", "Do not invent official map names.", "Pair map notes with movement and weapon guides."]
  };
  return {
    title: "Lore and system entries need source discipline",
    body: "Use these entries to understand worldbuilding, platform watch, fair-play claims, and systems without turning fan interpretation into official wording.",
    checks: ["Use primary sources first.", "Separate reporting from official confirmation.", "Refresh after official FAQs, patch notes, or platform pages."]
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const items = siteContent.entries.filter((entry) => entry.category === category);
  if (!items.length) notFound();
  const intro = categoryIntro(category);
  return (
    <>
      <Breadcrumbs items={[{ label: "Database", href: "/database" }, { label: category, href: "/database/" + category }]} />
      <header className="page-header"><span className="eyebrow">Database</span><h1>{siteContent.gameName} {category}</h1><p>Editorial entries based on public information, footage, and source-linked observations.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>{intro.title}</h2>
          <p>{intro.body}</p>
          <ul className="check-list">{intro.checks.map((check) => <li key={check}>{check}</li>)}</ul>
        </article>
        <aside className="article-aside"><h2>Source rule</h2><p>This category is independent guide analysis. Use official sources before making launch, build, or platform decisions.</p><p><a className="button" href="/resources">Source list</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Entries" title={`Browse ${category}`} /><div className="grid-3">{items.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow={entry.role} href={`/database/${entry.category}/${entry.slug}`} image={cardImageFor(entry.category, entry.slug)} imageAlt={`${entry.title} database artwork`}><p>{entry.excerpt}</p><Tags tags={entry.tags} /></Card>)}</div></section>
    </>
  );
}
