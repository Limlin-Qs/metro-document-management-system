# Theme: Paper & Ink

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="paper-ink"] {
  --ppt-bg: #fdfcf9;
  --ppt-bg-secondary: #f5f3ee;
  --ppt-text: #2c2c2c;
  --ppt-text-secondary: #6b6b6b;
  --ppt-accent: #1a1a1a;
  --ppt-rule: #d4d4d4;
}
```

**Key Tailwind Classes:**
```tsx
// Paper background
className="bg-[var(--ppt-bg)] text-[var(--ppt-text)]"

// Serif typography
className="font-serif text-[clamp(1.5rem,4vw,3rem)] leading-relaxed"

// Horizontal rules
className="w-24 h-px bg-[var(--ppt-rule)] my-8"

// Pull quote
className="font-serif italic text-[clamp(1.25rem,3vw,2rem)] border-l-2 border-[var(--ppt-accent)] pl-6"
```
