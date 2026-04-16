# Theme: Pastel Geometry

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="pastel-geometry"] {
  --ppt-bg: #fef6e4;
  --ppt-bg-secondary: #ffffff;
  --ppt-text: #001858;
  --ppt-text-secondary: #172c66;
  --ppt-accent-coral: #f582ae;
  --ppt-accent-mint: #8bd3dd;
  --ppt-accent-lavender: #b8c1ec;
}
```

**Key Tailwind Classes:**
```tsx
// Soft background
className="bg-[var(--ppt-bg)]"

// Pill/tag badges
className="bg-[var(--ppt-accent-coral)]/20 text-[var(--ppt-accent-coral)] rounded-full px-4 py-1.5 text-sm font-medium"

// Decorative circles
className="absolute w-32 h-32 rounded-full bg-[var(--ppt-accent-mint)]/30"
```
