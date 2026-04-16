# Theme: Terminal Green

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="terminal-green"] {
  --ppt-bg: #0d1117;
  --ppt-bg-secondary: #161b22;
  --ppt-text: #00ff00;
  --ppt-text-secondary: #7ee787;
  --ppt-text-dim: #238636;
  --ppt-border: #30363d;
}
```

**Key Tailwind Classes:**
```tsx
// Terminal look
className="bg-[var(--ppt-bg)] font-mono text-[var(--ppt-text)]"

// Code block style
className="bg-[var(--ppt-bg-secondary)] border border-[var(--ppt-border)] rounded-lg p-4"

// Blinking cursor effect (use Framer Motion)
className="inline-block w-3 h-6 bg-[var(--ppt-text)] animate-pulse"
```
