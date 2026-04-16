---
name: animation-skill
description: "React 动画开发规范：Framer Motion + AutoAnimate。Use when adding animations, transitions, or motion effects to React components. Covers enter/exit, gestures, scroll, layout animations, and auto-animate for lists. 触发词：动画, animation, motion, framer-motion, 过渡, transition, 手势动画, gesture, scroll animation, 滚动动画, auto-animate, 列表动画"
available-agents:
  - DesignLite
---

## 选型决策流程

```
需要动画 → 能用 CSS/Tailwind 解决？ → 是 → CSS transition / @keyframes
                                    → 否 ↓
          是否列表增删/排序/accordion/toast/form-error？
            → 是 → AutoAnimate（3.28KB gzip）
            → 否 ↓
          需要手势/退场/布局/滚动驱动/序列编排？
            → 否 → CSS transition（同第一步）
            → 是 → Framer Motion（~34KB gzip）
```

**包体积对比：**

| 方案 | Gzip 体积 | 覆盖能力 |
|------|----------|---------|
| AutoAnimate | ~3.28 KB | 列表增删排序、accordion、toast |
| Framer Motion | ~34 KB | 全部（退场、手势、布局、MotionValue） |

---

## L2 禁止事项

> 生成代码后须逐条核对，每一条都不可跳过。

| # | 禁止 | 应该 |
|---|------|------|
| 1 | 动画 `width`/`height`/`top`/`left` 等触发 layout 的属性 | 使用 `transform`（`x`/`y`/`scale`/`rotate`）+ `opacity` |
| 2 | 在 Next.js Server Component 中使用 `motion` | 添加 `"use client"`，动画部分提取为 Client Component |
| 3 | `AnimatePresence` 内条件渲染子组件不给 `key` | 必须有唯一 `key`，否则退场动画不触发 |
| 4 | 弹窗/toast 退场无动画直接卸载 | 用 `AnimatePresence` 包裹 + `exit` prop |
| 5 | `spring` 不设 `damping` 导致无限弹跳 | 设置 `stiffness`（100-300）+ `damping`（10-30） |
| 6 | AutoAnimate 期望对孙元素生效 | 只对**直接子元素**生效；嵌套层级需逐层挂 ref |

---

## Framer Motion 核心用法

{% raw %}

### 1. 基础动画（initial / animate / transition）

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>
```

### 2. 退场动画（AnimatePresence）

```tsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {show && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

### 3. Variants + Stagger

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="visible">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>{i.name}</motion.li>
  ))}
</motion.ul>
```

### 4. 手势动画

```tsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(59,130,246,0.5)" }}
>
  按钮
</motion.button>

// 拖拽
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  dragMomentum={false}       // 关闭释放后惯性（默认 true）
  onDragStart={(e, info) => console.log(info.point)}
  onDrag={(e, info) => console.log(info.delta)}
  onDragEnd={(e, info) => console.log(info.velocity)}
/>
```

### 5. 滚动动画

**whileInView（最常用）：**

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  滚动到视口时显现
</motion.div>
```

**useScroll 进度驱动：**

```tsx
import { motion, useScroll, useTransform } from "framer-motion";

const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

<motion.div style={{ y, opacity }}>视差内容</motion.div>
```

### 6. 布局动画

**layout prop（位置/尺寸 FLIP 动画）：**

```tsx
<motion.div
  layout
  style={{ width: expanded ? 300 : 100 }}
  transition={{ layout: { duration: 0.3 } }}
>
  {expanded && <motion.p layout="position">详情</motion.p>}
</motion.div>
```

**LayoutGroup + layoutId（Tabs underline 经典用例）：**

```tsx
import { LayoutGroup, motion } from "framer-motion";

<LayoutGroup>
  {tabs.map((tab, i) => (
    <button key={tab} onClick={() => onSelect(i)} style={{ position: "relative" }}>
      {tab}
      {selected === i && (
        <motion.div
          layoutId="underline"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 2, background: "#3b82f6",
          }}
        />
      )}
    </button>
  ))}
</LayoutGroup>
```

### 7. useAnimate 命令式序列

```tsx
import { useAnimate, motion } from "framer-motion";

const [scope, animate] = useAnimate();

const handleClick = async () => {
  await animate(scope.current, { scale: 1.2 });
  await animate(scope.current, { rotate: 180 });
  await animate(scope.current, { scale: 1, rotate: 0 });
};

<motion.div ref={scope} onClick={handleClick}>点击播放序列</motion.div>
```

### 8. MotionValue 响应式联动

```tsx
import { motion, useMotionValue, useTransform } from "framer-motion";

const x = useMotionValue(0);
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
const background = useTransform(x, [-200, 0, 200], ["#ff0000", "#00ff00", "#0000ff"]);

<motion.div drag="x" style={{ x, opacity, background }} />
```

### 9. 实用模式

**Loading Skeleton：**

```tsx
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="bg-gray-200 rounded h-4"
/>
```

**Number Counter：**

```tsx
import { useEffect } from "react";
import { useSpring, useTransform, motion } from "framer-motion";

const spring = useSpring(0, { stiffness: 100, damping: 30 });
const display = useTransform(spring, (v) => Math.round(v));

useEffect(() => { spring.set(value); }, [value, spring]);

<motion.span>{display}</motion.span>
```

{% endraw %}

---

## Transition 速查

| 类型 | 关键参数 | 适用场景 | 示例 |
|------|---------|---------|------|
| `spring` | `stiffness`, `damping`, `mass` | 自然弹性效果（默认） | `{ type: "spring", stiffness: 200, damping: 20 }` |
| `tween` | `duration`, `ease` | 精确时长控制 | `{ type: "tween", duration: 0.3, ease: "easeOut" }` |
| `inertia` | `velocity`, `power` | 拖拽释放惯性 | `{ type: "inertia", velocity: 200 }` |

**Ease presets：** `linear` · `easeIn` · `easeOut` · `easeInOut` · `circIn` · `circOut` · `backIn` · `backOut` · `anticipate`

**时长原则：** UI 动画 200-500ms；微交互 100-200ms；退场比进场短。

---

## AutoAnimate 用法

### 安装

```bash
npm install @formkit/auto-animate
```

### React Hook

```tsx
import { useAutoAnimate } from "@formkit/auto-animate/react";

function TodoList({ items }: { items: Item[] }) {
  const [parent] = useAutoAnimate({ duration: 250, easing: "ease-in-out" });

  return (
    <ul ref={parent}>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### 适用场景

| 场景 | 说明 |
|------|------|
| 列表增删排序 | 自动检测 DOM 变更，零配置 |
| Accordion 展开/折叠 | 子元素显隐时自动过渡 |
| Toast 通知 | 通知项进出自动动画 |
| 表单错误提示 | 错误信息出现/消失自动过渡 |

### 适用边界

| 有效 | 无效 |
|------|------|
| 直接子元素增删 | 孙元素变更 |
| 子元素排序 | CSS `display: contents` 的子元素 |
| 子元素属性变化 | `position: fixed` 的子元素 |

禁用动画：`const [parent, enable] = useAutoAnimate(); enable(false);`

---

## 性能优化

| 要点 | 做法 |
|------|------|
| 避免 layout thrashing | 只动画 `transform` + `opacity` |
| 控制并发 | 同屏 ≤ 3 组动画；stagger 避免 50+ 项同时启动 |
| 避免重渲染 | `useMotionValue` / `useTransform` 不触发 React 重渲染 |
| 跳过首次动画 | `initial={false}` |
| 滚动只触发一次 | `viewport` 设 `once: true, amount: 0.2` |

---