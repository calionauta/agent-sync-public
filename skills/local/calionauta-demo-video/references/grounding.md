# Element grounding: deterministic first, Jev on demand

The driver matches targets deterministically: explicit selector, then
accessible-name match (exact → whole-word → substring, shortest wins), and it
skips twins covered by a modal backdrop. That covers scripted demos with zero
network, zero cost and zero data leaving the machine. Keep it that way.

## When determinism is not enough

- Rehearsal fails on genuinely ambiguous twins (same name twice, both visible).
- Goal-driven exploration with no fixed playbook ("find the export button").
- Highly dynamic UIs where selectors rot between runs.

For these, the 2026 answer is **Jev** (TypeSafe System One): a tiny decision
model that takes an element list (id, role, visible text) plus a task and
returns element + action with calibrated confidence — 70–500ms per decision,
~40–200× cheaper than a frontier model, no screenshots involved. How teams
use it:

- `browser-use/jev-ultrafast`, `0x7067/jev-browse` (`fast_run`): one Jev
  request per step (operation + target together), executor re-checks freshness
  and occlusion before acting.
- `@jkudish/jev-browser`: same loop as MCP/CLI/library; brings its own skill
  file for the calling agent.
- `pi-jev-browser` (pi package): Jev loop as pi tools, including video
  finalization — directly relevant wherever pi runs.
- `classifier.dev`: Jev behind plain HTTP with a **keyless free tier**, plus a
  `computer-use-action-picker` skill (accessibility-tree candidates judged
  with confidence gates).

## Integration point (opt-in, not default)

A future `ground` step would POST `{ task, candidates }` to a Jev endpoint
(TypeSafe key, or classifier.dev free tier) and click the returned id above a
confidence floor, falling back to rehearse-fail below it. Rules if built:

- Never a default dependency: keys, billing and network stay out of the
  happy path. Deterministic matching remains the engine.
- Secrets via env (`TYPESAFE_API_KEY`), never in the playbook or repo.
- Page text leaves the machine per call — opt-in per playbook, and never on
  sensitive pages (health, banking, credentials). Local apps recording their
  own demo fixtures are the safe case, not user data.
- Confidence below floor = rehearse-fail with the distribution attached,
  never a blind click.
