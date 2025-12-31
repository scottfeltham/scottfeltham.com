# Project Context for AI

## Project Overview
- **Name**: scottfeltham.com
- **Type**: [To be determined through analysis]
- **Created**: 12/30/2025

## FORGE Development Approach

This project uses FORGE (Focus-Orchestrate-Refine-Generate-Evaluate) as an Intent-Driven Development methodology:

1. **Focus** 🎯 - **Clarity: What & Why**
   - Define problem statement and target users
   - Write testable success criteria (specific, measurable)
   - Create System Context diagram (C4 Level 1)
   - Set clear boundaries - what you WON'T build

2. **Orchestrate** 📋 - **Planning: Break It Down**
   - Design Container architecture (C4 Level 2)
   - Design Component architecture (C4 Level 3)
   - Map dependencies and build order
   - Break into session-sized tasks

3. **Refine** ✏️ - **Precision: Define "Done" BEFORE Code**
   - Write acceptance criteria (Given-When-Then format)
   - Specify component interfaces (inputs, outputs, errors)
   - Enumerate edge cases by category
   - Document constraints (how) vs criteria (what)

4. **Generate** ⚡ - **Creation: AI Writes Code**
   - One task per session
   - Follow TDD: RED → GREEN → REFACTOR
   - Know when to iterate vs regenerate fresh
   - Preserve outputs immediately

5. **Evaluate** ✅ - **Verification: Does Output Match Intent?**
   - Verify line-by-line against acceptance criteria
   - Test edge cases (listed AND unlisted)
   - Security review (injection, auth, data exposure)
   - Disposition: Accept / Accept with issues / Revise / Reject

## Rules Foundation
- **TDD Mandatory**: Tests written BEFORE implementation
- **80% Coverage Minimum**: 90% for critical paths
- **Security by Default**: Input validation, parameterized queries, encryption
- **WCAG 2.1 AA**: Accessibility is a requirement, not optional

## Memory System
- **Project Memory**: Stable context (architecture, decisions, vocabulary)
- **Session Memory**: Current work state (completed, in progress, next)
- **Implementation Memory**: Actual code and interfaces (source of truth)
