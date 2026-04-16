# Editorial Brutalism · 粗野主义 UI 风格模板

---

## 1. 设计语言 (Design Language)

- **Aesthetic Direction**: 融合杂志编辑排版(Editorial Typography)与粗野主义(Brutalism)美学,追求高对比度、大字号、强结构感的平面设计风格
- **Visual Signature**: 黑白为主的极简配色 + 超大 display 字体 + 纸质纹理噪点覆盖层 + 硬边框阴影(hard-edge shadow) + 几何放射线装饰元素
- **Emotional Tone**: 专业自信、先锋前卫、克制有力。通过严格的排版层次和留白制造强烈的视觉冲击

---

## 2. 配色方案 (Color Scheme)

采用极简黑白体系,以纸张色为基底,墨色为主色调:

| 角色 (Role)     | 变量名       | 色值            | Tailwind 类             | 用途说明                     |
|-----------------|-------------|-----------------|------------------------|------------------------------|
| 背景色 bg       | `paper`     | `#f4f3f0`       | `bg-paper`             | 页面主背景,模拟纸张质感        |
| 表面色 surface  | `neutral-200` | `#e5e5e5`     | `bg-neutral-200`       | 图片占位区域、卡片内容区域      |
| 头部色 header   | `neutral-900` | `#171717`     | `bg-neutral-900`       | 页脚背景、强调区块背景          |
| 主文字 text     | `ink`       | `#1a1a1a`       | `text-ink`             | 正文标题、主要文字              |
| 次文字 textMuted| `neutral-500` | `#737373`     | `text-neutral-500`     | 分类标签、辅助信息、时间戳       |
| 强调色 accent   | `black`     | `#000000`       | `bg-black` / `text-black` | 按钮填充、图标填充、边框        |
| 边框色 border   | `neutral-900` | `#171717`     | `border-neutral-900`   | 分割线、卡片边框、Marquee边框   |

### 补充色阶

| 用途           | 色值        | Tailwind 类          |
|----------------|-------------|---------------------|
| 弱辅助文字      | `#a3a3a3`   | `text-neutral-400`  |
| 次要正文        | `#404040`   | `text-neutral-700` / 直接 `#404040` |
| 深色区域辅助文字 | `#a3a3a3`   | `text-neutral-400`  |
| 深色区域边框    | `#262626`   | `border-neutral-800` |
| 选区高亮背景    | `#171717`   | `selection:bg-neutral-900` |
| 选区高亮文字    | `#ffffff`   | `selection:text-white` |

---

## 3. ECharts 主题样式

### 配色序列

```js
const COLORS = ['#1a1a1a', '#404040', '#737373', '#a3a3a3', '#d4d4d4'];
//               墨黑       深灰       中灰       浅灰       亮灰
```

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #1a1a1a | 墨黑 |
| 2 | #404040 | 深灰 |
| 3 | #737373 | 中灰 |
| 4 | #a3a3a3 | 浅灰 |
| 5 | #d4d4d4 | 亮灰 |

### ECharts 全局 BASE_OPTION

```js
const INK = '#1a1a1a';
const GRID_COLOR = '#e5e5e5';       // neutral-200，用于网格线
const TEXT_COLOR = '#737373';        // neutral-500，用于坐标轴标签

const BASE_OPTION = {
  color: ['#1a1a1a', '#404040', '#737373', '#a3a3a3', '#d4d4d4'],
  backgroundColor: 'transparent',    // 背景由外部容器控制
  textStyle: {
    fontFamily: 'Space Mono, Inter, monospace',
    color: '#737373'
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
    axisLine: { lineStyle: { color: '#171717' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#1a1a1a',
      fontSize: 14,
      fontFamily: 'Space Mono',
      margin: 10
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#1a1a1a',
      fontSize: 14,
      fontFamily: 'Space Mono'
    },
    splitLine: {
      lineStyle: {
        color: '#e5e5e5',
        type: 'solid'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#f4f3f0',
    borderColor: '#171717',
    borderWidth: 2,
    borderRadius: 0,
    padding: 16,
    shadowBlur: 0,
    shadowColor: 'transparent',
    textStyle: {
      fontFamily: 'Space Mono',
      color: '#1a1a1a',
      fontSize: 12
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(23, 23, 23, 0.08)'
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Space Mono',
      color: '#737373',
      fontSize: 12
    },
    formatter: (name) => name.toUpperCase(),
    itemGap: 16,
    padding: [20, 0, 0, 0],
    icon: 'rect',
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
  lineStyle: { width: 2 },
  symbol: 'circle',
  symbolSize: 8,
  areaStyle: null                     // 默认无填充，需要面积图时设为 { opacity: 0.15 }
}
```

**bar（柱状图）**
```js
{
  type: 'bar',
  barWidth: 24,
  itemStyle: {
    borderRadius: [0, 4, 4, 0]       // 右端微圆角，匹配粗野主义风格
  }
}
```

**pie（饼图/环形图）**
```js
// 环形饼图
{
  type: 'pie',
  radius: ['45%', '60%'],
  padAngle: 2,
  itemStyle: { borderWidth: 0 },
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
    color: '#f4f3f0',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Space Mono'
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
      color: ['rgba(228,228,228,0.2)', 'rgba(228,228,228,0.05)']
    }
  },
  axisLine: {
    lineStyle: { color: '#e5e5e5' }
  },
  splitLine: {
    lineStyle: { color: '#e5e5e5' }
  }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 10,
  itemStyle: {
    borderWidth: 1,
    borderColor: '#f4f3f0'
  }
}
```

**水平条形图（通过 xAxis/yAxis 翻转实现）**
```js
{
  yAxis: {
    type: 'category',
    axisLabel: { color: '#1a1a1a', fontWeight: 700, fontFamily: 'Space Mono', fontSize: 14 },
    axisLine: { show: false },
    axisTick: { show: false }
  },
  xAxis: {
    type: 'value',
    axisLabel: { show: false }
  },
  series: [{
    type: 'bar',
    barWidth: 24,
    itemStyle: { borderRadius: [0, 4, 4, 0] }
  }]
}
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器样式 | `border border-black bg-paper` | 黑色边框卡片，纸张底色 |
| 圆角 | 无圆角（默认 0） | 粗野主义硬边风格 |
| 阴影 | `shadow-[4px_4px_0px_0px_#000000]` | 硬边框偏移阴影 |
| 内边距 | `p-6` 或 `p-8` | 适当内边距 |
| 图表高度 | `h-[400px]`（大图）/ `h-80`（320px）/ `h-64`（256px 中图） | 按内容密度选用 |
| 字体 | `font-mono` | 等宽字体风格 |

---

## 4. 字体排版 (Typography)

### 字体族 (Font Families)

| 用途           | 字体族                         | Tailwind 类       |
|----------------|-------------------------------|-------------------|
| 正文/UI        | `Inter`, sans-serif           | `font-sans`       |
| 展示/标题       | `Titan One`, cursive          | `font-display`    |
| 等宽/标签/数据  | `Space Mono`, monospace       | `font-mono`       |

### 文字层级 (Text Hierarchy)

| 层级                | 字体类       | 尺寸                            | 字重      | 其他样式                                      |
|---------------------|-------------|--------------------------------|----------|----------------------------------------------|
| Hero 巨型标题        | `font-display` | `text-[23vw]` / md:`text-[14rem]` | regular | `tracking-tight`, `leading-[0.8]`            |
| 背景水印文字         | `font-display` | `text-[25vw]` ~ `text-[40vw]`   | regular | `opacity-10` / `opacity-[0.03]`, 装饰性       |
| Section 大标题 H2    | `font-display` | `text-5xl` / md:`text-8xl`       | regular | `uppercase`, `tracking-tight`, `leading-none` |
| 信息区标题 H2        | `font-display` | `text-5xl` / md:`text-7xl`       | regular | `uppercase`                                  |
| 项目标题 H3          | `font-display` | `text-5xl` / md:`text-7xl`       | regular | `uppercase`, `leading-[0.85]`                |
| 子标题 H3            | `font-display` | `text-xl` ~ `text-3xl`          | regular | `uppercase`                                  |
| 统计数值             | `font-display` | `text-3xl`                      | `font-bold` | --                                         |
| 等宽正文             | `font-mono`   | `text-sm` / md:`text-base`       | regular | `leading-relaxed`                            |
| 等宽标签/分类        | `font-mono`   | `text-[10px]` ~ `text-sm`       | regular | `uppercase`, `tracking-widest`               |
| 等宽按钮文字         | `font-mono`   | 继承                             | `font-bold` | `uppercase`, `tracking-wider`              |
| Header 标识          | `font-mono`   | `text-sm`                       | regular | `tracking-widest`, `mix-blend-difference`     |
| Marquee 文字         | `font-mono`   | `text-lg` / md:`text-xl`        | `font-bold` | `tracking-widest`                          |

---

## 5. 页面结构 (Page Structure)

从上到下的布局结构:

```
1. Fixed Header (固定右上角)
   └─ 右对齐等宽文字标识, mix-blend-difference 反色叠加, z-40

2. Hero Section (英雄区, 90vh)
   └─ 居中超大 display 字体
   └─ 左右对称放射线 SVG 装饰 (BurstLines)
   └─ 左上角名字 + 右下角年份定位
   └─ 底部滚动指示箭头

3. Marquee (滚动字幕条)
   └─ 全宽, 上下 2px 黑色边框
   └─ 水平无限循环滚动

4. Info Grid Section (信息网格)
   └─ 2列网格 (md:grid-cols-2), 超大列间距 (gap-x-24 / lg:gap-x-48)
   └─ 四象限: 教育(左上) / 经历(右上) / 工具(左下) / 技能(右下)
   └─ 每个象限标题带 Star 图标装饰

5. Marquee (重复, 带 rotate-1 微旋转, my-20)

6. Selected Works Section (作品展示)
   └─ 12列网格, 左5右7
   └─ 左侧: sticky 定位信息栏 (分类/年份/标题/描述/数据卡片/CTA)
   └─ 右侧: 图片画廊 (灰度滤镜, hover彩色)

7. Footer (页脚, 深色反转)
   └─ bg-neutral-900, 文字反转为 paper 色
   └─ 背景巨型装饰文字
   └─ CTA 按钮组 + 底部版权
```

### 最大内容宽度

- 主内容区: `max-w-7xl` (80rem / 1280px)
- 页脚内文字: `max-w-4xl` (56rem / 896px)

---

## 6. 视觉风格 (Visual Style)

### 间距系统 (Spacing)

| 场景               | 间距值                        |
|--------------------|------------------------------|
| 页面主内边距        | `px-4` / md:`px-12`          |
| Section 上下内边距  | `py-24`                      |
| Info Section 内边距 | `py-32`                      |
| 页脚上下内边距      | `py-32`                      |
| Section 标题下间距  | `mb-24`                      |
| 作品间垂直间距      | `gap-32` / md:`gap-48`       |
| 网格行间距          | `gap-y-32`                   |
| Marquee 间隔        | `my-20`                      |

### 文字与细节规范

- 全局字母间距: 标签类 `tracking-widest`, 标题类 `tracking-tight`
- 大写转换: 标签/分类/按钮一律 `uppercase`
- 下划线装饰: `decoration-2`, `underline-offset-4`
- 灰度图片: `filter grayscale contrast-125`, hover 时 `grayscale-0 scale-105`

### 圆角与阴影 (Border Radius & Shadows)

| 元素                   | 圆角                | 阴影                                    |
|------------------------|--------------------|-----------------------------------------|
| 统计数据卡片            | 无圆角 (默认 0)     | `shadow-[4px_4px_0px_0px_#000000]`      |
| 项目图片容器            | 无圆角 (默认 0)     | `shadow-[8px_8px_0px_0px_#000000]`      |
| 页脚主按钮 (浅色)       | 无圆角 (默认 0)     | `shadow-[4px_4px_0px_0px_#ffffff]`      |
| 软件工具图标            | `rounded-3xl` (1.5rem) | 无阴影                              |
| 技能列表子弹点          | `rounded-sm` + `rotate-45` | 无阴影                          |
| 图表 Bar 右端           | `radius: [0, 4, 4, 0]` | 无阴影                            |

> 硬边框阴影(Hard-Edge / Offset Shadow)是本风格的核心标识。纯色、无模糊、固定偏移。

### 边框系统

| 场景                  | 样式                                           |
|-----------------------|-----------------------------------------------|
| Section 标题底线       | `border-b-4 border-neutral-900`               |
| 作品分类/年份底线      | `border-b-2 border-black`                     |
| 图片容器边框           | `border-2 border-black`                       |
| 统计卡片边框           | `border border-black`                         |
| Marquee 上下边框       | `border-y-2 border-neutral-900`               |
| 教育/联系区分割线      | `border-t-4 border-black border-dashed`       |
| 页脚内底部分割线       | `border-t border-neutral-800`                 |
| 页脚次按钮边框         | `border-2 border-paper`                       |

### 纹理叠加层 (Noise Texture Overlay)

```css
.bg-noise {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 50;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.8' numOctaves='3'...");
}
```

- 全屏固定定位, 不响应鼠标事件
- 模拟纸张颗粒感, `opacity: 0.08`
- `baseFrequency: 0.8`, `numOctaves: 3`

---

## 7. 组件规范 (Component Specs)

### 按钮 (Buttons)

**主按钮 (浅色底, 用于深色背景)**
```
px-8 py-4 bg-paper text-ink font-bold font-mono
border-2 border-transparent
shadow-[4px_4px_0px_0px_#ffffff]
hover:scale-105 transition-transform
flex items-center justify-center gap-2
```

**次按钮 (线框, 用于深色背景)**
```
px-8 py-4 border-2 border-paper text-paper font-bold font-mono
hover:bg-paper hover:text-ink transition-colors
flex items-center justify-center gap-2
```

**文字按钮 (CTA link)**
```
font-mono font-bold uppercase tracking-wider
hover:underline decoration-2 underline-offset-4
flex items-center gap-2
```

### 统计数据卡片 (Stat Card)

```
bg-paper border border-black p-4
shadow-[4px_4px_0px_0px_#000000]
```
- 数值: `font-display text-3xl font-bold mb-1`
- 标签: `font-mono text-[10px] text-neutral-500 uppercase tracking-wider`

### 图片画廊卡片 (Image Gallery Card)

```
relative w-full border-2 border-black bg-neutral-200
shadow-[8px_8px_0px_0px_#000000]
overflow-hidden group
```
- 首图比例: `aspect-video`, 后续: `aspect-square`
- 图片: `filter grayscale contrast-125`, hover: `grayscale-0 scale-105`
- Hover 叠加标签: `bg-black text-white font-mono text-xs px-2 py-1 uppercase tracking-widest`

### 工具图标卡片 (Tool Icon)

```
w-20 h-20 / md:w-24 md:h-24
bg-black rounded-3xl
flex items-center justify-center
hover:-rotate-6 hover:scale-110 transition-transform duration-300
```
- 文字: `font-sans font-bold text-3xl / md:text-4xl text-white tracking-tighter`
- 标签: `font-mono text-[10px] uppercase tracking-widest opacity-60`

### Section 标题 (Section Header)

```
flex items-baseline gap-4 mb-24
border-b-4 border-neutral-900 pb-6
```
- 编号: `font-display text-4xl text-neutral-400`
- 标题: `font-display text-5xl / md:text-8xl text-neutral-900 uppercase tracking-tight leading-none`

### Info 区块标题 (Info Section Header)

```
flex items-center gap-4
```
- Star 图标: `fill-black w-8 h-8 / md:w-12 md:h-12`
- 标题: `font-display text-5xl / md:text-7xl uppercase text-black`

### Marquee 滚动条

```
w-full bg-paper overflow-hidden py-3 / md:py-4
border-y-2 border-neutral-900
select-none
```
- 动画: `translateX(-100%)`, `20s linear infinite`

### 年份标签 (Year Badge)

```
font-mono text-sm font-bold bg-black text-white px-2 py-1
```

---

## 8. 响应式断点 (Responsive Breakpoints)

遵循 Tailwind 默认断点体系,采用 Mobile-First 策略:

| 断点  | 最小宽度  | 关键变化                                          |
|-------|----------|--------------------------------------------------|
| 默认   | 0px      | 单列布局, 紧凑间距, Hero 文字 `text-[23vw]`         |
| `md`  | 768px    | 双列网格, Hero 文字 `text-[14rem]`, 放射线显示       |
| `lg`  | 1024px   | 12列作品网格 (5+7), 列间距增大 `gap-x-48`, sticky 侧栏生效 |

### 关键响应式行为

- BurstLines 装饰: `hidden md:block` (移动端隐藏)
- Section 编号: `hidden md:inline-block` (移动端隐藏)
- 作品网格: 移动端单列堆叠, lg 切换为左右分栏
- 页脚按钮组: `flex-col` -> md:`flex-row`
- Info Grid 列间距: `gap-x-24` -> lg:`gap-x-48`

---

## 9. 风格建议 (Style Recommendations)

1. **保持极简黑白体系与硬边框阴影的一致性**: 所有新增组件应遵循 `border + shadow-[Npx_Npx_0px_0px_#000000]` 的粗野主义阴影模式,避免引入渐变、模糊阴影或彩色装饰,确保视觉语言统一

2. **善用字体层级制造张力**: 在 display 字体(`Titan One`)的超大尺寸与 mono 字体(`Space Mono`)的小尺寸之间建立强烈对比,利用 `uppercase` + `tracking-widest` 为标签类文字注入版式设计的精致感

3. **以留白和结构线条引导视觉流**: 通过大面积留白(`gap-32` ~ `gap-48`)、粗实线分割(`border-b-4`)和虚线断点(`border-dashed`)建立清晰的阅读节奏,让纸质纹理噪点叠加层成为贯穿始终的材质底色
