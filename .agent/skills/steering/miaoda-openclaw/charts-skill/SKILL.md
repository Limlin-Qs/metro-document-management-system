---
name: charts-skill
description: "ReactECharts 图表开发规范。Use when creating or modifying charts/visualizations with ECharts. Covers 18 chart types (Line, Bar, Pie, Radar, Scatter, Heatmap, Sankey, Map, WordCloud, etc.) with strict constraints. 触发词：图表, chart, ECharts, 可视化, 饼图, 柱状图, 折线图, 数据图表, visualization, 甘特图, 词云, 热力图, 数据展示"
available-agents:
  - DesignLite
---

## L0 基础配置

- **库**: `import ReactECharts from 'echarts-for-react'` (v5.6.0)
- **主题**: `theme="ud"`
- **颜色**: 🚨 只能用 hex（如 `#1890ff`），禁止 hsl/rgb
- **高度**: ≥300px (`className='h-[300px]'`)
- **必须配置**: tooltip.trigger + legend + grid.containLabel（坐标系图表）

### TypeScript 类型定义

编写 ECharts option 时，**必须**为 option 对象补充 `EChartsOption` 类型定义，确保类型安全：

```tsx
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

const option: EChartsOption = {
  tooltip: { trigger: 'axis' },
  legend: { bottom: 0 },
  grid: { left: '3%', right: '4%', bottom: '20%', containLabel: true },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [120, 200, 150] }],
};

<ReactECharts option={option} theme="ud" className="h-[300px]" />;
```

**关键点：** 从 `echarts` 导入 `EChartsOption` 类型（使用 `import type`），为 option 变量显式标注类型。复杂场景可按需使用更精确的子类型（如 `LineSeriesOption`、`BarSeriesOption`）。

### 渐变色用法

需要额外导入并注册 GraphicComponent：

```tsx
import * as echarts from 'echarts/core';
import { GraphicComponent } from 'echarts/components';
echarts.use([GraphicComponent]);

// 线性渐变 (x, y, x2, y2, colorStops)
new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#fff' },
  { offset: 1, color: '#000' }
])

// 径向渐变 (cx, cy, r, colorStops)
new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [...colorStops])
```

### 甘特图用法

🚫 禁止用堆叠柱状图模拟甘特图，必须使用 custom 系列：

```tsx
const timelineData = [
  { name: '设计阶段', start: '2024-11-20', end: '2024-11-30', days: 10 },
  { name: '开发阶段', start: '2024-12-01', end: '2024-12-30', days: 30 },
];

const option: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const item = timelineData[params.dataIndex];
      return `${item.name}<br/>${item.start} 至 ${item.end}<br/>共 ${item.days} 天`;
    },
  },
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  xAxis: {
    type: 'time',
    min: new Date('2024-11-15').getTime(),
    max: new Date('2025-01-31').getTime(),
  },
  yAxis: {
    type: 'category',
    data: timelineData.map((item) => item.name),
  },
  series: [{
    type: 'custom',
    renderItem: (params, api) => {
      const categoryIndex = api.value(0);
      const start = api.coord([api.value(1), categoryIndex]);
      const end = api.coord([api.value(2), categoryIndex]);
      const height = api.size([0, 1])[1] * 0.5;
      return {
        type: 'rect',
        shape: { x: start[0], y: start[1] - height / 2, width: end[0] - start[0], height },
        style: { fill: ['#3370eb', '#1bcebf', '#ffc60a'][categoryIndex], radius: 4 },
      };
    },
    encode: { x: [1, 2], y: 0 },
    data: timelineData.map((item, i) => [i, new Date(item.start).getTime(), new Date(item.end).getTime()]),
  }],
};
```

**关键点：** xAxis 用 `type: 'time'`，yAxis 用 `type: 'category'`，通过 `api.coord()` 计算坐标。

### markPoint 最佳实践

🚫 避免语义重复或位置重叠的 markPoint：

```tsx
// ❌ 错误：双十一和 max 指向同一个 x 轴位置
markPoint: {
  data: [
    { type: 'max', name: '最大值' },
    { name: '双十一', coord: ['2024-11-11', 1000] }  // 恰好也是最大值
  ]
}

// ✅ 正确：只保留业务语义更强的标注
markPoint: {
  data: [
    { name: '双十一', coord: ['2024-11-11', 1000] }  // 业务含义优先于统计含义
  ]
}
```

**原则：** 当 max/min 与业务事件（如促销日）重合时，只保留业务标注。

### 双 Y 轴组合图零点对齐

🚫 双 Y 轴（正负值混合）时，左右零点必须对齐：

```tsx
// ❌ 错误：左轴 [0, 100]，右轴 [-50, 50]，零点不对齐
yAxis: [
  { type: 'value' },
  { type: 'value' }
]

// ✅ 正确：手动计算 min/max 确保零点对齐
const leftMax = 100, rightMax = 50, rightMin = -50;
const leftMin = (rightMin / rightMax) * leftMax;  // -100

yAxis: [
  { type: 'value', min: leftMin, max: leftMax },
  { type: 'value', min: rightMin, max: rightMax }
]
```

**原则：** 两轴的 `|min| / max` 比例必须相同，零点才能对齐。

### 词云用法

WordCloud 非 ECharts 内置图表，系列类型为 `type: 'wordCloud'`。

⚠️ 使用前必须通过**依赖安装工具**安装 `echarts-wordcloud`。

安装后在组件顶部引入（无需解构，导入即注册）：

```tsx
import 'echarts-wordcloud';

// 系列配置
series: [{ type: 'wordCloud', data: [...] }]
```

---

## L1 支持的图表类型

**允许使用的 18 种图表：**

| 类型 | 图表 | 关键约束 |
| ---- | ---- | -------- |
| 趋势 | Line, Area, ThemeRiver | Line ≤5 系列 |
| 比较 | Bar, Radar, Parallel | Radar ≤8 维度且禁止设各 indicator 项的 max，Bar 必须 boundaryGap: true |
| 占比 | Pie, Treemap, Sunburst | Pie ≤5 类别，禁止 itemStyle，🚨 必须隐藏 label（按 L2 CRITICAL #13 规则） |
| 分布 | Scatter, Heatmap, Boxplot | Scatter symbolSize ≤20，Heatmap 必须配 visualMap 且 grid.bottom ≥ '20%'（见 L2 CRITICAL #16） |
| 关系 | Graph, Tree, Sankey | - |
| 转化 | Funnel | label 必须显示且 `position: 'inside'`，禁止设 color |
| 金融 | Candlestick | - |
| 词云 | WordCloud | 非内置，需安装 echarts-wordcloud，安装后必须在组件顶部 `import 'echarts-wordcloud'`，见 L0 词云用法 |

**未列出的图表类型不要使用。**

---

## L2 禁止事项

> ⚠️ **违反将导致图表异常**

### 🚨 FATAL

- **颜色格式** - 只能用 hex，禁止 hsl/hsla/rgb/rgba（hover 透明度计算异常）

### 🔴 CRITICAL

> 生成代码后须逐条核对，每一条都不可跳过。

| # | 禁止 | 应该 |
|---|------|------|
| 1 | 饼图超过 5 个类别 | 改用横向柱状图 |
| 2 | 折线图超过 5 个系列 | 拆分图表或添加筛选 |
| 3 | Radar 的 indicator 各项设置 max 字段 | 禁止在 `radar.indicator` 数组的每一项中设置 `max`，让 ECharts 自动计算各维度范围 |
| 4 | Radar 多系列使用不同量纲 | 先归一化到相同量纲 |
| 5 | Bar 的 xAxis 不设 boundaryGap | 必须 `boundaryGap: true` |
| 6 | Funnel 隐藏 label 或 label 使用非 inside 位置 | 必须 `label: { show: true, position: 'inside' }`，禁止设 color |
| 7 | 图表高度小于 300px | 最小 `className='h-[300px]'` |
| 8 | 单图使用超过 8 种颜色 | 分组或聚合数据 |
| 9 | 饼图添加 itemStyle.border | 移除 itemStyle 配置 |
| 10 | 折线图连接时间无序的数据点 | 改用 Bar 或 Scatter |
| 11 | Scatter 的 symbolSize 超过 20 | 控制在 20 以内防止溢出 |
| 12 | 图表宽高超出容器导致溢出 | 使用相对单位或 `w-full`，禁止固定像素宽度 |
| 13 | 饼图（`type: 'pie'`）使用 label | 🚨 饼图必须同时关闭两处：`label: { show: false }` + `emphasis: { label: { show: false } }`，改用 tooltip |
| 14 | label 中设置 `color` 属性 | 🚨 所有 series 的 `label` 中禁止声明 `color`（如 `label: { color: '#333' }` ），颜色由主题自动控制 |
| 15 | label.formatter 使用字符串模板 | 禁止 `formatter: '{b}: {c}'` 等模板写法（`{a}/{b}/{c}/{d}` 易拼错），如需格式化请用回调函数 `formatter: (params) => ...` |
| 16 | legend 或 visualMap 与图表绘图区域重叠 | 有 legend 或 visualMap 时统一放底部：`legend: { type: 'scroll', bottom: 0 }`，`visualMap` 设 `orient: 'horizontal', left: 'center', bottom: 0`。坐标系图表（Bar/Line/Scatter/Heatmap 等）设 `grid.bottom` 至少 `'20%'`，x 轴标签较长或旋转时酌情增大；非坐标系图表（Pie/Radar 等）减小 `center` 纵向值上移避让（如 `['50%', '45%']`，不够则继续减小）。🚨 **Heatmap 底部同时存在 visualMap 和 x 轴标签，grid.bottom 酌情增至 `'25%'` 以上** |
| 17 | 桑基图（Sankey）数据存在环形引用 | Sankey links 必须构成有向无环图（DAG），禁止出现 A→B→…→A 的循环链路，生成数据后须验证无环 |
| 18 | 柱状图（Bar）正负数据共存时所有柱子使用相同 borderRadius | 按数据正负动态设置：正值圆角在顶部，负值圆角在底部 |
| 19 | option 对象不写 TypeScript 类型 | 必须 `const option: EChartsOption = { ... }`，从 `echarts` 导入 `EChartsOption`（`import type`） |

### 🟡 SHOULD NOT

| 不建议 | 建议 |
|--------|------|
| Radar 超过 8 个维度 | 改用 Parallel 坐标图 |
| Heatmap 不配置 visualMap | 必须添加 visualMap |
| legend 与 title 位置重叠 | legend 放 `bottom: 0` |
| 小尺寸图表（<400px）显示 legend | 隐藏 legend |
| 用 Bar/堆叠柱状图绘制甘特图 | 使用 custom 系列，见 L0 甘特图用法 |
| 饼图/环形图 legend 放侧面 | legend 放顶部或底部，避免与图表重叠 |
