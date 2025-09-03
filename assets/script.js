'use strict';

(function () {
  const $output = document.getElementById('output');
  const $form = document.getElementById('input-form');
  const $input = document.getElementById('input');
  const $prompt = document.getElementById('prompt');
  const $infoOutput = document.getElementById('info-output');
  const $statusOutput = document.getElementById('status-output');
  const $currentTheme = document.getElementById('current-theme');
  const $cmdCount = document.getElementById('cmd-count');
  const $sessionTime = document.getElementById('session-time');
  const $statusTime = document.getElementById('status-time');

  const SITE = {
    user: 'guest',
    host: 'scottfeltham.com',
    path: '~',
  };

  const LINKS = {
    github: 'https://github.com/scottfeltham',
    linkedin: 'https://www.linkedin.com/in/scottfeltham',
    x: 'https://x.com/scottfeltham',
    email: 'mailto:scott@neoforge.co',
    resume: '/assets/resume.pdf',
    site: 'https://scottfeltham.com',
    neoforge: 'https://neoforge.co',
    neurocademy: 'https://neurocademy.com',
  };

  const STATE = {
    history: JSON.parse(localStorage.getItem('cli_history') || '[]'),
    histIdx: 0,
    theme: localStorage.getItem('theme') || 'dark',
    fontSize: parseInt(localStorage.getItem('fontSize') || '14'),
    started: false,
    commandCount: 0,
    sessionStart: Date.now(),
    activePane: 0,
  };

  // Setup theme and font size on load
  applyTheme(STATE.theme);
  applyFontSize(STATE.fontSize);

  // Contact form functionality
  function showContactForm() {
    const $statusOutput = document.getElementById('status-output');
    if (!$statusOutput) return;
    
    // Switch to pane 2
    setActivePane(2);
    
    // Create simple CLI-style contact display
    $statusOutput.innerHTML = `
      <div class="status-section">
        <div class="line"><strong class="accent">// Contact Methods</strong></div>
        <div class="line">&nbsp;</div>
        <div class="line">📧 <span class="info-label">Email:</span></div>
        <div class="line">   <a href="mailto:scott@neoforge.co" class="accent">scott@neoforge.co</a></div>
        <div class="line">&nbsp;</div>
        <div class="line">💼 <span class="info-label">LinkedIn:</span></div>
        <div class="line">   <a href="${LINKS.linkedin}" target="_blank" class="accent">@scottfeltham</a></div>
        <div class="line">&nbsp;</div>
        <div class="line">🐦 <span class="info-label">X/Twitter:</span></div>
        <div class="line">   <a href="${LINKS.x}" target="_blank" class="accent">@scottfeltham</a></div>
        <div class="line">&nbsp;</div>
        <div class="line">🌐 <span class="info-label">GitHub:</span></div>
        <div class="line">   <a href="${LINKS.github}" target="_blank" class="accent">@scottfeltham</a></div>
        <div class="line">&nbsp;</div>
        <div class="line">📍 <span class="info-label">Location:</span></div>
        <div class="line">   <span class="accent">Dubai (Global)</span></div>
        <div class="line">&nbsp;</div>
        <div class="line"><span class="muted">[ESC] to return</span></div>
      </div>
    `;
    
    // Add ESC key handler to return to status
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        resetStatusPane();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // Auto-return after 30 seconds
    setTimeout(() => {
      resetStatusPane();
      document.removeEventListener('keydown', escHandler);
    }, 30000);
  }


  function resetStatusPane() {
    const $statusOutput = document.getElementById('status-output');
    if ($statusOutput) {
      $statusOutput.innerHTML = `
        <div class="status-section">
          <div class="line"><span class="muted">// System Status</span></div>
          <div class="line">Theme: <span id="current-theme" class="accent">${STATE.theme}</span></div>
          <div class="line">Commands: <span id="cmd-count" class="accent">${STATE.commandCount}</span> executed</div>
          <div class="line">Session: <span id="session-time" class="accent">00:00</span></div>
        </div>
      `;
      updateStatusPane();
    }
    setActivePane(0); // Return focus to main pane
  }

  // System status form functionality
  function showSystemStatus() {
    const $statusOutput = document.getElementById('status-output');
    if (!$statusOutput) return;
    
    // Switch to pane 2
    setActivePane(2);
    
    // Calculate uptime
    const elapsed = Math.floor((Date.now() - STATE.sessionStart) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    const uptime = hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : 
                   minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    // Get browser info
    const browserInfo = navigator.userAgent.includes('Chrome') ? 'Chrome' :
                       navigator.userAgent.includes('Firefox') ? 'Firefox' :
                       navigator.userAgent.includes('Safari') ? 'Safari' :
                       navigator.userAgent.includes('Edge') ? 'Edge' : 'Unknown';
    
    // Create detailed system status display
    $statusOutput.innerHTML = `
      <div class="status-section">
        <div class="line"><strong class="accent">// System Status</strong></div>
        <div class="line">&nbsp;</div>
        <div class="line">🖥️  <span class="info-label">Platform:</span></div>
        <div class="line">   <span class="accent">${navigator.platform}</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">🌐 <span class="info-label">Browser:</span></div>
        <div class="line">   <span class="accent">${browserInfo}</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">⏱️  <span class="info-label">Session:</span></div>
        <div class="line">   <span class="accent">${uptime}</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">📊 <span class="info-label">Commands:</span></div>
        <div class="line">   <span class="accent">${STATE.commandCount} executed</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">🎨 <span class="info-label">Theme:</span></div>
        <div class="line">   <span class="accent">${STATE.theme}</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">🔤 <span class="info-label">Font Size:</span></div>
        <div class="line">   <span class="accent">${STATE.fontSize}px</span></div>
        <div class="line">&nbsp;</div>
        <div class="line">💾 <span class="info-label">Local Storage:</span></div>
        <div class="line">   <span class="accent">${STATE.history.length} commands in history</span></div>
        <div class="line">&nbsp;</div>
        <div class="line"><span class="muted">[ESC] to return</span></div>
      </div>
    `;
    
    // Add ESC key handler to return to status
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        resetStatusPane();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // Auto-return after 30 seconds
    setTimeout(() => {
      resetStatusPane();
      document.removeEventListener('keydown', escHandler);
    }, 30000);
  }

  // Make functions globally available
  window.resetStatusPane = resetStatusPane;
  window.showSystemStatus = showSystemStatus;
  
  // Function to run commands from clicks
  function runCommand(cmd) {
    $input.value = cmd;
    run(cmd);
    $input.value = '';
    $input.focus();
  }
  
  window.runCommand = runCommand;

  // Prompt renderer
  function renderPrompt() {
    $prompt.innerHTML = `
      <span class="user">${SITE.user}</span>
      <span class="at">@</span>
      <span class="host">${SITE.host}</span>:
      <span class="path">${SITE.path}</span>$`;
  }

  renderPrompt();

  // Terminal line counter for animation delays
  let terminalLineCount = 0;

  function line(html, className = '', options = {}) {
    const { 
      animated = true, 
      typewriter = false, 
      delay = 0,
      isLast = false 
    } = options;
    
    const el = document.createElement('div');
    
    // Add base classes
    let classes = 'line';
    if (className) classes += ` ${className}`;
    
    // Add animation classes if enabled
    if (animated && !className.includes('banner-line')) {
      classes += ' terminal-line';
      if (typewriter) classes += ' typewriter';
      if (isLast) classes += ' with-cursor';
      
      // Set initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      if (typewriter) {
        el.style.width = '0';
        el.style.overflow = 'hidden';
        el.style.whiteSpace = 'nowrap';
      }
    }
    
    el.className = classes;
    el.innerHTML = html;
    $output.appendChild(el);
    
    // Trigger animation if enabled
    if (animated && !className.includes('banner-line')) {
      const animationDelay = delay + (terminalLineCount * 50); // Stagger by 50ms
      terminalLineCount++;
      
      setTimeout(() => {
        requestAnimationFrame(() => {
          el.classList.add('animate');
          
          // Remove cursor from previous line
          if (isLast) {
            const prevLines = $output.querySelectorAll('.terminal-line.with-cursor');
            prevLines.forEach(line => {
              if (line !== el) line.classList.remove('with-cursor');
            });
          }
        });
      }, animationDelay);
    }
    
    scrollToBottom();
  }
  
  // Helper functions for different line types
  function lineAnimated(html, className = '', delay = 0) {
    line(html, className, { animated: true, delay });
  }
  
  function lineTypewriter(html, className = '', delay = 0, isLast = false) {
    line(html, className, { animated: true, typewriter: true, delay, isLast });
  }

  // CRT refresh animation for neofetch info pane
  function startCRTRefresh() {
    const infoOutput = document.getElementById('info-output');
    const neofetchSection = infoOutput?.querySelector('.neofetch-section');
    
    if (!neofetchSection) return;
    
    // Prepare lines for CRT animation
    prepareNeofetchForCRT(neofetchSection);
    
    // Start the CRT refresh cycle
    crtRefreshCycle();
  }
  
  function prepareNeofetchForCRT(section) {
    const lines = section.querySelectorAll('.line');
    
    lines.forEach((line, lineIndex) => {
      line.classList.add('crt-refresh-line');
      const originalHTML = line.innerHTML;
      
      // Convert text content to individual character spans
      const wrappedHTML = wrapTextInCharSpans(originalHTML);
      line.innerHTML = wrappedHTML;
    });
  }
  
  function wrapTextInCharSpans(html) {
    // Simplified approach: split by characters and wrap each non-space character
    let result = '';
    const textContent = html.replace(/<[^>]*>/g, ''); // Remove HTML tags for simplicity
    
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      if (char === ' ') {
        result += ' ';
      } else if (char.trim()) {
        result += `<span class="crt-char">${char}</span>`;
      } else {
        result += char;
      }
    }
    
    return result;
  }
  
  function crtRefreshCycle() {
    const infoOutput = document.getElementById('info-output');
    const lines = infoOutput?.querySelectorAll('.crt-refresh-line');
    
    if (!lines || lines.length === 0) return;
    
    let currentLine = 0;
    
    function refreshLine() {
      if (currentLine >= lines.length) {
        // Add subtle screen flash when cycle completes
        const infoPane = document.getElementById('info-output');
        infoPane.style.filter = 'brightness(1.2)';
        infoPane.style.transition = 'filter 0.2s ease-out';
        
        setTimeout(() => {
          infoPane.style.filter = 'none';
        }, 200);
        
        // Cycle complete, start over after a longer delay
        setTimeout(() => {
          currentLine = 0;
          refreshLine();
        }, 3000); // Slower restart - 3 seconds
        return;
      }
      
      const line = lines[currentLine];
      const chars = line.querySelectorAll('.crt-char');
      
      if (chars.length === 0) {
        currentLine++;
        setTimeout(refreshLine, 50);
        return;
      }
      
      // Calculate total scan time based on line length
      const scanTimePerChar = 60; // 60ms per character
      const totalScanTime = chars.length * scanTimePerChar;
      
      // Add scanline that moves across the line with calculated timing
      const scanline = document.createElement('div');
      scanline.className = 'crt-scanline';
      scanline.style.animationDuration = `${totalScanTime}ms`;
      scanline.style.animationTimingFunction = 'linear';
      scanline.style.animationIterationCount = '1';
      line.appendChild(scanline);
      
      // Scan across each character sequentially, synchronized with scanline
      scanCharactersSequentially(chars, 0, scanTimePerChar, () => {
        // Remove scanline after line is complete
        setTimeout(() => {
          if (scanline.parentNode) {
            scanline.remove();
          }
        }, 100);
        
        // Move to next line
        currentLine++;
        setTimeout(refreshLine, 200);
      });
    }
    
    function scanCharactersSequentially(chars, charIndex, scanTimePerChar, onComplete) {
      if (charIndex >= chars.length) {
        onComplete();
        return;
      }
      
      const char = chars[charIndex];
      const scanDelay = charIndex * scanTimePerChar;
      
      // Schedule this character to be scanned at the right time
      setTimeout(() => {
        // Make character flicker as it's being "scanned"
        char.classList.add('scanning');
        
        setTimeout(() => {
          char.classList.remove('scanning');
          char.classList.add('flash');
          
          setTimeout(() => {
            char.classList.remove('flash');
          }, 20); // Brief flash duration
          
        }, scanTimePerChar * 0.7); // Scan for most of the duration
        
      }, scanDelay);
      
      // Continue to next character immediately (scheduling all at once)
      scanCharactersSequentially(chars, charIndex + 1, scanTimePerChar, onComplete);
    }
    
    refreshLine();
  }
  
  function generateRandomFlickerPattern(length) {
    const pattern = [];
    const maxDelay = 100; // Faster, more aggressive
    
    // Create dramatic random delays with heavy clustering
    for (let i = 0; i < length; i++) {
      // High chance for characters to flicker in dramatic groups
      const baseDelay = Math.random() * maxDelay;
      const clustering = Math.random() < 0.6 ? Math.random() * 30 : 0; // High clustering frequency
      pattern.push(Math.floor(baseDelay + clustering));
    }
    
    return pattern;
  }

  function br() { line('&nbsp;'); }

  function scrollToBottom() {
    // Ensure we scroll the terminal pane, not just the output
    const terminalPane = $output.closest('.tmux-pane');
    if (terminalPane) {
      terminalPane.scrollTop = terminalPane.scrollHeight;
    }
    // Also scroll the output container as backup
    $output.parentElement.scrollTop = $output.parentElement.scrollHeight;
    
    // Force a brief delay to ensure DOM is updated
    setTimeout(() => {
      if (terminalPane) {
        terminalPane.scrollTop = terminalPane.scrollHeight;
      }
      $output.parentElement.scrollTop = $output.parentElement.scrollHeight;
    }, 10);
  }

  function saveHistory() {
    localStorage.setItem('cli_history', JSON.stringify(STATE.history.slice(-200)));
  }

  function applyTheme(theme) {
    const cls = `theme-${theme}`;
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-matrix', 'theme-retro', 'theme-catppuccin', 'theme-tokyo-night', 'theme-nord', 'theme-dracula');
    document.body.classList.add(cls);
    localStorage.setItem('theme', theme);
    STATE.theme = theme;
    if (typeof updateStatusPane === 'function') updateStatusPane();
  }

  function applyFontSize(size) {
    const clampedSize = Math.max(10, Math.min(24, size));
    document.body.style.fontSize = `${clampedSize}px`;
    localStorage.setItem('fontSize', clampedSize);
    STATE.fontSize = clampedSize;
  }

  function banner() {
    const terminalWidth = Math.floor($output.parentElement.clientWidth / 8.4); // Approximate char width
    
    let art;
    if (terminalWidth >= 110) {
      // Full banner for wide screens
      art = [
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 0 },
        { content: '', class: '', delay: 0.1 },
        { content: '   <span class="banner-glow">███████╗ ██████╗ ██████╗ ████████╗████████╗    ███████╗███████╗██╗  ████████╗██╗  ██╗ █████╗ ███╗   ███╗</span>', class: 'ascii-line', delay: 0.2 },
        { content: '   <span class="banner-glow">██╔════╝██╔════╝██╔═══██╗╚══██╔══╝╚══██╔══╝    ██╔════╝██╔════╝██║  ╚══██╔══╝██║  ██║██╔══██╗████╗ ████║</span>', class: 'ascii-line', delay: 0.3 },
        { content: '   <span class="banner-glow">███████╗██║     ██║   ██║   ██║      ██║       █████╗  █████╗  ██║     ██║   ███████║███████║██╔████╔██║</span>', class: 'ascii-line', delay: 0.4 },
        { content: '   <span class="banner-glow">╚════██║██║     ██║   ██║   ██║      ██║       ██╔══╝  ██╔══╝  ██║     ██║   ██╔══██║██╔══██║██║╚██╔╝██║</span>', class: 'ascii-line', delay: 0.5 },
        { content: '   <span class="banner-glow">███████║╚██████╗╚██████╔╝   ██║      ██║       ██║     ███████╗███████╗██║   ██║  ██║██║  ██║██║ ╚═╝ ██║</span>', class: 'ascii-line', delay: 0.6 },
        { content: '   <span class="banner-glow">╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝       ╚═╝     ╚══════╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝</span>', class: 'ascii-line', delay: 0.7 },
        { content: '', class: '', delay: 0.8 },
        { content: '                                    <span class="accent">Senior Engineering Consultant | AI-First Leader</span>', class: 'tagline', delay: 0.9 },
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 1.0 }
      ];
    } else if (terminalWidth >= 70) {
      // Compact banner for medium screens
      art = [
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 0 },
        { content: '', class: '', delay: 0.1 },
        { content: '  <span class="banner-glow">███████╗ ██████╗ ██████╗ ████████╗████████╗</span>', class: 'ascii-line', delay: 0.2 },
        { content: '  <span class="banner-glow">██╔════╝██╔════╝██╔═══██╗╚══██╔══╝╚══██╔══╝</span>', class: 'ascii-line', delay: 0.3 },
        { content: '  <span class="banner-glow">███████╗██║     ██║   ██║   ██║      ██║   </span>', class: 'ascii-line', delay: 0.4 },
        { content: '  <span class="banner-glow">╚════██║██║     ██║   ██║   ██║      ██║   </span>', class: 'ascii-line', delay: 0.5 },
        { content: '  <span class="banner-glow">███████║╚██████╗╚██████╔╝   ██║      ██║   </span>', class: 'ascii-line', delay: 0.6 },
        { content: '  <span class="banner-glow">╚══════╝ ╚═════╝ ╚═════╝    ╚═╝      ╚═╝   </span>', class: 'ascii-line', delay: 0.7 },
        { content: '', class: '', delay: 0.8 },
        { content: '  <span class="banner-glow">███████╗███████╗██╗  ████████╗██╗  ██╗ █████╗ ███╗   ███╗</span>', class: 'ascii-line', delay: 0.9 },
        { content: '  <span class="banner-glow">██╔════╝██╔════╝██║  ╚══██╔══╝██║  ██║██╔══██╗████╗ ████║</span>', class: 'ascii-line', delay: 1.0 },
        { content: '  <span class="banner-glow">█████╗  █████╗  ██║     ██║   ███████║███████║██╔████╔██║</span>', class: 'ascii-line', delay: 1.1 },
        { content: '  <span class="banner-glow">██╔══╝  ██╔══╝  ██║     ██║   ██╔══██║██╔══██║██║╚██╔╝██║</span>', class: 'ascii-line', delay: 1.2 },
        { content: '  <span class="banner-glow">██║     ███████╗███████╗██║   ██║  ██║██║  ██║██║ ╚═╝ ██║</span>', class: 'ascii-line', delay: 1.3 },
        { content: '  <span class="banner-glow">╚═╝     ╚══════╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝</span>', class: 'ascii-line', delay: 1.4 },
        { content: '', class: '', delay: 1.5 },
        { content: '                <span class="accent">Senior Engineering Consultant | AI-First Leader</span>', class: 'tagline', delay: 1.6 },
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 1.7 }
      ];
    } else {
      // Simple text banner for small screens
      art = [
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 0 },
        { content: '', class: '', delay: 0.1 },
        { content: '  <strong class="accent banner-glow" style="font-size: 2em;">SCOTT FELTHAM</strong>', class: 'ascii-line', delay: 0.2 },
        { content: '', class: '', delay: 0.3 },
        { content: '         <span class="accent">Senior Engineering Consultant | AI-First Leader</span>', class: 'tagline', delay: 0.4 },
        { content: '<span class="muted">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', class: 'border-line', delay: 0.5 }
      ];
    }
    
    // Render banner lines with animation classes and delays
    art.forEach((item, index) => {
      setTimeout(() => {
        const lineClass = item.class ? `banner-line ${item.class}` : 'banner-line';
        
        const el = document.createElement('div');
        el.className = `line ${lineClass}`.trim();
        el.innerHTML = item.content;
        
        // Force initial state for animations
        if (item.class === 'border-line') {
          el.style.transform = 'scaleX(0)';
          el.style.opacity = '0';
        } else if (item.class === 'ascii-line') {
          el.style.transform = 'translateX(-20px)';
          el.style.opacity = '0';
        } else if (item.class === 'tagline') {
          el.style.transform = 'translateY(10px)';
          el.style.opacity = '0';
        } else {
          el.style.opacity = '0';
        }
        
        $output.appendChild(el);
        
        // Trigger animation after a brief delay
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.add('animate');
          });
        });
      }, item.delay * 100); // Convert to milliseconds and stagger
    });
    
    scrollToBottom();
  }

  const HELP = [
    '<strong>Available commands</strong>',
    '  <a href="#" onclick="runCommand(\'help\'); return false;">help</a>                Show this help',
    '  <a href="#" onclick="runCommand(\'banner\'); return false;">banner</a>              Show the site banner',
    '  <a href="#" onclick="runCommand(\'whoami\'); return false;">whoami</a>              About Scott',
    '  <a href="#" onclick="runCommand(\'about\'); return false;">about</a>               Longer bio and recent impact',
    '  <a href="#" onclick="runCommand(\'consulting\'); return false;">consulting</a>          NeoForge Consulting services',
    '  <a href="#" onclick="runCommand(\'neurocademy\'); return false;">neurocademy</a>         AI-powered learning platform',
    '  <a href="#" onclick="runCommand(\'forge\'); return false;">forge</a>               FORGE Framework methodology',
    '  <a href="#" onclick="runCommand(\'achievements\'); return false;">achievements</a>        Recent measurable impact',
    '  <a href="#" onclick="runCommand(\'projects\'); return false;">projects</a>            All highlighted projects',
    '  <a href="#" onclick="runCommand(\'skills\'); return false;">skills</a>              Technical expertise and stack',
    '  <a href="#" onclick="runCommand(\'contact\'); return false;">contact</a>             Ways to get in touch',
    '  <a href="#" onclick="runCommand(\'social\'); return false;">social</a>              Quick links',
    '  <a href="#" onclick="runCommand(\'status\'); return false;">status</a>              System status and info',
    '  open &lt;alias|url&gt;   Open link: <a href="#" onclick="runCommand(\'open github\'); return false;">github</a> | <a href="#" onclick="runCommand(\'open linkedin\'); return false;">linkedin</a> | <a href="#" onclick="runCommand(\'open x\'); return false;">x</a> | <a href="#" onclick="runCommand(\'open email\'); return false;">email</a> | <a href="#" onclick="runCommand(\'open resume\'); return false;">resume</a> | <a href="#" onclick="runCommand(\'open neoforge\'); return false;">neoforge</a> | <a href="#" onclick="runCommand(\'open neurocademy\'); return false;">neurocademy</a>',
    '  theme &lt;name&gt;        Switch theme: <a href="#" onclick="runCommand(\'theme dark\'); return false;">dark</a> | <a href="#" onclick="runCommand(\'theme light\'); return false;">light</a> | <a href="#" onclick="runCommand(\'theme matrix\'); return false;">matrix</a> | <a href="#" onclick="runCommand(\'theme retro\'); return false;">retro</a> | <a href="#" onclick="runCommand(\'theme catppuccin\'); return false;">catppuccin</a> | <a href="#" onclick="runCommand(\'theme tokyo-night\'); return false;">tokyo-night</a> | <a href="#" onclick="runCommand(\'theme nord\'); return false;">nord</a> | <a href="#" onclick="runCommand(\'theme dracula\'); return false;">dracula</a>',
    '  fontsize &lt;size|+|-&gt; Adjust font: <a href="#" onclick="runCommand(\'fontsize +\'); return false;">+</a> | <a href="#" onclick="runCommand(\'fontsize -\'); return false;">-</a> | <a href="#" onclick="runCommand(\'fontsize 14\'); return false;">reset</a> (Ctrl+/- shortcuts)',
    '  <a href="#" onclick="runCommand(\'clear\'); return false;">clear</a>               Clear the screen',
    '  <a href="#" onclick="runCommand(\'time\'); return false;">time</a>                Current time',
    '  <a href="#" onclick="runCommand(\'date\'); return false;">date</a>                Current date',
    '  echo &lt;text&gt;         Print text',
  ];

  const COMMANDS = {
    help() { 
      terminalLineCount = 0;
      HELP.forEach((h, index) => {
        if (index === HELP.length - 1) {
          lineTypewriter(h, '', index * 80, true); // Last line with cursor
        } else {
          lineAnimated(h, '', index * 80);
        }
      });
    },

    banner() { banner(); },

    whoami() {
      // Reset counter for command output
      terminalLineCount = 0;
      
      lineAnimated('<strong>Scott Feltham</strong> — Senior Engineering Consultant & AI-First Engineering Leader', '', 0);
      lineAnimated('', '', 50);
      lineAnimated('<strong>What I Bring:</strong>', '', 100);
      lineAnimated('• <strong>High Agency:</strong> I take initiative and drive results', '', 150);
      lineAnimated('• <strong>Adaptability:</strong> I learn fast and apply new technologies quickly', '', 200);
      lineAnimated('• <strong>Curiosity:</strong> I ask better questions to solve real problems', '', 250);
      lineAnimated('• <strong>Speed of Execution:</strong> I ship solutions, then perfect them', '', 300);
      lineAnimated('', '', 350);
      lineAnimated('<strong>Current Focus:</strong>', '', 400);
      lineAnimated(`• Founder of <a href="${LINKS.neoforge}" target="_blank" rel="noopener"><strong>NeoForge Consulting</strong></a> (Senior Engineering Consultant services)`, '', 450);
      lineAnimated(`• Creator of <a href="${LINKS.neurocademy}" target="_blank" rel="noopener"><strong>Neurocademy</strong></a> (AI-powered education platform)`, '', 500);
      lineAnimated('• Developing FORGE Framework for delivery acceleration', '', 550);
      lineAnimated('', '', 600);
      lineAnimated('<strong>Experience:</strong> 20+ years | <strong>Location:</strong> Dubai (working globally)', '', 650);
      lineAnimated('', '', 700);
      lineTypewriter('I excel at taking ownership, shipping iteratively, and building teams that think like owners.', '', 750, true);
    },

    about() {
      const lines = [
        'I\'m a <strong>Senior Engineering Consultant and AI-First Engineering Leader</strong> with over 20 years of',
        'experience transforming engineering organizations and scaling SaaS platforms.',
        '',
        '<strong>My Journey:</strong>',
        '• Started in defense systems (General Dynamics, 1998-2005)',
        '• Evolved through startups, agencies, and scale-ups',
        '• Led engineering at Builder.ai, Kahunas, mkodo, and others',
        '• Now building NeoForge Consulting and Neurocademy',
        '',
        '<strong>What I Do Best:</strong>',
        '• <strong>AI Integration:</strong> Embedding AI into engineering practices to double output',
        '• <strong>Team Scaling:</strong> Building high-performing, autonomous engineering teams',
        '• <strong>Delivery Acceleration:</strong> Using FORGE Framework for faster, quality shipping',
        '• <strong>Strategic Leadership:</strong> Technical roadmaps, governance, and decision-making',
        '',
        '<strong>Philosophy:</strong>',
        'I believe in <strong>shipping good today beats perfect tomorrow</strong>. I lead by doing,',
        'partner closely with product and design, and focus on pragmatic solutions that scale.',
        'Organizations that value speed, iteration, and results are where I thrive.',
        '',
        '<strong>Current Mission:</strong>',
        'Helping startups and SMEs adopt AI-driven delivery practices while building',
        'educational tools that support neurodivergent learners.'
      ];
      lines.forEach(line);
    },

    projects() {
      line('<strong>Current Ventures:</strong>');
      line('');
      line(`• <strong><a href="${LINKS.neoforge}" target="_blank" rel="noopener">NeoForge Consulting</a></strong>`);
      line('  Senior Engineering Consultant services specializing in AI adoption and modern delivery practices.');
      line('  Helping startups and SMEs build scalable engineering organizations.');
      line('');
      line(`• <strong><a href="${LINKS.neurocademy}" target="_blank" rel="noopener">Neurocademy</a></strong>`);
      line('  AI-powered learning platform for neurodivergent-friendly education.');
      line('  Built during 30-day Bolt.new hackathon, focusing on inclusive lesson planning.');
      line('');
      line('<strong>Key Projects & Achievements:</strong>');
      line('');
      line('• <strong>FORGE Framework</strong>');
      line('  Delivery acceleration methodology: Focus → Orchestrate → Refine → Generate → Evaluate.');
      line('  Proven to double team velocity while maintaining quality.');
      line('');
      line('• <strong>Kahunas Engineering Leadership</strong>');
      line('  VP Engineering role: 2x developer productivity, 99.9% uptime during scale-up.');
      line('  Led 20+ person engineering organization through AI-first transformation.');
      line('');
      line('• <strong>mkodo SaaS Launch</strong>');
      line('  Head of Engineering: Delivered GeoLocs from concept to production in 8 months.');
      line('  Built for regulated markets with compliance and rapid iteration.');
      line('');
      line('• <strong>Builder.ai Architecture Guild</strong>');
      line('  Senior Technical Architect: Led automation, scalability patterns, team development.');
      line('  Mentored 8 engineers to senior roles, supported GCC region client engagements.');
      line('');
      line(`• <strong><a href="${LINKS.github}" target="_blank" rel="noopener">Open Source & Experiments</a></strong>`);
      line('  Tools, CLIs, and UI experiments shared publicly.');
      line('  This interactive CLI site built with vanilla JavaScript.');
    },

    skills() {
      [
        '<strong>Leadership & Strategy:</strong>',
        '• Senior Engineering Consultant services and technical roadmap definition',
        '• Team scaling from 5 to 50+ engineers with sustainable practices',
        '• AI adoption strategies that double developer productivity',
        '• FORGE Framework methodology for accelerated delivery',
        '',
        '<strong>AI & Modern Stack:</strong>',
        '• <strong>AI/ML:</strong> Claude, GPT-4, GitHub Copilot, prompt engineering at scale',
        '• <strong>Cloud:</strong> AWS (expert), GCP, Azure, Terraform infrastructure-as-code',
        '• <strong>Languages:</strong> Python, Go, TypeScript/JavaScript, Ruby, C#, Scala, Kotlin',
        '• <strong>Frontend:</strong> React, React Native, Next.js, animations, accessibility',
        '• <strong>Backend:</strong> APIs, microservices, auth systems, event-driven architecture',
        '',
        '<strong>Engineering Excellence:</strong>',
        '• <strong>Testing:</strong> TDD/BDD, automated testing pipelines, quality gates',
        '• <strong>DevOps:</strong> CI/CD, containerization, monitoring, observability',
        '• <strong>Performance:</strong> System optimization, scaling, 99.9% uptime delivery',
        '• <strong>Security:</strong> Secure coding, compliance, vulnerability management',
        '',
        '<strong>Key Strengths:</strong>',
        '• Learning new technologies quickly as business needs arise',
        '• Building teams that ship consistently and think like owners',
        '• Balancing rapid delivery with platform stability and quality',
        '• Making pragmatic technical decisions under uncertainty'
      ].forEach(line);
    },

    contact() {
      // Show contact info in main pane
      line('Opening contact form in status pane...');
      line('');
      line(`📧 Email: <a href="${LINKS.email}">scott@neoforge.co</a>`);
      line(`🔗 LinkedIn: <a href="${LINKS.linkedin}" target="_blank" rel="noopener">scottfeltham</a>`);
      line(`📍 Location: Dubai (working globally)`);
      
      // Create and display contact form in pane 2
      showContactForm();
    },

    social() { COMMANDS.contact(); },

    open(arg) {
      if (!arg) {
        line('Usage: open <alias|url>');
        line('Available aliases:');
        const aliases = Object.keys(LINKS).map(alias => `<a href="#" onclick="runCommand('open ${alias}'); return false;">${alias}</a>`);
        line('  ' + aliases.join(' | '));
        return;
      }
      const url = LINKS[arg] || (arg.startsWith('http') ? arg : `https://${arg}`);
      window.open(url, '_blank', 'noopener');
      line(`Opening: <a href="${url}" target="_blank" rel="noopener">${url}</a>`);
    },

    theme(name) {
      const valid = ['dark', 'light', 'matrix', 'retro', 'catppuccin', 'tokyo-night', 'nord', 'dracula'];
      if (!name || !valid.includes(name)) {
        line('Usage: theme <name>');
        line('Available themes:');
        const clickableThemes = valid.map(theme => `<a href="#" onclick="runCommand('theme ${theme}'); return false;">${theme}</a>`);
        line('  ' + clickableThemes.join(' | '));
        return;
      }
      applyTheme(name);
      line(`Theme set to ${name}.`);
    },

    fontsize(size) {
      if (!size) {
        line(`Current font size: ${STATE.fontSize}px`);
        line('Usage: fontsize <10-24> or quick options:');
        line('  <a href="#" onclick="runCommand(\'fontsize +\'); return false;">+</a> (increase) | <a href="#" onclick="runCommand(\'fontsize -\'); return false;">-</a> (decrease) | <a href="#" onclick="runCommand(\'fontsize 14\'); return false;">14</a> (reset)');
        return;
      }
      
      if (size === '+') {
        applyFontSize(STATE.fontSize + 1);
        line(`Font size increased to ${STATE.fontSize}px`);
      } else if (size === '-') {
        applyFontSize(STATE.fontSize - 1);
        line(`Font size decreased to ${STATE.fontSize}px`);
      } else {
        const newSize = parseInt(size);
        if (isNaN(newSize)) {
          line('Invalid font size. Use a number between 10-24, or + / - to adjust.');
          return;
        }
        applyFontSize(newSize);
        line(`Font size set to ${STATE.fontSize}px`);
      }
    },

    clear() {
      $output.innerHTML = '';
      boot();
    },

    time() { line(new Date().toLocaleTimeString()); },
    date() { line(new Date().toLocaleDateString()); },

    echo(...rest) { line(rest.join(' ')); },

    consulting() {
      line('<strong>NeoForge Consulting</strong> — Senior Engineering Consultant Services');
      line('');
      line('<strong>What I Offer:</strong>');
      line('');
      line('🚀 <strong>Senior Engineering Consultant Services</strong>');
      line('  • Strategic technical leadership and roadmap definition');
      line('  • Architecture reviews, technology selection, and governance frameworks');
      line('  • Board reporting, technical due diligence, and stakeholder communication');
      line('  • Risk assessment and mitigation strategies for scaling organizations');
      line('');
      line('🤖 <strong>AI Integration & Adoption</strong>');
      line('  • AI-first engineering practices that double developer productivity');
      line('  • GitHub Copilot, Claude, and GPT integration into development workflows');
      line('  • Prompt engineering training and best practices for engineering teams');
      line('  • ROI measurement and optimization of AI tool investments');
      line('');
      line('👥 <strong>Engineering Leadership & Team Scaling</strong>');
      line('  • Building high-performing, autonomous engineering teams');
      line('  • Hiring strategies, team structure design, and leadership development');
      line('  • Engineering culture transformation and process optimization');
      line('  • Mentoring senior engineers into technical leaders');
      line('');
      line('⚡ <strong>Delivery Acceleration</strong>');
      line('  • FORGE Framework implementation for faster, quality delivery');
      line('  • CI/CD pipeline optimization and DevOps best practices');
      line('  • Quality gates, testing strategies, and release management');
      line('  • Performance optimization and scalability planning');
      line('');
      line('<strong>Recent Client Impact:</strong>');
      line('• 2x developer productivity gains through AI adoption');
      line('• 99.9% platform availability during critical growth phases');
      line('• 8-month concept-to-production delivery for regulated markets');
      line('• 8 engineers successfully mentored to senior technical roles');
      line('');
      line('<strong>Ideal For:</strong>');
      line('Startups, scale-ups, and SMEs ready to embrace AI and modern practices,');
      line('measuring results over hours, and encouraging experimentation.');
      line('');
      line(`📧 Get in touch: <a href="${LINKS.email}">scott@neoforge.co</a>`);
      line(`🌐 Learn more: <a href="${LINKS.neoforge}" target="_blank" rel="noopener">${LINKS.neoforge}</a>`);
    },

    neurocademy() {
      line('<strong>Neurocademy</strong> — AI-Powered Learning Platform');
      line('');
      line('Built during 30-day Bolt.new hackathon (joined final 15 days)');
      line('Solving real problems in education for neurodivergent students');
      line('');
      line('• AI-powered lesson planning for teachers and parents');
      line('• Neurodivergent-friendly learning activities');
      line('• Printable lesson packs and resources');
      line('• Building in public using FORGE Framework');
      line('');
      line(`→ <a href="${LINKS.neurocademy}" target="_blank" rel="noopener">${LINKS.neurocademy}</a>`);
    },

    forge() {
      line('<strong>FORGE Framework</strong> — Delivery Acceleration Methodology');
      line('');
      line('<strong>F</strong>ocus — Define clear objectives and priorities');
      line('<strong>O</strong>rchestrate — Coordinate resources and dependencies');
      line('<strong>R</strong>efine — Iterate and improve continuously');
      line('<strong>G</strong>enerate — Create solutions rapidly');
      line('<strong>E</strong>valuate — Measure impact and learn');
      line('');
      line(`Used to build <a href="${LINKS.neurocademy}" target="_blank" rel="noopener">Neurocademy</a> and scale engineering teams.`);
      line('Proven to double delivery velocity while maintaining quality.');
      line('');
      line(`Part of <a href="${LINKS.neoforge}" target="_blank" rel="noopener">NeoForge Consulting</a> methodology.`);
    },

    achievements() {
      line('<strong>Quantified Impact & Achievements</strong>');
      line('');
      line('<strong>🚀 AI & Productivity Transformation (Kahunas - 2025)</strong>');
      line('• <strong>2x developer productivity</strong> through AI-first practices implementation');
      line('• <strong>99.9% platform availability</strong> during critical scale-up phase');
      line('• Led 20+ person engineering organization through AI adoption');
      line('• Balanced rapid feature delivery with platform stability');
      line('');
      line('<strong>⚡ Rapid SaaS Delivery (mkodo - 2022)</strong>');
      line('• Delivered GeoLocs from <strong>concept to production in 8 months</strong>');
      line('• Built for regulated markets with compliance requirements');
      line('• Managed complete product lifecycle as Head of Engineering');
      line('• Made rapid decisions to maintain momentum under pressure');
      line('');
      line('<strong>👥 Leadership & Team Development (Builder.ai - 2023-2025)</strong>');
      line('• <strong>Mentored 8 direct reports</strong> to senior technical roles');
      line('• Led Architecture Guild creating automation and scalable patterns');
      line('• Supported GCC region clients with technical pre-sales');
      line('• Built systems designed for reliability and future growth');
      line('');
      line('<strong>🏗️ Innovation Under Pressure</strong>');
      line(`• Built <a href="${LINKS.neurocademy}" target="_blank" rel="noopener">Neurocademy</a> during <strong>30-day hackathon</strong> (joined final 15 days)`);
      line('• Created <strong>FORGE Framework</strong> now adopted by multiple teams');
      line('• Maintained SaaS operations through company acquisition (Moltin/Elastic Path)');
      line('• <strong>Zero downtime</strong> during organizational transitions');
      line('');
      line('<strong>📈 Career Evolution & Adaptability</strong>');
      line('• <strong>20+ years</strong> of continuous adaptation across industries');
      line('• Evolved from defense systems → SaaS → AI-first engineering');
      line('• Self-taught AI prompt engineering, now training entire teams');
      line('• Successfully navigated multiple technology transitions');
      line('');
      line('<strong>Current Initiatives (2025):</strong>');
      line('• Building two ventures while maintaining consulting excellence');
      line('• Developing and refining FORGE Framework methodology');
      line('• Creating AI-powered educational tools for neurodivergent learners');
      line('• Sharing knowledge through public building and open documentation');
    },

    status() {
      // Show system status info in main pane
      line('System status panel opening...');
      line('');
      
      // Calculate uptime
      const elapsed = Math.floor((Date.now() - STATE.sessionStart) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const uptime = hours > 0 ? `${hours}h ${minutes}m` : 
                     minutes > 0 ? `${minutes}m` : 'less than 1m';
      
      line(`💻 Platform: ${navigator.platform}`);
      line(`⏱️  Session: ${uptime}`);
      line(`📊 Commands: ${STATE.commandCount} executed`);
      line(`🎨 Theme: ${STATE.theme}`);
      
      // Create and display detailed status in pane 2
      showSystemStatus();
    },

    echo(...rest) { line(rest.join(' ')); },
  };

  function parse(input) {
    const parts = input.trim().split(/\s+/);
    const [cmd, ...args] = parts;
    return { cmd: (cmd || '').toLowerCase(), args };
  }

  function run(raw) {
    if (!raw.trim()) return;

    // Update command counter
    STATE.commandCount++;
    updateStatusPane();

    // Clear previous output and reset animation counter
    $output.innerHTML = '';
    terminalLineCount = 0;
    
    // Show banner first (no delay)
    banner();
    
    // Add welcome content with delays
    setTimeout(() => {
      lineAnimated('&nbsp;', '', 50);
      lineAnimated('<strong class="accent">Welcome to my interactive CLI portfolio!</strong>', '', 100);
      lineAnimated('&nbsp;', '', 150);
      lineAnimated('Available commands:', '', 200);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'whoami\'); return false;">whoami</a></strong>       - Learn about me', '', 250);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'consulting\'); return false;">consulting</a></strong>   - Senior Engineering Consultant services', '', 300);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'neurocademy\'); return false;">neurocademy</a></strong>  - AI learning platform', '', 350);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'achievements\'); return false;">achievements</a></strong> - Recent impact', '', 400);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'help\'); return false;">help</a></strong>         - See all commands', '', 450);
      lineAnimated('&nbsp;', '', 500);
      
      // Print the prompt + command with typewriter effect
      setTimeout(() => {
        lineTypewriter(`<span class=\"user\">${SITE.user}</span>@<span class=\"host\">${SITE.host}</span>:<span class=\"path\">${SITE.path}</span>$ ${escapeHtml(raw)}`, '', 0, false);
        
        // Execute command after prompt appears
        setTimeout(() => {
          const { cmd, args } = parse(raw);
          const fn = COMMANDS[cmd];
          if (fn) {
            try { fn(...args); } catch (e) { lineAnimated(`<span class=\"error\">Error:</span> ${e.message}`); }
          } else {
            lineAnimated(`Command not found: ${cmd}. Try <a href="#" onclick="runCommand('help'); return false;">help</a> to see all commands.`);
          }
          scrollToBottom();
        }, 800); // Wait for typewriter to complete
      }, 550);
    }, 1000); // Wait for banner animation
  }

  function escapeHtml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function boot() {
    if (STATE.started) return;
    
    // Reset animation counter
    terminalLineCount = 0;
    
    // Show banner first
    banner();
    
    // Add welcome content with delays
    setTimeout(() => {
      lineAnimated('&nbsp;', '', 50);
      lineAnimated('<strong class="accent">Welcome to my interactive CLI portfolio!</strong>', '', 100);
      lineAnimated('&nbsp;', '', 150);
      lineAnimated('Available commands:', '', 200);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'whoami\'); return false;">whoami</a></strong>       - Learn about me', '', 250);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'consulting\'); return false;">consulting</a></strong>   - Senior Engineering Consultant services', '', 300);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'neurocademy\'); return false;">neurocademy</a></strong>  - AI learning platform', '', 350);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'achievements\'); return false;">achievements</a></strong> - Recent impact', '', 400);
      lineAnimated('  <strong><a href="#" onclick="runCommand(\'help\'); return false;">help</a></strong>         - See all commands', '', 450);
      lineAnimated('&nbsp;', '', 500);
      lineAnimated('💡 <span class="muted">Try typing a command and pressing Enter. Use ↑/↓ for history, Tab for autocomplete.</span>', '', 550);
      lineTypewriter('&nbsp;', '', 600, true);
    }, 1000); // Wait for banner animation
    
    STATE.started = true;
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = $input.value;
    if (!value) return;
    STATE.history.push(value);
    STATE.histIdx = STATE.history.length;
    saveHistory();
    $input.value = '';
    run(value);
  });

  $input.addEventListener('keydown', (e) => {
    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (STATE.histIdx > 0) STATE.histIdx--;
      $input.value = STATE.history[STATE.histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (STATE.histIdx < STATE.history.length) STATE.histIdx++;
      $input.value = STATE.history[STATE.histIdx] || '';
    } 
    // Tab completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const prefix = $input.value.trim().toLowerCase();
      const cmds = Object.keys(COMMANDS).filter(c => c.startsWith(prefix));
      if (cmds.length === 1) {
        $input.value = cmds[0] + ' ';
      } else if (cmds.length > 1) {
        // Show available completions as clickable commands
        br();
        line('<span class="muted">Available commands:</span>');
        const clickableCmds = cmds.map(cmd => `<a href="#" onclick="runCommand('${cmd}'); return false;">${cmd}</a>`);
        line('  ' + clickableCmds.join('  '));
        scrollToBottom();
      }
    }
    // Clear line with Ctrl+U (Unix style)
    else if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      $input.value = '';
    }
    // Clear screen with Ctrl+L
    else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      COMMANDS.clear();
    }
    // Font size shortcuts
    else if (e.ctrlKey && e.key === '=') {
      e.preventDefault();
      COMMANDS.fontsize('+');
    }
    else if (e.ctrlKey && e.key === '-') {
      e.preventDefault();
      COMMANDS.fontsize('-');
    }
    else if (e.ctrlKey && e.key === '0') {
      e.preventDefault();
      applyFontSize(14); // Reset to default
      line(`Font size reset to ${STATE.fontSize}px`);
      scrollToBottom();
    }
  });
  
  // Filter invalid characters
  $input.addEventListener('keypress', (e) => {
    // Allow printable ASCII characters, space, and control characters
    const char = e.key;
    const code = e.charCode || e.keyCode;
    
    // Allow control key combinations
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    // Allow printable characters (space to ~) and common special keys
    if (code >= 32 && code <= 126) return;
    
    // Block other characters
    if (char.length === 1 && (code < 32 || code > 126)) {
      e.preventDefault();
    }
  });

  // Tmux-style functionality
  function updateStatusPane() {
    if ($currentTheme) $currentTheme.textContent = STATE.theme;
    if ($cmdCount) $cmdCount.textContent = STATE.commandCount.toString();
    
    const elapsed = Math.floor((Date.now() - STATE.sessionStart) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    if ($sessionTime) $sessionTime.textContent = `${minutes}:${seconds}`;
  }

  function updateStatusBar() {
    if ($statusTime) {
      $statusTime.textContent = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  function setActivePane(paneNumber) {
    // Remove active class from all panes
    document.querySelectorAll('.tmux-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    
    // Add active class to selected pane
    const activePane = document.querySelector(`[data-pane="${paneNumber}"]`);
    if (activePane) {
      activePane.classList.add('active');
      STATE.activePane = paneNumber;
      
      // Focus input if main pane is active
      if (paneNumber === 0) {
        $input.focus();
      }
    }
  }


  // Keyboard shortcuts for pane switching (Ctrl+B + number)
  let ctrlBPressed = false;
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      ctrlBPressed = true;
      setTimeout(() => { ctrlBPressed = false; }, 1000); // Reset after 1 second
    } else if (ctrlBPressed) {
      const paneNum = parseInt(e.key);
      if (!isNaN(paneNum) && paneNum >= 0 && paneNum <= 2) {
        e.preventDefault();
        setActivePane(paneNum);
        ctrlBPressed = false;
      }
    }
  });

  // Click to focus panes
  document.querySelectorAll('.tmux-pane').forEach((pane, index) => {
    pane.addEventListener('click', () => {
      const paneNumber = parseInt(pane.dataset.pane);
      setActivePane(paneNumber);
    });
  });

  // Handle window resize to redraw banner if needed
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Only redraw if we're at the start and the banner is visible
      if (STATE.started && $output.children.length > 0) {
        const firstLine = $output.children[0];
        if (firstLine && firstLine.innerHTML.includes('━━━')) {
          // Clear and redraw
          $output.innerHTML = '';
          boot();
        }
      }
    }, 250); // Debounce resize events
  });

  // Initialize timers
  setInterval(updateStatusPane, 1000);
  setInterval(updateStatusBar, 1000);

  // Start
  boot();
  setActivePane(0); // Start with main pane active
  updateStatusPane();
  updateStatusBar();
  $input.focus();
  
  // Start CRT refresh animation for info pane after a short delay
  setTimeout(startCRTRefresh, 1000); // Fast start - 1 second
})();

