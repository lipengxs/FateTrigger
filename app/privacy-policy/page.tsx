import { Breadcrumbs } from "@/components/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privacy Policy", "Privacy policy for Fate Trigger Field Guide.", "/privacy-policy");

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <header className="page-header"><span className="eyebrow">Privacy</span><h1>Privacy Policy</h1><p>This independent guide collects only ordinary hosting and analytics-level information if analytics are enabled. We do not sell personal information.</p></header>
      <section className="section article-main"><h2>Contact</h2><p>For privacy or content questions, email <a href="mailto:zplpreviewcontract@gmail.com">zplpreviewcontract@gmail.com</a>.</p></section>
    </>
  );
}
