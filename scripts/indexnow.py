#!/usr/bin/env python3
"""Submit verified production sitemap pages to Bing IndexNow (Python 3.10+)."""
import argparse
import concurrent.futures
import datetime
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ENDPOINT = "https://www.bing.com/indexnow"
USER_AGENT = "IndexNowSiteSubmitter/1.0"


def request(url, payload=None):
    headers = {"User-Agent": USER_AGENT}
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json; charset=utf-8"
    req = urllib.request.Request(url, data=data, headers=headers)
    for attempt in range(3):
        try:
            response = urllib.request.urlopen(req, timeout=30)
            break
        except urllib.error.HTTPError as error:
            response = error
            break
        except (urllib.error.URLError, TimeoutError, ConnectionError):
            # A POST might already have reached Bing; never blindly duplicate it.
            if payload is not None or attempt == 2:
                raise
            time.sleep(attempt + 1)
    with response:
        return response.status, response.geturl(), response.headers, response.read().decode("utf-8", errors="replace")


def normalized(url):
    p = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((p.scheme, p.netloc, p.path or "/", p.query, ""))


def same_origin(url, origin):
    p = urllib.parse.urlsplit(url)
    return p.scheme == "https" and p.netloc == urllib.parse.urlsplit(origin).netloc and not p.fragment and not p.username


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocked = False
        self.canonicals = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name", "").lower() in ("robots", "bingbot"):
            self.blocked |= bool(re.search(r"\b(noindex|none)\b", attrs.get("content", ""), re.I))
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonicals.append(attrs.get("href", ""))


def sitemap_urls(url, origin, seen=None):
    seen = set() if seen is None else seen
    if url in seen:
        return []
    if len(seen) >= 100 or not same_origin(url, origin):
        raise ValueError("Invalid, external, or excessively nested sitemap: " + url)
    seen.add(url)
    status, final_url, _, body = request(url)
    if status != 200 or normalized(final_url) != normalized(url):
        raise ValueError(f"Sitemap must return HTTP 200 without redirect: {url} ({status})")
    root = ET.fromstring(body)
    kind = root.tag.split("}")[-1]
    if kind not in ("urlset", "sitemapindex"):
        raise ValueError("Expected a sitemap XML document")
    child_tag = "url" if kind == "urlset" else "sitemap"
    urls = []
    for child in root:
        if child.tag.split("}")[-1] != child_tag:
            continue
        loc = next((element.text for element in child if element.tag.split("}")[-1] == "loc"), None)
        if not loc or not same_origin(loc.strip(), origin):
            raise ValueError("Sitemap contains a missing or off-origin URL")
        loc = loc.strip()
        urls.extend(sitemap_urls(loc, origin, seen) if kind == "sitemapindex" else [loc])
    return list(dict.fromkeys(urls))


def check_page(url, robots):
    try:
        if not robots.can_fetch("bingbot", url) or not robots.can_fetch("*", url):
            return {"url": url, "reason": "robots.txt disallows crawling"}
        status, final_url, headers, body = request(url)
        if status != 200:
            return {"url": url, "reason": f"HTTP {status}"}
        if normalized(final_url) != normalized(url):
            return {"url": url, "reason": "redirect", "target": final_url}
        if "text/html" not in headers.get("Content-Type", "").lower():
            return {"url": url, "reason": "not HTML"}
        metadata = Metadata()
        metadata.feed(body)
        if metadata.blocked or re.search(r"\b(noindex|none)\b", headers.get("X-Robots-Tag", ""), re.I):
            return {"url": url, "reason": "noindex"}
        if len(metadata.canonicals) != 1 or normalized(urllib.parse.urljoin(url, metadata.canonicals[0])) != normalized(url):
            return {"url": url, "reason": "missing, multiple, or non-self canonical"}
        return {"url": url, "eligible": True}
    except Exception as error:
        return {"url": url, "reason": str(error)}


def run(root, submit, report):
    config = json.loads((root / "indexnow.json").read_text())
    origin, key = config["origin"], config["key"]
    if not re.fullmatch(r"[A-Za-z0-9-]{8,128}", key):
        raise ValueError("Invalid IndexNow key")
    if origin != "https://" + urllib.parse.urlsplit(origin).netloc or not same_origin(origin, origin):
        raise ValueError("Expected an HTTPS production origin without path")
    if (root / "public" / (key + ".txt")).read_text().strip() != key:
        raise ValueError("Local verification file does not match configuration")
    key_url = origin + "/" + key + ".txt"
    report.update(origin=origin, endpoint=ENDPOINT, keyLocation=key_url, mode="submit" if submit else "dry-run")
    status, final_url, _, body = request(key_url)
    report["keyVerified"] = status == 200 and final_url == key_url and body.strip() == key
    if submit and not report["keyVerified"]:
        raise ValueError(f"Deploy the verification file first: {key_url} (HTTP {status})")
    status, final_url, _, body = request(origin + "/robots.txt")
    if status != 200 or normalized(final_url) != normalized(origin + "/robots.txt"):
        raise ValueError("Cannot verify production robots.txt")
    robots = urllib.robotparser.RobotFileParser()
    robots.parse(body.splitlines())
    urls = sitemap_urls(origin + "/sitemap.xml", origin)
    if not urls:
        raise ValueError("Production sitemap is empty; nothing submitted")
    report["sitemapCount"] = len(urls)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        checked = list(pool.map(lambda url: check_page(url, robots), urls))
    eligible = [item["url"] for item in checked if item.get("eligible")]
    report["eligibleUrls"] = eligible
    report["excluded"] = [item for item in checked if not item.get("eligible")]
    if not eligible:
        raise ValueError("No eligible, indexable pages; nothing submitted")
    if not submit:
        report["status"] = "dry-run"
        return
    report["batches"] = []
    for offset in range(0, len(eligible), 10000):
        batch = eligible[offset:offset + 10000]
        payload = {"host": urllib.parse.urlsplit(origin).netloc, "key": key, "keyLocation": key_url, "urlList": batch}
        status, _, headers, body = request(ENDPOINT, payload)
        report["batches"].append({"count": len(batch), "httpStatus": status, "response": body[:2000], "retryAfter": headers.get("Retry-After"), "urlList": batch})
        if status not in (200, 202):
            raise ValueError(f"Bing IndexNow returned HTTP {status}; inspect report before retrying")
    report["status"] = "accepted-pending-key-validation" if any(b["httpStatus"] == 202 for b in report["batches"]) else "submitted"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--submit", action="store_true", help="Send to Bing; default only checks live URLs")
    parser.add_argument("--report", default=".indexnow/report.json")
    args = parser.parse_args()
    report = {"timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()}
    code = 0
    try:
        run(Path(__file__).resolve().parent.parent, args.submit, report)
    except Exception as error:
        report.update(status="failed", error=str(error))
        code = 1
    path = Path(args.report)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: v for k, v in report.items() if k not in ("eligibleUrls", "excluded", "batches")}, ensure_ascii=False))
    print(f"Eligible: {len(report.get('eligibleUrls', []))}; excluded: {len(report.get('excluded', []))}; report: {path}")
    return code


if __name__ == "__main__":
    sys.exit(main())
