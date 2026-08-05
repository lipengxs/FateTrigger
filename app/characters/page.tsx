import { Breadcrumbs, Card, JsonLd, SectionHeading, SourceList, Tags, cardImageFor } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Characters and Awakeners: Confirmed Status", "Fate Trigger characters and Awakeners: confirmed named characters, official-footage links, kit-information boundaries, and update triggers.", "/characters");

export default function Page() {
  const characters = siteContent.entries.filter((entry) => entry.category === "characters" && ["fally", "tata-and-bibi"].includes(entry.slug));
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Fate Trigger Characters", href: "/characters" }])} />
      <JsonLd data={itemListJsonLd("Confirmed Fate Trigger character watch pages", "Source-aware Fate Trigger pages for officially public named characters and Awakener information.", "/characters", characters.map((entry) => ({ name: entry.title, href: `/characters/${entry.slug}`, description: entry.excerpt })))} />
      <Breadcrumbs items={[{ label: "Fate Trigger Characters", href: "/characters" }]} />
      <header className="page-header"><span className="eyebrow">Awakener Status</span><h1>Fate Trigger Characters and Awakeners</h1><p>This hub tracks public named characters and Awakener information. It does not publish a pre-launch tier list, best solo picks, final squad compositions, or invented ability values.</p></header>
      <section className="section article-body">
        <article className="article-main">
          <h2>How character coverage works here</h2>
          <table className="info-table"><tbody>
            <tr><th>Confirmed</th><td>Named characters are listed only when they are supported by the public source set already recorded by this site.</td></tr>
            <tr><th>Not confirmed</th><td>Final abilities, cooldowns, damage, counters, difficulty, and tier position remain unknown unless an official source says otherwise.</td></tr>
            <tr><th>Update trigger</th><td>Official character pages, trailers, public-test notes, patch notes, or clearly attributable gameplay material.</td></tr>
          </tbody></table>
          <p>Each character page is a source-safe watch page: it tells readers what is named, what has not been verified, and where future details must come from. That keeps character searches useful without passing off pre-launch interpretation as kit documentation.</p>
        </article>
        <aside className="article-aside"><h2>Read next</h2><p><a className="button primary" href="/news">Official updates</a></p><p><a className="button" href="/media">Trailer evidence</a></p><p><a className="button" href="/release-date">Release status</a></p></aside>
      </section>
      <section className="section"><SectionHeading eyebrow="Named Characters" title="Source-aware Fate Trigger character pages" /><div className="grid-3">
        {characters.map((entry) => <Card key={entry.slug} title={entry.title} eyebrow="Named character" href={`/characters/${entry.slug}`} image={cardImageFor("characters", entry.slug)} imageAlt={`${entry.title} Fate Trigger character media`}><><p>{entry.excerpt}</p><Tags tags={entry.tags} /></></Card>)}
      </div></section>
      <section className="section"><SectionHeading eyebrow="Awakener Context" title="Read the system before judging the meta" /><div className="grid-3">
        <Card title="Fate Trigger Awakener Roles" eyebrow="Guide" href="/guides/awakeners-role-guide" image={cardImageFor("guide", "awakeners-role-guide")} imageAlt="Fate Trigger Awakener guide media"><p>Use role context to understand public footage without turning it into a tier list.</p></Card>
        <Card title="Fate Trigger News" eyebrow="Updates" href="/news" image={cardImageFor("news")} imageAlt="Fate Trigger news media"><p>Track the next official character reveal, beta note, or trailer announcement.</p></Card>
        <Card title="Fate Trigger Platform Status" eyebrow="Platforms" href="/guides/ps5-steam-platform-choice-guide" image={cardImageFor("guide", "ps5-steam-platform-choice-guide")} imageAlt="Fate Trigger platform media"><p>Keep access and platform questions separate from character speculation.</p></Card>
      </div></section>
      <SourceList />
    </>
  );
}
