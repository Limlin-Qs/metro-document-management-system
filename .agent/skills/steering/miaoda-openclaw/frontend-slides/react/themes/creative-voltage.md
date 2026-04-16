# Theme: Creative Voltage

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="creative-voltage"] {
  --ppt-bg: #0066ff;
  --ppt-bg-secondary: #1a1a2e;
  --ppt-text: #ffffff;
  --ppt-text-secondary: #b0c4ff;
  --ppt-accent: #d4ff00;
  --ppt-accent-foreground: #1a1a2e;
  --ppt-card: #1a1a2e;
  --ppt-card-foreground: #ffffff;
}
```

**Key Tailwind Classes:**
```tsx
// Electric blue background
className="bg-[var(--ppt-bg)]"

// Neon badge
className="bg-[var(--ppt-accent)] text-[var(--ppt-accent-foreground)] rounded-full px-4 py-1 font-mono text-sm"

// Split layout
className="grid grid-cols-2 h-dvh"
```
