---
name: cali-ops-changelog-site
description: "Publish a repo CHANGELOG as /releases/ article pages on its GitHub Pages site. Triggers when: user says 'changelog site', 'releases page', 'publish changelog', 'release notes blog', 'version history site', or when cutting a release that needs site notes. Covers: splitting CHANGELOG.md by version section, per-version pages + index, multi-repo merge (core + plugin changelogs), sitemap/nav wiring for the zero-dep site/build.mjs pattern, and the social-launch handoff."

metadata:
  frequency: monthly
  category: infra
  context-cost: low
---

# Changelog Site

Turn `CHANGELOG.md` into `/releases/` article pages on the repo's own
GitHub Pages site. No framework, no service, no API key: the build-time
`site/build.mjs` (node stdlib only) splits version sections into HTML.

## When to use

- Cutting a release and the site should carry notes for it.
- Adding a second changelog source (core + plugin) to one site.
- Any repo using the `site/build.mjs` zero-dep pattern (gogogo, stelow).
- For the social-media version of a release (thread, posts), hand off to
  `cali-social-publish` — this skill owns the site pages, not the wording.

## Contents

| Section | When to consult |
|---------|------------------|
| [Pattern](#pattern) | Before wiring a repo (source, URLs, nav, checks) |
| [Multi-repo merge](#multi-repo-merge) | stelow-style: core + plugin changelogs on one site |
| [Wiring checklist](#wiring-checklist) | While editing a repo's `site/build.mjs` |
| [Social launch handoff](#social-launch-handoff) | After the pages are green |
| [Examples](#examples) | First use |
| [Edge cases](#edge-cases) | Failures, odd headers, drift |

## Pattern

- **Source is `CHANGELOG.md`, never the Releases API.** Auto-generated
  release notes are commit lists, not narrative. The changelog is already
  the curated summary (entries written in the same commit as the change).
- **One page per `##` section.** URL scheme (dir page + file pages):
  `site/releases/index.html` → `/releases/`, plus
  `site/releases/<version>.html` → `/releases/<version>.html`.
  File pages (not dir URLs) so relative nav needs no per-depth helper:
  home is always `../`, index is always `./`, prev/next `./<v>.html`.
- **Docs sidebar gains one group** (`Releases → All releases`) computed
  for every manifest depth: `"../".repeat(cur.split("/").length + 1) +
  "releases/"`. Release pages use a minimal custom nav (home + all +
  prev/next), not the docs sidebar.
- **Sitemap gains every releases URL.** `llms.txt` is untouched (docs map
  only) — a deliberate non-goal, recorded here so nobody "fixes" it.
- **Relative `.md` links inside entries** are rewritten to repo-root blob
  URLs before rendering, matching GitHub's own CHANGELOG rendering.
- **Check runs without writing**: missing source, unparseable header, and
  duplicate slugs fail the build. Slugs share one `/releases/` namespace
  across merged sources.

## Multi-repo merge

When the important changes land in a second repo (bb-plugin-stelow) but
the site lives with the first (stelow):

1. Vendor a snapshot: `site/vendor/<name>-CHANGELOG.md` + `site/vendor/<name>-SHA`
   (the pinned ref the snapshot was taken at) + `site/vendor/refresh.sh <ref>`
   (curl `raw.githubusercontent.com/<owner>/<repo>/<ref>/CHANGELOG.md`,
   fail-closed on empty/non-section content). Same trick as the stelow
   standards refresh: explicit, pinned, re-runnable — never a submodule,
   never live-fetch at build (builds stay hermetic and reproducible).
2. `SOURCES` lists both files with an `origin` label each
   (`core`, `bb-plugin`). Index rows and pages carry the label as
   `<small> · origin</small>` — no CSS changes needed.
3. Combined index sorts by file order per source, sources concatenated
   (each changelog is newest-first already). Versions never collide
   across repos; if they ever do, the duplicate-slug check fires and a
   human disambiguates.
4. Per-version tag links point at each entry's own repo
   (`https://github.com/<owner>/<repo>/releases/tag/<prefix><version>`).

## Wiring checklist

In the repo's `site/`:

1. Copy `scripts/releases.mjs` from this skill to `site/releases.mjs`
   (byte-identical; canonical lives here).
2. `import { checkReleases, buildReleases } from "./releases.mjs"` in
   `site/build.mjs`; call `checkReleases(ROOT, SOURCES)` at the top of
   `check()`, and `buildReleases(...)` in `build()` with the host's
   `{ esc, renderBody, pageShell }`, appending returned URLs to the
   sitemap list.
3. Append the Releases group in `sidebar()` (depth-aware href above).
4. If merging: add `site/vendor/` snapshot + SHA + `refresh.sh`, list
   both files in `SOURCES`.
5. Run the repo's site build + check (`make site && make site-check`,
   or `npm run gen:site`); confirm `/releases/` + one version page +
   sitemap entries. `node --check site/releases.mjs` after edits.

`SOURCES` shape: `{ file (repo-root-relative), origin (string|null),
repo ("owner/name"), tagPrefix ("v") }`.

## Social launch handoff

Site pages are the record; social is the announcement. After green:

1. Draft the thread from the newest section's lede + measured numbers
   only (no adjectives without numbers).
2. 280 chars/post max, all-lowercase when the account style demands it;
   verify with `python3 -c "print(len(t))"`.
3. Publish via `cali-social-publish` (owns credentials, scheduling,
   thread mechanics). This skill never touches accounts.

## Examples

Input: `wire /releases/ for this repo (single CHANGELOG.md)`.
Output: `site/releases.mjs` vendored, `build.mjs` wired (check + build +
sitemap + sidebar group), `make site && make site-check` green,
`/releases/` + `/releases/<latest>.html` verified, sitemap lists them.

Input: `add the bb-plugin changelog to the stelow site`.
Output: `site/vendor/bb-plugin-CHANGELOG.md` + SHA pinned to latest tag
+ `refresh.sh`, `SOURCES` with both origins, combined index sorted,
duplicate-slug check passing, build green.

Input (should NOT activate): `write my release notes for me`.
Output: decline — entry text is authored with the change (docs-stay-truthful
rule); this skill publishes entries, it does not invent them.

## Edge cases

- **Section with two versions** (`## [0.33.0] - … · [0.32.0] - …`): one
  page, slug from the first version; index notes `(also 0.32.0)`.
- **`[Unreleased]`**: included as slug `unreleased`, no tag link.
- **Header without a parseable version or date**: build fails loudly —
  fix the changelog, never weaken the parser.
- **Vendor snapshot stale** (plugin shipped, site didn't): expected and
  visible (SHA file names the pin). Refresh is manual by design; a
  weekly auto-bump is a separate decision, not a default.
- **A version exists in both merged sources**: the second one takes an
  origin-prefixed slug (`bb-plugin-0.41.0`) with a stderr note — visible,
  deterministic, never silently dropped. A second collision on the prefixed
  slug still fails the build.
- **CHANGELOG has no `##` sections**: build fails (`no sections found`)
  instead of emitting an empty index.
- **Stale files**: the build never deletes `site/releases/` — removing a
  version section orphans its HTML (unreferenced by index/sitemap but still
  served). After such an edit, delete the orphan file explicitly.

## Test cases

Should activate: "put the changelog on the site", "releases page for
this repo", "merge the plugin changelog into the site", "prep the
release announcement".
Should NOT activate: "write release notes", "bump the version",
"create the GitHub release" (that's `cali-ops-github-releases`),
"post this to twitter" (that's `cali-social-publish`).
