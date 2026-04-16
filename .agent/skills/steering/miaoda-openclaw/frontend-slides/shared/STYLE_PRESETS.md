# Style Presets Reference

Curated visual styles for slide presentations. Each preset is designed to feel custom-crafted — no generic "AI slop" aesthetics. **Abstract shapes only — no illustrations.**

---

## CRITICAL: Viewport Fitting (Non-Negotiable)

**Every slide MUST fit exactly in the viewport. No scrolling within slides, ever.**

### Content Density Limits Per Slide

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullets (max 2 lines each) OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards maximum (2x3 or 3x2 grid) |
| Code slide | 1 heading + 8-10 lines of code maximum |
| Quote slide | 1 quote (max 3 lines) + attribution |
| Image slide | 1 heading + 1 image (max 60vh height) |

**Too much content? → Split into multiple slides. Never scroll.**

---

## Theme Selection Guide

### By User Request

| If the user wants... | Recommend... |
|---------------------|--------------|
| "Professional but not boring" | Bold Signal |
| "Techy/futuristic" | Neon Cyber or Terminal Green |
| "Elegant/luxury" | Dark Botanical or Paper & Ink |
| "Friendly/approachable" | Pastel Geometry or Notebook Tabs |
| "Minimal/clean" | Swiss Modern or Paper & Ink |
| "Creative/playful" | Creative Voltage or Split Pastel |
| "Bold, high contrast" | Electric Studio |
| "Editorial/witty" | Vintage Editorial |

### By Content Keywords

| Keywords | → Theme |
|----------|---------|
| 投资, pitch, 融资, startup, 商业计划 | Bold Signal |
| AI, ML, 算法, API, 技术架构, 未来, 科技 | Neon Cyber |
| 代码, 开发者, CLI, SDK, 终端, GitHub | Terminal Green |
| 品牌, 奢侈品, 高端, 设计, 美学 | Dark Botanical |
| 数据, 报告, 分析, KPI, 季度, 企业 | Swiss Modern |
| 教程, 入门, 学习, 指南, 教育 | Pastel Geometry |
| 故事, 旅程, 经历, 感悟, 文化, 叙事 | Paper & Ink |
| 评测, 对比, 清单, 总结, 笔记 | Notebook Tabs |
| 创意, 设计师, 作品集, portfolio | Creative Voltage |
| 产品发布, 发布会, launch | Electric Studio |
| 轻松, 趣味, 活动, 社区 | Split Pastel |
| 书评, 评论, 观点, 专栏 | Vintage Editorial |

**冲突解决**：同时匹配多个主题时，选择表格中排序靠前的主题。

### By Audience

| Audience | → Theme |
|----------|---------|
| 投资人/VC | Bold Signal |
| 开发者/工程师 | Terminal Green or Neon Cyber |
| 企业高管 | Swiss Modern or Electric Studio |
| 设计师/创意人员 | Dark Botanical or Creative Voltage |
| 学生/初学者 | Pastel Geometry |
| 通用/混合 | Bold Signal (default) |

### By Mood

| Mood | Suggested Presets |
|------|-------------------|
| Impressed/Confident | Bold Signal, Electric Studio, Dark Botanical |
| Excited/Energized | Creative Voltage, Neon Cyber, Split Pastel |
| Calm/Focused | Notebook Tabs, Paper & Ink, Swiss Modern |
| Inspired/Moved | Dark Botanical, Vintage Editorial, Pastel Geometry |

### Default Fallback

No clear signals → **Bold Signal** (versatile, professional, works for most cases)

---

## 12 Presets

### Dark Themes

#### 1. Bold Signal

**Vibe:** Confident, bold, modern, high-impact

**Layout:** Colored card on dark gradient. Number top-left, navigation top-right, title bottom-left.

**Typography:**
- Display: `Archivo Black` (900)
- Body: `Space Grotesk` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #1a1a1a |
| bg-gradient | 135deg, #1a1a1a → #2d2d2d → #1a1a1a |
| card-bg | #FF5722 |
| text-primary | #ffffff |
| text-on-card | #1a1a1a |

**Signature Elements:**
- Bold colored card as focal point (orange, coral, or vibrant accent)
- Large section numbers (01, 02, etc.)
- Navigation breadcrumbs with active/inactive opacity states
- Grid-based layout for precise alignment

---

#### 2. Electric Studio

**Vibe:** Bold, clean, professional, high contrast

**Layout:** Split panel—white top, blue bottom. Brand marks in corners.

**Typography:**
- Display: `Manrope` (800)
- Body: `Manrope` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-dark | #0a0a0a |
| bg-white | #ffffff |
| accent-blue | #4361ee |
| text-dark | #0a0a0a |
| text-light | #ffffff |

**Signature Elements:**
- Two-panel vertical split
- Accent bar on panel edge
- Quote typography as hero element
- Minimal, confident spacing

---

#### 3. Creative Voltage

**Vibe:** Bold, creative, energetic, retro-modern

**Layout:** Split panels—electric blue left, dark right. Script accents.

**Typography:**
- Display: `Syne` (700/800)
- Mono: `Space Mono` (400/700)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #0066ff |
| bg-dark | #1a1a2e |
| accent-neon | #d4ff00 |
| text-light | #ffffff |

**Signature Elements:**
- Electric blue + neon yellow contrast
- Halftone texture patterns
- Neon badges/callouts
- Script typography for creative flair

---

#### 4. Dark Botanical

**Vibe:** Elegant, sophisticated, artistic, premium

**Layout:** Centered content on dark. Abstract soft shapes in corner.

**Typography:**
- Display: `Cormorant` (400/600) — elegant serif
- Body: `IBM Plex Sans` (300/400)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #0f0f0f |
| text-primary | #e8e4df |
| text-secondary | #9a9590 |
| accent-warm | #d4a574 |
| accent-pink | #e8b4b8 |
| accent-gold | #c9b896 |

**Signature Elements:**
- Abstract soft gradient circles (blurred, overlapping)
- Warm color accents (pink, gold, terracotta)
- Thin vertical accent lines
- Italic signature typography
- **No illustrations—only abstract CSS shapes**

---

### Light Themes

#### 5. Notebook Tabs

**Vibe:** Editorial, organized, elegant, tactile

**Layout:** Cream paper card on dark background. Colorful tabs on right edge.

**Typography:**
- Display: `Bodoni Moda` (400/700) — classic editorial
- Body: `DM Sans` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-outer | #2d2d2d |
| bg-page | #f8f6f1 |
| text-primary | #1a1a1a |
| tab-1 (Mint) | #98d4bb |
| tab-2 (Lavender) | #c7b8ea |
| tab-3 (Pink) | #f4b8c5 |
| tab-4 (Sky) | #a8d8ea |
| tab-5 (Cream) | #ffe6a7 |

**Signature Elements:**
- Paper container with subtle shadow
- Colorful section tabs on right edge (vertical text)
- Binder hole decorations on left
- Tab text must scale with viewport: `font-size: clamp(0.5rem, 1vh, 0.7rem)`

---

#### 6. Pastel Geometry

**Vibe:** Friendly, organized, modern, approachable

**Layout:** White card on pastel background. Vertical pills on right edge.

**Typography:**
- Display: `Plus Jakarta Sans` (700/800)
- Body: `Plus Jakarta Sans` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #c8d9e6 |
| card-bg | #faf9f7 |
| pill-pink | #f0b4d4 |
| pill-mint | #a8d4c4 |
| pill-sage | #5a7c6a |
| pill-lavender | #9b8dc4 |
| pill-violet | #7c6aad |

**Signature Elements:**
- Rounded card with soft shadow
- Vertical pills on right edge with varying heights
- Consistent pill width, heights: short → medium → tall → medium → short
- Download/action icon in corner

---

#### 7. Split Pastel

**Vibe:** Playful, modern, friendly, creative

**Layout:** Two-color vertical split (peach left, lavender right).

**Typography:**
- Display: `Outfit` (700/800)
- Body: `Outfit` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-peach | #f5e6dc |
| bg-lavender | #e4dff0 |
| text-dark | #1a1a1a |
| badge-mint | #c8f0d8 |
| badge-yellow | #f0f0c8 |
| badge-pink | #f0d4e0 |

**Signature Elements:**
- Split background colors
- Playful badge pills with icons
- Grid pattern overlay on right panel
- Rounded CTA buttons

---

#### 8. Vintage Editorial

**Vibe:** Witty, confident, editorial, personality-driven

**Layout:** Centered content on cream. Abstract geometric shapes as accent.

**Typography:**
- Display: `Fraunces` (700/900) — distinctive serif
- Body: `Work Sans` (400/500)

**Colors:**
| Role | Value |
|------|-------|
| bg-cream | #f5f3ee |
| text-primary | #1a1a1a |
| text-secondary | #555555 |
| accent-warm | #e8d4c0 |

**Signature Elements:**
- Abstract geometric shapes (circle outline + line + dot)
- Bold bordered CTA boxes
- Witty, conversational copy style
- **No illustrations—only geometric CSS shapes**

---

### Specialty Themes

#### 9. Neon Cyber

**Vibe:** Futuristic, techy, confident

**Typography:** `Clash Display` + `Satoshi` (Fontshare)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #0a0f1c |
| accent-cyan | #00ffcc |
| accent-magenta | #ff00aa |

**Signature:** Particle backgrounds, neon glow, grid patterns

---

#### 10. Terminal Green

**Vibe:** Developer-focused, hacker aesthetic

**Typography:** `JetBrains Mono` (monospace only)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #0d1117 |
| accent-green | #39d353 |

**Signature:** Scan lines, blinking cursor, code syntax styling

---

#### 11. Swiss Modern

**Vibe:** Clean, precise, Bauhaus-inspired

**Typography:** `Archivo` (800) + `Nunito` (400)

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #ffffff |
| text-primary | #000000 |
| accent-red | #ff3300 |

**Signature:** Visible grid, asymmetric layouts, geometric shapes

---

#### 12. Paper & Ink

**Vibe:** Editorial, literary, thoughtful

**Typography:** `Cormorant Garamond` + `Source Serif 4`

**Colors:**
| Role | Value |
|------|-------|
| bg-primary | #faf9f7 |
| text-primary | #1a1a1a |
| accent-crimson | #c41e3a |

**Signature:** Drop caps, pull quotes, elegant horizontal rules

---

## Font Pairing Quick Reference

| Preset | Display Font | Body Font | Source |
|--------|--------------|-----------|--------|
| Bold Signal | Archivo Black | Space Grotesk | Google |
| Electric Studio | Manrope | Manrope | Google |
| Creative Voltage | Syne | Space Mono | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Google |
| Split Pastel | Outfit | Outfit | Google |
| Vintage Editorial | Fraunces | Work Sans | Google |
| Neon Cyber | Clash Display | Satoshi | Fontshare |
| Terminal Green | JetBrains Mono | JetBrains Mono | JetBrains |
| Swiss Modern | Archivo | Nunito | Google |
| Paper & Ink | Cormorant Garamond | Source Serif 4 | Google |

---

## Style Effect → Feeling Mapping

| Feeling | Effects |
|---------|---------|
| Dramatic/Cinematic | Slow fade-ins, scale transitions, dark backgrounds, parallax |
| Techy/Futuristic | Neon glows, grid patterns, monospace accents, cyan/magenta |
| Playful/Friendly | Bouncy easing, large radius, pastels, floating animations |
| Professional/Corporate | Subtle/fast animations, navy/slate, precise spacing |
| Calm/Minimal | Very slow motion, whitespace, muted colors, serifs |
| Editorial/Magazine | Strong typography, pull quotes, grid-breaking, serif headlines |

---

## Design Aesthetics

**Focus on distinctive, custom-crafted design:**
- **Typography**: Choose fonts that are beautiful, unique. Avoid generic fonts like Arial and Inter.
- **Color & Theme**: Commit to a cohesive aesthetic. Dominant colors with sharp accents outperform timid palettes.
- **Motion**: Prioritize high-impact moments — one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- **Backgrounds**: Create atmosphere and depth — layer gradients, use geometric patterns, or add contextual effects.

## DO NOT USE (Generic AI Patterns)

**Fonts:** Inter, Roboto, Arial, system fonts as display

**Colors:** `#6366f1` (generic indigo), purple gradients on white

**Layouts:** Everything centered, generic hero sections, identical card grids

**Decorations:** Realistic illustrations, gratuitous glassmorphism, drop shadows without purpose

---

## CSS Gotchas

### Negating CSS Functions

**WRONG — silently ignored by browsers (no console error):**
```css
right: -clamp(28px, 3.5vw, 44px);   /* Browser ignores this */
margin-left: -min(10vw, 100px);      /* Browser ignores this */
```

**CORRECT — wrap in `calc()`:**
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* Works */
margin-left: calc(-1 * min(10vw, 100px));     /* Works */
```

CSS does not allow a leading `-` before function names. The browser silently discards the entire declaration. **Always use `calc(-1 * ...)` to negate CSS function values.**
