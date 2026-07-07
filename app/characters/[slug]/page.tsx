import { notFound } from "next/navigation";
import { Breadcrumbs, Card, DetailHeaderImage, JsonLd, SectionHeading, SourceList, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

const namedCharacterSlugs = ["fally", "tata-and-bibi"] as const;

function getCharacter(slug: string) {
  return siteContent.entries.find((entry) => entry.category === "characters" && namedCharacterSlugs.includes(entry.slug as typeof namedCharacterSlugs[number]) && entry.slug === slug);
}

function relatedGuides(slug: string) {
  const priority = slug === "fally"
    ? ["fally-tata-bibi-character-watch", "fally-tata-bibi-role-comparison", "best-awakeners-for-beginners", "solo-queue-awakener-picks"]
    : ["fally-tata-bibi-character-watch", "fally-tata-bibi-role-comparison", "squad-composition-guide", "awakeners-role-guide"];
  return priority
    .map((guideSlug) => siteContent.guides.find((guide) => guide.slug === guideSlug))
    .filter((guide): guide is typeof siteContent.guides[number] => Boolean(guide));
}

function characterRows(slug: string) {
  if (slug === "fally") return [
    ["Current page type", "Named Awakener watch page, written as independent analysis rather than an official kit page."],
    ["Best reader question", "Does this character appear to help with mobility, entry timing, or escaping bad floating-arena routes?"],
    ["Useful for", "Beginners comparing mobility value, solo players who need self-reset, and squads tracking entry-role options."],
    ["Do not claim", "Final ability names, cooldowns, damage values, official difficulty, counters, or tier-list placement."]
  ];
  return [
    ["Current page type", "Named duo-identity watch page, written as independent analysis rather than an official kit page."],
    ["Best reader question", "Does the character concept appear to create utility, timing pressure, companion value, or team stabilization?"],
    ["Useful for", "Players watching support, control, utility, revive-safety, or duo-mechanic possibilities before final kit data exists."],
    ["Do not claim", "Final ability names, companion rules, cooldowns, damage values, official difficulty, counters, or tier-list placement."]
  ];
}

function scenarioRows(slug: string) {
  if (slug === "fally") return [
    ["Solo queue", "Value rises if the kit can leave bad fights, correct late rotations, or cross exposed bridges with fewer team calls."],
    ["Premade squad", "Value depends on whether teammates can trade the entry and protect the exit after first contact."],
    ["Weapon pairing", "Flexible mid-range pressure is the safest pre-launch assumption until confirmed kit details show a stronger range preference."],
    ["Review focus", "Watch footage for vertical repositioning, cooldown timing, bridge-cross safety, and whether the character overcommits after a knock."]
  ];
  return [
    ["Solo queue", "Value rises if the kit creates simple, visible utility that random teammates can understand without long voice calls."],
    ["Premade squad", "Value depends on coordinated timing: revive cover, route denial, companion pressure, or controlled platform holds."],
    ["Weapon pairing", "Flexible mid-range or control-friendly loadouts are safer assumptions than a narrow burst setup before final data."],
    ["Review focus", "Watch footage for utility timing, teammate stabilization, visual clarity, and whether the duo identity changes fight pacing."]
  ];
}

export function generateStaticParams() {
  return namedCharacterSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return {};
  return pageMeta(`${character.title} Fate Trigger Character Watch`, `${character.excerpt} Independent source-safe character analysis, not an official Fate Trigger kit page.`, `/characters/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();
  const guides = relatedGuides(slug);
  const rows = characterRows(slug);
  const scenarios = scenarioRows(slug);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Characters", href: "/characters" }, { name: character.title, href: `/characters/${slug}` }])} />
      <JsonLd data={articleJsonLd(`${character.title} Fate Trigger Character Watch`, character.excerpt, `/characters/${slug}`)} />
      <Breadcrumbs items={[{ label: "Characters", href: "/characters" }, { label: character.title, href: `/characters/${slug}` }]} />
      <header className="page-header">
        <span className="eyebrow">{character.role}</span>
        <h1>{character.title} Fate Trigger Character Watch</h1>
        <p>{character.excerpt} This is independent editorial analysis with source boundaries, not an official Fate Trigger character page.</p>
      </header>
      <DetailHeaderImage type="characters" slug={character.slug} title={character.title} />
      <section className="section article-body">
        <article className="article-main">
          <figure className="article-figure">
            <img src={cardImageFor("characters", character.slug)} alt={`${character.title} Fate Trigger character watch artwork`} />
            <figcaption>Character watch artwork is used as guide-site media. Final kit screenshots should be replaced only with credited official or launch-safe assets.</figcaption>
          </figure>
          <h2>Source-safe character summary</h2>
          <p>{character.title} is a high-intent Fate Trigger search topic because named characters are easier to remember than abstract role labels. The safe way to cover this page before launch is to explain what kind of player should watch the character, which public signals matter, and which claims must wait for official kit data.</p>
          <table className="info-table"><tbody>{rows.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
          <div className="content-block">
            <h2>Decision profile</h2>
            <table className="info-table"><tbody>{scenarios.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
          </div>
          <div className="content-block">
            <h2>Launch update checklist</h2>
            <ul className="check-list">
              <li>Add official ability names and descriptions only after a primary source publishes them.</li>
              <li>Separate cooldown, damage, utility, and ultimate behavior into dated fields after launch data exists.</li>
              <li>Update solo queue and premade squad ratings after repeatable match evidence, not one trailer highlight.</li>
              <li>Preserve old notes as dated history if the kit changes between beta footage and launch.</li>
            </ul>
          </div>
          <Tags tags={character.tags} />
        </article>
        <aside className="article-aside">
          <h2>Trust boundary</h2>
          <p>This page does not claim official kit access, sell keys, host downloads, or provide account support.</p>
          <p><a className="button primary" href="/guides/fally-tata-bibi-role-comparison">Character comparison</a></p>
          <p><a className="button" href={`/database/characters/${character.slug}`}>Database note</a></p>
          <p><a className="button" href="/about">Site disclaimer</a></p>
        </aside>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Read Next" title={`Guides related to ${character.title}`} />
        <div className="grid-3">
          {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Related guide" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></Card>)}
        </div>
      </section>
      <SourceList />
    </>
  );
}
