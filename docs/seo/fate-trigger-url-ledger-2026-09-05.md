# Fate Trigger URL Disposition Ledger

Source: Google Search Console exports dated 2026-09-05. The Coverage export reports seven `Discovered - currently not indexed` URLs and two `Crawled - currently not indexed` URLs, but does not include the URL examples. Do not bulk-request indexing. Add each URL below only after exporting its GSC examples or inspecting it directly.

| URL | Search intent | Evidence / internal links | Action | Status |
| --- | --- | --- | --- | --- |
| `/guides/fate-trigger-release-date-tracker` | Fate Trigger release date | Superseded by the canonical release page | 308 to `/release-date` | Implemented |
| `/rankings` | Character ranking | No public kit or balance evidence | 308 to `/characters` | Implemented |
| `/guides/fally-tata-bibi-character-watch` | Named character watch | Duplicates the character hub | 308 to `/characters` | Implemented |
| `/guides/fally-tata-bibi-role-comparison` | Character comparison | No verified kit data; duplicates character hub | 308 to `/characters` | Implemented |
| `/database/characters/fally` | Fally character | Duplicates `/characters/fally` | 308 to `/characters/fally` | Implemented |
| `/database/characters/tata-and-bibi` | Tata and Bibi character | Duplicates `/characters/tata-and-bibi` | 308 to `/characters/tata-and-bibi` | Implemented |
| `/database/weapons/gun-chip-system` | Gun-Chip system | Duplicates the system hub | 308 to `/gun-chip` | Implemented |
| `/database/lore/platform-watch` | Fate Trigger platforms | Duplicates the platform-status guide | 308 to `/guides/ps5-steam-platform-choice-guide` | Implemented |
| `/database/lore/omnisight` | OmniSight | Duplicates the anti-cheat guide | 308 to `/guides/omnisight-anti-cheat-fair-play-guide` | Implemented |
| `/database/lore/paleblight` | Lore | No standalone official evidence cluster | 308 to `/lore` (noindex) | Implemented |

## Inspection Rule

For each remaining GSC example, record its canonical, current query, official source, last verified date, update trigger, and at least two internal links. Use only one of these outcomes:

- **Keep and rewrite:** unique query, primary evidence, and a durable update trigger exist.
- **308 redirect:** an equivalent stronger canonical page already answers the query.
- **Noindex, follow:** useful navigation or legal/support content with no independent search intent.
- **Observe:** a new evidence-backed URL with insufficient crawl history.

The first URLs to inspect in GSC are `/release-date`, `/news`, `/characters`, `/guides/system-requirements-settings`, and `/guides/ps5-steam-platform-choice-guide`. Request indexing only after their rendered content, canonical, sitemap inclusion, and internal links are verified.
