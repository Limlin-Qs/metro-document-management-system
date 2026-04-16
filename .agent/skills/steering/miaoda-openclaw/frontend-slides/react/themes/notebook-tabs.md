# Theme: Notebook Tabs

> Design details (vibe, colors, typography, signature elements): see `shared/STYLE_PRESETS.md`

**Theme CSS:**
```css
[data-ppt-theme="notebook-tabs"] {
  --ppt-bg: #f5f5f0;
  --ppt-bg-secondary: #ffffff;
  --ppt-text: #1a1a1a;
  --ppt-text-secondary: #666666;
  --ppt-tab-red: #e63946;
  --ppt-tab-blue: #457b9d;
  --ppt-tab-green: #2a9d8f;
  --ppt-tab-yellow: #e9c46a;
  --ppt-border: #e0e0e0;
}
```

**Key Tailwind Classes:**
```tsx
// Paper card
className="bg-[var(--ppt-bg-secondary)] rounded-lg shadow-sm border border-[var(--ppt-border)] p-6"

// Colored tabs
className="absolute -left-2 top-4 w-4 h-20 rounded-r-sm"
// Use different colors: bg-[var(--ppt-tab-red)], bg-[var(--ppt-tab-blue)], etc.

// Section indicator
className="text-sm font-medium text-[var(--ppt-text-secondary)] uppercase tracking-wider"
```
