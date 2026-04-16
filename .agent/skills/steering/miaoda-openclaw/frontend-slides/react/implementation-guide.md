# Implementation Guide

Code templates for generating web slide presentations. Read this after completing the two-step style reference in SKILL.md.

---

## Output Directory Structure

```
.
├── client/
│   ├── src/
│   │   ├── app.tsx             # 应用入口（路由配置）
│   │   ├── tailwind-theme.css  # Tailwind 全局主题定制
│   │   ├── pages/              # 页面组件（与路由对应）
│   │   │   ├── [PresentationName]
│   │   │   │   ├── slides/                      # Slide components
│   │   │   │   │  ├── Slide01Title.tsx
│   │   │   │   │  ├── Slide02Problem.tsx
│   │   │   │   │  ├── Slide03Solution.tsx
│   │   │   │   │  └── ...
│   │   │   │   ├── components/                # Shared presentation components
│   │   │   │   │  ├── Slide.tsx               # Base slide container
│   │   │   │   │  ├── Reveal.tsx              # Animation wrapper
│   │   │   │   │  └── Navigation.tsx          # Navigation component (style varies by theme)
│   │   │   │   ├── hooks/                     # Presentation hooks
│   │   │   │   │  ├── useSlideNavigation.ts
│   │   │   │   │  └── useKeyboardNav.ts
│   │   │   │   ├── theme.css                   # PPT Specific Theme CSS variables
│   │   │   │   └── [PresentationName].tsx
├── shared/           # 前后端共享的目录
│   ├── static/       # 静态资源（含图片、json等）
```

---

## Main Presentation Component

```tsx
// [PresentationName].tsx
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { ProgressBar } from './components/ProgressBar';
import { Navigation } from './components/Navigation'; // Style varies by theme

// Import slides
import { Slide01Title } from './slides/Slide01Title';
import { Slide02Problem } from './slides/Slide02Problem';
// ... more slides

import './theme.css';

const slides = [
  Slide01Title,
  Slide02Problem,
  // ... more slides
];

export function PresentationName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlideNavigation(slides.length);

  useKeyboardNav({ nextSlide, prevSlide });

  // Wheel navigation with debounce
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastWheelTime = 0;
    const DEBOUNCE_MS = 800;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < DEBOUNCE_MS) return;
      lastWheelTime = now;

      if (e.deltaY > 0) nextSlide();
      else if (e.deltaY < 0) prevSlide();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  return (
    <div
      ref={containerRef}
      data-ppt-theme="[theme-name]"
      className={cn(
        "w-screen h-screen overflow-y-auto overflow-x-hidden",
        "snap-y snap-mandatory scroll-smooth",
        "bg-[var(--ppt-bg)] text-[var(--ppt-text)]"
      )}
    >
      <ProgressBar current={currentSlide} total={slides.length} />

      {/* Navigation component - style varies by theme (see navigation-styles.md) */}
      <Navigation
        total={slides.length}
        current={currentSlide}
        onDotClick={goToSlide}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {slides.map((SlideComponent, index) => (
        <SlideComponent key={index} isActive={currentSlide === index} />
      ))}
    </div>
  );
}
```

---

## Base Slide Component

```tsx
// components/Slide.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SlideProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'centered' | 'split';
}

export const Slide = forwardRef<HTMLElement, SlideProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantClasses = {
      default: 'justify-center',
      centered: 'justify-center items-center text-center',
      split: 'flex-row',
    };

    return (
      <section
        ref={ref}
        data-slide  // Required for navigation scroll targeting
        className={cn(
          // Viewport fitting - CRITICAL
          "w-screen h-dvh overflow-hidden snap-start",
          "flex flex-col relative",
          // Responsive padding
          "p-[clamp(1rem,4vw,4rem)]",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex-1 flex flex-col justify-center max-h-full overflow-hidden">
          {children}
        </div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';
```

---

## Reveal Animation Component

```tsx
// components/Reveal.tsx
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
  className?: string;
}

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
};

export function Reveal({ children, delay = 0, direction = 'up', className }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Theme CSS File

**⛔ DO NOT copy placeholder values. Read `references/style-presets.md` and the selected theme file for accurate values.**

```css
/* theme.css */

[data-ppt-theme="<theme-name>"] {
  /* GET ALL VALUES FROM references/themes/{theme-name}.md */
  --ppt-bg: ;
  --ppt-bg-secondary: ;
  --ppt-text: ;
  --ppt-text-secondary: ;
  --ppt-accent: ;
  --ppt-accent-foreground: ;
  --ppt-font-display: ;
  --ppt-font-body: ;

  /* Animation - standard values */
  --ppt-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ppt-duration: 0.6s;
}

@media (max-height: 700px) {
  [data-ppt-theme] { --ppt-slide-padding: clamp(0.75rem, 3vw, 2rem); }
}
@media (max-height: 500px) {
  [data-ppt-theme] { --ppt-slide-padding: clamp(0.5rem, 2vw, 1rem); }
}
@media (prefers-reduced-motion: reduce) {
  [data-ppt-theme] { --ppt-duration: 0.2s; }
}
```

---

## useSlideNavigation Hook

```tsx
// hooks/useSlideNavigation.ts
import { useState, useCallback } from 'react';

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      const slides = document.querySelectorAll('[data-slide]');
      slides[index]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  return { currentSlide, goToSlide, nextSlide, prevSlide };
}
```

---

## useKeyboardNav Hook

```tsx
// hooks/useKeyboardNav.ts
import { useEffect } from 'react';

interface UseKeyboardNavProps {
  nextSlide: () => void;
  prevSlide: () => void;
}

export function useKeyboardNav({ nextSlide, prevSlide }: UseKeyboardNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
}
```

---

## Example Title Slide

```tsx
// slides/Slide01Title.tsx
import { Slide } from '../components/Slide';
import { Reveal } from '../components/Reveal';

interface Props {
  isActive: boolean;
}

export function Slide01Title({ isActive }: Props) {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-[var(--ppt-accent)] text-[var(--ppt-accent-foreground)]">
            NEW PRODUCT
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-[clamp(2rem,6vw,5rem)] font-bold leading-tight mb-4">
            Your Presentation Title
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-[var(--ppt-text-secondary)]">
            A compelling subtitle that captures attention
          </p>
        </Reveal>
      </div>
    </Slide>
  );
}
```
