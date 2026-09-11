# Human-voice palette (moved from writing-style §14 detail)

Load when drafting confessional/newsletter/tweet rows, or when Pass 2 checklist B fails 3+ items.

## 14. Human voice — what to cultivate

The earlier sections (1-13) tell you what to **avoid** (superlatives, marketing,
absolute statements, parens/dashes). This section is the inverse: what to
**cultivate**. The skill right now reads as a list of "don'ts" — LLMs default
to a competent-but-flat voice ("voice of a corporate blog post"). The eight
techniques below are how to break that default and write like a person talking
to a friend about something they actually noticed.

These techniques scale with genre. In confessional text, push them hard. In
technical text (§12), use them to carry the voice around the structure; don't
let them fragment the technical clarity. In short text (tweets, captions),
they can be aggressive.

### 14.1 — process verbs in time

Static labels describe a state. Process verbs in time describe a movement.
The difference is whether the author is doing something or being something.

- weak: "esse padrão é importante", "a ferramenta é útil", "isso me incomodou"
- strong: "comecei a notar isso semana passada", "tentei por três dias antes
  de desistir", "voltei porque algo não fechava"

verbs that carry time: começar, tentar, hesitar, tropeçar, voltar, notar,
escorregar, divergir, apegar, largar, retomar, insistir, desistir,
reencontrar, atravessar, demorar, levar um tempo.

### 14.2 — dense hedges

§3 covers the macro tone (subjunctive/hypothetical). This is the in-sentence
version. Aim for roughly one hedge per three sentences in confessional prose.
Hedges are not weakness — they signal honesty, which is the whole point of
§2's confessional register.

- *talvez*, *parece que*, *não sei se*, *pode ser que*, *me dá a impressão*,
  *acabo achando*, *suspeito que*, *boto fé que* (pt-BR)
- hedges that are also movement: *"ando reparando que..."*, *"venho notando
  que..."*, *"tô começando a achar que..."*

what hedges do *not* mean: that the text is uncertain. a confident paragraph
about an uncertain topic can still have hedges on every sentence. they are
rhythm, not epistemology.

### 14.3 — mid-sentence self-correction

Real people change direction mid-thought. LLMs deliver clean, optimized
sentences. The result reads as confident — and therefore inhuman. Insert
small course-corrections where they fit naturally:

- *"ou melhor, ..."*, *"não, espera, ..."*, *"quer dizer, ..."*, *"aliás, ..."*,
  *"enfim, ..."*, *"na real, ..."*, *"ou seja, ..."*

use sparingly — two or three per piece. too many reads as scattered
thinking. too few reads as over-edited.

### 14.4 — sentence fragments between full sentences

§4 says "no word-fragments" because the rhythmic default was a staccato of
two-word bursts ("bom. ruim. interessante."). That is not what we want.
What we want is **occasional one-word or short-fragment sentences** punctuating
longer flow, used for emphasis or pause — like this:

> "tentei o approach por dois dias. não funcionou. voltei e percebi que o
> problema era outro."

> "isso me lembra uma coisa. esquece, irrelevante."

the fragments earn their place when they land a beat the full sentence would
have buried. never chain three in a row. never use them as bullets disguised
as prose.

### 14.5 — concrete sensory detail

Abstraction is where writing goes to die. Replace labels with what the
sensory world actually contained:

- *"o sistema é lento"* → *"demora uns três segundos e durante esse tempo o
  led do roteador pisca duas vezes"*
- *"o editor trava"* → *"o cursor congela por meio segundo antes do caractere
  aparecer"*
- *"trabalhei nisso a noite toda"* → *"trabalhei até as quatro, com a janela
  aberta, e o calor não baixava"*

names, numbers, dates, mechanisms, materials, sounds, colors, smells. these
are the bones of voice. without them, the text floats.

### 14.6 — admitting not knowing

LLMs default to confident assertion. People default to doubting in voice. The
shift is small but huge:

- *"não sei se isso é..."*, *"posso estar viajando mas..."*, *"alguém me
  corrija se eu tiver errado"*, *"tô lendo errado ou..."*, *"me explique se
  for o caso"*

admitting not knowing is not failure. it is one of the strongest signals
of honesty in writing. §9 (decentered stance) and §3 (subjunctive) both
support this; this is the in-sentence version.

### 14.7 — small internal contradictions

LLMs resolve contradictions in their own text. People live with them.

- *"achei X bom mas ao mesmo tempo Y me incomodou"*
- *"quero parar de usar isso, mas toda vez que preciso dele ele aparece
  na hora certa"*
- *"sei que não é o argumento forte, mas me incomoda mesmo assim"*

contradictions are not sloppiness. they are the texture of someone who is
thinking in real time. one or two per piece.

### 14.8 — light humor and self-deprecation

The skill is confessional and essayistic. That does not forbid humor. Two
forms work:

- **self-deprecation**: *"fiz isso de novo. ok, talvez eu esteja obcecado."*
- **absurdo quotidiano**: *"o café esfriou três vezes enquanto eu escrevia
  isso. não é metáfora."*

avoid: sarcasm aimed at the reader, jokes about third parties, anything that
would not survive a re-read in three years. humor here is warmth, not
performance.

### 14.9 — the physical-world test

Any phrase that cannot be replaced by a concrete description of what
physically happens is **filler**. Ask: *"what is the physical correspondent
of this phrase?"*

- *o agente executa e volta* — what does "volta" mean physically? does it
  exit? return a value? overwrite a file? the phrase passes the test but is
  vague. substitute: **"o agente executa e o processo termina sem gravar
  checkpoint"**.
- *o sistema é lento* — what is slow? substitute: **"o sistema demora
  três segundos e durante esse tempo o led do roteador pisca duas vezes"**.
- *isso mudou minha forma de pensar* — what did you do differently after?
  if you cannot answer, the phrase is decorative. substitute: **"depois
  disso, parei de usar o terminal direto e comecei a ler os logs"**.

The test catches filler in any register:
- **technical prose**: *"the system handles X gracefully"* → *what does
  "handle" mean? which files does it write, which signals does it emit, what
  is the failure mode?*
- **confessional prose**: *"i realized that"* → *what did you do differently
  after the realization?*
- **comparison prose**: *"Y offers superior performance"* → *measured how,
  by whom, under what conditions?*

The rule is not "never use abstract language." It is: **never let an abstract
phrase survive without a concrete anchor nearby.** The abstract can float if
it has a scene to return to. Without the anchor, it is just a sentence that
sounds like it means something.

