# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal, dependency-free personal branding website for Scott Feltham. The site presents itself as an interactive CLI terminal interface, where visitors explore content through commands rather than traditional navigation.

## Positioning & Messaging

Scott Feltham is positioned as:
- **Fractional CTO | Senior Engineering Leader** — Primary tagline (matches LinkedIn)
- **Founder @ NeoForge Consulting** — Fractional CTO services, AI adoption, modern delivery
- **Creator @ Neurocademy** — AI-powered learning for neurodivergent students

### Key Proof Points (use consistently)
- 2x productivity through AI adoption (Kahunas, 2025)
- 99.9% platform availability during growth (Kahunas)
- 8 months from concept to production (mkodo GeoLocs)
- 8 engineers mentored to senior roles (Builder.ai)
- HMRC Tax-Free Childcare — government digital service (via Orange Bus)

### Career Timeline (Correct as of Aug 2025)
- **Jan 2025–Present**: NeoForge Consulting (Founder) — Fractional CTO services
- **July 2025–Present**: Neurocademy (Creator & Product Lead) — AI-powered education
- **Feb 2025–Aug 2025**: Kahunas (VP of Engineering) — 2x productivity, 99.9% uptime
- **Jan 2023–Feb 2025**: Builder.ai (Senior Technical Architect) — Architecture Guild, 8 mentees
- **Apr 2022–Dec 2022**: mkodo (Head of Engineering) — GeoLocs SaaS in 8 months
- **Sep 2019–Mar 2022**: Moltin/Elastic Path (Senior Software Engineer & Ops Manager)
- **2015–2017**: Orange Bus (Solutions Architect) — includes HMRC Tax-Free Childcare (Jan 2015–Jan 2016)
- **1998–2019**: Career evolution through defence, freelance, and enterprise roles

### Related Properties
- **neoforge.co** — Company site, services, case studies
- **neurocademy.com** — AI-powered learning platform
- **linkedin.com/in/scottdfeltham** — Professional profile
- Keep messaging aligned across all properties

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
- `whoami` — Who I am and what I do
- `about` — Full bio and career timeline
- `consulting` — NeoForge Consulting & Fractional CTO services
- `projects` — Current work and past delivery
- `achievements` — Quantified impact and results
- `skills` — Technical expertise
- `neurocademy` — AI-powered learning platform
- `forge` — FORGE Framework methodology

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
