# Animation Presets (React / Framer Motion)

Framer Motion animation variants for React-based slide presentations.

---

## Entrance Animations

```tsx
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const slideLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
const blurIn = { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } };
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
```

---

## Easing & Timing

```tsx
ease: [0.16, 1, 0.3, 1]        // easeOutExpo — recommended for most
ease: [0.68, -0.55, 0.265, 1.55] // easeOutBack — playful themes
ease: [0.25, 0.1, 0.25, 1]     // easeOutCubic — snappy, professional
```

| Theme Type | Duration | Stagger |
|------------|----------|---------|
| Professional | 0.4-0.5s | 0.05-0.1s |
| Playful | 0.5-0.7s | 0.1-0.15s |
| Dramatic | 0.8-1.2s | 0.15-0.2s |
| Minimal | 0.3-0.4s | 0.05s |
