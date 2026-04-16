# Amber Cyber · 琥珀科技 UI 风格模板

---

## 1. 设计语言 (Design Language)

| 维度 | 描述 |
|------|------|
| **美学方向** | 深空科技控制台 — 以近乎纯黑的背景搭配橙色高亮，营造航天器仪表盘般的精密感 |
| **视觉签名** | 玻璃质感暗色卡片 (glass-card) + 橙色发光点缀 (glow-orange) + 全大写微型标签 (uppercase tracking-widest) |
| **情绪基调** | 冷静、专业、高度可控 — 数据驱动的"指挥中心"氛围 |

---

## 2. 配色方案 (Color Scheme)

### 7 色角色体系

| 角色 | 色值 (HEX) | Tailwind 近似 | 用途 |
|------|-----------|---------------|------|
| **bg** (页面背景) | `#0d0d12` | `bg-[#0d0d12]` | 全局页面底色 |
| **surface** (卡片背景) | `#16161e` | `bg-[#16161e]` | 所有 glass-card 容器 |
| **header** (内嵌面板) | `#1f1f2a` | `bg-[#1f1f2a]` | 特殊展示区域、输入框背景 |
| **text** (主文本) | `#e2e8f0` | `text-slate-200` | 标题、数值、主体文字 |
| **textMuted** (辅助文本) | `#64748b` | `text-slate-500` | 标签、说明、次要信息 |
| **accent** (强调色) | `#f97316` | `text-orange-500` | 主高亮、活跃指示器、核心数据强调 |
| **border** (边框) | `#2a2a35` | `border-[#2a2a35]` | 卡片边框、分割线、网格线 |

### 辅助色板

| 角色 | 色值 (HEX) | 用途 |
|------|-----------|------|
| **secondary** | `#3b82f6` (`text-blue-500`) | 次要指标、第二数据系列 |
| **success** | `#10b981` (`text-emerald-500`) | 状态正常指示灯、正向趋势 |
| **buttonBg** | `#252530` / `#252532` | 按钮底色、仪表盘空白扇区 |
| **buttonHover** | `#303040` / `#303045` | 按钮悬停态 |

### 发光效果

```css
/* 橙色辉光 */
box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);   /* .glow-orange */

/* 状态指示灯 — 橙色 */
box-shadow: 0 0 8px rgba(249, 115, 22, 0.4);

/* 状态指示灯 — 绿色 */
box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);

/* 文字辉光 */
filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
```

---

## 3. ECharts 主题样式

### 配色序列

```js
const COLORS = ['#f97316', '#3b82f6', '#10b981', '#a855f7', '#eab308', '#ef4444', '#06b6d4', '#ec4899'];
//               橙(主色)   蓝(次色)   翠绿       紫         黄         红         青         粉
```

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #f97316 | 橙（主色） |
| 2 | #3b82f6 | 蓝 |
| 3 | #10b981 | 翠绿 |
| 4 | #a855f7 | 紫 |
| 5 | #eab308 | 黄 |
| 6 | #ef4444 | 红 |
| 7 | #06b6d4 | 青 |
| 8 | #ec4899 | 粉 |

### ECharts 全局 BASE_OPTION

```js
const ACCENT = '#f97316';
const GRID_COLOR = '#2a2a35';   // 暗色网格线
const TEXT_COLOR = '#64748b';   // slate-500，坐标轴标签

const BASE_OPTION = {
  color: ['#f97316', '#3b82f6', '#10b981', '#a855f7', '#eab308', '#ef4444', '#06b6d4', '#ec4899'],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter, PingFang SC, sans-serif',
    color: '#e2e8f0'
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
    axisLine: { lineStyle: { color: '#2a2a35' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#64748b',
      fontSize: 10,
      fontFamily: 'Inter'
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#64748b',
      fontSize: 10,
      fontFamily: 'Inter'
    },
    splitLine: {
      lineStyle: {
        color: '#2a2a35',
        type: 'solid'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1e1e2d',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textStyle: {
      fontFamily: 'Inter',
      color: '#ffffff',
      fontSize: 12
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#ffffff',
        width: 1
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Inter',
      color: '#64748b',
      fontSize: 10
    },
    itemGap: 16,
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8
  }
};
```

### 各图表类型默认 series 样式

**line / area（折线图 / 面积图）**
```js
{
  type: 'line',
  smooth: true,
  lineStyle: { width: 4, color: '#f97316' },
  symbol: 'circle',
  symbolSize: 10,
  itemStyle: {
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  areaStyle: {
    color: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0.05, color: 'rgba(249, 115, 22, 0.5)' },
        { offset: 0.95, color: 'rgba(249, 115, 22, 0.05)' }
      ]
    }
  }
}
```

**radar（雷达图）**
```js
{
  type: 'radar',
  areaStyle: { color: 'rgba(249, 115, 22, 0.6)' },
  lineStyle: { color: '#f97316' },
  splitArea: {
    areaStyle: { color: ['#16161e', '#1f1f2a'] }
  },
  axisLine: { lineStyle: { color: '#2a2a35' } },
  splitLine: { lineStyle: { color: '#2a2a35' } },
  axisName: { color: '#64748b', fontSize: 10 }
}
```

**pie / gauge（饼图 / 仪表盘）**
```js
// 半环仪表盘
{
  type: 'pie',
  radius: ['65%', '85%'],
  startAngle: 180,
  endAngle: 0,
  itemStyle: { borderWidth: 0 },
  label: { show: false },
  data: [
    { value: 75, itemStyle: { color: '#f97316' } },
    { value: 25, itemStyle: { color: '#252532' } }
  ]
}

// 标准环形图
{
  type: 'pie',
  radius: ['45%', '60%'],
  padAngle: 2,
  itemStyle: { borderWidth: 0 },
  label: { show: false }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 10,
  itemStyle: {
    borderWidth: 2,
    borderColor: '#ffffff'
  }
}
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 外层容器 | `glass-card p-6` | 暗色玻璃卡片 |
| 图表高度 (主图) | `h-[460px]` | 含内边距 |
| 图表高度 (辅图) | `h-[230px]` / `min-h-[300px]` | 次要图表 |

---

## 4. 字体排版 (Typography)

### 字体族

| 用途 | 字体 | 声明 |
|------|------|------|
| **正文 / UI** | Inter, PingFang SC, sans-serif | `font-family: 'Inter', 'PingFang SC', sans-serif` |
| **数据 / 编号** | Orbitron, sans-serif | `.tech-font { font-family: 'Orbitron', sans-serif }` |

### 文字层级

| 层级 | 类名 | 字号 | 字重 | 颜色 | 附加 |
|------|------|------|------|------|------|
| **Hero 数值** | `text-5xl font-bold tech-font tracking-tighter` | 3rem | 700 | `#e2e8f0` | Orbitron |
| **仪表盘大字** | `text-4xl font-bold tech-font` | 2.25rem | 700 | `#ffffff` | drop-shadow |
| **卡片标题** | `text-xl font-bold tech-font tracking-tight` | 1.25rem | 700 | `#e2e8f0` | Orbitron |
| **指标数值** | `text-lg font-bold tracking-tight tech-font` | 1.125rem | 700 | `#e2e8f0` | Orbitron |
| **Section 标题** | `text-xs font-bold tracking-wide text-slate-300 uppercase` | 0.75rem | 700 | `#cbd5e1` | 全大写 |
| **正文/列表** | `text-sm font-bold text-slate-300` | 0.875rem | 700 | `#cbd5e1` | -- |
| **标签 (Label)** | `text-[10px] text-slate-500 uppercase tracking-widest` | 10px | 500 | `#64748b` | 全大写超宽字距 |
| **微标签** | `text-[9px] uppercase tracking-wider text-slate-500 font-medium` | 9px | 500 | `#64748b` | 全大写 |
| **图表轴标签** | `text-[11px] text-slate-500 font-medium` | 11px | 500 | `#64748b` | -- |
| **Footer** | `text-[10px] text-slate-500 uppercase tracking-widest` | 10px | 400-700 | `#64748b` | 全大写 |

---

## 5. 页面结构 (Page Structure)

```
+---------------------------------------------------------------+
|  12-column grid, max-w-[1600px], mx-auto, p-6, gap-6         |
|                                                                |
|  +------ col-span-8 (lg) ------+  +--- col-span-4 (lg) ---+  |
|  |                              |  |                        |  |
|  |  [主图表卡片 — 460px高]       |  |  [特征卡片 — 纵向]      |  |
|  |  左1/4信息面板 + 右3/4图表区   |  |  标题 + 标签徽章         |  |
|  |                              |  |  展示面板 (深色嵌套)      |  |
|  +------------------------------+  |  互动按钮区域            |  |
|                                    |  半环仪表盘              |  |
|  +--- col-1/2 ---+ +- col-1/2 -+  |  底部统计条              |  |
|  |                | |           |  +-------------------------+  |
|  | [指标详情卡片]  | | [雷达图]  |                               |
|  | 2x2网格指标    | |  230px高  |  +--- col-span-4 (lg) ---+    |
|  | 底部操作栏     | |           |  |  [日志/操作列表卡片]     |    |
|  +----------------+ +-----------+  +-------------------------+  |
|                                                                |
|  +------------------- col-span-12 --------------------------+  |
|  |  [Footer 状态栏] — 状态灯 + 延迟 + 节点状态 + 编号        |  |
|  +-----------------------------------------------------------+  |
+---------------------------------------------------------------+
```

### 栅格系统

- 主栅格: `grid grid-cols-12 gap-6`
- 左栏: `col-span-12 lg:col-span-8`
- 右栏: `col-span-12 lg:col-span-4`
- 底部双卡: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Footer: `col-span-12`

---

## 6. 视觉风格 (Visual Style)

### 间距系统

| 用途 | 值 | Tailwind |
|------|-----|----------|
| 页面内边距 | 24px | `p-6` |
| 卡片间距 | 24px | `gap-6` |
| 卡片内边距 | 24px | `p-6` |
| Section 标题下方 | 16px | `mb-4` |
| 标题区下方 | 24px | `mb-6` |
| 指标行间距 | 20px | `mb-5` |
| 图标与文字间距 | 16px | `gap-4` |
| 网格指标间距 | 32px x 24px | `gap-x-8 gap-y-6` |
| 列表项间距 | 16px | `space-y-4` |

### 圆角体系

| 元素 | 圆角值 | Tailwind |
|------|--------|----------|
| 卡片 (glass-card) | 12px | `rounded-xl` (自定义 CSS 12px) |
| 内嵌面板 | 12px | `rounded-xl` |
| 图标容器 | 8px | `rounded-lg` |
| 按钮 (pill) | 9999px | `rounded-full` |
| 列表悬停项 | 8px | `rounded-lg` |
| Tooltip | 8px | borderRadius: '8px' |
| 滚动条 | 10px | `border-radius: 10px` |
| 状态指示灯 | 9999px | `rounded-full` |

### 阴影

| 元素 | 阴影 |
|------|------|
| 橙色辉光卡片 | `0 0 15px rgba(249, 115, 22, 0.2)` |
| 电源按钮 | `shadow-lg` + hover: `shadow-orange-500/30` |
| 状态灯 (橙) | `0 0 8px rgba(249, 115, 22, 0.4)` |
| 状态灯 (绿) | `0 0 8px rgba(16, 185, 129, 0.5)` |
| 大数字 | `drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))` |

---

## 7. 组件规范 (Component Specs)

### Glass Card (基础卡片)

```css
.glass-card {
  background: #16161e;
  border: 1px solid #2a2a35;
  border-radius: 12px;
}
/* Tailwind: bg-[#16161e] border border-[#2a2a35] rounded-xl p-6 */
```

### Section Header (段落标题)

```
标题: text-xs font-bold tracking-wide text-slate-300 uppercase
副标题: text-[9px] text-slate-500 uppercase tracking-widest
间距: mb-4
```

### Metric Row (指标行)

```
布局: flex items-center gap-4 mb-5
图标容器: w-10 h-10 rounded-lg flex items-center justify-center, 背景为 accent 色 + bg-opacity-10
标签: text-[9px] uppercase tracking-wider text-slate-500 font-medium
数值: text-lg font-bold tracking-tight tech-font, color: #e2e8f0
```

### 指标网格 (Metric Grid)

```
布局: grid grid-cols-2 gap-x-8 gap-y-6
标签: text-[10px] text-slate-500 mb-1 uppercase tracking-wider
内容: text-sm font-bold text-slate-300
图标: text-[10px], 颜色按语义 (orange/blue/emerald)
```

### 标签徽章 (Tag Badge)

```
text-[10px] px-2 py-0.5 border border-orange-500/50 text-orange-500 rounded
uppercase tracking-widest font-bold
```

### 按钮 — Pill 样式

```
text-[10px] text-slate-300
bg-[#252530] px-3 py-1.5 rounded-full
hover:bg-[#303040] transition-colors
border border-transparent hover:border-[#3b3b4a]
```

### 按钮 — 圆形电源按钮

```
w-12 h-12 rounded-full
bg-[#252532] border border-[#303045]
flex items-center justify-center
text-orange-500 shadow-lg
hover:shadow-orange-500/30 transition-all active:scale-95
/* 脉冲光环 */
内嵌 div: absolute inset-0 rounded-full bg-orange-500/5 animate-ping
```

### 列表项 (List Item)

```
flex justify-between items-center
p-3 rounded-lg
hover:bg-[#1f1f2a] transition-colors
border border-transparent hover:border-[#2a2a35]
cursor-pointer
文字: text-xs text-slate-400 font-medium
图标: text-sm, 默认 opacity-60, hover 时 opacity-100
```

### 内嵌展示面板

```
bg-[#1f1f2a] rounded-xl border border-[#2a2a35]
flex flex-col items-center justify-center
overflow-hidden, relative
可选: 碳纤维纹理背景 opacity-10
侧边装饰线: absolute w-0.5 bg-orange-500/20
```

### 分割线

```
border-t border-[#2a2a35]
上方间距: mt-8, 下方间距: pt-5 或 pt-6
```

### 状态指示灯

```
w-2 h-2 rounded-full
颜色: bg-emerald-500 (正常) / bg-orange-500 (活跃)
发光: shadow-[0_0_8px_rgba(16,185,129,0.5)]
```

### Footer 状态栏

```
col-span-12 flex justify-between items-center
px-4 py-5 border-t border-[#2a2a35] mt-8
bg-[#0d0d12]/50 backdrop-blur-sm rounded-lg
左侧: flex items-center gap-6, 状态灯 + 文本
右侧: tech-font font-bold uppercase tracking-widest
文字: text-[10px] text-slate-500/600 uppercase tracking-widest
分隔: <span className="opacity-20">|</span>
```

### 自定义滚动条

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0d0d12; }
::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 10px; }
```

---

## 8. 响应式断点 (Responsive Breakpoints)

| 断点 | 行为 |
|------|------|
| **默认 (mobile)** | 所有列 `col-span-12`; 底部双卡 `grid-cols-1` |
| **md (768px)** | 底部双卡 `grid-cols-2` |
| **lg (1024px)** | 左栏 `col-span-8`, 右栏 `col-span-4` |
| **容器最大宽度** | `max-w-[1600px] mx-auto` |

---

## 9. 风格建议 (Style Recommendations)

1. **坚持克制的橙色点缀原则** — 橙色 (`#f97316`) 仅用于核心数据强调、活跃指示器和交互焦点，大面积区域保持深色调，通过发光效果 (`glow-orange`, `shadow-orange-500/30`) 传递能量感而非铺满色块。

2. **使用全大写微型标签建立层级节奏** — 所有辅助标签统一采用 `uppercase tracking-widest text-[10px] text-slate-500` 的排版模式，配合 Orbitron 字体的大数值形成强烈的大小对比，增强数据仪表盘的精密感与可读性。

3. **保持深空色彩的层次递进** — 背景 (`#0d0d12`) -> 卡片 (`#16161e`) -> 内嵌面板 (`#1f1f2a`) -> 按钮 (`#252530`) 形成四级深度，每一级仅微增亮度，确保界面在纯黑基调上拥有清晰的空间层次而不破坏沉浸感。
