# Bold Capsule · 胶囊潮流 UI 风格模板

## 设计语言 (Design Language)

| 维度 | 描述 |
|------|------|
| **美学方向** | 大圆角胶囊形态 + 高饱和撞色 + 超粗字重排版，融合欧式品牌海报与现代 SaaS 仪表盘风格 |
| **视觉签名** | 2.5rem 超大圆角卡片（`rounded-card`）、荧光绿强调色、胶囊导航栏、斜体粗黑标题尾缀句号 |
| **情绪基调** | 自信、活力、潮流感——视觉张力强烈，信息密度适中，留白充裕 |

---

## 配色方案 (Color Scheme)

### 七色角色系统

| 角色 | 色值 | Tailwind 写法 | 用途 |
|------|------|---------------|------|
| **bg** | `#F8F9FA` | `bg-[#F8F9FA]` | 全局页面背景 |
| **surface** | `#FFFFFF` | `bg-white` | 卡片、表格、弹窗面板 |
| **header** | `#5030E5` | `bg-[#5030E5]` | 主品牌色，导航激活态、标题强调、主按钮 |
| **text** | `#1A1A1A` | `text-[#1A1A1A]` | 主要正文、大标题 |
| **textMuted** | `#94A3B8` | `text-slate-400` | 次要说明文字、表头标签 |
| **accent** | `#98FF00` | `bg-[#98FF00]` | 荧光绿强调色，成功状态、CTA 按钮、数据高亮 |
| **border** | `#F1F5F9` / `rgba(255,255,255,0.4)` | `border-slate-100` / `border-white/40` | 卡片描边、分隔线 |

### 辅助色板

| 名称 | 色值 | 用途 |
|------|------|------|
| **橙色** | `#F18721` | 次级品牌色，功能区块背景、日期标签 |
| **粉色** | `#FF4E8D` | 图表数据色 |
| **青色** | `#00D1FF` | 图表数据色 |
| **渐变紫** | `linear-gradient(135deg, #5030E5 0%, #7B61FF 100%)` | 文字渐变（`.text-gradient`） |
| **深黑** | `#1A1A1A` | 页脚背景、深色文本 |

### 图表色序

```js
const COLORS = ['#5030E5', '#F18721', '#98FF00', '#FF4E8D', '#00D1FF'];
//               紫(主色)    橙        荧光绿      粉红       青
```

---

## ECharts 主题样式

### 配色序列

| 序号 | HEX | 色名 |
|-----|-----|-----|
| 1 | #5030E5 | 紫（主色） |
| 2 | #F18721 | 橙 |
| 3 | #98FF00 | 荧光绿 |
| 4 | #FF4E8D | 粉红 |
| 5 | #00D1FF | 青 |

### ECharts 全局 BASE_OPTION

```js
const PRIMARY = '#5030E5';
const GRID_COLOR = '#f1f5f9';   // slate-100，用于网格线
const TEXT_COLOR = '#94a3b8';   // slate-400，用于坐标轴标签

const BASE_OPTION = {
  color: ['#5030E5', '#F18721', '#98FF00', '#FF4E8D', '#00D1FF'],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Plus Jakarta Sans, PingFang SC, sans-serif',
    color: '#94a3b8'
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
      color: '#94a3b8',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'Plus Jakarta Sans'
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'Plus Jakarta Sans'
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 24,
    padding: 16,
    shadowBlur: 20,
    shadowOffsetY: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: {
      fontFamily: 'Plus Jakarta Sans',
      color: '#1A1A1A',
      fontSize: 12,
      fontWeight: 700
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: '#f8fafc'
      }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Plus Jakarta Sans',
      color: '#94a3b8',
      fontSize: 12,
      fontWeight: 700
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
{
  type: 'bar',
  barWidth: 50,
  itemStyle: {
    borderRadius: [12, 12, 12, 12]            // 全圆角胶囊柱
  }
}
```

**line（折线图）**
```js
{
  type: 'line',
  smooth: true,
  lineStyle: { width: 3 },
  symbol: 'circle',
  symbolSize: 6
}
```

**pie（饼图/环形图）**
```js
{
  type: 'pie',
  radius: ['45%', '60%'],
  padAngle: 2,
  itemStyle: { borderWidth: 0, borderRadius: 8 },
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
  axisLine: { lineStyle: { color: '#f1f5f9' } },
  splitLine: { lineStyle: { color: '#f1f5f9' } }
}
```

**scatter（散点图）**
```js
{
  type: 'scatter',
  symbolSize: 10,
  itemStyle: {
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
}
```

### 图表容器

| 属性 | 值 | 说明 |
|-----|---|-----|
| 容器背景 | `bg-white` | 白色卡片 |
| 圆角 | `rounded-card` (40px) | 超大圆角 |
| 边框 | `border border-slate-100` | 1px 浅灰边框 |
| 阴影 | `shadow-sm` | 轻微浮层 |
| 内边距 | `p-10`（40px） | 大内边距 |
| 标题 | `text-xl font-black mb-8 italic` | 粗黑斜体 |
| 图表高度 | `h-72`（288px） | 标准高度 |

---

## 字体排版 (Typography)

### 字体族

```css
font-family: 'Plus Jakarta Sans', 'PingFang SC', sans-serif;
```

### 文字层级

| 层级 | 尺寸 | 字重 | 行高 | 附加样式 | 用途 |
|------|------|------|------|----------|------|
| **Display** | `text-[5rem]` (80px) | `font-extrabold` (800) | `leading-[0.9]` | `tracking-tighter` | 首屏主标题 |
| **H1** | `text-[4rem]` (64px) | `font-black` (900) | `leading-[0.9]` | `italic tracking-tighter` | 表单区大标题 |
| **H2** | `text-[3.5rem]` (56px) | `font-black` (900) | — | `italic tracking-tighter text-[#5030E5]` | 页面板块标题 |
| **H3** | `text-[3rem]` (48px) | `font-black` (900) | — | `tracking-tighter italic text-[#5030E5]` | 管理面板标题 |
| **Title** | `text-4xl` (36px) | `font-extrabold` | — | — | 卡片区块大标题 |
| **Subtitle** | `text-2xl` (24px) | `font-black` | — | — | 日程卡标题 |
| **Section** | `text-xl` (20px) | `font-black` / `font-bold` | — | `italic` | 卡片内标题 |
| **Body** | `text-sm` (14px) | `font-bold` / `font-medium` | `leading-relaxed` | — | 正文内容、消息气泡 |
| **Caption** | `text-xs` (12px) | `font-black` | — | `uppercase tracking-widest` / `tracking-[0.2em]` | 标签、表头、分类名 |
| **Micro** | `text-[10px]` | `font-black` / `font-bold` | — | `uppercase tracking-widest` | 极小标注、页脚链接 |

### 排版特征

- 标题常用斜体（`italic`）并以英文句号结尾（如 "活动亮点."）
- 标签文字统一使用 `uppercase tracking-widest font-black` 大写间距样式
- 数字展示使用 `font-mono` 等宽字体
- 数据指标数字使用 `text-3xl` ~ `text-5xl` + `font-black`

---

## 页面结构 (Page Structure)

```
┌─────────────────────────────────────────────────────┐
│ [胶囊浮动导航] fixed top-6 居中                       │
│  bg-white/70 backdrop-blur-xl rounded-full           │
│  Logo(紫底白字方块) + 4个pill按钮                      │
├─────────────────────────────────────────────────────┤
│ [主内容区] max-w-7xl mx-auto px-6 pt-28              │
│                                                      │
│  ┌─────────┬───────────────┐                        │
│  │ 文字卡片 │   图片主视觉    │  12列网格 5:7 比例    │
│  │ (白底)   │   (紫底覆盖)    │                      │
│  └─────────┴───────────────┘                        │
│                                                      │
│  ┌──────────┬─────┬─────┐                           │
│  │ 功能说明  │icon │数据  │  4列网格 2:1:1 比例      │
│  │ (橙色底)  │卡片 │卡片  │                          │
│  └──────────┴─────┴─────┘                           │
│                                                      │
│  ┌───┬───┬───┬───┐                                  │
│  │高亮│高亮│高亮│高亮│  4列等宽网格                    │
│  │卡片│卡片│卡片│卡片│  轮换色: 紫/灰浅/灰深/荧光绿    │
│  └───┴───┴───┴───┘                                  │
├─────────────────────────────────────────────────────┤
│ [页脚] bg-[#1A1A1A] py-20                            │
│  Logo + 简介 | 3列链接导航 | 版权信息                  │
├─────────────────────────────────────────────────────┤
│ [AI 浮窗] fixed bottom-10 right-10                   │
│  折叠: 紫色圆形按钮 w-16 h-16                         │
│  展开: 白底圆角面板 w-80~w-96 rounded-[2rem]          │
└─────────────────────────────────────────────────────┘
```

---

## 视觉风格 (Visual Style)

### 间距系统

| 层级 | 值 | 用途 |
|------|-----|------|
| **页面外边距** | `px-6` (24px) | 主内容区水平内边距 |
| **区块间距** | `space-y-10` (40px) | 主区块垂直间距 |
| **卡片内边距** | `p-10` (40px) / `p-8` (32px) | 大卡片 / 中卡片 |
| **网格间隙** | `gap-6` (24px) / `gap-4` (16px) | 主网格 / 子网格 |
| **组件内间距** | `space-x-6` (24px) / `space-x-3` (12px) | 水平组件组 |
| **紧凑间距** | `space-y-2` (8px) | 表单标签与输入框 |
| **导航项间距** | `space-x-6` (24px) | 导航按钮之间 |

### 圆角系统

| 类型 | 值 | 用途 |
|------|-----|------|
| **超大卡片** | `rounded-card` = `border-radius: 2.5rem` (40px) | 主要内容卡片、功能面板 |
| **大圆角** | `rounded-[2rem]` (32px) | 统计块、AI聊天面板、数据卡片 |
| **胶囊输入框** | `rounded-[1.5rem]` (24px) | 表单输入框、消息气泡 |
| **导航/按钮** | `rounded-full` | 导航栏、按钮、头像标签 |
| **Logo 方块** | `rounded-lg` (8px) / `rounded-xl` (12px) | 品牌标识 |
| **进度条** | `rounded-full` | 数据进度条 |
| **图表 Bar** | `radius={[12,12,12,12]}` | 柱状图圆角 |

### 阴影系统

| 类型 | 值 | 用途 |
|------|-----|------|
| **轻阴影** | `shadow-sm` | 白底卡片 |
| **导航阴影** | `shadow-lg shadow-purple-500/5` | 浮动导航栏（紫色光晕） |
| **强调阴影** | `shadow-xl` | 装饰元素、CTA按钮 |
| **深阴影** | `shadow-2xl` | AI浮窗面板、FAB按钮 |
| **按钮绿阴影** | `shadow-xl shadow-green-900/10` | 荧光绿提交按钮 |
| **悬停提升** | `hover:shadow-lg` | 卡片悬停交互 |
| **tooltip 阴影** | `0 20px 25px -5px rgba(0,0,0,0.1)` | 图表tooltip |

### 毛玻璃效果

```
导航栏: bg-white/70 backdrop-blur-xl
图片标签: bg-white/20 backdrop-blur
深色信息栏: bg-black/20 backdrop-blur
```

---

## 组件规范 (Component Specs)

### 按钮

| 类型 | 样式 |
|------|------|
| **主按钮（CTA）** | `bg-[#98FF00] text-black py-6 rounded-full font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-900/10` |
| **导航激活** | `bg-[#5030E5] text-white shadow-md px-4 py-1.5 rounded-full text-sm font-bold` |
| **导航默认** | `text-slate-500 hover:text-[#5030E5] px-4 py-1.5 rounded-full text-sm font-bold` |
| **次要按钮** | `bg-white border-2 border-slate-200 rounded-full py-4 px-6 font-bold hover:bg-slate-50` |
| **功能按钮** | `bg-slate-100 hover:bg-slate-200 text-black text-xs font-black px-6 py-3 rounded-full uppercase tracking-widest` |
| **页脚按钮** | `bg-[#98FF00] text-black font-black text-xs px-6 py-3 rounded-full hover:scale-105 uppercase tracking-widest` |
| **禁用态** | `disabled:opacity-70` |

### 卡片

| 类型 | 样式 |
|------|------|
| **白底卡片** | `bg-white rounded-card p-10 shadow-sm border border-slate-100` |
| **紫色卡片** | `bg-[#5030E5] text-white rounded-card p-10 shadow-lg` |
| **橙色卡片** | `bg-[#F18721] text-white rounded-card p-10` |
| **荧光绿卡片** | `bg-[#98FF00] rounded-card p-8` |
| **中性卡片** | `bg-slate-50 p-6 rounded-[2rem]` / `bg-slate-100` / `bg-slate-200` |
| **悬停翻色卡片** | `bg-slate-50 rounded-[2rem] hover:bg-[#5030E5] hover:text-white transition-all` |
| **悬停缩放卡片** | `hover:scale-[1.02] transition-all` |

### 表单输入

| 类型 | 样式 |
|------|------|
| **暗底输入框** | `bg-white/10 border-2 border-white/20 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-[#98FF00] text-white placeholder:text-white/30` |
| **浅底输入框** | `bg-transparent border-none px-4 py-2 text-sm font-bold focus:outline-none placeholder:text-slate-400`（嵌套在 `bg-slate-100 p-2 rounded-full` 容器内） |
| **选择按钮组** | 圆形 `w-14 h-14 rounded-full font-black border-2`，选中态 `bg-[#98FF00] border-[#98FF00] text-black scale-110 shadow-lg shadow-green-500/20` |
| **表单标签** | `text-xs font-black uppercase tracking-widest text-blue-300 ml-2` |

### 表格

| 部位 | 样式 |
|------|------|
| **容器** | `bg-white rounded-card shadow-sm border border-slate-100 overflow-hidden` |
| **表头** | `bg-slate-50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black px-10 py-6` |
| **行** | `hover:bg-slate-50 transition-colors` |
| **单元格** | `px-10 py-6`，名称 `font-bold text-slate-800`，标签 `bg-[#5030E5]/5 text-[#5030E5] px-4 py-1.5 rounded-full text-xs font-black` |
| **分隔线** | `divide-y divide-slate-100` |

### AI 浮窗

| 部位 | 样式 |
|------|------|
| **FAB 按钮** | `bg-[#5030E5] text-white w-16 h-16 rounded-full shadow-2xl border-4 border-white hover:scale-110` |
| **面板** | `bg-white rounded-[2rem] shadow-2xl w-80 md:w-96 border border-slate-200` |
| **面板头部** | `bg-[#5030E5] p-6 text-white` |
| **消息区** | `h-[24rem] bg-[#F8F9FA] p-6 space-y-6` |
| **用户消息** | `bg-[#5030E5] text-white rounded-[1.5rem] rounded-tr-none px-5 py-3 text-sm font-medium shadow-sm` |
| **bot消息** | `bg-white text-slate-700 border border-slate-100 rounded-[1.5rem] rounded-tl-none px-5 py-3 text-sm font-medium shadow-sm` |
| **加载动画** | 三个 `w-1.5 h-1.5 bg-[#5030E5] rounded-full animate-bounce` 圆点 |
| **输入区** | `bg-slate-100 p-2 rounded-full` 容器 + 发送按钮 `bg-[#5030E5] rounded-full p-3` |

### 进度条

```
轨道: h-3 bg-white/10 rounded-full
填充: h-full bg-[#98FF00] rounded-full transition-all duration-1000 ease-out
```

### 标识/Logo

```
Logo 方块: bg-[#5030E5] w-7 h-7 rounded-lg rotate-3 (导航) / w-10 h-10 rounded-xl -rotate-6 (页脚)
Logo 文字: text-lg font-extrabold tracking-tighter text-[#5030E5] (导航) / text-3xl font-black tracking-tighter italic (页脚)
```

---

## 响应式断点 (Responsive Breakpoints)

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| **默认 (mobile)** | < 640px | 单列堆叠，`grid-cols-1` |
| **sm** | >= 640px | 亮点卡片 `sm:grid-cols-2`，页脚链接 `sm:grid-cols-3` |
| **md** | >= 768px | 功能区 `md:grid-cols-4`，日程卡 `md:grid-cols-2`，表单 `md:grid-cols-2` |
| **lg** | >= 1024px | 主布局 `lg:grid-cols-12`，亮点 `lg:grid-cols-4`，管理面板 `lg:grid-cols-3` |
| **最大宽度** | `max-w-7xl` (1280px) | 主内容区约束 |
| **AI 浮窗** | `w-80 md:w-96` | 移动端 320px，中屏以上 384px |

---

## 风格建议 (Style Recommendations)

1. **保持超大圆角的统一性**：所有容器级元素使用 `rounded-card`（40px）或 `rounded-[2rem]`（32px），按钮与标签使用 `rounded-full`，确保胶囊形态的视觉一致性贯穿全局，形成鲜明的品牌记忆点。

2. **善用撞色体系构建视觉节奏**：紫色（`#5030E5`）、橙色（`#F18721`）、荧光绿（`#98FF00`）三色交替出现于卡片背景，搭配大面积留白的 `#F8F9FA` 页面底色和白色卡片，在信息密集时依然保持呼吸感与层次感。

3. **以字重与大小写营造力量感**：标题使用 `font-black`（900）+ `italic` + 尾缀句号形成设计语言签名，标签类文字统一使用 `uppercase tracking-widest font-black text-xs` 打造精致的工业感，避免使用常规字重（400以下）作为独立展示元素。
