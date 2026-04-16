# Lime Pill · 荧光胶囊 UI 风格模板

## 设计语言

本模板采用**新粗犷主义仪表盘**（Neo-Brutalist Dashboard）风格，将瑞士国际主义排版的严谨秩序与当代 SaaS 产品的极简交互相融合。设计以超大圆角容器（Pill-shaped Cards）、高对比度明暗分区（Light/Dark Panels）、荧光黄绿强调色（Accent Lime）与极致粗体排版构建信息层级。整体视觉通过"浅色信息面板 + 深色任务面板"的明暗节奏交替实现叙事张力，辅以极小号全大写标签系统（Micro-label System）营造出精密仪器般的专业感。页面底色采用蓝灰调冷色纸面（`#f1f4f9`），所有卡片以纯白浮层承载信息，荧光黄绿色（`#dfff1b`）作为唯一强调色贯穿进度条、标签与按钮，形成视觉记忆锚点。

### 关键词

`超大圆角` `荧光黄绿` `明暗分区` `粗体层级` `全大写标签` `冷调灰蓝` `仪器精密感` `毛玻璃导航` `头像堆叠`

---

## 配色方案

### 七色角色系统

| 角色 | 色值 | Tailwind Token | 用途说明 |
|------|------|----------------|----------|
| **主色 Primary** | `#0F172A` | `slate-900` | 品牌标识背景、深色面板背景、主按钮底色、标题文字、核心交互元素 |
| **强调色 Accent** | `#DFFF1B` | 自定义 `accent-lime` | 进度条填充、活跃标签背景、CTA 按钮背景、闪电图标着色、状态徽章 |
| **背景色 Background** | `#F1F4F9` | 自定义（近 `slate-100`） | 页面全局底色，冷调蓝灰纸面质感 |
| **表面色 Surface** | `#FFFFFF` | `white` | 卡片容器、输入区域、详情面板、弹出层背景 |
| **深色面 Dark Surface** | `#1A1A1A` | 自定义（近 `neutral-900`） | 深色任务面板背景、毛玻璃深色层 |
| **危险色 Danger** | `#F43F5E` | `rose-500` | 错误提示文字、阻塞状态标识 |
| **中性辅助 Neutral** | `#94A3B8` | `slate-400` | 次级标签文字、占位符文字、弱辅助信息 |

### 辅助色阶

| 用途 | 色值 | Token |
|------|------|-------|
| 标题文字 | `#0F172A` | `slate-900` |
| 正文描述 | `#334155` | `slate-700` |
| 二级描述 | `#64748B` | `slate-500` |
| 弱辅助标签 | `#94A3B8` | `slate-400` |
| 最弱提示 / 占位符 | `#CBD5E1` | `slate-300` |
| 卡片边框 | `#F1F5F9` | `slate-100` |
| 输入区域背景 | `#F8FAFC` | `slate-50` |
| 导航栏背景 | `rgba(226,232,240,0.5)` | `slate-200/50` |
| 深色面板内二级背景 | `rgba(80,102,128,0.1)` | `[#506680]/10` |
| 深色面板内嵌套背景 | `rgba(30,41,59,0.4)` | `slate-800/40` |
| 深色面板内文字 | `#CBD5E1` | `slate-300` |
| 深色面板内标签 | `#94A3B8` | `slate-400` |
| 文字选中态 | `#ECFCCB` | `lime-200`（`selection:bg-lime-200`） |

### 渐变

- **头像回退渐变**：`linear-gradient(135deg, hsl(H1, 70%, 80%), hsl(H2, 70%, 60%))`，基于用户名哈希生成色相，H2 = H1 + 40
- **导航栏毛玻璃**：`bg-slate-200/50` + `backdrop-blur-sm` + `border border-white`，半透明模糊效果

---

## ECharts 主题样式

以下为项目图表的 ECharts 主题配置规范。

### 全局配置

```json
{
  "backgroundColor": "transparent",
  "textStyle": {
    "fontFamily": "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    "color": "#64748B"
  }
}
```

### 调色板（seriesColors）

```
系列1:  #10B981  (emerald-500，完成态)
系列2:  #3B82F6  (blue-500，进行中)
系列3:  #EF4444  (red-500，阻塞态)
系列4:  #F59E0B  (amber-500，备用)
系列5:  #6366F1  (indigo-500，工作量柱状)
```

### 饼图（Pie / Doughnut）

```
内半径:          60 (环形图)
外半径:          80
扇区间距:        paddingAngle: 5
标签:            不显示 label，依赖 legend
图例位置:        bottom，水平排列
图例文字:        fontSize: 12, color: #64748B
```

### 柱状图（Bar - 水平）

```
柱体颜色:        #6366F1 (indigo-500)
柱体宽度:        barWidth: 20
圆角:            barBorderRadius: [0, 4, 4, 0] (右侧圆角)
```

### 坐标轴

```
X 轴:            隐藏 (show: false)
Y 轴:
  类型:          category
  标签宽度:      100px
  标签字号:      12px
  标签颜色:      #64748B
  轴线:          隐藏
  刻度:          隐藏
```

### 网格线

```
方向:            仅水平线 (splitLine on yAxis only)
线型:            虚线 (type: 'dashed', dashOffset: 3)
颜色:            #F1F5F9 (slate-100)
```

### Tooltip

```
触发方式:        axis (柱状图) / item (饼图)
背景色:          #FFFFFF
边框:            none
圆角:            16px
阴影:            0 10px 30px rgba(0,0,0,0.08)
文字颜色:        #0F172A
光标填充色:      #F1F5F9 (柱状图 hover 背景)
```

### 图表容器

```
外容器背景:      #FFFFFF
内边距:          24px (p-6)
圆角:            16px (rounded-2xl)
边框:            1px solid #F1F5F9 (slate-100)
投影:            shadow-sm
高度:            256px (h-64)
```

---

## 字体排版

### 字体栈

```css
font-family: 'Plus Jakarta Sans', 'Noto Sans SC', sans-serif;
```

- **西文主字体**：Plus Jakarta Sans（Google Fonts），权重 300-800
- **中文主字体**：Noto Sans SC（思源黑体），权重 300-900
- **回退**：系统 sans-serif

### 字号层级

| 层级 | 类名 | 尺寸 | 字重 | 字距 | 用途 |
|------|------|------|------|------|------|
| Display | `text-4xl` | 36px | `font-black` (900) | `tracking-tight` (-0.025em) | 页面主标题（团队名称） |
| H1 | `text-4xl` | 36px | `font-extrabold` (800) | — | 指标卡大数字、团队健康状况 |
| H2 | `text-2xl` | 24px | `font-black` (900) | `tracking-tight` | 输入区标题、任务详情 ID |
| H3 | `text-xl` | 20px | `font-extrabold` (800) / `font-bold` (700) | — | 深色面板区块标题、百分比 |
| H4 | `text-lg` | 18px | `font-bold` (700) | — | 详情面板数据、描述正文 |
| Body | `text-lg` | 18px | `font-normal` (400) | `leading-relaxed` | 描述正文段落 |
| Body-sm | `text-sm` | 14px | `font-bold` (700) | — | 任务负责人名、按钮文字 |
| Caption | `text-xs` | 12px | `font-bold` (700) / `font-medium` (500) | — | 副标题说明、进度条标签 |
| Micro | `text-[10px]` | 10px | `font-black` (900) / `font-bold` (700) | `tracking-widest` (0.1em) + `uppercase` | 全大写标签系统、状态标签、时间标注 |

### 排版特征

- **字重偏好**：极大量使用 `font-black`（900）与 `font-extrabold`（800），`font-bold`（700）作为基础文字字重。几乎不出现 `font-normal`（400），仅用于输入文本与描述段落
- **全大写标签系统**：所有类别标签、时间标注、辅助说明均使用 `uppercase` + `tracking-widest` + `text-[10px]` + `font-black`/`font-bold` 组合，是本风格的核心识别特征
- **文字选中态**：`selection:bg-lime-200`，使用荧光黄绿色高亮选中文字
- **超宽字距标签**：辅助文字 `tracking-[0.2em]`，营造精密仪器感
- **紧凑字距标题**：`tracking-tight` / `tracking-tighter`，大标题收紧字距增强力量感

---

## 页面结构

### 整体布局

```
最大宽度:       max-w-7xl (1280px)
水平居中:       mx-auto
水平内边距:     px-4 md:px-10 (16px / 40px)
垂直内边距:     py-10 (40px)
页面底色:       bg-[#f1f4f9]
```

### 垂直结构

```
┌─────────────────────────────────────────────────────┐
│  Header (mb-12)                                     │
│  ┌─ 左侧: 品牌图标(slate-900圆角方块) + 标题          │
│  └─ 右侧: 导航按钮组(毛玻璃胶囊) + 用户头像           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ◆ 未解析状态: 输入面板 (max-w-4xl, 居中)             │
│  ┌─────────────────────────────────────────────┐    │
│  │  标题 + 示例数据按钮                          │    │
│  │  ┌───────────────────────────────────┐      │    │
│  │  │  textarea 大面积输入区域            │      │    │
│  │  │  (h-96, bg-slate-50, 超大圆角)     │      │    │
│  │  └───────────────────────────────────┘      │    │
│  │  [全宽 CTA 按钮: slate-900 → 荧光闪电图标]    │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ◆ 已解析状态:                                      │
│                                                     │
│  Section 1: 4列指标卡网格 (mb-8)                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│  │总任务 │ │完成率 │ │平均时长│ │团队健康│              │
│  │+头像叠│ │+进度条│ │      │ │+标签组│              │
│  └──────┘ └──────┘ └──────┘ └──────┘              │
│                                                     │
│  Section 2: 深色任务面板 (mb-12)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  bg-[#1a1a1a] 深色面板                       │   │
│  │  标题 + 筛选标签组                            │   │
│  │  ┌──────────┐  ┌──────────────────────┐     │   │
│  │  │ 任务列表  │  │ 任务详情面板           │     │   │
│  │  │ (可滚动)  │  │ (lg:w-3/5)           │     │   │
│  │  │ 头像+状态 │  │ ID + 分类 + 优先级    │     │   │
│  │  │          │  │ + 描述 + 负责人        │     │   │
│  │  └──────────┘  └──────────────────────┘     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Section 3: 浅色任务面板 (mb-12)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  bg-white 浅色面板 (同结构，浅色配色)          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 网格系统

| 区域 | 桌面端 | 平板端 | 移动端 | 间距 |
|------|--------|--------|--------|------|
| 指标卡 | 4列 `lg:grid-cols-4` | 2列 `md:grid-cols-2` | 1列 | `gap-6` (24px) |
| 任务面板内部 | 左列表 + 右详情 `lg:flex-row` | 纵向堆叠 | 纵向堆叠 | `gap-4` (16px) |
| 详情面板属性格 | 2列 `grid-cols-2` | 2列 | 2列 | `gap-4` (16px) |

---

## 视觉风格

### 圆角体系

| 元素 | 圆角值 | Tailwind 类名 | 说明 |
|------|--------|---------------|------|
| 输入面板 / 主容器 | 40px | `rounded-[2.5rem]` | 超大圆角容器，视觉焦点 |
| 指标卡片 / 任务面板 | 32px | `rounded-invoice` (自定义 `2rem`) | 统一卡片圆角 |
| 品牌图标 | 16px | `rounded-2xl` | 方形图标容器 |
| 任务列表条目 / 详情面板 | 24px | `rounded-[1.5rem]` | 列表项胶囊卡片 |
| 详情面板嵌套属性卡 | 16px | `rounded-2xl` | 嵌套信息卡 |
| 输入框 textarea | 32px | `rounded-[2rem]` | 与容器呼应 |
| CTA 按钮 / 标签 / 导航按钮 | 50% | `rounded-full` | 全圆角胶囊形 |
| 头像 | 50% | `rounded-full` | 圆形头像 |
| 进度条轨道 / 填充 | 50% | `rounded-full` | 圆角进度条 |
| 滚动条拇指 | 10px | `border-radius: 10px` | 自定义滚动条 |

### 投影体系

| 场景 | 投影值 | 说明 |
|------|--------|------|
| 品牌图标 | `shadow-lg shadow-slate-200` | 带色彩的柔和光晕 |
| 输入面板 | `shadow-2xl shadow-slate-200` | 主容器深度浮层投影 |
| CTA 主按钮 | `shadow-2xl shadow-slate-300` | 按钮深度投影，hover 态 `-translate-y-1` 上浮 |
| 按钮 (accent-lime) | `shadow-lg shadow-lime-200/20` | 荧光黄绿色光晕投影 |
| 用户头像 | `shadow-md` | 中等头像投影 |
| 指标卡片 | `shadow-sm` | 轻微浮层 |
| 深色面板 | `shadow-2xl` | 深色区块立体感 |
| 浅色详情嵌套卡 | `shadow-sm` | 嵌套卡轻浮层 |
| 浅色任务选中态 | `shadow-sm shadow-slate-200` | 选中条目轻浮层 |

### 边框

```
指标卡 / 浅色面板:     1px solid slate-100 (border border-slate-100)
输入面板:              1px solid slate-100 (border border-slate-100)
浅色详情面板:          1px solid slate-100 (border border-slate-100)
浅色嵌套属性卡:        1px solid slate-200 (border border-slate-200)
深色详情面板:          1px solid slate-800 (border border-slate-800)
深色面板内分割线:      border-t slate-800
浅色面板内分割线:      border-t slate-200
导航毛玻璃胶囊:       1px solid white (border border-white)
头像:                 2px solid white (border-2 border-white)
深色任务条目状态标签:  1px solid slate-700/50 (border border-slate-700/50)
```

### 毛玻璃效果

```
导航按钮组:     bg-slate-200/50 + backdrop-blur-sm + border border-white
深色面板:       glass-dark = bg-rgba(26,26,26,0.95) + backdrop-filter: blur(10px)
```

### 自定义滚动条

```
宽度:           4px
拇指颜色:       #CBD5E1 (slate-300)
拇指圆角:       10px
轨道:           透明
```

### 动画与过渡

```
入场动画 (输入面板):    animate-in slide-in-from-bottom duration-500
入场动画 (结果面板):    animate-in fade-in zoom-in-95 duration-700
导航按钮 hover:        transition-all (默认 150ms)
CTA 按钮 hover:        hover:-translate-y-1 (上浮 4px)
CTA 按钮 active:       active:scale-95 (按压缩小)
更新按钮 hover:        hover:scale-105 + transition-transform
更新按钮 active:       active:scale-95
头像叠层 hover:        hover:scale-110 + transition-transform
加载旋转:              animate-spin
```

---

## 组件规范

### Header（顶部导航）

```
布局:           flex flex-col md:flex-row, items-center, justify-between
底部间距:       mb-12
品牌图标:       w-12 h-12, bg-slate-900, rounded-2xl, text-white
                shadow-lg shadow-slate-200, flex items-center justify-center
品牌标题:       text-4xl font-black text-slate-900 tracking-tight
左侧间距:       space-x-6
导航按钮组:     bg-slate-200/50, p-1.5, rounded-full
                border border-white, backdrop-blur-sm
单个按钮:       w-10 h-10, rounded-full, text-slate-600
                hover:bg-white, transition-all
                Font Awesome 图标 text-sm
用户头像:       size="lg" (w-12 h-12), border-2 border-white, shadow-md
```

### InputPanel（输入面板）

```
容器:           max-w-4xl mx-auto, bg-white, rounded-[2.5rem]
                p-12, shadow-2xl shadow-slate-200
                border border-slate-100
                animate-in slide-in-from-bottom duration-500
标题:           text-2xl font-black text-slate-900 tracking-tight
示例按钮:       text-[10px] font-black text-slate-400
                hover:text-slate-900, uppercase tracking-[0.2em]
输入框:         w-full h-96, p-8, rounded-[2rem]
                bg-slate-50, border-none
                focus:ring-4 focus:ring-slate-100
                text-lg text-slate-700 leading-relaxed
                placeholder:text-slate-300, resize-none
错误提示:       text-rose-500 font-bold text-center
CTA 按钮:       w-full py-6 rounded-full font-black text-xl
                flex items-center justify-center space-x-4
  正常态:       bg-slate-900 text-white shadow-2xl shadow-slate-300
                hover:bg-black hover:-translate-y-1
                active:scale-95
  禁用态:       bg-slate-200 text-slate-400 cursor-not-allowed shadow-none
  闪电图标:     text-accent-lime (#DFFF1B)
```

### SummaryCard（指标卡片）

```
容器:           bg-white, p-8, rounded-invoice (2rem)
                shadow-sm, border border-slate-100
                flex flex-col justify-between
标签:           text-slate-400 text-[10px] font-black
                uppercase tracking-widest, mb-4
大数字:         text-4xl font-extrabold text-slate-900 mb-1
副标题:         text-slate-400 text-xs font-medium
头像叠层:       mt-8, flex items-center -space-x-3
  单个头像:     size="sm" (w-8 h-8), hover:z-10 hover:scale-110
  溢出指示:     w-8 h-8 rounded-full bg-slate-100 border-2 border-white
                text-[10px] font-bold text-slate-500
进度条轨道:     mt-8 h-2 bg-slate-100 rounded-full overflow-hidden
进度条填充:     h-full accent-lime (#DFFF1B)
标签组:         mt-8, flex space-x-2
  深色标签:     px-3 py-1 bg-slate-900 text-white text-[10px]
                font-bold rounded-full uppercase
  亮色标签:     px-3 py-1 accent-lime text-slate-900 text-[10px]
                font-bold rounded-full uppercase
图标按钮:       bg-slate-100 p-2 rounded-full h-8 w-8
                flex items-center justify-center
                icon text-[10px]
```

### TaskList（任务面板）

```
◆ 深色模式 (isDark=true):
外容器:         bg-[#1a1a1a], p-2, rounded-invoice (2rem)
                shadow-2xl, overflow-hidden
标题:           text-xl font-extrabold text-white
筛选标签组:     flex space-x-2
  默认标签:     px-4 py-1.5 rounded-full text-xs font-bold
                bg-slate-800 text-slate-300
  活跃标签:     accent-lime text-slate-900

◆ 浅色模式 (isDark=false):
外容器:         bg-white, p-6, rounded-invoice (2rem)
                border border-slate-200
标题:           text-xl font-extrabold text-slate-900
筛选标签组:
  默认标签:     bg-slate-100 text-slate-600
  活跃标签:     bg-indigo-600 text-white

◆ 共用结构:
布局:           flex flex-col lg:flex-row, gap-4, h-[600px]
列表区:         flex-1, overflow-y-auto, space-y-2, custom-scrollbar
详情区:         lg:w-3/5, rounded-[1.5rem], p-8
```

### TaskItem（任务条目）

```
容器:           p-4, rounded-[1.5rem], flex items-center justify-between
                cursor-pointer, transition-all
  深色选中:     bg-slate-500/20
  浅色选中:     bg-slate-100 shadow-sm shadow-slate-200
  未选中hover:  hover:bg-slate-800/10
头像:           size="md" (w-10 h-10)
姓名:           text-sm font-bold (白色 / slate-900)
时间标注:       text-slate-500 text-[10px] font-bold uppercase tracking-tighter
状态标签:       px-3 py-1 rounded-full text-[10px] font-bold uppercase
  选中态:       bg-white text-slate-900
  未选中态:     text-slate-500 border border-slate-700/50
```

### TaskDetail（任务详情面板）

```
◆ 深色模式:
容器:           bg-[#506680]/10, border border-slate-800, rounded-[1.5rem], p-8
标签:           text-[10px] font-bold uppercase tracking-widest text-slate-400
标题:           text-2xl font-black text-white
属性卡:         p-6 rounded-2xl bg-slate-800/40
属性标签:       text-[10px] font-bold uppercase text-slate-500
属性值:         text-lg font-bold text-white
描述文字:       text-lg leading-relaxed text-slate-300
底部分割线:     border-t border-slate-800

◆ 浅色模式:
容器:           bg-slate-50, border border-slate-100, rounded-[1.5rem], p-8
标签:           text-slate-500
标题:           text-slate-900
属性卡:         bg-white border border-slate-200 shadow-sm
属性值:         text-slate-900
描述文字:       text-slate-700
底部分割线:     border-t border-slate-200

◆ CTA 按钮:
样式:           accent-lime text-slate-900 px-8 py-3 rounded-full
                font-bold text-sm
                hover:scale-105 active:scale-95
                shadow-lg shadow-lime-200/20
                transition-transform
```

### Avatar（头像组件）

```
容器:           relative inline-flex items-center justify-center
                rounded-full, border-2 border-white, shadow-sm
                overflow-hidden, bg-white, shrink-0
尺寸:
  sm:           w-8 h-8, text-[10px]
  md:           w-10 h-10, text-xs
  lg:           w-12 h-12, text-sm
  xl:           w-16 h-16, text-base
图片:           w-full h-full object-cover
回退文字:       font-bold text-slate-800 tracking-tighter
                背景为基于名称哈希的线性渐变
中文首字符:     取第一个字符
英文首字母:     取每个词首字母，最多 2 个，大写
```

### Badge / Label（胶囊标签）

```
◆ 深色标签:
样式:           px-3 py-1 bg-slate-900 text-white
                text-[10px] font-bold rounded-full uppercase

◆ 荧光标签:
样式:           px-3 py-1 accent-lime (#DFFF1B) text-slate-900
                text-[10px] font-bold rounded-full uppercase

◆ 筛选标签:
样式:           px-4 py-1.5 rounded-full text-xs font-bold
```

---

## 响应式断点

| 断点 | 前缀 | 阈值 | 适配策略 |
|------|------|------|----------|
| 移动端 | (默认) | < 768px | 单列堆叠；Header 纵向排列；内边距 `px-4`(16px)；任务面板内列表与详情纵向堆叠 |
| 平板端 | `md:` | >= 768px | Header 横向排列 `md:flex-row`；内边距升至 `md:px-10`(40px)；指标卡 2 列 `md:grid-cols-2` |
| 桌面端 | `lg:` | >= 1024px | 指标卡 4 列 `lg:grid-cols-4`；任务面板横向分栏 `lg:flex-row`；详情面板占 `lg:w-3/5` |

### 关键响应式变化

- Header 布局：`flex-col` -> `md:flex-row`，品牌标题下方间距 `mb-6` -> `md:mb-0`
- 页面水平内边距：`px-4`(16px) -> `md:px-10`(40px)
- 指标卡网格：1列 -> `md:grid-cols-2` -> `lg:grid-cols-4`
- 任务面板内部：纵向堆叠 `flex-col` -> `lg:flex-row`
- 内容最大宽度始终为 `max-w-7xl`（1280px），配合水平内边距两侧留白
- 输入面板最大宽度 `max-w-4xl`（896px），始终居中

---

## 风格建议

1. **圆角一致性**：本风格的核心识别特征是超大圆角，任何新增卡片组件圆角不应低于 `1.5rem`（24px）。外层容器保持 `2rem`-`2.5rem` 区间，内嵌元素使用 `rounded-2xl`（16px），交互元素统一使用 `rounded-full`。避免使用 `rounded-md` 或直角。

2. **荧光黄绿的克制使用**：`accent-lime`（`#DFFF1B`）是唯一的强调色，仅用于进度条、活跃状态标签、CTA 按钮与闪电图标。每个视区内出现不超过 3 处荧光色点缀。切勿将其用于大面积背景或文字色。

3. **明暗节奏交替**：页面通过"浅色卡片区 -> 深色面板区 -> 浅色面板区"的节奏制造视觉张力。每页应至少包含一个 `bg-[#1a1a1a]` 深色区块。深色区块内部使用 `slate-300`/`slate-400`/`white` 三级文字层级。

4. **全大写标签系统**：所有辅助性标签必须遵循 `uppercase` + `tracking-widest` + `text-[10px]` + `font-black` 的组合。这是本风格的强识别特征，新增组件中的分类标签、时间标注、状态说明均应采用此模式。

5. **字重纪律**：该风格几乎不使用 `font-normal`（400），最低字重为 `font-medium`（500）且仅用于副标题描述。标题级使用 `font-black`（900）或 `font-extrabold`（800），正文级使用 `font-bold`（700）。轻字重会破坏精密仪器感。

6. **投影层级**：主容器使用 `shadow-2xl` + 色彩投影（如 `shadow-slate-200`），普通卡片使用 `shadow-sm`，交互按钮使用 `shadow-lg` + 色彩光晕（如 `shadow-lime-200/20`）。投影颜色应与元素背景色呼应，避免纯黑投影。

7. **导航毛玻璃效果**：导航按钮组使用 `bg-slate-200/50` + `backdrop-blur-sm` + `border-white` 的毛玻璃组合。新增浮动工具栏或弹出菜单可复用此模式。

8. **头像叠层模式**：多人头像使用 `-space-x-3` 负间距叠层 + `border-2 border-white` 白色描边。超出 4 人时使用浅灰色圆形 `+N` 指示器。此模式可复用于任何需要展示团队成员的场景。

9. **交互态设计**：按钮交互以物理运动为隐喻 -- hover 时 `-translate-y-1` 上浮或 `scale-105` 放大，active 时 `scale-95` 按压缩小。列表条目交互以背景色渐变为主，深色面板使用 `bg-slate-500/20` 选中高亮。

10. **ECharts 图表融入**：图表容器使用白色背景 + `rounded-2xl` + `shadow-sm` + `border slate-100`，与指标卡片视觉统一。图表内部配色使用 emerald/blue/red/amber 功能色系列，避免引入主题外的色彩。Tooltip 使用 16px 圆角与柔和投影，与卡片风格统一。
