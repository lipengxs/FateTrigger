import Image from "next/image";
import Link from "next/link";
import { ReleaseCountdown } from "@/components/release-countdown";
import { faqs, footerLinks, navGroups, navItems, siteContent } from "@/lib/content";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Header() {
  const headerGroups = navGroups.filter((group) => group.label !== "Site");
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={siteContent.siteName}>
        <span className="brand-mark" aria-hidden="true">FT</span>
        <span className="brand-copy"><strong>Fate Trigger</strong><small>Guide</small></span>
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        {headerGroups.map((group) => (
          <div className="nav-dropdown" key={group.label}>
            <button className="nav-trigger" type="button" aria-haspopup="true">{group.label}</button>
            <div className="nav-menu">
              <div className="nav-group">
                <strong>{group.label}</strong>
                {group.links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
}

export function IndependenceBanner() {
  return (
    <aside className="independence-banner" aria-label="Independent fan site notice">
      <strong>Independent fan-made guide.</strong>
      <span>This is not the official Fate Trigger website. Release, platform, character, weapon, and map notes are editorial analysis with source links.</span>
      <Link href="/about">About this site</Link>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>{siteContent.siteName}</strong>
        <p>{siteContent.disclaimer}</p>
      </div>
      <div className="footer-links">
        {footerLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </div>
      <p className="fineprint">Feedback: <a href="mailto:zplpreviewcontract@gmail.com">zplpreviewcontract@gmail.com</a></p>
    </footer>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item) => <span key={item.href}>/ <Link href={item.href}>{item.label}</Link></span>)}
    </nav>
  );
}

export function HomeHero() {
  const target = siteContent.facts.countdownTarget;
  return (
    <section className="home-hero home-hero-sky">
      <Image src="/images/hero/fate-trigger-hero.jpg" alt={siteContent.gameName + " official trailer gameplay scene"} fill priority className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-hud" aria-hidden="true"><span>Release Watch</span><span>Awakener Intel</span><span>Floating Arena</span></div>
      <div className="hero-content">
        <span className="eyebrow">{siteContent.hero.eyebrow}</span>
        <h1>{siteContent.hero.title}</h1>
        <p>{siteContent.hero.dek}</p>
        <div className="hero-actions">
          <Link className="button primary" href={siteContent.hero.primaryCta[1]}>{siteContent.hero.primaryCta[0]}</Link>
          <Link className="button" href={siteContent.hero.secondaryCta[1]}>{siteContent.hero.secondaryCta[0]}</Link>
        </div>
        <p className="independent-note">This site is an independent fan-made guide and is not affiliated with the official game publisher or developer.</p>
      </div>
      <aside className="hero-dossier">
        <span>Public launch status</span>
        <strong>{siteContent.facts.releaseDateLabel}</strong>
        <small>{siteContent.facts.platforms.join(" / ")}</small>
        {target ? <div className="hero-countdown"><ReleaseCountdown target={target} label={siteContent.facts.releaseDateLabel} /></div> : null}
      </aside>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {href ? <Link className="button" href={href}>{cta || "Open"}</Link> : null}
    </div>
  );
}

export function FactPanel() {
  const rows = [
    ["Release", siteContent.facts.release],
    ["Platforms", siteContent.facts.platforms.join(", ")],
    ["Genre", siteContent.facts.genre],
    ["Developer", siteContent.facts.developer],
    ["Publisher", siteContent.facts.publisher],
    ["Engine", siteContent.facts.engine],
  ];
  return (
    <div className="fact-panel">
      {rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

export function QuickStartRail() {
  const cards = [
    { title: "Release tracker", href: "/release-date", eyebrow: "Launch", image: cardImageFor("release"), text: siteContent.facts.releaseDateLabel },
    { title: "Beginner route", href: "/beginner", eyebrow: "Start here", image: cardImageFor("guide", "fate-trigger-beginner-guide"), text: "Movement, roles, and first-session priorities." },
    { title: "Awakeners", href: "/characters", eyebrow: "Roster", image: cardImageFor("characters"), text: "Read character roles before the meta settles." },
    { title: "Gun-Chip", href: "/gun-chip", eyebrow: "Loadouts", image: cardImageFor("weapons"), text: "Weapon planning and combat range notes." },
    { title: "Maps", href: "/maps", eyebrow: "Routes", image: cardImageFor("maps"), text: "Floating arena routes, landing reads, and rotations." },
    { title: "Trailer Lab", href: "/media", eyebrow: "Media", image: cardImageFor("media"), text: "Official footage, thumbnails, and watch notes." }
  ];
  return (
    <section className="section quick-start-section">
      <SectionHeading eyebrow="Quick Start" title="Pick the fastest path into Fate Trigger" />
      <div className="quick-start-grid">
        {cards.map((card) => (
          <Link className="quick-start-card" href={card.href} key={card.href}>
            <img src={card.image} alt={`${card.title} Fate Trigger footage`} loading="lazy" />
            <span>{card.eyebrow}</span>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ReleaseBlock() {
  const target = siteContent.facts.countdownTarget;
  return (
    <section className="section release-section">
      <SectionHeading eyebrow="Latest Release Date" title={siteContent.gameName + " launch status"} href="/release-date" cta="Full tracker" />
      <div className="release-layout">
        <article className="feature-panel">
          <span className="eyebrow">Public date</span>
          <h3>{siteContent.facts.releaseDateLabel}</h3>
          <p>{siteContent.facts.release}</p>
          <p>{siteContent.facts.countdownNote}</p>
          <p>Source checked: {siteContent.sourceChecked}. This is independent guide analysis, not an official launch announcement.</p>
        </article>
        {target ? <ReleaseCountdown target={target} label={siteContent.facts.releaseDateLabel} /> : <article className="feature-panel muted-panel"><span className="eyebrow">Countdown</span><h3>No exact timer yet</h3><p>Countdown will be added only after an exact official date or unlock time is public.</p></article>}
      </div>
    </section>
  );
}

export function VideoFeature() {
  const [primary, ...rest] = siteContent.videos;
  return (
    <section className="section video-section">
      <SectionHeading eyebrow="YouTube Intel" title={siteContent.gameName + " videos on the homepage"} href="/media" cta="Media hub" />
      <div className="video-layout">
        <article className="video-feature">
          <iframe src={`https://www.youtube.com/embed/${primary.youtubeId}`} title={primary.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          <div>
            <span className="eyebrow">{primary.source}</span>
            <h3>{primary.title}</h3>
            <p>{primary.excerpt}</p>
            <ul className="check-list">{primary.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            <WatchTable video={primary} compact />
          </div>
        </article>
        <div className="video-stack">
          {rest.map((video) => (
            <Link href={`/media/${video.slug}`} className="video-thumb" key={video.slug}>
              <img src={columnImageFor("media", video.slug)} alt={video.title + " public trailer thumbnail"} />
              <div><strong>{video.title}</strong><span>{video.notes.slice(0, 2).join(" / ")}</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function columnImageFor(type: string, slug = "") {
  const localMediaBySlug: Record<string, string> = {
    "official-trailer-breakdown": "/images/media/official-trailer.jpg",
    "closed-beta-trailer-breakdown": "/images/media/closed-beta-trailer.jpg",
    "gamescom-trailer-breakdown": "/images/media/gamescom-trailer.jpg",
    "early-access-trailer-breakdown": "/images/media/early-access-trailer.jpg",
    "cinematic-early-access-trailer-breakdown": "/images/media/cinematic-early-access-trailer.jpg"
  };
  if (slug && localMediaBySlug[slug]) return localMediaBySlug[slug];
  const thumbSlugs = new Set([
    "fate-trigger-beginner-guide",
    "fate-trigger-release-date-tracker",
    "awakeners-role-guide",
    "floating-arena-route-guide",
    "gun-chip-loadout-guide",
    "system-requirements-settings",
    "boss-fight-third-party-guide",
    "first-day-route-plan",
    "controller-keyboard-settings",
    "solo-queue-awakener-picks",
    "squad-composition-guide",
    "gun-chip-build-scenarios",
    "floating-map-landing-zones",
    "fate-trigger-vs-marvel-rivals",
    "omnisight-anti-cheat-fair-play-guide",
    "paleblight-lore-explained",
    "fally-tata-bibi-role-comparison",
    "ps5-steam-platform-choice-guide",
    "gun-chip-progression-planning",
    "endgame-zone-rotation-guide",
    "fally",
    "tata-and-bibi",
    "gun-chip-system",
    "endgame-zone",
    "omnisight",
    "platform-watch",
    "mobility-awakener",
    "control-awakener",
    "burst-awakener",
    "mid-range-rifle",
    "close-pressure-weapon",
    "long-sightline-weapon",
    "steam-2026-release-window",
    "early-access-roadmap-adjusted",
    "playstation-platform-watch",
    "closed-beta-footage-signals"
  ]);
  if (slug && thumbSlugs.has(slug)) return `/images/thumbs/${slug}.png`;
  const text = `${type} ${slug}`.toLowerCase();
  if (text.includes("release") || text.includes("date") || text.includes("launch") || text.includes("countdown")) return "/images/tiles/release.jpg";
  if (text.includes("character") || text.includes("awakener") || text.includes("class") || text.includes("fally") || text.includes("bibi")) return "/images/tiles/characters.jpg";
  if (text.includes("weapon") || text.includes("loadout") || text.includes("gun") || text.includes("chip")) return "/images/tiles/weapons.jpg";
  if (text.includes("map") || text.includes("route") || text.includes("arena") || text.includes("environment") || text.includes("bridge") || text.includes("vertical")) return "/images/tiles/maps.jpg";
  if (text.includes("media") || text.includes("trailer") || text.includes("video") || text.includes("news") || text.includes("comparison") || text.includes("vs-")) return "/images/tiles/media.jpg";
  return "/images/tiles/guides.jpg";
}

export const cardImageFor = columnImageFor;

export function DetailHeaderImage({ type, slug, title }: { type: string; slug?: string; title: string }) {
  return (
    <section className="detail-header-image section">
      <img src={columnImageFor(type, slug)} alt={`${title} Fate Trigger media header`} />
    </section>
  );
}

function watchRows(video: typeof siteContent.videos[number]) {
  const slots = ["0:00-0:20", "0:20-0:45", "0:45-1:10", "1:10-1:40"];
  return video.notes.slice(0, 4).map((note, index) => ({
    time: slots[index],
    focus: note,
    reason: index === 0 ? "Establish the public footage context and any release or UI cards." : index === 1 ? "Check combat, movement, and readable role signals." : index === 2 ? "Look for map routes, squad spacing, and pressure points." : "Capture unanswered questions for future guide updates."
  }));
}

export function WatchTable({ video, compact = false }: { video: typeof siteContent.videos[number]; compact?: boolean }) {
  return (
    <div className={compact ? "watch-table compact" : "watch-table"}>
      <h4>What to watch for</h4>
      <table>
        <thead><tr><th>Approx.</th><th>Focus</th><th>Why it matters</th></tr></thead>
        <tbody>{watchRows(video).map((row) => <tr key={row.time}><th>{row.time}</th><td>{row.focus}</td><td>{row.reason}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export function FeaturedMediaWall() {
  const tiles = [
    { title: "Release tracker", href: "/release-date", image: columnImageFor("release"), eyebrow: "Launch" },
    { title: "Beginner guide", href: siteContent.hero.secondaryCta[1], image: columnImageFor("guides"), eyebrow: "Guide" },
    { title: siteContent.videos[0].title, href: `/media/${siteContent.videos[0].slug}`, image: columnImageFor("media", siteContent.videos[0].slug), eyebrow: "YouTube" },
    { title: "Characters and roles", href: "/characters", image: columnImageFor("characters"), eyebrow: "Database" },
    { title: "Weapons and loadouts", href: "/weapons", image: columnImageFor("weapons"), eyebrow: "Loadouts" },
    { title: "Maps and routes", href: "/maps", image: columnImageFor("maps"), eyebrow: "Routes" }
  ];
  return (
    <section className="section media-wall-section">
      <SectionHeading eyebrow="Featured Media Wall" title={`${siteContent.gameName} visual guide hub`} href="/media" cta="Open media" />
      <div className="media-wall">{tiles.map((tile) => <Link key={tile.href + tile.title} href={tile.href} className="media-wall-tile"><img src={tile.image} alt={`${tile.title} visual tile`} /><span>{tile.eyebrow}</span><strong>{tile.title}</strong></Link>)}</div>
    </section>
  );
}

export function Card({ title, eyebrow, href, image, imageAlt, children }: { title: string; eyebrow?: string; href?: string; image?: string; imageAlt?: string; children: React.ReactNode }) {
  const body = (
    <article className="content-card">
      {image ? <img className="card-media" src={image} alt={imageAlt || title} loading="lazy" /> : null}
      {eyebrow ? <span className="card-eyebrow">{eyebrow}</span> : null}
      <h3>{title}</h3>
      {children}
    </article>
  );
  return href ? <Link className="card-link" href={href}>{body}</Link> : body;
}

export function Tags({ tags }: { tags: readonly string[] }) {
  return <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

export function FaqBlock() {
  return (
    <section className="section">
      <SectionHeading eyebrow="FAQ" title="Common player questions" />
      <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </section>
  );
}

export function SourceList() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Sources" title="Independent source links and credit discipline" />
      <div className="source-list">
        {siteContent.sources.map(([name, url, note]) => <a key={url} href={url} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{note}</span></a>)}
      </div>
    </section>
  );
}

export function SourceTimeline() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Source Timeline" title="Release-date claims and current confidence" />
      <div className="source-timeline">
        {siteContent.releaseTimeline.map((item) => (
          <article key={item.date + item.label} className="timeline-card">
            <time>{item.date}</time>
            <div>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
              <dl>
                <div><dt>Source</dt><dd>{item.source}</dd></div>
                <div><dt>Confidence</dt><dd>{item.confidence}</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
