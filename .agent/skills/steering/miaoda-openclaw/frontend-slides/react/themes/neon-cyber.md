# Theme: Neon Cyber

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="neon-cyber"] {
  --ppt-bg: #0a0f1c;
  --ppt-bg-secondary: #111827;
  --ppt-text: #ffffff;
  --ppt-text-secondary: #9ca3af;
  --ppt-accent: #00ffcc;
  --ppt-accent-glow: rgba(0, 255, 204, 0.3);
  --ppt-accent-secondary: #ff00aa;
}
```

**Key Tailwind Classes:**
```tsx
// Neon glow effect
className="text-[var(--ppt-accent)] drop-shadow-[0_0_20px_var(--ppt-accent-glow)]"

// Grid background
className="bg-[var(--ppt-bg)] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"

// Accent badges
className="bg-[var(--ppt-accent)]/10 text-[var(--ppt-accent)] border border-[var(--ppt-accent)]/30 rounded-full px-4 py-1 font-mono text-sm"
```
