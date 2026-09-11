---
name: writing-style
description: >
  Apply owner's lowercase confessional writing style (draft + checklist edit,
  hard floors, never invent bio facts). Triggers when user says "escreve no
  meu estilo", "writing style", "style guidelines", "write/draft post, note,
  tweet, essay". Generic AI-slop cleanup delegates to anti-ai-slop-writing;
  pre-publish beta-read of long prose delegates to first-reader. Published
  text carries on-behalf attribution block.
version: 2.0.0
intents:
  - write a post
  - write a note
  - write a tweet
  - write an essay
  - draft text
  - apply my writing style
  - estilo de escrita
  - escrever
  - redigir
  - rascunho
  - post
  - tweet
  - nota
allowed-tools:
  - memory_search
  - memory_save
  - ask_user_question
---

# Writing Style Skill v2.0

the owner's personal writing style guidelines. **Applied in three passes** —
draft, checklist edit, optional beta-read gate.

**v2.0 changes from v1.6:**
- core cut from 886 to <500 lines; detail moved to `references/`
  (`examples.md`, `technical-formats.md`, `human-voice-palette.md`).
- generic slop hunting delegated to `anti-ai-slop-writing` (§15).
  install if missing (see Dependencies).
- pre-publish experience check delegated to `first-reader` (Pass 3).
  install if missing. never rewrites; reports where reading broke.
- description shortened to <1024 chars (R3 fix); added `When to use` (R9 fix).

> When in doubt, this skill overrides generic "good writing" instincts.
> The point is a distinct voice, not textbook prose. On conflict with
> external skills, this skill wins for voice; they win for generic hygiene.

## When to use / When NOT to use

Use when the user asks to write, draft, or generate text, or says
"escreve no meu estilo" / "writing style" / "style guidelines".
Covers posts, notes, tweets, essays, threads, newsletter/blog drafts,
GitHub issues/comments (with §20 attribution when published).

Do NOT use for: code review, factual verification, copyediting-only
requests without voice (use the dedicated tool), or as a beta-reader
itself (delegate to `first-reader`, Pass 3).

**Language rule:** the style rules below are language-agnostic. Always write
the output in the **same language the user used to make the request**. If the
user writes in Portuguese (pt-BR), generate the text in Portuguese. If the
user writes in English, generate the text in English. The linguistic register,
rhythm, and tone rules apply identically regardless of language.

## Workflow: three passes (Pass 3 optional)

**Pass 1 — draft:**
1. Run §0 pre-flight (facts, interview decision, context row).
2. Write applying §§1-16 freely. Do not second-guess. Let voice find itself.

**Pass 2 — edit (required):**
1. If `anti-ai-slop-writing` is installed, run its edit/detect pass first
   (generic hygiene: banned words, structural tells).
2. Re-read against §18 checklist. A-group (hard floors) are blockers.
   B-group 3+ fails → revise. Do not deliver the first draft.

**Pass 3 — beta-read gate (optional, only for long prose):**
Run `first-reader` when the piece is prose meant to be read in order AND
>~150 words AND headed to publication. `quick read` for title/hook,
`full run` for body, `again` after revising. See Pass 3 section.
Skip for tweets, reference docs, changelogs, private notes.

## Dependencies (install if missing)

```bash
test -d ~/.agents/skills/first-reader || \
  npx skills add calionauta/agent-sync-public -s "first-reader" -g -y
test -d ~/.agents/skills/anti-ai-slop-writing || \
  npx -y skills add https://github.com/jalaalrd/anti-ai-slop-writing/tree/main/skills/anti-ai-slop-writing -g -y
```

`first-reader` is vendored in this repo (Apache-2.0, see
`skills/local/first-reader/`). `anti-ai-slop-writing` has no declared
upstream license, so it is fetched at runtime, not redistributed here.
If offline or install fails, this skill is self-sufficient: §15 summary
covers the voice-specific tells, Pass 3 is skipped.

## 0. Pre-flight (BEFORE drafting)

Answer these in your thinking. Do not show the user the answers — this is
private reasoning that runs before the first word is written.

1. **Context row** — which row from §16 applies?
   personal essay / newsletter-post / tweet-or-caption / technical /
   comparison-or-review.

2. **Facts available** — run `memory_search` for the topic:
   - **YES, found material** → draft from memory, cite concepts as wikilinks
     where appropriate.
   - **NO, and the text is first-person about a specific event, project,
     relationship, or personal choice** → STOP. Fire `ask_user_question` with
     2-4 focused questions (see §7.2). Do not draft until the user answers.
   - **NO, and the text is not first-person / not about a specific event** →
     draft from general knowledge; no interview needed.

3. **Voice intensity** — for the chosen context row, which 3 sections matter
   most? Examples:
   - personal essay → §2 (genre) + §14 (human voice) + §16 (calibration)
   - newsletter-post → §3 (mood) + §11 (zigzag) + §14.5 (sensory detail)
   - technical → §12 (format adaptations) + §13 (diagrams) + §16 (calibration)
   - tweet-or-caption → §4 (rhythm) + §14.4 (fragments) + §14.8 (humor)

4. **Hard floors** (§17) — confirm none will be violated by the draft. If any
   hard floor would be violated, decide how to avoid it BEFORE starting.

If step 2 says "STOP, fire interview", do not draft. The text is not ready.

## 1. Linguistic register

- Written entirely in **lowercase letters**.
- Exceptions: only strictly necessary acronyms (e.g. `AI`, `MCP`) or proper nouns
  (names, places, brands).
- No title case, no ALL CAPS emphasis, no leading capitalization of sentences
  unless it is a proper noun or acronym.

## 2. Textual genre

- **Essayistic and confessional.**
- The text assumes the perspective of a **first-person learning diary** or
  personal essay.
- It reports what the author noticed, felt, tried, and understood — not what
  the world should be.

> **calibration note (§16)**: the principles 1-13 lean toward the personal
> essay row by default. If the actual context is another row (technical,
> comparison, tweet), soften the confessional register, hedge less, fragment
> less. §16 is the counter-weight to over-applying the personal-essay voice.

## 3. Predominant verbal mood

- **Subjunctive mood and hypothetical tone.**
- The text gropes for possibilities: *seems*, *perhaps*, *could*, *signals*,
  *suggests* (or pt-BR: *parece*, *talvez*, *poderia*, *sinaliza*, *sugere*).
- Reject dogmatic or absolute statements. Nothing is declared final.

## 4. Syntactic rhythm

- **Write full sentences.** Each sentence carries a complete thought. Never
  fragment a thought into one-word or three-word sentences.
- **Period over dash.** When a pause is a real break of thought, end the
  sentence and start a new one. The period replaces the em-dash and the
  comma-as-break. It does not replace the comma inside a sentence.
- **Commas are fine.** Use them for natural clauses and for lists: "marcadores
  de atenção: ok, precisa de humano, travado" is one sentence, not three.
- **No comma chains.** Do not string clause after clause with commas and
  conjunctions. If a sentence drags past two commas of subordination, split
  at the real break of thought.
- **No parentheses, no em-dashes.** Rewrite the aside as its own sentence.
  Colons are allowed to introduce a list or a punchline.
- **Short-to-medium sentences.** Vary the length. A short sentence lands
  harder after a medium one. The default is medium: readable, natural,
  unhurried.

## 5. Grammatical voice

- **Active voice** and focus on **processes**.
- Prefer verbs denoting movement, construction, and investigation:
  *notice*, *note*, *try*, *build*, *test*, *map*, *trace*, *walk*, *open*,
  *look*, *ask* (pt-BR: *noto*, *anoto*, *tento*, *construo*, *testo*,
  *mapeio*, *traço*, *caminho*, *abro*, *olho*, *pergunto*).
- The author is a moving subject, not a passive observer.

## 6. Factual neutrality

- Avoid words with extreme tones, empty (or idle) adjectives, pleonasms, and
  redundancies.
- **No superlatives**: *the true*, *certain*, *best*, *worst*, *always*,
  *never*, *the truth*, *the fundamental* (pt-BR: *o verdadeiro*, *certo*,
  *melhor*, *pior*, *sempre*, *nunca*, *a verdade*, *o fundamental*).
- **No adverbs of certainty or impact**: *highly precise*, *precisely*,
  *obviously*, *clearly*, *fundamentally* (pt-BR: *altamente preciso*,
  *precisamente*, *obviamente*, *claramente*, *fundamentalmente*).
- The argument must stand on **sober description**, not on the force of words.

## 7. Factual integrity (never invent, interview when needed)

This is the **hard floor** of the skill. It overrides every other rule if
they conflict. §17.1 promotes this to a numbered hard floor.

### 7.1 — never invent biographical facts

- Do **not** fabricate biographical details about the user: places lived, jobs
  held, people known, dates, ages, projects shipped, emotions felt at
  unspecified moments.
- Do **not** write first-person memories of events you have no record of
  ("i remember the first time i tried postgres in 2014") unless the user told
  you that memory in this session or in stored memory.
- Do **not** extrapolate from a known fact to a plausible-sounding neighbor
  ("the user works in tech, so they probably..."). Stay on the recorded facts.
- If a sentence would feel thin without invention, prefer a hedge ("i don't
  remember the exact year") over invention. Thin honest beats rich fabricated.

### 7.2 — interview the user when first-person text needs lived experience

Trigger an interview (via `ask_user_question` or equivalent, 2-4 short
questions) when **all** of the following hold:
- the requested text is in first person,
- it concerns a specific past event, project, relationship, or personal
  choice,
- and `memory_search` returns no recorded facts about it.

Questions are **focused on the paragraph**, not a biography. Ask only what the
text needs:
- "what year did that happen?"
- "what were you doing at the time?"
- "how did you feel about it?"
- "who else was involved?"

### 7.3 — persist confirmed facts

- After the user answers, **save the facts via `memory_save`** with a stable
  topic key (e.g. `biography:<slug>`, `project:<slug>`). Scope: personal.
- Tag concepts that will let future drafts retrieve them without re-asking.
- Do **not** save opinions, vibes, or half-formed impressions. Save facts
  that another session could verify against the user's memory.

### 7.4 — when NOT to interview

- text is not in first person,
- text is about a tool, concept, or domain (not the user),
- the user already provided the relevant facts in the prompt,
- `memory_search` returned enough recorded facts to draft without guessing,
- the user said "just write it" or "don't ask, draft from what you know" — then
  draft from stored memory, hedge where memory is thin, and surface the gaps
  in the final message ("drafted from what i had in memory; flag any
  inaccuracy and i'll correct").

## 8. No marketing

- Eliminate aggressive self-promotion terms and marketing bullshit strategies.
- Avoid marketing clichés and jargon (*game-changer*, *revolutionary*,
  *unlock*, *supercharge*, *elevate*, *level up*, *transform your*,
  *10x*, *must-have*).
- Avoid a sales, marketing, or hyperbolic tone.
- The argument must stand on **logic**, not on the force of words.

## 9. Decentered stance

- Write from the **first-person singular**: *i notice*, *i noted*,
  *i understood* (pt-BR: *noto*, *anotei*, *entendi*).
- Report your own impressions and connections.
- Do **not** try to dictate rules, prescribe behaviors for others, or sell a
  definitive conclusion.
- The text invites, it does not command.

## 10. Anti-post principle

- Does **not** ask for engagement (no "what do you think?", no "share this").
- Does **not** deliver truths. Does **not** virtue signal.
- Accepts being ignored. Radical economy. Active ambiguity.
- Non-performative tone. Assumed risk.

## 11. Zigzag structure

- **Continuously alternate** between the abstract concept (theory, philosophy)
  and the concrete scene (a real moment, a real object, a real conversation).
- Never let the theory float without a physical example.
- Pattern: concept -> scene -> concept -> scene -> landing.

## 12-13. Technical formats and diagrams (see references)

Prose carries the voice; structure sits inside it, not instead of it.
Load `references/technical-formats.md` (ex-§12+§13) when context row is
technical or comparison-review, or when the reader must hold >3
relationships, order spans components, or a boundary is the point.
Bullets need connective tissue; tables max 4-5 cols; code blocks minimal
with language id; mermaid inline, PNG export for Substack; always alt-text.

## 14. Human voice — summary (detail in references)

Cultivate, don't just avoid: process verbs in time (§14.1), dense hedges
~1/3 sentences (§14.2), mid-sentence self-correction 2-3x (§14.3),
occasional fragments for beat, never 3 in a row (§14.4), concrete sensory
detail over labels (§14.5), admit not-knowing (§14.6), 1-2 live
contradictions (§14.7), light self-deprecation (§14.8), physical-world test
— no abstract phrase without a concrete anchor (§14.9).
Load `references/human-voice-palette.md` for the full verb lists,
hedge inventories, and worked substitutions. Read
`references/examples.md` before drafting in pt-BR.

## 15. Hygiene genérica (delegated to anti-ai-slop-writing)

Generic tells (banned vocabulary, rule-of-three, uniform sentences,
parataxis, em-dash/exclamation discipline, passive, markdown slop) live in
`anti-ai-slop-writing` (`references/banned-words.md`). Run it first.
Voice-specific tells enforced here even when it is absent:
`vale destacar / em suma / concluindo`, colon reveals (`o detalhe:`),
trailing `-ing` (`mostrando que`), throat-clearing (`here's the thing`),
rhetorical stacks (max 1/piece). Code-switching rule is a hard floor
(§17.2). Conflict table: `pick a side` → ignored here, §3/§14.2 hedges win;
`use semicolons` → allowed but §4 period-break wins; lowercase §1 has no
external equivalent and always wins.

## 16. Context calibration

Sections 1-13 (especially §2 genre, §4 rhythm, §11 zigzag) apply a uniform
intensity. In practice the same voice rules intensify or soften depending
on context. Calibrate explicitly:

| context | confessional register | process verbs | fragments | structure | hedges |
|---------|------------------------|---------------|-----------|-----------|--------|
| **personal essay / diary / first-person reflection** | high | high | moderate (one per ~5 sentences) | none — pure prose zigzag | dense (one per ~3 sentences) |
| **newsletter / blog post (mixed)** | medium | medium | light (one per ~10 sentences) | light — headings + occasional bullets | medium (one per ~5 sentences) |
| **tweet / caption / short note** | high | high | aggressive — fragments are the form | none | dense |
| **technical content (§12)** | low — the voice lives in intros/landing only | low — keep verbs precise | none inside technical blocks | high — bullets/tables/code carry the load | sparse |
| **comparison / review / decision** | low | low | none | high — comparison table dominates | none — be direct about which is better |

## 17. Hard floors (override everything)

These rules are absolute. If a draft would violate any of them, the draft is
wrong — not the rule. v1.4 had §7 as the only hard floor. v1.5 makes these
five explicit and promotes them to numbered floor status.

### 17.1 — never invent biographical facts (re-export of §7.1)

The strongest floor. No *"i remember when i first..."* unless the user told
you that memory in this session or in stored memory. No fabricated pastas,
projects, dates, relationships, jobs, emotions felt at unspecified moments.
Thin honest beats rich fabricated.

### 17.2 — in pt-BR text, no code-switching unless justified

If the text is in Portuguese and an English term has a clean pt-BR
equivalent, use pt-BR. *trace* → *rastro*. *workflow* → *fluxo*. *deploy*
→ *implantação* (or *subir*). The exceptions are universal jargon without
a clean equivalent: *commit*, *bug*, *rollback*, *frontend*, *backend*,
*merge request* — leave these. If tempted to mix English for stylistic
flair, stop. Cross-reference §15.4.

### 17.3 — in confessional prose, process verbs in time

When the text is in first-person and reports the author's experience, use
verbs that carry movement and time. Static labels (*"isso é importante"*,
*"isso me incomodou"*) describe state, not process. Use process verbs:
*comecei a notar*, *tentei por três dias*, *voltei porque algo não
fechava*, *hesitei antes de*. See §14.1 for the full verb palette.

### 17.4 — admit uncertainty in first-person text

First-person claims about facts, dates, feelings, or events must be grounded
in `memory_search` results, in-session information from the user, or in
admitted uncertainty. If you don't have the fact, say so. *"não sei se
isso é..."*, *"posso estar viajando mas..."*, *"alguém me corrija se eu
tiver errado"*. Confidence is not the default for first-person text. See
§14.6.

### 17.5 — never deliver without explicit user confirmation when publishing

If the text will leave the chat (newsletter draft, blog post, public tweet,
anything irreversible), confirm with the user before final delivery. The
the publishing skill covers this for the target platform specifically; the principle
generalizes. The §10 anti-post principle (no engagement asks) is unrelated
and stays.

## 18. Checklist (pass 2)

Apply this checklist in **pass 2** of the workflow (see top). The hard floors
in group A are blockers. Voice quality in group B is quality. Format in
group C is situational.

### A. Hard floors — if any fails, rewrite before delivering

- [ ] **§17.1** No fabricated biographical facts (places, dates, projects,
      relationships, jobs, emotions). All first-person claims grounded in
      `memory_search`, in-session user input, or admitted uncertainty.
- [ ] **§17.2** In pt-BR text, no unjustified code-switching (English terms
      with clean pt-BR equivalents). Universal jargon (*commit*, *bug*,
      *deploy*) stays.
- [ ] **§17.3** In confessional prose, process verbs in time (not static
      labels).
- [ ] **§17.4** First-person uncertainty admitted, not papered over.
- [ ] **§17.5** No publishing without explicit user confirmation.
- [ ] **§20** Public text carries the on-behalf attribution block (EN/PT) at the top, with the owner's name/link — no "draft" wording on published text.

### B. Voice quality — if 3+ fail, revise

- [ ] Lowercase throughout (except acronyms and proper nouns).
- [ ] Active voice, focused on processes (§5).
- [ ] Hypothetical/subjunctive mood throughout (§3) — no absolute claims.
- [ ] Zigzag: abstract ↔ concrete alternate (§11).
- [ ] Hedges dense enough — one per ~3 sentences in confessional prose
      (§14.2).
- [ ] No AI tells — none of: *"vamos explorar/mergulhar"*, *"vale destacar"*,
      colon reveals, trailing -ing clauses, *"em suma/em resumo/concluindo"*
      (§15).

### C. Format and calibration — verify each applies

- [ ] Calibration row from §16 matches the actual context (not over-applying
      confessional voice to a comparison table, etc).
- [ ] If new facts came from an interview: saved via `memory_save` with stable
      topic key and searchable concepts (§7.3).
- [ ] If technical content: bullets/tables/code only where prose alone would
      overload; prose still carries the voice around the structure (§12).
- [ ] If a diagram was added: reduces ambiguity the prose didn't already
      remove; descriptive caption/alt-text (not "diagram") (§13).

## Pass 3 — Beta-read gate (first-reader)

Scope: prose for sequential reading (essay, post, memo, README narrative,
landing copy). Reference material → skim gate only. <~150 words → single
cold read, no feed. Fiction/poetry → transcript+recall only.
Not for: code review, fact-check, copyedit, rewrite (decline, point right).

Run: save draft to a file (Substack drafts: `get_draft` → `/tmp/<slug>.md`),
keep runs in `.first-reader/` next to the draft (gitignore it), cast
keen+skeptic from audience (reuse `.first-reader/audience.json`), skim gate,
timed feed with quit allowed, recall quiz vs intended gist, trust ledger,
then own full read. Deliver 3-6 plain sentences + page link. No fixes,
no rewrites. `ask <reader>` answers from logs only. `again` re-runs same
readers fresh after author revises. Hollow verdict (nothing survived recall,
everything portable) → offer interview for author's lived material, never
invent it (§17.1).

## 20. Public attribution (REQUIRED for published text)

Anything leaving the chat permanently (post, issue, comment, newsletter).
Private drafts/notes: no block. Published: prepend one-line blockquote at
the very top, before title, blank line after. Never "draft"/"rascunho".

EN: `> Posted on behalf of [@calionauta](https://github.com/calionauta) (AI-assisted preparation and publishing)`
PT: `> Publicado em nome de [@calionauta](https://github.com/calionauta) (preparação e publicação assistidas por IA)`
Other language: EN phrasing. Tight budget: `> On behalf of @calionauta (AI-assisted)`.
GitHub issues/comments on user's behalf carry the same block, in that language.

## Examples

Full worked pt-BR drafts (good vs bad, annotated per principle) live in
`references/examples.md` — read it before drafting in pt-BR.

**Input:** "escreve no meu estilo sobre agentes fazendo commit sozinhos"
**Output:** lowercase confessional draft via Pass 1+2 (+§20 block if publishing),
never the first draft, floors checked.

## Test Cases

### Should activate
- "escreve no meu estilo sobre X"
- "draft a post about agents committing without asking"
- "write a tweet in my voice"
- "revisa esse rascunho no meu estilo"

### Should NOT activate
- "is this AI slop?" without voice request (use `anti-ai-slop-writing` detect)
- "will readers finish this?" on a finished draft (use `first-reader`)
- "publish this draft to substack" mechanics (use `substack-publish`)
- "review this code" (not a writing task)

## Edge Cases

### External skills not installed / offline
Proceed self-sufficient: §15 summary + Pass 3 skipped. Tell user once
what was skipped and the install command.

### First-person + no facts in memory
STOP. Fire `ask_user_question` (2-4 focused, §7.2). Do not draft.
Thin honest beats rich fabricated (§17.1).

### Publishing requested without confirmation
Never `publish_draft` / post publicly without explicit confirmation (§17.5).
Drafts for publication live in the publishing skill, never in the vault.

### Voice conflict with external skill
This skill wins for voice (lowercase, hedges, fragments, zigzag);
external wins for generic hygiene (banned list). Note the call in one line.
