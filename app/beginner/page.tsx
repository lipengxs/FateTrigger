import { Breadcrumbs, Card, JsonLd, SectionHeading, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Beginner Hub", "A source-safe beginner path for Fate Trigger release tracking, first-day routes, Awakeners, weapons, settings, and solo queue.", "/beginner");

export default function Page() {
  const beginnerSlugs = [
    "fate-trigger-release-date-tracker",
    "fate-trigger-beginner-guide",
    "first-day-route-plan",
    "system-requirements-settings",
    "best-awakeners-for-beginners",
    "solo-queue-awakener-picks",
    "floating-map-landing-zones",
    "best-weapons-to-learn-first"
  ];
  const guides = beginnerSlugs
    .map((slug) => siteContent.guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is typeof siteContent.guides[number] => Boolean(guide));
  const checklist = [
    ["Before installing", "Verify the current Steam release window, avoid key sellers, and prepare storage from official store information."],
    ["First session", "Use one Awakener role, one flexible weapon range, and one repeatable low-contest route."],
    ["First fights", "Trade from mid-range, keep an exit named, and avoid chasing knocks across exposed gaps."],
    ["After each match", "Write down the route failure: no exit, late bridge, split squad, bad high ground, or overlong looting."],
    ["After launch", "Replace pre-launch role labels with official character names, patch data, and tested map screenshots."]
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Beginner", href: "/beginner" }])} />
      <JsonLd data={itemListJsonLd("Fate Trigger beginner guide path", "A beginner-first reading path for Fate Trigger players, written as independent editorial guidance rather than official instructions.", "/beginner", guides.map((guide) => ({ name: guide.title, href: `/guides/${guide.slug}`, description: guide.excerpt })))} />
      <Breadcrumbs items={[{ label: "Beginner", href: "/beginner" }]} />
      <header className="page-header">
        <span className="eyebrow">Beginner Hub</span>
        <h1>Fate Trigger Beginner Hub</h1>
        <p>A source-safe path for new players: release status, PC setup, first-day routes, beginner Awakeners, solo queue, weapons, and floating-map survival. This is independent guide analysis, not an official onboarding page.</p>
      </header>
      <section className="section article-body">
        <article className="article-main">
          <h2>Start with decisions, not tier lists</h2>
          <p>Fate Trigger is still best covered with cautious pre-launch language. Beginners should learn the decisions that survive balance changes: when to cross a bridge, which role protects the squad, why mid-range weapons teach faster, and when a won fight becomes bait for a third party.</p>
          <table className="info-table"><tbody>{checklist.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
        </article>
        <aside className="article-aside">
          <h2>Trust boundary</h2>
          <p>This hub does not sell access, host downloads, or claim official launch authority. Use official store and developer channels for dates, files, and account support.</p>
          <p><a className="button primary" href="/release-date">Release tracker</a></p>
          <p><a className="button" href="/about">Site disclaimer</a></p>
        </aside>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Reading Path" title="Beginner pages to read first" />
        <div className="grid-3">
          {guides.map((guide) => <Card key={guide.slug} title={guide.title} eyebrow="Beginner path" href={`/guides/${guide.slug}`} image={cardImageFor("guide", guide.slug)} imageAlt={`${guide.title} guide artwork`}><><p>{guide.excerpt}</p><Tags tags={guide.keywords} /></></Card>)}
        </div>
      </section>
    </>
  );
}
