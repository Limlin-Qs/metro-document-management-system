# Theme: Electric Studio

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="electric-studio"] {
  --ppt-bg: #0a0a0a;
  --ppt-bg-secondary: #ffffff;
  --ppt-text: #ffffff;
  --ppt-text-secondary: #666666;
  --ppt-accent: #4361ee;
  --ppt-accent-foreground: #ffffff;
  --ppt-card: #ffffff;
  --ppt-card-foreground: #0a0a0a;
}
```

**Key Tailwind Classes:**
```tsx
// Split panel background
className="bg-[var(--ppt-bg)] grid grid-rows-2"

// White panel
className="bg-white text-[var(--ppt-card-foreground)] p-8"

// Accent bar
className="w-1 h-full bg-[var(--ppt-accent)]"
```
