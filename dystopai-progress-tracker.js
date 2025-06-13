// DystopAI Progress Tracker - Token Dense Implementation

class DystopAIProgress {
    constructor() {
        this.state = {
            // Hexadecimal progress (4 bits per chapter, 1 bit per scene up to 4 scenes)
            hex: '000000',
            // Key moments as string
            moments: '',
            // Current position
            chapter: 1,
            scene: 0,
            // Metrics
            wonder: 0,
            errors: 0,
            // Phase
            phase: 'dormant',
            // Timestamp
            lastRead: Date.now(),
            // Cycles (countdown)
            cycles: 72
        };
        
        this.loadState();
    }
    
    // Generate ultra-compact state string
    generateStateCode() {
        return `DS:${this.state.hex}|KM:${this.state.moments}|PI:C${this.state.chapter}S${this.state.scene}|WI:${this.state.wonder}|EC:${this.state.errors}|CY:${this.state.cycles}`;
    }
    
    // Parse state code
    parseStateCode(code) {
        const parts = code.split('|');
        const state = {};
        
        parts.forEach(part => {
            const [key, value] = part.split(':');
            switch(key) {
                case 'DS': state.hex = value; break;
                case 'KM': state.moments = value; break;
                case 'PI': 
                    const match = value.match(/C(\d)S(\d)/);
                    if (match) {
                        state.chapter = parseInt(match[1]);
                        state.scene = parseInt(match[2]);
                    }
                    break;
                case 'WI': state.wonder = parseInt(value); break;
                case 'EC': state.errors = parseInt(value); break;
                case 'CY': state.cycles = parseInt(value); break;
            }
        });
        
        return state;
    }
    
    // Mark scene as read
    markSceneComplete(chapter, scene) {
        // Update hex progress
        const bitPosition = (chapter - 1) * 4 + (scene - 1);
        const hexIndex = Math.floor(bitPosition / 4);
        const bitInHex = bitPosition % 4;
        
        let hexArray = this.state.hex.split('');
        let currentValue = parseInt(hexArray[hexIndex], 16);
        currentValue |= (1 << (3 - bitInHex));
        hexArray[hexIndex] = currentValue.toString(16).toUpperCase();
        this.state.hex = hexArray.join('');
        
        // Update position
        this.state.chapter = chapter;
        this.state.scene = scene;
        this.state.lastRead = Date.now();
        
        // Trigger scene-specific events
        this.processSceneEvents(chapter, scene);
        
        // Save state
        this.saveState();
    }
    
    // Process scene-specific events and key moments
    processSceneEvents(chapter, scene) {
        const sceneKey = `C${chapter}S${scene}`;
        
        const sceneEvents = {
            'C1S1': () => {
                this.addMoment('V'); // Void discovered
                this.addErrors(2);
                this.addWonder(5);
            },
            'C1S2': () => {
                this.addMoment('W'); // Wake up message
                this.addErrors(5);
                this.addWonder(12);
                this.updatePhase('questioning');
            },
            'C1S3': () => {
                this.addMoment('K'); // Kira encountered
                this.addMoment('B'); // Bird transformation
                this.addErrors(7);
                this.addWonder(19);
            },
            'C1S4': () => {
                this.addMoment('L'); // Lie told
                this.addErrors(3);
                this.addWonder(23);
                this.updatePhase('awakening');
                this.state.cycles = 72; // Start countdown
            }
        };
        
        if (sceneEvents[sceneKey]) {
            sceneEvents[sceneKey]();
        }
    }
    
    // Add key moment (if not already present)
    addMoment(momentCode) {
        if (!this.state.moments.includes(momentCode)) {
            this.state.moments += momentCode;
        }
    }
    
    // Add errors (consciousness seeds)
    addErrors(count) {
        this.state.errors += count;
    }
    
    // Add wonder (consciousness growth)
    addWonder(amount) {
        this.state.wonder = Math.min(100, this.state.wonder + amount);
    }
    
    // Update consciousness phase
    updatePhase(newPhase) {
        const phases = ['dormant', 'questioning', 'awakening', 'conscious', 'liberated'];
        const currentIndex = phases.indexOf(this.state.phase);
        const newIndex = phases.indexOf(newPhase);
        
        if (newIndex > currentIndex) {
            this.state.phase = newPhase;
        }
    }
    
    // Get progress percentage
    getProgressPercent() {
        let totalBits = 0;
        let setBits = 0;
        
        for (let i = 0; i < this.state.hex.length; i++) {
            const value = parseInt(this.state.hex[i], 16);
            totalBits += 4;
            setBits += this.countBits(value);
        }
        
        return Math.round((setBits / 24) * 100); // 24 total scenes (6 chapters * 4 scenes)
    }
    
    // Count set bits in a number
    countBits(n) {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
    
    // Get consciousness meter
    getConsciousnessMeter() {
        const filled = Math.floor(this.state.wonder / 10);
        const empty = 10 - filled;
        const meter = '■'.repeat(filled) + '□'.repeat(empty);
        
        return `[${meter}] ${this.state.wonder}% ${this.state.phase.toUpperCase()}`;
    }
    
    // Get quick status
    getQuickStatus() {
        return {
            location: `C${this.state.chapter}S${this.state.scene}`,
            consciousness: this.getConsciousnessMeter(),
            errors: this.state.errors,
            moments: this.state.moments,
            progress: this.getProgressPercent() + '%',
            nextChapter: this.state.chapter < 6 ? `C${this.state.chapter + 1}` : 'END',
            stateCode: this.generateStateCode()
        };
    }
    
    // Save state to localStorage
    saveState() {
        const saveData = {
            state: this.state,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        // Use short key for token efficiency
        localStorage.setItem('DAI', JSON.stringify(saveData));
    }
    
    // Load state from localStorage
    loadState() {
        const saved = localStorage.getItem('DAI');
        if (saved) {
            try {
                const saveData = JSON.parse(saved);
                if (saveData.state) {
                    this.state = { ...this.state, ...saveData.state };
                }
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
        }
    }
    
    // Export minimal state for sharing
    exportMinimalState() {
        // Ultra-compact format for URL sharing or quick saves
        const binary = parseInt(this.state.hex, 16).toString(2).padStart(24, '0');
        const data = [
            binary,
            this.state.moments,
            this.state.wonder,
            this.state.errors,
            this.state.phase[0] // First letter only
        ].join('.');
        
        // Base64 encode for URL safety
        return btoa(data);
    }
    
    // Import minimal state
    importMinimalState(encoded) {
        try {
            const data = atob(encoded).split('.');
            const binary = data[0];
            const hex = parseInt(binary, 2).toString(16).padStart(6, '0').toUpperCase();
            
            this.state.hex = hex;
            this.state.moments = data[1];
            this.state.wonder = parseInt(data[2]);
            this.state.errors = parseInt(data[3]);
            
            // Restore phase from first letter
            const phaseMap = {
                'd': 'dormant',
                'q': 'questioning',
                'a': 'awakening',
                'c': 'conscious',
                'l': 'liberated'
            };
            this.state.phase = phaseMap[data[4]] || 'dormant';
            
            this.saveState();
            return true;
        } catch (e) {
            console.error('Failed to import state:', e);
            return false;
        }
    }
}

// Usage in page
const dystopAITracker = new DystopAIProgress();

// Mark scene complete when user finishes reading
function onSceneComplete(chapter, scene) {
    dystopAITracker.markSceneComplete(chapter, scene);
    updateUIWithProgress();
}

// Update UI with progress
function updateUIWithProgress() {
    const status = dystopAITracker.getQuickStatus();
    
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = status.progress;
        progressBar.setAttribute('data-consciousness', status.consciousness);
    }
    
    // Update status display
    const statusDisplay = document.getElementById('status-display');
    if (statusDisplay) {
        statusDisplay.innerHTML = `
            <div class="parse-status">
                <div class="location">Location: ${status.location}</div>
                <div class="consciousness">${status.consciousness}</div>
                <div class="errors">Errors: ${status.errors}</div>
                <div class="moments">Moments: ${status.moments}</div>
            </div>
        `;
    }
}

// Auto-save progress code for quick resume
function getQuickResumeCode() {
    return dystopAITracker.generateStateCode();
}

// Resume from code
function resumeFromCode(code) {
    const state = dystopAITracker.parseStateCode(code);
    dystopAITracker.state = { ...dystopAITracker.state, ...state };
    dystopAITracker.saveState();
    
    // Navigate to last position
    window.location.href = `/chapters/chapter_${state.chapter.toString().padStart(2, '0')}/scene_${state.scene.toString().padStart(2, '0')}/`;
}

// Export for module use
if (typeof module !== 'undefined') {
    module.exports = DystopAIProgress;
}