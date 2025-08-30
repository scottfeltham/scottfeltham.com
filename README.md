# ScottFeltham.com — AI Agent CLI Site

A minimal, dependency-free personal branding site presented as an interactive AI agent CLI.

## Quick start

Open directly:

- Double-click `index.html` or open it in your browser.

Or serve locally (recommended for correct relative paths):

- Python 3: `python3 -m http.server 5173`
- Then visit: http://localhost:5173/

## Commands

Type `help` in the terminal UI to see available commands. Highlights:
- `whoami`, `about`, `projects`, `skills`, `contact`
- `theme dark|light|matrix|retro`
- `open github|linkedin|x|email|resume|site`
- `clear`, `banner`, `echo`, `time`, `date`

## Structure

- `index.html` — Main page
- `assets/styles.css` — Terminal UI themes and layout
- `assets/script.js` — CLI logic and commands
- `assets/favicon.svg` — Favicon

## Notes

- No external libraries, to keep the site portable and fast.
- Customize content in `assets/script.js` (LINKS, bio, projects).
- You can deploy on any static host (GitHub Pages, Netlify, Vercel static, Cloudflare Pages, etc.).

