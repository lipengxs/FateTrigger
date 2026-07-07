import { Breadcrumbs, JsonLd, SourceList } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("About and Disclaimer", "Independent fan-made Fate Trigger guide disclaimer, source policy, and contact details.", "/about");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <header className="page-header"><span className="eyebrow">Independent Site</span><h1>About {siteContent.siteName}</h1><p>{siteContent.disclaimer}</p></header>
      <section className="section article-main">
        <h2>Editorial standard</h2>
        <p>We summarize public information, add source links, and clearly mark uncertain details as expected, reported, inferred, or not officially confirmed. This site does not copy official long-form text and does not present itself as the official game website.</p>
        <div className="content-block">
          <h2>What this site is not</h2>
          <ul className="check-list">
            <li>Not the official Fate Trigger website.</li>
            <li>Not operated by Saroasis Studios or any platform holder.</li>
            <li>Not a source for official launch dates, beta access, downloads, keys, account support, or publisher statements.</li>
          </ul>
        </div>
        <div className="content-block">
          <h2>Correction policy</h2>
          <p>If an official source changes a release date, platform plan, character detail, weapon note, or map name, this guide should update the affected page and keep cautious wording until the change is confirmed by primary sources.</p>
        </div>
        <p>Contact: <a href="mailto:zplpreviewcontract@gmail.com">zplpreviewcontract@gmail.com</a></p>
      </section>
      <SourceList />
    </>
  );
}
