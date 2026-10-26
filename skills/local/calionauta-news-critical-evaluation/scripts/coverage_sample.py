#!/usr/bin/env python3
"""Sample news coverage of a topic by perspective group, using the keyless GDELT DOC 2.0 API.

Each --group is "label=domain1,domain2,...". The script runs one GDELT query per group
(topic + domain filter), waits between requests to respect GDELT's public rate limit
(about 1 request per 5 seconds per IP), and prints JSON.

Examples:
  python scripts/coverage_sample.py --query "AI regulation" --timespan 7d --dry-run \
      --group "wires=reuters.com,apnews.com" --group "tech=theverge.com,wired.com"

  python scripts/coverage_sample.py --query "AI regulation" --timespan 7d --max 8 \
      --group "wires=reuters.com,apnews.com" --group "tech=theverge.com,wired.com"

Notes:
- Standard library only. Needs outbound network access to api.gdeltproject.org.
- GDELT covers roughly the last 3 months. Requests are capped per call; keep --max small.
- The query goes to GDELT as written: quote phrases yourself, and put OR groups in parentheses.
  Extra operators such as sourcelang:portuguese or sourcecountry:brazil can be appended to the
  query; check GDELT's DOC 2.0 documentation for the exact syntax before relying on them.
- Group labels and domain lists are YOUR sampling choices (see references/outlets.md). The output
  is a list of articles per group, not a judgment of who is right.
"""

import argparse
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc"
MIN_INTERVAL_SECONDS = 5.5


def build_query(query, domains):
    """Combine the topic query with a domain filter. OR terms must be parenthesized."""
    domains = [d.strip() for d in domains if d.strip()]
    if not domains:
        return query
    filters = [f"domain:{d}" for d in domains]
    domain_part = filters[0] if len(filters) == 1 else "(" + " OR ".join(filters) + ")"
    return f"{query} {domain_part}"


def build_params(full_query, timespan, max_records):
    return {
        "query": full_query,
        "mode": "ArtList",
        "format": "json",
        "sort": "DateDesc",
        "timespan": timespan,
        "maxrecords": str(max_records),
    }


def fetch(params, retries=3):
    """Call GDELT. Returns a dict: either parsed JSON or {"error": "..."}."""
    url = GDELT_URL + "?" + urllib.parse.urlencode(params)
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": "news-critical-evaluation/1.0"}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = resp.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as exc:
            if exc.code == 429 and attempt < retries - 1:
                time.sleep((2 ** attempt) * MIN_INTERVAL_SECONDS)
                continue
            return {"error": f"HTTP {exc.code}"}
        except Exception as exc:  # network failure, DNS, timeout
            return {"error": str(exc)}
        try:
            return json.loads(body)
        except json.JSONDecodeError:
            # GDELT can answer HTTP 200 with a plain-text error or an empty body.
            return {"error": (body.strip()[:200] or "empty response")}
    return {"error": "rate limited"}


def normalize(articles):
    out, seen = [], set()
    for a in articles or []:
        url = a.get("url")
        if not url or url in seen:
            continue
        seen.add(url)
        out.append(
            {
                "title": a.get("title"),
                "url": url,
                "domain": a.get("domain"),
                "language": a.get("language"),
                "sourcecountry": a.get("sourcecountry"),
                "seendate": a.get("seendate"),
            }
        )
    return out


def parse_group(spec):
    if "=" not in spec:
        raise ValueError(f'--group must look like "label=domain1,domain2", got: {spec!r}')
    label, domains = spec.split("=", 1)
    return label.strip(), [d for d in domains.split(",") if d.strip()]


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--query", required=True, help="Topic query, passed to GDELT as written")
    p.add_argument("--group", action="append", default=[], help='"label=domain1,domain2" (repeatable)')
    p.add_argument("--timespan", default="7d", help="GDELT timespan, e.g. 24h, 7d, 1m (default 7d)")
    p.add_argument("--max", type=int, default=10, help="Max articles per group (default 10)")
    p.add_argument("--dry-run", action="store_true", help="Print the requests without calling GDELT")
    args = p.parse_args(argv)

    try:
        groups = [parse_group(g) for g in args.group] or [("all", [])]
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    result = {"query": args.query, "timespan": args.timespan, "groups": []}
    for i, (label, domains) in enumerate(groups):
        params = build_params(build_query(args.query, domains), args.timespan, args.max)
        entry = {"label": label, "domains": domains}
        if args.dry_run:
            entry["request"] = GDELT_URL + "?" + urllib.parse.urlencode(params)
        else:
            if i > 0:
                time.sleep(MIN_INTERVAL_SECONDS)
            data = fetch(params)
            if "error" in data:
                entry["error"] = data["error"]
                entry["articles"] = []
            else:
                entry["articles"] = normalize(data.get("articles"))[: args.max]
        result["groups"].append(entry)

    result["note"] = (
        "Groups are the caller's sampling choices. Absence of articles in a group is a finding "
        "(or a query problem), not proof that the group did not cover the story."
    )
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
