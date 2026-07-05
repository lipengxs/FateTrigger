import { notFound } from "next/navigation";
import { Breadcrumbs, DetailHeaderImage, JsonLd, SourceList, Tags, WatchTable } from "@/components/site";
import { siteContent } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMeta, videoJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return siteContent.videos.map((item) => ({ slug: item.slug }));
}

function getItem(slug: string) {
  return siteContent.videos.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return pageMeta(item.title, item.excerpt, "/media/" + item.slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();
  const base = "media";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: base, href: "/" + base }, { name: item.title, href: "/" + base + "/" + item.slug }])} />
      <JsonLd data={videoJsonLd() } />
      <Breadcrumbs items={[{ label: base, href: "/" + base }, { label: item.title, href: "/" + base + "/" + item.slug }]} />
      <header className="page-header"><span className="eyebrow">{item.source}</span><h1>{item.title}</h1><p>{item.excerpt}</p></header>
      <DetailHeaderImage type="media" slug={item.slug} title={item.title} />
      <section className="section article-body">
        <article className="article-main">
          <iframe style={{ width: "100%", aspectRatio: "16 / 9", border: 0, background: "#000" }} src={`https://www.youtube.com/embed/${item.youtubeId}`} title={item.title} loading="lazy" allowFullScreen /><p>{item.excerpt}</p><WatchTable video={item} /><ul className="check-list">{item.notes.map((point) => <li key={point}>{point}</li>)}</ul>
        </article>
        <aside className="article-aside"><h2>Read next</h2><p>Use the release tracker, media hub, and database pages to verify this topic from more than one source.</p><p><a className="button" href="/release-date">Release tracker</a></p><p><a className="button" href="/database">Database</a></p></aside>
      </section>
      <SourceList />
    </>
  );
}
