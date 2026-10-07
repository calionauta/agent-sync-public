# Playbook format

One JSON file per flow, committed with the project (e.g.
`demo/how-it-works.playbook.json`). Re-running it after a UI change is the
whole point — narration lives in `subtitle` steps, never in prose around it.

```json
{
  "viewport": { "width": 1280, "height": 720 },
  "steps": [
  "steps": [
    { "do": "goto", "url": "http://localhost:3000/" },
    { "do": "subtitle", "text": "Step 1 — Create an account" },
    { "do": "click", "name": "Sign up" },
    { "do": "type", "label": "Work email", "text": "demo@example.com" },
    { "do": "press", "key": "Enter" },
    { "do": "waitFor", "text": "Welcome" },
    { "do": "sleep", "ms": 1500 }
  ]
}
```

## Step verbs

| Verb | Fields | Notes |
|---|---|---|
| `goto` | `url` | Re-injects cursor + subtitle bar (navigation destroys overlays). |
| `click` | `selector` **or** (`role` + `name`) **or** `text` | `role` is an ARIA role (`button`, `tab`, `textbox`…), `name` a substring of the accessible name. Scrolls into view, glides the mouse, clicks. `expectPopup: true` follows a `window.open` popup and keeps recording there. |
| `type` | `label` (placeholder/aria-label substring) **or** `selector`, `text`, `cps` (chars/sec, default 12) | Clicks the field first, clears it, types visibly. |
| `press` | `key` **or** `chord: ["Alt", "Tab"]` | Real key events (chords hold/reverse); named keys flash a pill, plain characters stay silent. |
| `keys` | `text` | Display-only: narrates a shortcut without pressing it ("Alt + Tab" over a window switch the driver performs by retargeting). |
| `waitFor` | `selector`/`role`+`name`/`text`, `timeout` (default 6000) | Fails the take when it times out — a missing element must never eat 30s silently. |
| `sleep` | `ms` | Breathing room so a human can read the result. |
| `scroll` | `y` **or** `selector` | Smooth scroll, then settles. |
| `subtitle` | `text` (empty clears) | Chapter card of the story. Keep under ~60 chars, `Step N — …` format. |
| `evaluate` | `js` | Runs in the page: seed `localStorage`, stub state, assert invariants. Keep it side-effect-free except seeding. |
| `followPopup` | — | Switches driving + recording to the newest popup target (OAuth, present/share windows). |
| `main` | — | Switches back to the original page (e.g. after closing the popup). |
| `close` | — | Closes the current page/tab (fire-and-forget: a close destroys its own CDP response). Follow with `main` to keep going. |
| `closePopups` | — | Closes every page target except the main one. The tidy ending after a present/share beat. |
| `download` | — | Must precede the click that triggers it; files land in `--out/downloads/`. |

Resolution order for targets: explicit `selector` first, then `role` + `name`,
then `text` (visible-text substring), then `label` (placeholder/aria-label for
`type`). Among matches the best accessible-name match wins (exact, then
whole-word, then substring; shortest breaks ties) and a twin hidden behind a
modal backdrop is skipped, never clicked through the overlay. Clicks and
typing require an uncovered target; `scroll` and `waitFor` deliberately use
the best match regardless of coverage — scrolling to a covered element is
how it gets uncovered. Rehearsal reports which rule matched each step.

## Pacing defaults (baked into the driver, overridable per step)

After navigation 2.5s · after a click 0.8s · after typing 0.5s ·
`sleep` where a result must be read (1.5–3s) · 3s hold on the final frame.
Typing at 12 chars/s reads as human without boring anyone.
Clicks glide ~600ms to the target: the walk must span several capture frames,
or the cursor teleports between frames and the viewer loses the thread.
Every click blooms an amber ring where it lands, and named keys (Enter, Esc,
arrows…) flash a corner pill — both automatic, no playbook changes needed.
Typed characters are never echoed: the text already appears in the field.
Popup dwells hold 3–4s minimum with a subtitle naming the other side — an
open-vanish beat reads as share-then-unshare, which is worse than no popup.
Native `<select>` changes land without the menu ever opening (OS-level popup,
unrecordable headless): the viewer sees the value change, so narrate it in
the subtitle when the choice matters.

## Mouse (ghost-cursor style, zero dependencies)

Clicks travel a quadratic Bézier (control point on one side only), ease
in-out, land in the central 60% (never the exact pixel), overshoot past 500px
and settle back, over Fitts-ish timing (~600–900ms) — the recipe from
`ghost-cursor`, reimplemented over CDP so no package is needed. The walk must
span several capture frames or the cursor teleports.

## Captions (readability rules)

Floating centered pill above the player chrome (bottom ~52px, capped width,
19px semibold, dark pill + hairline border) — never a bottom bar, which
players and app footers both cover. Corner pill (top-right) for named keys
only. Under-60-char chapters in `Step N — …` form; clear with an empty
subtitle wherever the UI must speak alone.

## Frame rate

Captures run back-to-back as fast as the machine allows; assembly carries
per-frame measured durations through the concat demuxer, so pacing stays
exact on fast and slow machines alike — no single fps is assumed, and rate
variance never turns into timelapse in one half and slow motion in the other.
No `fps` to tune.

## Reliability rules (baked into the driver)

- Every CDP send carries a timeout: a renderer-stalled request rejects
  instead of hanging its caller forever (an orphaned pending entry is how
  takes used to die mid-run with zero output).
- Failures kill the browser: no orphaned headless instances pile up after a
  failed take.
- Clicks re-measure coordinates after the scroll settles; smooth scrolling
  moves the target.
- Scrolls verify the landing spot and jump if the smooth animation never ran;
  a vanished ref fails loudly instead of parking the take on the hero.
- Capture starts after the first navigation settles — takes never open on
  `about:blank` (see "First frame" above).

## First frame (no blank openings)

Capture starts after the first navigation settles (or after the first step
in gotoless playbooks), so takes and GIFs open on the loaded page — never on
`about:blank`. When embedding a take in a page, still set an explicit poster
(`poster="thumb.jpg"`, extracted with
`ffmpeg -i take.mp4 -frames:v 1 thumb.jpg`): no player shows a black flash
before metadata loads, on any connection.

## Re-running after a UI change

1. `record.mjs --rehearse` against the new UI. It stops at the first broken
   selector with a visible-element dump.
2. Fix the playbook (selectors only — subtitles rarely change).
3. Re-record. The take is real-time; a 60s demo costs 60s of machine.

## Native controls (no synthetic events)

Headless browsers cannot open native dropdowns or file pickers by clicking.
Drive them through the DOM instead:

```js
// <select>: bypass React's value tracker via the prototype setter,
// then fire a bubbling change so controlled components update.
const setter = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype, 'value').set;
setter.call(sel, 'wanted-value');
sel.dispatchEvent(new Event('change', { bubbles: true }));
```

Prefer `selectedIndex` (or match by visible option text) over hardcoded
option values when ids are generated per seed — `evaluate` with the recipe
above, never a click on the closed control.

## Popups (present/share windows)

The reliable pattern is: click the opener (`expectPopup: true` follows the
new target for journey steps) → dwell on the popup with subtitles → `close`
or `closePopups` → `main` to continue. The driver launches Chromium with
popup blocking disabled (synthetic clicks don't reliably earn transient
activation) and screenshots ride a dedicated connection per target, so footage
follows whichever target the journey is on. Never record a background popup
you haven't dwelled on — an open-vanish beat reads as "shared then
unshared".

## Outputs (`--out`, default `./demo-out/`)

- `take-*.webm` — full-quality master (browser-chrome-free viewport).
- `take-*.mp4` — landing pages, LinkedIn, YouTube.
- `take-*.gif` — READMEs and PRs (800px wide, 10fps, paletted).
- `take-*.ndjson` — step log with timings (debugging, not publishing).

GIFs stay small by construction; if one passes ~8MB, shorten the flow or
split chapters instead of raising the bitrate.
