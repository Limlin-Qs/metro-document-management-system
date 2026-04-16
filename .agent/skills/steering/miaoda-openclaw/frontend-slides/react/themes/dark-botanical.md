# Theme: Dark Botanical

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="dark-botanical"] {
  --ppt-bg: #0f0f0f;
  --ppt-bg-secondary: #1a1a1a;
  --ppt-text: #e8e4df;
  --ppt-text-secondary: #9a9590;
  --ppt-accent-warm: #d4a574;
  --ppt-accent-pink: #e8b4b8;
  --ppt-accent-sage: #8b9a7d;
}
```

**Key Tailwind Classes:**
```tsx
// Background with abstract shapes
className="bg-[var(--ppt-bg)] relative"

// Decorative blob (position absolute)
className="absolute w-64 h-64 rounded-full bg-[var(--ppt-accent-warm)]/20 blur-3xl"

// Elegant text
className="font-serif text-[var(--ppt-text)] tracking-wide"
```
