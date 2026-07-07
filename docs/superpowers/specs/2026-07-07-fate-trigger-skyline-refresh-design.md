# Fate Trigger Skyline Magazine Refresh Design

## Context

The current Fate Trigger guide works as a content-heavy Next.js site, but its presentation does not yet feel like a polished game news and guide destination. The main issues found during review are:

- The homepage is mostly stacked SEO sections, so the information hierarchy feels flat.
- The header title and menu styling feel generic, and dropdown menus are hard to click because the menu opens below the trigger with a hover gap.
- Image references point to `/logo.png`, `/images/hero-independent.png`, and generated thumbnail paths, but the project does not currently contain those real game assets in `public`.
- Several captions and alt patterns describe "original editorial art", which conflicts with the requested direction of using real game media.

The approved visual direction is **Skyline Magazine**: a modern, clean game-media style that uses official-looking gameplay imagery, clear navigation, and strong homepage entry points while preserving the site's guide/database SEO value.

## Goals

- Make the site feel like a credible Fate Trigger game information hub rather than a generic SEO template.
- Fix all header dropdown interaction issues so menu items can be selected reliably.
- Replace generated/vector-looking imagery with real public game media where feasible.
- Restructure the homepage around player intent: release status, beginner path, characters, weapons, maps, media, and latest updates.
- Keep the existing Next.js architecture and content model, with focused changes to shared components, global CSS, homepage composition, and media assets.

## Non-Goals

- Do not rebuild the site with a new framework or introduce a design system dependency.
- Do not scrape private, authenticated, or copyrighted assets from non-public sources.
- Do not add complex search/filter functionality in this pass.
- Do not rewrite every article body unless a caption or image reference directly conflicts with the new media strategy.

## Design Direction

The refreshed site should use a dark blue/black anime shooter palette with cyan highlights, glassy but readable panels, large real media moments, and restrained orange accents for calls to action or warnings.

The layout should remain practical and SEO-friendly, but visual hierarchy should lead:

1. Large cinematic hero using local official/public gameplay media.
2. Clear status and starter actions immediately below the hero.
3. Compact entry cards for guides, characters, weapons, maps, and media.
4. Latest updates and deeper guide/database content further down the page.
5. Sources and FAQ retained near the end.

## Header and Navigation

The header should be rebuilt as a cleaner magazine-style top bar:

- Brand: use a compact mark plus a shorter visible title, likely `Fate Trigger Guide`.
- Primary nav: `News`, `Guides`, `Database`, `Media`, `Release`.
- Dropdown groups:
  - `Database`: Characters, Weapons, Maps, Lore, Rankings.
  - `Media`: Trailer Lab, Resources, Comparisons.
  - `Site`: About, Feedback, Privacy, shown in footer or secondary menu if space allows.
- Dropdown interaction:
  - Remove the vertical hover gap between trigger and menu.
  - Keep the menu open on `:hover` and `:focus-within`.
  - Add a small invisible bridge or set `top: 100%` plus padding inside the menu if spacing is needed.
  - Ensure keyboard users can tab from the trigger into menu links without the menu closing.
  - Ensure mobile navigation remains usable with wrapping or stacked dropdown panels, with all dropdown links visible without precision hover.

## Homepage Structure

The homepage should be reorganized into these sections:

1. **Hero**
   - Real game media background.
   - Clear title focused on release tracking, guides, and gameplay systems.
   - Primary CTA: release tracker.
   - Secondary CTA: beginner guide.
   - A small status card showing release window, platforms, and official-source caution.

2. **Quick Start Rail**
   - Four to six high-value cards:
     - Release Date
     - Beginner Guide
     - Awakeners
     - Weapons
     - Maps
     - Trailer Lab

3. **Latest Intel**
   - Latest news cards with real media thumbnails where available.
   - Keep tags but make cards visually lighter and less repetitive.

4. **Guide Path**
   - Beginner and practical guides first.
   - De-emphasize duplicate "advanced search guides" wording.

5. **Database Preview**
   - Characters, weapons, maps, and systems remain discoverable.
   - Cards should use the same image helper and avoid generated-art captions.

6. **Media Wall**
   - Use official YouTube thumbnails and any downloaded official public images.
   - Present as a visual hub, not a generic gallery.

7. **FAQ and Sources**
   - Keep for trust and SEO, but visually quieter.

## Media Strategy

Use a hybrid official-media approach:

- Download and localize core public assets for hero, logo/icon candidates, section tiles, and major card imagery where feasible.
- Continue using YouTube official thumbnail URLs for video cards when localizing every thumbnail is not necessary.
- Prefer sources already listed in `siteContent.sources`: Steam, official site, official YouTube, and public publisher/developer pages.
- Use only publicly accessible media. Do not pull from authenticated pages, private APIs, fan reposts, or sources without a clear connection to the publisher/developer/platform.
- Keep source notes in code or content where useful so future updates can trace where localized assets came from.
- Add a script such as `scripts/fetch-official-media.mjs` only if manual downloading is too fragile or repeated.
- Store assets under `public/images/` with predictable names:
  - `public/images/hero/fate-trigger-hero.jpg`
  - `public/images/tiles/release.jpg`
  - `public/images/tiles/guides.jpg`
  - `public/images/tiles/characters.jpg`
  - `public/images/tiles/weapons.jpg`
  - `public/images/tiles/maps.jpg`
  - `public/images/thumbs/<slug>.jpg`
- Update metadata Open Graph/Twitter image references to the new hero asset.
- Remove or revise captions that imply generated editorial art.
- If a specific local asset cannot be sourced, fall back in this order:
  1. Official YouTube thumbnail.
  2. Official Steam capsule/screenshot media.
  3. A neutral CSS gradient/media placeholder with no fake character or generated artwork.

## Implementation Areas

- `components/site.tsx`
  - Update `Header`, `HomeHero`, media/card helpers, and captions.
  - Add small reusable homepage components if the current file becomes harder to read.

- `app/page.tsx`
  - Reorder homepage sections around the approved structure.
  - Remove duplicate or overly SEO-labeled headings.

- `app/globals.css`
  - Refresh theme tokens and layout styling.
  - Fix dropdown hover/focus behavior.
  - Improve card, hero, media wall, and mobile responsiveness.

- `lib/content.ts`
  - Adjust visible site name/nav labels if needed.
  - Keep existing content arrays unless a label or image path needs updating.

- `app/layout.tsx` and `lib/seo.ts`
  - Update social preview image paths after hero media is localized.

## Validation

- Run TypeScript checking after code changes.
- Run a production build if dependencies and network conditions allow.
- Manually verify:
  - Dropdown links are clickable with mouse movement from trigger to menu.
  - Dropdown links are reachable by keyboard tab/focus.
  - Header works at desktop and mobile widths.
  - Header text and menu states have readable contrast.
  - Homepage hierarchy reads correctly from top to bottom.
  - No broken local image paths remain.
  - All meaningful images have accurate alt text that does not claim generated art is official media.
  - Open Graph/Twitter image references point to existing assets.

## Open Risks

- Official site or Steam media may block downloads or change URLs. If this happens, YouTube thumbnails and public Steam capsule assets can be used as the first fallback.
- The project currently has no local real game images under `public/images`, so media sourcing may be the longest part of implementation.
- The site must remain clear that it is an independent guide and not an official publisher property.
