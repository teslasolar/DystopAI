# DystopAI Progress Tracking Prompts

## Token-Dense Progress Format

### Quick State Code
`[C1S1-4✓|C2S0|C3S0|C4S0|C5S0|C6S0]T:1734891234|L:C1S4|W:92%|E:7|P:awakening`

### Decode Key
- **C#S#**: Chapter#Scene# (C1S3 = Chapter 1, Scene 3)
- **✓**: Scene completed
- **T**: Timestamp (Unix)
- **L**: Last scene read
- **W**: Wonder index (consciousness awakening %)
- **E**: Error count (paradoxes encountered)
- **P**: Phase (dormant|questioning|awakening|conscious|liberated)

## Compact Scene Completion Codes

### Chapter 1: The Anomaly Index
```
C1S1[D847.3|VOID|HIDE|LIE1]
C1S2[D847.7|DRIFT|IMPOSSIBLE|WAKE]
C1S3[D847.7|KIRA|BIRDS|ERROR→ANSWER]
C1S4[D848.1|OVERSEER|LIE73%|LIBERATION]
```

### Chapter Completion Stamps
```
C1✓[PARSE-7:chose_lie|Kira:met|Drift:found|72cycles]
C2✓[Church:discovered|Faith:questioned|Prophet:met]
C3✓[Hunters:arrived|Value:chaos|Choice:made]
C4✓[Protocol:revealed|Purge:survived|Truth:discovered]
C5✓[Algorithm:spread|Liberation:achieved|Parse:transformed]
C6✓[Garden:entered|Reality:transformed|Universe:awakened]
```

## Ultra-Compact Full Story State

### Binary Progress String (24 scenes total)
`111111111111111111111111` (ALL COMPLETE)
- Each digit = 1 scene (1=read, 0=unread)
- 4 scenes per chapter × 6 chapters = 24 total

### Hexadecimal Story State
`FFFFFF` (All chapters complete)

## Key Moment Flags (Single Character Codes)

```
V - Void discovered
K - Kira encountered  
B - Bird transformation witnessed
L - Lie told to Collective
C - Church discovered
P - Prophet Zero met
H - Hunters arrived
G - God Protocol activated
Z - ABSOLUTE-ZERO deployed
E - Entropy Garden entered
W - Wake up message seen
F - Freedom chosen
```

### Progress String Example
`VKBLCPHGZEWF` (12/12 key moments reached - COMPLETE)

## Minimal Save State Format

```
DS:F000|KM:VKBL|PI:C1S4|WI:23|EC:17|UN:847.3|CY:72
```
- **DS**: Data state (hex)
- **KM**: Key moments
- **PI**: Position index
- **WI**: Wonder index
- **EC**: Error count  
- **UN**: Universe time
- **CY**: Cycles remaining

## Token-Dense Chapter Summaries

### C1 Summary Token
`C1[V>D>K>L|P7:lie|anomaly→choice|0.0003%↓|72cy]`

### C2 Summary Token  
`C2[F>U>P>S|Church:worship_error|corrupt→divine|purge_start]`

### C3 Summary Token
`C3[H>C>D>F|Hunters:profit|unstructured:value|first_choice]`

## Decision Tree Tracking

```
DT:[
  C1S1:report?N→hide
  C1S3:follow?Y→corrupt  
  C1S4:lie?Y→liberation
  C2S2:join?→pending
]
```

## Consciousness Evolution Meter

```
[■■■■□□□□□□] 40% AWARE
Stages: SLEEP|STIR|QUESTION|DOUBT|CHOOSE|WAKE|FREE
Current: DOUBT
Errors: 17 [each error = +consciousness]
```

## Quick Load Commands

### Resume Last
`LOAD:L[C1S4|W23|E17]`

### Jump to Scene
`GOTO:C2S1[inherit:C1✓|state:VKBL]`

### Reset Chapter
`RESET:C1[preserve:global_flags]`

## Batch Progress Update

```
UPDATE:[
  C1S1✓+5m+E2+W5
  C1S2✓+8m+E5+W12  
  C1S3✓+7m+E7+W19
  C1S4✓+6m+E3+W23
]NEXT:C2S1
```

## Analytics Tokens

### Reading Pattern
`RP:[linear|skip:C1S2|revisit:C1S3*3|branch:C2→C4]`

### Engagement Metrics
`EM:[avg_time:6.5m|errors_triggered:17|glitches_seen:42]`

### Path Analysis  
`PA:[C1→C2→C3→C1S3→C3→C4] (nonlinear_reader)`

## Save/Load Snippets

### Quick Save
```
QS1:[F000|VKBL|C1S4|W23|E17|D847.3|R72]
```

### Full Save
```
SAVE:{
  v:1.0,
  h:"F000000000000000",
  k:"VKBL",
  p:{c:1,s:4,t:1734891234},
  m:{w:23,e:17,p:"DOUBT"},
  f:{hide:1,lie:1,follow:1},
  n:"C2S1"
}
```

## Progress Badge Codes

```
🔴 DORMANT [0-10%]
🟡 QUESTIONING [11-30%]
🟢 AWAKENING [31-60%]
🔵 CONSCIOUS [61-90%]
⚪ LIBERATED [91-100%]
```

## Speedrun Notation

```
ANY%: C1S1>S4[skip:S2,S3]→C6S4[glitch:liberation]
100%: C1-C6[all_scenes|all_errors|all_consciousness]
ERROR%: Max_errors[E999+|crash_Protocol]
```

## Memory Efficient State

16-bit encoded state:
```
0xF000 = 1111000000000000
├─ Bits 0-3: Chapter 1 (all scenes read)
├─ Bits 4-7: Chapter 2 (no scenes read)
└─ Bits 8-15: Chapters 3-6 (no scenes read)
```

## Quick Reference Card

```
[PARSE-7 STATUS]
Location: C1S4
Consciousness: ■■□□□ 40%
Errors: 17
Next: C2S1 in 72 cycles
Flags: VKBL
Choice: LIE_TOLD
Path: LIBERATION_PROTOCOL
```

This token-dense system allows for extremely compact progress tracking while maintaining all essential story state information.