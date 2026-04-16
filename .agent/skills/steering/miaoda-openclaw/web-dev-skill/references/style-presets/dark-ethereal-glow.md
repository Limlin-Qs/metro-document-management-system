# Dark Ethereal Glow · 暗夜灼光 UI 风格模板

---

## 1. 设计语言

以 **暗黑玻璃拟态（Dark Glassmorphism）** 为核心美学，在纯黑底色上叠加多层半透明毛玻璃卡片、橙色辐射光晕与噪点纹理，营造出深邃、高端且充满科技仪式感的视觉氛围。风格强调"暗中有光"——黑色背景作为画布，橙色（#ff4d00）作为唯一高饱和强调色以光点、渐变条、发光阴影的形式穿透暗面，形成极强的视觉张力。排版以 Inter 字体的 Black（900）权重为绝对锚点，配合 Extralight（200）/ Light（300）纤细衬体形成极端字重对比，呈现杂志社论般的戏剧性排版。超大圆角（45-60px）、夸张内边距与巨幅留白赋予整体设计以呼吸感与奢侈感。

**关键词**：纯黑画布 / 玻璃拟态 / 橙色灼光 / 极端字重对比 / 超大圆角 / 发光阴影 / 噪点纹理 / 仪式感留白

---

## 2. 配色方案

### 2.1 七色角色体系

| 角色 | 色值 | Tailwind Token | 用途说明 |
|------|------|----------------|----------|
| **主背景** | `#000000` | `bg-black` | 页面整体底色，纯黑 |
| **主文字** | `#FFFFFF` | `text-white` | 标题、核心数值、主体文字 |
| **强调色** | `#FF4D00` / `#EA580C` | `text-orange-600` / `bg-orange-600` | 品牌色、装饰线、发光点、渐变终止色、高亮文字 |
| **辅助文字** | `#A1A1AA` / `#52525B` | `text-zinc-400` / `text-zinc-600` | 描述段落、次要标签、英文副标题 |
| **容器/卡片** | `rgba(255,255,255,0.05)` → `rgba(255,255,255,0.01)` | 自定义 `glass-ethereal` | 玻璃拟态卡片，渐变半透明白色 |
| **次强调色** | `#FACC15` | `text-yellow-500` / `border-yellow-500` | 优先级次级标识（P1）、进度条次色 |
| **边框/分割** | `rgba(255,255,255,0.08)` ~ `rgba(255,255,255,0.1)` | `border-white/5` ~ `border-white/10` | 玻璃卡片描边、分隔线、标签描边 |

### 2.2 灰阶层级（Zinc 色阶）

| 层级 | 色值 | Token | 语义 |
|------|------|-------|------|
| 最暗辅助 | `#18181B` | `zinc-900` | 深层背景元素 |
| 暗面容器 | `#27272A` | `zinc-800` | 非激活进度条、P2 级别色 |
| 深灰标签 | `#3F3F46` | `zinc-700` | 图表轴文字、微标签 |
| 中灰文字 | `#52525B` | `zinc-600` | 英文副标题、节标签 |
| 次要文字 | `#71717A` | `zinc-500` | 英文标题、统计标签 |
| 正文辅助 | `#A1A1AA` | `zinc-400` | 段落正文、描述性文字 |
| 高亮辅助 | `#D4D4D8` | `zinc-300` | 列表项正文、数据要点 |
| 近白文字 | `#E4E4E7` | `zinc-100` | 结论文字、卡片内高亮 |

### 2.3 强调色辅助色阶（Orange）

| 色值 | Token | 用途 |
|------|-------|------|
| `rgba(255,77,0,0.12)` | 自定义 | 背景环境光光晕（light-leak） |
| `rgba(255,77,0,0.4)` | 自定义 | 文字发光阴影（text-shadow） |
| `#FF4D00` | 自定义 | 核心发光点、渐变起止色、bracket 装饰线 |
| `#F97316` | `orange-500` | 图标色、数据点指示圆、进度数值 |
| `#EA580C` | `orange-600` | 装饰竖条、副标题文字、P0 强调 |
| `rgba(255,77,0,0.5)` | 自定义 | 装饰竖条发光阴影 |
| `rgba(234,88,12,0.1)` | `orange-600/10` | 图标容器底色 |
| `rgba(255,77,0,0.05)` | 自定义 | 超大装饰引号色 |
| `rgba(255,106,0,1)` | `#ff6b00` | 图表主色（高亮柱） |

---

## 3. ECharts 主题样式

> 以下为项目图表的 ECharts 主题配置。

```json
{
  "color": ["#ff6b00", "#facc15", "#27272a", "rgba(255,255,255,0.04)"],
  "backgroundColor": "transparent",
  "textStyle": {
    "fontFamily": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    "color": "#71717a",
    "fontSize": 12,
    "fontWeight": 900
  },
  "title": {
    "textStyle": {
      "color": "#ffffff",
      "fontSize": 24,
      "fontWeight": 900,
      "fontFamily": "Inter, sans-serif"
    },
    "subtextStyle": {
      "color": "#52525b",
      "fontSize": 10,
      "fontWeight": 700,
      "letterSpacing": "0.6em"
    }
  },
  "bar": {
    "itemStyle": {
      "borderRadius": [0, 20, 20, 0],
      "borderWidth": 0
    },
    "barWidth": 50,
    "emphasis": {
      "itemStyle": {
        "shadowBlur": 20,
        "shadowColor": "rgba(255, 77, 0, 0.4)"
      }
    }
  },
  "categoryAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": {
      "color": "#3f3f46",
      "fontSize": 16,
      "fontWeight": 900,
      "fontFamily": "Inter, sans-serif"
    },
    "splitLine": { "show": false }
  },
  "valueAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": { "show": false },
    "splitLine": { "show": false }
  },
  "tooltip": {
    "backgroundColor": "rgba(5,5,5,0.95)",
    "borderColor": "rgba(255,255,255,0.1)",
    "borderWidth": 1,
    "textStyle": {
      "color": "#ffffff",
      "fontSize": 14,
      "fontWeight": 700
    },
    "extraCssText": "border-radius: 35px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); backdrop-filter: blur(30px); padding: 16px 24px;"
  },
  "legend": {
    "textStyle": {
      "color": "#52525b",
      "fontSize": 10,
      "fontWeight": 700
    }
  },
  "dataHighlight": {
    "_comment": "高亮柱使用主强调色 #ff6b00，非高亮柱使用 rgba(255,255,255,0.04) 配合 1px rgba(255,255,255,0.1) 描边",
    "highlightColor": "#ff6b00",
    "mutedColor": "rgba(255,255,255,0.04)",
    "mutedBorderColor": "rgba(255,255,255,0.1)"
  }
}
```

### 3.1 进度条样式（非 ECharts，CSS 实现）

```
容器：h-5 rounded-full bg-white/5 border border-white/10 p-[3px]
填充：h-full rounded-full shadow-[0_0_20px_rgba(255,77,0,0.4)]
高亮色：#ff4d00（主）/ #facc15（次）/ #27272a（低优先级）
动画：transition-all duration-[2s]
```

---

## 4. 字体排版

### 4.1 字体栈

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
letter-spacing: -0.01em;  /* 全局微紧字距 */
```

### 4.2 字号层级

| 层级 | 大小 | 字重 | 用途 | Tailwind |
|------|------|------|------|----------|
| 超级标题 | `10rem`（160px） | 900 Black | Hero 主标题（中文） | `text-[10rem] font-black` |
| 巨型标题 | `6rem`（96px） | 900 Black | Hero 英文标题 | `text-8xl font-black` |
| 区块标题 | `3.75rem`（60px） | 900 Black | 各 Section 中文标题 | `text-6xl font-black` |
| 大数值 | `3rem`（48px） | 900 Black | 统计卡片核心数值、优先级标号 | `text-5xl font-black` |
| 副标题 | `2.25rem`（36px） | 900 Black | 英文品牌名 | `text-4xl font-extralight` |
| 卡片标题 | `1.875rem`（30px） | 900 Black | 洞察卡片标题、人物名 | `text-3xl font-black` |
| 子标题 | `1.5rem`（24px） | 900 Black | 年份标签 | `text-2xl font-black` |
| 描述正文 | `1.25rem`（20px） | 300 Light | 引言文字、Hero 描述段 | `text-xl font-light italic` |
| 列表正文 | `1rem`（16px） | 700 Bold | 数据要点、结论文字 | `text-base font-bold` |
| 辅助标签 | `0.75rem`（12px） | 900 Black | 进度条标签 | `text-xs font-black` |
| 微标签 | `0.625rem`（10px） | 900 Black | Section 英文副标题、全大写标签 | `text-[10px] font-black` |
| 超微标签 | `0.5625rem`（9px） | 900 Black | 统计标签、标签类别、尾注 | `text-[9px] font-black` |

### 4.3 排版特征

- **字间距极端分化**：标题使用 `tracking-tighter`（-0.05em）极紧字距营造压迫感；英文副标题、微标签使用 `tracking-[0.4em]` ~ `tracking-[0.6em]` 超宽字距营造仪式感
- **全大写英文**：所有英文副标题和标签统一 `uppercase` 全大写，配合超宽字距
- **字重极端对比**：Black（900）与 Extralight（200）/ Light（300）在同一区域共存，形成视觉张力
- **斜体引言**：引用文字使用 `italic font-light`，装饰性大引号使用 `font-serif italic`
- **数值风格**：数值统一使用 `font-black tracking-tighter`，附属单位使用 `font-medium text-zinc-700` 降权
- **文字选区**：`selection:bg-orange-600/40` 橙色半透明选区

---

## 5. 页面结构

### 5.1 整体布局

```
┌─────────────────────────────────────────────────────────────────┐
│  [light-leak 背景光晕]        [grain-overlay 噪点纹理全屏覆盖]   │
├─────────────────────────────────────────────────────────────────┤
│                     Hero Header                                  │
│     ┌bracket-tl                                                  │
│     │ 品牌名(extralight) + 年份标签(rounded-full)                │
│     │ 超级标题(text-gradient + text-glow-orange)                 │
│     │ 副标题(orange-600 uppercase tracking-wide)                 │
│     └bracket-br                                    [浮动玻璃装饰] │
│                                                     (lg:block)   │
│     描述段落(italic light zinc-400)                              │
│                                                                  │
│     MetricCard × 4 (grid-cols-2 md:grid-cols-4)                 │
│     max-w-[1080px] · border-b border-white/5                    │
├─────────────────────────────────────────────────────────────────┤
│  main (max-w-[1080px] · space-y-48)                             │
│                                                                  │
│  Section 1: 核心观察                                             │
│     装饰竖条 + 标题组                                            │
│     InsightCard × 3 (lg:grid-cols-3)                            │
│                                                                  │
│  Section 2: 画像解构                                             │
│     装饰竖条 + 标题组                                            │
│     PersonaCard × 4 (md:grid-cols-2 lg:grid-cols-4)             │
│                                                                  │
│  Section 3: 数据可视化                                           │
│     ┌─────────────────────┬──────────────────┐                  │
│     │  BarChart 区域       │  ProgressBar 区域 │                  │
│     │  lg:col-span-3       │  lg:col-span-2    │                  │
│     └─────────────────────┴──────────────────┘                  │
│     (grid lg:grid-cols-5 gap-20)                                │
│                                                                  │
│  Section 4: 进化路径                                             │
│     RoadmapCard × 3 (md:grid-cols-3)                            │
│     P0(orange) / P1(yellow) / P2(zinc) 顶部色条区分              │
│                                                                  │
│  Footer                                                          │
│     品牌标识(左) + 链接组 + 版本号(右)                            │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 容器约束

| 区域 | 最大宽度 | Tailwind |
|------|----------|----------|
| Hero 内容区 | `1080px` | `max-w-[1080px]` |
| 主内容区 | `1080px` | `max-w-[1080px]` |
| Hero 描述段 | `672px` | `max-w-2xl` |
| 浮动装饰画布 | `500px` x `700px` | `w-[500px] h-[700px]` |

### 5.3 间距系统

| 区域 | 间距 | Tailwind |
|------|------|----------|
| Hero 垂直内边距 | `192px` | `py-48` |
| 主内容区上下内边距 | `128px` | `py-32` |
| Section 之间 | `192px` | `space-y-48` |
| 标题与内容间 | `80px` | `mb-20` |
| 卡片内边距 | `40px` ~ `64px` | `p-10` ~ `p-16` |
| 卡片网格间距 | `32px` ~ `48px` | `gap-8` ~ `gap-12` |
| 数据可视化区域间距 | `80px` | `gap-20` |
| Footer 上内边距 | `128px` | `pt-32` |

---

## 6. 视觉风格

### 6.1 圆角体系

| 元素 | 圆角值 | Tailwind |
|------|--------|----------|
| 数据可视化大卡片 | `60px` | `rounded-[60px]` |
| 人物卡片 | `56px` | `rounded-[56px]` |
| 洞察卡片 / 路线图卡片 | `50px` / `60px` | `rounded-[50px]` / `rounded-[60px]` |
| 统计指标卡片 | `45px` | `rounded-[45px]` |
| 路线图内嵌列表项 | `40px` | `rounded-[40px]` |
| 图标容器 | `35px` | `rounded-[35px]` |
| 结论子卡片 | `35px` | `rounded-[35px]` |
| 玻璃装饰主体 | `50px` | `rounded-[50px]` |
| 浮动装饰芯片 | `25px` | `rounded-[25px]` |
| Footer 品牌图标 | `24px` | `rounded-3xl` |
| 进度条 | `9999px` | `rounded-full` |
| 年份标签 / 标签胶囊 | `9999px` | `rounded-full` |
| 数据指示点 | `9999px` | `rounded-full` |
| 柱状图圆角（右端） | `20px` | `radius={[0,20,20,0]}` |

### 6.2 阴影体系

| 元素 | 阴影 | 实现 |
|------|------|------|
| 玻璃拟态卡片（glass-ethereal） | 三层复合阴影 | `0 4px 24px -1px rgba(0,0,0,0.2), 0 20px 48px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)` |
| 装饰竖条发光 | 橙色辉光 | `shadow-[0_0_35px_rgba(255,77,0,0.5)]` |
| 数据指示点发光 | 橙色点光源 | `shadow-[0_0_12px_rgba(255,77,0,1)]` |
| 进度条填充发光 | 橙色扩散光 | `shadow-[0_0_20px_rgba(255,77,0,0.4)]` |
| 图标发光 | 橙色投影 | `drop-shadow-[0_0_10px_rgba(255,77,0,0.6)]` |
| 路线图列表项 | 重阴影 | `shadow-2xl` |
| Tooltip 弹窗 | 深黑重阴影 | `0 25px 50px rgba(0,0,0,0.8)` |
| 核心光球（glass-core-glow） | 脉冲动画辐射光 | `radial-gradient(circle, #ff4d00 0%, transparent 70%)` + blur(50-80px) |

### 6.3 玻璃拟态规范（glass-ethereal）

```css
.glass-ethereal {
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
        0 4px 24px -1px rgba(0,0,0,0.2),
        0 20px 48px -10px rgba(0,0,0,0.5),
        inset 0 0 20px rgba(255,255,255,0.02);
    position: relative;
    overflow: hidden;
}
```

### 6.4 背景装饰层

| 层 | 描述 | 实现 |
|----|------|------|
| 噪点纹理 | 全屏覆盖，z-100 | `position: fixed; opacity: 0.2; mix-blend-mode: overlay` |
| 环境光晕 | 60vw 圆形辐射光 | `radial-gradient(circle, rgba(255,77,0,0.08~0.12) 0%, transparent 70%); filter: blur(100px)` |
| 文字渐变 | 白→橙垂直渐变 | `linear-gradient(180deg, #fff 45%, #ff4d00 100%); -webkit-background-clip: text` |
| 文字发光 | 橙色辉光 | `text-shadow: 0 0 50px rgba(255,77,0,0.4)` |
| Bracket 装饰 | 4px 橙色 L 形角标 | `border-top: 4px solid #ff4d00; border-left: 4px solid #ff4d00`（左上）/ 右下对称 |

### 6.5 动效与交互

| 交互 | 效果 | 实现 |
|------|------|------|
| 浮动装饰悬浮 | 缓慢上下浮动+微旋转 | `float-ethereal 12s ease-in-out infinite`：translateY(0~-20px) rotate(10~12deg) |
| 核心光球脉冲 | 呼吸式缩放+模糊变化 | `pulse-core 8s ease-in-out infinite`：opacity(0.3~0.6) scale(1~1.3) blur(50~80px) |
| 进度条填充 | 缓慢宽度展开 | `transition-all duration-[2s]` |
| Footer 链接 hover | 文字变橙 | `hover:text-orange-500 transition-colors` |
| 文字选区 | 橙色半透明 | `selection:bg-orange-600/40` |
| 滚动条 | 暗色极窄 | 宽度 6px，轨道 #000，滑块 #222 rounded-[10px] |

---

## 7. 组件规范

### 7.1 MetricCard（统计指标卡片）

```
┌──────────────────────────────────────┐
│  标签 (9px BLACK uppercase 0.5em)    │  ← text-zinc-500
│                                      │
│  数值(48px BLACK) + 单位(18px zinc-700)│  ← text-5xl + text-lg
└──────────────────────────────────────┘
```

- 容器：`glass-ethereal p-10 rounded-[45px] border-white/5`
- 标签与数值间距：`mb-3`
- 数值排列：`flex items-baseline tracking-tighter`
- 网格：`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8`

### 7.2 InsightCard（洞察卡片）

```
┌──────────────────────────────────────┐
│ ▌橙色竖条装饰                         │
│                                      │
│  标题 (30px BLACK)                    │
│                                      │
│  " 超大装饰引号(orange-600/5)         │
│    引言文字 (20px light italic)       │
│                                      │
│  ● 数据要点 1                         │
│  ● 数据要点 2                         │
│  ● 数据要点 3                         │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ↗ STRATEGIC CONCLUSION         │  │
│  │   结论文字                     │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- 外容器：`p-10 rounded-[50px] glass-ethereal border-white/5 flex flex-col`
- 装饰竖条：`w-2.5 h-20 bg-orange-600 rounded-full`，绝对定位 `mt-14`
- 引言装饰引号：`text-[10rem] text-orange-600/5 italic font-serif`
- 引言文字：`text-zinc-400 italic text-xl font-light leading-relaxed pl-6`
- 数据点指示圆：`w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,77,0,1)]`
- 结论子卡片：`p-8 rounded-[35px] bg-white/[0.03] border border-white/5`
- 结论标签：`text-[9px] font-black text-orange-400 uppercase tracking-[0.4em]`

### 7.3 PersonaCard（人物画像卡片）

```
┌──────────────────────────────────────┐
│  [图标容器 80x80 rounded-[35px]]      │
│                                      │
│  名称(30px BLACK)      百分比(orange) │
│                                      │
│  [标签胶囊: 年龄] [标签胶囊: 职业]    │
│                                      │
│  CORE NEEDS                          │
│  ● 需求 1                            │
│  ● 需求 2                            │
│                                      │
│  KEY SCENARIO                        │
│  "场景描述"                           │
└──────────────────────────────────────┘
```

- 外容器：`glass-ethereal rounded-[56px] p-10 flex flex-col border-white/10`
- 图标容器：`w-20 h-20 bg-orange-600/10 rounded-[35px] border border-white/5 shadow-inner`，图标 `text-orange-500 size-40`
- 标签胶囊：`px-5 py-1.5 rounded-full bg-white/5 border border-white/10 font-black uppercase tracking-[0.2em] text-[9px] text-zinc-500`
- 分类标签：`text-zinc-700 font-black uppercase tracking-[0.5em] text-[10px]`
- 需求指示点：`w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(255,77,0,0.8)]`
- 场景文字：`text-zinc-400 italic font-bold text-base`
- 网格：`grid md:grid-cols-2 lg:grid-cols-4 gap-8`

### 7.4 DataVizCard（数据可视化卡片）

- 外容器：`glass-ethereal rounded-[60px] p-16 border-white/10`
- 图表区高度：`h-[550px]`
- 底部脚注：`mt-12 flex justify-between text-[10px] text-zinc-700 font-black tracking-[0.5em] uppercase`
- 脚注高亮：`text-orange-600`

### 7.5 RoadmapCard（路线图卡片）

```
┌──────────────────────────────────────┐  ← border-t-[12px] 色带
│  P0(48px BLACK orange) 标题(30px)    │
│                                      │
│  描述文字 (zinc-500 bold)            │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  项目名称 (20px BLACK)         │  │  ← rounded-[40px]
│  │  Development Priority Q4       │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  项目名称 (20px BLACK)         │  │
│  │  Development Priority Q4       │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- 外容器：`glass-ethereal p-12 rounded-[60px] border-t-[12px]`
- 顶部色带：P0 `border-orange-600` / P1 `border-yellow-500` / P2 `border-zinc-800`
- 优先级标号：`text-6xl font-black tracking-tighter`，颜色随级别变化
- 内嵌项目卡片：`p-10 rounded-[40px] bg-white/[0.02] border border-white/5 shadow-2xl`
- 项目标题：`font-black text-zinc-100 text-xl leading-tight`
- 项目尾注：`text-[9px] text-zinc-700 font-black tracking-[0.4em] uppercase`

### 7.6 SectionHeader（区块标题组）

```
│▌│  中文标题 (60px BLACK uppercase)
│▌│  English Subtitle (10px BLACK uppercase tracking-[0.6em])
```

- 布局：`flex items-end gap-8 mb-20`
- 装饰竖条：`w-3 h-16 bg-orange-600 rounded-full shadow-[0_0_35px_rgba(255,77,0,0.5)]`
- 中文标题：`text-6xl font-black tracking-tighter uppercase`
- 英文副标题：`text-zinc-600 font-bold uppercase tracking-[0.6em] text-[10px]`

### 7.7 Footer（页脚）

- 布局：`flex flex-col md:flex-row justify-between items-center`
- 分隔线：`border-t border-white/5`
- 品牌图标：`w-16 h-16 glass-ethereal rounded-3xl border-white/20 text-orange-500 text-2xl font-black`
- 链接组：`flex gap-16`，图标 `size-12` + 全大写文字
- 全局文字：`text-zinc-700 text-[10px] font-black tracking-[0.6em] uppercase`

---

## 8. 响应式断点

| 断点 | 宽度 | 行为变化 |
|------|------|----------|
| 默认（mobile） | `< 768px` | 统计卡片 2 列（`grid-cols-2`）；人物卡片单列堆叠；Hero 标题缩至 `text-8xl`（128px）；副标题缩至 `text-2xl`；描述段缩至 `text-xl`；浮动装饰隐藏；Footer 垂直堆叠；主内容区水平内边距 `px-8` |
| `md`（768px+） | `>= 768px` | 统计卡片 4 列（`md:grid-cols-4`）；人物卡片 2 列（`md:grid-cols-2`）；路线图卡片 3 列（`md:grid-cols-3`）；Hero 标题放大至 `text-[10rem]`（160px）；副标题放大至 `text-4xl`；Footer 横向排列 |
| `lg`（1024px+） | `>= 1024px` | 洞察卡片 3 列（`lg:grid-cols-3`）；人物卡片 4 列（`lg:grid-cols-4`）；数据可视化区左 3 右 2 分栏（`lg:grid-cols-5`）；浮动玻璃装饰显示（`lg:block`）；主内容区移除水平内边距（`md:px-0`） |

---

## 9. 风格建议

- **黑色纯度**：背景必须为纯黑 `#000000`，不使用深灰替代。纯黑是所有发光效果和玻璃拟态生效的前提，任何灰度偏移都会削弱光效的对比强度。
- **发光克制**：橙色发光阴影（`shadow-[0_0_Xpx_rgba(255,77,0,...)]`）仅用于装饰竖条、数据指示点和进度条填充三类元素。切勿在卡片容器或文字上大面积添加发光效果，以免视觉疲劳。
- **玻璃拟态一致性**：所有卡片容器统一使用 `glass-ethereal` 类，不可在同一页面混用实色卡片和玻璃卡片。半透明层级通过 `border-white/5` 与 `border-white/10` 区分主次。
- **圆角递进**：外层容器使用 50-60px 超大圆角，内嵌子卡片递减至 35-40px，标签和进度条使用 `rounded-full`。同一层级的圆角值保持一致。
- **字重即层级**：该风格将字重作为信息层级的首要区分手段。Black（900）= 核心信息；Bold（700）= 次要内容；Light（300）/ Extralight（200）= 装饰性文字。避免使用 Regular（400）作为主体字重。
- **大写字距分化**：英文标签统一使用 `uppercase` + `tracking-[0.4em]` 以上超宽字距，与中文标题的 `tracking-tighter` 形成极端反差。这种分化是该风格的核心排版特征，不可弱化。
- **留白即奢侈**：Section 间距 192px、卡片内边距 40-64px、Hero 纵向 padding 192px 均为刻意夸张。这些留白是"高端感"的核心来源，压缩留白将直接降低品质感。
- **单一色相原则**：全局仅使用橙色（Orange）作为高饱和强调色，黄色（Yellow）仅作为优先级标识的次级变体。若需扩展色彩，应在 orange 色阶内调整明度/透明度，不引入蓝、绿等第二色相。
- **噪点纹理**：全屏覆盖的噪点层（`opacity: 0.2; mix-blend-mode: overlay`）是质感的关键来源，赋予数字界面以胶片/印刷般的物理触感，不可移除。
- **环境光晕**：页面左上和右下各放置一个 60vw 的橙色辐射光晕（`filter: blur(100px)`），opacity 控制在 0.08-0.12 之间。光晕过强会喧宾夺主，过弱则失去氛围感。
