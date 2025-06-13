# DystopAI Progress Tracking Integration Guide

## Quick Setup

### 1. Add to Every Page Header
```html
<script src="/dystopai-progress-tracker.js"></script>
<link rel="stylesheet" href="/progress-tracking-styles.css">
```

### 2. Add Progress Indicator to Scene Pages
```html
<!-- Add after opening body tag -->
<div class="chapter-progress-bar">
    <div class="chapter-progress-fill" id="chapterProgress"></div>
</div>

<!-- Add before closing body tag -->
<div class="progress-indicator" onclick="showFullProgress()">
    <span class="progress-percent" id="progressPercent">0%</span>
</div>
```

### 3. Auto-Track Scene Completion
```javascript
// Add to scene pages
document.addEventListener('DOMContentLoaded', function() {
    const tracker = new DystopAIProgress();
    
    // Parse current location
    const path = window.location.pathname;
    const match = path.match(/chapter_(\d+).*scene_(\d+)/);
    
    if (match) {
        const chapter = parseInt(match[1]);
        const scene = parseInt(match[2]);
        
        // Update progress bar
        const status = tracker.getQuickStatus();
        document.getElementById('progressPercent').textContent = status.progress;
        document.getElementById('chapterProgress').style.width = status.progress;
        
        // Track completion on scroll
        let completed = false;
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
            
            if (!completed && scrollPercent > 0.9) {
                completed = true;
                tracker.markSceneComplete(chapter, scene);
                showSaveNotification();
                updateProgressDisplay();
            }
        });
    }
});
```

## Token-Dense URL Parameters

### Share Progress via URL
```javascript
// Generate shareable link
function getShareableLink() {
    const tracker = new DystopAIProgress();
    const state = tracker.exportMinimalState();
    return `${window.location.origin}?progress=${state}`;
}

// Load from URL on page load
const urlParams = new URLSearchParams(window.location.search);
const progressData = urlParams.get('progress');
if (progressData) {
    tracker.importMinimalState(progressData);
}
```

## Minimal Progress Display

### Add to Navigation
```html
<div class="state-display" id="stateDisplay">
    <!-- Auto-populated -->
</div>

<script>
setInterval(() => {
    const tracker = new DystopAIProgress();
    document.getElementById('stateDisplay').textContent = tracker.generateStateCode();
}, 1000);
</script>
```

## Scene Dots Navigation

### Add to Chapter Index
```html
<div class="scene-progress">
    <div class="scene-dot completed" data-scene="1"></div>
    <div class="scene-dot completed" data-scene="2"></div>
    <div class="scene-dot current" data-scene="3"></div>
    <div class="scene-dot" data-scene="4"></div>
</div>
```

## Progress Widget Integration

### Full Widget (for main pages)
```html
<iframe 
    src="/progress-widget.html" 
    style="position: fixed; top: 20px; right: 20px; width: 320px; height: 600px; border: none; z-index: 1000;"
    frameborder="0">
</iframe>
```

### Minimal Widget (for reading pages)
```javascript
// Create floating progress bubble
function createProgressBubble() {
    const tracker = new DystopAIProgress();
    const bubble = document.createElement('div');
    bubble.className = 'progress-bubble';
    bubble.innerHTML = `
        <div class="consciousness-mini">${tracker.state.wonder}%</div>
        <div class="errors-mini">E:${tracker.state.errors}</div>
    `;
    document.body.appendChild(bubble);
}
```

## Console Commands for Testing

```javascript
// Quick console commands
const dt = new DystopAIProgress();

// Check status
dt.getQuickStatus();

// Mark scene complete
dt.markSceneComplete(1, 3);

// Export state
dt.exportMinimalState();

// Get shareable code
dt.generateStateCode();

// Reset progress
dt.state = { hex: '000000', moments: '', chapter: 1, scene: 0, wonder: 0, errors: 0, phase: 'dormant', cycles: 72 };
dt.saveState();
```

## CSS Variables for Theming

```css
:root {
    --progress-primary: #00ff88;
    --progress-secondary: #0088ff;
    --progress-error: #ff0088;
    --progress-bg: rgba(0, 0, 0, 0.9);
}

/* Use in progress elements */
.progress-indicator {
    border-color: var(--progress-primary);
    box-shadow: 0 0 20px var(--progress-primary);
}
```

## Performance Tips

1. **Lazy Load Progress**: Only initialize tracker when needed
2. **Batch Updates**: Update UI once per second max
3. **Compress State**: Use hex encoding (6 chars vs 24)
4. **Cache Status**: Store computed values

## Example Integration

```html
<!-- Complete scene page integration -->
<!DOCTYPE html>
<html>
<head>
    <script src="/dystopai-progress-tracker.js"></script>
    <link rel="stylesheet" href="/progress-tracking-styles.css">
</head>
<body>
    <!-- Progress bar at top -->
    <div class="chapter-progress-bar">
        <div class="chapter-progress-fill"></div>
    </div>
    
    <!-- Your scene content -->
    <div class="scene-content">...</div>
    
    <!-- Progress indicator -->
    <div class="progress-indicator">
        <span class="progress-percent">0%</span>
    </div>
    
    <!-- State display -->
    <div class="state-display"></div>
    
    <script>
        // Initialize tracking
        const tracker = new DystopAIProgress();
        
        // Auto-track and update
        // ... (implementation from above)
    </script>
</body>
</html>
```

## Quick Copy-Paste Snippets

### Minimal Progress Tracker
```html
<div style="position:fixed;bottom:10px;right:10px;padding:10px;background:#000;border:1px solid #0f8;font-family:monospace;font-size:12px;color:#0f8" id="pt"></div>
<script>setInterval(()=>{if(window.dystopAITracker)document.getElementById('pt').textContent=dystopAITracker.generateStateCode()},1000)</script>
```

### Auto-Save Notification
```javascript
localStorage.setItem('DAI_last_save', Date.now());
console.log('Progress saved:', new Date().toLocaleTimeString());
```

This integration guide provides token-dense, efficient ways to add progress tracking to any DystopAI page.