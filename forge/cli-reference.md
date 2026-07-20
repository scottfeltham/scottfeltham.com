---
layout: forge
title: CLI Reference
nav_order: 1
parent: Reference
permalink: /forge/cli-reference/
---

# CLI Reference
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

> This page documents the standalone **forge-framework** CLI (v2.0.0), installed with `npx forge-framework install` or `npm install -g forge-framework`. It keeps its own state (`forge.yaml` + `.forge/current.md`) and is not the canonical implementation — that is [forge-skill](/forge/implementations/#forge-skill--the-canonical-implementation). See [Choosing an Implementation](/forge/implementations/).

## Overview

The forge-framework CLI (v2.0.0) provides a minimal yet powerful interface for AI-driven development with built-in phase validation, progress tracking, and automatic Claude Code subagent configuration.

## Core Commands

### forge init
Initialize FORGE in your project directory.

```bash
forge init
```

**Creates:**
- `forge.yaml` configuration file
- `.forge/` directory structure
- Initial project analysis prompt

**Note:** Claude Code subagents are configured during global installation, not init.

---

### forge new
Start a new development cycle.

```bash
forge new <feature-name>
forge new "user authentication"
```

**Behavior:**
- Solo mode: Creates `.forge/current.md`
- Team mode: Creates `.forge/current/<feature>.md`
- Initializes 5-phase cycle template

---

### forge status
Display cycle progress with visual indicators.

```bash
forge status              # Visual progress summary
forge phase               # Current phase details
forge phase status        # Detailed phase requirements
forge status --detailed   # Full cycle content
```

**Features:**
- Visual progress bars
- Completion percentages
- Current phase indicator
- Next tasks display

**Example Output:**
```
📋 Current Cycle: user authentication
──────────────────────────────────────────────────
✅ 🎯 Focus        [██████████] 100%
🔄 📝 Orchestrate  [████░░░░░░] 40%
⏳ 🔨 Refine       [░░░░░░░░░░] 0%

📍 Current Phase: Orchestrate
   Next tasks:
   • Plan dependencies
   • Assign priorities
```

---

### forge complete
Archive completed cycle with validation.

```bash
forge complete           # With validation
forge complete --force   # Skip validation
```

**Validation Features:**
- Checks all phases for completion
- Identifies mandatory incomplete items
- Prevents premature archival
- Shows helpful guidance

**Validation Output:**
```
⚠️  Cycle has incomplete phases!

Incomplete phases: Focus, Orchestrate
Mandatory tasks not completed:
  🎯 Focus: Define test scenarios (MANDATORY)

💡 Options:
  1. Complete the remaining tasks
  2. Use "forge complete --force" to archive anyway
```

## Phase Management Commands

### forge phase status
Detailed phase progress overview.

```bash
forge phase status
```

**Shows:**
- All phases with progress bars
- Mandatory incomplete items
- Visual completion indicators
- Task-level details

---

### forge phase next
Transition to next phase with validation.

```bash
forge phase next         # With validation
forge phase next --force # Skip validation
```

**Features:**
- Validates mandatory items
- Updates phase markers
- Activates next phase
- Shows blocking items

---

### forge phase complete
Mark current phase as complete.

```bash
forge phase complete
```

**Actions:**
- Marks all items as done
- Updates phase status
- Enables bulk completion

## Learning Commands

### forge learn
Manage project knowledge base.

```bash
forge learn                # View learnings
forge learn retrospective  # Create retro template
forge learn pattern       # Document pattern
forge learn claude        # Generate CLAUDE.md
```

## MCP Integration

### forge mcp list
Show available MCP servers.

```bash
forge mcp list
```

### forge mcp suggest
Get project-specific recommendations.

```bash
forge mcp suggest
```

### forge mcp add
Add MCP server to configuration.

```bash
forge mcp add <server>
forge mcp add filesystem
```

## Utility Commands

### forge document
Start documentation session.

```bash
forge document
```

### forge uninstall
Remove FORGE from project.

```bash
forge uninstall --confirm
```

## Command Options

| Option | Commands | Description |
|--------|----------|-------------|
| `--force` | complete, phase next | Skip validation checks |
| `--detailed` | status | Show full content |
| `--confirm` | uninstall | Confirm destructive action |

## Workflow Examples

### Standard Flow
```bash
# Start feature
forge new "shopping cart"

# Track progress
forge status

# Move through phases
forge phase next

# Complete when done
forge complete
```

### With Overrides
```bash
# Force completion
forge complete --force

# Skip phase validation
forge phase next --force
```

### Team Mode
```bash
# Parallel features
forge new "feature-a"
forge new "feature-b"

# Check all cycles
forge status

# Complete specific
forge complete feature-a.md
```

## Phase Validation System

FORGE enforces proper workflow progression:

### Validation Rules
1. **Mandatory Tasks**: Must be completed before phase transitions
2. **Phase Dependencies**: Can't skip phases
3. **Completion Checks**: All phases validated before archival
4. **Override Options**: `--force` flags for flexibility

### Visual Progress Indicators

| Symbol | Meaning |
|--------|---------|
| ⏳ | Phase pending |
| 🔄 | Phase in progress |
| ✅ | Phase complete |
| ⚠️ | Mandatory item incomplete |

### Progress Bars
```
[██████████] 100% - Complete
[████░░░░░░] 40%  - In progress
[░░░░░░░░░░] 0%   - Not started
```

## File Structure

```
project/
├── forge.yaml           # Configuration
├── .forge/
│   ├── current.md      # Active cycle
│   ├── history/        # Archived cycles
│   ├── templates/      # Templates
│   └── agents/         # Agent definitions
└── .claude/
    └── agents/         # Subagents
```

## Tips & Best Practices

1. **Check Progress Often**: Use `forge status` regularly
2. **Complete Phases**: Don't skip ahead without finishing
3. **Use Validation**: Let FORGE guide proper workflow
4. **Force When Needed**: Override for special cases
5. **Track Learnings**: Document patterns and insights

## Error Messages

| Message | Meaning | Solution |
|---------|---------|----------|
| "No active cycle" | No cycle started | Run `forge new <feature>` |
| "Incomplete phases" | Validation failed | Complete tasks or use `--force` |
| "Cannot move to next phase" | Mandatory items incomplete | Finish required items |

## Version Information

Current forge-framework version: 2.0.0

For updates: [GitHub Repository](https://github.com/scottfeltham/forge-framework)