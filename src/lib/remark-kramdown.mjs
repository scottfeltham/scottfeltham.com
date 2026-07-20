// Remark plugin that reproduces the kramdown-specific syntax used by the
// Jekyll build, so the same source markdown in root `forge/*.md` renders
// identically under Astro. The forge docs stay in place (dark-launch);
// this plugin lets Astro consume their kramdown flavour without edits.
//
// Handled kramdown constructs:
//   1. Block IALs on their own line:  `{: .no_toc .text-delta }`
//      -> applied as classes/id to the immediately preceding block element,
//         the marker line itself is dropped.
//   2. Inline IALs after a link:      `[text](url){: .forge-btn }`
//      -> applied as classes/id to that link.
//   3. Auto table of contents:        the `1. TOC\n{:toc}` placeholder
//      -> replaced with `<ul id="markdown-toc">` built from the document
//         headings (excluding `{: .no_toc }` ones), matching kramdown output
//         and the `#markdown-toc` CSS in assets/forge.css.
//
// Heading slugs use github-slugger, the same algorithm Astro uses to generate
// heading `id`s, so the generated TOC links and cross-page fragment links line
// up with the emitted heading anchors.
import GithubSlugger from 'github-slugger';

const IAL_LINE = /^\{:\s*(.+?)\s*\}$/;
const IAL_INLINE = /^\{:\s*(.+?)\s*\}/;

function nodeText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value || '';
  if (node.children) return node.children.map(nodeText).join('');
  return '';
}

function parseIal(str) {
  const classes = [];
  let id = null;
  // Astro's remark-smartypants runs before this plugin and rewrites `--` inside
  // the IAL text into an en/em dash (e.g. `forge-btn--large`). Restore it so
  // class names survive intact; prose keeps its smart typography.
  str = str.replace(/[–—]/g, '--');
  for (const tok of str.trim().split(/\s+/)) {
    if (tok.startsWith('.')) classes.push(tok.slice(1));
    else if (tok.startsWith('#')) id = tok.slice(1);
  }
  return { classes, id, isToc: str.trim() === 'toc' };
}

function applyAttrs(node, { classes, id }) {
  if (!node) return;
  node.data = node.data || {};
  node.data.hProperties = node.data.hProperties || {};
  const existing = node.data.hProperties.className || [];
  const current = Array.isArray(existing) ? existing : String(existing).split(/\s+/).filter(Boolean);
  node.data.hProperties.className = [...current, ...classes];
  if (id) node.data.hProperties.id = id;
}

// Detect a paragraph that is exactly a block IAL line, e.g. `{: .no_toc }`.
function blockIalOf(node) {
  if (!node || node.type !== 'paragraph' || node.children.length !== 1) return null;
  const child = node.children[0];
  if (child.type !== 'text') return null;
  const m = child.value.match(IAL_LINE);
  return m ? m[1] : null;
}

// A `{:toc}` placeholder becomes a list ("1. TOC") whose text contains `{:toc}`
// (lazy continuation), or a standalone `{:toc}` paragraph. Detect either.
function isTocPlaceholder(node) {
  if (node.type === 'list') return /\{:toc\}/.test(nodeText(node));
  if (node.type === 'paragraph') {
    const t = nodeText(node).trim();
    return t === '{:toc}';
  }
  return false;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildTocHtml(headings) {
  const items = headings.filter((h) => !h.noToc && h.depth >= 2);
  if (items.length === 0) return '<ul id="markdown-toc"></ul>';
  const base = Math.min(...items.map((h) => h.depth));
  let html = '';
  let level = base - 1; // one below base so the first item opens the root <ul>
  for (const item of items) {
    if (item.depth > level) {
      while (level < item.depth) {
        html += level === base - 1 ? '<ul id="markdown-toc">' : '<ul>';
        level += 1;
      }
    } else if (item.depth < level) {
      while (level > item.depth) {
        html += '</li></ul>';
        level -= 1;
      }
      html += '</li>';
    } else {
      html += '</li>';
    }
    html += `<li><a href="#${item.slug}">${escapeHtml(item.text)}</a>`;
  }
  while (level >= base) {
    html += '</li></ul>';
    level -= 1;
  }
  return html;
}

// A block IAL on its own line directly before a paragraph (no blank line)
// applies to that following paragraph in kramdown (e.g. `{: .note }\nText`).
// CommonMark merges it as leading text; strip it and class the paragraph.
function processLeadingBlockIal(node) {
  if (node.type !== 'paragraph' || !node.children || node.children.length === 0) return;
  const first = node.children[0];
  if (first.type !== 'text') return;
  const m = first.value.match(/^\{:\s*([^}]+?)\s*\}\n/);
  if (!m) return;
  applyAttrs(node, parseIal(m[1]));
  first.value = first.value.slice(m[0].length);
  if (first.value === '') node.children.shift();
}

// A block IAL that follows a prose paragraph with no blank line (e.g. a
// subtitle `text\n{: .fs-6 .fw-300 }`) is merged by CommonMark into the same
// paragraph as a trailing `\n{: ... }`. Kramdown applies it to that paragraph;
// reproduce that by stripping the marker and classing the paragraph itself.
function processTrailingBlockIal(node) {
  if (node.type !== 'paragraph' || !node.children || node.children.length === 0) return;
  const last = node.children[node.children.length - 1];
  if (last.type !== 'text') return;
  const m = last.value.match(/\n\{:\s*([^}]+?)\s*\}\s*$/);
  if (!m) return;
  applyAttrs(node, parseIal(m[1]));
  last.value = last.value.slice(0, m.index).replace(/\s+$/, '');
  if (last.value === '') node.children.pop();
}

// Walk inline children of a container, applying inline IALs to preceding links.
function processInlineIals(node) {
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i += 1) {
    const child = node.children[i];
    if (child.type === 'text') {
      const m = child.value.match(IAL_INLINE);
      if (m && i > 0) {
        applyAttrs(node.children[i - 1], parseIal(m[1]));
        child.value = child.value.slice(m[0].length);
      }
    }
    if (child.children) processInlineIals(child);
  }
}

export default function remarkKramdown() {
  return (tree) => {
    const children = tree.children;

    // Pass 1: slug every heading in document order (mirrors Astro) and record
    // which headings are excluded from the TOC via a following `{: .no_toc }`.
    const slugger = new GithubSlugger();
    const headings = [];
    for (let i = 0; i < children.length; i += 1) {
      const node = children[i];
      if (node.type === 'heading') {
        const text = nodeText(node).trim();
        const slug = slugger.slug(text);
        const nextIal = blockIalOf(children[i + 1]);
        const noToc = nextIal ? parseIal(nextIal).classes.includes('no_toc') : false;
        headings.push({ depth: node.depth, text, slug, noToc });
      }
    }

    // Pass 2: rebuild the block list, applying block IALs and swapping the TOC.
    const out = [];
    for (let i = 0; i < children.length; i += 1) {
      const node = children[i];

      const ialStr = blockIalOf(node);
      if (ialStr !== null) {
        const parsed = parseIal(ialStr);
        if (parsed.isToc) {
          out.push({ type: 'html', value: buildTocHtml(headings) });
        } else {
          applyAttrs(out[out.length - 1], parsed);
        }
        continue; // drop the marker line
      }

      if (isTocPlaceholder(node)) {
        out.push({ type: 'html', value: buildTocHtml(headings) });
        continue;
      }

      processLeadingBlockIal(node);
      processInlineIals(node);
      processTrailingBlockIal(node);
      out.push(node);
    }

    tree.children = out;
  };
}
