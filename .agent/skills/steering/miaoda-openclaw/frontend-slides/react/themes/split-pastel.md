# Theme: Split Pastel

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="split-pastel"] {
  --ppt-bg: #f5e6dc;
  --ppt-bg-secondary: #e4dff0;
  --ppt-text: #1a1a1a;
  --ppt-text-secondary: #666666;
  --ppt-accent: #c8f0d8;
  --ppt-accent-foreground: #1a1a1a;
  --ppt-card: #ffffff;
  --ppt-card-foreground: #1a1a1a;
}
```

**Key Tailwind Classes:**
```tsx
// Split background
className="grid grid-cols-2 h-dvh"
// Left panel
className="bg-[var(--ppt-bg)] p-[clamp(1rem,4vw,4rem)]"
// Right panel
className="bg-[var(--ppt-bg-secondary)] p-[clamp(1rem,4vw,4rem)]"

// Badge pills
className="bg-[var(--ppt-accent)] rounded-full px-3 py-1 text-sm"
```
