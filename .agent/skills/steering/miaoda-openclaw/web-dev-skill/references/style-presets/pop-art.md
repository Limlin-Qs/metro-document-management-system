# Pop Art · 波普艺术 UI 风格模板

---

## 1. 设计语言

本模板采用 **波普艺术 (Pop Art)** 视觉风格，灵感来自 Roy Lichtenstein 与 Andy Warhol 时代的美式漫画印刷美学。核心表达元素包括：

- **粗重黑色描边 (Heavy Black Outlines)**：所有卡片、按钮、容器均带有 4–8px 纯黑实线边框，营造漫画分镜般的强烈轮廓感。
- **硬阴影偏移 (Hard-Offset Shadows)**：阴影不使用模糊扩散，而是纯色块状偏移（如 `12px 12px 0 0 #000`），模仿丝网印刷错版效果。
- **半色调圆点纹理 (Halftone Dot Pattern)**：页面背景采用 `radial-gradient` 生成的圆点网格（2px 点径 / 20px 间距），致敬 Ben-Day dots 印刷技法。
- **超大粗体字 (Bold & Loud Typography)**：标题使用装饰性手写体 `Bangers`，正文使用高权重无衬线体，所有文本均大写并加宽字距，传达直接、有力的视觉冲击。
- **高饱和纯色系 (High-Saturation Flat Colors)**：调色板选用红、黄、绿、蓝四原色搭配纯黑纯白，无渐变、不透明度极少，保持平面化。
- **微倾斜布局 (Tilted Elements)**：标题块、CTA 卡片带有 1–2 度微旋转（`rotate-[-2deg]` / `rotate-[1deg]`），增添手工拼贴感。
- **超圆角容器 (Super-Rounded Containers)**：圆角值达到 2rem–4rem，配合粗描边形成"贴纸"质感。

---

## 2. 配色方案

### 七色角色体系

| 角色 | 色值 | Tailwind 类 | 用途说明 |
|------|------|-------------|---------|
| **主色 (Primary)** | `#FFDE00` | `bg-[#FFDE00]` | 页面主背景、主按钮默认态 |
| **强调色 (Accent)** | `#FF3B30` | `bg-[#FF3B30]` | 番茄主体、停止/暂停按钮、成就标题背景、危险操作 |
| **成功色 (Success)** | `#4CD964` | `bg-[#4CD964]` | 开始按钮、进度条填充、植物茎叶、侧边栏标题阴影 |
| **信息色 (Info)** | `#007AFF` | `bg-[#007AFF]` | 商店选中态、社区 CTA 卡片、连续记录数值、选择按钮 |
| **中性前景 (Foreground)** | `#000000` | `bg-black` | 描边、阴影、头部导航栏、标题块背景、主要文本 |
| **中性背景 (Background)** | `#FFFFFF` | `bg-white` | 卡片基底、内容面板、未选中按钮底色 |
| **辅助暖底 (Warm Surface)** | `#FFF9C4` / `#FFFDF5` | `bg-[#FFF9C4]` / `bg-[#FFFDF5]` | 侧边栏背景、计时器卡片内底色，降低白色刺眼感 |

### 辅助功能色

| 用途 | 色值 | 说明 |
|------|------|------|
| 按钮黄 | `#FFCC00` | 重置按钮、成就导航激活态、统计数值高亮 |
| 状态绿点 | `green-400` | 计时运行指示灯（带 `animate-pulse`） |
| 状态红点 | `red-400` | 计时就绪指示灯 |
| 遮罩层 | `black/60` + `backdrop-blur-md` | 收获弹窗背景遮罩 |

---

## 3. 字体排版

### 字体族

| 角色 | 字体 | 加载方式 | CSS 类 |
|------|------|---------|--------|
| **装饰标题** | `Bangers` | Google Fonts (`cursive`) | `.pop-font` |
| **正文 / 中文** | `Noto Sans SC` | Google Fonts (`sans-serif`) | 默认 `body` |
| **系统回退** | system-ui, sans-serif | 内置 | Tailwind 默认 |

### 字号层级

| 层级 | 尺寸 | 权重 | 附加样式 | 用途 |
|------|------|------|---------|------|
| **超大数字** | `text-[6.5rem]` / `text-[8.5rem]` (md) | `font-black` (900) | `tracking-[0.1em]`, `leading-none` | 计时器倒计时数字 |
| **弹窗标题** | `text-6xl` | `font-black` | `italic`, `uppercase`, `tracking-widest` | 收获成功弹窗 |
| **区块大标题** | `text-5xl` | `font-black` | `uppercase`, `tracking-tighter`, 带背景色块 | "Seed Market" / "Hall of Fame" |
| **侧边栏标题** | `text-3xl` | `font-black` | `uppercase`, `leading-none`, `tracking-tighter`, `text-center` | 品牌名 |
| **卡片标题** | `text-2xl` ~ `text-3xl` | `font-black` | `uppercase`, `italic`, `tracking-tight` | 统计面板、植物名称 |
| **引言标题** | `text-xl` | `font-black` | `uppercase`, `underline decoration-8 decoration-yellow-400` | 每日引言标题 |
| **标签文字** | `text-xs` ~ `text-sm` | `font-black` | `uppercase`, `tracking-widest` | 状态栏、标签、辅助说明 |
| **微型标签** | `text-[10px]` | `font-black` | `uppercase`, `tracking-[0.2em]` | 钱包标签、解锁状态 |

### 排版规则

- 所有标题一律 `uppercase` + `font-black`
- 追踪间距 (letter-spacing) 根据层级从 `tracking-tighter` 到 `tracking-widest` 渐变
- 装饰性标题使用 `.pop-font` (Bangers)，正文使用系统默认
- 强调数值使用 `drop-shadow-[2px_2px_0_#000]` 增加立体感

---

## 4. 页面结构

### 整体布局

```
┌─────────────────────────────────────────────────────────┐
│  [Sidebar / Nav]  │         [Main Content Area]         │
│   w-80 (lg)       │   flex-1, max-w-7xl                 │
│   bg-[#FFF9C4]    │   bg-[#FFDE00] + halftone-bg        │
│   border-r-8      │                                     │
│   black           │  ┌─────────────┐ ┌────────────┐    │
│                    │  │ Left Column  │ │Right Column│    │
│  ┌──────────┐     │  │ flex-[1.5]   │ │  flex-1    │    │
│  │ Brand    │     │  │              │ │  (lg only) │    │
│  │ Title    │     │  │ Timer /      │ │            │    │
│  └──────────┘     │  │ Shop /       │ │ Stats /    │    │
│                    │  │ Achievements │ │ Quote /    │    │
│  ┌──────────┐     │  │              │ │ CTA        │    │
│  │ Nav      │     │  └─────────────┘ └────────────┘    │
│  │ Buttons  │     │                                     │
│  └──────────┘     │                                     │
│                    │                                     │
│  ┌──────────┐     │                                     │
│  │ Wallet   │     │                                     │
│  │ (bottom) │     │                                     │
│  └──────────┘     │                                     │
└─────────────────────────────────────────────────────────┘
```

### 布局规格

| 区域 | 宽度 | 内边距 | 间距 | 特殊样式 |
|------|------|--------|------|---------|
| **侧边栏** | `w-full` (mobile) / `w-80` (lg) | `p-8` | `gap-4` (导航) | `border-b-8` (mobile) / `border-r-8` (lg), `rounded-r-[3rem]` (lg) |
| **主内容区** | `flex-1` | `p-6` / `p-10` (md) / `p-12` (lg) | `gap-12` (列间) | `overflow-y-auto` |
| **左内容列** | `flex-[1.5]` | -- | `gap-10` (垂直) | 承载核心视图切换 |
| **右信息列** | `flex-1` | -- | `gap-10` (垂直) | `hidden lg:flex`，仅桌面端可见 |
| **内容容器** | `max-w-7xl` | -- | -- | `mx-auto w-full` |

### 视图切换

- 三个视图通过 `AnimatePresence` + `mode="wait"` 切换
- 进入动画：`opacity: 0 → 1`，`scale: 0.95 → 1` 或 `y: 30 → 0`
- 退出动画：`opacity: 1 → 0`，`scale: 1 → 0.95`

---

## 5. 视觉风格

### 阴影系统

| 层级 | 阴影值 | 用途 |
|------|--------|------|
| **超大** | `shadow-[24px_24px_0_0_#FFCC00]` | 弹窗卡片 |
| **大** | `shadow-[16px_16px_0_0_#000]` | 计时器主卡片 |
| **标准** | `shadow-[12px_12px_0_0_rgba(0,0,0,1)]` | 普通内容卡片、CTA 卡片 |
| **中** | `shadow-[8px_8px_0_0_#4CD964]` / `shadow-[8px_8px_0_0_#000]` | 区块标题色块 |
| **小** | `shadow-[6px_6px_0_0_#FF3B30]` / `shadow-[6px_6px_0_0_#4CD964]` | 侧边栏钱包卡片、品牌标题 |
| **按钮** | `shadow-[4px_4px_0_0_rgba(0,0,0,1)]` | 所有按钮默认态 |
| **按钮按下** | `shadow-[2px_2px_0_0_rgba(0,0,0,1)]` | 按钮 `:active` 态 |
| **文字** | `drop-shadow-[2px_2px_0_#000]` | 统计数字高亮 |
| **标签微阴影** | `shadow-[2px_2px_0_0_rgba(R,G,B,0.2)]` | 彩色标签 pill |

> 所有阴影均为 **零模糊纯色偏移**，这是波普艺术风格的核心视觉标识。

### 圆角系统

| 层级 | 圆角值 | 用途 |
|------|--------|------|
| **超大** | `rounded-[4rem]` | 弹窗卡片 |
| **大** | `rounded-[3rem]` / `rounded-[2.5rem]` | 主卡片、侧边栏右侧、番茄展示区 |
| **中** | `rounded-3xl` / `rounded-[2rem]` | 按钮、信息面板、子卡片 |
| **小** | `rounded-2xl` | 标题色块、标签、一般按钮 |
| **圆形** | `rounded-full` | 进度条、状态指示灯、pill 标签、价格标签 |

### 边框系统

| 类型 | 规格 | 用途 |
|------|------|------|
| **超粗描边** | `border-[8px] border-black` | 弹窗卡片 |
| **主描边** | `border-[6px] border-black` | 标准 PopCard 容器 |
| **标准描边** | `border-4 border-black` | 按钮、CTA 卡片、emoji 容器、进度条 |
| **细描边** | `border-2 border-black/10` | 成就图标背景 |
| **虚线边框** | `border-4 border-dashed border-black/20` | 提示/占位区域 |
| **分隔线** | `border-b-4 border-black/5` | 统计项分隔 |
| **结构边框** | `border-b-8` / `border-r-8 border-black` | 侧边栏与主内容区分隔 |

### 背景纹理

```css
.halftone-bg {
  background-image: radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px);
  background-size: 20px 20px;
}
```

### 动画与交互

| 效果 | 实现 | 触发 |
|------|------|------|
| **按钮按下** | `translate(2px, 2px)` + 阴影缩小 | `:active` |
| **激活缩放** | `scale-105` + `ring-4 ring-black ring-offset-2` | 导航按钮选中 |
| **卡片选中** | `ring-8 ring-black ring-offset-4 scale-[1.02]` | 商店植物选中 |
| **卡片悬停** | `scale-[1.01]` | 商店卡片 hover |
| **CTA 悬停** | `rotate(0) scale(1.05) translateY(-5px)` | 社区卡片 `whileHover` |
| **番茄呼吸** | `rotate: [0,2,-2,0]`, `scale: [1,1.08,1]` | 计时运行中 (repeat: Infinity, 2s) |
| **收获弹跳** | `animate-bounce` | 收获弹窗 emoji |
| **状态脉冲** | `animate-pulse` | 运行状态指示灯 |
| **视图切入** | `opacity + scale/y` 过渡 | `AnimatePresence` 页面切换 |
| **弹窗进入** | `scale: 0.8→1`, `rotate: -10→0` | 收获弹窗 |
| **遮罩进入** | `opacity: 0→1` + `backdrop-blur-md` | 弹窗背景 |

---

## 6. 组件规范

### PopCard（核心卡片）

```
容器:
  - 背景: bg-white（默认）| bg-[#FFFDF5] | bg-black
  - 边框: border-[6px] border-black
  - 阴影: shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
  - 内边距: p-6（默认）| p-8 | p-5
  - 圆角: rounded-[2.5rem]
```

### PopButton（核心按钮）

```
基础:
  - 边框: border-4 border-black
  - 阴影: shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  - 内边距: px-6 py-3（默认）| py-6（大按钮）
  - 圆角: rounded-2xl | rounded-3xl
  - 字体: font-black uppercase text-sm/text-base tracking-widest

变体色值:
  red    → bg-[#FF3B30] text-white    （暂停/停止）
  green  → bg-[#4CD964] text-black    （开始/选中）
  blue   → bg-[#007AFF] text-white    （选择/商店）
  yellow → bg-[#FFCC00] text-black    （默认/重置）
  black  → bg-black text-white        （强调）
  white  → bg-white text-black        （未选中）

交互态:
  :active  → translate-x-[2px] translate-y-[2px], 阴影缩小至 2px
  :disabled → opacity-50
  active   → scale-105, ring-4 ring-black ring-offset-2
```

### 标题色块（Section Header）

```
容器:
  - 背景: bg-black | bg-[#FF3B30]（按主题）
  - 文字: text-white
  - 内边距: px-8 py-3
  - 圆角: rounded-2xl
  - 旋转: rotate-[-1deg] | rotate-[1deg]
  - 阴影: shadow-[8px_8px_0_0_#4CD964] | shadow-[8px_8px_0_0_#000]
  - 字体: text-5xl font-black pop-font uppercase tracking-tighter
  - 显示: inline-block
```

### 状态栏（Header Bar）

```
容器:
  - 背景: bg-black
  - 文字: text-white
  - 内边距: px-8 py-5
  - 字体: font-black uppercase tracking-widest text-xs
  - 圆角: rounded-b-[2.5rem]
  - 阴影: shadow-[0_4px_0_0_rgba(0,0,0,0.1)]
  - 布局: flex justify-between items-center
```

### 进度条

```
外框:
  - 背景: bg-black
  - 边框: border-4 border-black
  - 圆角: rounded-full
  - 内边距: p-1

内轨:
  - 背景: bg-gray-900
  - 高度: h-8
  - 圆角: rounded-full

填充:
  - 背景: bg-[#4CD964]
  - 圆角: rounded-full
  - 动画: motion animate width

标签:
  - 覆盖居中: absolute inset-0 flex items-center justify-center
  - 字体: text-white text-[10px] font-black uppercase tracking-widest
```

### 统计项

```
布局: flex justify-between items-center
分隔: border-b-4 border-black/5 pb-5
标签: font-black text-lg opacity-60 uppercase tracking-widest
数值: font-black text-5xl + 主题色 + drop-shadow-[2px_2px_0_#000]
```

### Pill 标签

```
容器:
  - 背景: bg-{color}-50
  - 文字: text-{color}-500
  - 内边距: px-4 py-2
  - 字体: text-xs font-black uppercase
  - 圆角: rounded-full
  - 边框: border-2 border-{color}-100
  - 阴影: shadow-[2px_2px_0_0_rgba(R,G,B,0.2)]
```

### 弹窗叠层（Overlay Modal）

```
遮罩:
  - 背景: bg-black/60
  - 效果: backdrop-blur-md
  - 层级: z-[100]
  - 布局: fixed inset-0 flex items-center justify-center p-6

卡片:
  - 背景: bg-white
  - 边框: border-[8px] border-black
  - 内边距: p-12
  - 圆角: rounded-[4rem]
  - 阴影: shadow-[24px_24px_0_0_#FFCC00]
  - 入场: scale 0.8→1, rotate -10→0
```

### 引言区块

```
引文:
  - 字体: text-base font-bold leading-relaxed italic
  - 透明度: opacity-70
  - 左边框: border-l-8 border-yellow-400 pl-6
```

---

## 7. 响应式断点

本模板基于 Tailwind CSS 默认断点体系，采用移动优先策略：

| 断点 | 宽度 | 布局变化 |
|------|------|---------|
| **默认 (Mobile)** | `< 768px` | 单列垂直布局；侧边栏变为顶部水平导航条 (`w-full`, `border-b-8`)；导航文字隐藏仅显示图标；右侧信息列隐藏；计时器/番茄垂直堆叠；主内容 `p-6` |
| **md (Tablet)** | `>= 768px` | 计时器区域变为横向两栏 (`flex-row`)；商店/成就 grid 变为 `grid-cols-2`；主内容 `p-10`；计时数字放大至 `text-[8.5rem]` |
| **lg (Desktop)** | `>= 1024px` | 整体变为侧边栏 + 主内容横向布局 (`flex-row`)；侧边栏固定左侧 `w-80`、`border-r-8`、`rounded-r-[3rem]`；右侧统计/引言/CTA 列可见 (`hidden lg:flex`)；导航按钮显示文字标签；钱包卡片可见；主内容 `p-12` |

### 关键响应式类

```
侧边栏:     w-full lg:w-80 | border-b-8 lg:border-b-0 lg:border-r-8
整体方向:    flex-col lg:flex-row
导航文字:    hidden lg:inline
钱包/品牌:   hidden lg:block
右侧栏:     hidden lg:flex
计时器内部:  flex-col md:flex-row
网格列数:    grid-cols-1 md:grid-cols-2
内边距:      p-6 md:p-10 lg:p-12
```

---

## 8. 风格建议

- **保持色彩纯度**：波普风格的核心在于高饱和、零渐变的纯色块。避免使用半透明叠加或柔和渐变，它们会削弱视觉冲击力。
- **阴影必须硬边**：所有阴影保持 0 模糊值的纯色偏移。模糊阴影 (`blur`) 属于扁平化或 Material 风格，与波普美学冲突。
- **描边不可省略**：每个可见容器至少带有 `border-2 border-black` 以上的描边，描边是区分波普风格与普通扁平化的关键特征。
- **字体权重极端化**：优先使用 `font-black` (900) 或 `font-bold` (700)，避免 regular (400) 或 light (300)。文本应具有视觉重量感。
- **大写与字距是语言**：标题和标签一律 `uppercase` + 宽字距 (`tracking-widest`)，这不仅是装饰，更是波普风格的排版语法。
- **善用微旋转**：对标题色块、CTA 元素施加 1–3 度的 `rotate`，模拟拼贴/剪报效果，但不要过度，避免阅读困难。
- **圆角要极端**：要么使用超大圆角 (`rounded-[2.5rem]+`)，要么完全无圆角。中等圆角 (`rounded-md`, `rounded-lg`) 会显得不够果断。
- **动画应夸张但有节制**：交互动画使用位移、缩放、旋转等变换，避免使用 `ease` 类缓动函数的渐变过渡，保持动画的"弹跳"和"突然"感。
- **用色块代替线性层级**：区分内容层级时，优先使用纯色背景块 (`bg-black text-white`, `bg-[#FF3B30] text-white`) 而非仅调整字号，让信息层级更加图形化。
- **半色调纹理点睛**：背景的 halftone 圆点纹理是定义风格的关键细节，保持 `2px/20px` 的参数比例以确保纹理可辨但不喧宾夺主。
