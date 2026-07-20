---
layout: forge
title: Quick Start
nav_order: 1
parent: Getting Started
permalink: /forge/quick-start/
---

# Quick Start
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Get up and running with FORGE in under 5 minutes.

## Installation

FORGE has more than one implementation. Pick the one that matches your tooling — see [Choosing an Implementation](/forge/implementations/) for the full comparison.

### forge-skill — canonical (recommended for Claude Code)

The Claude Code skill is the canonical implementation. It owns the `.forge/cycles/` state format that the rest of the FORGE tooling reads and writes.

Requires Python 3.11+, [Astral UV](https://docs.astral.sh/uv/), and the Claude Code CLI.

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/scottfeltham/forge-skill.git ~/.claude/skills/forge
```

Then drive it from Claude Code:

```
/forge new "user authentication"
/forge status
/forge phase next
```

To have the methodology *enforced* rather than merely available, add [forge-kit](/forge/implementations/#forge-kit--enforcement) — a drop-in `CLAUDE.md` plus a phase-guard hook that prevents phase-skipping and sets your default collaboration level.

### forge-framework CLI — standalone

If you work outside Claude Code, or want a lightweight conversational CLI, install the standalone `forge-framework` package. It is a separate product with its own state format (`forge.yaml` + `.forge/current.md`) and does not share `.forge/cycles/` with the skill.

```bash
# Local install
npx forge-framework install

# Or globally
npm install -g forge-framework

# Verify installation
forge --version  # Should output: 2.0.0
```

The remainder of this page documents the `forge` CLI from this package.

### What Gets Installed

The global CLI installation automatically:
- Installs the `forge` CLI command globally
- Configures 6 specialized Claude Code subagents
- Sets up the FORGE framework for immediate use
- No additional configuration required

This installs FORGE globally and automatically configures 6 specialized Claude Code subagents:
- **forge-architect** - System architecture design and planning
- **forge-developer** - Code implementation and feature development  
- **forge-tester** - Testing strategies and quality assurance
- **forge-devops** - Infrastructure and deployment automation
- **forge-reviewer** - Code review and quality assessment
- **forge-analyzer** - Codebase analysis and insights

## Initialize Your Project

The `forge` shell commands below belong to the standalone forge-framework CLI. If you installed the skill, use the `/forge ...` equivalents inside Claude Code instead.

```bash
cd your-project
forge init
```

This creates a minimal `forge.yaml` configuration. Ask your AI assistant (Claude, etc.) to analyze your project and update the configuration.

## Start Building

```bash
forge new "user authentication"
```

This starts a new development cycle. FORGE implements Intent-Driven Development through 5 validated phases:
1. **Focus** 🎯 - Clarity: What & Why (problem statement, success criteria, C4 L1)
2. **Orchestrate** 📋 - Planning: Break It Down (C4 L2-L3, dependency map, session-sized tasks)
3. **Refine** ✏️ - Precision: Define "Done" (acceptance criteria, interfaces, edge cases - NO CODE)
4. **Generate** ⚡ - Creation: TDD Code (RED → GREEN → REFACTOR)
5. **Evaluate** ✅ - Verification (criteria check, security review, disposition)

### Phase Validation (v2.0.0+)

FORGE enforces proper progression through validated phases:

```bash
forge status              # Visual progress bars showing phase completion
forge phase               # Show current phase details
forge phase next          # Move to next phase (validates requirements)
forge complete            # Complete cycle (only when all phases done)
forge complete --force    # Force completion (use sparingly)
```

**Important**: You cannot skip phases or complete prematurely. Each phase has mandatory requirements (e.g., test scenarios in Focus phase).

## Core Commands (forge-framework CLI)

- `forge init` - Initialize FORGE in your project
- `forge new <feature>` - Start a new development cycle
- `forge status` - Check current progress
- `forge complete` - Archive completed cycle
- `forge document` - Manage documentation
- `forge learn` - View and update learnings

### Claude Code Slash Commands

When using Claude Code, you can also use explicit slash commands:
- `/forge init` - Initialize FORGE
- `/forge new authentication` - Start new cycle
- `/forge status` - Check progress
- `/forge complete` - Complete cycle
- `/forge help` - Get help

Both work equally well - use whichever feels natural!

## Working with AI

FORGE is designed for AI-driven development. After each command, engage with your AI assistant:

```
You: forge new "shopping cart"
You: Let's design a shopping cart feature

Claude: I'll use the forge-architect subagent to design this system...

[forge-architect activated]
As your architecture specialist, I'll design the shopping cart system:
1. First, let me analyze your current codebase...
2. I'll create test scenarios before designing...
3. Now designing the cart architecture...
```

## Key Concepts

### Claude Code Subagents
FORGE automatically configures Claude Code subagents that operate in isolated contexts:
- **forge-architect** - System design and planning (Read, Write, Edit, Glob, Grep, Task, TodoWrite)
- **forge-developer** - Code implementation (Read, Write, Edit, MultiEdit, Bash, Glob, Grep, Task, TodoWrite)
- **forge-tester** - Quality assurance (Read, Write, Edit, Bash, Glob, Grep, Task, TodoWrite)
- **forge-devops** - Infrastructure and deployment (Read, Write, Edit, Bash, Glob, Grep, Task, TodoWrite)
- **forge-reviewer** - Code and design review (Read, Grep, Glob, Edit, Task, TodoWrite)
- **forge-analyzer** - Codebase analysis and insights (Read, Glob, Grep, Task, TodoWrite)

Each subagent has specialized expertise and operates in its own context to prevent confusion.

### Test-First Development
All agents enforce TDD. You must define test scenarios before writing code.

### Documentation
- PRDs go in `specs/`
- All other docs go in `docs/`
- Use `forge document` for AI-powered documentation management

## Issues & Feedback

Please report issues at:
https://github.com/scottfeltham/forge-framework/issues

## Next Steps

### Your First FORGE Cycle
See our comprehensive [Your First FORGE Cycle](/forge/getting-started/#your-first-forge-cycle) walkthrough for a complete end-to-end example.

### Learn More
- [Choosing an Implementation](/forge/implementations/) - Skill, kit, CLI, or MCP server
- [Core Concepts](/forge/core-concepts/) - Understand the 5-phase methodology
- [Claude Code Integration](/forge/claude-code-integration/) - Leverage specialized AI agents
- [Phase Validation](/forge/phase-validation/) - Master the validation system
- [Team Collaboration](/forge/team-collaboration/) - Scale with your team

## Join the Community

- GitHub: https://github.com/scottfeltham/forge-framework
- Discussions: https://github.com/scottfeltham/forge-framework/discussions

Welcome to the future of AI-driven development! 🚀