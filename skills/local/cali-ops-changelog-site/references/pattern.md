# Wiring pattern (both builder variants)

The two sites (`gogogo`, `stelow`) share the zero-dep `site/build.mjs`
shape: `MANIFEST` list, `esc/inline/rewrite/renderBody`, `sidebar(cur)`,
`pageShell(title, cur, body, prevNext, navOverride?)`, `check()` (no writes),
`build()` (docs pages, index, llms.txt, llms-full.txt, sitemap.xml).

## Wire-up (same 5 edits in both repos)

1. Copy `scripts/releases.mjs` from this skill to `site/releases.mjs`
   (byte-identical; do not fork it — fixes land here first, then re-vendor).
2. In `site/build.mjs`:
   - `import { checkReleases, buildReleases } from "./releases.mjs";`
   - Add a `RELEASE_SOURCES` const next to `MANIFEST`
     (single source, or core + vendored plugin snapshot).
   - `check()`: call `checkReleases(ROOT, RELEASE_SOURCES)` (parse-only).
   - `build()`: `const releaseUrls = buildReleases({ ROOT, OUT, NAME,
     SOURCES: RELEASE_SOURCES, h: { esc, renderBody, pageShell } })`
     and spread `releaseUrls` into the sitemap list.
   - `sidebar()`: after the manifest loop, append one group —
     `<h4>Releases</h4>` + link with depth-aware href
     `"../".repeat(cur.split("/").length + 1) + "releases/"`
     (works for `""`, flat slugs and nested `plugin/*` slugs alike).
   - Update the header comment (Inputs/Outputs) to mention releases.
3. `node --check site/releases.mjs`, then the repo's own
   `make site && make site-check` (or `npm run gen:site`).
4. Confirm `/releases/`, one `/releases/<latest>.html`, sitemap entries,
   and the sidebar group on a docs page.

## Variant notes

- gogogo `pageShell` carries the copy-button script and `.table-wrap`;
  stelow's is plainer. `buildReleases` only calls host functions, so
  output matches each site automatically — never port CSS across.
- gogogo `NAME` is a `const` (`"gogogo"`); stelow hardcodes `"stelow"`
  in its shell/nav strings. Pass the right `NAME` through.
- stelow runs `npm run gen:site`; gogogo runs `make site`. Same command
  shape underneath (`node site/build.mjs`, `--check` for verify-only).

## Vendor snapshot (multi-repo merge)

`site/vendor/bb-plugin-CHANGELOG.md` + `site/vendor/bb-plugin-SHA` +
`site/vendor/refresh.sh`:

```sh
#!/bin/sh
# usage: sh site/vendor/refresh.sh <sha-or-tag>
set -eu
REF="${1:?usage: sh site/vendor/refresh.sh <sha-or-tag>}"
curl -fsSL "https://raw.githubusercontent.com/calionauta/bb-plugin-stelow/${REF}/CHANGELOG.md" -o site/vendor/bb-plugin-CHANGELOG.md
grep -q '^## ' site/vendor/bb-plugin-CHANGELOG.md || { echo "snapshot has no sections"; exit 1; }
printf '%s' "$REF" > site/vendor/bb-plugin-SHA
```

Pin to a tag (e.g. `v0.78.1`), never `master` — builds stay reproducible
and the SHA file says exactly what the site shows. Staleness is expected
and visible; refresh is manual by design.

## Social launch (hand to cali-social-publish)

After green: newest section lede + measured numbers only, 280 chars/post,
verify lengths with `python3 -c`, account style (e.g. all-lowercase) applied
before counting. The skill that owns accounts and scheduling does the
posting; this pattern stops at the draft.
