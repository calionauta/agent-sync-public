---
name: stelow-product-testing-ai-code
description: >
  [stelow] AI-aware testing strategy skill for software products.
  Generates AI-aware testing plans, security gates, and risk-based coverage targets.
  Activated automatically when product_type is "software" or "hybrid"; usable standalone.
  Based on empirical research: AgentAssay (2026), MSR 2026, Veracode 2025, CodeRabbit 2025,
  LLM4TDD (2023), TDD-with-AI-Agents (2026).
metadata:
  frequency: monthly
  category: code
  context-cost: medium
  author: calionauta
  author-url: https://github.com/calionauta
---

# AI-Aware Testing Strategy

> **Based on empirical research:**
> - AgentAssay (2026): Non-deterministic agent testing framework
> - MSR 2026: Over-mocking anti-patterns in AI-generated tests
> - Veracode 2025: 45% of AI code contains vulnerabilities
> - CodeRabbit 2025: AI code has 1.7x more bugs than human code
> - CoderEval (2023): 43.1% of AI code is less robust
> - SWE-Mutation, ACL Findings 2026: LLM suites are superficial; semantic mutants drop detection 71% → 40%
> - VibeCheck, Sep 2026: execution-adequacy gap — runnable tests lack strong assertions and edge coverage
> - Hamidi et al., Sep 2026: oracles fail on the faults that matter; assertions need manual reasoning
> - TDAD 2026: graph test-context beats procedural TDD instructions (−70% regressions); concise skills win
> - TDFlow, EACL 2026: human-written tests 94.3% vs self-generated 68% — test authorship is the hurdle

**Standalone awareness:** when inside stelow, triggered automatically by `product_type` in spec-product frontmatter. When standalone, invoke directly with a spec-product path (`spec-product*.md`). Appetite defaults to Core if not found — documented in output. All test-breadth tables and quality baselines work identically in both modes.

## Activation

- **Trigger:** `product_type: software` or `product_type: hybrid` in spec-product frontmatter
- **Phase:** Phase 11 (Tech Planning)
- **Prerequisite:** approved spec-product with scope defined

### Step 2: Read Appetite and Product Context

Read `appetite` from the spec-product file (`spec-product*.md`) before generating test scopes. **When running standalone, appetite defaults to `Core`** if not found in frontmatter — the skill documents this assumption in the output.

Appetite controls **test breadth**, not quality baseline.

| Appetite | Test breadth |
|----------|-------------|
| `Lean` | Behavior/E2E (1 happy path) + smoke tests + critical-path unit tests. Add integration only when an external seam is in scope. |
| `Core` | Behavior/E2E (happy path + variations) + unit tests for main logic + integration tests for DB/API/external seams. |
| `Complete` | Behavior/E2E (full coverage + edge cases) + unit + integration + security tests/scans. |

**Quality baseline applies to every appetite:** build/test/lint/typecheck always run when available, and a11y checks run whenever UI files exist. Appetite changes exploration breadth, not whether quality gates exist.

Then determine the product context:

**Before generating testing strategy, determine the product context:**

| Context | Description | Testing Approach |
|---------|-------------|-----------------|
| **Greenfield** | New product, no existing code | TDD-first, appetite-specific coverage targets, clean slate |
| **Brownfield** | Existing product with features | TDD for critical paths, test-after for existing code, regression focus |
| **Hybrid** | Adding features to existing product | Separate new from existing, protect invariants |

**Based on context from setup or the spec-product file:**
- `greenfield`: TDD recommendation, appetite-specific coverage targets
- `brownfield`: TDD for critical paths only, test-after + regression for existing code
- `hybrid`: Add `test-regression` scopes for existing functionality

## Input Detection (Standalone Mode)

When called **outside the workflow** with no pre-existing spec-product file:

```
Input:
  ├── User provided a spec-product*.md path?
  │   └→ Read product_type, appetite, scope from frontmatter
  ├── User provided a description of the project?
  │   └→ Extract: language, product type, risk level
  └── No structured input?
      └→ Default: product_type=software, appetite=Core, context=brownfield
```

**Graceful degradation:** The skill works standalone. If `product_type` or `appetite` cannot be determined from frontmatter, sensible defaults are used (`product_type=software`, `appetite=Core`, `context=brownfield`). Every step documents its assumptions and flags them in the output.

## Input

From Tech Planning context (or standalone):
- `spec-product*.md` (frontmatter with product_type, appetite)
- `spec-tech.md` (scopes to add test-* types, if available)
- Tech stack detection from project files

## Output

| Artifact | Path |
|----------|------|
| `testing-strategy.md` | `.stelow/{date}/{_dir}/plans/` |

---

## Process

### Step 1: Detect Tech Stack

Auto-detect testing frameworks from project files:

| Language | Detection File | Unit Framework | Coverage Tool | Security Tool |
|----------|--------------|---------------|--------------|---------------|
| Python | `requirements.txt`, `pyproject.toml` | pytest | pytest-cov | Bandit |
| JavaScript/TypeScript | `package.json` | Vitest, Jest | c8 / V8 coverage | ESLint + SAST |
| Go | `go.mod` | testing | `go test -cover` | Gosec |
| Rust | `Cargo.toml` | cargo test | cargo-tarpaulin | cargo-audit |
| Java | `pom.xml`, `build.gradle` | JUnit | JaCoCo | SpotBugs |

### Step 3: Classify Scope Risk

Based on spec-tech.md scopes:

| Risk Level | Examples | Testing Depth |
|------------|----------|----------------|
| **Critical** | Payment, auth, data persistence, security | High coverage + negative cases + security gates |
| **Standard** | CRUD, UI, API endpoints | Core paths + obvious edge cases |
| **Experimental** | Prototypes, new features | Smoke tests + regression hooks |

### Step 4: Generate Appetite-Specific Test Targets

From research: coverage alone is insufficient. A test suite can execute every line but still miss behavioral bugs, security gaps, and non-deterministic agent failures. Appetite selects breadth; risk selects which paths inside that breadth are mandatory.

| Appetite | Path Type | Testing Depth |
|-----------|-----------|-------------|
| `Lean` | Critical path | E2E/behavior (1 happy path) + smoke + unit for the one negative case |
| `Lean` | Standard/experimental | E2E/behavior (1 happy path); no broad integration suite |
| `Core` | Critical path | E2E/behavior + unit tests + negative cases + integration seams |
| `Core` | Standard features | E2E/behavior (key variations) + unit tests + integration for external seams |
| `Complete` | Critical path | E2E/behavior (full) + unit + integration + security gates |
| `Complete` | Complex flows | E2E/behavior for multi-step UI or agent workflows |


### Step 5: Define Test Scope Types

For each IN scope in the spec-product, add corresponding test scopes. Appetite controls breadth:

Scope tables live in `references/test-scope-types.md` — read the appetite-selected table (plus the Greenfield/Hybrid context tables when they apply) before generating test scopes.


Based on MSR 2026 research (agents use mocks 36% vs 26% humans):

**Anti-patterns to flag:**
- ❌ Mock count > 3 per test
- ❌ Mocks for simple objects (use real objects instead)
- ❌ 100% coverage target (coverage ≠ test quality)
- ❌ Snapshot tests for non-UI components
- ❌ Single-run validation (agents are non-deterministic)
- ❌ Same AI for both code AND test generation (circular validation)
- ❌ Presence tests — assertions that source text exists (grep/regex over code, string-presence checks). They pass on broken logic and break on refactors. Allowed only when they constrain topology, counts, or refusal shapes (spawn-site counts, terminal guards), with the caught regression named. (Evidence: 79 presence assertions deleted from one contract file, zero behavior change.)
- ❌ Assertion Roulette — many assertions per test with no single behavior under test (AI tests show higher assertion density than human tests, MSR 2026). One behavior per test; a failure must name its cause.
- ❌ Unreasoned oracles — assertions that execute code without capturing faulty behavior. LLM faults that matter are missed because oracles don't assert the failure mode (Hamidi et al., Sep 2026). Every assertion must answer: "which wrong behavior would make this fail?"

### Step 6: Evaluate Mutation Testing Fit

Mutation testing evaluates whether a test suite would **notice a regression** — not just whether it executed a line. Research shows LLM-generated tests cluster around the same blind spots as the code they test (Test Homogenization Trap, AgentPatterns 2026). Mutation forces tests to prove they'd catch a defect.

**Scope caveat (2026 replication findings):** mutation and coverage signals work in *regression* settings — code-under-test reasonably assumed bug-free, catching future breakage. When the code-under-test may already be buggy (including same-turn AI code+tests), they stop being reliable indicators. Same-turn tests therefore need independent authorship (fresh agent or human oracle review, cf. TDFlow: human-written tests 94.3% vs self-generated 68%, EACL 2026), not higher mutation targets.

**Hand-mutation (lightweight alternative when tooling doesn't fit):** invert or remove the guarded behavior by hand; the test must fail. A test that stays green on broken code is rejected. No tooling, no CI minutes — same verdict as a mutant run for one invariant. (SWE-Mutation, ACL 2026: LLM suites tend to be superficial; agentic semantic mutants drop detection 71% → 40%.)

**Decision flow (cheapest verdict first — adequacy is not the goal):**

1. **Hand-mutation per critical invariant** (free, immediate) — invert or remove the guarded behavior; the test must fail. Stop here when every critical invariant is covered.
2. **Extreme mutation** (pseudo-tested methods) once the suite is mature and CI budget exists — minutes instead of hours, and findings map directly to weak tests. This is the ceiling for most projects: beyond it, cost exceeds signal.

Full mutation tooling (Stryker, mutmut, PIT, go-mutate) is **not recommended by default**: it only marginally outperforms coverage on real faults while oracles remain the bottleneck (Hamidi et al., Sep 2026), triage costs ~4.6 min per mutant with ~33% unproductive (Just et al.), and adequacy is neither practical nor desirable. Consider it only for safety-critical or regulated code with an already-mature suite — nightly, scoped to the regulated modules, no score targets.

Rationale: fix the weak-test signal, then stop — don't chase scores.

**Validated loop** (AgentPatterns 2026, MUTGEN 2025) — works with any survivor source (hand-mutants, extreme survivors, or tool mutants where tooling is justified):
```
1. Generate tests (AI)
2. Run mutation tool
3. Feed surviving mutants into prompt
4. Generate additional tests targeting survivors
5. Repeat (plateau ~4 iterations)
```

**Anti-patterns for mutation testing with AI code:**
- ❌ Same model that wrote code generates tests AND judges equivalent mutants (circular bias)
- ❌ Full-suite mutation as per-PR gate (hours of CI, Zenseact 2023)
- ❌ Any score target as a goal — no minimum is owed (not 50%, not 70%); stop when the weak-test signal is exhausted
- ❌ No equivalent-mutant filter (>50% survival = noise, Facebook 2020)
- ❌ Chasing 100% mutation score (adequacy is not the goal — kill the weak-test signal, then stop)

### Step 7: Create CI/CD Gates

```yaml
GATES:
  critical_path_coverage:
    condition: "missing required tests"
    action: BLOCK
    rationale: "Critical paths need executable regression checks"
  
  security_findings:
    condition: "> 0 on critical paths"
    action: BLOCK
    rationale: "45% of AI code contains vulnerabilities (Veracode 2025)"
  
  flaky_rate:
    condition: "> 5%"
    action: WARN
    rationale: "Agents generate non-deterministic tests"
```

---

## TDD Guidance (Research-Based)

**Empirical findings on TDD with AI agents:**

| Research | Key Finding |
|----------|-------------|
| LLM4TDD (2023) | Including test cases alongside problem statements **enhances code generation** and **increases success rate** on benchmarks like MBPP and HumanEval |
| TDD-with-AI-Agents (2026) | Reports large gains in AI workflows — treat as optimistic: independent meta-analyses find small quality effects and ~zero productivity effect; gains concentrate where test effort and behavioral assertions are high |
| AgentPatterns.ai | Tests as specifications constrain AI behavior — but only when red-proofed: suites never observed failing are faked routinely (SWE-Mutation, ACL 2026) |
| QASkills (2026) | Without TDD, AI agents write tests that validate their own broken logic |
| TDAD (2026) | Procedural TDD instructions without test context *increased* regressions (6.08% → 9.94%); graph test-context cut them 70% — context beats ritual |
| James et al. / Fucci family | No consistent TDD advantage over iterative test-last; short steady cycles and small tasks explain most gains — rhythm matters more than test order |

### When to Use TDD (Based on Research)

| Code Type | TDD Recommended? | Rationale |
|-----------|-----------------|-----------|
| **Critical business logic** | ✅ **Yes — with red-proof + fresh oracle** | TDD constrains AI output only when the test is observed failing first and assertions capture failure modes; otherwise it is expensive test-last |
| **Security-sensitive** | ⚠️ **TDD + automated gates** | Write tests first, then run SAST continuously (45% vulnerability rate) |
| **I/O-, UI-, framework-coupled code** | ⚠️ **Characterization first** | TDD pays most in pure/deterministic domains; at seams prefer characterization + integration over strict test-first |
| **External APIs** | ❌ No — test-after | Over-mocking is anti-pattern; use real dependencies |
| **Agent workflows** | ❌ No — behavioral testing | Non-deterministic — needs multi-run validation |
| **Standard features** | ⚠️ **Optional** | Use TDD for clarity; risk-based tests for standard paths |

### Brownfield Testing (Existing Products)

**When evolving an existing product (research-based):**

| Aspect | Strategy | Rationale |
|--------|----------|----------|
| **Existing tests** | Adapt, don't replace | High coverage = regression focus; Low coverage = characterization tests |
| **New features** | TDD for critical, test-after for standard | Protect existing, innovate safely |
| **Existing invariants** | Regression + simulation/replay testing | AI agents can break invariants without detection |
| **Technical debt** | Risk-aware testing targets | Higher depth for risky areas |

---


Brownfield procedures (`test-regression`, `test-characterization`, `test-simulation`, `test-impact`) live in `references/brownfield-recipes.md` — read the procedure matching the context before generating. Greenfield/Hybrid context tables live in `references/test-scope-types.md`.


---


### TDD Cycle for AI Agents

```
1. RED: Write failing test (human or AI with explicit constraints)
2. RED-PROOF: Demonstrate the test failing without the implementation
   (stash the fix, run pre-fix, or hand-mutate). A test never observed
   failing is untrusted — reject it.
3. GREEN: AI implements only enough to pass test
4. REFACTOR: Clean up with tests still passing

Key difference from human TDD:
- AI must see failing test BEFORE implementation
- Tests must be written independently of implementation
- Human validates test quality via critical-path coverage and negative cases
- Test-first reasoning improves both code and test effectiveness when the
  tests are executable before implementation (TDD-Agent, Aug 2026); generated
  tests that never fail pre-fix are static validators of unknown value
```

---

## Risk-Based Test Feedback Loop

Use this loop when tests miss important behavior or regressions appear after AI changes:

```
1. Identify the missed behavior or regression
2. Add a focused test that captures the invariant
3. Rerun the affected test suite
4. Feed the invariant back into future test scopes
```

**Test quality signals (VibeCheck 5-dim rubric, Sep 2026):**
- Runnability — deterministic, isolated, no order dependence
- Assertion strength — each assertion captures a failure mode (see oracle rule above)
- Edge-case coverage — negative cases on critical paths
- Isolation/determinism — no shared mutable state, no wall-clock dependence
- Maintainability — one behavior per test; production code never in test files and vice versa

---

## Output Format

### testing-strategy.md

```markdown
---
version: 1
product_type: software
generated_by: stelow-product-testing-ai-code
generated_at: {YYYY-MM-DD}
---

# Testing Strategy for {product_name}

## Tech Stack
- Language: {language}
- Unit: {framework}
- Coverage: {tool}
- Security: {tool}

## Coverage and Risk Targets
| Path Type | Required Evidence |
|-----------|-------------------|
| Critical | Branch coverage, negative cases, security gates |
| Standard | Core paths and obvious edge cases |
| Experimental | Smoke tests and regression hooks |

## Test Scopes
| Scope | Type | Required Evidence |
|-------|------|----------------|
| {feature-name} | test-unit | Critical path + negative cases |
| {feature-name} | test-integration | External seams covered |
| {feature-name} | test-security | SAST clean on critical paths |

## CI/CD Gates
- BLOCK: missing required critical-path tests
- BLOCK: security_findings > 0 on critical paths
- WARN: flaky_rate > 5%

## Anti-Patterns
- ❌ > 3 mocks per test
- ❌ Mocks for simple objects
- ❌ 100% coverage target
- ❌ Same AI for code AND tests
- ❌ Presence tests (source-text existence without behavioral consequence)
- ❌ Unreasoned oracles (assertions that don't capture a failure mode)
- ❌ Suite growth without pruning — more tests ≠ better (TENET 2026: small targeted sets outperform large suites); each added test justifies its signal, dead tests are deleted
```

---

## Examples

### Example 1: Strategy for a critical scope

**Input:** "Payment retry scope, appetite Core, Go stack."

**Steps:**
1. Read appetite (Core) and classify the scope (critical).
2. Emit `test-unit` (happy path + negative cases, TDD), `test-integration` (payment seam, test-after), `test-security` (SAST gate).

**Output:** testing-strategy.md rows for the scope, plus BLOCK gates on missing critical tests and security findings.

### Example 2: Rejecting a presence test

**Input:** "Add a test that the export command exists."

**Steps:**
1. Apply the presence-test rule: does it constrain topology, counts, or refusals?
2. No — rewrite as behavior: hand-mutate the export output and require the test to fail.

**Output:** A behavioral test naming its regression, or no test when none exists.

---

## Success Criteria

- [ ] testing-strategy.md generated
- [ ] test-* scopes added to spec-tech.md
- [ ] Coverage and risk targets calibrated per risk level
- [ ] CI/CD gates documented
- [ ] Anti-patterns checklist included

---

## Fallback

If tech stack detection fails:
- Python → pytest + pytest-cov + Bandit
- JavaScript/TypeScript → Vitest + c8/V8 coverage + ESLint
- Go → testing + `go test -cover` + Gosec
- Rust → cargo test + cargo-tarpaulin + cargo-audit

---

## Related Skills

- **stelow-product-tech-planning**: Produces scopes to test
- **stelow-product-scope-executor**: Executes test scopes
- **stelow-product-plan-critique**: Can review testing strategy

## Entry (mode detection)

When this skill loads, check for the stelow workflow marker:

```bash
if [ -n "$STELOW_WORKFLOW" ] && [ -n "$STELOW_STATE" ]; then
  echo "stelow: workflow mode (state=$STELOW_STATE)"
else
  echo "stelow: standalone mode (no STELOW_WORKFLOW marker)"
fi
```

In **standalone mode** (no marker), run the existing skill body unchanged.
In **workflow mode**, skip to `### Workflow slice` and emit a complete
`## Hand-off (workflow mode)` block at the end. See
`references/host-levers.md` for the full marker protocol (SCOPE-9).

## Hand-off (workflow mode)

```
stage          : verification
description    : Verification. Run full test suite, code review, UI audit, browser testing.
status         : <done|partial|blocked>
artifacts      : <paths created or modified>
next-candidate : diff-gate
gate           : none
rework-on      : execution
```

Workflow mode: emit the above Hand-off block verbatim, then stop. The
router skill consumes the next-candidate field and calls
`scripts/stelow advance <next-candidate>` to move state forward.

### Workflow slice

Workflow mode for the **verification** stage. Standalone behavior lives in
the rest of this file (unchanged). Summary:

> Verification. Run full test suite, code review, UI audit, browser testing.

Primary actions (per stages.yaml): `read, write`. Run only the actions that
produce the artifacts promised in `## Hand-off`; skip anything that does
not advance the workflow.

