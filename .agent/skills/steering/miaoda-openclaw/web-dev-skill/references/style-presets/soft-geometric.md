# Soft Geometric · 柔和几何风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Soft Geometric Dashboard — 现代圆角几何 x 浅色底 x 翡翠绿点缀色
- **Visual Signature**:
  1. 超大圆角卡片（rounded-[32px] ~ rounded-[48px]），柔和几何感
  2. 轻量 border + shadow-sm 组合，层次分明但不厚重
  3. 翡翠绿 accent (#00B894) 贯穿品牌色与交互反馈
  4. 深色海军蓝 (#1F2937) 作为辅助强调色，用于暗色区块与数据对比
  5. font-[900] 超粗字重 + italic 斜体组合，运动感品牌标题
  6. uppercase + tracking-widest 标签系统，精致微缩感
- **Emotional Tone**: 清爽、现代、精致、数据自信

---

## 配色方案

**方案**: 自定义 — Soft Light + Emerald Teal
**色彩关系**: 浅灰白底 + 翡翠绿强调 + 深海军蓝辅助

| 角色 | HEX | HSL 近似 | 用途 |
|-----|-----|---------|-----|
| bg (background) | #F9FAFB | hsl(210 20% 98%) | 页面背景 |
| surface (card) | #FFFFFF | hsl(0 0% 100%) | 卡片背景 |
| surfaceDark | #1F2937 | hsl(215 28% 17%) | 深色卡片背景 |
| text (foreground) | #111827 | hsl(215 28% 17%) | 主要文字（gray-900） |
| textMuted | #9CA3AF | hsl(218 11% 65%) | 次要文字、标签、坐标轴（gray-400） |
| textLight | #D1D5DB | hsl(214 12% 84%) | 更次级文字（gray-300） |
| accent | #00B894 | hsl(160 100% 36%) | 强调色、品牌色、交互反馈、正向指标 |
| border | #F3F4F6 | hsl(220 14% 96%) | 卡片边框（gray-100，极淡） |

### 语义色

| 用途 | HEX | 说明 |
|-----|-----|-----|
| 正向/上升 | #10B981 / #00B894 | emerald-500 或 accent 色，上升箭头与正向指标 |
| 负向/下降 | #F43F5E | rose-500，下降箭头与负向指标 |
| 空闲/中性 | #9CA3AF | gray-400，Idle 状态 |
| 待定/警告 | #F97316 | orange-500，Pending 状态 |
| 选区高亮 | #00B894 bg + white text | selection:bg-[#00B894] selection:text-white |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['#00B894', '#1F2937', '#10B981', '#6366F1', '#F97316', '#EC4899'];
//               翡翠绿     海军蓝     祖母绿     靛蓝紫     橙色       粉红
```

| 序号 | HEX | 说明 |
|-----|-----|-----|
| 系列 1 | #00B894 | 主色 |
| 系列 2 | #1F2937 | 辅助对比色 |
| 系列 3 | #10B981 | 正向语义辅助 |
| 系列 4 | #6366F1 | 扩展分类 |
| 系列 5 | #F97316 | 扩展分类 |
| 系列 6 | #EC4899 | 扩展分类 |

### BASE_OPTION

```js
const ACCENT = '#00B894';
const GRID_COLOR = '#F3F4F6';
const TEXT_COLOR = '#9CA3AF';

const BASE_OPTION = {
  color: COLORS,
  textStyle: {
    fontFamily: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    color: TEXT_COLOR
  },
  backgroundColor: 'transparent'
};
```

### 坐标系统

**grid**:
```js
grid: {
  containLabel: true,
  left: 16,
  right: 16,
  top: 24,
  bottom: 24
}
```

**xAxis**:
```js
xAxis: {
  type: 'category',
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans'",
    margin: 10
  },
  splitLine: { show: false }
}
```

**yAxis**:
```js
yAxis: {
  type: 'value',
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans'"
  },
  splitLine: {
    lineStyle: {
      color: '#F3F4F6',
      type: 'dashed'
    }
  }
}
```

### Tooltip

```js
tooltip: {
  trigger: 'axis',
  backgroundColor: '#FFFFFF',
  borderColor: 'transparent',
  borderWidth: 0,
  borderRadius: 24,
  padding: 16,
  shadowBlur: 50,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffsetY: 25,
  textStyle: {
    fontFamily: "'Plus Jakarta Sans'",
    color: '#111827',
    fontSize: 12,
    fontWeight: 900
  },
  axisPointer: {
    type: 'line',
    lineStyle: {
      color: '#00B894',
      width: 1
    }
  }
}
```

### Legend

```js
legend: {
  textStyle: {
    fontFamily: "'Plus Jakarta Sans'",
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: 900
  },
  formatter: (name) => name.toUpperCase(),
  itemGap: 16,
  padding: [0, 0, 16, 0],
  icon: 'circle',
  itemWidth: 8,
  itemHeight: 8
}
```

### series 默认视觉参数

**line（面积模式）**:
```js
{
  type: 'line',
  smooth: true,
  symbol: 'none',
  lineStyle: {
    width: 5
  },
  areaStyle: {
    color: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0.05, color: 'rgba(0, 184, 148, 0.15)' },
        { offset: 0.95, color: 'rgba(0, 184, 148, 0)' }
      ]
    }
  }
}
```
要点：平滑曲线，粗线条 5px，渐变填充从 15% 到 0% 透明度，无数据点标记。

**bar**:
```js
{
  type: 'bar',
  barWidth: 10,
  itemStyle: {
    borderRadius: [4, 4, 0, 0]
  },
  barGap: '20%'
}
```
要点：柱顶小圆角，窄柱宽。暗色容器内的对比柱使用 `rgba(255, 255, 255, 0.4)` 半透明白色。

**pie（环形）**:
```js
{
  type: 'pie',
  radius: ['67%', '92%'],
  padAngle: 12,
  itemStyle: {
    borderWidth: 0
  },
  label: { show: false },
  labelLine: { show: false }
}
```
要点：大 padAngle 间距环形图，无描边，无标签。中心数值通过 ECharts graphic 组件叠加。

**迷你图表（暗色容器内）**:
```js
{
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  xAxis: { show: false, type: 'category' },
  yAxis: { show: false, type: 'value' }
}
```
要点：无坐标轴，无边距，纯数据可视化。

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器样式 | `bg-white border border-gray-100 shadow-sm` | 白色卡片，极淡边框，轻阴影 |
| 圆角 | `rounded-[48px]`（大图表卡片） / `rounded-[32px]`（小卡片） | 超大圆角 |
| 阴影 | `shadow-sm`（默认） / `hover:shadow-md`（悬浮） | 轻量阴影层次 |
| 内边距 | `p-10`（图表区） / `p-12`（表格区） / `p-6`（小卡片） | 宽松内边距 |
| hover | `hover:shadow-md transition-all` | 阴影加深 |
| 图表高度 | `h-[320px]`（主图表） / `h-20`（迷你图表） / `h-52`（饼图区域） | 根据内容密度 |
| 网格 | `grid-cols-12 gap-8` | 12 列网格系统 |

### 图表交互

- **Tooltip**: 大圆角 24px，白底，无边框，柔和阴影
- **Legend**: 图表外部自定义实现（flex 排列圆点 + uppercase 标签）
- **axisPointer**: `type: 'line'`，lineStyle `{ color: '#00B894', width: 1 }`
- **Hover 高亮**: emphasis `{ focus: 'series' }`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
```

| 用途 | 字体 | 说明 |
|-----|-----|-----|
| 全局 / 标题 / 数字 | `'Plus Jakarta Sans', sans-serif` | 几何圆润无衬线，唯一主字体 |
| 中文回退 | `'Noto Sans SC', sans-serif` | 中文正文回退字体 |

### 文字层级

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌标题 | `text-4xl font-[900] tracking-tighter italic` | #111827，accent 色用于品牌高亮字 |
| Hero 标题 | `text-5xl font-[900] leading-[1.1]` | #111827 |
| Section 标题 | `text-xl ~ text-2xl font-[900] italic` | #111827 |
| Section 副标题 | `text-[11px] font-bold uppercase tracking-[0.2em]` | #9CA3AF |
| KPI 数值 | `text-2xl font-black` | #111827，hover 时 #00B894 |
| KPI 标签 | `text-[10px] font-black uppercase tracking-widest` | #9CA3AF |
| 趋势百分比 | `text-[11px] font-black` | emerald-500 或 rose-500 |
| 表格表头 | `text-[11px] font-[900] uppercase tracking-[0.15em]` | #D1D5DB |
| 表格正文 | `text-base font-black`（名称） / `text-sm font-[900] italic tracking-tighter`（数值） | #111827 |
| 表格辅助 | `text-[10px] font-black uppercase tracking-widest` | #D1D5DB |
| 按钮文字 | `text-xs font-black` | 白色（主按钮） / #374151（次按钮） |
| 描述正文 | `text-sm font-medium leading-relaxed` | #9CA3AF |
| 时间显示 | `text-xs font-bold uppercase tracking-widest`（日期） / `text-sm font-black italic`（时间） | #6B7280 / #111827 |
| 图例标签 | `text-[9px] font-black uppercase` | #9CA3AF |
| 背景装饰大字 | `text-[200px] font-[900] italic tracking-tighter` | #F9FAFB（gray-50），opacity-80 |

---

## 页面结构

> Soft Geometric Dashboard — 12 列网格系统，大圆角卡片，浅色主题，垂直 Section 浏览。

```
Header（品牌 Logo 图标 + 标题 + 描述 | 右侧日期时间卡片）
    |
Section 1: Hero + 核心指标（左 7/12 大展示卡片 | 右 5/12 四宫格 KPI + 暗色迷你图表）
    |
Section 2: 趋势 + 分布（左 8/12 主趋势图表 | 右 4/12 环形分布图）
    |
Section 3: 数据表格（全宽表格卡片 + 搜索 + 导出）
```

### 关键布局参数

| 元素 | 样式 |
|-----|-----|
| 页面背景 | `bg-[#F9FAFB]` |
| 页面内边距 | `p-8 lg:p-12` |
| 内容容器 | `max-w-[1600px] mx-auto` |
| Section 间距 | `space-y-10`（40px） |
| 网格系统 | `grid grid-cols-12 gap-8` |
| 卡片圆角 | `rounded-[48px]`（大卡片） / `rounded-[32px]`（中卡片） / `rounded-2xl`（小元素） |
| 卡片边框 | `border border-gray-100`（极淡 1px） |
| 卡片阴影 | `shadow-sm`（默认） / `shadow-xl`（强调） |

### Header 设计

品牌 Header — flex 两端对齐布局：
```
左侧:
  [品牌图标 w-12 h-12 bg-[#00B894] rounded-2xl shadow-xl shadow-emerald-100]
  [品牌名] text-4xl font-[900] italic tracking-tighter，高亮字用 accent 色 not-italic
  [描述文字] text-sm text-gray-400 font-medium leading-relaxed

右侧:
  [日期时间卡片] bg-white px-6 py-4 rounded-[24px] border border-gray-100 shadow-sm
    日期: 图标 + text-xs font-bold uppercase tracking-widest text-gray-500
    时间: 图标 + text-sm font-black italic text-gray-900
    分隔: divide-x divide-gray-100
```
- 响应式: `flex flex-col md:flex-row items-start md:items-end justify-between gap-6`

### 导航方式

本设计采用简洁的 Header 品牌区 + Section 垂直浏览模式，页面内容通过自然滚动逐段呈现，保持视觉的开阔与清爽。

---

## 视觉风格

### 圆角与阴影

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 大卡片（Hero、图表、表格） | `rounded-[48px]` | `shadow-sm` |
| 中卡片（指标、暗色区块） | `rounded-[32px]` | `shadow-sm` / `shadow-xl` |
| 日期时间卡片 | `rounded-[24px]` | `shadow-sm` |
| 图标容器 | `rounded-2xl`（16px） | 无 / `shadow-inner` |
| 表格行图标 | `rounded-3xl`（24px） | `shadow-inner` |
| 按钮 | `rounded-2xl`（16px） | `shadow-sm` ~ `shadow-xl` |
| 进度条 | `rounded-full` | 无 |
| 标签徽标 | `rounded-full` / `rounded-2xl` | 无 |
| 品牌图标 | `rounded-2xl` | `shadow-xl shadow-emerald-100` |

### 边框

- 卡片: `border border-gray-100`（1px 极淡灰）
- 状态标签: `border border-emerald-100` / `border border-orange-100`
- 表头分隔: `border-b border-gray-50`
- 表体分隔: `divide-y divide-gray-50/50`
- 日期时间内分隔: `divide-x divide-gray-100`

### Hover 交互模式

- **阴影加深**: hover 时 shadow-sm -> shadow-md（指标卡片）
- **文字变色**: hover 时 text-gray-900 -> text-[#00B894]（KPI 数值、表格名称）
- **图标按钮变色**: hover 时 text-gray-400 -> text-[#00B894]（工具按钮）
- **深色翻转**: hover 时 bg-gray-50 -> bg-[#1F2937] + text-white（图例行、More 按钮）
- **表格行图标翻转**: hover 时 bg-gray-50 -> bg-[#00B894] + text-white（transition-all duration-500）
- **缩放**: hover:scale-105（主 CTA 按钮）
- **背景装饰缩放**: group-hover:scale-110 transition-transform duration-700（暗色区块背景图标）

### 动画

| 动画 | 参数 |
|-----|-----|
| 卡片 hover 过渡 | `transition-all`（默认 150ms） |
| 表格行图标翻转 | `transition-all duration-500` |
| 暗色区块装饰缩放 | `transition-transform duration-700` |
| 按钮 hover | `transition-all` / `transition-colors` |
| 选中色 | `selection:bg-[#00B894] selection:text-white` |

### 滚动条与选区

```css
.no-scrollbar::-webkit-scrollbar { display: none; }
::selection { background: #00B894; color: white; }
```

---

## 组件规范

### KPI 指标卡片

```
容器: bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm
Hover: hover:shadow-md transition-all
分组: group（子元素联动 hover）
高度: h-full，flex flex-col justify-between

布局:
  顶部: 图标（左） + 趋势箭头百分比（右），flex items-center justify-between mb-4
  底部: 标签 + 大数值

图标容器:
  尺寸: w-12 h-12 rounded-2xl flex items-center justify-center
  正向: bg-emerald-50 text-[#00B894]
  负向: bg-rose-50 text-rose-500
  图标大小: 22px

趋势指示:
  容器: flex items-center gap-1 text-[11px] font-black
  正向: text-emerald-500 + ArrowUpRight 14px
  负向: text-rose-500 + ArrowDownRight 14px

标签: text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1
数值: text-2xl font-black text-gray-900
      group-hover:text-[#00B894] transition-colors
```

### Hero 展示卡片

```
容器: col-span-12 lg:col-span-7 bg-white rounded-[48px] p-12 relative overflow-hidden
      flex items-center min-h-[480px] border border-gray-100 shadow-sm

背景装饰大字:
  text-[200px] font-[900] text-gray-50 tracking-tighter italic leading-none opacity-80
  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  pointer-events-none select-none

内容区域: relative z-10 w-3/5
  标签: inline-flex items-center gap-2 bg-emerald-50 text-[#00B894] px-4 py-1.5
        rounded-full text-[10px] font-black uppercase mb-8
  标题: text-5xl font-[900] text-gray-900 mb-4 leading-[1.1]
  描述: text-gray-400 text-sm font-medium mb-10 max-w-sm

右侧大图标装饰:
  absolute right-[-40px] top-1/2 -translate-y-1/2 w-1/2
  drop-shadow-[0_35px_35px_rgba(0,184,148,0.2)]
  图标: 320px text-[#00B894] rotate-[-12deg] opacity-95
```

### 按钮系统

```
主按钮（CTA）:
  bg-[#00B894] text-white px-8 py-4 rounded-2xl text-xs font-black
  flex items-center gap-2
  shadow-xl shadow-emerald-200
  hover:scale-105 transition-all

次按钮（Ghost）:
  bg-white border border-gray-100 text-gray-700 px-8 py-4 rounded-2xl text-xs font-black
  flex items-center gap-2
  shadow-sm
  hover:bg-gray-50 transition-all

工具按钮（Icon Button）:
  p-3 bg-gray-50 rounded-2xl text-gray-400
  hover:text-[#00B894] transition-colors

操作按钮（Dark）:
  bg-gray-900 text-white px-6 py-4 rounded-2xl text-xs font-black
  hover:bg-[#00B894] transition-all

More 按钮:
  w-10 h-10 rounded-2xl bg-gray-50 text-gray-400
  hover:bg-[#1F2937] hover:text-white transition-all
```

### 暗色迷你图表区块

```
容器: bg-[#1F2937] rounded-[32px] p-6 shadow-xl relative overflow-hidden group

背景装饰图标:
  absolute top-0 right-0 p-6 opacity-5
  group-hover:scale-110 transition-transform duration-700
  图标 120px text-white

标题行: flex items-center justify-between mb-4 relative z-10
  标题: text-[10px] font-black uppercase text-gray-400 tracking-widest
  图例: flex gap-3 text-[9px] font-black text-gray-400 uppercase
    圆点: w-2 h-2 rounded-full（accent 和 white）

图表区域: h-20 relative z-10
```

### 图表容器卡片

```
容器: bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm relative group
标题区: flex items-center justify-between mb-10
  主标题: text-xl font-[900] text-gray-900 italic
  副标题: text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1
工具栏: flex gap-2（图标按钮）
```

### 分布图卡片

```
容器: bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm
      flex flex-col items-center

标题行: flex items-center justify-between w-full mb-8
  标题: text-xs font-black text-gray-400 uppercase tracking-widest
  更多: MoreHorizontal 18px text-gray-200

图表: relative w-52 h-52 my-4

中心数值:
  absolute inset-0 flex flex-col items-center justify-center
  数字: text-4xl font-[900] text-gray-900 italic tracking-tighter
  单位: text-sm font-black text-[#00B894] ml-1
  标签: text-[10px] text-gray-300 font-black uppercase tracking-widest

图例列表: mt-8 w-full space-y-4
  行: flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer
      hover:bg-[#1F2937] hover:text-white transition-all group
    左侧: 圆点 w-2.5 h-2.5 rounded-full + text-xs font-bold italic
    右侧: text-sm font-black group-hover:text-[#00B894]
```

### 数据表格

```
容器: bg-white rounded-[48px] p-12 border border-gray-100 shadow-sm

标题区: flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12
  主标题: text-2xl font-[900] text-gray-900 italic
  副标题: text-xs text-gray-400 mt-1 font-medium

搜索框:
  bg-gray-50 border-none pl-11 pr-6 py-4 rounded-2xl text-xs font-bold text-gray-600
  focus:ring-2 ring-emerald-100 outline-none w-64
  图标: 16px absolute left-4 top-1/2 -translate-y-1/2
        text-gray-300 group-focus-within:text-[#00B894] transition-colors

表格:
  容器: overflow-x-auto -mx-12 px-12
  table: w-full

  表头 <thead>:
    tr: text-left text-[11px] font-[900] text-gray-300 uppercase tracking-[0.15em] border-b border-gray-50
    th: pb-8 px-4

  表体 <tbody>:
    分隔: divide-y divide-gray-50/50
    tr: group hover:bg-gray-50/50 transition-colors
    td: py-8 px-4

  名称列:
    flex items-center gap-5
    图标容器: w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-[#1F2937]
              group-hover:bg-[#00B894] group-hover:text-white transition-all duration-500 shadow-inner
    名称: text-base font-black text-gray-900 group-hover:text-[#00B894] transition-colors
    ID: text-[10px] font-black text-gray-300 mt-1 uppercase tracking-widest

  数值列:
    text-sm font-[900] text-gray-900 italic tracking-tighter

  进度条列:
    flex flex-col items-center gap-2
    标签行: flex items-center justify-between w-24
      text-[10px] font-black（gray-400 标签 + gray-900 数值）
    进度条: w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden
      填充: h-full bg-[#00B894]

  状态标签:
    Active: px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest
            bg-emerald-50 text-[#00B894] border border-emerald-100
    Idle: bg-gray-50 text-gray-400
    Pending: bg-orange-50 text-orange-500 border border-orange-100
```

---

## 响应式断点

| 断点 | 布局 |
|-----|-----|
| >= 1024px (lg) | 页面 p-12；Hero 7/12 + KPI 5/12；趋势图 8/12 + 分布图 4/12；Header 水平排列 |
| 768px-1023px (md) | Header flex-row 对齐；搜索与导出按钮水平排列 |
| < 768px | 页面 p-8；所有 col-span-12 全宽堆叠；Header 垂直排列；搜索栏与工具栏堆叠 |

### 网格系统细节

| 区域 | lg（>=1024px） | 默认（<1024px） |
|-----|-----|-----|
| Hero + KPI | `col-span-7` + `col-span-5` | 各 `col-span-12` 堆叠 |
| 趋势 + 分布 | `col-span-8` + `col-span-4` | 各 `col-span-12` 堆叠 |
| KPI 宫格 | `grid-cols-2`（始终） | `grid-cols-2`（始终） |
| 数据表格 | 全宽 `col-span-12` | 全宽，横向滚动 |
| 表格标题 + 工具栏 | `sm:flex-row sm:items-center` | `flex-col items-start` |

---

## 灵活性说明

**允许的微调**：
- 响应式断点适配（字号、间距、内边距）
- 图表高度根据数据量调整（h-[320px] 可适当增减）
- Section 内部子网格列数比例微调（如 7:5 可调为 8:4）
- KPI 卡片数量可增减（保持 grid-cols-2 布局）
- 表格列数和内容可根据需要调整
- 饼图数据切片可增加（按配色序列扩展）
- 标签与描述文案可自由替换

---

## 风格建议

- **保持圆润几何特征**：大圆角（rounded-[32px] ~ rounded-[48px]）、浅色底 #F9FAFB、翡翠绿 accent #00B894 是本设计的三大核心标识，围绕它们展开所有视觉决策能确保一致性。
- **优先使用轻量阴影与设计系统色值**：shadow-sm 搭配 ECharts 配色序列中的色彩，可以让页面始终保持清爽、透气的视觉节奏。
- **延续品牌排版调性**：标题区域使用 font-[900] italic 超粗斜体、标签系统使用 uppercase + tracking-widest 微缩大写，可以让整体风格在不同页面间保持统一的运动感与精致感。
