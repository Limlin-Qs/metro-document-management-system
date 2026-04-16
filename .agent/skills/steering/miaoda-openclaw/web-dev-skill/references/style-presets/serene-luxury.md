# Serene Luxury · 静谧奢雅 UI 风格模板

## 设计语言 (Design Language)

| 维度 | 描述 |
|------|------|
| **美学方向** | 新亚洲极简奢华——大面积留白搭配衬线字体，用克制的设计语言传递高端住宅的从容气质 |
| **视觉签名** | 超大圆角卡片 (3rem-4rem)、旋转错位叠放的图片卡片组、装饰性巨型序号、pill 形状标签、玻璃拟态（backdrop-blur + 半透明边框） |
| **情感基调** | 宁静、从容、精英感——如湖面般平静而深邃，克制中透露品质 |

---

## 配色方案 (Color Scheme)

### 7 色角色系统

| 角色 | Tailwind Class | HEX | 用途 |
|------|---------------|-----|------|
| **bg** | `bg-slate-50` | `#F8FAFC` | 页面全局背景 |
| **surface** | `bg-white` | `#FFFFFF` | 卡片、面板、弹窗底色 |
| **header** | `bg-slate-900` | `#0F172A` | 暗色区块背景（配套设施区）、主按钮、Footer 品牌色 |
| **text** | `text-slate-900` | `#0F172A` | 主标题、正文主色 |
| **textMuted** | `text-slate-500` | `#64748B` | 副标题、描述性文字 |
| **accent** | `text-blue-600` | `#2563EB` | 区块标签、交互高亮、hover 状态、功能性圆点 |
| **border** | `border-slate-100` | `#F1F5F9` | 卡片边框、分隔线 |

### 辅助色彩

| 角色 | Tailwind Class | HEX | 用途 |
|------|---------------|-----|------|
| **accentSecondary** | `bg-lime-400` | `#A3E635` | 状态标签、Icon hover 高亮、CTA 次要强调 |
| **heroBackground** | `bg-[#A8B5C1]` | `#A8B5C1` | Hero 区域灰蓝底色，湖水灵感 |
| **subtleBackground** | `bg-slate-100` | `#F1F5F9` | 交替区块背景、Highlight 区域 |
| **tagBackground** | `bg-blue-50` | `#EFF6FF` | 轻量标签底色 |
| **darkSurface** | `bg-slate-800/50` | `rgba(30,41,59,0.5)` | 暗色区块内的半透明嵌套容器 |
| **glassWhite** | `bg-white/15` ~ `bg-white/90` | — | 玻璃拟态容器（不同透明度层级） |

---

## 字体排版 (Typography)

### 字体族

| 用途 | 字体族 | CSS 声明 |
|------|--------|----------|
| **正文 / UI** | Inter | `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| **标题 / 装饰** | Noto Serif SC | `'Noto Serif SC', serif` — 通过 `.serif-font` 类名应用 |

### 文字层级

| 层级 | 场景 | 尺寸 | 字重 | 附加样式 |
|------|------|------|------|----------|
| **Display** | Hero 主标题 | `text-6xl` / `md:text-8xl` | `font-light` | `.serif-font`, `leading-[1.1]`, 白色 |
| **H1** | Hero 副标题 | `text-4xl` / `md:text-5xl` | `font-light` | `.serif-font`, `opacity-90`, `tracking-tight` |
| **H2** | 区块大标题 | `text-4xl` / `md:text-5xl` / `md:text-6xl` | 默认 | `.serif-font` |
| **H3** | 卡片标题 | `text-2xl` / `text-3xl` / `md:text-5xl` | `font-bold` | `.serif-font`, `text-slate-800` |
| **H4** | 子项标题 | `text-xl` | `font-bold` | `text-slate-800` |
| **Label** | 区块英文标签 | `text-xs` | `font-bold` | `uppercase tracking-widest text-blue-600` 或 `text-lime-400`（暗底） |
| **Micro Label** | 辅助标签 | `text-[10px]` / `text-[9px]` | `font-bold` | `uppercase tracking-[0.2em]` ~ `tracking-[0.4em]` |
| **Body** | 正文描述 | `text-lg` | `font-light` | `leading-relaxed text-slate-500` 或 `text-white/80` |
| **Small** | 次要文字 | `text-sm` | 默认 / `font-medium` | `text-slate-500` |
| **Decorative Number** | 序号装饰 | `text-5xl` / `text-6xl` / `text-[40rem]` | `font-light` / `font-bold` | `.serif-font`, `text-slate-200` 或 `text-white/10` |

---

## 页面结构 (Page Structure)

从上至下的全页布局：

```
[Fixed Header] — 透明→滚动后白色毛玻璃（bg-white/90 backdrop-blur-md shadow-sm）
├─ 品牌名（serif-font, text-2xl, tracking-widest）
├─ 导航栏（hidden md:flex, text-sm uppercase tracking-widest）
└─ CTA 按钮（pill 形状, border + hover 填充）

[Hero Section] — min-h-screen, 灰蓝底色 #A8B5C1, 两栏 grid
├─ 左：pill 标签组 + 超大标题 + 描述 + 搜索输入框（玻璃拟态 pill）
└─ 右：三张卡片错位旋转叠放，超大圆角白色 padding 包裹图片

[Highlights Section] — py-20, bg-slate-100
└─ 4 列 grid，白色圆角卡片，数字突出 + 底部装饰横线

[Units Section] — py-32, bg-white
├─ 标题行 + Tab 按钮组（pill 切换）
└─ 两栏 grid：左侧大圆角图片占位 + 右侧详情（序号装饰 + 标签 + 特性列表 + 价格 + CTA）

[Amenities Section] — py-32, bg-slate-900 text-white
├─ 标题 + 描述
└─ 两栏：左侧图标卡片 grid / 右侧暗色半透明圆角面板（分类列表 + 亮色提示卡片）

[Location Section] — py-32, bg-white
├─ 居中标题
└─ 两栏：左侧序号优势列表卡片 / 右侧超大圆角地图图片 + 浮层信息

[Contact Section] — py-32, bg-slate-100
└─ 超大圆角白色卡片（4rem），两栏：左侧联系方式 + CTA / 右侧背景图 + 居中圆形玻璃浮层

[Footer] — bg-white, border-t, py-16
├─ 品牌名 + 描述 / 信息列
└─ 底部版权栏（text-xs uppercase tracking-widest）
```

---

## 视觉风格 (Visual Style)

### 间距系统

| 场景 | 值 |
|------|-----|
| 页面容器 | `container mx-auto px-6 md:px-12` |
| 区块纵向间距 | `py-20` (轻量) / `py-32` (标准) |
| 区块标题与内容间距 | `mb-16` ~ `mb-24` |
| 卡片内边距 | `p-8` (小卡) / `p-10` ~ `p-12` (大卡) / `p-12 md:p-24` (重要面板) |
| Grid 间距 | `gap-8` (紧凑) / `gap-12` ~ `gap-16` (标准) / `gap-20` (宽松) |
| 元素间纵向间距 | `mb-4` ~ `mb-6` (紧凑) / `mb-8` ~ `mb-12` (标准) / `mb-14` ~ `mb-20` (宽松) |

### 圆角系统

| 场景 | 值 |
|------|-----|
| Pill 按钮 / 标签 | `rounded-full` |
| 小型卡片 / 按钮 | `rounded-xl` ~ `rounded-2xl` |
| 标准卡片 | `rounded-3xl` |
| 主要面板 / 图片容器 | `rounded-[3rem]` ~ `rounded-[3.5rem]` |
| 超大容器 | `rounded-[4rem]` |
| 图标容器 | `rounded-2xl` ~ `rounded-3xl` |

### 阴影系统

| 场景 | 值 |
|------|-----|
| 卡片默认 | `shadow-sm` |
| 卡片 hover | `shadow-xl` / `shadow-2xl` |
| 浮动主卡片 | `shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]` |
| 前景叠加卡片 | `shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)]` |
| 超大容器 | `shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]` |
| 主按钮 | `shadow-xl` / `shadow-2xl` |
| 滚动回顶按钮 | `shadow-2xl` |

---

## 组件规范 (Component Specs)

### 按钮

| 类型 | 样式 |
|------|------|
| **主按钮 (CTA)** | `bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-xl transform hover:-translate-y-1 transition-all` |
| **大型 CTA** | `bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-bold hover:bg-slate-800 shadow-2xl transform hover:-translate-y-1 transition-all` |
| **幽灵按钮** | `bg-white text-slate-900 border border-slate-200 px-12 py-5 rounded-[2rem] font-bold hover:bg-slate-50 transition-all` |
| **Header 按钮** | `px-6 py-2 rounded-full border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white text-sm font-medium transition-all` |
| **Tab 按钮 (Active)** | `px-6 py-3 rounded-full bg-slate-900 text-white shadow-lg text-sm font-medium` |
| **Tab 按钮 (Inactive)** | `px-6 py-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm font-medium transition-all` |
| **回顶按钮** | `w-12 h-12 bg-slate-800 text-white rounded-full shadow-2xl hover:bg-slate-700 fixed bottom-10 right-10 animate-bounce` |
| **圆形图标按钮 (亮)** | `h-11 w-11 rounded-full bg-slate-900 text-white shadow-lg hover:scale-110 transition-transform` |
| **圆形图标按钮 (强调)** | `h-9 w-9 rounded-full bg-lime-400 text-slate-900 shadow-md hover:scale-105 transition-transform` |

### 卡片

| 类型 | 样式 |
|------|------|
| **数据卡片** | `p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-300` + 底部装饰线 `w-8 h-1 bg-slate-200 group-hover:bg-blue-500` |
| **图片展示卡片** | `bg-white p-5 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]` 内含 `rounded-[2.2rem]` 图片区 |
| **信息面板** | `p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all` |
| **暗色嵌套面板** | `bg-slate-800/50 rounded-[3rem] p-12 border border-slate-800` |
| **提示卡片 (暗底亮色)** | `bg-lime-400/10 border border-lime-400/20 p-8 rounded-3xl` |
| **超大联系面板** | `bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50` |
| **玻璃拟态容器** | `bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3.5rem] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.03)]` |

### 标签 (Tag / Badge)

| 类型 | 样式 |
|------|------|
| **Pill 标签 (浅色)** | `px-5 py-2 rounded-full border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium` |
| **属性标签 (蓝)** | `bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold` |
| **属性标签 (灰)** | `bg-slate-50 text-slate-700 px-4 py-1.5 rounded-full text-sm font-semibold` |
| **状态标签 (强调)** | `bg-lime-400 text-slate-900 px-6 py-3 rounded-2xl font-bold shadow-lg` |
| **状态标签 (小)** | `bg-lime-50 text-lime-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest` |
| **状态标签 (Footer)** | `bg-lime-400/20 text-lime-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest` |

### 输入框

| 类型 | 样式 |
|------|------|
| **搜索框 (玻璃拟态)** | 外层：`bg-white/15 backdrop-blur-xl rounded-full p-2 pl-7 max-w-sm border border-white/20 focus-within:bg-white/25 shadow-2xl`；输入：`bg-transparent border-none outline-none text-white placeholder-white/50 text-sm font-light tracking-wide`；按钮：`bg-white text-slate-800 h-10 w-10 rounded-full shadow-lg` |

### 图标容器

| 类型 | 样式 |
|------|------|
| **功能图标 (暗底)** | `w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-slate-900 transition-all duration-300` |
| **联系信息图标** | `w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300` |
| **装饰圆点** | `w-1.5 h-1.5 rounded-full bg-blue-500` |

### 导航栏 (Header)

| 状态 | 样式 |
|------|------|
| **默认 (透明)** | `bg-transparent py-8` |
| **滚动后** | `bg-white/90 backdrop-blur-md shadow-sm py-4` |
| **导航链接** | `text-sm uppercase tracking-widest font-medium text-slate-600 hover:text-blue-600 transition-colors` |
| **固定定位** | `fixed top-0 left-0 w-full z-50 transition-all duration-500` |

### 装饰元素

| 元素 | 样式 |
|------|------|
| **背景巨型数字** | `text-[40rem] font-bold text-white/10 serif-font absolute` |
| **序号编号** | `text-5xl` / `text-6xl font-light text-slate-200 serif-font` |
| **分隔横线** | `h-px bg-slate-200` / `w-8 h-1 bg-slate-200` / `w-10 h-0.5 bg-white/60` |
| **地图热点脉冲** | `w-12 h-12 bg-white rounded-full animate-pulse shadow-2xl` 内含 `w-3 h-3 bg-blue-600 rounded-full` |
| **浮动圆形装饰** | `bg-white/10 backdrop-blur-2xl border border-white/30 p-16 rounded-full w-80 h-80` |

---

## 响应式断点 (Responsive Breakpoints)

| 断点 | 宽度 | 行为 |
|------|------|------|
| **默认 (Mobile)** | < 768px | 单列布局；导航隐藏；`px-6`；`text-6xl` 标题；卡片堆叠 |
| **md** | >= 768px | 导航显示 (`hidden md:flex`)；`px-12`；`text-8xl` Hero 标题；`md:p-24` 大面板内边距 |
| **lg** | >= 1024px | 双栏 Grid 生效 (`grid-cols-2` / `lg:grid-cols-4`)；Hero 右侧卡片精确定位；卡片固定宽度 (`lg:w-[460px]`) |

---

## 风格建议 (Style Recommendations)

1. **保持克制的奢华感**：坚持大面积留白与衬线字体的组合，用超大圆角（3rem-4rem）和柔和阴影替代硬朗边框，所有交互动效使用 `transition-all duration-300` 以上的缓动，确保视觉体验如湖面般平静流畅。

2. **维护双色调层次体系**：页面在浅色区块（slate-50/white）与深色区块（slate-900）之间交替，用 lime-400 作为点睛强调色打破沉稳基调。所有装饰性微文字保持 `uppercase tracking-widest text-[10px]` 的统一格式，营造国际化高端感。

3. **善用玻璃拟态与错位构图**：关键视觉区域采用 `backdrop-blur` + 半透明白色边框的玻璃拟态效果，图片卡片以 `rotate` + `z-index` 叠放形成纵深感，hover 时回正（`hover:rotate-0 duration-1000`），创造优雅的交互层次。
