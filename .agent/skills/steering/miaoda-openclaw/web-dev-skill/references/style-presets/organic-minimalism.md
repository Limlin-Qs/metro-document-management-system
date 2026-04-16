# Organic Minimalism · 有机极简 UI 风格模板

## 设计语言 (Design Language)

| 维度 | 描述 |
|------|------|
| **Aesthetic Direction** | 有机极简主义 — 大面积留白搭配柔和的自然绿调，营造清新通透的视觉感受 |
| **Visual Signature** | 超大圆角卡片（40px-48px）、石灰绿高亮色、极简线性图标、无装饰主义排版 |
| **Emotional Tone** | 自然、轻盈、精确、值得信赖 |

---

## 配色方案 (Color Scheme)

| 角色 | 色值 | Tailwind / CSS | 用途说明 |
|------|------|----------------|----------|
| **bg** | `#FFFFFF` | `bg-white` | 页面主背景 |
| **surface** | `#F6F7F2` | `bg-gray-soft` (自定义) | 卡片/区块底色，带微黄暖灰调 |
| **header** | `#1A1A1A` | `text-gray-900` | 主标题文字 |
| **text** | `#1A1A1A` | `text-gray-900` | 正文主色 |
| **textMuted** | `#9CA3AF` | `text-gray-400` | 辅助说明、副标题、标签文字 |
| **accent** | `#D8EC9D` (背景) / `#B3D166` (文字) | `bg-lime-primary` / `text-lime-primary` (自定义) | 主强调色 — 石灰绿，用于激活态、高亮结果、CTA |
| **border** | `rgba(243, 244, 246, 0.5)` | `border-gray-100/50` | 极淡分割线 |

### 补充色

| 色值 | 用途 |
|------|------|
| `#F3F4F6` | `bg-gray-100` — 悬停态底色、按钮背景 |
| `rgba(179, 209, 102, 0.3)` | `bg-lime-primary/30` — 下拉选择器（来源）背景 |
| `#1F2937` (gray-800) | 下拉选择器（目标）悬停色 |
| `#111827` (gray-900) | 深色下拉选择器背景 |
| `#D1FAE5` (lime-200) | `selection:bg-lime-200` — 文本选中高亮 |

### 自定义 CSS 变量映射

```css
.text-lime-primary { color: #b3d166; }
.bg-lime-primary   { background-color: #d8ec9d; }
.bg-gray-soft      { background-color: #f6f7f2; }
```

---

## 字体排版 (Typography)

### 字体族

| 层级 | 字体 |
|------|------|
| **主字体** | `'Noto Sans SC', sans-serif` |
| **代码/数值** | 继承主字体（数值以 `font-bold` 呈现） |

### 文字层级表

| 层级 | 大小 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| **Hero Title** | `text-5xl` (48px) | `font-bold` (700) | `leading-tight` | 页面主标题 |
| **Section Title** | `text-4xl` (36px) | `font-bold` (700) | 默认 | 区块标题、转换器数值显示 |
| **Card Title** | `text-2xl` (24px) | `font-bold` (700) | 默认 | 网格卡片标题 |
| **Body** | `text-lg` (18px) | `font-normal` (400) | `leading-relaxed` | 描述段落 |
| **Small Label** | `text-sm` (14px) | `font-medium` (500) | 默认 | 按钮文字、卡片副标题 |
| **Breadcrumb** | `text-[12px]` | `font-medium` (500) | 默认 | 面包屑导航、底部版权 |
| **Micro Label** | `text-[11px]` | `font-bold` (700) | 默认 | 表单标签（uppercase + tracking-widest）、页脚关键词 |
| **Pill / Select** | `text-xs` (12px) | `font-bold` (700) | 默认 | 下拉选择器文字 |

---

## 页面结构 (Page Structure)

从上到下分为以下区块：

```
┌──────────────────────────────────────────────────────────┐
│  Header — 左侧面包屑 + 主标题，右侧"了解更多"按钮       │
│  max-w-7xl · px-6 · pt-12                               │
├──────────────────────────────────────────────────────────┤
│  Hero Section — 浅灰底色超大圆角卡片                      │
│  左侧：区块标题 + 描述 + CTA  |  右侧：白色转换器面板    │
│  rounded-[48px] · p-12 lg:p-16 · mt-16                  │
├──────────────────────────────────────────────────────────┤
│  Category Grid — 3列网格卡片                              │
│  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 · gap-6      │
│  mt-24 · mb-32                                           │
├──────────────────────────────────────────────────────────┤
│  Footer — 左侧版权 · 右侧关键词标签                      │
│  border-t border-gray-100 · py-12                        │
└──────────────────────────────────────────────────────────┘
```

整体布局容器：`max-w-7xl mx-auto px-6`

---

## 视觉风格 (Visual Style)

### 间距系统

| 用途 | 值 |
|------|------|
| 页面顶部留白 | `pt-12` (48px) |
| Hero 区块与顶部间距 | `mt-16` (64px) |
| Hero 内部内容间距 | `p-12 lg:p-16` (48px / 64px) |
| 网格区与 Hero 间距 | `mt-24` (96px) |
| 网格底部留白 | `mb-32` (128px) |
| 卡片内部 padding | `p-10` (40px) |
| 转换器面板 padding | `p-8 lg:p-12` (32px / 48px) |
| 网格间距 | `gap-6` (24px) |
| 表单分组间距 | `space-y-12` (48px) |
| 页脚 | `py-12` (48px) |

### 圆角 (Border Radius)

| 元素 | 圆角值 |
|------|--------|
| Hero 外层卡片 | `rounded-[48px]` |
| 转换器白色面板 | `rounded-[40px]` |
| 网格卡片 | `rounded-[40px]` |
| 图标容器 | `rounded-2xl` (16px) |
| 圆形按钮 / 图标按钮 | `rounded-full` |
| 下拉选择器 Pill | `rounded-full` |

### 阴影

| 元素 | 阴影值 |
|------|--------|
| 转换器白色面板 | `shadow-sm` |
| CTA 圆形按钮 | `shadow-sm` |
| 非激活卡片箭头按钮 | `shadow-sm` |
| 互换按钮 | `shadow-sm` |

全局保持极轻阴影，强化通透感。

### 边框

| 元素 | 样式 |
|------|------|
| 转换器面板 | `border border-gray-100/50` |
| 输入 / 输出下划线 | `border-b border-gray-100` |
| 互换按钮 | `border border-gray-100` |
| 页脚顶部 | `border-t border-gray-100` |

---

## 组件规范 (Component Specs)

### 按钮

#### CTA 按钮（文字 + 圆形箭头）
```
容器: flex items-center gap-3 group px-1
文字: font-bold text-gray-900
圆形: w-10 h-10 rounded-full bg-lime-primary shadow-sm
图标: w-5 h-5 text-gray-900
悬停: group-hover:translate-x-1
```

#### 了解更多按钮（文字 + 灰色圆形）
```
容器: flex items-center gap-2 group
文字: text-sm font-medium text-gray-900
圆形: w-8 h-8 rounded-full bg-gray-100
图标: w-4 h-4 text-gray-900
悬停: group-hover:rotate-45
```

#### 互换按钮（圆形图标）
```
容器: w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm
图标: w-4 h-4 text-gray-400
悬停: hover:bg-gray-50 hover:scale-110
```

### 卡片 (Category Card)

```
容器: rounded-[40px] p-10 h-[320px] flex flex-col justify-between text-left
默认态: bg-gray-soft hover:bg-gray-100/50
激活态: bg-lime-primary

图标容器:
  默认: w-12 h-12 rounded-2xl bg-transparent text-gray-900
  激活: w-12 h-12 rounded-2xl bg-white text-gray-900
  悬停: group-hover:scale-110

标题: text-2xl font-bold
副标题: text-gray-400 text-sm mt-1

底部箭头:
  默认: w-10 h-10 rounded-full bg-white shadow-sm → 图标 text-gray-400
  激活: w-10 h-10 rounded-full bg-white → 图标 text-gray-900

过渡: transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### 输入框 (Number Input)

```
样式: text-4xl font-bold text-gray-900 bg-transparent focus:outline-none w-full
占位符: placeholder="0"
验证: 仅允许数字和小数点 /^-?\d*\.?\d*$/
隐藏浏览器数字控件: -webkit-appearance: none
```

### 下拉选择器 (Unit Select)

#### 来源单位
```
bg-lime-primary/30 text-lime-800 text-xs font-bold px-4 py-2 rounded-full
悬停: hover:bg-lime-primary/50
```

#### 目标单位
```
bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full
悬停: hover:bg-gray-800
```

### 结果显示

```
text-4xl font-bold text-lime-primary truncate w-full
```

---

## 响应式断点 (Responsive Breakpoints)

| 断点 | 布局变化 |
|------|----------|
| **默认 (mobile)** | 单列网格 `grid-cols-1`；Hero 区纵向堆叠 `flex-col`；转换器面板 `p-8` |
| **md (768px)** | 网格扩展为 `grid-cols-2`；页脚横向排列 `md:flex-row` |
| **lg (1024px)** | 网格扩展为 `grid-cols-3`；Hero 横向布局 `lg:flex-row`，左 2/5 右 3/5；内部 padding 增至 `lg:p-16` / `lg:p-12` |

最大内容宽度：`max-w-7xl` (1280px)

---

## 风格建议 (Style Recommendations)

1. **保持大圆角与高留白比例**：所有卡片、面板、按钮统一使用 `rounded-[40px]` 以上的有机圆角，搭配宽裕的 `p-10` ~ `p-16` 内边距，让内容在充足的呼吸空间中自然呈现，避免任何视觉拥挤感。

2. **色彩克制、强调色聚焦**：整体以白色和 `#F6F7F2` 暖灰作为基底，仅在激活态、数值结果和关键 CTA 处使用石灰绿 (`#D8EC9D` / `#B3D166`) 作为唯一强调色，确保用户注意力被精准引导至核心交互区域。

3. **微妙动效增强触感**：使用 `cubic-bezier(0.4, 0, 0.2, 1)` 缓动曲线为卡片状态切换添加 300ms 过渡，悬停时通过 `scale-110`、`translate-x-1`、`rotate-45` 等微小位移给予即时反馈，保持界面的灵动感而不干扰使用效率。
