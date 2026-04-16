# Theme: Bold Signal

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="bold-signal"] {
  --ppt-bg: #1a1a1a;
  --ppt-bg-secondary: #2d2d2d;
  --ppt-text: #ffffff;
  --ppt-text-secondary: #a0a0a0;
  --ppt-accent: #FF5722;
  --ppt-accent-foreground: #1a1a1a;
  --ppt-card: #FF5722;
  --ppt-card-foreground: #1a1a1a;
}
```

**Key Tailwind Classes:**
```tsx
// Background
className="bg-[var(--ppt-bg)] bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]"

// Accent card
className="bg-[var(--ppt-accent)] text-[var(--ppt-accent-foreground)] rounded-2xl p-8"

// Section numbers
className="text-8xl font-black text-[var(--ppt-text)]/10"
```
