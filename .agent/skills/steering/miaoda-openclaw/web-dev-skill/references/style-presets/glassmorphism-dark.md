# Glassmorphism Dark · 暗黑毛玻璃风 UI 风格模板

---

## 设计语言

- **Aesthetic Direction**: Glassmorphism Dark — 纯黑底 + 毛玻璃卡片 + 背景模糊图 + 红色强调色
- **Visual Signature**:
  1. 超大粗体标题（text-5xl ~ text-7xl），font-extrabold，tracking-tighter
  2. 毛玻璃卡片（glass-card）：rgba(255,255,255,0.05) 背景 + backdrop-blur-12px + 1px 白色 10% 边框 + 24px 圆角
  3. 红色强调色 (#FF4D4D) 用于主数据系列、图标、趋势标记
  4. 固定背景模糊图 + 渐变遮罩叠加层
  5. 左侧图标导航 Sidebar（桌面端）+ 底部浮动操作按钮（移动端）
- **Emotional Tone**: 高端、沉浸、数据自信

---

## 配色方案

**方案**: Glassmorphism Dark + Crimson Red Accent
**色彩关系**: 纯黑底 + 毛玻璃白透明 + 红色强调

| 角色 | 值 | 用途 |
|-----|---|------|
| bg | #000000 / hsl(0 0% 0%) | 页面背景 |
| surface | rgba(255,255,255,0.05) | 毛玻璃卡片背景 |
| surface-hover | rgba(255,255,255,0.10) | 卡片 hover 背景 |
| header | rgba(0,0,0,0.60) → rgba(0,0,0,0.80) → #000000 | 背景渐变遮罩（三段式 from/via/to） |
| text | #FFFFFF / hsl(0 0% 100%) | 主要文字 |
| textMuted | rgba(255,255,255,0.60) / 0.50 / 0.40 / 0.30 | 多级次要文字（60%/50%/40%/30% 四档） |
| accent | #FF4D4D / hsl(0 100% 65%) | 主强调色，数据系列、图标 |
| border | rgba(255,255,255,0.10) | 卡片边框、Sidebar 分隔线 |

### 扩展色

| 角色 | 值 | 用途 |
|-----|---|------|
| sidebar-bg | rgba(255,255,255,0.05) | Sidebar 背景 |
| icon-bg | rgba(255,255,255,0.05) | 图标容器背景 |
| button-active-bg | #FFFFFF | 激活态按钮背景 |
| button-active-text | #000000 | 激活态按钮文字 |
| accent-area-top | rgba(255,77,77,0.30) | 面积图渐变填充起点 |
| accent-area-bottom | rgba(255,77,77,0) | 面积图渐变填充终点 |
| inactive-bar | rgba(255,255,255,0.10) | 非强调条形颜色 |

### 语义色

| 用途 | 值 | 说明 |
|-----|---|------|
| 正向 | #4ADE80 (green-400) | 趋势正向文字 |
| 正向标签背景 | rgba(34,197,94,0.20) | green-500 @ 20% |
| 负向 | #EF4444 (red-500) | 趋势负向 |
| 图标-橙色 | #FB923C (orange-400) | 辅助图标色 |
| 图标-蓝色 | #60A5FA (blue-400) | 辅助图标色 |
| 图标-红色 | #EF4444 (red-500) | 辅助图标色 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['#FF4D4D', '#FFFFFF', '#FFA366', '#4DFF88'];
//               红色       白色       橙色       绿色
```

### BASE_OPTION

```js
const ACCENT = '#FF4D4D';
const GRID_COLOR = 'rgba(255,255,255,0.05)';
const TEXT_COLOR = 'rgba(255,255,255,0.40)';

const BASE_OPTION = {
  color: ['#FF4D4D', '#FFFFFF', '#FFA366', '#4DFF88'],
  textStyle: {
    fontFamily: 'Inter, sans-serif',
    color: 'rgba(255,255,255,0.40)'
  },
  backgroundColor: 'transparent'
};
```

### 坐标系统

```js
// grid
grid: {
  containLabel: true,
  left: 16,
  right: 16,
  top: 24,
  bottom: 24
}

// xAxis（类目轴）
xAxis: {
  type: 'category',
  axisLine: { lineStyle: { color: 'rgba(255,255,255,0.20)' } },
  axisTick: { show: false },
  axisLabel: {
    color: 'rgba(255,255,255,0.20)',
    fontSize: 10,
    fontFamily: 'Inter'
  },
  splitLine: { show: false }
}

// yAxis（数值轴，默认隐藏标签）
yAxis: {
  type: 'value',
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { show: false },
  splitLine: {
    lineStyle: {
      color: 'rgba(255,255,255,0.05)',
      type: 'solid'
    }
  }
}
```

### Tooltip

```js
tooltip: {
  trigger: 'axis',
  backgroundColor: 'rgba(0,0,0,0.80)',
  borderColor: 'transparent',
  borderWidth: 0,
  borderRadius: 12,
  padding: 12,
  shadowBlur: 0,
  shadowColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: 12
  },
  extraCssText: 'backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);',
  axisPointer: { type: 'none' }
}
// 饼图使用 trigger: 'item'
```

### Legend（自定义 HTML 模式）

本设计中图例通过自定义 HTML/CSS 实现，不使用 ECharts 内置 legend。如需 ECharts legend：

```js
legend: {
  textStyle: {
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.40)',
    fontSize: 12,
    fontWeight: 'bold'
  },
  formatter: (name) => name.toUpperCase(),
  itemGap: 16,
  icon: 'circle',
  itemWidth: 8,
  itemHeight: 8
}
```

### series 默认视觉参数

**line（平滑曲线 + 面积渐变）**
```js
{
  type: 'line',
  smooth: true,
  symbol: 'none',
  lineStyle: { color: '#FF4D4D', width: 4 },
  areaStyle: {
    color: {
      type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(255,77,77,0.30)' },
        { offset: 1, color: 'rgba(255,77,77,0)' }
      ]
    }
  }
}
```

**line（阶梯折线）**
```js
{
  type: 'line',
  step: 'end',
  lineStyle: { color: '#FF4D4D', width: 2 },
  symbol: 'none',
  showSymbol: false,
  emphasis: {
    itemStyle: { color: '#FF4D4D', borderColor: '#FFFFFF', borderWidth: 2 },
    symbolSize: 12
  }
}
```

**line（辅助虚线）**
```js
{
  type: 'line',
  smooth: true,
  lineStyle: { color: 'rgba(255,255,255,0.10)', width: 1, type: 'dashed' },
  symbol: 'none'
}
```

**pie（环形图）**
```js
{
  type: 'pie',
  radius: ['55%', '73%'],
  center: ['50%', '50%'],
  padAngle: 5,
  itemStyle: { borderWidth: 0 },
  label: { show: false }
}
```

**bar（水平条形图）**
```js
{
  type: 'bar',
  barWidth: 'auto',
  itemStyle: {
    borderRadius: [0, 10, 10, 0],
    // 首项（最大值）使用 #FF4D4D，其余使用 rgba(255,255,255,0.10)
    color: (params) => params.dataIndex === 0 ? '#FF4D4D' : 'rgba(255,255,255,0.10)'
  }
}
// 水平条形图：yAxis type='category', xAxis type='value' show=false
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|------|
| 容器样式 | `glass-card` | 毛玻璃卡片 |
| 圆角 | 24px (`rounded-3xl`) | Glassmorphism 风格 |
| 阴影 | 无 | 依靠毛玻璃和边框区分 |
| 内边距 | `p-6`（标准）/ `p-8`（大型图表） | 根据内容密度 |
| hover | `hover:bg-white/10 transition-all duration-300` | 背景微亮 |
| 图表高度 | `min-h-[400px]`（hero 区域）/ `h-[250px]`（标准图表）/ `h-[300px]`（全宽图表） |
| 网格 | `grid-cols-1 lg:grid-cols-4 gap-6` | 响应式布局 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

| 用途 | 字体 | 字重 |
|-----|-----|------|
| 全局默认 | Inter, sans-serif | 400 (normal) |
| Heading / 数字 | Inter, sans-serif | 800 (extrabold) / 900 (black) |
| Body | Inter, sans-serif | 400-500 |

### 文字层级

| 层级 | 样式 | 颜色 |
|-----|-----|------|
| 页面主标题 | `text-5xl md:text-7xl font-extrabold tracking-tighter leading-none` | #FFFFFF，弱化部分 text-white/40 italic font-light |
| Hero KPI 数值 | `text-6xl font-black` | #FFFFFF |
| Section 标题 | `text-2xl font-black italic` | #FFFFFF |
| 卡片内标题 | `text-xl font-bold` | #FFFFFF |
| KPI 数值（卡片） | `text-3xl font-extrabold` | #FFFFFF |
| 标签/分类 | `text-sm font-medium tracking-wider uppercase` | rgba(255,255,255,0.60) |
| 小标签 | `text-sm font-bold uppercase tracking-widest` | rgba(255,255,255,0.40) |
| 趋势标签 | `text-xs font-bold` | #4ADE80，bg: green-500/20，rounded-lg |
| 描述文字 | `text-lg leading-relaxed` | rgba(255,255,255,0.50) |
| 辅助小字 | `text-sm` | rgba(255,255,255,0.40) |
| 极小字 | `text-[10px] uppercase tracking-tighter` | rgba(255,255,255,0.30) |
| 按钮文字 | `text-sm font-bold` | 激活: #000000；非激活: rgba(255,255,255,0.60) |
| 突出标题 | `text-4xl font-black uppercase` | #FFFFFF |

---

## 页面结构

> Sidebar + 主内容区，杂志式编辑排版。

```
固定背景层（模糊图片 opacity-40 + 三段渐变遮罩 from-black/60 via-black/80 to-black）
    |
Sidebar（左侧固定图标导航，桌面端 w-24，移动端隐藏）
    |
Main Content（flex-grow, p-4 md:p-12）
    +-- Header 区域（左侧标题+描述 / 右侧切换按钮组）
    +-- Hero 数据行（左 3/4 大卡含面积图背景 + 右 1/4 纵向堆叠 StatCard x2）
    +-- 中间洞察网格（4 列布局 → 2+1+1 列分配）
    +-- 全宽图表卡（波形图，mb-12）
    +-- （无 Footer）

Mobile FAB（fixed bottom-6 right-6, md 以下显示）
```

### 背景层设计

```
层 1 — 固定模糊背景图:
  fixed inset-0, pointer-events: none, z-index: 0, opacity: 0.4
  background-size: cover, background-position: center

层 2 — 渐变遮罩:
  fixed inset-0, pointer-events: none, z-index: 0
  linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8), #000)
```

### 关键布局参数

| 元素 | 样式 |
|-----|------|
| 整体布局 | `min-h-screen flex flex-col md:flex-row` |
| 主内容容器 | `flex-grow z-10 p-4 md:p-12 overflow-y-auto w-full` |
| Section 间距 | `mb-8`（行间）/ `mb-12`（大 Section） |
| 卡片间距 | `gap-6`（24px） |
| Header 间距 | `mb-12, gap-8` |

---

## 视觉风格

### 毛玻璃效果（核心视觉）

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}
```

### 圆角体系

| 元素 | 值 |
|-----|---|
| 毛玻璃卡片 | 24px (`rounded-3xl`) |
| 按钮组容器 | 16px (`rounded-2xl`) |
| 按钮 | 12px (`rounded-xl`) |
| 图标容器 | 12px (`rounded-xl`) |
| 导航项 | 16px (`rounded-2xl`) |
| 趋势标签 | 8px (`rounded-lg`) |
| 头像 | `rounded-full` |
| 条形图右端 | `borderRadius: [0, 10, 10, 0]` |
| Tooltip | 12px |

### 阴影

| 元素 | 值 |
|-----|---|
| 导航激活态 | `shadow-lg shadow-white/20` |
| 浮动按钮 | `shadow-2xl` |
| 其余元素 | 无阴影，依靠毛玻璃 + 边框层次区分 |

### 边框

| 元素 | 值 |
|-----|---|
| 卡片边框 | 1px solid rgba(255,255,255,0.10) |
| Sidebar 右边框 | `border-r border-white/10` |
| Logo 边框 | `border-2 border-white/20`，hover → `border-white` |
| 头像堆叠 | `border-2 border-black` |
| Sidebar 头像 | `border border-white/20` |

### Hover 交互

| 模式 | 描述 |
|-----|------|
| 卡片微亮 | white/5 → white/10 |
| 图标放大 | `group-hover:scale-110` |
| 按钮色变 | bg-white → bg-white/90 或 text-white/60 → text-white |
| 导航变色 | text-white/40 → text-white + bg-white/5 |
| Logo 边框 | border-white/20 → border-white |
| 浮动按钮旋转 | `hover:rotate-45` |

### 动画

| 动画 | 参数 |
|-----|------|
| 卡片 Hover | `transition-all duration-300` |
| 按钮 Hover | `transition-all` |
| 导航 Hover | `transition-all duration-300` |
| 图标缩放 | `transition-transform` |
| Logo 边框 | `transition-colors` |
| 浮动按钮旋转 | `transition-transform` |

### 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
```

---

## 组件规范

### KPI 指标卡片 (StatCard)

```
容器: glass-card p-6 flex flex-col justify-between h-full group
      hover:bg-white/10 transition-all duration-300

布局:
  顶部: flex justify-between items-start mb-4
    左: 标签（text-sm font-medium text-white/60 tracking-wider uppercase）
    右: 图标容器（p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform）
  底部:
    数值: text-3xl font-extrabold text-white mb-1
    副标题: text-sm text-white/40

图标: lucide-react，使用语义色（orange-400 / blue-400 等）
```

### Hero 数据卡

```
容器: lg:col-span-3 glass-card overflow-hidden relative min-h-[400px]

顶部信息层（z-10, p-8 pb-0）:
  左侧:
    小标签: text-sm text-white/40 font-bold uppercase tracking-widest
    大数值: text-6xl font-black mt-2
    趋势标签: bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-bold
    时间戳: text-white/30 text-xs
  右侧:
    头像堆叠: flex -space-x-2
      头像: w-8 h-8 rounded-full border-2 border-black bg-white/10
      计数: w-8 h-8 rounded-full border-2 border-black bg-white text-black text-[10px] font-bold

图表层: absolute inset-0 top-32（从顶部 128px 开始，面积图铺满剩余空间）
```

### Sidebar（桌面端）

```
容器: hidden md:flex flex-col w-24 bg-white/5 border-r border-white/10 backdrop-blur-xl
      sticky top-0 h-screen py-8 items-center space-y-12 z-20

Logo: w-12 h-12 rounded-full border-2 border-white/20
      hover:border-white transition-colors

导航项（NavItem）:
  容器: p-4 rounded-2xl cursor-pointer transition-all duration-300
  激活态: bg-white text-black shadow-lg shadow-white/20
  非激活: text-white/40 hover:text-white hover:bg-white/5

导航图标: lucide-react, size 24

底部: Settings 图标 + 用户头像（w-10 h-10 rounded-full border border-white/20）
```

### 时间段切换按钮组

```
容器: flex items-center space-x-4 bg-white/10 p-2 rounded-2xl backdrop-blur-md

激活按钮: px-6 py-2 rounded-xl bg-white text-black font-bold text-sm
          hover:bg-white/90 transition-all

非激活按钮: px-6 py-2 rounded-xl text-white/60 font-bold text-sm
            hover:text-white transition-all
```

### Header

```
布局: flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8

左侧（max-w-xl）:
  主标题: text-5xl md:text-7xl font-extrabold tracking-tighter leading-none
    强调词 #FFFFFF / 弱化词 text-white/40 italic font-light
  描述: text-lg text-white/50 leading-relaxed

右侧: 时间段切换按钮组
```

### 图表容器卡片（通用）

```
容器: glass-card p-6（标准）/ p-8（大型图表）
标题: text-xl font-bold mb-6 flex items-center
      可搭配 lucide icon（mr-3, 语义色）
```

### 自定义图例（CSS 实现）

```
水平图例:
  容器: flex items-center space-x-6
  每项: flex items-center space-x-2
    色块: w-2 h-2 rounded-full
    标签: text-xs text-white/40 font-bold uppercase

垂直图例:
  容器: space-y-3, hidden md:block
  每项: flex items-center space-x-3
    色块: w-3 h-3 rounded-full
    名称: text-sm text-white/70
    数值: text-sm font-bold
```

### SVG 圆环进度

```
容器: relative w-24 h-24 mx-auto
背景环: stroke text-white/5, strokeWidth 3
进度环: stroke text-red-500, strokeWidth 3, strokeLinecap="round"
中心数字: absolute inset-0 flex items-center justify-center font-bold text-xl
```

### 移动端浮动按钮

```
容器: md:hidden fixed bottom-6 right-6 z-50
按钮: w-16 h-16 bg-white text-black rounded-full shadow-2xl
      flex items-center justify-center
图标: hover:rotate-45 transition-transform
```

---

## 响应式断点

| 断点 | 布局 |
|-----|------|
| >= 1024px (lg) | Sidebar w-24 可见；Hero 行 4 列（3+1）；洞察行 4 列；主内容 p-12 |
| 768px-1023px (md) | Sidebar w-24 可见；Hero 行自适应；洞察行 2 列；主内容 p-12；标题 text-7xl |
| < 768px | Sidebar 隐藏；浮动按钮可见；全部单列；p-4；标题 text-5xl；饼图图例隐藏 |

| 元素 | 移动端 | 桌面端 |
|-----|--------|--------|
| Sidebar | `hidden` | `md:flex` |
| 浮动按钮 | 可见 | `md:hidden` |
| 页面标题 | `text-5xl` | `md:text-7xl` |
| 主内容边距 | `p-4` | `md:p-12` |
| Header 布局 | `flex-col` | `md:flex-row` |
| Hero 区域 | 全宽 | `lg:col-span-3` |
| 洞察行 | 单列 | `md:grid-cols-2 lg:grid-cols-4` |
| 饼图图例 | `hidden` | `md:block` |

---

## 灵活性说明

**允许的微调**：
- 响应式断点适配（字号、间距、网格列数）
- 图表高度根据数据量和屏幕空间调整
- Section 内部子网格列数
- 背景模糊图片 URL 可替换
- 头像图片 URL 可替换
- 切换按钮数量和文案可调整
- 卡片内图标可按需更换（限 lucide-react 图标库）

---

## 风格建议

- **坚持 Glassmorphism 暗色基调**：始终使用纯黑背景搭配毛玻璃卡片（glass-card）、背景模糊图层与渐变遮罩，保持沉浸式暗色氛围；图表配色优先使用配色序列（COLORS）中的四色，确保视觉一致性。
- **保留 Sidebar 图标导航模式**：桌面端采用左侧图标 Sidebar 导航，移动端切换为底部浮动按钮，维持简洁的空间层次；所有数值从数据源动态读取计算，保证数据真实可靠。
- **维护视觉签名色与大圆角**：accent 色 #FF4D4D 和 24px 大圆角是本设计的核心识别特征，保持它们的统一使用能让整体风格更具辨识度和品牌感。
