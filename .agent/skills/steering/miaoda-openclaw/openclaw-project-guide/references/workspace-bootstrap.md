# Workspace & Bootstrap 指南

OpenClaw Workspace 是 Agent 的运行时环境，基于 git 仓库管理。Bootstrap 文件在首次运行时注入上下文，引导 Agent 理解角色和工作方式。

官方文档：https://docs.openclaw.ai/concepts/agent | https://docs.openclaw.ai/start/openclaw

---

## Bootstrap 文件详解

Workspace 目录下有 6 个 Bootstrap 文件，Agent 启动时按优先级加载：

| 文件             | 用途                     | 格式     | 加载时机         | 必需 |
| ---------------- | ------------------------ | -------- | ---------------- | ---- |
| `IDENTITY.md`    | Agent 身份与人格定义     | Markdown | 每次会话         | 否   |
| `SOUL.md`        | 核心价值观与行为准则     | Markdown | 每次会话         | 否   |
| `AGENTS.md`      | Agent 角色与能力声明     | Markdown | 每次会话         | 否   |
| `TOOLS.md`       | 可用工具说明与使用指南   | Markdown | 每次会话         | 否   |
| `USER.md`        | 当前用户偏好与上下文     | Markdown | 每次会话         | 否   |
| `BOOTSTRAP.md`   | 一次性引导流程           | Markdown | 仅首次运行后删除 | 否   |
| `HEARTBEAT.md`   | 心跳检测与存活状态       | Markdown | 运行时更新       | 否   |

### 文件加载优先级

```
会话启动
├─ 1. IDENTITY.md  → "我是谁"
├─ 2. SOUL.md      → "我的价值观"
├─ 3. AGENTS.md    → "我能做什么"
├─ 4. TOOLS.md     → "我有哪些工具"
├─ 5. USER.md      → "用户是谁、偏好什么"
└─ 6. BOOTSTRAP.md → 首次引导（执行后自动删除）
```

---

## Bootstrap 流程

```
首次运行 openclaw
├─ 检测 workspace/ 目录
│  ├─ 不存在 → 创建目录 + 生成默认 Bootstrap 文件
│  └─ 已存在 → 跳过
├─ 加载所有 .md 文件注入上下文
├─ 检测 BOOTSTRAP.md
│  ├─ 存在 → 执行引导流程 → 执行完毕后自动删除
│  └─ 不存在 → 跳过
└─ 进入正常会话
```

### BOOTSTRAP.md 特殊行为

- **一次性执行**：首次会话完成后自动删除
- **用途**：初始化项目结构、安装依赖、创建配置文件等一次性任务
- **重新触发**：手动创建 `workspace/BOOTSTRAP.md` 即可再次触发

---

## 截断限制

Bootstrap 文件受 `bootstrapMaxChars` 配置限制，超出部分会被截断：

```json
// openclaw.json
{
  "agent": {
    "bootstrapMaxChars": 8000
  }
}
```

- 默认值：8000 字符
- 建议：每个文件控制在 1500 字符以内，总计不超过限制
- 超出时：文件末尾被截断，不会报错

---

## Workspace 最佳实践

### 作为 Git Repo 管理

```
workspace/
├─ .git/                    # Git 版本控制
├─ AGENTS.md                # 纳入版本管理
├─ SOUL.md                  # 纳入版本管理
├─ IDENTITY.md              # 纳入版本管理
├─ TOOLS.md                 # 纳入版本管理
├─ USER.md                  # 可 gitignore（含个人偏好）
├─ HEARTBEAT.md             # 可 gitignore（运行时状态）
└─ .openclaw/
    └─ workspace-state.json # gitignore（运行时状态）
```

### 常用命令

| 命令                              | 说明                             |
| --------------------------------- | -------------------------------- |
| `sh scripts/start.sh`             | 启动 OpenClaw 服务               |
| `sh scripts/restart.sh`          | 重启 OpenClaw 服务               |
| `sh scripts/stop.sh`             | 停止 OpenClaw 服务               |
| `openclaw gateway status`         | 查询 Gateway 服务状态            |
| `openclaw doctor`                 | 诊断配置问题                     |

### 配置变更与重启

部分 `openclaw.json` 配置修改后需要重启才能生效：

| 配置项       | 重启？ | 说明                               |
| ------------ | ------ | ---------------------------------- |
| `gateway.*`  | 是     | 端口、绑定、认证、TLS 等基础设施（例外：`gateway.reload` 和 `gateway.remote` 热生效） |
| `plugins`    | 是     | 插件加载配置                       |
| `agent`      | 否     | 模型、toolProfile 等（热生效）     |
| `sandbox`    | 否     | 沙箱隔离策略（热生效）             |
| `messaging`  | 否     | 通信通道配置（热生效）             |
| `memory`     | 否     | 热生效                             |
| `skills`     | 否     | 热生效                             |
| `cron`       | 否     | 热生效                             |

**配置变更决策树：**

```
修改 openclaw.json
├─ openclaw doctor              ← 检查配置合法性
│  ├─ 有问题 → 按提示修复后重试
│  └─ 无问题 → 对照上表判断是否需要重启
│     ├─ 不需要 → 配置自动热生效，完成
│     └─ 需要（gateway.*/plugins）→ sh scripts/restart.sh
│        失败时 → 回滚或 openclaw reset
```

### openclaw doctor

运行环境诊断，自动检测常见配置问题并给出修复建议：

```
openclaw doctor
```

检查项目：

| 检查项               | 说明                                       |
| -------------------- | ------------------------------------------ |
| Workspace 完整性     | `workspace/` 目录及核心 Bootstrap 文件是否存在 |
| openclaw.json 语法   | 配置文件 JSON 格式是否合法                 |
| Gateway 状态         | Gateway 服务是否正常运行                   |
| Gateway 连通性       | 网关服务是否可达                           |
| Skill 加载           | `skills/` 下的 SKILL.md 是否可正常解析     |
| Memory 索引          | 向量索引是否可用、是否需要重建             |
| 权限检查             | 文件/目录读写权限是否正确                  |

常见用法：

- **排查启动失败**：Agent 无法正常启动时优先运行 `doctor`
- **升级后检查**：`openclaw update` 后运行确认兼容性

---

## 编写建议

| 文件           | 建议内容                                         |
| -------------- | ------------------------------------------------ |
| `IDENTITY.md`  | Agent 名称、擅长领域、沟通风格                   |
| `SOUL.md`      | 遵循的原则（如"代码质量优先"、"安全第一"）       |
| `AGENTS.md`    | 角色声明、能力边界、协作方式                     |
| `TOOLS.md`     | 工具使用优先级、限制条件、最佳实践               |
| `USER.md`      | 用户技术栈、偏好语言、项目背景                   |
| `BOOTSTRAP.md` | 项目初始化脚本、依赖安装、环境检查               |
