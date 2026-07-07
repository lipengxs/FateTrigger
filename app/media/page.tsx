import { Breadcrumbs, JsonLd, SectionHeading, WatchTable } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Fate Trigger Trailer Lab", "Embedded Fate Trigger videos, YouTube thumbnails, trailer notes, and gameplay footage analysis.", "/media");

export default function Page() {
  const [primary, ...rest] = siteContent.videos;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Media", href: "/media" }])} />
      <Breadcrumbs items={[{ label: "Media", href: "/media" }]} />
      <header className="page-header media-lab-header">
        <span className="eyebrow">Trailer Lab</span>
        <h1>Fate Trigger video breakdowns for movement, weapons, and release clues</h1>
        <p>Videos are embedded from YouTube and credited to their upload source. This page analyzes visible footage; it does not download, rehost, or claim official ownership.</p>
      </header>
      <section className="section trailer-lab-layout">
        <article className="trailer-stage">
          <iframe src={`https://www.youtube.com/embed/${primary.youtubeId}`} title={primary.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          <div>
            <span className="eyebrow">{primary.source}</span>
            <h2>{primary.title}</h2>
            <p>{primary.excerpt}</p>
            <WatchTable video={primary} />
          </div>
        </article>
        <div className="trailer-rail">
          {rest.map((video) => (
            <a href={`/media/${video.slug}`} className="trailer-card" key={video.slug}>
              <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt={`${video.title} YouTube thumbnail`} />
              <span>{video.source}</span>
              <strong>{video.title}</strong>
              <small>{video.notes.join(" / ")}</small>
            </a>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Footage Checklist" title="What to compare across every Fate Trigger video" />
        <div className="grid-3">
          {["Movement cooldowns and bridge exits", "Awakener ability readability", "Weapon range bands and recoil comfort", "Floating island rotation risks", "Release-date or platform cards", "UI clues that may change before launch"].map((item) => <article className="feature-panel" key={item}><span className="eyebrow">Watch for</span><h3>{item}</h3><p>Use this as an editorial observation point, then verify details through official source links and future patch notes.</p></article>)}
        </div>
      </section>
      <section className="section article-main">
        <h2>Evidence rule</h2>
        <p>Trailer footage can support visible observations about movement, map pressure, readability, and player questions. It should not be used as final proof of launch balance, exact character kits, weapon stats, anti-cheat performance, or platform rules.</p>
      </section>
    </>
  );
}
