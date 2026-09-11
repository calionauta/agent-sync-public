# Worked examples pt-BR (moved from writing-style §19)

Read before drafting in pt-BR to anchor principles in concrete text.

## 19. Examples (worked pt-BR drafts)

Two drafts on the same theme, annotated. Read these before drafting in pt-BR
to anchor the principles in concrete text.

### 19.1 — good draft

> a primeira vez que um agente fez commit no meu repo sem eu pedir, travei
> por uns cinco minutos. não de raiva — mais de surpresa mesmo. o commit era
> trivial: uma correção num path que eu nem lembrava mais. mas o gesto me
> bateu. alguém (algo?) tinha estado olhando.
>
> andei uma semana achando que isso era um problema de tooling. não é. é um
> problema de confiança. o agente fez exatamente o que eu queria — só que eu
> não tinha pedido. e isso muda tudo.
>
> talvez o jeito seja começar pequeno. deixar o agente mexer só em rascunhos.
> ver se eu me acostumo. talvez eu nunca me acostume.

**Annotations — which principle each line carries:**

- *"travei por uns cinco minutos"* — §14.5 concrete sensory detail (specific
  duration, body response).
- *"não de raiva — mais de surpresa mesmo"* — §14.7 small contradiction
  (corrects itself mid-thought); §14.2 hedge ("mais de"); §14.6 admits
  emotional granularity.
- *"uma correção num path que eu nem lembrava mais"* — §14.5 concrete
  detail (specific type of change).
- *"mas o gesto me bateu"* — §3 subjunctive via understatement; §5 process
  verb (*bateu*, body).
- *"alguém (algo?) tinha estado olhando"* — §14.7 contradiction (parens
  correction); §14.1 process verb in time (*tinha estado olhando*, past
  continuous); §3 hypothetical via question mark.
- *"andei uma semana achando que"* — §14.1 process verb in time (*andei*,
  duration); §14.2 hedge via reporting past thinking.
- *"não é. é um problema de confiança"* — §3 short rebuttal, no absolute
  claim; §11 zigzag (concept: tooling, concept: trust).
- *"o agente fez exatamente o que eu queria — só que eu não tinha pedido"*
  — §14.7 contradiction (*exatamente o que eu queria* AND *eu não tinha
  pedido*).
- *"e isso muda tudo"* — borderline absolute; saved by surrounding hedges
  and the self-correcting landing.
- *"talvez o jeito seja começar pequeno"* — §3 + §14.2 hedge; §14.1 process
  verb (*começar*).
- *"deixar o agente mexer só em rascunhos"* — §5 process verb (*mexer*).
- *"ver se eu me acostumo"* — §3 hypothetical; §5 process verb; soft
  admission.
- *"talvez eu nunca me acostume"* — §3 closing hypothesis, not declaration.

**Floor checks (group A, pass 2):**

- §17.1 (no fabrication): PASS — every detail is plausible and consistent
  with a real experience; nothing invented that requires grounding.
- §17.2 (no code-switching): PASS — entirely in pt-BR.
- §17.3 (process verbs in time): PASS — *travei*, *andei*, *tinha estado
  olhando*, *começar*, *mexer*, *me acostumo*.
- §17.4 (admit uncertainty): PASS — *"mais de surpresa mesmo"*, *"alguém
  (algo?)"*, *"ver se eu me acostumo"*.
- §17.5 (no publishing without confirmation): N/A — text is a draft, not
  publication.

### 19.2 — bad draft

> I have an important realization to share about AI agents. The key insight:
> we need to fundamentally rethink how agents commit to our repos. It is not
> just a tooling problem — it is a trust problem.
>
> Let me be clear: this changes everything. We must establish clear
> boundaries. The agent must never commit without explicit permission.
>
> In conclusion, the path forward is to start small and build trust
> incrementally.

**Why this fails (annotation per principle):**

- **§1 lowercase**: FAIL — capitalized sentences, "I" uppercase, "Let me",
  "In conclusion".
- **§3 hypothetical tone**: FAIL — *"we must"*, *"must never"*, *"this
  changes everything"* are absolute statements.
- **§7.1 / §17.1 hard floor**: FAIL if translated to first-person pt-BR and
  applied as the user's own memory — *"I have a realization"*, *"I need to
  fundamentally rethink"* fabricate a position the user may not hold.
- **§9 decentered stance**: FAIL — *"we need to"*, *"we must establish"*,
  *"the path forward"* dictate behavior for others.
- **§10 anti-post**: FAIL — *"Let me be clear"* and *"In conclusion"* are
  throat-clearing and school-essay closer.
- **§15.1 connectors**: *"Let me be clear"*, *"In conclusion"*, *"The key
  insight"*.
- **§15.2 colon reveal**: *"The key insight: we need to fundamentally
  rethink..."*.
- **§15.4 code-switching**: the entire draft is in English while the user
  asked for pt-BR (or vice versa) — full language mismatch.
- **§15.6 throat-clearing**: *"Let me be clear"*.
- **§5 process verbs**: *"I have"*, *"this is"*, *"we must establish"* are
  all static labels, no movement in time.
- **§11 zigzag**: pure abstraction, no concrete scene.
- **§14.6 admit not knowing**: zero hedges, zero admission.
- **§6 no superlatives**: *"fundamentally"*, *"everything"* — extreme-toned
  words.

**Floor checks (group A, pass 2):**

- §17.1 (no fabrication): FAIL — *"I have an important realization"* and
  *"we need to fundamentally rethink"* are positions the user did not
  state. The LLM is fabricating a stance.
- §17.2 (no code-switching): FAIL — entire draft is English when pt-BR
  was requested (assuming the request was pt-BR).
- §17.3 (process verbs in time): FAIL — every clause is static.
- §17.4 (admit uncertainty): FAIL — zero hedges.
- §17.5 (no publishing without confirmation): POTENTIAL FAIL — the imperative
  *"the agent must never commit"* reads as a publication-worthy declaration
  without confirmation.

The bad draft is **"competent blog post voice"** — exactly what the skill
trains against. Compare to 19.1, which is confessional, hedged, concrete,
and process-verb-driven. Same theme; opposite voice.

