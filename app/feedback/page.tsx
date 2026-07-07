import { Breadcrumbs } from "@/components/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Feedback", "Send corrections, source tips, and guide requests for Fate Trigger Guide.", "/feedback");

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Feedback", href: "/feedback" }]} />
      <header className="page-header"><span className="eyebrow">Feedback</span><h1>Send corrections and guide requests</h1><p>Found a better source, trailer timestamp, or confirmed stat? Send it in and we will review it before publishing.</p></header>
      <section className="section article-main"><p>Email: <a href="mailto:zplpreviewcontract@gmail.com">zplpreviewcontract@gmail.com</a></p></section>
    </>
  );
}
