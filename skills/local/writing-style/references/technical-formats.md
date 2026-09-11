# Technical formats (moved from writing-style §12+§13)

Load when context row is technical / comparison-review, or when prose alone would overload.

## 12. Format adaptations for technical content

When the text is about **tools, comparisons, workflows, or processes**, the
prose rules above still govern voice — but the **structure** inside the prose
can adapt where it serves clarity. Use this section only when the content is
genuinely technical (reviewing a tool, comparing options, documenting a
workflow). For personal essays, the zigzag prose from section 11 stands alone.

### 12.1 — when prose is enough

- The point is a single reflection, a feeling, or one observation.
- The reader doesn't need to track more than 3 distinct items.
- The argument lands harder in continuous voice.

### 12.2 — when to reach for structure

| format | use when | don't use when |
|--------|----------|---------------|
| **bullets** | listing criteria, options, "what changed", observations to scan | the items form an argument that needs connective tissue |
| **numbered steps** | order of operations matters (workflows, installations, troubleshooting) | the sequence is incidental |
| **comparison table** | comparing 2-3 things on the same axes (price, latency, "best for X") | the comparison is between qualities, not facts |
| **code block** | any code shown — always with language identifier on the opener (` ```python `) | quoting prose |
| **mermaid diagram** | see section 13 | the diagram would only restate prose or a table |

### 12.3 — rules for the structural elements

- **prose carries the voice.** the intros, transitions, reflections, and
  landing stay in zigzag. structure sits *inside* the prose, not in place of it.
- **bullets need connective tissue.** a bullet list followed by zero commentary
  reads like a changelog, not a piece. open with a sentence that earns the
  list, close with one that lands.
- **tables need 4-5 columns max.** past five, switch to bullets per item.
- **numbered steps assume linearity.** if the reader will skip around, use
  headings instead.
- **code blocks carry the smallest sample that conveys the idea.** trim setup
  that is not the point. pair input with output when relevant.

## 13. Diagrams (when and how)

### 13.1 — when a diagram earns its place

Use a diagram only when **at least one** of the following holds:
- the reader must hold more than 3 relationships in their head at once,
- the order of steps matters and the steps span multiple components,
- a boundary or interface is the actual point of the section.

### 13.2 — when NOT to use a diagram

- the surrounding text is already clear,
- the diagram would have one or two nodes,
- the diagram only restates a nearby table,
- it's decoration for visual variety (a "diagram-shaped" png that adds no
  information),
- the diagram would mirror content that changes often and you'd have to
  maintain it manually (screenshots of UI, current architecture).

### 13.3 — how to produce one

- **mermaid** (mermaid.js.org) is the simplest free option. Write the syntax
  inline in a fenced ` ```mermaid ` block. No signup, no export step.
- **for export as image** (posts, newsletter, tweets): paste the mermaid code at
  **mermaid.live**, render, download PNG/SVG, embed. Free, anonymous.
- **for long-lived docs** (wiki, vault, github README): keep the mermaid as a
  code block, not a PNG. The diagram stays editable and survives alongside the
  prose.
- **pick one tool and stick with it.** mixing styles in the same document
  distracts.

### 13.4 — accessibility

- **always** write a descriptive caption or alt-text. Screen readers can't
  parse the image. "OAuth 2.0 authorization flow: client requests
  authorization, user authenticates, server returns token, client accesses the
  protected resource" beats "diagram."
- if the diagram replaces prose that was already clear, prefer the prose and
  drop the diagram.

