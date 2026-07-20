---
layout: forge
title: FORGE Framework
nav_order: 1
permalink: /forge/
description: FORGE and Intent-Driven Development — the methodology, the five phases, and the implementations. Created by Scott Feltham.
---

# Intent-Driven Development
{: .fs-9 }

The quality of AI output is determined by the quality of the intent you express.
{: .fs-6 .fw-300 }

[Start here](/forge/quick-start/){: .forge-btn .forge-btn--large }
[Choose an implementation](/forge/implementations/){: .forge-btn .forge-btn--secondary .forge-btn--large }

---

FORGE is a **methodology, not a tool**. It provides the discipline that turns AI from a code generator into a development partner. Vague intent produces vague code; precise intent, expressed through structured phases, produces code that matches what you actually need.

It works with any AI tool, any language, any team structure. The phases are the same whether you are pair-programming with Claude Code, directing an autonomous agent swarm, or sketching on a whiteboard before opening your editor.

---

## The three pillars of IDD

Intent-Driven Development rests on three pillars. Remove any one and the methodology collapses.

**Intent** — the precise articulation of *what* you are building, *why* it matters, and *what success looks like* in testable terms. Not a feature request; not a user story. Sharp enough to be implemented by an agent that has no intuition, only instructions.

**Outcome** — intent without a measurable outcome is a wish. Outcomes are the testable, observable results that prove intent was realised. Every line of code traces to an outcome; every outcome traces to an intent.

**Accountability** — intent and outcome without accountability is hope. Every decision is traceable, every phase transition justified, every disposition recorded with evidence. Accountability is what makes autonomous development trustworthy — not the model's capability, but the verifiable chain from intent through outcome to evidence.

| Missing pillar | Result |
|---|---|
| Intent without Outcome | Unclear goals, no way to verify success |
| Outcome without Accountability | Results with no traceability, no trust |
| Accountability without Intent | Process theatre, measuring the wrong things |
| **All three** | **Development you can trust, verify, and improve** |

---

## The five working principles

1. **Clarity before code.** *(Intent)* Every line of code should trace back to a stated intent. If you can't explain the problem, the users, and what success looks like to someone unfamiliar with it, you aren't ready to build it.
2. **Specs are the contract.** *(Intent → Outcome)* Acceptance criteria in Given-When-Then form are the handshake between intent and implementation. The spec is what the human commits to; the implementation is what the AI delivers against.
3. **Tests prove the contract.** *(Outcome)* TDD is the verification mechanism. A failing test encodes the spec; passing code proves the contract is met.
4. **Phases prevent drift.** *(Accountability)* Without structure, development drifts toward "just start coding." Phases are forcing functions with concrete deliverables that must exist before advancing.
5. **Evaluate against intent, not intuition.** *(Outcome + Accountability)* "Does it work?" is the wrong question. "Does it match the acceptance criteria from Refine?" is the right one.

---

## The FORGE cycle

Five sequential phases, each with validation gates. You cannot skip ahead without completing the requirements.

| Phase | Purpose | Key question | Output |
|---|---|---|---|
| **Focus** | Clarity | What are you actually building, and why? | Problem statement, success criteria |
| **Orchestrate** | Planning | How does it break down? | Architecture, task breakdown |
| **Refine** | Precision | What does "done" mean — before any code? | Acceptance criteria, interfaces |
| **Generate** | Creation | Does the code satisfy the spec? | Tested, working implementation |
| **Evaluate** | Verification | Does the output match the intent? | Accepted, or revision required |

Read the phases in practice: [Quick Start](/forge/quick-start/) · [Your First Cycle](/forge/your-first-cycle/) · [Phase Validation](/forge/phase-validation/)

---

## The collaboration spectrum

The same methodology applies across five levels of human-machine collaboration. The phases, deliverables, and quality gates stay constant — what changes is **who leads, who supports, and who reviews**.

| Level | Human | Machine | When |
|---|---|---|---|
| All Human | Everything | None | Regulated or classified work |
| Human Led | Leader | Oversight | New domains, high risk |
| **Machine Assisted** | **Collaborator** | **Collaborator** | **Established projects, moderate risk** |
| Machine Led | Oversight | Leader | Clear patterns, low risk |
| All Machine | None | Everything | Automated maintenance, pre-specified work |

**Escalation rule:** when confidence drops, escalate up one level. Machine Led unsure? Become Collaborator. Collaborator stuck? Switch to Human Led.

**Trust is earned per domain, not globally.** Proven on CRUD endpoints ≠ trusted for auth flows.

---

## Getting started

FORGE has several implementations sharing one methodology. The **[FORGE skill for Claude Code](/forge/implementations/) is canonical** — it owns the `.forge/cycles/` state format that the wider tooling reads and writes.

```bash
# Canonical: the Claude Code skill
mkdir -p ~/.claude/skills
git clone https://github.com/scottfeltham/forge-skill.git ~/.claude/skills/forge
```

Then, in Claude Code:

```
/forge new "user authentication"
/forge status
/forge phase next
```

Pair it with **forge-kit** — a drop-in `CLAUDE.md` plus a phase-guard hook — when you want the methodology enforced rather than merely available.

Prefer a lightweight conversational CLI, or working outside Claude Code? See [Choosing an implementation](/forge/implementations/) for the full family and when each one fits.

---

## Where to go next

- **[Quick Start](/forge/quick-start/)** — install and run your first cycle
- **[Choosing an implementation](/forge/implementations/)** — skill, kit, CLI, or MCP
- **[Core Concepts](/forge/core-concepts/)** — agents, memory, validation, learning
- **[Advanced Topics](/forge/advanced/)** — teams, MCP, existing projects, integrations
- **[Reference](/forge/reference/)** — CLI, PRD guide, troubleshooting

FORGE and Intent-Driven Development were created by [Scott Feltham](/). The book, *Intent-Driven Development*, expands this material from founding axiom to autonomous delivery.
