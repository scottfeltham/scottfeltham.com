---
layout: forge
title: The Collaboration Spectrum
nav_order: 3
permalink: /forge/collaboration-spectrum/
description: The five levels of human-machine collaboration in FORGE — from All Human to All Machine — with escalation triggers and progressive trust.
---

# The collaboration spectrum
{: .no_toc }

The same methodology applies across a spectrum of human-machine collaboration. The phases, deliverables, and quality gates stay constant — what changes is **who leads, who supports, and who reviews**.
{: .fs-6 .fw-300 }

* TOC
{:toc}

---

## The five levels

Each level is a mirror inversion of roles.

| Level | Human | Machine | When |
|---|---|---|---|
| All Human | Everything | None | Regulated or classified work |
| Human Led | Leader | Oversight | New domains, high risk |
| **Machine Assisted** | **Collaborator** | **Collaborator** | **Established projects, moderate risk** |
| Machine Led | Oversight | Leader | Clear patterns, low risk |
| All Machine | None | Everything | Automated maintenance, pre-specified work |

---

## All Human

**Human:** everything. **Machine:** none.

Traditional development, no AI involvement. Human owns every decision and every keystroke. The FORGE phases still apply — they predate AI — but all work is manual.

**Right when:** regulated environments that prohibit AI, classified work, or simple preference.

## Human Led

**Human:** leader. **Machine:** oversight.

The human drives every phase. The machine checks, highlights errors, corrects output, and enhances deliverables. The human decides; the machine validates. All phase transitions are human-approved.

**Right when:** new projects, unfamiliar domains, high-risk features, or learning the methodology.

```
Human writes the PRD          → Machine reviews for completeness, flags gaps
Human designs architecture    → Machine checks anti-patterns, suggests alternatives
Human writes acceptance criteria → Machine enumerates missing edge cases
Human approves each phase transition
```

## Machine Assisted (Collaborator)

**Human:** collaborator. **Machine:** collaborator.

Partners with shared ownership. Either can initiate work within a phase; both contribute to deliverables. Decisions are made jointly through dialogue. The relationship is symmetric — neither leads, neither merely reviews.

**Right when:** established projects, familiar domains, moderate-risk features. This is where most productive AI-assisted development happens today, and it is forge-kit's default.

```
Human: "We need rate limiting on the API"
Machine: "Here's a draft PRD. Three questions about scope..."
→ Human answers; they refine the PRD together
→ Machine produces architecture options, human selects
→ Both iterate on acceptance criteria
→ Machine implements with TDD, human reviews at natural breakpoints
```

## Machine Led

**Human:** oversight. **Machine:** leader.

The mirror of Human Led. The machine drives phases and produces deliverables autonomously; the human checks, corrects, and enhances. The human reviews at phase gates and intervenes on anomalies, but does not initiate the work.

**Right when:** well-defined problem spaces, established patterns, moderate-to-low risk — the machine has enough context and precedent to lead.

```
Human: "Add CRUD endpoints for the new resource, following existing patterns"
→ Machine drives Focus through Evaluate
→ Machine presents deliverables at each phase gate
→ Human spot-checks, corrects, enhances
→ Human receives: implementation + evaluation report
```

## All Machine

**Human:** none. **Machine:** everything.

Fully autonomous: self-critique loops, automated validation, red-team/blue-team verification. No human gates. Escalates to a higher level only when guardrails trigger.

**Right when:** low-risk changes with clear precedent, automated maintenance, or well-specified work where the acceptance criteria already exist. The human monitors asynchronously.

```
Human: "Implement the five endpoints from the API spec"
→ Machine self-drives through all phases
→ Self-critique at each phase boundary
→ Automated validation against acceptance criteria
→ Escalates only on: ambiguity, low confidence, scope drift, security sensitivity
→ Human receives: implementation + evaluation report + audit trail
```

---

## Escalation

When confidence drops, the machine does not fail silently — it **escalates up one level**. This is the key safety mechanism of the spectrum.

| Current level | Escalation trigger | Becomes |
|---|---|---|
| All Machine | Any guardrail fires | Machine Led (human reviews) |
| Machine Led | Ambiguity or architectural uncertainty | Collaborator (joint decision) |
| Collaborator | Fundamental disagreement or domain gap | Human Led (human decides) |
| Human Led | — human already leads | All Human (remove machine) |

### Escalation triggers

| Trigger | Example | Why |
|---|---|---|
| **Ambiguous requirements** | A success criterion contains "appropriate", "reasonable", "as needed" | Untestable criteria produce untestable code |
| **Scope uncertainty** | Implementation needs functionality not in any acceptance criterion | Prevents scope drift |
| **Confidence below threshold** | Multiple valid approaches with different trade-offs | Architectural decisions have long-term consequences |
| **Security sensitivity** | Feature touches auth, payment, or PII | Risk too high for autonomous decisions |
| **Destructive operations** | Deleting data, force-pushing, changing production config | Irreversible actions require human approval |
| **Inner-loop exhaustion** | Three or more iterations without converging on passing tests | May indicate a wrong approach, not a fixable bug |
| **Conflicting constraints** | A performance requirement conflicts with a security requirement | Trade-off decisions are human decisions |

---

## Progressive trust

Teams naturally move down the spectrum as trust builds. Start at Human Led. As the machine demonstrates reliability — correct implementations, sound judgement about when to escalate, clean evaluations — move to Collaborator, then Machine Led.

The rule that matters: **trust is earned per domain, not globally.** A machine that has earned All Machine trust for CRUD endpoints has not earned it for authentication flows.

---

Set your project's default level — and get the escalation rule enforced — with **forge-kit**; see [Choosing an implementation](/forge/implementations/).
