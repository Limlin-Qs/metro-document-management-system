# OpenClaw Skill 开发最佳实践

OpenClaw Skill 是开源 AI Agent 平台的可复用功能模块，通过 SKILL.md（YAML frontmatter + Markdown）定义。本指南覆盖 Skill 创建与开发的完整规范。

---

## 禁止事项表

| 禁止行为                              | 原因                    | 正确做法                         |
| ------------------------------------- | ----------------------- | -------------------------------- |
| Hardcode secrets/API keys 到 SKILL.md | 安全风险，泄露凭证      | 使用环境变量或 secret 管理       |
| description 描述功能而非触发条件      | 无法被正确触发          | 以 "Use when..." 开头            |
| description 中包含工作流程            | AI 可能跳过阅读内容     | 只写触发条件 + 关键词            |
| 单个 SKILL.md 超过 5k tokens          | 超出上下文窗口预算      | 拆分为多个 skill，交叉引用       |
| name 与目录名不一致                   | 加载失败，无法触发      | 保持 kebab-case 且完全一致       |
| 脚本中使用绝对路径                    | 不同环境下路径不同      | 使用 `$SKILL_DIR` 等相对路径变量 |
| 重复其他 skill 已有的内容             | 维护成本高，易不一致    | 通过交叉引用链接                 |
| 缺少中文触发词                        | 中文用户无法触发        | description 末尾加 `触发词：xxx` |
| frontmatter 使用 tab 缩进             | YAML 解析失败           | 仅使用空格缩进                   |
| 代码示例占比超过 25%                  | 内容冗长，超 token 预算 | 仅保留 bad/good 对比示例         |

---

## Skill 分类与生命周期

每个 Skill 本质上属于以下两类之一，理解分类有助于长期维护：

| 类型           | 定义                          | 生命周期           | 示例                                                    |
| -------------- | ----------------------------- | ------------------ | ------------------------------------------------------- |
| **能力增强型** | 弥补模型基础能力不足          | 随模型升级可能淘汰 | 飞书多维表格复杂公式生成、长文档摘要                    |
| **偏好编码型** | 编码团队/个人特定工作流和规范 | 长期有效           | 企业审批流程规范、飞书机器人消息模板、内部 API 调用约定 |

```
我的 Skill 属于哪种？
├─ 没有这个 Skill，模型是否能完成任务？
│  ├─ 完全不能 / 质量很差 → 能力增强型
│  │  ⚠️ 每次模型升级后重新评估是否仍需要
│  └─ 能完成，但不符合团队规范 → 偏好编码型
│     ✓ 长期维护，随团队规范演进更新
└─ 不确定 → 先按偏好编码型创建，定期 review
```

---

## 决策树: Skill 类型选择

```
需要创建一个 Skill？
├─ 仅提供规范/指南/最佳实践？
│  ├─ 需要根据项目上下文自动注入？ → Steering Skill（纯文档）
│  └─ 用户手动触发即可？ → 普通 Skill（纯文档）
├─ 需要执行外部命令/调用 API？
│  ├─ 逻辑简单，1-2 个脚本？ → 脚本 Skill（SKILL.md + scripts/）
│  └─ 逻辑复杂，需要持久连接？ → 考虑 MCP Server
└─ 需要深度集成 IDE / 编辑器？ → Plugin
```

## 决策树: 扩展方式选型

```
需要扩展 Agent 能力？
├─ 提供知识/规范/决策指导？ → Skill（SKILL.md）
│  优势：零依赖、易维护、版本可控
├─ 提供工具调用能力（搜索/数据库/API）？ → MCP Server
│  优势：标准协议、跨 Agent 复用、独立进程
├─ 需要 UI 交互 / IDE 深度集成？ → Plugin
│  优势：完整 UI、生命周期管理
└─ 不确定？ → 先用 Skill，不够再升级 MCP
```

---

## 速查表: SKILL.md Frontmatter 字段

### 基础字段

| 字段          | 必需 | 类型   | 说明                                         | 示例       |
| ------------- | ---- | ------ | -------------------------------------------- | ---------- |
| `name`        | 是   | string | 唯一标识，kebab-case，与目录名一致           | `my-skill` |
| `description` | 是   | string | 触发描述，"Use when..." 开头，含中英文关键词 | 见下方示例 |

### description 编写规范

```yaml
# BAD: 描述功能
description: SQL 编写规范和最佳实践指南

# BAD: 包含工作流程
description: Code review skill that checks bugs, then security, then performance

# GOOD: 触发条件 + 中英文关键词
description: "Use when writing SQL queries or optimizing slow queries. 触发词：SQL, 慢查询, 数据库优化"
```

---

## 速查表: Skill 目录结构

```
# 纯文档 Skill
skills/<skill-name>/
└── SKILL.md

# 脚本 Skill
skills/<skill-name>/
├── SKILL.md
└── scripts/
    ├── main.sh          # 入口脚本（chmod +x）
    └── utils.py         # 辅助脚本

# 带数据文件的 Skill
skills/<skill-name>/
├── SKILL.md
├── scripts/
└── data/
    └── templates.json
```

## Skill 开发清单

### 创建阶段

- [ ] 确定 Skill 类型（纯文档 / 脚本）
- [ ] 创建 kebab-case 命名的 skill 目录
- [ ] 创建 SKILL.md，填写完整 frontmatter
- [ ] `name` 与目录名完全一致
- [ ] `description` 以 "Use when..." 开头，包含中英文关键词

### 内容阶段

- [ ] 包含禁止事项表（关键错误）
- [ ] 包含决策树或速查表（可操作指导）
- [ ] 代码示例仅含 bad/good 对比，占比 < 25%
- [ ] 总 token 数 < 5k（约 20k 字符）
- [ ] 无重复内容，使用交叉引用

---

## 安全审查要点

| 检查项       | 说明                                     |
| ------------ | ---------------------------------------- |
| 无硬编码凭证 | SKILL.md 和脚本中无 API key、token、密码 |
| 脚本输入验证 | 脚本参数经过校验，防止注入攻击           |
| 无敏感路径   | 不包含用户主目录、内部域名等信息         |
| 依赖来源可信 | MCP Server 使用官方或已审计的包          |
| 数据不外泄   | 脚本不将用户数据发送到外部服务           |

---
