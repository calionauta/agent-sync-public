# Test Scope Types (reference)

Read by SKILL.md Step 5 before generating test scopes. Appetite controls breadth, not quality baseline.

### Step 5: Define Test Scope Types

For each IN scope in spec-product.md, add corresponding test scopes. Appetite controls breadth:

**Lean:**

| Code Type | Test Type | When to Use | TDD? |
|----------|-----------|-------------|------|
| User-facing flows | `test-behavior` | 1 E2E test for happy path | No — browser/e2e |
| Critical business logic | `test-unit` | Happy path + one negative case | Yes for deterministic logic |
| External APIs | `test-integration` | Only if external seam is in Lean IN scope | No — test-after |
| Security-sensitive | `test-security` | Only if auth/payment/data is in Lean IN scope | Automated SAST |

**Core:**

| Code Type | Test Type | When to Use | TDD? |
|----------|-----------|-------------|------|
| User-facing flows | `test-behavior` | E2E for happy path + key variations | No — browser/e2e |
| Agent workflows | `test-behavior` | Multi-step agents | Multi-run validation |
| Business logic | `test-unit` | Main flows + obvious edge cases | Yes — critical paths |
| External APIs | `test-integration` | DB, APIs, queues | No — test-after |
| Security-sensitive | `test-security` | Auth, payment, data | Automated SAST |

**Complete:**

| Code Type | Test Type | When to Use | TDD? |
|----------|-----------|-------------|------|
| User-facing flows | `test-behavior` | Full E2E coverage + edge cases | No — browser/e2e |
| Complex UI/user flows | `test-behavior` | Forms, modals, multi-step flows | Browser/e2e |
| Agent workflows | `test-behavior` | Multi-step agents | Multi-run validation |
| Business logic | `test-unit` | Full edge mapping | Yes — critical paths |
| External APIs | `test-integration` | All external seams | No — test-after with contract checks |
| Security-sensitive | `test-security` | Auth, payment, data, permissions | Automated SAST + targeted tests |

**Brownfield/Hybrid (existing code):**

| Code Type | Test Type | When to Use | Context |
|----------|-----------|-------------|---------|
| Protect existing | `test-regression` | Detect regressions | Brownfield/Hybrid |
| Document behavior | `test-characterization` | Golden tests | Brownfield |
| Replay past tasks | `test-simulation` | Verify consistency | Brownfield |
| Impact analysis | `test-impact` | TDAD-style | Brownfield |


### Greenfield Testing (New Products)

**When building a new product:**

| Aspect | Strategy | Rationale |
|--------|----------|----------|
| **TDD adoption** | Full recommended | No legacy constraints, clean architecture |
| **Coverage/risk targets** | Appetite-specific: Lean critical path only; Core main logic + external seams; Complete full edge mapping + security | Establish quality baseline from day one |
| **Coverage** | Define target upfront | 80% baseline, higher for critical |
| **Technical debt** | None yet | Focus on clean patterns, not remediation |

### Hybrid (Feature Addition)

**When adding features to existing product:**

| Aspect | Strategy | Rationale |
|--------|----------|----------|
| **New code** | TDD for critical, test-after for standard | Same as greenfield |
| **Existing code** | Regression + protection | Same as brownfield |
| **Integration points** | Extra verification | Ensure new doesn't break old |
| **Agent behavior** | Behavioral + regression | Non-deterministic risk |

**Anti-patterns for Brownfield/Hybrid:**
- ❌ AI refactoring without test protection
- ❌ AI modifying existing code without characterization tests
- ❌ Over-mocking existing integrations
- ❌ Ignoring technical debt in scope planning
- ❌ Asserting on untestable-handler source text instead of extracting — when behavior lives in a closure/handler that unit tests can't reach, extract a pure helper to a testable module and test outputs there (precedent: shared predicate + answer-cleaning extraction replacing ~5 presence pins with behavioral tests)
