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
| `press` | `key` (`Enter`, `Escape`, `Tab`…) | Sent to the focused element. |
| `waitFor` | `selector`/`role`+`name`/`text`, `timeout` (default 6000) | Fails the take when it times out — a missing element must never eat 30s silently. |
| `sleep` | `ms` | Breathing room so a human can read the result. |
| `scroll` | `y` **or** `selector` | Smooth scroll, then settles. |
| `subtitle` | `text` (empty clears) | Chapter card of the story. Keep under ~60 chars, `Step N — …` format. |
| `evaluate` | `js` | Runs in the page: seed `localStorage`, stub state, assert invariants. Keep it side-effect-free except seeding. |
| `followPopup` | — | Switches driving + recording to the newest popup target (OAuth, present/share windows). |
| `main` | — | Switches back to the original page (e.g. after closing the popup). |
| `close` | — | Closes the current page/tab (fire-and-forget: a close destroys its own CDP response). Follow with `main` to keep going. |
| `download` | — | Must precede the click that triggers it; files land in `--out/downloads/`. |

Resolution order for targets: explicit `selector` first, then `role` + `name`,
then `text` (visible-text substring), then `label` (placeholder/aria-label for
`type`). Among matches the best accessible-name match wins (exact, then
whole-word, then substring; shortest breaks ties) and a twin hidden behind a
modal backdrop is skipped, never clicked through the overlay. Rehearsal
reports which rule matched each step.

## Pacing defaults (baked into the driver, overridable per step)

After navigation 2.5s · after a click 0.8s · after typing 0.5s ·
`sleep` where a result must be read (1.5–3s) · 3s hold on the final frame.
Typing at 12 chars/s reads as human without boring anyone.

## Frame rate

Captures run back-to-back as fast as the machine allows; assembly uses the
measured effective rate, so the video stays real-time on fast and slow
machines alike. No `fps` to tune.

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

## Outputs (`--out`, default `./demo-out/`)

- `take-*.webm` — full-quality master (browser-chrome-free viewport).
- `take-*.mp4` — landing pages, LinkedIn, YouTube.
- `take-*.gif` — READMEs and PRs (800px wide, 10fps, paletted).
- `take-*.ndjson` — step log with timings (debugging, not publishing).

GIFs stay small by construction; if one passes ~8MB, shorten the flow or
split chapters instead of raising the bitrate.
