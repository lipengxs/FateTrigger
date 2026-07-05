import { Breadcrumbs, FactPanel, FaqBlock, JsonLd, ReleaseBlock, SourceList } from "@/components/site";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { siteContent } from "@/lib/content";

export const metadata = pageMeta("Fate Trigger Release Date", "When does Fate Trigger release? Platforms, beta status, countdown, and source links.", "/release-date");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Release Date", href: "/release-date" }])} />
      <JsonLd data={faqJsonLd()} />
      <Breadcrumbs items={[{ label: "Release Date", href: "/release-date" }]} />
      <header className="page-header"><span className="eyebrow">Release Date</span><h1>When does {siteContent.gameName} release?</h1><p>{siteContent.facts.release}</p></header>
      <ReleaseBlock />
      <section className="section"><FactPanel /></section>
      <FaqBlock />
      <SourceList />
    </>
  );
}
