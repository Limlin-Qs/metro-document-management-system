# Slate Minimal · 石板极简 UI 风格模板

---

## 1. 设计语言

以 **极简主义（Ultra-Minimal）** 为核心美学，通过大圆角卡片、克制的 slate 灰阶色系与高纯度 indigo 强调色构建视觉层次。整体风格追求"少即是多"——大量留白、超大圆角、无多余装饰线，呈现出一种冷静克制且高级的数据叙事氛围。排版以 Inter 字体的 Black（900）/ Bold（700）权重为视觉锚点，配合纤细的辅助文字形成强烈的字重对比，营造出杂志式的现代感。

**关键词**：极简克制 / 超大圆角 / 灰阶渐变 / Indigo 强调 / 杂志式排版 / 呼吸感留白

---

## 2. 配色方案

### 2.1 七色角色体系

| 角色 | 色值 | Tailwind Token | 用途说明 |
|------|------|----------------|----------|
| **主背景** | `#F8FAFC` | `bg-[#F8FAFC]` / `slate-50` | 页面整体底色，极浅灰蓝 |
| **主文字** | `#0F172A` | `text-slate-900` | 标题、核心数值等主要文字 |
| **强调色** | `#4F46E5` | `text-indigo-600` / `bg-indigo-600` | 品牌强调、CTA 按钮、趋势线、高亮标题 |
| **辅助文字** | `#94A3B8` | `text-slate-400` | 描述文字、次要标签、副标题 |
| **容器/卡片** | `#FFFFFF` | `bg-white` | 白色卡片底色，配合极细边框 |
| **暗面容器** | `#0F172A` | `bg-slate-900` | 深色强调卡片（如统计高亮卡） |
| **边框/分割** | `#F1F5F9` | `border-slate-100` | 极浅边框线、分隔线、hover 背景 |

### 2.2 扩展色阶（漏斗 / 数据可视化梯度）

| 层级 | 色值 | 语义 |
|------|------|------|
| Level 1（最浅） | `#F1F5F9` | slate-100，数据起始层 |
| Level 2 | `#E2E8F0` | slate-200，次浅层 |
| Level 3 | `#CBD5E1` | slate-300，中间层 |
| Level 4 | `#475569` | slate-600，深灰转折层 |
| Level 5 | `#312E81` | indigo-900，深紫层 |
| Level 6（最深） | `#000000` | 纯黑，终端层 |

### 2.3 强调色辅助色阶

| 色值 | Token | 用途 |
|------|-------|------|
| `#EEF2FF` | `indigo-50` | 图标浅底色背景 |
| `#A5B4FC` | `indigo-300` | 深色容器中的辅助图标色 |
| `#4F46E5` | `indigo-600` | 主强调色 |
| `#4338CA` | `indigo-700` | hover 状态 |
| `#E0E7FF` | `indigo-100` | 文字选区背景色（`selection:bg-indigo-100`） |

---

## 3. ECharts 主题样式

> 以下为项目图表的 ECharts 主题配置。

```json
{
  "color": ["#4F46E5", "#475569", "#CBD5E1", "#312E81", "#94A3B8", "#0F172A"],
  "backgroundColor": "transparent",
  "textStyle": {
    "fontFamily": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "color": "#94A3B8",
    "fontSize": 11,
    "fontWeight": 500
  },
  "title": {
    "textStyle": {
      "color": "#0F172A",
      "fontSize": 18,
      "fontWeight": 900
    },
    "subtextStyle": {
      "color": "#94A3B8",
      "fontSize": 13,
      "fontWeight": 500
    }
  },
  "line": {
    "itemStyle": {
      "borderWidth": 3
    },
    "lineStyle": {
      "width": 3
    },
    "symbolSize": 0,
    "symbol": "circle",
    "smooth": true
  },
  "area": {
    "itemStyle": {
      "borderWidth": 3
    },
    "lineStyle": {
      "width": 3,
      "color": "#4F46E5"
    },
    "areaStyle": {
      "color": {
        "type": "linear",
        "x": 0, "y": 0, "x2": 0, "y2": 1,
        "colorStops": [
          { "offset": 0.05, "color": "rgba(79, 70, 229, 0.2)" },
          { "offset": 0.95, "color": "rgba(79, 70, 229, 0)" }
        ]
      }
    },
    "smooth": true,
    "symbol": "none"
  },
  "categoryAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": {
      "color": "#94A3B8",
      "fontSize": 11,
      "fontWeight": 500
    },
    "splitLine": { "show": false }
  },
  "valueAxis": {
    "axisLine": { "show": false },
    "axisTick": { "show": false },
    "axisLabel": { "show": false },
    "splitLine": {
      "lineStyle": {
        "color": "#F1F5F9",
        "width": 1
      }
    }
  },
  "tooltip": {
    "backgroundColor": "#FFFFFF",
    "borderColor": "transparent",
    "borderWidth": 0,
    "textStyle": {
      "color": "#0F172A",
      "fontSize": 13,
      "fontWeight": 600
    },
    "extraCssText": "border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); padding: 12px 16px;"
  }
}
```

---

## 4. 字体排版

### 4.1 字体栈

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### 4.2 字号层级

| 层级 | 大小 | 字重 | 用途 | Tailwind |
|------|------|------|------|----------|
| 超大标题 | `2.25rem`（36px） | 900 Black | 页面主标题 | `text-4xl font-black` |
| 大数值 | `2.25rem`（36px） | 700 Bold | 统计卡片核心数值 | `text-4xl font-bold` |
| 区块标题 | `1.5rem`（24px） | 900 Black | 卡片/模块标题 | `text-2xl font-black` |
| 子标题 | `1.125rem`（18px） | 700 Bold | 列表标题、次级标题 | `text-lg font-bold` |
| 正文 | `0.875rem`（14px） | 700 Bold | 下拉值、列表项名称 | `text-sm font-bold` |
| 标签 | `0.75rem`（12px） | 500 Medium | 筛选标签、副标题 | `text-xs font-medium` |
| 微文字 | `0.6875rem`（11px） | 500 Medium | 底部说明、漏斗标签 | `text-[11px] font-medium` |
| 超微文字 | `0.625rem`（10px） | 400 Regular | 团队归属等辅助信息 | `text-[10px]` |

### 4.3 排版特征

- **字间距**：标题使用 `tracking-tight`（-0.025em）紧凑字距；页脚使用 `tracking-widest`（0.1em）大写字母间距
- **数值风格**：排名成就数字使用 `font-black italic` 斜体黑体，传达力量感
- **大写字母**：页脚 legend 使用 `uppercase tracking-widest` 全大写宽字距

---

## 5. 页面结构

### 5.1 整体布局

```
┌─────────────────────────────────────────────────────┐
│                   Hero Section                       │
│            标题居中 + 横向筛选条                        │
│                  (max-w-4xl)                          │
├─────────────────────────────────────────────────────┤
│  StatCard  │  StatCard  │  StatCard  │  StatCard     │
│  (暗色)    │  (浅色)    │  (浅色)    │  (浅色)        │
│            col-span-12 → 4 等分                      │
├────────────────────────┬────────────────────────────┤
│                        │    强调色卡片               │
│     主内容区域          │    (indigo-600)            │
│     col-span-7         │    col-span-5              │
│     (超大圆角白卡片)    ├────────────────────────────┤
│                        │    白色卡片                 │
│                        │    趋势区域图               │
├────────────────────────┴────────────────────────────┤
│                  页脚 Legend 居中                     │
└─────────────────────────────────────────────────────┘
```

### 5.2 容器约束

| 区域 | 最大宽度 | Tailwind |
|------|----------|----------|
| 页面内容区 | `80rem`（1280px） | `max-w-7xl` |
| Hero 标题区 | `56rem`（896px） | `max-w-4xl` |
| 筛选栏 | `42rem`（672px） | `max-w-2xl` |
| 漏斗标签区 | `500px` | `max-w-[500px]` |

### 5.3 栅格系统

- 基于 12 列 CSS Grid：`grid grid-cols-12 gap-6`
- 统计卡片行：`col-span-12` 内嵌 `grid-cols-1 md:grid-cols-4`
- 主内容左：`col-span-12 lg:col-span-7`
- 主内容右：`col-span-12 lg:col-span-5`

---

## 6. 视觉风格

### 6.1 圆角体系

| 元素 | 圆角值 | Tailwind |
|------|--------|----------|
| 主内容大卡片 | `48px` | `rounded-[48px]` |
| 强调色卡片 | `40px` | `rounded-[40px]` |
| 趋势卡片 | `40px` | `rounded-[40px]` |
| 统计卡片 | `32px` | `rounded-[32px]` |
| 筛选栏 | `16px` | `rounded-2xl` |
| 列表项 hover | `16px` | `rounded-2xl` |
| Tooltip 弹窗 | `16px` | `border-radius: 16px` |
| 图标按钮 | `9999px` | `rounded-full` |
| 圆形头像/排名 | `9999px` | `rounded-full` |
| 图标小底色 | `8px` | `rounded-lg` |
| 页脚色块 | `2px` | `rounded-sm` |

### 6.2 阴影体系

| 元素 | 阴影 | Tailwind |
|------|------|----------|
| 普通白色卡片 | 极浅阴影 | `shadow-sm` |
| 暗色统计卡片 | 重阴影 | `shadow-2xl` |
| 强调色卡片 | 大阴影 | `shadow-xl shadow-indigo-100` |
| CTA 圆形按钮 | 带色阴影 | `shadow-lg shadow-indigo-200` |
| Tooltip | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | 自定义 |

### 6.3 边框

- 卡片统一使用 `border border-slate-100`（1px 极浅灰）
- 筛选栏分隔竖线：`w-px h-6 bg-slate-100`
- 卡片内分割线：`border-t border-slate-50`
- 暗色/强调色卡片 **无边框**

### 6.4 动效与交互

| 交互 | 效果 | 实现 |
|------|------|------|
| 统计卡片 hover | 轻微放大 | `hover:scale-[1.02] transition-all duration-300` |
| 筛选项 hover | 浅灰背景 | `hover:bg-slate-50 transition-colors` |
| 下拉箭头 hover | 变色 indigo | `group-hover:text-indigo-500 transition-colors` |
| 列表项 hover | 半透明白色背景 | `hover:bg-white/10` |
| CTA 按钮 hover | 深一级 indigo | `hover:bg-indigo-700 transition-colors` |
| 装饰线 | 渐变竖线 | `bg-gradient-to-b from-transparent to-slate-200` |

---

## 7. 组件规范

### 7.1 StatCard（统计卡片）

```
┌─────────────────────────────┐
│  标签文字         [图标按钮] │  ← text-sm font-medium + 圆形图标
│                              │
│  大数值                      │  ← text-4xl font-bold tracking-tight
│  说明文字                    │  ← text-xs font-medium slate-400
└─────────────────────────────┘
```

- 内边距：`p-8`（32px）
- 标签与数值间距：`mb-6`（24px）
- 数值与说明间距：`mb-2`（8px）
- 圆角：`rounded-[32px]`
- 暗色变体：`bg-slate-900 text-white shadow-2xl`，图标底色 `bg-indigo-500`
- 浅色变体：`bg-white border border-slate-100 shadow-sm`，图标底色 `bg-slate-50`

### 7.2 FilterDropdown（筛选下拉）

- 横向排列：`flex items-center space-x-2`
- 内边距：`px-4 py-2`
- 标签：`text-xs text-slate-400 font-medium whitespace-nowrap`
- 值：`text-sm font-bold text-slate-800`
- 选择器完全透明：`appearance-none bg-transparent`
- 筛选条容器：白色 `rounded-2xl shadow-sm border border-slate-100 p-1`，选项之间用 `w-px h-6 bg-slate-100` 竖线分隔

### 7.3 FunnelSegment（漏斗段）

- 高度固定：`60px`
- 使用 CSS `clipPath` 实现梯形切割
- 宽度从顶部 90% 递减至底部 5%
- 颜色从 `#F1F5F9` 渐变至 `#000000`（灰阶→深色递进）
- 过渡动画：`transition-all duration-500 ease-out`

### 7.4 RecruiterItem（排名列表项）

- 内边距：`p-4`
- 圆角：`rounded-2xl`
- 排名圆形：`w-8 h-8 rounded-full bg-white/20`
- 名字与团队纵向排列，间距靠 `space-x-4`
- 成就数值：`text-sm font-black italic`

### 7.5 趋势图卡片

- 容器高度：`h-48`（192px）
- 面积图渐变：从 `rgba(79,70,229,0.2)` 到 `rgba(79,70,229,0)`
- 线条宽度：`strokeWidth={3}`
- 底部脚注：`border-t border-slate-50` 分割，`mt-6 pt-6`

### 7.6 CTA 圆形按钮

- 尺寸：`p-3`（内嵌 `w-5 h-5` 图标）
- 样式：`bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-200`
- hover：`hover:bg-indigo-700 transition-colors`
- 指针：`cursor-pointer`

---

## 8. 响应式断点

| 断点 | 宽度 | 行为变化 |
|------|------|----------|
| 默认（mobile） | `< 768px` | 统计卡片单列堆叠（`grid-cols-1`）；主内容全宽（`col-span-12`）；筛选条自动换行（`flex-wrap`）；分隔竖线隐藏（`hidden sm:block`） |
| `md`（768px+） | `>= 768px` | 统计卡片 4 列（`md:grid-cols-4`） |
| `lg`（1024px+） | `>= 1024px` | 主内容区左 7 右 5 分栏（`lg:col-span-7` / `lg:col-span-5`） |

---

## 9. 风格建议

- **留白优先**：Hero 区上内边距 `pt-20`（80px）、下内边距 `pb-12`（48px），主内容区底部 `pb-24`（96px），大量呼吸空间是该风格的核心气质，切勿压缩。
- **圆角递进**：外层容器使用 40-48px 超大圆角，内层元素递减至 16-8px，形成由外到内的视觉包裹感。避免在同一层级混用差异过大的圆角。
- **色彩克制**：全局仅使用 slate 灰阶 + indigo 单一强调色。若需扩展色彩，应在 indigo 色阶内变化（50-900），不引入第二色相。
- **字重对比**：标题和数值使用 Black（900）/ Bold（700），辅助文字使用 Medium（500），避免使用 Regular（400）作为主体文字，以维持整体的"重量感"。
- **暗色卡片**：每组统计卡片中仅保留一张暗色卡片（`bg-slate-900`）作为视觉锚点，不宜多用，保持"点睛"效果。
- **强调色卡片**：Indigo 背景的信息卡片使用 `shadow-xl shadow-indigo-100` 产生带色阴影，增强品牌辨识度。内部元素使用 `white/20`、`white/50` 等透明白色保持层次。
- **Tooltip 圆润化**：所有浮窗和提示组件保持 16px 圆角 + 无边框 + 柔和阴影，与卡片风格保持一致。
- **装饰线**：使用从透明到浅灰的渐变竖线（`bg-gradient-to-b from-transparent to-slate-200`）作为视觉引导，保持装饰性而不干扰内容。
- **图标使用**：采用 Lucide 图标库（线条风格），配合圆形或圆角矩形底色使用，图标尺寸在 `w-4 h-4` 到 `w-5 h-5` 之间，保持轻量。
