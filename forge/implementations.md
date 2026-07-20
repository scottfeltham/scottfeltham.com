---
layout: forge
title: Choosing an Implementation
nav_order: 2
permalink: /forge/implementations/
description: The FORGE family — the canonical Claude Code skill, forge-kit enforcement, the standalone CLI, and the MCP server — and when each one fits.
---

# Choosing an implementation
{: .no_toc }

FORGE is a methodology first. Several implementations express it, and they are not interchangeable — they differ in state format, enforcement, and which tools they run inside. Pick deliberately.
{: .fs-6 .fw-300 }

* TOC
{:toc}

---

## At a glance

| Implementation | Status | State format | Use when |
|---|---|---|---|
| **forge-skill** | **Canonical** | `.forge/cycles/` | You use Claude Code and want the shared state format the wider tooling reads |
| **forge-kit** | Companion to the skill | Uses the skill's state | You want the methodology *enforced*, not merely available |
| **forge-framework** (CLI) | Standalone product | `forge.yaml` + `.forge/current.md` | You want a lightweight conversational workflow, outside Claude Code |
| **forge-mcp-server** | Maintenance mode | Shares the skill's `.forge/` format | You are on an MCP-only tool (Cursor, VS Code) |

The distinction that matters most: **forge-skill owns the canonical state format.** The observatory, the TUI, and the MCP server all read and write `.forge/cycles/`. The standalone CLI keeps its own state (`forge.yaml` + `.forge/current.md`) and does not participate in that shared ecosystem.

---

## forge-skill — the canonical implementation

A Claude Code skill implementing the full FORGE cycle. No server, no daemon.

**Requirements:** Python 3.11+, [Astral UV](https://docs.astral.sh/uv/), Claude Code CLI.

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/scottfeltham/forge-skill.git ~/.claude/skills/forge
```

Then, in Claude Code:

```
/forge new "user authentication"
/forge status
/forge phase next
```

[forge-skill on GitHub](https://github.com/scottfeltham/forge-skill){: .forge-btn .forge-btn--secondary }

See also: [Claude Code Integration](/forge/claude-code-integration/) · [Quick Start](/forge/quick-start/)

---

## forge-kit — enforcement

A drop-in `CLAUDE.md` plus a phase-guard hook. Where the skill *offers* the methodology, the kit *enforces* it: the guard prevents phase-skipping, and the `CLAUDE.md` sets your default position on the [collaboration spectrum](/forge/#the-collaboration-spectrum) along with the escalation rule.

Use it on any project where "we'll follow the phases" needs to be structural rather than aspirational — which, in practice, is most projects with more than one contributor.

Pair with forge-skill; it is not a replacement for it.

---

## forge-framework — the standalone CLI

A conversational CLI, under 200 lines, that unlocks the workflow through natural dialogue.

```bash
npx forge-framework install
```

This is a **standalone product with its own state format** (`forge.yaml` + `.forge/current.md`). It is not the canonical implementation and does not share `.forge/cycles/` with the skill and its tooling. Choose it when you want the lightweight conversational loop and do not need the shared ecosystem.

Most of the pages in [Getting Started](/forge/getting-started/) and the [CLI Reference](/forge/cli-reference/) document this CLI.

[forge-framework on GitHub](https://github.com/scottfeltham/forge-framework){: .forge-btn .forge-btn--secondary }

---

## forge-mcp-server — maintenance mode

An MCP server exposing FORGE to any MCP-capable client (Cursor, VS Code, and others). It shares the skill's `.forge/` state format.

**It is in maintenance mode**: it receives fixes, not new capability. If you are on Claude Code, use the skill instead. If you are on an MCP-only tool, this remains the supported route.

See [MCP Integration](/forge/mcp-integration/) for configuration.

---

## Which should I choose?

- **Claude Code, want the full methodology** → forge-skill, plus forge-kit for enforcement.
- **Claude Code, want it enforced across a team** → forge-skill + forge-kit, with the kit's `CLAUDE.md` committed to the repo. See [Team Collaboration](/forge/team-collaboration/).
- **Cursor, VS Code, or another MCP client** → forge-mcp-server.
- **Outside Claude Code entirely, or want minimal ceremony** → the forge-framework CLI.
- **Not writing code at all — planning on paper** → the methodology still applies. The phases predate the tooling; see [the five phases](/forge/#the-forge-cycle).
