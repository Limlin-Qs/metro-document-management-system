# Nebula Crimson · 深红星云 UI 风格模板

## 设计语言 (Design Language)

- **美学方向**: 高端商务年报风格，深红色(Dark Crimson)为品牌主色调，大量留白与超大字重排版营造权威感与仪式感
- **视觉签名**: 超黑字重标题(font-black / 900)、超紧字间距(tracking-tighter)、全大写英文注释标签(uppercase tracking-widest)、深红渐变区块交替
- **情感调性**: 权威、庄重、自信、高端科技感——适用于企业年报、集团战略汇报、高管级数据展示

---

## 配色方案 (Color Scheme)

| 色彩角色 | 变量名 | 色值 | Tailwind 类 | 说明 |
|---------|--------|------|-------------|------|
| 背景色 | `bg` | `#FAFAFA` | `bg-[#fafafa]` | 主内容区浅灰底色 |
| 表面色 | `surface` | `#FFFFFF` | `bg-white` | 卡片、面板、内容容器底色 |
| 头部/强调区背景 | `header` | `#8B0000` | `bg-nebula-crimson` / `bg-[#8B0000]` | 深红主色，用于 Hero、业务分析等全幅区块 |
| 主文本色 | `text` | `#111827` | `text-gray-900` | 标题与正文主色 |
| 次要文本色 | `textMuted` | `#9CA3AF` | `text-gray-400` | 辅助标签、注释、副标题 |
| 强调色 | `accent` | `#8B0000` | `text-nebula-crimson` | 关键数值、图标高亮、进度条、分割线 |
| 边框色 | `border` | `#F3F4F6` | `border-gray-100` | 卡片、面板的轻量边框 |

### 扩展色板

| 用途 | 色值 | 说明 |
|------|------|------|
| 深色 Hero 背景 | `#1A0000` | 极深红黑，Hero 与暗色区块底色 |
| 深色 Outlook 背景 | `#030712` | `bg-gray-950`，近纯黑 |
| Footer 背景 | `#050505` | `bg-[#050505]`，极深黑 |
| 正增长标识 | `#16A34A` / `#DCFCE7` | `text-green-600` / `bg-green-50` |
| 图表红色渐变序列 | `#8B0000` → `#A52A2A` → `#CD5C5C` → `#E9967A` → `#FFA07A` | 5 级深红到浅橙红渐变 |
| 暗色区透明白 | `rgba(255,255,255,0.05~0.2)` | `bg-white/5` ~ `bg-white/20`，用于暗色背景上的玻璃态容器 |
| 红色浅底 | `#FEF2F2` | `bg-red-50`，图标与高亮信息背景 |

### 自定义 CSS 类（在 `<style>` 中定义）

```css
.bg-nebula-crimson { background-color: #8B0000; }
.text-nebula-crimson { color: #8B0000; }
.border-nebula-crimson { border-color: #8B0000; }
```

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['#8B0000', '#A52A2A', '#CD5C5C', '#E9967A', '#FFA07A'];
//               深红       棕红       印度红     深鲑红     浅鲑红
```

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #8B0000 | 深红 |
| 2 | #A52A2A | 棕红 |
| 3 | #CD5C5C | 印度红 |
| 4 | #E9967A | 深鲑红 |
| 5 | #FFA07A | 浅鲑红 |

### ECharts 全局 BASE_OPTION

```js
const ACCENT = '#8B0000';
const GRID_COLOR = '#EEEEEE';       // 网格线色
const TEXT_COLOR = '#999999';        // 坐标轴标签色

const BASE_OPTION = {
  color: ['#8B0000', '#A52A2A', '#CD5C5C', '#E9967A', '#FFA07A'],
  backgroundColor: 'transparent',    // 背景由外部容器控制
  textStyle: {
    fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif',
    color: '#999999'
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
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#999999',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Inter',
      margin: 10
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#999999',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Inter'
    },
    splitLine: {
      lineStyle: {
        color: '#EEEEEE',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    shadowBlur: 30,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffsetY: 10,
    textStyle: {
      fontFamily: 'Inter',
      color: '#111827',
      fontSize: 12
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(139,0,0,0.05)'
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Inter',
      color: '#999999',
      fontSize: 12
    },
    itemGap: 16,
    padding: [20, 0, 0, 0],
    icon: 'roundRect',
    itemWidth: 12,
    itemHeight: 8
  }
};
```

### 各图表类型默认 series 样式

**line（折线图）**
```js
{
  type: 'line',
  smooth: false,
  lineStyle: { width: 4 },
  symbol: 'circle',
  symbolSize: 8,
  areaStyle: {
    color: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(139,0,0,0.15)' },
        { offset: 1, color: 'rgba(139,0,0,0)' }
      ]
    }
  }
}
// 辅助线变体：lineStyle: { color: '#333', type: 'dashed', width: 1 }, areaStyle: { opacity: 0.05 }
```

**bar（柱状图）**
```js
{
  type: 'bar',
  barWidth: 32,
  itemStyle: {
    borderRadius: [10, 10, 0, 0]
  }
}
```

**pie（饼图/环形图）**
```js
// 环形饼图（暗色背景下白色透明度递减）
{
  type: 'pie',
  radius: ['40%', '65%'],
  padAngle: 8,
  itemStyle: {
    borderWidth: 0
  },
  label: { show: false }
}

// 实心饼图
{
  type: 'pie',
  radius: '60%',
  itemStyle: { borderWidth: 0 },
  label: {
    show: true,
    position: 'inside',
    formatter: (params) => params.percent > 10 ? `${Math.round(params.percent)}%` : '',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Inter'
  },
  labelLine: { show: false }
}
```

**radar（雷达图）**
```js
{
  type: 'radar',
  splitArea: {
    areaStyle: {
      color: ['rgba(139,0,0,0.02)', 'rgba(139,0,0,0.04)']
    }
  },
  axisLine: {
    lineStyle: { color: '#EEEEEE' }
  },
  splitLine: {
    lineStyle: { color: '#EEEEEE', type: 'dashed' }
  }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 12,
  itemStyle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowBlur: 4,
    shadowColor: 'rgba(139,0,0,0.3)'
  }
}
```

**水平条形图（通过 xAxis/yAxis 翻转实现）**
```js
{
  yAxis: {
    type: 'category',
    axisLabel: { color: '#666666', fontWeight: 'bold', fontFamily: 'Inter', fontSize: 12 },
    axisLine: { show: false },
    axisTick: { show: false }
  },
  xAxis: {
    type: 'value',
    axisLabel: { show: false },
    splitLine: { show: false }
  },
  series: [{
    type: 'bar',
    barWidth: 32,
    itemStyle: { borderRadius: [0, 10, 10, 0] }
  }]
}
```

### 暗色区 Tooltip 变体

```js
// 用于深红/暗色背景区块中的图表
const TOOLTIP_DARK = {
  backgroundColor: '#8B0000',
  borderColor: 'rgba(255,255,255,0.2)',
  borderWidth: 1,
  borderRadius: 8,
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 12
  }
};
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器样式（浅色区） | `bg-gray-50/50 border border-gray-100 shadow-sm` | 浅灰底+轻边框+微阴影 |
| 容器样式（团队图表区） | `bg-gray-50 border border-gray-100` | 浅灰底+轻边框 |
| 圆角 | `rounded-2xl` 或 `rounded-[2rem]` | 16px / 32px |
| 阴影 | `shadow-sm` | 微阴影 |
| 内边距 | `p-10` 或 `p-12` | 40px / 48px |
| 图表高度 | `h-[400px]` / `h-[380px]` / `h-[450px]` | 按内容密度选用 |

---

## 字体排版 (Typography)

### 字体族

```css
font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

- 英文: Inter (300/400/600/700)
- 中文: PingFang SC / Microsoft YaHei
- 后备: sans-serif

### 文字层级

| 层级 | 用途 | Tailwind 类 | 示例 |
|------|------|-------------|------|
| H1 Hero | 页面主标题 | `text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter` | 首屏大标题 |
| H1 数字 | 超大统计数字 | `text-8xl font-black tracking-tighter text-nebula-crimson` | 52.8 总营收 |
| H2 章节标题 | 各区块标题 | `text-5xl font-black tracking-tight` | 业绩概览、业务回顾 |
| H2 Outlook | 展望标题 | `text-6xl md:text-8xl font-black tracking-tighter` | 智领未来 |
| H3 卡片标题 | 子区块标题 | `text-2xl font-black tracking-tight` | 区域增长亮点 |
| H3 面板标题 | 图表面板标题 | `text-xl font-bold` | 季度业绩走势 |
| H4 数据值 | 大数据展示 | `text-5xl font-black tracking-tight` 或 `text-4xl font-black tracking-tight` | 68.5%、+18% |
| 章节英文标签 | 区块上方标注 | `text-xs font-black tracking-widest uppercase text-nebula-crimson` | PERFORMANCE OVERVIEW |
| 指标标签 | 卡片顶部标签 | `text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400` | 营业收入 |
| 正文 | 段落描述 | `text-lg leading-relaxed text-gray-400` 或 `text-sm text-gray-500` | 说明文本 |
| 脚注/微标签 | 极小文字 | `text-[10px] uppercase font-black tracking-widest` | R&D RATIO |

---

## 页面结构 (Page Structure)

从上到下的区块布局:

1. **Hero Section** -- 全屏暗色(`h-screen bg-[#1a0000]`)，居中排版，Logo + 超大标题 + 副标题 + 引言 + 滚动提示
2. **Overview Section** -- 白色底(`bg-white py-32 px-8 md:px-24`)，章节标题 + 4 列指标卡片网格 + 图表+侧栏数据的 3 列布局
3. **Business Section** -- 深红底(`bg-nebula-crimson py-32 px-8 md:px-24`)，饼图 + 数据卡片 + 白色区域增长面板的 2 列布局
4. **Innovation Section** -- 浅灰底(`bg-gray-50 py-32 px-8 md:px-24`)，章节标题 + 3 列产品卡片网格
5. **Team Section** -- 白色底(`bg-white py-32 px-8 md:px-24`)，左右 2 列布局(文字+小卡片 | 横向条形图)
6. **Outlook Section** -- 极深黑底(`bg-gray-950 py-32 px-8 md:px-24`)，居中标题 + 4 列目标卡片 + 1+2 列战略布局
7. **Footer** -- 纯黑底(`bg-[#050505] py-20`)，左右布局(Logo+简介 | 发布信息)

### 内容容器

- 最大宽度: `max-w-7xl mx-auto`
- 水平内边距: `px-8 md:px-24`
- 垂直区块间距: `py-32`

---

## 视觉风格 (Visual Style)

### 间距体系

| 用途 | 值 | 说明 |
|------|-----|------|
| 区块纵向间距 | `py-32` (8rem) | 各 section 上下内边距 |
| 区块横向间距 | `px-8 md:px-24` | 移动端 2rem，桌面端 6rem |
| 章节标题到内容 | `mb-20` (5rem) | 标题区到主体内容 |
| 网格间隙(标准) | `gap-6` (1.5rem) | 指标卡片网格 |
| 网格间隙(宽松) | `gap-10` ~ `gap-24` | 大区块间、左右分栏 |
| 卡片内边距 | `p-8` ~ `p-12` | 根据卡片尺寸递进 |
| 元素内间距 | `mb-3` ~ `mb-6` | 标签到数值、数值到辅助文本 |

### 圆角体系

| 元素 | 圆角值 | Tailwind 类 |
|------|--------|-------------|
| 小元素(Badge/图标容器) | 8px | `rounded-lg` |
| 标准卡片 | 12px | `rounded-xl` |
| 中型面板 | 16px | `rounded-2xl` |
| 大型面板/产品卡片 | 24px | `rounded-3xl` |
| 超大容器 | 32px | `rounded-[2rem]` |
| 进度条 | 9999px | `rounded-full` |

### 阴影体系

| 层级 | 值 | 用途 |
|------|-----|------|
| 微阴影 | `shadow-sm` | 图表面板 |
| 标准阴影 | `shadow-lg` | 产品卡片 |
| 强阴影 | `shadow-xl` | 浮动信息面板 |
| 超强阴影 | `shadow-2xl` | 暗色区特殊容器 |
| 自定义指标卡片阴影 | `shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]` | 默认态 |
| 自定义 Hover 阴影 | `shadow-[0_20px_60px_-15px_rgba(139,0,0,0.2)]` | 悬停态(带品牌色) |
| 白色面板深阴影 | `shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]` | 暗色区内白色面板 |

### 边框体系

- 标准边框: `border border-gray-100`（浅色区卡片）
- 暗色区透明边框: `border border-white/10`（暗色背景玻璃态容器）
- 左侧强调线: `border-l-4 border-nebula-crimson`（数据高亮条）
- 底部强调线: `border-b-[12px] border-gray-100 hover:border-nebula-crimson`（产品卡片底部）
- 左侧重点线: `border-l-8 border-nebula-crimson`（重要提示框）
- 底部进度条: `h-1 w-0 bg-nebula-crimson group-hover:w-full`（卡片底部动画线）

---

## 组件规范 (Component Specs)

### 指标卡片 (MetricCard)

```
容器: bg-white p-8 rounded-xl border border-gray-100
      shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]
      hover:shadow-[0_20px_60px_-15px_rgba(139,0,0,0.2)]
      transition-all duration-500 overflow-hidden
图标容器: p-2.5 bg-red-50 text-nebula-crimson rounded-lg
         hover → bg-nebula-crimson text-white
标签: text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400
数值: text-4xl font-black text-gray-900 tracking-tight
增长标识: px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-md
底部动画条: h-1 bg-nebula-crimson, hover 时 w-0 → w-full, duration-500
背景装饰图标: opacity-[0.03], hover → opacity-[0.07] scale-110
```

### 章节标题组件

```
英文标签行: flex items-center space-x-3
  装饰线: h-0.5 w-8 bg-nebula-crimson
  文字: text-nebula-crimson font-black tracking-widest uppercase text-xs
中文标题: text-5xl font-black tracking-tight (mb-4)
描述文字: text-gray-400 text-lg leading-relaxed max-w-md~max-w-2xl
```

### 暗色区目标卡片

```
容器: bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-md
      hover:bg-white/10 transition-all duration-300
标签: text-gray-500 text-[10px] uppercase font-black tracking-widest
数值: text-5xl font-black tracking-tighter text-white
增长标签: px-3 py-1 bg-red-900/40 text-red-200 text-[10px] font-bold rounded-full
          border border-red-800/30
```

### 产品卡片

```
容器: bg-white p-12 rounded-3xl shadow-lg
      border-b-[12px] border-gray-100 hover:border-nebula-crimson
      hover:-translate-y-4 transition-all duration-500
图标框: w-16 h-16 [accent-color] text-white rounded-2xl
        hover:scale-110 transition-transform duration-500 shadow-lg
标题: text-2xl font-black tracking-tight
描述: text-gray-500 text-sm leading-relaxed
分割线: h-px w-full bg-gray-100
列表项: text-xs font-bold text-gray-700
  圆点: w-1.5 h-1.5 bg-nebula-crimson rounded-full
```

### 左侧强调数据条

```
容器: border-l-4 border-nebula-crimson pl-8 py-2
      hover:bg-red-50/30 transition-colors duration-300
英文标签: font-bold text-gray-400 uppercase tracking-widest text-[10px]
数值: text-5xl font-black text-nebula-crimson tracking-tight
辅助文字: text-sm text-gray-500
```

### 重点提示框

```
容器: p-8 bg-red-50 rounded-2xl border-l-8 border-nebula-crimson
小标题: font-black text-nebula-crimson uppercase text-xs tracking-[0.2em]
正文: text-gray-700 text-sm leading-relaxed
高亮数字: font-black text-nebula-crimson text-lg (内联)
```

### 进度条

```
外层: w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5
内层: bg-gradient-to-r from-red-900 to-nebula-crimson h-full rounded-full
      transition-all duration-[1.5s] ease-out
```

### Footer

```
容器: py-20 px-8 bg-[#050505] text-white border-t border-white/5
布局: max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12
Logo: w-12 h-12 bg-white text-black font-black text-2xl rounded-xl
品牌名: text-xl font-black tracking-[0.3em] uppercase
描述: text-gray-500 text-sm leading-relaxed font-medium
分割线: h-px w-24 bg-nebula-crimson
版权: text-gray-700 text-[10px] font-bold tracking-tighter
```

---

## 背景装饰手法

### Hero 区复合背景

```
底色: bg-[#1a0000]
径向渐变: radial-gradient(circle_at_20%_30%, rgba(139,0,0,0.4) 0%, transparent 50%),
          radial-gradient(circle_at_80%_70%, rgba(165,42,42,0.3) 0%, transparent 50%)
网格线: 1px rgba(255,255,255,0.05) 线条, 60px 间距, opacity-20
纹理叠加: carbon-fibre pattern, opacity-[0.03]
```

### 暗色区背景模糊

```
倾斜色块: w-2/3 bg-nebula-crimson skew-x-12 opacity-10 blur-3xl
对角色块: w-1/2 bg-blue-900 skew-x-[-12deg] opacity-5 blur-3xl
```

### 浅色区模糊装饰

```
圆形光斑: w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50
```

### 深红区点阵纹理

```
radial-gradient(circle at 2px 2px, white 1px, transparent 0), backgroundSize: 40px 40px, opacity-10
```

---

## 交互与动效 (Interaction & Animation)

| 效果 | 实现方式 | 适用组件 |
|------|---------|---------|
| 阴影增强 | `hover:shadow-[...]` + `transition-all duration-500` | 指标卡片 |
| 上浮 | `hover:-translate-y-4 transition-all duration-500` | 产品卡片 |
| 底部线条展开 | `w-0 → w-full transition-all duration-500` | 指标卡片底部 |
| 图标放大 | `hover:scale-110 transition-transform duration-500` | 产品卡片图标 |
| 背景图标淡入 | `opacity-[0.03] → opacity-[0.07] + scale-110, duration-700` | 指标卡片 |
| 图标颜色翻转 | `bg-red-50 text-crimson → bg-crimson text-white, duration-300` | 指标卡片图标 |
| 文字微移 | `hover:translate-x-1 transition-transform duration-300` | 数值、标题 |
| 边框变色 | `border-gray-100 → border-nebula-crimson duration-500` | 产品卡片底部 |
| 玻璃态亮度 | `bg-white/5 → bg-white/10 duration-300` | 暗色区卡片 |
| 滚动指示器 | `animate-bounce opacity-40` | Hero 底部 |
| 标题脉动 | `animate-pulse` (渐变文字) | Hero 主标题 |
| 进度条动画 | `transition-all duration-[1.5s] ease-out` | 区域增长进度条 |

---

## 响应式断点 (Responsive Breakpoints)

| 断点 | 宽度 | 主要变化 |
|------|------|---------|
| 默认(移动端) | < 768px | 单列布局，`px-8`，`text-6xl` Hero 标题 |
| `md` | >= 768px | 2 列网格，`px-24`，`text-9xl` Hero 标题，`md:text-8xl` Outlook 标题 |
| `lg` | >= 1024px | 3~4 列网格，侧栏布局生效，`lg:grid-cols-4` 指标卡片 |
| `sm` | >= 640px | 2 列小卡片网格(`sm:grid-cols-2`) |

### 典型网格响应

- 指标卡片: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- 产品卡片: `grid-cols-1 md:grid-cols-3`
- 图表+侧栏: `grid-cols-1 lg:grid-cols-3`（图表占 `lg:col-span-2`）
- 业务分析: `grid-cols-1 lg:grid-cols-2`
- 目标卡片: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- 战略布局: `grid-cols-1 lg:grid-cols-3`（重点占 `lg:col-span-1`，其余 `lg:col-span-2`）
- Footer: `flex-col md:flex-row`

---

## 风格建议 (Style Recommendations)

1. **坚持超大字重与紧凑字距的排版策略**: 标题一律使用 `font-black`(900) + `tracking-tight` 或 `tracking-tighter`，搭配全大写英文辅助标签(`uppercase tracking-widest text-[10px]`)，形成中英双语层次分明的权威感排版。

2. **保持深红主色(#8B0000)的克制与精准使用**: 深红色仅用于品牌区块背景、强调数值、进度条、装饰线条和 Hover 态变化，避免在正文或大面积辅助元素中使用，通过白色与深灰的大面积留白衬托深红的点睛效果。

3. **维持明暗交替的全幅区块节奏**: 页面由浅色(白/浅灰) → 深红 → 浅色 → 极深黑交替排列，每个区块均为全宽设计(`py-32 px-8 md:px-24`)，通过色彩对比和背景纹理(网格线、点阵、径向渐变、模糊色块)创造视觉节奏与呼吸感。
