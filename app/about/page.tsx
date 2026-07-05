import { Breadcrumbs, JsonLd, SourceList } from "@/components/site";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("About and Disclaimer", "Independent fan-made guide disclaimer and contact details for Fate Trigger Field Guide.", "/about");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <header className="page-header"><span className="eyebrow">Independent Site</span><h1>About {siteContent.siteName}</h1><p>{siteContent.disclaimer}</p></header>
      <section className="section article-main"><h2>Editorial standard</h2><p>We summarize public information, add source links, and clearly mark uncertain details as expected, reported, or not officially confirmed. This site does not copy official long-form text and does not present itself as the official game website.</p><p>Contact: <a href="mailto:zplpreviewcontract@gmail.com">zplpreviewcontract@gmail.com</a></p></section>
      <SourceList />
    </>
  );
}
