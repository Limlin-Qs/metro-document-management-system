# 信息可视化场景开发规范（info_viz）

> **本文档是信息可视化场景的权威开发流程规范。** 严格按照下方定义的两个阶段逐步执行，不可跳过或合并任何步骤。

---

## 场景约束

- **布局**: 纯文档流（Header → 章节内容，自然向下排列）。代码层面仍按章节拆分为独立 Section 组件
- **导航**: 无（禁止 Topbar/Sidebar/Footer 导航）
- **功能按钮**: 除翻页控制外，禁止添加任何功能性操作按钮（导出、分享等）

---

## Phase 1: 准备阶段

> 产出物：`AGENTS.md`（包含应用概览 + 需求拆解 + 设计指南）。**AGENTS.md 写入完成前禁止进入 Phase 2。**

### Step 1: 需求分析

<thinking>

##### V-1. 内容深度理解

完整阅读文本，理解：
- **核心主题**：这份文档要传达什么
- **逻辑结构**：章节之间的关系（并列/递进/因果）
- **重点识别**：最重要的1-2个结论或决策
- **是否包含数据**：判断是纯文字还是图文混合

##### V-2. 信息关系识别

识别内容中的**内在关系**，判断是否需要可视化：

| 信息关系 | 特征 | 可视化方式 | 使用条件 |
|---------|-----|-----------|---------|
| 层级递进 | 重要性递减、目标分解 | 金字塔图 | 有明确的3+层级 |
| 流程步骤 | 先后顺序、决策分支 | 流程图 | 有明确的流程节点 |
| 多维对比 | 多方案/多维度 | 矩阵图/对比表格 | >=2个方案 >=3个维度 |
| 因果分析 | 问题归因、原因分解 | 鱼骨图 | 有明确的因果链 |
| 时间序列 | 事件先后、里程碑 | 时间轴 | >=3个时间节点 |
| 组织结构 | 汇报关系、系统架构 | 架构图 | 有明确的层级关系 |
| **无特殊关系** | 叙述、说明、讨论 | **保留文字段落** | 默认 |

**原则**：大部分内容保留文字，只有符合条件的才可视化

##### V-3. 文字层次规划

对于保留文字的内容，通过排版建立层次：

| 层次 | 内容类型 | 排版手段 |
|-----|---------|---------|
| **L1 核心** | 关键结论、重要决策 | 加粗 + 大字号，或引用块高亮 |
| **L2 主体** | 正文叙述、分析说明 | 正常段落，舒适行高 |
| **L3 补充** | 备注、来源、附加信息 | 小字号 + 浅色 |

##### V-4. 数据与图表规划（如包含数据）

**仅当内容包含数据时执行此步骤**

**数据理解**：
- 数据概况：字段、行数、时间范围
- 可分析维度：哪些字段可以做对比/趋势/分布分析

**图表必要性判断**：

| 分析目的 | 是否需要图表 | 理由 |
|---------|------------|-----|
| 展示趋势变化 | 需要 | 折线图比文字描述更直观 |
| 展示占比分布 | 需要 | 饼图/环形图一目了然 |
| 多维度对比 | 需要 | 表格/柱状图更清晰 |
| 单个数值 | 不需要 | 文字中加粗即可 |
| 简单结论 | 不需要 | 直接写结论 |

**图表规划**（仅列出真正需要的）：

| 图表名称 | 图表类型 | 分析目的 | 使用字段 |
|---------|---------|---------|---------|

**配合原则**：
- 文字是主体，承载分析和洞察
- 图表是证据，支撑文字观点
- 先有观点，再用数据佐证

</thinking>

<answer>

##### 输出模板

```markdown
# [项目名称] - 信息可视化需求分析

## 基本信息

- **场景类型**: info_viz
- **文件**: [文件名]（文本/数据/混合）
- **内容类型**: [纯文字/图文混合]
- **界面语言**: [中文/英文]
- **主题偏好**: [浅色/深色]

---

## 内容理解

### 核心主题
[一句话概括文档要传达的核心信息]

### 章节结构
1. [章节1] - [该章节的作用]
2. [章节2] - [该章节的作用]

### 重点内容
- **核心结论**: [最重要的1-2个结论]
- **关键决策**: [需要强调的决策]

---

## 可视化识别

### 需要可视化的内容（仅列出符合条件的）

| 内容位置 | 信息关系 | 可视化方式 | 理由 |
|---------|---------|-----------|-----|
| [章节X] | 层级递进 | 金字塔图 | 有3层目标分解 |
| [章节Y] | 流程步骤 | 流程图 | 有5个审批节点 |

### 保留文字的内容

其他章节保持文字段落形式，通过排版（字号/加粗/引用块）建立层次。

---

## 数据与图表规划（如包含数据）

[仅当内容包含数据时填写此部分]

### 数据概览
- **数据量**: X 行，时间范围: [起始]-[结束]
- **可分析维度**: [字段1], [字段2]

### 图表规划（仅列出真正需要的）
| 图表名称 | 图表类型 | 分析目的 | 为什么需要图表 |
|---------|---------|---------|--------------|

**不需要图表的数据**：[说明哪些数据直接用文字描述即可]
```

##### 输出要求

- **内容理解**: 核心主题、章节逻辑、重点识别
- **可视化识别**: 只识别真正需要可视化的内容（有明确的关系结构）
- **文字为主**: 大部分内容保留文字段落，通过排版建立层次（视觉策略，不影响代码层面的组件拆分）
- **数据支撑**（如包含数据）: 只规划真正需要的图表，说明为什么需要
- **无导航、不生成图片**

##### 写入 AGENTS.md

完成需求分析后，立即创建 `AGENTS.md` 并写入：
- `## 应用概览`：一句话描述
- `## 需求拆解文档`：上述输出模板的完整内容
- 如有数据文件处理，同时写入 `## 数据处理总结`（目录结构 + 文件说明 + 数据消费示例）

</answer>

---

### Step 2: 设计指南生成

1. READ `references/design-foundations.md`
2. 根据「预设风格模板库」的模板选择流程，从统一模板列表中选择最匹配当前需求的模板，READ 该模板文件
3. 从模板中提取**视觉风格**（配色、字体、组件样式），忽略模板中的「页面结构」和「响应式断点」章节（布局由本 scene 文件定义）
4. 以模板视觉风格为基础，结合需求进行调整，追加写入 AGENTS.md 的 `## 设计文档 (Design Guidelines)` 章节

<thinking>

#### IV-1. 设计策略确定

**必答问题**：
- 受众是谁？阅读目的是什么？
- 期望的情感基调？（严肃/轻松/数据驱动/叙事性）
- 品牌关键词？

**info_viz 特有维度**：
- 是否包含数据？（纯文字 / 图文混合）
- 阅读场景？（正式汇报 / 日常参考 / 学习理解）

**选择风格模板**：从 design_foundations「预设风格模板库」中选择最匹配的模板，READ 模板文件，提取其设计参数（配色、字体、布局、装饰手法），然后结合需求调整。

**布局选择**（二选一）：
- **容器型**：文档「浮」在背景上，适合需要仪式感、聚焦感的内容
- **通栏型**：开阔视野，高效浏览，适合数据密集内容

**核心原则：文字为主体**（视觉策略，不影响代码层面按章节拆分独立组件）
- 大部分内容保留文字段落形式，保持信息密度和阅读节奏
- 只有具有明确关系结构的内容才使用可视化组件
- 通过排版（字号/字重/颜色/间距）建立层次，避免过度装饰
- 避免视觉疲劳：不要每个章节都有卡片/高亮块
- 图表是支撑观点的证据，不是装饰

**导航规则**:
- 禁止添加 Topbar/Navbar/Sidebar/Footer with nav links
- 只需要简洁的 Page Header（报告标题 + 元信息）

#### IV-2. 配色方案选择

> **配色方案来源**：使用 design_foundations 中的 7 个预设方案，或基于品牌色自主生成。

**配色选择策略**：

| 场景 | 策略 |
|-----|-----|
| **常规内容** | 从预设方案中随机选择（避免偏好某几个方案） |
| **用户指定色彩** | 自主生成配色（基于用户指定的主色推导完整 8 色系统） |
| **预设方案不匹配** | 自主生成配色（当内容调性与所有预设方案都不贴合时） |

**自主生成配色规则**（用户指定或预设不匹配时）：

基于 HSL 色彩理论推导完整配色：
- bg：主色相，饱和度 30-50%，明度 95-98%（浅色）或 5-15%（深色）
- surface：纯白 hsl(0 0% 100%) 或比 bg 亮 2-5%
- header：主色相，饱和度 60-80%，明度 20-40%
- text：主色相偏移 +/-10 度，饱和度 70-90%，明度 8-15%
- textMuted：继承 text 色相，明度提高 30-40%
- accent：取 primary 色相，明度 93-97%（浅色）或 15-17%（深色）
- border：主色相，饱和度 20-40%，明度 85-92%
- 验证：text/bg >= 7:1，textMuted/bg >= 4.5:1

#### IV-3. 容器型布局设计

> **核心体验**：文档「浮」在背景上，聚焦阅读
> **典型场景**：技术评审报告、会议纪要、研究报告、正式文档

**视觉模型**：页面层（浅彩色背景）→ 文档容器层（白色卡片，居中悬浮，圆角+阴影）→ 内容层

**DOM 结构**：`body` → `article.document-container` → `header.document-header`（Banner 区）+ `div.document-content`（正文区）

**关键样式**：
- `body`：`min-height: 100vh`，bg 色背景，`padding: 1rem 0`（sm 起 `2rem 1rem`）
- `article`：`max-width: 48rem~64rem; margin: 0 auto`，surface 色背景
  - sm 起：`border-radius: 1rem`，大阴影 `box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1)`
  - 移动端：无圆角无阴影，全出血
- `header`（Banner 区）：`height: 12rem~20rem`，header 色渐变背景；标题绝对定位于底部，`font-weight: 900`；元数据用胶囊标签
- `.document-content`：`padding: 1.5rem 1.25rem`（md 起 `2rem`）；章节间 `margin-top: 2rem`
- 章节标题：小号大写字母 + 底部 border 分隔线

#### IV-4. 通栏型布局设计

> **核心体验**：开阔视野，高效浏览
> **典型场景**：数据分析报告、运营周报/月报、客户画像、竞品分析

**视觉模型**：有色 Header 通栏（全宽）→ 宽度约束的正文流（居中）

**结构原则**：
1. **页面** = 白色/浅色背景
2. **Header** = 有色/渐变区域 或 无背景排版
3. **内容** = 宽度约束的文档流

**配色应用规则**：
- **深邃风格融合**: Header header 色 + `padding-bottom: 5rem`，内容区 `margin-top: -3rem` 上浮
- **明快风格融合**: Header 渐变 `padding-bottom: 6rem`，内容区 `margin-top: -4rem` 上浮 + 大阴影
- 负边距上浮时，`<main>` 必须加 `position: relative; z-index: 10`

**DOM 结构**：`body` → `header.fullwidth-header`（通栏）→ `main.main-content`（宽度约束）

**关键样式**：
- `body`：`min-height: 100vh`，bg 色背景
- `header`：`width: 100%`，header 色渐变背景；内部 `max-width: 48rem~64rem; margin: 0 auto; padding: 2rem~4rem 1.5rem`；标题 `font-weight: 900`，元数据用胶囊标签
- `main`：`max-width: 48rem~64rem; margin: 0 auto; padding: 2rem 1.5rem`；章节间 `margin-top: 2rem`
- 章节标题：左侧 4px accent 色竖条 + `font-weight: 600`
- **标题融合技巧**（可选）：header 加 `padding-bottom: 5rem~6rem`，main 改 `margin-top: -3rem~-4rem; position: relative; z-index: 10` 形成上浮效果

**布局选型指南**：

| 选择 | 容器型 | 通栏型 |
|-----|-------|-------|
| **内容特征** | 文字叙述为主 | 数据图表为主 |
| **体验倾向** | 仪式感、聚焦感 | 开阔感、高效浏览 |

> 混合内容时，根据期望体验选择，或默认使用容器型。

#### IV-5. Typography 排版系统

**层级关系**：H1 > H2 > H3 > H4，通过字号递减 + 字重递减建立清晰层级。H1 仅用于页首主标题，H2 用于章节，H3/H4 用于小节/段落。

**正文**：使用舒适行高（`line-height: 1.625`），段落间距保持一致。

#### IV-6. 组件样式

**设计原则：简洁为主，点缀为辅**
- 默认使用简单边框 + 浅色纯色背景，左侧彩色边框区分类型/等级
- 渐变仅允许 Banner/Header 区域；阴影 `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` 用于卡片层级区分
- 高亮块：左侧 accent 色边框 + accent 10% 透明度背景
- 指标卡片：大数字（标题色）+ 小标签（muted 色）+ 语义色趋势箭头
- 标签/徽章：accent 色 10% 透明度背景 + accent 色文字

#### IV-7. 视觉效果

> 应用 IV-1 选定的 style-preset 中定义的视觉参数。

- 容器圆角：`border-radius: 1rem` 或 `border-radius: 1.5rem`
- 卡片圆角：`border-radius: 0.5rem`
- 容器阴影：`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`
- 卡片阴影：`box-shadow: 0 1px 2px rgba(0,0,0,0.05)`
- 渐变：仅允许 Banner/Header 区域；禁止卡片大面积渐变、多色彩虹渐变

#### IV-8. Header/Banner 视觉设计

> Header/Banner 是页面第一视觉触点。选择一种背景模式即可，禁止叠加多种。

| 内容理解结果 | 推荐模式 |
|------------|---------|
| 容器型布局 + 叙事/视觉/仪式感 | Mode C (图片+遮罩)，需生成 Banner 装饰图 |
| 数据/技术/极简 | Mode E (纯排版) 或 Mode A (渐变) |
| 活力/创意/年轻 | Mode D (几何装饰) 或 Mode B (纹理) |
| 叙事/编辑/文艺 | Mode B (纹理) 或 Mode E (纯排版) |
| 无特殊偏好 | Mode A (渐变) 作为默认 |
| 极简/数据密集 | Mode F (无背景) |

| 模式 | 适用场景 | 实现方向 |
|------|---------|---------|
| **A: 渐变背景** | 通用默认 | header 色 + 透明度变体方向渐变 |
| **B: 纹理叠加** | 数据/技术类 | 纯色背景 + CSS 纹理图案，极低透明度 |
| **C: 图片+遮罩** | 容器型 + 叙事/仪式感 | 生成 Banner 装饰图 + 渐变遮罩 |
| **D: 几何装饰** | 活力/创意类 | 纯色/渐变 + 绝对定位半透明几何形状 |
| **E: 纯排版** | 极简风格 | 纯色背景 + 极端字重对比 |
| **F: 无背景** | 极简/数据密集 | 不设独立背景色，依靠排版对比 |

</thinking>

<answer>

#### 输出模板

```markdown
# UI 设计指南 - 信息可视化

> **场景类型**: `info_viz`（信息可视化设计）

> Section 1-2 为设计意图与决策上下文。Code agent 实现时以 Section 3 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 参考模板
- **模板名称**: [模板文件名，如 mint-lime.md]
- **选择理由**: [1 句话说明为何选择此模板]
- **调整说明**: [基于模板做了哪些调整以适配当前需求]

### 1.2 内容理解
- **目标受众**: [谁会阅读？阅读环境？]
- **正式程度**: [官方发布/内部协作/社交分享]
- **期望情绪**: [信任/专注/轻松等]
- **信息密度**: [数据密集/叙述为主/图文并重]

### 1.3 设计语言
- **Aesthetic Direction**: [阅读风格，1句话]
- **Emotional Tone**: [专业/清晰/沉稳/活力 等]
- **Design Style**: [风格名 + 1句理由]

## 2. Layout Decision (布局决策)

> info_viz 是单页文档场景，不需要额外的 Layout 组件、Sidebar 或 Topbar。

### 2.1 布局选择
- **布局类型**: [容器型 / 通栏型]
- **选择理由**: [1句话]

### 2.2 核心结构
**页面骨架**:
\`\`\`html
<article class="document-container">
    <!-- 使用标题融合时：header 加 padding-bottom: 5rem~6rem，document-content 加 position: relative; z-index: 10; margin-top: -3rem~-4rem -->
    <header class="document-header">
      <img src="[banner]" alt="" />
      <div class="header-overlay">
        <h1>报告标题</h1>
        <p class="subtitle">副标题描述</p>
        <div class="meta-tags">
          <span class="meta-tag">[元数据项]</span>
        </div>
      </div>
    </header>
    <div class="document-content">
      <section>
        <h2 class="section-title">章节标题</h2>
        <p class="body-text">内容...</p>
      </section>
    </div>
  </article>
\`\`\`

### 2.3 关键样式参数

| 元素 | CSS 属性 | 说明 |
|-----|---------|-----|
| 页面背景 | `background-color: hsl(...)` | |
| 页面外边距 | `padding: 1rem 0` / `@media (min-width:640px) { padding: 2rem 1rem }` | |
| 文档容器 | `background-color: hsl(...); @media border-radius: 1rem; box-shadow: ...` | |
| 内容内边距 | `padding: [值]` | |
| 章节间距 | `margin-top: [值]` | |

## 3. 配色方案

> 精确色值规则：选用预设方案时，必须使用方案定义中的精确 HSL 值。

**选用方案**: [方案名称]

| 角色 | HSL 值 | 设计说明 |
|-----|--------|---------|
| bg | [HSL] | |
| surface | [HSL] | |
| header | [HSL] | |
| text | [HSL] | |
| textMuted | [HSL] | |
| accent | [HSL] | 次级交互反馈/装饰色 |
| border | [HSL] | |

## 4. Typography (字体排版)

**字体**: [Heading 字体] / [Body 字体]
**导入**: `@import url('...')`

| 层级 | CSS 样式 | 颜色 |
|-----|---------|-----|
| H1 | `font-size: 1.875rem; font-weight: 700` | [Header 色 HSL] |
| H2 | `font-size: 1.5rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1rem` | [Header 色 HSL] |
| H3 | `font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem` | [Header 色 HSL] |
| Body | `font-size: 1rem; line-height: 1.625` | [正文文字色 HSL] |
| 次要文字 | `font-size: 0.875rem` | [次要文字色 HSL] |

## 5. Component Styles (组件样式)

| 组件 | CSS 样式 | 颜色应用 |
|-----|---------|---------|
| 章节标题 | `color: [Header色]; border-bottom: 1px solid [border色]` | Header 色 HSL + 边框色 HSL |
| 高亮块 | `border-left: 4px solid [accent色]; background: hsla(accent色 H S L / 0.1)` | 强调色 HSL + 强调色 HSL/10 |
| 卡片 | `background: [surface色]; border: 1px solid [border色]; box-shadow: 0 1px 2px rgba(0,0,0,0.05)` | 容器色 HSL + 边框色 HSL |
| 指标卡片 | 大数字 + 小标签 | Header 色 HSL + 次要文字色 HSL |
| 标签/徽章 | `background: hsla(accent色 H S L / 0.1); color: [accent色]` | 强调色 HSL/10 + 强调色 HSL |

## 6. Visual Effects (视觉效果)

- **装饰手法**: [装饰元素 + CSS 方向或「无」]

### 6.1 圆角与阴影
| 元素 | CSS 样式 |
|-----|---------|
| 容器圆角 | `border-radius: 1rem` |
| 容器阴影 | `box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` |
| 卡片圆角 | `border-radius: 0.5rem` |
| 卡片阴影 | `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` |

### 6.2 渐变与装饰（如适用）

| 元素 | CSS 样式 |
|-----|---------|
| 页面背景 | `background-color: [bg色 HSL]` |
| Header 背景 | `background: linear-gradient(to bottom right, [header色], [header变体色])` |

## 7. Banner Image（仅容器型布局）
> 通栏型使用 CSS 背景色，无需图片
> 容器型需要 Banner 装饰图（需明确主色调）

## 8. Constraints (禁止事项)
- 添加 Topbar/Sidebar/Footer 导航
- 每个章节都用卡片包裹（避免视觉疲劳）
- 简单数值用图表（直接文字加粗即可）
```

**输出要求**：
- **布局决策**: 布局类型 + 选择理由
- **配色方案**: 方案名称 + 完整 HSL 颜色值表
- **核心结构**: 页面骨架代码（使用具体 HSL 颜色值，纯 HTML + `<style>`）
- **组件样式**: 使用 HSL 颜色值的 CSS 属性描述
- **Typography**: 字体选择 + 标题层级（颜色使用 HSL）
- **Banner 图片**（仅容器型）: 内容描述 + 主色调

</answer>

---

## Phase 2: 开发阶段

> 所有开发工作（入口文件、全局样式、Section 组件）通过 parallel_write 执行，规范见 SKILL.md Phase 4。

### Step 1：拆分并发起 parallel_write

1. 将「组件文件与 parallel_write 分配」表追加写入 `AGENTS.md`（含章节 Props 接口、主题色变量等类型定义）
2. 按调用顺序依次执行 parallel_write，各调用**只写自己负责的文件**

```
示例：一份包含 5 个章节的分析报告

AGENTS.md 追加内容：
## 组件文件与 parallel_write 分配
| 调用 | 文件路径 | 说明 |
|------|---------|------|
| 调用 1（基础） | `index.css` | 主题变量+全局样式 |
| 调用 2（业务组件） | `ReportPage/components/CoverSection.tsx`, `ReportPage/components/TocSection.tsx`, `ReportPage/components/MarketAnalysisSection.tsx`, `ReportPage/components/FinancialSection.tsx`, `ReportPage/components/CompetitorSection.tsx`, `ReportPage/components/SummarySection.tsx` | 所有章节组件并发写入 |
| 调用 3（入口+路由） | `ReportPage/ReportPage.tsx`, `app.tsx` | 页面组装+路由注册（最后执行） |
→ 3 次串行调用，每次调用内的文件并发写入
```

### Step 2：验收

全部 parallel_write 完成后执行验收检查：
- 纯文档流布局，禁止添加 Topbar/Sidebar/Footer 导航组件
- 内容必须与 Phase 1 V-1/V-2 分析结果对应（可视化内容与分析计划一致）
- 保留文字段落的内容在视觉上不得被替换为图表或卡片
