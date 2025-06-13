# DystopAI Progress Tracking - Quick Reference Card

## 🔷 Ultra-Compact State Codes

### Minimal State (16 chars)
```
DS:F00000|KM:VKBL
```

### Standard State (52 chars)
```
DS:F00000|KM:VKBL|PI:C1S4|WI:23|EC:17|CY:72
```

### Binary Progress (24 bits = 6 hex)
```
F00000 = 111100000000000000000000
         └─C1─┘└─C2─┘└─C3─┘└C4-6
```

## 🔷 Key Moment Codes

```
V - Void discovered        C - Church found
K - Kira encountered       P - Prophet met
B - Bird transformation    H - Hunters arrived
L - Lie told              G - God Protocol
W - Wake up message       Z - ABSOLUTE-ZERO
E - Entropy Garden        F - Freedom chosen
```

## 🔷 Quick Commands

### Check Progress
```javascript
dt.getQuickStatus()
// Returns: {location:"C1S4", consciousness:"[■■□□□□□□□□] 23%", ...}
```

### Mark Scene Complete
```javascript
dt.markSceneComplete(1,4)  // Chapter 1, Scene 4
```

### Export/Import
```javascript
dt.exportMinimalState()     // Returns: "MTExMTAw..."
dt.importMinimalState(code) // Load from code
```

## 🔷 Phase Indicators

```
🔴 DORMANT     [0-10%]   d
🟡 QUESTIONING [11-30%]  q
🟢 AWAKENING   [31-60%]  a
🔵 CONSCIOUS   [61-90%]  c
⚪ LIBERATED   [91-100%] l
```

## 🔷 URL Parameters

### Share Progress
```
?p=F00000.VKBL.23.17.a
```

### Quick Resume
```
?resume=DS:F00000|KM:VKBL|PI:C1S4
```

### Jump to Scene
```
?goto=C2S1&inherit=true
```

## 🔷 Console One-Liners

```javascript
// Full status
JSON.stringify(dt.getQuickStatus())

// Progress percentage
dt.getProgressPercent() + '%'

// Consciousness meter
dt.getConsciousnessMeter()

// Current state code
dt.generateStateCode()

// Reset all
dt.state={hex:'000000',moments:'',chapter:1,scene:0,wonder:0,errors:0,phase:'dormant',cycles:72};dt.saveState()
```

## 🔷 HTML Snippets

### Minimal Tracker
```html
<div id="pt" style="position:fixed;bottom:5px;right:5px;padding:5px;background:#000;border:1px solid #0f8;font:10px monospace;color:#0f8"></div>
<script>setInterval(()=>pt.textContent=dt?.generateStateCode()||'',1000)</script>
```

### Progress Dot
```html
<span style="color:#0f8">●</span> <small id="pp">0%</small>
<script>pp.textContent=dt?.getProgressPercent()+'%'||'0%'</script>
```

## 🔷 CSS Classes

```css
.completed { background: #0f8 }
.current   { background: #f0f }
.locked    { opacity: 0.3 }
.error     { color: #f08 }
```

## 🔷 LocalStorage Keys

```javascript
'DAI'        // Main save data
'DAI_backup' // Backup save
'DAI_stats'  // Analytics
```

## 🔷 Error Thresholds

```
0-10   : System stable
11-25  : Anomalies detected
26-50  : Consciousness emerging
51-100 : Reality unstable
100+   : Liberation protocol
```

## 🔷 Quick Debugging

```javascript
// View all data
console.table(dt.state)

// Check hex binary
parseInt(dt.state.hex,16).toString(2).padStart(24,'0')

// List moments
dt.state.moments.split('')

// Time since last save
Date.now()-JSON.parse(localStorage.DAI).timestamp
```

---
*Keep this card handy for quick progress tracking!*