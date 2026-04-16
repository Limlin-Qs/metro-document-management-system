# Fresh Mint · 清新薄荷 UI 风格模板

---

## 1. 设计语言

整体风格为**清新有机（Organic Fresh）**，以薄荷绿/翠绿为主色调，搭配大圆角卡片与磨砂玻璃效果，营造出轻量、通透、友好的阅读体验。设计遵循以下核心原则：

- **通透感**：大量使用 `backdrop-blur`、半透明白底（`white/30`、`white/80`）和渐变背景，形成层叠的玻璃质感
- **有机形态**：超大圆角（24px-32px）、圆形装饰元素、脉冲动画指示器，远离机械直线感
- **信息层级分明**：通过字重梯度（font-black 900 → font-bold 700 → font-bold 中小号）和色彩明暗建立清晰的视觉层级
- **留白充裕**：section 间距 32px（space-y-8），卡片内边距 32px（p-8），整体呈现呼吸感

---

## 2. 配色方案

### 主色系统（7 色角色）

| 角色 | 色值 | Tailwind 类 | 用途 |
|------|------|-------------|------|
| **主色 Primary** | `#00CBA9` | 自定义 `bg-[#00CBA9]` | CTA 按钮、进度环、图表主线、高亮文本、脉冲指示点 |
| **主色悬停 Primary Hover** | `#00B89A` | 自定义 `hover:bg-[#00B89A]` | 按钮悬停态 |
| **页面背景 Background** | `#F6FBF9` | 自定义 `bg-[#F6FBF9]` | 全局页面底色 |
| **卡片背景 Surface** | `#FFFFFF` | `bg-white` | 所有内容卡片底色 |
| **正文深色 Text Primary** | `#0F172A` | `text-slate-900` | 标题、核心数字 |
| **辅助文字 Text Secondary** | `#94A3B8` | `text-slate-400` | 标签、说明、次要信息 |
| **警示/强调 Accent** | `#EA580C` / `#F97316` | `text-orange-600` / `text-orange-400` | 告警标签、下降趋势箭头、勋章徽标 |

### 扩展色值参考

| 色值 | 用途 |
|------|------|
| `#8FE2D2` → `#B9F1E6` → `#F6FBF9` | 顶部渐变背景（gradient-to-br） |
| `#F1F5F9` | SVG 环形背景轨道、网格线 |
| `#F8FDFB` | 浅薄荷功能卡底色 |
| `#E9F7F4` | 薄荷卡片边框、图标底色 |
| `#ECFDF5` / `emerald-50` | 正向趋势徽章背景、高亮行底色 |
| `#FFF7ED` / `orange-50` | 告警行底色 |
| `#FEF2F2` / `red-50/40` | 高风险提示底色 |
| `#1E293B` | 深色标签（slate-800）、图表MAX标注气泡 |

### 状态色映射

| 状态 | 背景 | 文字 | 边框 |
|------|------|------|------|
| 正向/上升 | `emerald-50` | `emerald-500` / `emerald-600` | `emerald-100` |
| 告警/下降 | `orange-50/40` | `orange-600` | `orange-100/50` |
| 高风险 | `red-50/40` | `red-500` | `red-100/50` |
| 中性 | `slate-50` | `slate-400` | `slate-100` |

---

## 3. ECharts 主题样式

以下为项目图表的 ECharts 主题配置：

```json
{
  "color": ["#00CBA9", "#8FE2D2", "#F59E0B", "#94A3B8", "#1E293B"],
  "backgroundColor": "transparent",
  "textStyle": {
    "fontFamily": "'Noto Sans SC', sans-serif",
    "fontWeight": 800,
    "color": "#94A3B8",
    "fontSize": 10
  },
  "line": {
    "itemStyle": {
      "borderWidth": 3,
      "borderColor": "#FFFFFF",
      "color": "#00CBA9"
    },
    "lineStyle": {
      "width": 4,
      "color": "#00CBA9"
    },
    "symbolSize": 10,
    "symbol": "circle",
    "smooth": false
  },
  "categoryAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": {
      "color": "#94A3B8",
      "fontSize": 10,
      "fontWeight": 800
    },
    "splitLine": { "show": false }
  },
  "valueAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": { "show": false },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "type": "dashed",
        "dashOffset": 6,
        "color": "#F1F5F9"
      }
    }
  },
  "tooltip": {
    "backgroundColor": "#FFFFFF",
    "borderColor": "transparent",
    "borderWidth": 0,
    "borderRadius": 16,
    "padding": 12,
    "textStyle": {
      "color": "#0F172A",
      "fontWeight": 800,
      "fontSize": 12
    },
    "extraCssText": "box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);"
  },
  "markPoint": {
    "label": {
      "color": "#FFFFFF",
      "fontSize": 10,
      "fontWeight": 900
    },
    "itemStyle": {
      "color": "#1E293B"
    }
  }
}
```

### 图表容器规范

- 容器圆角：`32px`（与卡片一致）
- 容器内边距：`24px`（p-6）
- 图表区域高度：`220px`
- 图表上方间距（标题与图表）：`32px`（mb-8）
- 图表下方注释区：`rounded-[24px]` 底色 `slate-50/50`，边框 `slate-100`，内边距 `20px`

### 数据标注样式

- 极值标注：深色气泡 `#1E293B`，白色文字，圆角 `6px`，带三角箭头指向数据点
- 常规标注：`#64748B`（slate-500），9px，fontWeight 800

---

## 4. 字体排版

### 字体族

```css
font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
```

通过 Google Fonts 引入：`Noto Sans SC` 权重 400 / 500 / 700 / 900。

### 字号与字重层级

| 层级 | 字号 | 字重 | 颜色 | 用途 |
|------|------|------|------|------|
| 超大数字 | `text-6xl`（60px） | `font-[900]` | `slate-900` | NPS 中心分数 |
| 大数字 | `text-4xl`（36px） | `font-extrabold`（800） | `slate-900` | StatCard 数值 |
| 数据强调 | `text-3xl`（30px） | `font-black`（900） | `slate-900` / `emerald-600` | 卡片内核心统计值 |
| 页面标题 | `text-3xl`（30px） | `font-[900]` | `slate-900` | H1 |
| 区块标题 | `text-2xl`（24px） | `font-black`（900） | `slate-900` | H2（如"核心研究组"） |
| 小节标题 | `text-xl`（20px） | `font-black`（900） | `slate-800` | H3（如"关键板块扫描"） |
| 内容标题 | `text-lg`（18px） | `font-black`（900） | `slate-800` | 列表项主标题、图表标题 |
| 正文/按钮 | `text-lg`（18px） | `font-black`（900） | `white` | CTA 按钮文字 |
| 副标题 | `text-sm`（14px） | `font-bold`（700） | `slate-700` / `slate-400` | 日期范围、标签 |
| 注释文字 | `text-xs`（12px） | `font-black`（900） / `font-bold`（700） | `slate-800` / `slate-400` | 图表注释行 |
| 微标签 | `text-[11px]` | `font-black`（900） | `emerald-600` / `orange-600` / `slate-400` | 状态标签、徽章文字 |
| 极小标注 | `text-[10px]` | `font-bold`（700） | `slate-400` / `emerald-600/70` | 子说明、图表 Y 轴标签 |
| 徽章 | `text-[8px]` | `font-black`（900） | `white`（红底） | 风险等级标签 "High" |

### 文字装饰

- 大写微标签：`uppercase tracking-wider` 或 `tracking-[0.2em]`
- 数字紧凑：`tracking-tight` / `tracking-tighter`
- 文字选区色：`selection:bg-emerald-100`

---

## 5. 页面结构

### 整体布局

```
[全屏背景层]
  ├─ 顶部渐变色块：高度 45vh，gradient-to-br from-#8FE2D2 via-#B9F1E6 to-#F6FBF9
  ├─ 装饰模糊圆：右上 w-64 h-64 white/20 blur-3xl
  └─ [内容层 max-w-1080px mx-auto]
       ├─ Header（px-6 pt-12 pb-8）
       │    ├─ 左：徽标标签 + 页面标题 + 副标题
       │    ├─ 右：装饰图标卡片（旋转 6deg，渐变光晕）
       │    └─ 统计周期标签胶囊
       ├─ Main（px-6 space-y-8）
       │    ├─ 摘要卡片（全宽，grid-cols-3）
       │    ├─ 双列区域（lg:grid-cols-2 gap-8）
       │    │    ├─ 左：列表扫描卡片（flex-col h-full）
       │    │    └─ 右：仪表盘卡片（SVG 环形 + 双格底部）
       │    └─ 图表区域（全宽）
       │         ├─ 黑色胶囊标题
       │         └─ 折线图卡片（含底部注释区）
       └─ Fixed 底栏（fixed bottom-0，渐变遮罩 + CTA 按钮）
```

### 内容区宽度

- 最大宽度：`max-w-[1080px]`
- 水平内边距：`px-6`（24px）
- 内容居中：`mx-auto`

### 底部固定栏

- 定位：`fixed bottom-0 left-0 right-0`
- 背景渐变：`from-[#F6FBF9] via-white/95 to-transparent`
- 模糊：`backdrop-blur-[2px]`
- 层级：`z-50`
- 内容宽度与主内容对齐：`max-w-[1080px] mx-auto`
- 页面底部预留：`pb-32`（128px，为固定栏腾出空间）

---

## 6. 视觉风格

### 圆角体系

| 元素 | 圆角值 | Tailwind 类 |
|------|--------|-------------|
| 主卡片 | `32px` | `rounded-[32px]` |
| CTA 按钮 | `28px` | `rounded-[28px]` |
| 子功能卡 / 注释区 | `24px` | `rounded-[24px]` / `rounded-3xl` |
| 统计格子 / 趋势徽章 | `24px` | `rounded-3xl` |
| 胶囊标签 | `9999px` | `rounded-full` |
| Tooltip 弹窗 | `16px` | `borderRadius: 16px` |
| 头像 / 装饰图标框 | `24px` | `rounded-3xl` |
| 装饰小图标底色 | `8px` | `rounded-lg` |
| 图表 MAX 气泡 | `6px` | `rx="6"` |

### 阴影体系

| 场景 | 阴影 | Tailwind 类 |
|------|------|-------------|
| 主内容卡片 | 大投影 + 浅色 | `shadow-xl shadow-slate-200/50` |
| CTA 按钮 | 超大投影 + 主色调 | `shadow-2xl shadow-emerald-500/40` |
| 装饰图标框 | 大投影 + 主色暗调 | `shadow-xl shadow-emerald-900/10` |
| 头像容器 | 中投影 | `shadow-md` |
| 胶囊标签 / 小按钮 | 小投影 | `shadow-sm` |
| 图标小方块 | 色调微投影 | `shadow-sm shadow-amber-200/50` / `shadow-emerald-200/50` |
| 黑色胶囊标题 | 大投影 + 深色 | `shadow-lg shadow-slate-900/10` |
| Tooltip | CSS 投影 | `box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1)` |

### 磨砂玻璃 / 半透明

| 元素 | 效果 |
|------|------|
| 顶部徽标标签 | `bg-white/30 backdrop-blur-sm border-white/40` |
| 统计周期标签 | `bg-white/80 backdrop-blur-md border-white` |
| 装饰光晕 | `bg-gradient-to-r from-emerald-400 to-teal-50 blur opacity-25` |
| 装饰圆 | `bg-white/20 blur-3xl` |
| 底栏遮罩 | `via-white/95 backdrop-blur-[2px]` |
| CTA 按钮内图标框 | `bg-white/20` |

### 交互效果

| 交互 | 效果 |
|------|------|
| 按钮按下 | `active:scale-[0.98] transition-all` |
| 光晕悬停 | `group-hover:opacity-50 transition duration-1000 group-hover:duration-200` |
| 图标悬停旋转 | `group-hover:rotate-12 transition-transform` |
| 列表行悬停 | `hover:bg-emerald-50` / `hover:bg-orange-50` + `transition-all` |
| 脉冲指示点 | `animate-pulse`（1.5s 圆点呼吸动画） |
| SVG 进度环 | `transition-all duration-1000 ease-out` |
| Tooltip 游标 | 虚线游标 `strokeDasharray: '4 4'`，颜色 `#00CBA9` |

### 装饰元素

- **DiceBear 头像/插画**：`avataaars` 风格用于人物头像，`bottts` 风格用于状态插画与吉祥物装饰
- **在线状态指示**：`emerald-500` 圆形 + 白色边框 2px + CheckCircle 图标
- **装饰吉祥物**：绝对定位右下角，`opacity-60`，`pointer-events-none`，尺寸 `w-28 h-28`

---

## 7. 组件规范

### 主卡片（Section Card）

```
容器：bg-white rounded-[32px] p-8
阴影：shadow-xl shadow-slate-200/50
边框：border border-white
溢出：overflow-hidden（用于绝对定位装饰元素裁剪）
等高：在 grid 布局中使用 h-full + flex flex-col
```

### 统计格子（Stat Grid Cell）

```
容器：rounded-3xl p-5 text-center border
默认底色：bg-slate-50/50 border-slate-100
强调底色：bg-emerald-50 border-emerald-100
标签：text-[11px] font-bold uppercase tracking-wider text-slate-400
数值：text-3xl font-black text-slate-900
趋势图标：w-4 h-4，上升 text-emerald-500 / 下降 text-orange-400
布局：grid-cols-3 gap-6
```

### StatCard 组件

```
容器：bg-white p-5 rounded-2xl shadow-sm border border-slate-50
最小高度：min-h-[140px]
标签：text-sm font-bold text-slate-400 mb-4
数值：text-4xl font-extrabold text-slate-900 tracking-tight
趋势徽章：text-xs font-bold px-3 py-1 rounded-full w-fit
  - 上升：bg-emerald-50 text-emerald-500
  - 下降：bg-red-50 text-red-500
  - 中性：bg-slate-50 text-slate-400
趋势箭头：w-3 h-3 ml-1 fill-current
```

### 状态扫描行（Status Row）

```
容器：rounded-3xl p-5 flex items-center justify-between border transition-all cursor-default
正向行：bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100/50
告警行：bg-orange-50/40 hover:bg-orange-50 border-orange-100/50
状态标签：text-[11px] font-black tracking-wider（大写）
主文字：text-lg font-black text-slate-800
子文字：text-[11px] font-bold opacity 70%
右侧插画：w-14 h-14 rounded-2xl
状态点：w-1.5 h-1.5 rounded-full
```

### 胶囊标签（Pill Badge）

```
类型 A（顶部徽标）：
  bg-white/30 backdrop-blur-sm px-2 py-1 rounded-lg border-white/40
  图标：w-3.5 h-3.5
  文字：text-[10px] font-black uppercase tracking-wider

类型 B（统计周期）：
  bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border-white shadow-sm
  脉冲点：w-1.5 h-1.5 rounded-full bg-[#00CBA9] animate-pulse
  文字：text-[11px] font-black text-[#00CBA9]

类型 C（勋章通知）：
  bg-orange-50 text-orange-600 text-[11px] font-black px-4 py-2 rounded-full
  border-orange-100 shadow-sm

类型 D（黑色胶囊标题）：
  bg-slate-900 text-white px-5 py-2.5 rounded-full text-[12px] font-black
  shadow-lg shadow-slate-900/10
  图标：w-4 h-4（左侧）
```

### 风险等级徽章（Risk Badge）

```
容器：bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase
```

### NPS 环形仪表（Circular Gauge）

```
容器：w-64 h-64 inline-block relative
SVG viewBox：0 0 200 200，旋转 -90deg
背景环：r=85 strokeWidth=16 stroke=#F1F5F9 fill=none
进度环：r=85 strokeWidth=16 stroke=#00CBA9 fill=none strokeLinecap=round
中心文字容器：absolute inset-0 flex-col items-center justify-center
  标签：text-xs font-black text-slate-400 tracking-[0.2em] uppercase
  数值：text-6xl font-[900] text-slate-900 tracking-tighter
```

### CTA 按钮（Primary Action）

```
容器：w-full bg-[#00CBA9] text-white rounded-[28px] font-black h-18
  hover：bg-[#00B89A]
  active：scale-[0.98]
  阴影：shadow-2xl shadow-emerald-500/40
内部布局：flex items-center justify-center space-x-4
左侧图标框：bg-white/20 p-2.5 rounded-2xl，悬停旋转 12deg
文字：text-lg tracking-wide
```

### 图表注释区（Chart Annotation Block）

```
容器：bg-slate-50/50 rounded-[24px] p-5 border border-slate-100 relative overflow-hidden
注释行：flex items-start space-x-3
图标方块：w-6 h-6 rounded-lg flex items-center justify-center text-xs shadow-sm
  类型变体：bg-amber-100 shadow-amber-200/50 / bg-[#E9F7F4] shadow-emerald-200/50
标题文字：text-xs font-black text-slate-800，高亮部分 text-[#00CBA9]
说明文字：text-[10px] font-bold text-slate-400 mt-0.5
装饰吉祥物：absolute right-[-10px] bottom-[-10px] w-28 h-28 opacity-60 pointer-events-none
```

---

## 8. 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| 默认（移动端） | `< 1024px` | 所有区域单列堆叠（`grid-cols-1`） |
| `lg` | `>= 1024px` | 双列区域启用 `lg:grid-cols-2 gap-8` |

内容最大宽度始终为 `1080px`，两侧等距居中，水平内边距 `24px`。

---

## 9. 风格建议

- **保持"通透呼吸感"**：每个卡片之间留有 `32px` 间距，卡片内边距不低于 `24px`；避免将内容挤压到边缘
- **圆角统一梯度**：外层卡片 `32px` → 内嵌区块 `24px` → 小元素 `16px` → 胶囊 `full`，形成自然的嵌套层级
- **字重即层级**：本风格极度依赖字重变化（900 → 800 → 700）来区分信息层级，而非仅靠字号；保持 `font-black` 作为标题/数字的默认字重
- **主色克制使用**：`#00CBA9` 仅用于最核心的交互元素（CTA、进度、高亮数据）；大面积底色使用其极浅变体（`#F8FDFB`、`#E9F7F4`、`emerald-50`）
- **阴影层次分明**：CTA 使用带主色调的 `shadow-2xl`，内容卡片使用中性 `shadow-xl`，小元素使用 `shadow-sm`；避免所有元素使用同级阴影
- **装饰元素降噪**：吉祥物、头像插画等装饰性内容保持低不透明度（`opacity-60`）并禁用交互（`pointer-events-none`），确保不干扰信息传达
- **动效轻柔**：脉冲动画仅用于 1-2 个关键状态指示点；悬停过渡使用 `transition-all` 默认时长（150ms），光晕动效可延长至 1000ms
- **深色元素作为锚点**：在大量浅色中，使用 `slate-900` 黑色胶囊标题或 `#1E293B` 标注气泡作为视觉锚点，避免页面"飘"感
