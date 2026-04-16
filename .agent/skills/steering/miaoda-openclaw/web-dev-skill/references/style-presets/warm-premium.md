# Warm Premium · 暖调精致风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Warm Premium — 暖色渐变底 x 白色超圆角卡片 x 黄色点缀
- **Visual Signature**:
  1. 暖色线性渐变页面背景（beige / cream / warm gray 三色混合）
  2. 白色超圆角卡片（rounded-[2rem] / 32px）+ 极轻阴影 + 极细边框
  3. 黄色 (#FACC15) 全局点缀色 — 活跃态、CTA、装饰元素
  4. 深色反转区域（#2D2D2D 侧边区 + #1A1A1A 嵌入卡片）形成视觉对比层
  5. 纤细圆柱 pill 型 CSS 柱图、环形进度指示器（border trick）、线性进度条
  6. 灰度高对比度人物头像 + 渐变遮罩 + 磨砂玻璃标签
- **Emotional Tone**: 温暖、安心、掌控感

---

## 配色方案

**方案**: 自定义 — Warm Premium（浅色主题）
**色彩关系**: 暖米渐变底 + 白色卡片 + 黄色点缀 + 深色反转区

| 角色 | HEX / 值 | HSL 近似 | 用途 |
|------|----------|----------|------|
| bg | `linear-gradient(to bottom right, rgba(228,229,230,0.6), rgba(250,237,182,0.6), rgba(243,232,203,0.6))` | — | 页面渐变背景 |
| surface | #FFFFFF | hsl(0 0% 100%) | 卡片背景 |
| surfaceDark | #2D2D2D | hsl(0 0% 18%) | 深色侧边区 |
| surfaceEmbed | #1A1A1A | hsl(0 0% 10%) | 嵌入式深色卡片 |
| text | #1E293B | hsl(215 25% 17%) | 主要文字 |
| textMuted | #9CA3AF | hsl(218 11% 65%) | 次要文字 / 标签 |
| textDim | #64748B | hsl(215 16% 47%) | 辅助标签 |
| accent | #FACC15 | hsl(48 96% 53%) | 黄色强调色 |
| border | #F3F4F6 | hsl(220 14% 96%) | 卡片边框 |
| positive | rgb(90,173,112) | hsl(136 31% 52%) | 正向 / 安全状态 |
| danger | #EF4444 | hsl(0 84% 60%) | 紧急 / 告警 |
| orange | orange-500 | — | 数值高亮变体 |

---

## ECharts 主题样式

> 本项目原始代码使用纯 CSS 实现数据可视化，以下将其视觉参数转换为 ECharts 配置，供生成时使用。

### 配色序列

```js
const COLORS = ['#FACC15', '#1E293B', '#94A3B8', 'rgb(90,173,112)', '#EF4444'];
//               黄色       深灰       浅灰       绿色              红色
```

### BASE_OPTION（全局默认配置）

```js
{
  backgroundColor: 'transparent',
  color: ['#FACC15', '#1E293B', '#94A3B8', 'rgb(90,173,112)', '#EF4444'],
  textStyle: {
    fontFamily: 'Inter, sans-serif',
    color: '#9CA3AF'
  },
  tooltip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 16,
    textStyle: { color: '#1E293B', fontSize: 12 },
    trigger: 'axis',
    extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);'
  },
  legend: {
    bottom: 0,
    textStyle: { color: '#9CA3AF', fontSize: 11 },
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8
  },
  grid: {
    top: 24, right: 16, bottom: 32, left: 16,
    containLabel: true
  },
  xAxis: {
    axisLine:  { show: false },
    axisTick:  { show: false },
    axisLabel: { color: '#9CA3AF', fontSize: 9, fontWeight: 'bold' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine:  { show: false },
    axisTick:  { show: false },
    axisLabel: { color: '#9CA3AF', fontSize: 9 },
    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }
  },
  animationDuration: 500,
  animationEasing: 'cubicOut'
}
```

### series 默认样式

**bar（纤细 pill 型柱体）**
```js
{
  type: 'bar',
  barWidth: 12,
  itemStyle: {
    borderRadius: [6, 6, 6, 6],              // 全圆角 pill 型
    color: '#E2E8F0'                          // 默认 slate-200
  },
  emphasis: {
    itemStyle: {
      color: '#FACC15',                       // 活跃态：黄色
      shadowBlur: 15,
      shadowColor: 'rgba(250,204,21,0.4)'     // 黄色光晕
    }
  }
}
```

**pie（环形图）**
```js
{
  type: 'pie',
  radius: ['60%', '75%'],
  padAngle: 3,
  itemStyle: { borderRadius: 4 },
  label: { show: false },
  color: ['#FACC15', '#1E293B', '#CBD5E1']
}
```

### 图表容器

| 属性 | 值 | 说明 |
|------|-----|------|
| 容器样式 | `bg-white rounded-[2rem] shadow-sm border border-gray-100` | 白色超圆角卡片 |
| 内边距 | `p-6` 或 `p-8` | 常规 / 宽松 |
| Hover | `hover:shadow-md transition-all` | 阴影增强 |
| 图表高度 | `h-32`（紧凑）/ 自适应 | |

### 非图表可视化（保留 CSS 实现）

以下组件因交互特殊性保留 CSS 方式：

- **环形指示器**: `border-[10px] border-yellow-400 border-r-transparent rotate-45` 圆环
- **进度条（浅色区）**: `h-1 bg-slate-50 rounded-full`，填充色 `yellow-400 / slate-800 / slate-300`
- **进度条（深色区）**: `h-1.5 bg-white/10 rounded-full`，填充色 `yellow-400 / white/40 / rgb(90,173,112)`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
body { font-family: 'Inter', sans-serif; }
```

唯一字体：**Inter**

### 文字层级

| 层级 | Tailwind 样式 | 颜色 |
|------|--------------|------|
| 页面大标题 | `text-4xl font-semibold tracking-tight` | #1E293B |
| 大数值 KPI | `text-4xl font-light tracking-tight` | #1E293B / rgb(90,173,112) / orange-500 |
| 卡片标题 | `font-bold tracking-tight` | #1E293B |
| 卡片副标题 | `text-xl font-bold` | #1E293B |
| 全大写标签 | `text-[10px] font-bold uppercase tracking-widest` | #9CA3AF |
| 斜体标签 | `text-[10px] italic uppercase tracking-[0.2em]` | #9CA3AF |
| 正文 | `text-sm` | #6B7280 |
| 数据值 | `text-sm font-mono font-bold tracking-tight` | #1E293B |
| 小标签 | `text-[9px] / text-[8px] font-bold uppercase` | 按语境变化 |
| 深色区标题 | `text-2xl font-bold italic tracking-tighter` | #FFFFFF |
| 深色区进度 | `text-3xl font-light font-mono opacity-50` | #FFFFFF |

---

## 页面结构

> 顶部操作栏 + Hero 信息行 + 三栏主内容网格

```
Topbar（Logo pill + 操作图标 + 头像）
    |
Hero Section（左: 大标题 | 右: 3 个大数值 KPI）
    |
Main Grid（12 列）:
  +-- 左 3 列: 卡片 A + 卡片 B（垂直堆叠）
  +-- 中 6 列:
  |   +-- 上: 两个并排卡片（md:grid-cols-2）
  |   +-- 下: 大卡片（flex-1 撑满）
  +-- 右 3 列: 深色侧边卡片（h-full 通高）
```

### 关键布局参数

| 元素 | 样式 |
|------|------|
| 页面背景 | 暖色 linear-gradient（见配色方案） |
| 内容容器 | `p-4 md:p-8`，全宽响应式（无 max-width） |
| 主网格 | `grid-cols-1 lg:grid-cols-12 gap-6` |
| 卡片间距 | `gap-6`（24px） |
| Section 间距 | `mb-8` / `mb-10` |

### Topbar

```
布局: flex justify-between items-center mb-10
Logo: bg-black text-white px-5 py-2 rounded-full font-bold text-xl tracking-tighter
      + 图标 text-yellow-400
      + shadow-lg shadow-black/10
操作区: flex items-center gap-4
  按钮: p-2 border border-gray-200 rounded-full hover:bg-white transition-colors
  通知红点: w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1
  头像: w-10 h-10 rounded-full border border-gray-300 hover:ring-2 ring-yellow-400
```

### Hero Section

```
布局: grid-cols-1 lg:grid-cols-12, 左 4 列 + 右 8 列
左侧: text-4xl font-semibold + text-sm text-gray-500 描述
右侧: flex flex-wrap justify-end gap-8 md:gap-12
  每个 KPI:
    标签: text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1
    数值: text-4xl font-light tracking-tight
```

### 导航方式

- Topbar 采用简洁的 Logo pill + 操作图标 + 头像布局，保持顶部区域轻量
- 页面导航通过内容区域的卡片和操作按钮完成，保持沉浸式浏览体验
- 所有元素使用常规文档流定位，让内容自然跟随滚动

---

## 视觉风格

### 圆角

| 元素 | 值 |
|------|-----|
| 主卡片 | `rounded-[2rem]`（32px） |
| 嵌入卡片 | `rounded-[1.5rem]`（24px） |
| Logo / CTA 按钮 | `rounded-full` |
| 图标容器 | `rounded-xl`（12px）/ `rounded-2xl`（16px） |
| 列表按钮 | `rounded-2xl` |

### 阴影

| 元素 | 值 |
|------|-----|
| 白色卡片 | `shadow-sm`，hover => `shadow-md` |
| 深色侧边区 | `shadow-2xl` |
| Logo | `shadow-lg shadow-black/10` |
| 嵌入深色卡片 | `shadow-lg` |

### 边框

- 白色卡片: `border border-gray-100`（极浅灰，近乎不可见）
- 深色区域: `border border-white/10` 或 `border-dashed border-white/20`
- 列表分隔: `border-dashed border-gray-200`

### Hover 交互模式

| 模式 | 样式 |
|------|------|
| 阴影增强 | 卡片 `hover:shadow-md` |
| 上移 | 嵌入卡片 `hover:-translate-y-1` |
| 图片缩放 | `group-hover:scale-110 transition-transform duration-1000` |
| 环形指示器 | `group-hover:scale-105 duration-500` |
| 颜色切换 | 图标 `group-hover:bg-yellow-400 group-hover:text-black duration-500` |
| 文字高亮 | `group-hover:text-yellow-400` |
| tracking 展开 | `group-hover:tracking-[0.25em]` |
| 按钮按下 | `active:scale-95` |

### 特殊视觉效果

| 效果 | 实现 |
|------|------|
| 暖色渐变背景 | 三色 linear-gradient（warm gray / warm yellow / cream，各 0.6 透明度） |
| 磨砂玻璃标签 | `backdrop-blur-md border border-white/20 bg-white/10` |
| 装饰光晕 | `blur-[80px]` bg-white/5（左上）+ `blur-[60px]` bg-yellow-400/10（右下） |
| 黄色发光 | `shadow-[0_0_15px_rgba(250,204,21,0.4)]`（活跃柱体） |
| 绿色发光 | `shadow-[0_0_8px_rgba(90,173,112,0.8)]`（状态脉冲点） |
| 灰度头像 | `grayscale contrast-125` |
| 渐变遮罩 | `bg-gradient-to-t from-black/80 via-transparent to-transparent` |
| 脉冲动画 | `animate-pulse`（状态点） |

### 动画参数

| 动画 | 值 |
|------|-----|
| 通用过渡 | `transition-all` |
| 颜色过渡 | `transition-colors duration-500` |
| 图片缩放 | `transition-transform duration-1000` |
| 进度条 | `transition-all duration-1000` |
| 柱体高亮 | `transition-all duration-500` |

---

## 组件规范

### 通用卡片基础样式

```
bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100
hover:shadow-md transition-all（使用 group 类）
```

### 人物头像卡片

```
图片区:
  容器: rounded-2xl aspect-[4/5] bg-slate-100 overflow-hidden
  图片: object-cover grayscale contrast-125
        group-hover:scale-110 transition-transform duration-1000
  遮罩: absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90
  状态标签: absolute top-4 left-4
            bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg
            text-[10px] font-bold text-white
            + 脉冲点: w-2 h-2 bg-[rgb(90,173,112)] rounded-full animate-pulse shadow-[0_0_8px_rgba(90,173,112,0.8)]
  底部信息: absolute bottom-5 left-5 right-5 flex justify-between items-end
    名称: text-2xl font-semibold text-white tracking-tight
    标签: text-[10px] opacity-70 font-medium tracking-[0.1em] uppercase
    数值 pill: border border-white/40 bg-white/5 backdrop-blur-xl rounded-2xl px-5 py-2.5 text-sm font-light

进度条组:
  标题: text-lg font-bold + pill 标签（bg-slate-900 text-white px-2 py-0.5 rounded-full text-[9px]）
  进度条: h-1 bg-slate-50 rounded-full
  填充色: yellow-400 / slate-800 / slate-300
  标签: text-[11px] font-medium text-gray-500
```

### 列表卡片

```
标题: text-xs font-bold italic underline uppercase decoration-yellow-400 underline-offset-4 tracking-wider
告警标签: text-[8px] bg-red-50 text-red-500 px-2 rounded-full font-bold
列表项: flex justify-between items-center
  图标: p-2 bg-slate-50 rounded-xl, group-hover:bg-yellow-50
  名称: text-sm text-gray-600 font-medium
  数值: text-sm font-mono font-bold tracking-tight
分隔线: hr border-dashed border-gray-200
底部按钮: w-full py-3 rounded-2xl border border-slate-100
          text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50
```

### 柱状图卡片（CSS 实现）

```
标题行: font-bold tracking-tight + w-2 h-2 bg-yellow-400 rounded-full 圆点 + ArrowUpRight 图标
柱状图区: flex items-end gap-3 h-32 justify-between px-2
柱体: w-full max-w-[12px] rounded-full
      默认: bg-slate-100 hover:bg-slate-200
      活跃: bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)] scale-x-110
标签: text-[9px] text-gray-400 font-bold uppercase tracking-tighter
底部: border-t border-slate-50, text-[10px] italic
```

### 日历卡片

```
标题区:
  标签: text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] italic
  标题: text-xl font-bold
  月份切换: flex items-center gap-4
    按钮: p-1.5 hover:bg-slate-50 rounded-lg text-gray-400
    月份显示: px-3 py-1 bg-slate-50 rounded-full border border-slate-100 text-[10px] font-bold uppercase text-gray-300

日历:
  星期头: grid-cols-7 text-[10px] uppercase font-black text-slate-300 tracking-wider
  日期格: w-10 h-10 rounded-xl text-xs font-bold
    活跃日: bg-black text-white ring-4 ring-black/5 scale-110 shadow-lg z-10
    当月: text-slate-800 hover:bg-slate-50
    非当月: text-slate-200
  标记点: absolute -bottom-1 w-1.5 h-1.5 rounded-full（活跃=yellow-400, 默认=slate-300）

嵌入深色卡片:
  容器: bg-[#1A1A1A] text-white p-5 rounded-[1.5rem] shadow-lg
        hover:-translate-y-1 transition-all
  图标: w-12 h-12 bg-white/10 rounded-2xl
        group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-500
  标签: text-[10px] opacity-50 italic uppercase tracking-wider
  CTA 按钮: bg-yellow-400 text-black text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-widest
            hover:bg-white transition-colors
```

### 深色侧边栏

```
容器: bg-[#2D2D2D] text-white p-8 rounded-[2rem] h-full shadow-2xl relative overflow-hidden
      flex flex-col justify-between
装饰光晕:
  左上: absolute -top-20 -left-20 w-40 h-40 bg-white/5 blur-[80px] rounded-full pointer-events-none
  右下: absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/10 blur-[60px] rounded-full pointer-events-none

标题: text-2xl font-bold italic tracking-tighter
      + w-12 h-1 bg-yellow-400 rounded-full 下划线装饰
计数: text-3xl font-light font-mono opacity-50
      + text-[10px] font-bold text-yellow-400 uppercase tracking-widest 标签

目标项:
  图标: p-2.5 bg-white/10 rounded-xl, group-hover:bg-white/20
  名称: text-sm font-medium tracking-wide, group-hover:text-yellow-400
  百分比: text-xs font-bold italic font-mono
         >50% = text-yellow-400, <=50% = text-white/40
  进度条: h-1.5 bg-white/10 rounded-full
         填充: bg-yellow-400 / bg-white/40 / bg-[rgb(90,173,112)]
  间距: space-y-12（目标项之间）

新增按钮: border border-dashed border-white/20 rounded-2xl py-4
          text-[10px] font-bold uppercase tracking-widest
          hover:bg-white/5 hover:border-white/40

底部 CTA: w-full bg-white/5 border border-white/10 py-5 rounded-2xl
          图标: text-yellow-400 group-hover:rotate-12
          文字: text-xs font-bold uppercase tracking-[0.2em]
          group-hover:tracking-[0.25em] transition-all
          active:scale-95
```

---

## 响应式断点

| 断点 | 布局 |
|------|------|
| >= 1024px (lg) | 12 列网格（3+6+3），Hero 12 列分栏（4+8） |
| 768px-1023px (md) | 中间区域卡片 2 列并排，Hero KPI flex-wrap，内容容器 p-8 |
| < 768px | 全部单列堆叠，内容容器 p-4 |

---

## 灵活性说明

**允许的微调**：
- 响应式断点内的间距微调
- 卡片内条目数量增减
- 日历月份动态切换
- 进度条 / 百分比数值动态化

**必须保持的核心视觉特征**：
- 暖色渐变页面背景（三色 linear-gradient）
- 超圆角卡片 rounded-[2rem]（32px）
- 黄色强调色 #FACC15
- 深色反转侧边区（#2D2D2D）+ 深色嵌入卡片（#1A1A1A）
- 三栏 12 列网格布局（3+6+3）
- Inter 字体

---

## 风格建议

- 优先使用设计系统中定义的配色变量（accent #FACC15、surfaceDark #2D2D2D、positive rgb(90,173,112) 等），在此基础上通过透明度和渐变产生层次变化，保持整体暖色调的统一感
- 数据可视化统一使用 ECharts 配合上述 BASE_OPTION 主题配置，让图表风格与卡片、进度条等 CSS 组件在色彩和圆角上保持一致
- 保持浅色暖底与深色反转区的对比节奏，利用超圆角（32px / 24px）和极轻阴影营造柔和、精致的卡片层次
