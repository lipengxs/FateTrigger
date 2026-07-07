import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Fate Trigger Guide"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <section className="page-header">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>This independent Fate Trigger guide page does not exist, or it may have moved during a source-safe content update.</p>
      <div className="hero-actions">
        <Link className="button primary" href="/guides">Guide index</Link>
        <Link className="button" href="/release-date">Release tracker</Link>
      </div>
    </section>
  );
}
