# AGENTS.md

## Universal Instructions

**⚡ Session Tree & Fork Awareness:** Pi stores sessions as trees. Use `/tree` to navigate branches, `/fork` to create new sessions, `/clone` to duplicate. These are interactive TUI commands — you cannot execute them yourself. For CLI branching: `pi --fork <session-file>`.

---

## Code Navigation

**Orient first — ripwire.** For an unfamiliar repo or task, run `ripwire . --for="<task>"` before reading: one ranked bundle of relevant symbols, callers, blast radius, and tests to run (`--situ` after a diff). Then drill in with the tools below. ripwire is a system binary (`~/.local/bin/ripwire`), not a pi extension — call it via bash.

**Tool ladder** (priority order; pi-cymbal auto-nudges, no manual invocation needed):
1. **cymbal** (`cymbal_*`) — symbol refs, impact, call graph. Prefer over Read/Grep/Glob/Bash for code navigation.
2. **fff** (`fffind`/`ffgrep`) — lexical text/file search only.
3. **ast-grep** (`ast_grep_*`) — structural pattern search and rewrite (see below).
4. **raw `find`/`grep`** — never; use fff.

**Prefer `sem diff` over `git diff`** for entity-level change detection (functions, types, methods). `git diff` shows raw lines; `sem diff` shows meaningful symbols. If `sem` is unavailable, fall back to `git diff` — never block on its absence.

Full command references, batching, and workflows live in the **`cali-code-navigation`** skill — load it explicitly when navigating code (not auto-loaded).

### ast-grep (structural search + rewrite)

| Tool | Layer | Answers |
|------|-------|---------|
| `fff` (pi-fff) | **Lexical** | "Where does this **text** appear?" — fuzzy file find, SIMD grep, frecency |
| `ast-grep` | **Structural** | "Where does this **code pattern** appear?" — AST pattern match, language-aware |
| `cymbal` | **Graph/Semantic** | "Who calls this **symbol**?" — references, impact, call graph |

1. **Text/filename** → `fffind` / `ffgrep` (fff)
2. **Code shape/pattern** → `ast-grep` (structural)
3. **Symbol refs/impact** → `cymbal` (graph)

**Cross-file refactors that change signatures/structure → `ast-grep` rewrite (`-r`)**, never grep+sed (AST-safe; never matches inside strings/comments): `sg -p 'func $F($$$) error' -r 'func $F(ctx context.Context, $$$) error' --rewrite`. Localized edits (1-2 files, function bodies) → normal edit/write. `sg scan` for custom structural lint rules (`golangci-lint` still the default for Go).

---

## Skills Reference

| When | Skill |
|------|-------|
| Code navigation — ripwire (orient), cymbal, fff, ast-grep, sem diff | `cali-code-navigation` |
| Cross-cutting debug (framework JS API, binary freshness) | `cali-cross-cutting-debug` |
| Go standards (idiomatic Go, concurrency, linting) | `/skill:cali-coding-go-standards` |
| Go stack (Datastar, Templ, NATS, Air) | `/skill:cali-coding-go-stack` |
| Package audit (socket.dev, Trivy, OSV-Scanner, dotenvx) | `/skill:cali-ops-package-audit` |
| Releases | `/skill:cali-ops-github-releases` |
| Deploy (GitHub Actions + Tailscale OIDC) | `/skill:cali-ops-deploy-github-tailscale` |
| Security audit / hardening | `/skill:cali-ops-server-security` |
| AGENTS.md create/update/validate | `/skill:cali-agents-md-generator` |
| AGENTS.md validate | `/skill:cali-agents-md-validator` |
| Parallel work | `/skill:pi-subagents` |
| Writing for publication (posts, public text — confirm first, on-behalf attribution) | `writing-style` |

### Skill Prefix Convention
- `cali-coding-*` — práticas/padrões de escrita de código (standards, go-stack, starhtml)
- `cali-code-*` — ferramentas de análise de código existente (navigation)
- `cali-cross-cutting-*` — regras transversais (debug)
- `cali-ops-*` — operações (deploy, security, package-audit)

### Project-Level AGENTS.md

Every project **must** have a lean `AGENTS.md` (20-30 lines max, no placeholders). See `cali-agents-md-generator` for create/update/validate workflow, pre-commit hook setup, and CI guard.

Update AGENTS.md when:
- Entry point / cmd moved (e.g. `cmd/web/` → `cmd/server/`)
- New top-level package or `features/` module added/removed/renamed
- Build/test/lint command changed
- Framework swap (e.g. Templ → html/template, Datastar → HTMX, NATS → in-process)
- Database / schema migration system changed
- New convention enforced (e.g. `errors.New` → `fmt.Errorf`)

**Human must approve all AGENTS.md changes** — never auto-update.

Cosmetic changes (CSS, copy, refactors inside functions, dependency bumps, test cases) do NOT require an update.

---

## Conventions

### Language
All code, URLs, routes, handler IDs: **English**. Exception: user-facing UI text, LLM prompts, database content.

### File Naming
All project files: `lowercase-kebab-case`.

### Estimation Bias Correction
LLMs are trained on human data that **systematically overestimates implementation time** (Hofstadter's Law). This creates a bias toward choosing "simpler" but worse solutions to avoid perceived complexity.

**Rule:** Never let estimated implementation cost outweigh solution quality. A correct, maintainable, well-structured solution that takes longer is preferable to a quick hack. Push back against your own instinct to choose "cheap" approaches. Quality first — if a pattern is architecturally correct (SSE over polling, proper schema over flat storage, real auth over stub), implement it properly regardless of estimated effort.

### Post-Execution Verification

### Releases & Changelog
Tag + GitHub Release go together — never tag-only. `CHANGELOG.md` (Keep a Changelog format) is the canonical source for release notes; generate `gh release` notes FROM the changelog, not in parallel. Use [`/skill:cali-ops-github-releases`](/skill:cali-ops-github-releases) for the full workflow.

---

## Don'ts

- Never add dependencies without asking
- Never put secrets in AGENTS.md
- Never modify vendor/ without asking
- Never use Axios — use native `fetch`

---

## Installed Stack

Source of truth: `~/.pi/agent/settings.json` → `packages[]` (the pi extension
list). The portable, sanitized mirror lives in the server-blueprint repo at
`stack/pi/settings.json` + `stack/pi/package.json` — keep the repo in sync via
`sync-config.sh`; never hand-edit the extension list in this file.

**Memory stack (agent memory is Engram):**
- `pi-vcc` — algorithmic compactor (no LLM call); tool `vcc_recall` recalls the
  session before compaction. Config: `~/.pi/agent/pi-vcc-config.json`.
- `condensed-milk-pi` — stabilizes prompt cache (masks stale tool results).
- `pi-cache-optimizer` — KV cache hit-rate optimizer.
- `pi-tasks` — persistent task list (TaskCreate/TaskList).
- `pi-supervisor` — conversation supervisor (start_supervision).
- **Engram** — agent memory via plugin `gentle-engram` (hooks + tools nativos
  `mem_*`). Store canônico no server.calionauta.com: `ENGRAM_URL=http://100.120.175.47:7438`
  (Tailscale serve, em ~/.zshenv). NÃO existe agentmemory/extensão HTTP :3111.
  Fallback interativo: bifrost MCP → `executeToolCode` → `engram.mem_*`.

  Hooks automáticos: recall injetado a cada prompt (`before_agent_start`),
  captura passiva (`tool_execution_end`), recovery pós-compactação.
  O modelo ainda deve chamar `mem_save` após bugfixes/decisões/descobertas
  e `mem_session_summary` antes de encerrar sessão. NEVER store secrets.

---
## Secrets Management — server.calionauta.com convention

When working with the `server.calionauta.com` server (Tailscale `100.120.175.47`, user `deploy`), follow the **3-layer model**:

| Layer | Storage | Read by |
|--------|---------|---------|
| **L1 — runtime** | env vars in container | container only |
| **L2 — rest** | `~/.secrets/<service>.env` chmod 600 | owner `deploy` |
| **L3 — provider** | Cloudflare / Minimax / Telegram dashboard | rotated, IP-scoped |

### Where secrets live

- **Server side**: `/home/deploy/.secrets/` (chmod 700) containing `<service>.env` files (chmod 600).
- **Client side**: connect via the Tailscale alias in `~/.ssh/config` as the deploy user (e.g. `deploy@server.calionauta.com`).
- **Memória**: **Engram** (SQLite `~/.engram/engram.db`, daemon :7437; no server e local). Guarda fatos não-sensíveis (paths, containers, scripts). NEVER store actual secrets.

### How to use them

For tasks on the server, use `~/bin/` scripts that already follow this convention:

- `~/bin/cloudflare-dns.sh list|add|delete|get`
- `~/bin/update-tunnel.sh [config-file]`
- `~/bin/setup-cf-token.sh` (initial setup)

Each script does `set -a; source ~/.secrets/<service>.env; set +a` then makes the API call. Don't write new scripts that hardcode tokens.

### When Claude (me) needs a token

The user pastes it **once** into `~/.secrets/<service>.env` via `setup-cf-token.sh` (token sent via stdin, not argv). The script stores it chmod 600 in `~/.secrets/`. Claude reads via scripts that `source` the file. Claude does NOT request tokens via chat or write them into scripts.

### Boundaries

- `~/.secrets/` does NOT protect against a compromised agent that already has shell access. For agent containment (network-layer policy), consider OneCLI / Vault when scope grows (3+ servers OR 50+ secrets OR compliance audit needed).
- Nango is for SaaS OAuth flows (user-as-tenant), not system-to-system agent calls.
- For git-tracked secrets, use Age + SOPS. For local at-rest, `~/.secrets/` + chmod 600 is enough (with disk encryption assumed).
- Files at `/etc/cloudflared/`, `/opt/ingress/`, `/etc/caddy/` are root-only — Claude cannot edit directly. Surface the exact edit needed for the user to apply manually.

### SSH tunnel for web UIs

For services that bind to `127.0.0.1` on the server (e.g. a web dashboard), use:

```
ssh -L <PORT>:127.0.0.1:<PORT> deploy@server.calionauta.com
```

Then access `http://localhost:<PORT>` from the Mac. Foreground mode matters — `network_mode: host` is required for services binding `127.0.0.1` inside Docker containers.

---

## No AI attribution in user-facing artifacts

Claude (or any AI assistant) does NOT co-author anything. The user
writes every commit, release note, pull request description, blog
post, and public message. Some projects' tools and community
conventions append `Co-Authored-By: <model> <noreply@anthropic.com>`
to commit messages and release bodies — that's an artifact of the
assistant that helped draft the content, not a real co-author.

**Rules:**

- **Never** add `Co-Authored-By: Claude ...` or any AI model trailer
  to a commit message, PR description, release notes, blog post, or
  CHANGELOG entry. Adding the trailer falsely attributes authorship to
  the model, and the model did no end-to-end work the user did not
  direct and approve.
- **Never** add an explicit "Co-Authored-By: <user>" trailer to a
  release note for the same reason — they are meta-commentary, not
  part of the artifact.
- When asked to draft commit messages, release bodies, or any other
  public text, end the file at the last meaningful sentence. Do not
  append attribution lines.
- If a tooling pipeline (e.g. `gh release create`, an editor
  plugin, a git hook) auto-appends AI attribution by default,
  disable that behavior for the project. The Project AGENTS.md should
  spell out the rule for any future session that touches the repo.

**Why this matters:** the trailer spreads AI crediting into commit
history and release pages where every reader sees it. It implies the
user shared authorship with a tool that has no standing to claim it.
For personal repos where Claude briefly helped, the trailer is
mildly absurd; for any organization where multiple contributors
share the history, it's actively misleading.
