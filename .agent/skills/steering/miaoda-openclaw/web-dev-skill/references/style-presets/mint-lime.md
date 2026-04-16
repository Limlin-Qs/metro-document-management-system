# Mint Lime · 薄荷荧光 UI 风格模板

---

## 1. 设计语言 (Design Language)

| 维度 | 描述 |
|------|------|
| **美学方向** | 杂志编辑式排版（Editorial Layout），超大圆角卡片 + 荧光色点缀，留白充裕的印刷感布局 |
| **视觉签名** | 米灰底色 + 薄荷青主卡片 + 荧光黄绿徽章（neon-lime），2rem 超大圆角贯穿全局 |
| **情绪基调** | 沉稳专业又不失活力，高端商业报告质感，数据呈现清晰而克制 |

---

## 2. 配色方案 (Color Scheme)

### 核心 7 色角色系统

| 角色 | 色值 | Tailwind 类 | 用途 |
|------|------|-------------|------|
| **bg** (页面底色) | `#f0f2f1` | `bg-[#f0f2f1]` | 全局页面背景 |
| **surface** (卡片面) | `#ffffff` | `bg-white` | 白色内容卡片 |
| **header** (主卡片) | `#d6e9e9` | `card-teal` (自定义) | 数据总览等重点区块背景 |
| **text** (主文字) | `#1a1a1a` | `text-[#1a1a1a]` | 标题与关键数值 |
| **textMuted** (辅助文字) | `#94a3b8` / `#64748b` | `text-slate-400` / `text-slate-500` | 描述文案、次要标签 |
| **accent** (强调色) | `#e2f163` | `bg-neon-lime` (自定义) | 荧光徽章、增长标记、峰值标签 |
| **border** (边框) | `#f1f5f9` | `border-slate-100` | 卡片描边 |

### 辅助色板（图表 & 状态）

| 色名 | 色值 | 用途 |
|------|------|------|
| Emerald | `#34d399` / `#10b981` | 正向指标、进度条段 |
| Indigo | `#818cf8` / `#6366f1` | 图表主色、CTA 深色卡片 `bg-indigo-600` |
| Cyan | `#22d3ee` | 进度条段、信息标注 |
| Rose | `#fb7185` / `#ec4899` | 警示指标、雷达图 |
| Amber | `#f59e0b` | 趋势线条 |
| Blue | `#3b82f6` | 柱状图填充 |
| Slate | `#94a3b8` / `#e2e8f0` | 辅助柱、进度条末段 |

### 自定义 CSS 变量（写在 `<style>` 中）

```css
.card-teal { background-color: #d6e9e9; }
.bg-neon-lime { background-color: #e2f163; }
.text-neon-lime { color: #e2f163; }
.rounded-report { border-radius: 2rem; }
```

---

## 3. ECharts 主题样式 (Chart Theme)

### 配色序列

```js
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];
//               靛蓝       翠绿       琥珀       蓝         粉红       紫
```

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #6366f1 | 靛蓝（主色） |
| 2 | #10b981 | 翠绿 |
| 3 | #f59e0b | 琥珀 |
| 4 | #3b82f6 | 蓝 |
| 5 | #ec4899 | 粉红 |
| 6 | #8b5cf6 | 紫 |

### ECharts 全局 BASE_OPTION

```js
const PRIMARY = '#6366f1';
const GRID_COLOR = 'rgba(0,0,0,0.05)';  // 极浅网格线
const TEXT_COLOR = '#94a3b8';            // slate-400，坐标轴标签

const BASE_OPTION = {
  color: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter, sans-serif',
    color: '#64748b'
  },
  grid: {
    containLabel: true,
    left: 24,
    right: 24,
    top: 40,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      fontFamily: 'Inter'
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0.05)',
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      fontFamily: 'Inter'
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0.05)',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 8,
    padding: 12,
    shadowBlur: 6,
    shadowOffsetY: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: {
      fontFamily: 'Inter',
      color: '#1a1a1a',
      fontSize: 12
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.02)'
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Inter',
      color: '#64748b',
      fontSize: 12
    },
    itemGap: 16,
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

**bar（柱状图）**
```js
// 竖向柱状图
{
  type: 'bar',
  barWidth: 40,
  itemStyle: {
    borderRadius: [4, 4, 0, 0]
  }
}

// 横向柱状图
{
  type: 'bar',
  barWidth: 20,
  itemStyle: {
    borderRadius: [0, 4, 4, 0]
  }
}
```

**line（折线图 / 面积图）**
```js
{
  type: 'line',
  smooth: true,
  lineStyle: { width: 2 },
  symbol: 'circle',
  symbolSize: 6,
  areaStyle: {
    color: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(99, 102, 241, 0.1)' },
        { offset: 1, color: 'rgba(99, 102, 241, 0)' }
      ]
    }
  }
}
```

**pie（饼图/环形图）**
```js
{
  type: 'pie',
  radius: ['45%', '60%'],
  padAngle: 2,
  itemStyle: { borderWidth: 0, borderRadius: 4 },
  label: { show: false }
}
```

**radar（雷达图）**
```js
{
  type: 'radar',
  splitArea: {
    areaStyle: { color: ['rgba(241,245,249,0.5)', 'transparent'] }
  },
  axisLine: { lineStyle: { color: '#e2e8f0' } },
  splitLine: { lineStyle: { color: '#e2e8f0' } }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 10,
  itemStyle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowBlur: 4,
    shadowColor: 'rgba(0, 0, 0, 0.08)'
  }
}
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器背景 | `bg-white` | 白色卡片 |
| 圆角 | `rounded-2xl` (16px) | 标准圆角 |
| 边框 | `border border-slate-100` | 1px 浅灰边框 |
| 阴影 | `shadow-sm` | 轻微浮层 |
| 内边距 | `p-6`（24px） | 统一内边距 |
| 标题 | `text-lg font-semibold text-slate-800 mb-6` | 标准图表标题 |
| 图表高度 | `h-80`（320px） / `h-64`（256px） | 按内容密度选用 |

### 分段进度条（横向比例条）

```
容器: flex h-1.5 w-full rounded-full overflow-hidden
段色序列: bg-emerald-400 → bg-indigo-400 → bg-cyan-400 → bg-rose-400 → bg-slate-200
```

---

## 4. 字体排版 (Typography)

### 字体栈

| 用途 | 字体 |
|------|------|
| 全局 | `'Inter', sans-serif` (Google Fonts, wght 300-700) |

### 文字层级

| 层级 | 类名 | 字号 | 字重 | 颜色 | 用途 |
|------|------|------|------|------|------|
| H1 超大标题 | `text-6xl font-bold tracking-tight leading-tight` | 60px | 700 | `#1a1a1a` | 页面主标题 |
| H2 区块标题 | `text-2xl font-bold` | 24px | 700 | `#1a1a1a` | 卡片标题 |
| H3 小标题 | `text-xl font-bold` | 20px | 700 | `#1a1a1a` / `text-slate-800` | 卡片子标题 |
| H4 段落标题 | `text-lg font-semibold text-slate-800` | 18px | 600 | `#1e293b` | 图表标题 |
| 巨型数值 | `text-6xl font-bold tracking-tighter` | 60px | 700 | `#1a1a1a` | KPI 数值展示 |
| 中数值 | `text-2xl font-bold` | 24px | 700 | `#1a1a1a` | 指标数值 |
| 正文粗体 | `text-sm font-bold text-slate-700` | 14px | 700 | `#334155` | 列表要点 |
| 正文 | `text-sm font-medium` | 14px | 500 | `#1e293b` | 渠道行文字 |
| 辅助说明 | `text-sm text-slate-500 leading-relaxed` | 14px | 400 | `#64748b` | 描述段落 |
| 标签/描述 | `text-xs text-slate-500 uppercase tracking-wider` | 12px | 500 | `#64748b` | 指标标签 |
| 微型标签 | `text-[10px] font-black` | 10px | 900 | `#1a1a1a` | 荧光徽章文字 |

---

## 5. 页面结构 (Page Structure)

从上到下的布局层次：

```
min-h-screen bg-[#f0f2f1]
└── main.p-10.max-w-[1400px].mx-auto
    │
    ├── [顶部标题区] flex justify-between items-start mb-12
    │   ├── 左: 超大标题 (text-6xl, 最大 max-w-xl)
    │   └── 右: 操作按钮 + 摘要文字 (flex-col items-end)
    │
    ├── [核心数据栅格] grid grid-cols-12 gap-6
    │   ├── 左 (col-span-7): 主总览卡片 (card-teal, rounded-report, p-10, min-h-[500px])
    │   │   ├── 顶部: 标题 + 荧光徽章
    │   │   ├── 中部: 面积图 + 柱状图 (flex-1, ComposedChart)
    │   │   └── 底部: 3列指标行 (grid-cols-3, border-t)
    │   │
    │   └── 右 (col-span-5): 2x2 小卡片栅格 (grid-cols-2 gap-6)
    │       ├── KPI 卡片 x2 (bg-white, rounded-report, p-8)
    │       └── 横跨卡片 (col-span-2): 流量渠道分布 + 分段进度条
    │
    └── [底部月份趋势条] mt-6 bg-white rounded-report p-8 grid-cols-6
```

---

## 6. 视觉风格 (Visual Style)

### 间距系统

| 层级 | Tailwind 类 | 值 | 用途 |
|------|-------------|-----|------|
| 页面内边距 | `p-10` | 40px | 主容器 padding |
| 区块间距 | `mb-12` | 48px | 标题区到内容区 |
| 卡片间距 | `gap-6` | 24px | 栅格 gap |
| 卡片内边距 (大) | `p-10` | 40px | 主卡片 |
| 卡片内边距 (标准) | `p-8` | 32px | 白色卡片 |
| 卡片内边距 (紧凑) | `p-6` | 24px | 图表卡片 |
| 元素间距 | `gap-3` / `mb-6` | 12px / 24px | 行内元素 / 标题到内容 |
| 列表间距 | `space-y-4` | 16px | 渠道行、洞察列表 |

### 圆角系统

| 类型 | Tailwind 类 | 值 |
|------|-------------|-----|
| 页面主卡片 | `rounded-report` (自定义) | `2rem` (32px) |
| 标准卡片 | `rounded-2xl` | 16px |
| 按钮 | `rounded-2xl` | 16px |
| 徽章/标签 | `rounded-full` | 9999px |
| 图表柱顶 | `radius={[4, 4, 0, 0]}` | 4px |

### 阴影系统

| 类型 | Tailwind 类 | 用途 |
|------|-------------|------|
| 标准卡片 | `shadow-sm` | 白色卡片默认态 |
| 悬停态 | `hover:shadow-md` | 概览小卡片悬停 |
| 荧光徽章 | `shadow-sm` | 微妙的徽章立体感 |
| 深色 CTA 卡片 | `shadow-xl` | 深色背景建议卡片 |

### 边框

| 类型 | 值 |
|------|-----|
| 卡片默认边框 | `border border-slate-100` (#f1f5f9) |
| 卡片悬停边框 | `hover:border-slate-300` (#cbd5e1) |
| 内部分割线 | `border-t border-black/5` (5% 黑色透明度) |
| 表格行分割 | `divide-y divide-slate-100` |
| 表头底线 | `border-b border-slate-50` |

---

## 7. 组件规范 (Component Specs)

### 按钮

| 类型 | 样式 |
|------|------|
| 主按钮 (图标) | `w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-transform` |
| 次按钮 (图标) | `w-12 h-12 bg-white border border-slate-200 text-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors` |

### KPI 卡片

```
容器: bg-white rounded-report p-8 border border-slate-100
     flex flex-col justify-between
     relative group hover:border-slate-300 transition-colors
标题: text-xl font-bold
副标题: text-slate-400 text-sm mt-1
数值: text-6xl font-bold tracking-tighter (mt-12)
徽章: bg-neon-lime px-2 py-0.5 rounded-full text-[10px] font-black
角标图标: absolute top-8 right-8 text-slate-300 (Plus icon)
```

### 主总览卡片

```
容器: card-teal rounded-report p-10 flex flex-col min-h-[500px] relative
标题行: flex justify-between items-start mb-8
徽章: bg-neon-lime px-3 py-1 rounded-full text-sm font-bold shadow-sm
底部指标: grid grid-cols-3 mt-10 border-t border-black/5 pt-8
指标标签: text-slate-500 text-sm mb-1 uppercase tracking-tighter
指标数值: text-2xl font-bold
```

### 信息卡片（白底标准）

```
容器: bg-white p-6 rounded-2xl shadow-sm border border-slate-100
标题: text-lg font-semibold text-slate-800 mb-4 (带图标 flex items-center gap-2)
```

### 深色 CTA 卡片

```
容器: bg-indigo-600 p-6 rounded-2xl shadow-xl border border-indigo-700 text-white
子项: bg-white/10 p-4 rounded-xl border border-white/10
子项标题: text-sm font-bold (白色)
子项描述: text-xs text-indigo-100
```

### 数据表格

```
容器: bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden
表头: bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider
单元格: px-6 py-4
行悬停: hover:bg-slate-50 transition-colors
行分割: divide-y divide-slate-100
```

### 状态徽章

```
正向(高): bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold
中性(中): bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold
默认(低): bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-bold
荧光强调: bg-neon-lime px-3 py-1 rounded-full text-sm font-bold shadow-sm
```

### 概览小卡片（OverviewCards 组件）

```
容器: bg-white p-4 rounded-xl shadow-sm border border-slate-100
     flex flex-col items-start hover:shadow-md transition-shadow
图标底色: {color}-100 p-2 rounded-lg mb-3
图标色: {color}-600 w-5 h-5
标签: text-slate-500 text-xs font-medium uppercase tracking-wider
数值: text-xl font-bold text-slate-800 mt-1
```

### 渠道分布行

```
行容器: flex items-center text-sm font-medium group cursor-default
色点: w-2 h-2 rounded-full
渠道名: text-slate-800 (w-40)
主数值: flex-1 text-slate-800 font-bold
辅助数值: w-20 text-slate-300 text-right
强调数值: w-20 text-slate-800 font-bold text-right
```

---

## 8. 响应式断点 (Responsive Breakpoints)

| 断点 | Tailwind 前缀 | 适用场景 |
|------|---------------|----------|
| 默认 (< 768px) | 无 | 单列堆叠：col-span-12, grid-cols-1 |
| md (>= 768px) | `md:` | 概览卡片 3 列 `md:grid-cols-3`，洞察 2 列 `md:grid-cols-2`，图表 3 列 `md:grid-cols-3` |
| lg (>= 1024px) | `lg:` | 主栅格 7/5 分割 `lg:col-span-7` + `lg:col-span-5`，概览 6 列 `lg:grid-cols-6`，图表 2 列 `lg:grid-cols-2` |

### 最大宽度

```
主容器: max-w-[1400px] mx-auto
标题最大宽度: max-w-xl (左侧标题区)
摘要最大宽度: max-w-xs (右侧摘要区)
```

---

## 9. 风格建议 (Style Recommendations)

1. **保持"编辑式"留白节奏**：页面级 `p-10`、区块级 `gap-6`、卡片内 `p-8` / `p-10` 的三级间距层次是本风格的核心呼吸感，新增模块应遵循相同的间距递进，避免视觉拥挤。

2. **荧光色 `#e2f163` 仅用于数值亮点标注**：该色作为画龙点睛使用（增长徽章、峰值标签），每屏出现不超过 2-3 处，保持其稀缺性以维持视觉冲击力。

3. **大圆角 `2rem` 与标准圆角 `rounded-2xl` 应分层使用**：页面级主卡片使用 `rounded-report`（32px），内部子卡片使用 `rounded-2xl`（16px），徽章使用 `rounded-full`，三级圆角体系形成清晰的层次关系。
