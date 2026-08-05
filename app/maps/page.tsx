import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList, cardImageFor } from "@/components/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Maps: Official Arena and Map Status", "Does Fate Trigger have an official map? Confirmed arena information, public footage, named-location status, and the interactive map boundary.", "/maps");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Maps", href: "/maps" }])} />
      <Breadcrumbs items={[{ label: "Fate Trigger Maps", href: "/maps" }]} />
      <header className="page-header"><span className="eyebrow">Official Map Status</span><h1>Fate Trigger Maps and Arena Status</h1><p>Fate Trigger public material shows floating-arena environments, but this site does not publish a fake interactive map, fixed landing routes, loot tiers, or unconfirmed location names.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>What map information is confirmed</h2>
          <table className="info-table"><tbody>
            <tr><th>Public arena setting</th><td>Official footage and public game material establish a floating-world arena identity.</td></tr>
            <tr><th>Official map names</th><td>Not yet treated as confirmed here. Named locations need an official map, trailer card, store description, or developer post.</td></tr>
            <tr><th>Interactive map</th><td>Not available on this site. A normal guide page is not presented as an interactive map.</td></tr>
            <tr><th>Routes, loot, and landing tiers</th><td>Held back until a public build and reproducible evidence make those claims useful and safe.</td></tr>
          </tbody></table>
          <h2>What this hub will update</h2>
          <p>When official map terminology, screenshots, or a public test becomes available, this hub will add named arenas, confirmed traversal features, official media, and links to evidence-backed map entities. It will not convert trailer interpretation into a launch-day route guide.</p>
        </article>
        <aside className="article-aside"><h2>Check the evidence</h2><p><a className="button primary" href="/media">Official footage</a></p><p><a className="button" href="/news">Map and beta updates</a></p><p><a className="button" href="/release-date">Release status</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Useful Next Steps" title="Follow confirmed information, not route guesses" /><div className="grid-3">
        <Card title="Fate Trigger Official Footage" eyebrow="Media" href="/media" image={cardImageFor("media")} imageAlt="Fate Trigger official trailer still"><p>Watch the credited trailers and their notes before treating a location or mechanic as confirmed.</p></Card>
        <Card title="Fate Trigger News" eyebrow="Updates" href="/news" image={cardImageFor("news")} imageAlt="Fate Trigger news source artwork"><p>Track developer announcements, public-test news, and release-status changes.</p></Card>
        <Card title="Fate Trigger Awakeners" eyebrow="Characters" href="/characters" image={cardImageFor("characters")} imageAlt="Fate Trigger character media"><p>Review confirmed named-character information separately from future map data.</p></Card>
      </div></section>
      <SourceList />
    </>
  );
}
