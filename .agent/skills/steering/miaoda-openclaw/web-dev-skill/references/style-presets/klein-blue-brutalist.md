# Klein Blue Brutalist · 克莱因蓝粗野主义 UI 风格模板

## 1. 设计语言

本模板采用 **瑞士国际主义排版（Swiss International Typographic Style）** 与 **新粗野主义（Neo-Brutalism）** 的融合风格，以国际克莱因蓝（IKB, International Klein Blue）为绝对主色，纯白为唯一对比色，构成高对比度的双色宇宙。

核心特征：
- **双色绝对主义**：仅使用克莱因蓝 `#002FA7` 与纯白 `#FFFFFF`，所有视觉层次通过透明度与反转实现
- **全大写工业排版**：标题使用超紧缩字距（tracking-tighter）、全大写（uppercase）、黑体（font-black/font-bold），传递工程文档的权威感
- **无圆角硬边框**：所有容器均为直角矩形，以 1px 白色半透明边框 `border-white/80` 勾勒，拒绝一切圆润装饰
- **色彩反转交互**：hover 时蓝白互换（蓝底白字 <-> 白底蓝字），形成统一、可预测的交互反馈
- **网格底纹层叠**：背景叠加白色半透明网格线与径向渐变遮罩，增添深度与技术感
- **等宽字体辅助信息层**：元数据、标注、日期等辅助信息统一使用 JetBrains Mono 等宽字体，与正文 Inter 形成功能性对比

## 2. 配色方案

### 七色角色系统

| 角色 | 色值 | Tailwind 写法 | 用途 |
|------|------|---------------|------|
| **主色（Primary）** | `#002FA7` | `bg-[#002FA7]` | 页面背景、所有容器默认底色、hover 反转后的文字色 |
| **前景/对比色（Foreground）** | `#FFFFFF` | `text-white` / `bg-white` | 文字默认色、hover 反转后的底色、边框、分割线 |
| **危险/强调色（Danger）** | `#EF4444` | `bg-red-500` / `text-red-500` | 关键警告条、P0 优先级标签、FREEZE 标记、感叹号图标 |
| **成功/正向色（Success）** | `#4ADE80` | `text-green-400` / `bg-green-400` | 改善指标文字、目标达成标记、进度条填充色 |
| **警告色（Warning）** | `#FACC15` | `text-yellow-400` | P1 优先级文字标记 |
| **信息色（Info）** | `#60A5FA` | `text-blue-400` | P2 优先级文字标记 |
| **柔和层（Muted）** | `rgba(255,255,255,0.5~0.8)` | `opacity-50` ~ `opacity-80` / `border-white/80` | 边框、分割线、次要文字、元数据标签 |

### 透明度层级规范

| 层级 | 透明度 | 用途 |
|------|--------|------|
| 实体 | `opacity-100` | 主标题、核心数值 |
| 次要 | `opacity-90` | 描述性正文 |
| 辅助 | `opacity-80` | 次要元数据、边框（`white/80`） |
| 淡化 | `opacity-70` | 标签文字、详情说明 |
| 弱化 | `opacity-60` | 字段名称前缀（DATE:、OWNER:） |
| 划除 | `opacity-50` + `line-through` | 旧值/被替代数据 |

## 3. 字体排版

### 字体栈

| 角色 | 字体 | 加载方式 |
|------|------|----------|
| **正文/标题** | `Inter` | Google Fonts，权重 400 / 700 / 900 |
| **等宽/数据** | `JetBrains Mono` | Google Fonts，权重 400 / 700 |

### 字体规格

| 层级 | 尺寸 | 权重 | 字距 | 转换 | 用途 |
|------|------|------|------|------|------|
| 超大标题 H1 | `text-5xl` (mobile) / `text-8xl` (md+) | `font-black` (900) | `tracking-tighter` | `uppercase` | 页面主标题 |
| 大标题 H2 | `text-4xl` | `font-bold` (700) | `tracking-tighter` | `uppercase` | 章节标题 |
| 中标题 H3 | `text-3xl` | `font-bold` (700) | `tracking-tighter` | `uppercase` | 次级区域标题 |
| 卡片标题 | `text-2xl` | `font-bold` (700) | 默认 | -- | 决策卡片标题 |
| 事件标题 | `text-xl` | `font-bold` (700) | 默认 | -- | 时间线事件标题 |
| 大数值 | `text-5xl` | `font-bold` (700) | `tracking-tighter` | -- | 指标核心数值 |
| 数值单位 | `text-lg` | 默认 | `tracking-wide` | -- | 数值后缀单位 |
| 正文 | `text-sm` (14px) | 默认 (400) | 默认 | -- | 描述文字 |
| 元数据标签 | `text-xs` (12px) | 默认 / `font-bold` | 默认 | `uppercase`（部分） | 标注、日期、ID、分类 |
| 微标签 | `text-[10px]` | `font-bold` | 默认 | -- | FREEZE 标签、DUR 标签 |
| 等宽标签 | `text-xs` / `text-sm` | `font-mono` | 默认 | -- | 日期、编号、所有者、状态码 |

## 4. 页面结构

### 整体布局

```
Container: max-w-7xl mx-auto
Padding:   p-4 (mobile) / p-8 (md+)
间距:       space-y-8（主区块间垂直间距 32px）
```

### 区块编排（自上而下）

```
┌─────────────────────────────────────────────────┐
│  Header                                          │
│  全宽，蓝底白边，包含主标题 + 元数据网格          │
├─────────────────────────────────────────────────┤
│  Metrics Dashboard (4列网格)                     │
│  grid-cols-1 → md:grid-cols-2 → lg:grid-cols-4  │
│  gap-4, mt-10                                    │
├──────────────┬──────────────────────────────────┤
│ Core         │  Architecture Diagram (flex-1)    │
│ Decisions    │  ──────────────────────────────── │
│ (1/3宽)      │  Action Items                     │
│ lg:col-span-1│  (lg:col-span-2)                 │
├──────────────┴──────────────────────────────────┤
│  Risk & Roadmap                                  │
│  横向 flex 时间轴 + 底部风险标签                  │
└─────────────────────────────────────────────────┘
```

### 网格系统

| 区域 | 桌面布局 | 平板布局 | 移动布局 |
|------|----------|----------|----------|
| 指标卡片 | `lg:grid-cols-4` | `md:grid-cols-2` | `grid-cols-1` |
| 决策+架构 | `lg:grid-cols-3`（1+2） | `grid-cols-1` | `grid-cols-1` |
| Action Items 行 | `grid-cols-12`（1+6+3+2） | `grid-cols-12`（1+11） | `grid-cols-12`（1+11） |
| 时间轴 | 横向 `flex`，等分 | 横向 `flex overflow-x-auto` | 横向滚动 |

## 5. 视觉风格

### 背景系统

```css
/* 页面底色 */
html { background-color: #002FA7; }

/* 全屏网格底纹（fixed 定位，z-index: -1） */
body::before {
  background-image:
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle 120vmax at 50% 0, white 40%, transparent 80%);
}

/* 组件级网格底纹 .grid-bg */
background-image:
  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
background-size: 20px 20px;
```

### 边框与分割

| 元素 | 样式 |
|------|------|
| 容器外框 | `border border-white/80`（1px 实线，白色 80% 不透明） |
| 内部分割线 | `divide-y divide-white/80` |
| hover 反转后边框 | `border-[#002FA7]/80` 或 `border-[#002FA7]` |

### 圆角

所有元素均无圆角（`rounded-none` / 默认值），保持硬边粗野主义风格。

### 阴影

| 类型 | 样式 | 用途 |
|------|------|------|
| 硬偏移阴影 | `shadow-[4px_4px_0px_white]` | 架构图中的服务节点框 |
| hover 反转阴影 | `shadow-[4px_4px_0px_#002FA7]` | 服务节点 hover 后 |

### 关键装饰条

| 元素 | 样式 | 用途 |
|------|------|------|
| 顶部危险条 | `w-full h-1 bg-red-500` (absolute top-0) | 关键指标卡片顶部红线 |
| 进度条轨道 | `w-full h-1 bg-white/20` | 时间线进度底色 |
| 进度条填充 | `bg-green-400 h-1` + 动态宽度 | 进度指示 |
| 分隔实线 | `w-full h-1 bg-white` | 架构图中的总线横线 |

### 警告条纹（Risk Card）

```css
.risk-card {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(0, 47, 167, 0.8),
    rgba(0, 47, 167, 0.8) 10px,
    rgba(255, 255, 255, 0.1) 10px,
    rgba(255, 255, 255, 0.1) 20px
  );
}
.risk-card:hover {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(239, 68, 68, 0.16) 10px,
    rgba(239, 68, 68, 0.16) 20px
  );
}
```

### 文字选择高亮

```css
selection:bg-white selection:text-[#002FA7]
```

## 6. 组件规范

### Header（页首横幅）

- 结构：`bg-[#002FA7] border border-white/80`，内含主标题 + 元数据双栏
- 内边距：`px-6 pt-6 pb-5` (mobile) / `px-12 pt-12 pb-11` (md+)
- 右上角浮动标签：`absolute top-0 right-0`，`font-mono text-xs` / `md:text-sm`，`opacity-50`
- 主标题：`text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none`
- 标题内高亮标签：`bg-white text-[#002FA7] px-2 font-black`（内联反色块）
- 底部元数据：`grid grid-cols-1 md:grid-cols-2`，`font-mono text-sm`，上方 `border-t border-white/80 pt-4 mt-8`
- 状态标签：`font-bold border border-[#002FA7] bg-white text-[#002FA7] px-2 py-0.5`
- Hover：整体 `hover:bg-white hover:text-[#002FA7]`，状态标签反转

### MetricCard（指标卡片）

- 容器：`border border-white/80 px-5 pt-5 pb-4 bg-[#002FA7] relative overflow-hidden`
- 关键指标：顶部 `absolute` 红线 `w-full h-1 bg-red-500`
- 标签：`font-mono text-base opacity-70 uppercase`
- 核心数值：`text-5xl font-bold tracking-tighter mt-10`
- 单位：`text-lg align-top tracking-wide`
- 底部行：`flex justify-between items-end mt-auto font-mono text-xs`
- 旧值：`opacity-50 line-through`
- 改善值：`text-green-400 font-bold`
- Hover：`hover:bg-white hover:text-[#002FA7] transition-colors duration-300 cursor-pointer`

### DecisionCard（决策卡片）

- 容器：`px-5 pt-6 pb-5`，无独立边框（由父容器 `divide-y` 分割）
- 分类标签：`font-mono text-xs opacity-60 mb-1`，格式 `DECISION {id} / {category}`
- 标题：`text-2xl font-bold mb-4`
- 描述：`text-sm opacity-90 mb-1.5`
- 详情：`text-xs font-mono opacity-70`
- 行动标签：`px-2 py-0.5 border border-white/80 text-xs font-bold`
- Hover：整体 `hover:bg-white hover:text-[#002FA7] transition-all duration-300`

### ActionItems（行动清单）

- 容器：`border border-white/80 bg-[#002FA7]`
- 表头栏：`bg-white text-[#002FA7] px-5 pt-2 pb-1 font-bold uppercase text-sm`
- 数据行：`px-5 pt-3 pb-2 grid grid-cols-12 gap-2 items-center text-sm`
- P0 标签：`bg-red-500 text-white px-1.5 py-0.5 text-xs font-bold`
- P1 标签：`text-yellow-400`
- P2 标签：`text-blue-400`
- 行 hover：`hover:bg-white transition-colors cursor-pointer`，子元素 `group-hover:text-[#002FA7]`

### Architecture Diagram（架构示意图）

- 容器：`bg-[#002FA7] border border-white/80 grid-bg`，使用 `flex-1 flex flex-col items-center justify-center`
- 左上角标签：`absolute top-2 left-2 font-mono text-xs bg-white text-[#002FA7] px-2 py-0.5`
- 服务节点框：`border border-white/80 bg-[#002FA7] px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_white]`
- 总线线：`w-full h-1 bg-white`，中间叠加等宽文字标签
- 数据库分片可视化：`grid grid-cols-8 gap-1`，子元素 `h-2 bg-white`
- Hover：全组反转蓝白

### Roadmap（时间轴）

- 容器：`border border-white/80 flex overflow-x-auto`
- 事件单元：`flex-1 px-4 pt-4 pb-3 min-w-[160px] bg-[#002FA7]`
- 单元间分隔：`border-r border-white/80`
- 日期：`text-xs font-mono opacity-50`
- 标题：`font-bold text-xl mt-1`
- Risk 类型：叠加 `.risk-card` 条纹背景 + `bg-red-500 text-white px-1 py-px text-[10px] font-bold` 角标
- 持续时间标签：`text-[10px] font-mono border border-white/80 px-1 opacity-80 inline-block`
- 底部风险条目：`mt-4 flex flex-wrap gap-4 font-mono text-xs`，每条 `border border-white/80 px-3 pt-1 pb-0`

## 7. 响应式断点

| 断点 | 尺寸 | 适配变化 |
|------|------|----------|
| 默认（mobile） | < 768px | 单列堆叠；标题 `text-5xl`；padding `p-4`；ActionItems 隐藏 owner 和日期列 |
| `md` | >= 768px | 指标卡片 2 列；标题 `text-8xl`；Header padding `p-12`；元数据双栏；ActionItems 展示全部列 |
| `lg` | >= 1024px | 指标卡片 4 列；决策+架构 3 栏分割（1:2） |

容器最大宽度：`max-w-7xl`（1280px），水平居中 `mx-auto`。

## 8. 风格建议

- **保持双色纪律**：除语义色（红/绿/黄/蓝）标记外，所有视觉元素严格限制在 `#002FA7` 和 `#FFFFFF` 之间；任何中间灰色、渐变色均通过白色透明度实现
- **Hover 一致性**：所有可交互容器统一使用蓝白反转模式（`hover:bg-white hover:text-[#002FA7]`），过渡时长 `duration-300` 或 `duration-200`，不引入其他 hover 效果
- **排版张力**：标题层级通过极端字号跨度（`text-8xl` vs `text-xs`）、字距压缩（`tracking-tighter`）和全大写创造视觉冲击力；避免使用常规的中间字号
- **等宽字体专用性**：`JetBrains Mono` 仅用于结构化数据（日期、编号、标签代码、所有者名称），不可用于标题或正文描述
- **边框即结构**：不使用背景色差或阴影来区分卡片区域，而是通过 `border-white/80` 和 `divide-y` 线条勾勒空间关系
- **硬阴影而非软阴影**：如需阴影，使用像素级偏移硬阴影（如 `shadow-[4px_4px_0px_white]`），禁止高斯模糊阴影
- **条纹警告语言**：风险/冻结区域使用 45 度重复条纹渐变，而非纯色或图标，以工业警示视觉传达紧迫感
- **克制装饰**：无圆角、无渐变填充、无图标库、无插图；唯一的装饰性元素是网格底纹和条纹背景
- **信息密度优先**：采用紧凑内边距（`px-5 pt-5 pb-4`），让数据尽可能密集呈现，符合技术仪表盘的信息架构习惯
