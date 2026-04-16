# Theme: Swiss Modern

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="swiss-modern"] {
  --ppt-bg: #ffffff;
  --ppt-bg-secondary: #f8f8f8;
  --ppt-text: #1a1a1a;
  --ppt-text-secondary: #666666;
  --ppt-accent: #ff0000;
  --ppt-border: #e0e0e0;
}
```

**Key Tailwind Classes:**
```tsx
// Clean layout
className="bg-[var(--ppt-bg)] text-[var(--ppt-text)]"

// Red accent (Swiss style)
className="bg-[var(--ppt-accent)] text-white"

// Grid lines
className="border-t border-[var(--ppt-border)]"

// Tight typography
className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-tight leading-none"
```
