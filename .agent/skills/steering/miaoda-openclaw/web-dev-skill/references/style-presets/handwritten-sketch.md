# Handwritten Sketch · 手绘草稿风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Handwritten Sketch -- 手绘白板笔记 x 便利贴质感 x 有机不规则形态
- **Visual Signature**:
  1. 有机不规则圆角（wobbly border-radius），每张卡片形态各异，模拟手撕纸片/便利贴边缘
  2. 粗黑墨线边框（3px #2d2d2d）+ 硬阴影（hard shadow，无模糊纯偏移）
  3. 手写体排版（Patrick Hand 正文 + Kalam 标题），营造真实笔迹质感
  4. 纸张纹理背景（米黄色底 + 圆点网格 radial-gradient 24px 间距）
  5. 物理装饰元素：透明胶带（tape）、图钉（tack）、便利贴黄色卡片
  6. 微旋转（rotate +/-1~2deg）模拟随意粘贴效果
- **Emotional Tone**: 亲和、创意、手工感、轻松自由

---

## 配色方案

**方案**: Paper & Ink 纸笔手绘色系
**色彩关系**: 暖白纸张底 + 深墨黑主调 + 标记笔红蓝点缀 + 便利贴黄

| 角色 | HEX | HSL 近似 | 用途 |
|-----|-----|---------|-----|
| bg (background) | #fdfbf7 | hsl(40 60% 98%) | 页面纸张背景 |
| surface | #ffffff | hsl(0 0% 100%) | 卡片白色底 |
| muted | #e5e0d8 | hsl(30 16% 87%) | 次级背景、网格点、分隔区域、灰底标签 |
| text (foreground) | #2d2d2d | hsl(0 0% 18%) | 墨水黑，主要文字与边框 |
| textMuted | rgba(45,45,45,0.6) | -- | 次要文字、描述文本 |
| accent-primary | #ff4d4d | hsl(0 100% 65%) | 标记笔红，强调数值、重点标记、图钉 |
| accent-secondary | #2d5da1 | hsl(216 56% 40%) | 钢笔蓝，链接、标签、辅助强调 |

### 语义色

| 用途 | HEX | 说明 |
|-----|-----|-----|
| 便利贴 | #fff9c4 | postit-yellow，高亮卡片背景、Tooltip 背景 |
| 正向/成功 | #16a34a (green-600) | 成功状态图标 |
| 高亮文本底 | #fef9c3 (yellow-100) | 行内关键词底色标记 |
| 黑板底色 | #2d2d2d | 反色区块（黑板效果）背景 |
| 粉笔白 | #ffffff | 黑板区块上的文字色 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['#ff4d4d', '#e5e0d8', '#2d5da1', '#fff9c4'];
//               标记笔红    墨水灰     钢笔蓝     便利贴黄
```

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #ff4d4d | 标记笔红 |
| 2 | #e5e0d8 | 墨水灰 |
| 3 | #2d5da1 | 钢笔蓝 |
| 4 | #fff9c4 | 便利贴黄 |

### ECharts 全局 BASE_OPTION

```js
const INK = '#2d2d2d';
const MUTED = '#e5e0d8';
const TEXT_COLOR = 'rgba(45,45,45,0.6)';   // textMuted，用于坐标轴标签

const BASE_OPTION = {
  color: ['#ff4d4d', '#e5e0d8', '#2d5da1', '#fff9c4'],
  backgroundColor: 'transparent',   // 背景由外部卡片容器控制
  textStyle: {
    fontFamily: 'Patrick Hand, Kalam, cursive',
    color: 'rgba(45,45,45,0.6)'
  },
  grid: {
    containLabel: true,
    left: 16,
    right: 16,
    top: 24,
    bottom: 24
  },
  xAxis: {
    type: 'category',
    axisLine: { lineStyle: { color: '#e5e0d8' } },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(45,45,45,0.6)',
      fontSize: 14,
      fontFamily: 'Patrick Hand',
      margin: 10
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(45,45,45,0.6)',
      fontSize: 14,
      fontFamily: 'Patrick Hand'
    },
    splitLine: {
      lineStyle: {
        color: '#e5e0d8',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#fff9c4',
    borderColor: '#2d2d2d',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    shadowBlur: 0,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowColor: '#2d2d2d',
    textStyle: {
      fontFamily: 'Patrick Hand',
      color: '#2d2d2d',
      fontSize: 14
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(45,45,45,0.08)'
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Patrick Hand',
      color: '#2d2d2d',
      fontSize: 14
    },
    itemGap: 16,
    padding: [20, 0, 0, 0],
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

**line（折线图）**
```js
{
  type: 'line',
  smooth: true,                             // 手绘感平滑曲线
  lineStyle: { width: 2 },
  symbol: 'circle',
  symbolSize: 6,
  areaStyle: {
    opacity: 0.08                           // 浅色面积填充，可选
  }
}
```

**bar（柱状图）**
```js
{
  type: 'bar',
  barWidth: 32,                             // 默认柱宽，可按需调整
  itemStyle: {
    borderRadius: [4, 10, 10, 4],           // 手绘感不对称圆角
    borderColor: '#2d2d2d',
    borderWidth: 2
  }
}
```

**pie（饼图/环形图）**
```js
{
  type: 'pie',
  radius: ['40%', '65%'],                   // 环形
  itemStyle: {
    borderColor: '#2d2d2d',
    borderWidth: 2,
    borderRadius: 4
  },
  label: {
    show: true,
    fontFamily: 'Patrick Hand',
    fontSize: 14,
    color: '#2d2d2d'
  }
}
```

**radar（雷达图）**
```js
{
  type: 'radar',
  splitArea: {
    areaStyle: {
      color: ['rgba(229,224,216,0.15)', 'rgba(229,224,216,0.05)']
    }
  },
  axisLine: {
    lineStyle: { color: '#e5e0d8' }
  },
  splitLine: {
    lineStyle: { color: '#e5e0d8', type: 'dashed' }
  }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 10,
  itemStyle: {
    borderColor: '#2d2d2d',
    borderWidth: 2,
    opacity: 0.85
  }
}
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器样式 | `border-t-2 border-dashed border-ink/20` | 虚线分隔，轻量内嵌于卡片 |
| 背景 | 透明，继承卡片底色 | 不单独设置背景 |
| 高度 | `h-24`（96px） | 迷你内嵌图表 |
| 图表布局 | 水平条形时使用 yAxis type category + xAxis type value | 水平条形，符合手绘阅读习惯 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
```

| 用途 | 字体栈 | Tailwind 类名 | 说明 |
|-----|-------|-------------|-----|
| 标题 / 强调标记 | `Kalam, cursive` | `font-marker` | 粗体手写标记笔风格 |
| 正文 / 描述 / 列表 | `Patrick Hand, cursive` | `font-hand` | 自然手写正文 |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-3xl font-marker font-bold tracking-wide` | text-ink (#2d2d2d) |
| Section 标题 | `text-4xl font-marker font-bold underline decoration-wavy decoration-2 underline-offset-4` | text-ink，波浪下划线用 accent 色交替 |
| 卡片标题 | `text-2xl font-marker font-bold` | text-ink |
| 列表项标题 | `text-xl font-marker font-bold` | text-ink |
| KPI 数值 | `text-5xl font-marker font-bold` | text-marker-red (#ff4d4d) |
| KPI 旧值 | `text-lg font-hand line-through decoration-2` | text-ink/40 |
| 正文描述 | `text-lg font-hand leading-relaxed` | text-ink/70 |
| 标签/分类 | `text-sm font-bold uppercase tracking-widest` | text-ink/50 |
| 副标题 | `text-lg font-hand` | text-ink/60 |
| 辅助小字 | `text-sm font-hand` | text-ink/50 |

---

## 页面结构

> 手绘白板风格布局 -- 单页纵向滚动，模拟在大白板 / 牛皮纸上自由排列的笔记卡片。

```
Sticky Header（透明胶带装饰，白色 wobbly 卡片，logo + 标题 + 状态标签）
    |
Section 1: 背景与目标
  ├── Section 标题行（图标徽章 + 波浪下划线标题）
  ├── 痛点草稿卡片（胶带装饰，内含图钉 pin 便利贴）
  └── KPI 指标卡片行（grid 4 列，含迷你条形图）
    |
Section 2: 功能规格
  ├── Section 标题行
  └── 功能卡片 grid（3 列，各卡片带独立装饰）
    |
Section 3: 交付路线图
  ├── Section 标题行
  └── 阶段卡片纵向堆叠（垂直连接线串联）
    |
Section 4: 会议讨论（黑板风反色区块）
    |
Footer（引言 + 保密声明）
```

### Header 设计

Sticky Wobbly Header：
- 定位：`sticky top-4 z-50`
- 容器：白色 WobblyCard，透明胶带装饰（tape）
- 微旋转：`rotate(-1deg)`
- 布局：`flex flex-col md:flex-row justify-between items-center gap-4`
- 内边距：`px-6 py-4`
- 左侧：圆形墨色图标徽章 + 标题 + 副标题
- 右侧：状态标签（wobbly 边框）+ 关联链接（波浪下划线）

### 导航方式

本风格采用全页纵向滚动浏览，通过 Sticky Header 保持导航锚点，各 Section 以标题行（图标徽章 + 波浪下划线大字）划分内容层级。Section 之间以 `space-y-20`（80px）大间距分隔，营造白板上各区域自然散落的视觉节奏。

---

## 视觉风格

### 间距系统

| 元素 | 值 | 像素 |
|-----|---|-----|
| Section 间距 | `space-y-20` | 80px |
| 组件间距（网格 gap） | `gap-6` ~ `gap-8` | 24px ~ 32px |
| 大组件间距 | `gap-12` | 48px |
| 内容容器最大宽 | `max-w-5xl` | 1024px |
| 容器水平内边距 | `px-6` | 24px |
| Header 内边距 | `px-4` + 内部 `px-6 py-4` | 16px + 24px/16px |
| 卡片内边距 | `p-6` 或 `p-8 md:p-12` | 24px ~ 48px |
| 页面底部留白 | `pb-20` | 80px |
| KPI 卡片数值下间距 | `mb-2` ~ `mb-6` | 8px ~ 24px |

### 圆角与阴影

| 元素 | 值 |
|-----|---|
| WobblyCard 圆角 | 有机不规则 border-radius，四组预设值轮换 |
| 圆角预设 1 | `255px 15px 225px 15px / 15px 225px 15px 255px` |
| 圆角预设 2 | `20px 225px 15px 255px / 255px 15px 225px 15px` |
| 圆角预设 3 | `15px 225px 15px 255px / 255px 15px 225px 15px` |
| 圆角预设 4 | `225px 15px 225px 15px / 15px 225px 15px 255px` |
| 标签/tag 圆角 | 同 wobbly 预设（`255px 15px 225px 15px / 15px 225px 15px 255px`） |
| 圆形徽章 | `rounded-full` |
| 痛点便签 | `rounded-lg`（8px 常规圆角） |
| 硬阴影 (hard) | `4px 4px 0px 0px #2d2d2d` |
| 硬阴影 small | `2px 2px 0px 0px #2d2d2d` |
| 硬阴影 extra-large | `8px 8px 0px 0px #2d2d2d` |

### 边框

- 全局卡片：`border-[3px] border-ink`（3px 墨黑粗线）
- 卡片内分区：`border-b-2 border-dashed border-ink`（2px 虚线分隔）
- 列表项：`border-2 border-ink`（2px 实线）
- 表格行分隔：`border-b border-dashed border-ink/20`（1px 浅色虚线）
- 页脚分隔：`border-t-4 border-ink border-dashed`（4px 粗虚线）
- 痛点便签：`border-2 border-marker-red border-dashed` 或 `border-2 border-ink border-dashed`

### Hover 交互模式

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 上浮模式 | KPI 卡片 | `hover:-translate-y-1 hover:shadow-hard-xl transition-all duration-300` |
| 右移模式 | 列表项 | `hover:translate-x-1 hover:shadow-none hover:border-marker-red transition-all` |
| 旋转模式 | 标签/tag | `hover:-rotate-2 transition-transform` |
| 图标缩放 | 功能图标 | `group-hover:rotate-12` 或 `group-hover:scale-110 transition-transform` |
| 文字变色 | 分组标题 | `group-hover:text-pen-blue` 或 `group-hover:text-marker-red transition-colors` |

### 装饰元素

| 装饰 | 实现方式 | 应用场景 |
|-----|---------|---------|
| 透明胶带 (tape) | `absolute -top-3 left-1/2 w-24 h-6 bg-gray-400/30 rotate-1 backdrop-blur-sm` | Header、痛点卡片 |
| 图钉 (tack) | `absolute -top-3 left-1/2 w-4 h-4 rounded-full bg-marker-red border-2 border-ink` | 个别 KPI 卡片 |
| 别针 (pin) | `lucide Pin` 图标，`absolute -top-3 -right-2 fill-marker-red transform rotate-12` | 痛点便签角落 |
| 微旋转 | `transform rotate(+/-0.5~2deg)`，通过 index 奇偶切换方向 | 所有卡片 |
| 圆点背景纹理 | `radial-gradient(#e5e0d8 1px, transparent 1px); background-size: 24px 24px` | 页面 body 背景 |
| 黑板纹理 | SVG 圆点 pattern，opacity 0.10 叠加 | 黑板反色区块 |
| 波浪下划线 | `underline decoration-wavy decoration-2 underline-offset-4` | Section 标题 |

### 动画

| 动画 | 参数 |
|-----|-----|
| 卡片上浮 | `transition-all duration-300` |
| 列表滑移 | `transition-all`（默认 duration） |
| 标签旋转 | `transition-transform` |
| 图标旋转/缩放 | `transition-transform` |
| 文字选中色 | `selection:bg-marker-red selection:text-white` |

### 滚动条

```css
::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #fdfbf7; }
::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border: 3px solid #fdfbf7;
  border-radius: 20px;
}
```

---

## 组件规范

### WobblyCard（核心卡片组件）

```
容器: relative border-[3px] border-ink transition-transform duration-200
圆角: 有机不规则 border-radius（4 组预设按 index 轮换）
阴影: shadow-hard（4px 4px 0px 0px #2d2d2d），variant=black 时用 shadow-hard-xl
旋转: transform rotate(Ndeg)，通过 prop 控制，一般 +/-0.5~2deg

变体 (variant):
  white:  bg-white text-ink（默认）
  yellow: bg-postit-yellow text-ink（便利贴风格）
  black:  bg-ink text-chalk-white（黑板风格）
  blue:   bg-pen-blue text-white（蓝色强调）

装饰 (decoration):
  tape: 顶部居中透明胶带条
  tack: 顶部居中红色图钉圆点
  none: 无装饰（默认）
```

### Section 标题行

```
容器: flex items-center gap-3 mb-8

图标徽章:
  外层: bg-[accent-color] text-white p-2 border-2 border-ink rounded-full shadow-hard-sm
  旋转: transform rotate(+/-1~3deg)
  图标: lucide-react, size=28, strokeWidth=3

标题文字:
  text-4xl font-marker font-bold text-ink
  underline decoration-wavy decoration-[交替色] decoration-2 underline-offset-4
```

### KPI 指标卡片

```
容器: WobblyCard, p-6, h-full, flex flex-col justify-between
Hover: hover:-translate-y-1 hover:shadow-hard-xl transition-all duration-300
旋转: index 奇偶交替 +/-1deg
装饰: 可选 tack 或 none

布局:
  顶部: 标题(左) + 归属标签(右), flex justify-between items-start, mb-4
  中部: 大数值 + 单位 + 旧值（删除线）+ 描述
  底部: 迷你水平条形图（border-t-2 border-dashed 分隔）

标题: font-marker text-xl font-bold text-ink
归属标签: text-xs font-bold border-2 border-ink px-2 py-0.5 bg-white -rotate-2 rounded-sm shadow-hard-sm
数值: text-5xl font-marker font-bold text-marker-red
单位: text-xl font-marker text-ink
旧值: text-lg text-ink/40 line-through decoration-2 font-hand
描述: text-lg text-ink/70 leading-tight font-hand
```

### 功能卡片

```
容器: WobblyCard, bg-white, overflow-hidden
旋转: +/-1deg 交替

卡片头: bg-ink-muted/30 p-4 border-b-2 border-ink border-dashed flex items-center gap-3
  图标: p-2 bg-white border-2 border-ink rounded-full
  标题: font-marker text-xl font-bold

卡片体: p-6 space-y-6
  小标题: text-sm font-bold text-ink/50 uppercase tracking-widest
         左侧圆点标记: w-2 h-2 bg-[accent] rounded-full border border-ink
  列表项: font-hand text-lg, 左侧 ArrowRight 图标（marker-red, strokeWidth=3）
  关键词高亮: bg-yellow-100 px-1
  标签组: px-3 py-1 bg-white border-2 border-ink, wobbly 圆角, hover:-rotate-2
```

### 路线图阶段卡片

```
容器: WobblyCard, bg-white
旋转: +/-0.5deg 交替
垂直连接线: absolute left-8 top-full h-8 w-1 bg-ink（阶段之间）

卡片头: p-6 border-b-2 border-dashed border-ink bg-ink-muted/10
        flex flex-col md:flex-row justify-between items-start md:items-center gap-4
  优先级标签: px-4 py-1 border-2 border-ink rounded-full text-sm font-bold shadow-hard-sm rotate-2
              P0: bg-marker-red text-white | P1: bg-postit-yellow text-ink
  阶段名: font-marker text-2xl font-bold text-ink
  截止日期: font-hand font-bold text-pen-blue bg-white px-3 py-1 border-2 border-ink -rotate-1

表格:
  表头: font-marker text-xl text-ink/60 border-b-2 border-ink
  行: font-hand text-lg, hover:bg-yellow-50/50 transition-colors
  复选框: w-5 h-5 border-2 border-ink rounded-sm bg-white, P0 带 shadow-hard-sm
  负责人标签: bg-ink-muted/30 px-2 py-1 border border-ink rounded-md text-sm font-bold
  工时: font-bold text-pen-blue, 右对齐
```

### 黑板反色区块

```
容器: WobblyCard variant="black", p-8 md:p-12, overflow-hidden
旋转: rotate(1deg)
纹理: 圆点 SVG pattern 叠加, opacity 0.10

标题: text-3xl font-marker font-bold text-white, border-b-2 border-white/30 pb-4 w-fit
子标题: font-marker text-2xl, 白色背景反衬标签 bg-white px-2 py-0.5 border-2 border-white/50 rounded-sm
列表: font-hand text-lg text-white/90
关键词: text-postit-yellow decoration-wavy underline
圆点标记: w-2 h-2 bg-white rounded-full
垂直分隔线: absolute w-1 bg-white/20 border-r border-dashed border-white/40（md 以上显示）
布局: grid grid-cols-1 md:grid-cols-2 gap-12
角落标注: text-white/20 font-hand text-sm rotate-6（粉笔灰尘效果）
```

### 页脚

```
容器: mt-20 border-t-4 border-ink border-dashed pt-12 pb-24 text-center
引言: font-marker text-3xl, hover:rotate-2 transition-transform duration-300
下划线装饰: w-full h-2 bg-marker-red/20 rounded-full
副文字: font-hand text-ink/50 text-lg
```

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | KPI 4 列 (`lg:grid-cols-4`)，功能卡片 3 列 |
| 768px ~ 1023px (md) | KPI 2 列 (`sm:grid-cols-2`)，功能卡片 3 列，Header 水平排列，黑板区块双列，路线图卡片头水平排列 |
| < 768px | KPI 单列，功能卡片单列，Header 垂直堆叠，黑板区块单列，路线图卡片头垂直堆叠，卡片内边距缩小 (`p-8`) |

---

## 风格建议

- **有机不规则圆角是核心视觉签名**：4 组 wobbly border-radius 预设值按 index 轮换，确保每张卡片形态各异。扩展新组件时务必延续此模式，避免使用常规 `rounded-*` 类名。
- **手写字体是氛围基石**：Patrick Hand（正文）和 Kalam（标题）的组合营造了整体手绘质感，所有文字元素均应使用这两种字体，不要混入无衬线体。
- **装饰元素需克制使用**：胶带、图钉、别针等物理装饰是点睛之笔而非必须，每个 Section 内使用 1~2 处即可，过度堆砌会削弱手绘感的自然随意性。
- **微旋转制造生命力**：卡片 +/-0.5~2deg 的微旋转是风格的重要组成部分，建议通过 index 奇偶数交替正负方向，保持视觉节奏的韵律感。
- **硬阴影替代模糊阴影**：所有阴影均使用纯偏移（`4px 4px 0px 0px #2d2d2d`），无 blur 值，配合粗墨线边框，形成平面插画般的手绘深度感。
- **黑板区块作为视觉对比锚点**：在大面积暖白底色中插入一块深色反色区块，可有效打断视觉疲劳，建议每页最多使用一处。
