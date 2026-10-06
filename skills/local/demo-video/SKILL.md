---
name: demo-video
description: Record a scripted UI demo video (WebM, GIF, MP4) of any local web app for landing pages, READMEs and PRs. Use when the user asks to film the app, record a happy path, demo a feature, or make the docs visual.
---

# demo-video

Turns a JSON playbook into a narrated-by-subtitles screen recording of a web
app. Generic across projects: the app boots however the project boots, the
skill only drives a real browser (CDP, zero npm dependencies) and assembles
the footage with ffmpeg.

## Pipeline

Every demo goes **Discover → Playbook → Rehearse → Record**. Never record
without a passing rehearsal.

1. **Discover.** Boot the app, open each page of the flow, dump interactive
   elements (`role`, accessible name, `type`, placeholder). Never script what
   you have not seen: custom dropdowns, modal dialogs and disabled-until-valid
   buttons break assumptions silently.
2. **Playbook.** Write `demo/<flow>.playbook.json` in the project (format in
   `references/playbook.md`). One step per beat; subtitles carry the story,
   one chapter per step group. Commit it — re-runs after UI changes must not
   need re-discovery.
3. **Rehearse.** `node scripts/record.mjs --playbook <file> --url <base> --rehearse`.
   Validates every selector and fails loudly with a visible-element dump.
4. **Record.** Same command without `--rehearse`. Real-time take
   (a 60s demo costs 60s), then ffmpeg assembly to WebM + MP4 + GIF in
   `--out` (default `./demo-out/`).

## Publish gate (mandatory)

Never embed or upload footage without the user seeing it first. Finish by
reporting the three files and their sizes and asking where each goes
(landing, README, PR). No invented contact details on end cards; subtitles
are the narration — no TTS, no accounts, no uploads leave the machine.

## Scripts

- `scripts/record.mjs` — the driver. `--help` lists flags. Discovers the
  headless Chromium and ffmpeg already on this machine; falls back to
  `CHROME_PATH` / `FFMPEG_PATH` env, then to `PATH`.
- `references/playbook.md` — the playbook format, all step verbs, pacing
  defaults, native-control recipes, and the re-run procedure after UI changes.
- `references/grounding.md` — when deterministic matching is not enough:
  Jev-based element grounding as an opt-in fallback, what leaves the machine,
  and why it is not the default.

## One-time setup for MP4 + GIF

The Playwright-bundled ffmpeg only writes VP8/WebM. For the full matrix
(MP4 + paletted GIF), install a full static build once:

```bash
mkdir -p ~/.cache/demo-video && cd ~/.cache/demo-video && npm init -y && npm i ffmpeg-static
```

The driver finds it automatically. Without it, takes still record and
assemble WebM — nothing fails, the other formats print a one-line fix.

## Constraints

- Fresh browser profile per take (deterministic first-run). Seed demo data
  through the UI or an `evaluate` step — never against a developer's real data.
- Node 22+ only (native WebSocket for CDP). Linux headless is the primary
  target; headed works wherever a display exists.
- If a step needs auth, prefer a seeded local account or test credentials
  from the project's own docs. Stop at any credential/privacy boundary and ask.
