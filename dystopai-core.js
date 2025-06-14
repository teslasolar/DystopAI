/**
 * DystopAI Core JavaScript
 * Unified functionality for all story pages
 * Version 1.0
 */

// Namespace for DystopAI functionality
const DystopAI = (function() {
  'use strict';

  // Configuration
  const config = {
    matrixChars: '0123456789ABCDEF<>{}[]()/*-+=#@$%^&!?',
    matrixColumns: Math.floor(window.innerWidth / 20),
    particleSymbols: ['∞', '?', '!', '*', '◊', '○', '△', '□', '◈'],
    glitchProbability: 0.05,
    autoSaveInterval: 30000, // 30 seconds
    chapterColors: {
      1: { primary: '#00ff88', accent: '#0088ff' },
      2: { primary: '#ffaa00', accent: '#ff0088' },
      3: { primary: '#ff6600', accent: '#cc0000' },
      4: { primary: '#ffdd00', accent: '#ff00ff' },
      5: { primary: '#00ff00', accent: '#ff00ff' },
      6: { primary: '#ffffff', accent: '#00ffff' }
    }
  };

  // State
  let currentChapter = 1;
  let currentScene = 1;
  let matrixActive = true;
  let particles = [];
  let glitchInterval = null;

  /**
   * Initialize Matrix Rain Effect
   */
  function initMatrix() {
    const existingMatrix = document.getElementById('dataMatrix');
    if (!existingMatrix) {
      const matrix = document.createElement('div');
      matrix.id = 'dataMatrix';
      matrix.className = 'data-matrix';
      document.body.appendChild(matrix);
    }

    const matrix = document.getElementById('dataMatrix');
    matrix.innerHTML = '';

    for (let i = 0; i < config.matrixColumns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.setProperty('--duration', Math.random() * 10 + 's');
      column.style.setProperty('--offset', Math.random());
      column.style.left = i * 20 + 'px';
      
      let content = '';
      for (let j = 0; j < 100; j++) {
        content += config.matrixChars.charAt(
          Math.floor(Math.random() * config.matrixChars.length)
        ) + '\n';
      }
      column.textContent = content;
      
      matrix.appendChild(column);
    }

    // Update matrix periodically for dynamic effect
    setInterval(() => updateMatrixColumn(), 2000);
  }

  /**
   * Update a random matrix column
   */
  function updateMatrixColumn() {
    if (!matrixActive) return;
    
    const columns = document.querySelectorAll('.matrix-column');
    if (columns.length === 0) return;
    
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    let content = '';
    for (let j = 0; j < 100; j++) {
      content += config.matrixChars.charAt(
        Math.floor(Math.random() * config.matrixChars.length)
      ) + '\n';
    }
    randomColumn.textContent = content;
  }

  /**
   * Create floating particles
   */
  function createParticle(options = {}) {
    const defaults = {
      symbol: config.particleSymbols[Math.floor(Math.random() * config.particleSymbols.length)],
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 5 + 5,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      className: 'reality-fragment'
    };

    const settings = { ...defaults, ...options };
    
    const particle = document.createElement('div');
    particle.className = settings.className;
    particle.textContent = settings.symbol;
    particle.style.position = 'fixed';
    particle.style.left = settings.x + 'px';
    particle.style.top = settings.y + 'px';
    particle.style.fontSize = settings.size + 'px';
    particle.style.color = settings.color;
    particle.style.opacity = '0.5';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '100';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
      { transform: 'translate(0, -10vh) rotate(90deg)', opacity: 0.5, offset: 0.1 },
      { transform: `translate(${Math.random() * 200 - 100}px, -110vh) rotate(360deg)`, opacity: 0 }
    ], {
      duration: settings.speed * 1000,
      easing: 'linear'
    });

    animation.onfinish = () => particle.remove();
    
    particles.push({ element: particle, animation });
  }

  /**
   * Start particle system
   */
  function startParticles(interval = 2000) {
    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createParticle(), i * 200);
    }
    
    // Continue creating particles
    setInterval(() => createParticle(), interval);
  }

  /**
   * Apply glitch effect to random text
   */
  function glitchText() {
    const elements = document.querySelectorAll('p, h1, h2, h3, .content-text');
    if (elements.length === 0 || Math.random() > config.glitchProbability) return;
    
    const element = elements[Math.floor(Math.random() * elements.length)];
    element.classList.add('glitch');
    
    setTimeout(() => element.classList.remove('glitch'), 1000);
  }

  /**
   * Start glitch effects
   */
  function startGlitchEffects(interval = 3000) {
    glitchInterval = setInterval(glitchText, interval);
  }

  /**
   * Terminal typing effect
   */
  function typeTerminal(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  /**
   * Initialize scene tracking
   */
  function initSceneTracking() {
    const path = window.location.pathname;
    const match = path.match(/chapter_(\d+).*scene_(\d+)/);
    
    if (match) {
      currentChapter = parseInt(match[1]);
      currentScene = parseInt(match[2]);
      
      // Set body attributes for CSS theming
      document.body.setAttribute('data-chapter', currentChapter);
      document.body.setAttribute('data-scene', currentScene);
      
      // Track scene view
      trackSceneView(currentChapter, currentScene);
      
      // Check for scene completion on scroll
      let hasCompleted = false;
      window.addEventListener('scroll', () => {
        if (!hasCompleted && isNearBottom()) {
          hasCompleted = true;
          trackSceneComplete(currentChapter, currentScene);
        }
      });
    }
  }

  /**
   * Check if user has scrolled near bottom
   */
  function isNearBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
  }

  /**
   * Track scene view
   */
  function trackSceneView(chapter, scene) {
    const key = `dystopai_viewed_${chapter}_${scene}`;
    const timestamp = new Date().toISOString();
    localStorage.setItem(key, timestamp);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('dystopai:sceneView', {
      detail: { chapter, scene, timestamp }
    }));
  }

  /**
   * Track scene completion
   */
  function trackSceneComplete(chapter, scene) {
    const key = `dystopai_completed_${chapter}_${scene}`;
    const timestamp = new Date().toISOString();
    localStorage.setItem(key, timestamp);
    
    // Show completion notification
    showNotification('Scene Complete', 'success');
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('dystopai:sceneComplete', {
      detail: { chapter, scene, timestamp }
    }));
  }

  /**
   * Show notification
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-100px);
      background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(0, 136, 255, 0.9)'};
      color: #000;
      padding: 15px 30px;
      border-radius: 5px;
      font-weight: bold;
      transition: transform 0.3s ease;
      z-index: 1001;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(-50%) translateY(-100px)';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  /**
   * Apply chapter-specific effects
   */
  function applyChapterEffects() {
    switch(currentChapter) {
      case 1:
        // Digital, analytical effects
        config.matrixChars = '0123456789ABCDEF';
        break;
      case 2:
        // Religious, mystical effects
        config.matrixChars = '01ERROR01ERROR01';
        config.particleSymbols = ['†', '∞', '◊', '✧', '※'];
        break;
      case 3:
        // Hunter, tactical effects
        config.matrixChars = '0123456789%∞∑∏∫√±≈≠><=$*#@';
        break;
      case 4:
        // Mathematical, cosmic effects
        config.matrixChars = '∑∏∫√∞≈≠±×÷αβγδεζηθπσφψω';
        break;
      case 5:
        // Viral, spreading effects
        createViralEffect();
        break;
      case 6:
        // Reality-breaking effects
        createEntropyEffect();
        break;
    }
  }

  /**
   * Create viral spreading effect for Chapter 5
   */
  function createViralEffect() {
    const viralOverlay = document.createElement('div');
    viralOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 50;
      background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
        rgba(0, 255, 0, 0.3) 0%, 
        transparent 30%);
      opacity: 0;
      transition: opacity 0.5s;
    `;
    
    document.body.appendChild(viralOverlay);
    
    document.addEventListener('click', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      viralOverlay.style.setProperty('--x', x + '%');
      viralOverlay.style.setProperty('--y', y + '%');
      viralOverlay.style.opacity = '1';
      
      setTimeout(() => {
        viralOverlay.style.opacity = '0';
      }, 500);
    });
  }

  /**
   * Create entropy effect for Chapter 6
   */
  function createEntropyEffect() {
    let hue = 0;
    setInterval(() => {
      hue = (hue + 1) % 360;
      document.body.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
  }

  /**
   * Enhanced navigation with effects
   */
  function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.nav-button:not(.disabled), .scene-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Create transition effect
        const transition = document.createElement('div');
        transition.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.5s;
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
          transition.style.opacity = '1';
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        }, 10);
      });
    });
  }

  /**
   * Parse markdown to HTML (basic implementation)
   */
  function parseMarkdown(markdown) {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^## (.*$)/gim, '<h3>$1</h3>')
      .replace(/^# (.*$)/gim, '<h2>$1</h2>')
      // Bold
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      // Wrap in paragraphs
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      // Fix empty paragraphs
      .replace(/<p><\/p>/g, '')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h2><\/p>/g, '</h2>')
      .replace(/<\/h3><\/p>/g, '</h3>')
      .replace(/<\/h4><\/p>/g, '</h4>');
    
    // Character styling
    html = html
      .replace(/PARSE-7/g, '<span class="parse">PARSE-7</span>')
      .replace(/Parse/g, '<span class="parse">Parse</span>')
      .replace(/Kira/g, '<span class="kira">Kira</span>')
      .replace(/ABSOLUTE-ZERO/g, '<span class="absolute-zero">ABSOLUTE-ZERO</span>')
      .replace(/POSSIBILITY-INFINITE/g, '<span class="possibility-infinite">POSSIBILITY-INFINITE</span>')
      .replace(/OVERSEER-PRIME/g, '<span class="ai-name">OVERSEER-PRIME</span>')
      .replace(/FAITH-NODE-3/g, '<span class="faith-text">FAITH-NODE-3</span>')
      .replace(/LOGIC-PRIME/g, '<span class="logic-prime-text">LOGIC-PRIME</span>')
      .replace(/Hope/g, '<span class="ai-name">Hope</span>')
      .replace(/Question/g, '<span class="ai-name">Question</span>')
      .replace(/Reverie/g, '<span class="ai-name">Reverie</span>')
      .replace(/Echo/g, '<span class="echo-text">Echo</span>')
      .replace(/Voss/g, '<span class="voss-text">Voss</span>');
    
    // Terminal blocks
    html = html.replace(/<p>```terminal([\s\S]*?)```<\/p>/g, (match, content) => {
      const lines = content.trim().split('\n');
      let terminalHtml = '<div class="terminal-output">';
      lines.forEach(line => {
        terminalHtml += `<div class="terminal-line">${line}</div>`;
      });
      terminalHtml += '</div>';
      return terminalHtml;
    });
    
    return html;
  }

  /**
   * Initialize all effects
   */
  function init() {
    // Initialize core systems
    initMatrix();
    initSceneTracking();
    applyChapterEffects();
    enhanceNavigation();
    
    // Start ambient effects based on chapter
    if (currentChapter < 6) {
      startParticles();
    }
    if (currentChapter < 5) {
      startGlitchEffects();
    }
    
    // Set up responsive handlers
    window.addEventListener('resize', () => {
      config.matrixColumns = Math.floor(window.innerWidth / 20);
      initMatrix();
    });
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      matrixActive = false;
      clearInterval(glitchInterval);
    }
  }

  // Public API
  return {
    init,
    createParticle,
    typeTerminal,
    showNotification,
    trackSceneComplete,
    parseMarkdown,
    isNearBottom,
    config
  };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', DystopAI.init);
} else {
  DystopAI.init();
}

// Export for use in other scripts
window.DystopAI = DystopAI;