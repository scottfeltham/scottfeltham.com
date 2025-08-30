# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal, dependency-free personal branding website for Scott Feltham. The site presents itself as an interactive AI agent CLI terminal interface, where visitors explore content through commands rather than traditional navigation.

## Development Commands

### Local Development Server
```bash
python3 -m http.server 5173
```
Visit: http://localhost:5173/

Note: Running a local server is recommended to ensure correct relative paths for assets.

### Alternative Servers
```bash
# Python 2
python -m SimpleHTTPServer 5173

# Node.js (if http-server is installed globally)
npx http-server -p 5173

# PHP
php -S localhost:5173
```

## Architecture

### Key Files
- **index.html** - Single HTML page with semantic structure and accessibility features (skip links, ARIA labels, screen reader support)
- **assets/script.js** - CLI logic, command parser, and interactive features
- **assets/styles.css** - Terminal UI styling with multiple theme support (dark, light, matrix, retro)
- **assets/favicon.svg** - SVG favicon

### No Build Process
This is a vanilla HTML/CSS/JavaScript site with no build tools, bundlers, or dependencies. All files are served directly.

### CLI Command Architecture
The terminal functionality in `assets/script.js` follows this pattern:
1. **COMMANDS object** - Contains all available commands as methods
2. **parse() function** - Tokenizes user input into command and arguments
3. **run() function** - Executes commands and handles errors
4. **State Management** - Uses localStorage for theme preference and command history

### Customization Points
When modifying content:
- **LINKS object** (script.js:15-22) - External URLs for social profiles and documents
- **SITE object** (script.js:9-13) - Terminal prompt appearance
- **Command implementations** (script.js:101-176) - Individual command behaviors and output

### Theme System
Themes are CSS classes on the body element (`theme-dark`, `theme-light`, `theme-matrix`, `theme-retro`). The theme command updates both the DOM and localStorage.

## Deployment

This site can be deployed to any static hosting service without configuration:
- GitHub Pages
- Netlify (drop folder)
- Vercel (static export)
- Cloudflare Pages
- AWS S3 + CloudFront
- Any web server

Simply upload all files maintaining the directory structure.