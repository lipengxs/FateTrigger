# IndexNow / Bing

This site serves its IndexNow verification file from `public/` at the production domain root. `indexnow.json` contains the production origin and public ownership key. The key is intentionally served publicly; it is not a Bing account credential.

Requirements: Python 3.10+ (standard library only). From this repository:

```sh
npm run indexnow:check
npm run indexnow:submit
```

The default dry run checks the live sitemap without submitting. A submission first verifies the exact live key file, then reads the live sitemap (including sitemap indexes), deduplicates URLs, checks robots.txt for Bing, and excludes HTTP errors, redirects, noindex pages and pages without a self canonical. Only HTTPS URLs on this production origin are accepted. Batches contain at most 10,000 URLs and go directly to `https://www.bing.com/indexnow`.

Reports are saved to `.indexnow/report.json`, or the path passed with `--report`. HTTP 200 means received; 202 means received pending ownership verification. Neither means indexed. Errors, including 403/422/429, produce a failing exit status and retain the receipt; 429 is not retried automatically. Review excluded URLs before correcting SEO or retrying.

The GitHub Actions workflow runs on successful production deployment events, and can also be run manually after a deployment. It checks only the canonical production domain. Preview deployments do not trigger automatic submission. This sends the current eligible sitemap after each production release; for large or frequently updated sites, change to an incremental URL feed. Deleted pages are not submitted by this sitemap-only integration.

Protocol: https://www.indexnow.org/documentation
