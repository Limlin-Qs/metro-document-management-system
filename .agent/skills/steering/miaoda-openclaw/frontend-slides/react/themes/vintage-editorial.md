# Theme: Vintage Editorial

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="vintage-editorial"] {
  --ppt-bg: #f5f3ee;
  --ppt-bg-secondary: #ebe8e1;
  --ppt-text: #1a1a1a;
  --ppt-text-secondary: #555555;
  --ppt-accent: #e8d4c0;
  --ppt-accent-foreground: #1a1a1a;
  --ppt-card: #ffffff;
  --ppt-card-foreground: #1a1a1a;
}
```

**Key Tailwind Classes:**
```tsx
// Warm cream background
className="bg-[var(--ppt-bg)]"

// Editorial heading
className="font-serif text-[clamp(2rem,6vw,5rem)] font-black"

// Bordered CTA box
className="border-2 border-[var(--ppt-text)] px-6 py-3 font-medium"
```
