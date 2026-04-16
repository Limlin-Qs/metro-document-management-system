# Dark Gold Premium · 暗金奢华 UI 风格模板

## 1. 设计语言

本模板采用 **Dark Gold Premium（暗金奢华）** 设计语言，以深邃的暗色系为底色、金属感琥珀金为点睛，传递高端、专业、沉稳的机构级视觉质感。整体设计遵循以下原则：

- **极致暗底 + 贵金属高光**：以接近纯黑的深蓝-黑作为画布底色，所有强调信息以琥珀金（Amber Gold）渲染，形成强烈对比和奢华感
- **渐变光晕与微动效**：背景使用大面积模糊光斑（blur glow）营造空间深度，关键文字配有 shimmer 微光动画和 metallic glow 文字阴影
- **金属边框渐变**：卡片使用 CSS 伪元素实现对角线金色渐变边框（gold-border-gradient），而非实体边框
- **极简排版 + 超大留白**：section 间距极大（space-y-40），内容密度低，以留白传递高端感
- **中英双语标题体系**：所有章节标题使用 "English Title / 中文标题" 双语格式，英文大写，中文辅助
- **Serif + Sans-Serif 混排**：正文使用 Inter 无衬线字体，Hero 区域及装饰性文字使用 Playfair Display 衬线字体，形成古典与现代的交融

## 2. 配色方案

### 7 色角色系统

| 角色 | 色值 | Tailwind Class | 用途说明 |
|------|------|----------------|----------|
| **主背景色** | `#020617` | `bg-[#020617]` | 页面主背景，接近纯黑的 slate-950 |
| **次级背景** | `#0f172a` / `rgba(15,23,42,0.6)` | `bg-slate-900` / 卡片半透明底 | 卡片内部背景、Tooltip 背景、Hero 渐变起点 `#0a0f1e` |
| **主强调色** | `#d4af37` | `text-amber-500` | 核心金色，用于标题光效、图标、图表主色、边框渐变、shimmer 动画 |
| **辅助强调色** | `#b8860b` / `#f59e0b` | — | 图表次级色系，暗金与亮金的过渡 |
| **正文色** | `#e2e8f0` / `#ffffff` | `text-slate-200` / `text-white` | 正文内容为 slate-200，关键数值为纯白 |
| **次级文字** | `#64748b` / `#475569` | `text-slate-500` / `text-slate-400` | 标签、注释、辅助说明文字 |
| **分割线/边界** | `#1e293b` | `border-slate-800` | 网格线、分隔线，常带透明度 `/50` `/60` `/80` |

### 图表专用色板（有序）

```
['#d4af37', '#b8860b', '#78350f', '#f59e0b', '#4b5563']
```

- 索引 0 `#d4af37`：主金色，用于主数据系列
- 索引 1 `#b8860b`：暗金色，次要数据
- 索引 2 `#78350f`：深棕金，第三级
- 索引 3 `#f59e0b`：亮琥珀，第四级
- 索引 4 `#4b5563`：冷灰色，对比/兜底

### 特殊色彩效果

- **shimmer-text 金色微光**：`linear-gradient(90deg, #d4af37, #fdfc47, #d4af37)`，background-size 200%，5s 线性循环动画
- **metallic-glow 文字阴影**：`text-shadow: 0 0 15px rgba(212,175,55,0.4)`
- **背景光斑**：`bg-amber-500/10 blur-[150px]`（左上琥珀光斑）+ `bg-blue-600/10 blur-[150px]`（右下冷蓝光斑）
- **金色边框伪元素**：`linear-gradient(135deg, rgba(212,175,55,0.5) 0%, transparent 40%, transparent 60%, rgba(212,175,55,0.5) 100%)`，使用 mask-composite: exclude 实现镂空边框

## 3. ECharts 主题样式

> 以下为项目图表的 ECharts 主题配置。

```json
{
  "color": ["#d4af37", "#b8860b", "#78350f", "#f59e0b", "#4b5563"],
  "backgroundColor": "transparent",
  "textStyle": {
    "fontFamily": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "color": "#475569",
    "fontSize": 11,
    "fontWeight": 700
  },
  "title": {
    "textStyle": {
      "color": "#d4af37",
      "fontSize": 10,
      "fontWeight": 700,
      "textTransform": "uppercase"
    }
  },
  "grid": {
    "top": 20,
    "right": 30,
    "bottom": 5,
    "left": 20,
    "containLabel": true
  },
  "categoryAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": {
      "color": "#475569",
      "fontSize": 11,
      "fontWeight": 700
    },
    "splitLine": { "show": false }
  },
  "valueAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": {
      "color": "#475569",
      "fontSize": 11,
      "fontWeight": 700
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": "#1e293b",
        "type": "dashed",
        "dashOffset": 5
      }
    }
  },
  "tooltip": {
    "backgroundColor": "#0f172a",
    "borderColor": "rgba(212,175,55,0.2)",
    "borderWidth": 1,
    "borderRadius": 12,
    "textStyle": {
      "color": "#ffffff"
    },
    "axisPointer": {
      "type": "shadow",
      "shadowStyle": {
        "color": "rgba(30,41,59,0.27)"
      }
    }
  },
  "legend": {
    "textStyle": {
      "color": "#475569",
      "fontSize": 11,
      "fontWeight": 700
    },
    "top": 0,
    "right": 0,
    "icon": "rect"
  },
  "bar": {
    "itemStyle": {
      "borderRadius": [4, 4, 0, 0]
    },
    "barWidth": 60
  },
  "line": {
    "lineStyle": {
      "width": 4
    },
    "smooth": true,
    "showSymbol": false,
    "areaStyle": {
      "color": {
        "type": "linear",
        "x": 0, "y": 0, "x2": 0, "y2": 1,
        "colorStops": [
          { "offset": 0.05, "color": "rgba(212,175,55,0.3)" },
          { "offset": 0.95, "color": "rgba(212,175,55,0)" }
        ]
      }
    }
  },
  "pie": {
    "radius": ["55%", "80%"],
    "padAngle": 8,
    "itemStyle": {
      "borderWidth": 0
    },
    "label": { "show": false },
    "emphasis": {
      "scaleSize": 5
    }
  }
}
```

### 图表容器规范

- 面积图/柱状图容器高度：`h-72`（288px）至 `h-96`（384px）
- 饼图容器：最小高度 `min-h-[250px]`，内置居中文字标注
- 容器过渡动画：`transition: all 0.3s ease`

## 4. 字体排版

### 字体栈

| 用途 | 字体 | 加载方式 |
|------|------|----------|
| 正文/UI | `Inter` (wght 300-700) | Google Fonts |
| 装饰/Hero | `Playfair Display` (ital, wght 700) | Google Fonts |
| 回退栈 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | 系统字体 |

### 排版层级

| 层级 | 样式 | 用途 |
|------|------|------|
| Hero 主标题 | `text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]` | 首屏标题，纯白 |
| Hero 副标题（衬线） | `shimmer-text italic font-serif font-light` | Hero 区金色微光衬线文字 |
| 章节编号 | `text-amber-500/40 font-serif text-5xl font-light italic` | 章节序号 01/02 等 |
| 章节主标题 | `text-3xl font-bold text-white tracking-tight uppercase` + `metallic-glow` | 章节英文标题 |
| 章节副标题 | `text-sm font-medium text-amber-500/60 tracking-[0.3em] uppercase` | 章节中文标题 |
| 卡片标题 | `text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.3em]` + `shimmer-text` | 卡片内标题标签 |
| 指标标签 | `text-[10px] font-bold text-slate-500 uppercase tracking-widest` | Metric 组件标签 |
| 指标数值 | `text-3xl font-black text-white tracking-tighter` + `metallic-glow` | 大数字展示 |
| 超大数值 | `text-4xl font-black tracking-tighter` | 高亮汇总数字 |
| 正文内容 | `text-sm text-slate-400 leading-relaxed font-light` | 段落文本 |
| 注释/脚注 | `text-[10px] text-slate-500 font-semibold tracking-wider` / `text-xs italic` | 辅助说明 |
| 标签/Badge | `text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded` | 行内状态标签 |

### 字间距系统

- `tracking-tighter`：紧凑，用于大数字
- `tracking-tight`：微紧，用于标题
- `tracking-widest` / `tracking-wider`：宽松，用于全大写小字标签
- `tracking-[0.2em]` ~ `tracking-[0.5em]`：自定义超宽字间距，用于高端感标签

## 5. 页面结构

### 整体骨架

```
[Fixed Background Layer]    ← 模糊光斑 + 垂直装饰线，pointer-events-none
[Hero Section]              ← 渐变背景 from-[#0a0f1e] to-[#020617]，pt-32 pb-24
  ├─ 机密标签行             ← 金色横线 + 全大写小字
  ├─ 主标题区               ← 超大标题 + 左边框引用段落
  └─ 元数据行               ← flex wrap，竖线分隔的元信息 + 右侧 CTA 按钮
[Main Content]              ← max-w-5xl mx-auto, py-24, space-y-40
  ├─ Section 01             ← SectionTitle + 4列指标卡 + 2:1 网格
  ├─ Section 02             ← SectionTitle + 3:2 网格
  ├─ Section 03             ← SectionTitle + 全宽卡片
  ├─ Section 04             ← SectionTitle + 2列网格
  └─ Section 05             ← SectionTitle + 3列网格 + 全宽附录卡
[Footer]                    ← bg-[#01040a], py-32, border-t
```

### 内容区最大宽度

- `max-w-5xl`（1024px）居中

### Section 间距

- Section 之间：`space-y-40`（160px）
- Section 内部块间距：`space-y-12`（48px）

## 6. 视觉风格

### 背景系统

| 元素 | 实现方式 |
|------|----------|
| 页面底色 | `#020617` 纯色 |
| Hero 渐变 | `bg-gradient-to-b from-[#0a0f1e] to-[#020617]` |
| 左上光斑 | `bg-amber-500/10 blur-[150px] rounded-full opacity-40 animate-pulse`，尺寸 50% |
| 右下光斑 | `bg-blue-600/10 blur-[150px] rounded-full opacity-30`，尺寸 40% |
| 垂直装饰线 | 宽 1px，`bg-gradient-to-b from-transparent via-amber-500/20 to-transparent` |
| Footer 底色 | `#01040a` |

### 圆角系统

| 元素 | 圆角值 |
|------|--------|
| 卡片 | `rounded-2xl`（16px） |
| 金边伪元素 | `border-radius: 1.05rem`（~17px） |
| 头像/图标框 | `rounded-2xl`（16px） |
| Badge 标签 | `rounded`（4px）/ `rounded-md`（6px） |
| CTA 按钮 | `rounded-full` |
| 列表行 hover | `rounded`（4px）/ `rounded-xl`（12px） |
| Tooltip | `border-radius: 12px` |
| 状态指示点 | `rounded-full` |
| 柱状图顶部 | `radius: [4,4,0,0]` |

### 阴影系统

| 元素 | 阴影值 |
|------|--------|
| glow 卡片 | `shadow-[0_0_40px_rgba(212,175,55,0.05)]` |
| 图例色点 | `shadow-[0_0_8px_rgba(212,175,55,0.3)]` |
| CTA 按钮 | `shadow-[0_0_20px_rgba(212,175,55,0.15)]` |
| CTA hover | `shadow-[0_0_30px_rgba(212,175,55,0.25)]` |
| 头像框 | `shadow-xl` |
| 状态点（完成） | `shadow-[0_0_12px_rgba(212,175,55,0.6)]` |

### 边框系统

| 元素 | 边框样式 |
|------|----------|
| 卡片主边框 | 无实体边框，使用 `gold-border-gradient` 伪元素渐变 |
| 分割线 | `border-slate-800/50` ~ `border-slate-800/80`，1px |
| Hero 底线 | `border-b border-amber-500/10` |
| 风险卡左边框 | `border-l-4 border-l-amber-600/40` |
| 引用段落左边框 | `border-l border-amber-500/30` |
| 元数据分隔 | `border-l border-slate-800` |
| 状态列表项 | `border border-slate-800/50` |
| 头像 hover 边框 | `border border-amber-500/20` -> `border-amber-500/50` |

### 动画与过渡

| 效果 | 实现方式 |
|------|----------|
| shimmer 文字微光 | `animation: shimmer 5s linear infinite`，background-position 200% |
| 光斑脉搏 | `animate-pulse`（Tailwind 内置） |
| 卡片悬停上浮 | `group-hover:-translate-y-2`，`transition-transform duration-500` |
| 悬停光晕 | `opacity-0 group-hover:opacity-100 transition-all duration-700` |
| 颜色过渡 | `transition-colors`（默认 150ms） |
| CTA 光晕过渡 | `transition-all duration-700` |
| 状态点进行中 | `animate-pulse`（slate-700 色） |

## 7. 组件规范

### SectionTitle 章节标题

```
结构：序号(font-serif 5xl italic) + 标题组(英文 3xl bold + 中文 sm amber) + 装饰线(金色20px + 灰色flex-1)
间距：mb-16, gap-6, gap-4
```

### Card 通用卡片

```
外层：gold-border-gradient（伪元素金色渐变边框）
可选：glow 模式增加 shadow-[0_0_40px_rgba(212,175,55,0.05)]
内层：p-8 rounded-2xl
标题区：w-1 h-3 amber 圆点 + 10px 全大写金色标签, mb-8
```

### Metric 指标组件

```
标签：10px bold slate-500 uppercase tracking-widest, hover 变 amber-500/50
数值：3xl font-black white tracking-tighter + metallic-glow
副文本：10px slate-500 semibold tracking-wider
```

### 竞品/列表卡片

```
!p-6（覆盖默认 p-8）
布局：flex justify-between items-center
左侧：标签 + 名称(hover 变金色)
右侧：标签 + Badge(bg-slate-800/80 border-slate-700/50 rounded-md italic)
```

### 风险卡片

```
!p-10, border-l-4 border-l-amber-600/40
右上角超大序号：text-8xl opacity-[0.03] italic
顶部标签行：RISK CONTROL badge + 标题
内容：描述 + 分割线 + 应对策略
```

### 人物卡片

```
整体：group hover 上浮(-translate-y-2) + 外层渐变光晕
头像：w-20 h-20, bg-gradient slate-800->900, border amber-500/20, rounded-2xl
姓名：xl font-black white
角色：10px amber-500/60 tracking-[0.4em] shimmer-text
简介：xs slate-500 uppercase tracking-tighter
```

### 状态检查列表项

```
容器：p-4 rounded-xl bg-slate-800/30 border-slate-800/50
状态点：w-2.5 h-2.5 rounded-full
  ├─ 完成态：bg-amber-500 + shadow glow
  └─ 进行中：bg-slate-700 + animate-pulse
标题：10px font-black white uppercase
描述：10px slate-500 bold italic
右侧箭头：w-4 h-4 slate-700, hover 变 amber-500
```

### CTA 按钮

```
px-8 py-3, bg-amber-500/10, border border-amber-500/40
rounded-full, shadow glow 20px -> hover 30px
文字：xs font-black amber-400 tracking-[0.2em] uppercase + metallic-glow
transition-all duration-700
```

## 8. 响应式断点

本模板基于 Tailwind CSS 默认断点系统，采用移动优先策略：

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| 默认（移动端） | < 768px | 所有网格单列堆叠（`grid-cols-1`），Hero 标题 `text-6xl` |
| `md` | >= 768px | 指标卡 4 列（`md:grid-cols-4`），风险/附录 2 列（`md:grid-cols-2`），人物 3 列（`md:grid-cols-3`），Hero 标题 `md:text-8xl`，Footer 横向排列 `md:flex-row` |
| `lg` | >= 1024px | 主内容区 `lg:grid-cols-5`（3:2）、`lg:grid-cols-3`（2:1）分栏布局 |

### 关键响应式模式

- 内容最大宽度始终为 `max-w-5xl`（1024px）+ `mx-auto`
- 页面内边距 `px-4` 在所有尺寸保持一致
- 网格间距 `gap-6` ~ `gap-8`，不随断点变化
- 图表容器使用 `width: '100%', height: '100%'` 自适应

## 9. 风格建议

- **保持极低信息密度**：每个卡片内只放一个核心信息点，用大量留白（p-8 ~ p-10）让内容呼吸；Section 间使用 160px 间距
- **金色点到为止**：琥珀金仅用于标题光效、装饰线条、图表主色和少量 Badge，切勿大面积使用金色填充，避免廉价感
- **文字层级务必清晰**：10px 全大写标签(slate-500) -> sm 正文(slate-400) -> 3xl/4xl 数值(white) 形成三级视觉跳跃
- **动效克制高雅**：shimmer 动画周期 5 秒（缓慢），hover 过渡 500-700ms（从容），避免快速闪烁或弹跳
- **暗色背景层次分明**：使用 `#020617`(底) / `rgba(15,23,42,0.6)`(卡片) / `#0a0f1e`(Hero) / `#01040a`(Footer) 四级暗度，避免全部同一色值
- **边框用渐变替代实线**：使用 gold-border-gradient 伪元素实现对角金色渐变边框，比 `border: 1px solid gold` 更精致
- **衬线体仅用于装饰**：Playfair Display 只在 Hero 主标题和章节编号使用，正文和 UI 元素一律使用 Inter
- **全大写 + 超宽字间距 = 高端标签**：10px 以下的辅助标签统一使用 `uppercase tracking-[0.2em~0.5em]`，这是该风格的核心视觉签名
- **hover 交互暗示层级**：文字从 slate 过渡到 amber，边框从低透明度过渡到高透明度，卡片微微上浮，所有过渡保持优雅从容
