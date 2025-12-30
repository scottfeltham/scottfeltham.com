# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal, dependency-free personal branding website for Scott Feltham. The site presents itself as an interactive CLI terminal interface, where visitors explore content through commands rather than traditional navigation.

## Positioning & Messaging

Scott Feltham is positioned as:
- **Fractional CTO** — Strategic technical leadership for SMEs and enterprises
- **Senior Engineering Leader** — 20+ years, 100+ engineers led
- **Founder @ NeoForge Engineering** — Hands-on consulting

### Key Proof Points (use consistently)
- 100+ engineers led (Builder.ai, Orange Bus)
- 2x productivity in 90 days (Kahunas)
- 99.9% uptime during rapid scaling
- 15-day MVP delivery (Neurocademy)
- Government scale delivery (HMRC Tax-Free Childcare)

### Career Timeline
- 2024–Present: NeoForge Engineering (Founder) + Fractional CTO
- 2022–2024: Builder.ai — Architecture leadership, 100+ engineers
- 2019–2022: Orange Bus — Multi-client enterprise delivery
- 2017–2019: Kahunas — SaaS turnaround, 2x productivity
- 2015: HMRC — Government digital service

### Fractional Networks
Available directly or via Mission+ and Boardman networks.

### Related Properties
- **neoforge.co** — Company site, services, case studies
- **linkedin.com/in/scottdfeltham** — Professional profile
- Keep messaging aligned across all three properties

## Development Commands

### Local Development Server
```bash
python3 -m http.server 5173
```
Visit: http://localhost:5173/

### Alternative Servers
```bash
# Node.js
npx http-server -p 5173

# PHP
php -S localhost:5173
```

## Architecture

### Key Files
- **index.html** — Single HTML page with semantic structure and accessibility features
- **assets/script.js** — CLI logic, command parser, and interactive features
- **assets/styles.css** — Terminal UI styling with 8 theme options
- **assets/favicon.svg** — SVG favicon

### No Build Process
Vanilla HTML/CSS/JavaScript with no build tools, bundlers, or dependencies.

### CLI Command Architecture
The terminal functionality in `assets/script.js` follows this pattern:
1. **COMMANDS object** — Contains all available commands as methods
2. **parse() function** — Tokenizes user input into command and arguments
3. **run() function** — Executes commands and handles errors
4. **State Management** — Uses localStorage for theme preference and command history

### Key Commands
- `whoami` — Who I am and what I do (Fractional CTO focus)
- `about` — Full bio and career timeline
- `consulting` — Fractional CTO & NeoForge services
- `projects` — Current work and past delivery
- `achievements` — Quantified impact and results
- `skills` — Technical expertise

### Customization Points
When modifying content:
- **LINKS object** (script.js:21-30) — External URLs for social profiles
- **SITE object** (script.js:15-19) — Terminal prompt appearance
- **COMMANDS object** (script.js:582+) — Individual command implementations
- **Banner tagline** (script.js:487, 509, 519) — "Fractional CTO | Senior Engineering Leader"

### Theme System
8 themes available: dark, light, matrix, retro, catppuccin, tokyo-night, nord, dracula.
Themes are CSS classes on the body element. Preference stored in localStorage.

## Deployment

Static hosting — no configuration needed:
- GitHub Pages (current: scottfeltham.com via CNAME)
- Netlify, Vercel, Cloudflare Pages
- Any static web server

Simply upload all files maintaining the directory structure.
