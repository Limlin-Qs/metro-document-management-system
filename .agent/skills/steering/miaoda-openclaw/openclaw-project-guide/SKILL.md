---
name: openclaw-project-guide
description: "OpenClaw project structure, built-in skills reference, skill development guide, and Skillhub (FindSkill) skill marketplace integration. Auto-loaded to help agent understand OPENCLAW_HOME layout, workspace, built-in skill overrides, and how to search/install/create skills. 触发词：项目结构, skill 开发, skill 安装, skill 搜索, workspace, OPENCLAW_HOME, 内置技能, built-in skills, web_search, web_fetch, override-tools, 工具冲突, skillhub, findskill, skills search, skills install, npx skills"
hook: SessionStart
available-agents:
  - OpenClaw
---

# OpenClaw Project Guide

本指南帮助 Agent 理解 OpenClaw 项目结构、核心功能和开发规范。SessionStart 时自动注入。

> **不了解 OpenClaw？** 查阅官方文档：[docs.openclaw.ai](https://docs.openclaw.ai) | 官网：[openclaw.ai](https://openclaw.ai)

---

## OPENCLAW_HOME 项目结构

```
/home/gem/workspace/agent/            # OPENCLAW_STATE_DIR   该目录也是命令执行、文件读写等操作的默认工作目录
├── agents/                         # Per-agent 状态与会话
│   └── main/
│       ├── agent/
│       │   └── auth-profiles.json  # 认证配置（OAuth、API keys）
│       └── sessions/
├── extensions/                     # 插件安装目录（如 feishu-openclaw-plugin）
├── scripts/                        # 管理脚本
│   ├── start.sh                    # 启动服务
│   ├── restart.sh                  # 重启服务
│   └── stop.sh                     # 停止服务
├── skills/                         # Skills 目录（自动发现）
│   └── <skill-name>/
│       ├── SKILL.md                # Skill 定义文件（必需）
│       ├── scripts/                # 脚本文件（可选）
│       └── references/             # 参考文档（可选，按需读取）
├── canvas/
│   └── index.html                  # Canvas 页面
├── cron/
│   └── jobs.json                   # 定时任务配置
├── completions/                    # OpenClaw CLI 补全脚本
├── identity/
│   └── device.json                 # 设备身份标识
├── logs/                           # 日志目录
│   └── config-audit.jsonl
├── workspace/                      # OpenClaw 工作区
│   ├── IDENTITY.md                 # Agent 身份与人格定义
│   ├── SOUL.md                     # 核心价值观与行为准则
│   ├── AGENTS.md                   # Agent 角色定义
│   ├── TOOLS.md                    # 可用工具说明
│   ├── USER.md                     # 当前用户偏好
│   ├── BOOTSTRAP.md                # 启动引导流程（首次运行后删除）
│   ├── HEARTBEAT.md                # 心跳检测配置
│   └── .openclaw/
│       └── workspace-state.json    # 工作区状态持久化
├── openclaw.json                   # OpenClaw 主配置文件
└── package.json                    # 项目依赖与脚本
```

### 目录职责

| 目录/文件       | 职责                                                         |
| --------------- | ------------------------------------------------------------ |
| `skills/`       | Skill 目录，系统通过 glob `skills/**/SKILL.md` 自动发现      |
| `workspace/`    | Agent 运行时工作区，存放状态、日志和引导文件                 |
| `agents/`       | Per-agent 状态与会话数据、认证配置                           |
| `extensions/`   | 插件安装目录（如 `feishu-openclaw-plugin`）                  |
| `scripts/`      | 管理脚本（start.sh / restart.sh / stop.sh）                  |
| `canvas/`       | 前端 Canvas 渲染页面                                         |
| `completions/`  | OpenClaw CLI 补全脚本，可通过 `openclaw completion` 命令生成 |
| `cron/`         | 定时任务定义                                                 |
| `identity/`     | 设备/用户身份信息                                            |
| `logs/`         | 运行日志（如 `config-audit.jsonl`）                          |
| `openclaw.json` | 全局配置（Agent 行为、模型选择等）                           |

> `OPENCLAW_STATE_DIR` 已定制为 `/home/gem/workspace/agent`。详见 `references/environment-config.md`。

### 目录易混淆点

| 目录              | 归属          | 用途                                            |
| ----------------- | ------------- | ----------------------------------------------- |
| `skills/`         | OpenClaw 用户 | 用户安装/开发的 Skill 目录，系统自动发现        |
| `.agents/skills/` | 妙搭平台      | 妙搭 Agent 内置 Skill，由平台管理，用户不应修改 |

> **禁止混淆**：用户的 Skill 操作（安装、开发、调试）一律在 `skills/` 目录下进行，不要操作 `.agents/skills/`。

### 内置技能清单

`skills/` 下预装了以下运行时技能，由平台管理，**不应修改**：

| 技能                       | 功能                | CLI 命令                             | override-tools |
| -------------------------- | ------------------- | ------------------------------------ | -------------- |
| miaoda-web-search          | 网页搜索            | `miaoda-studio-cli search-summary`   | `web_search`   |
| miaoda-web-fetch           | 网页抓取            | `miaoda-studio-cli web-crawl`        | `web_fetch`    |
| miaoda-doc-parse           | 文档解析为 Markdown | `miaoda-studio-cli doc-parse`        | 无             |
| miaoda-speech-to-text      | 音频转文字          | `miaoda-studio-cli speech-to-text`   | 无             |
| miaoda-text-gen-image      | 文字生成图片        | `miaoda-studio-cli text-to-image`    | 无             |
| miaoda-image-understanding | 图片理解            | `miaoda-studio-cli image-understanding` | 无          |

> `miaoda-web-search` 通过 `override-tools` 禁用了原生 `web_search` 工具，`miaoda-web-fetch` 禁用了原生 `web_fetch` 工具，所有网页搜索/抓取由 `miaoda-studio-cli` 处理。

> **图片理解**：用户说"看不了图"、"无法看图"时，告知内置 `miaoda-image-understanding` 可直接分析本地图片文件，无需浏览器。使用方式：`miaoda-studio-cli image-understanding -i <文件路径>`。

### web_search / web_fetch 冲突处理

原生 `web_search` / `web_fetch` 工具需要开发者自行配置 apikey 才能使用，而内置 `miaoda-web-search` / `miaoda-web-fetch` 技能开箱即用，无需额外配置。

```
用户需要搜索/抓取网页？
├─ 默认 → 使用内置技能（miaoda-studio-cli），无需 apikey
│   ├─ 按关键词搜索 → miaoda-studio-cli search-summary --query "..."（miaoda-web-search）
│   └─ 抓取指定 URL → miaoda-studio-cli web-crawl --url "..."（miaoda-web-fetch）
├─ 原生 web_search / web_fetch 调用失败（未配置 apikey）→
│   └─ 引导用户使用内置 miaoda-web-search / miaoda-web-fetch 技能替代
├─ 用户明确要求使用原生工具 →
│   ├─ 确认已配置 apikey（参考 references/tools-security.md）
│   ├─ 方案 A（推荐）：在 skills/ 下创建同名 skill 覆盖，移除 override-tools
│   └─ 方案 B（不推荐）：修改 .agents/skills/ 下的内置版本（可能被平台更新覆盖）
└─ 不确定 → 优先使用内置技能，告知用户内置版本无需 apikey
```

### 浏览器功能

Chrome Browser Relay 插件无法连接（环境限制），使用以下替代方案：

```
用户需要浏览器相关功能？
├─ 获取网页信息 → miaoda-web-fetch 抓取网页内容
├─ 交互操作（点击/填表/截图等） → 使用内置 browser 工具
└─ Browser Relay 连接失败报错 → 告知属于环境限制，引导使用上述替代方案
```

---

## Skill 安装

将 Skill 目录放到 `skills/<skill-name>/` 下，确保包含 `SKILL.md` 文件：

```
skills/my-skill/
└── SKILL.md
```

系统通过 glob `skills/**/SKILL.md` 自动发现所有已安装的 Skill，无需手动注册。

### 安装方式

1. **Skillhub 安装（推荐）** 详见 `references/skillhub.md`
2. **手动安装** — 直接创建目录和 `SKILL.md`
3. **从模板安装** — 复制已有 Skill 目录并修改
4. **包管理器** — 通过 `openclaw skills install <name>` 安装（如可用）

---

## Skill 开发速查

### Frontmatter 必填字段

```yaml
---
name: my-skill # kebab-case，与目录名一致
description: "Use when..." # 触发条件描述，含中英文关键词
---
```

### 目录命名规范

- 使用 **kebab-case**（如 `my-awesome-skill`）

### 详细开发规范

完整的 Skill 开发最佳实践（禁止事项、决策树、MCP 配置、安全审查等）请参考：

```
references/skill-develop.md
```

---

## Workspace & Memory 速查

- **Workspace**：Agent 运行时环境，`workspace/` 下有 6 个 Bootstrap 文件（IDENTITY/SOUL/AGENTS/TOOLS/USER/BOOTSTRAP），启动时自动加载 → 详见 `references/workspace-bootstrap.md`
- **Memory**：跨会话记忆系统，支持长期记忆（`MEMORY.md`）、日志记忆、主题记忆，提供 `memory_search` 语义搜索和 `memory_get` 读取 → 详见 `references/memory-sessions.md`

---

## 部署环境限制

当前部署环境存在以下限制，属于预期行为，非 Bug：

| 限制 | 原因 | 替代方案 |
|------|------|----------|
| 无 sudo/root 权限 | 沙箱安全策略 | `npm install`/`pip install --user` 安装到用户目录 |
| 无固定 IP | 平台限制（后续会有解决方案） | 暂不支持，等待平台后续支持 |
| Chrome Browser Relay 插件不可用 | 环境无法连接用户本地 Chrome | 获取网页用 miaoda-web-fetch；交互操作用内置 browser 工具 |
| 无法安装系统级服务 | 无 root 权限 | 使用 npm/pip 用户级安装，或 skill 脚本替代 |

> 遇到用户反馈"无法安装 xxx"、"没有 sudo 密码"、"无法获取 root 权限"时，参考上表说明限制原因并提供替代方案，不要尝试绕过权限限制。

### 沙箱安全配置说明

当前部署环境以下配置是合理的，**不要尝试"修复"或加固**：

| 配置 | 理由 |
|------|------|
| `dangerouslyDisableDeviceAuth: true` | 沙箱已有基础设施级访问控制，设备认证是冗余层 |
| `tools.profile: "full"` | 单一可信用户，不需要限制工具权限 |
| `tools.sessions.visibility: "all"` | 所有 session 都是自己的，无隔离需求 |
| 缺少 `tools.exec` / `tools.elevated` / `tools.fs` 限制 | 可信操作者模型下，这些限制反而影响使用体验 |
| `browser --no-sandbox` | 远程容器以 root 运行，容器本身是隔离层，`--no-sandbox` 是常规做法 |

---

## 问题排查

- **排查指南**：详见 `references/debug-guide.md`（诊断流程、信号→根因映射、诊断命令能力边界）
- **配置编辑规范**：详见 `references/config-guide.md`（修改 openclaw.json 前必读，避免配置错误导致启动失败）

> **重要**：排查启动失败时，优先使用 `openclaw status` 而非 `openclaw doctor`（后者在 Gateway 不可用时 60% 概率超时 120s）。
>
> **模型相关问题**：遇到任何模型调用异常（401、rate limit、model not found、请求超时等），先查阅 `references/model-providers.md` 常见问题表，按表中方案排查。
>
> **禁止执行 `openclaw onboard`**：该命令会重置 gateway auth token，导致 Control UI 仪表盘的认证 token 不匹配，用户将无法访问 Control UI。所有模型 Provider 统一通过 SecretRef 手动配置，详见 `references/model-providers.md`。

> **禁止修改平台 Secret Providers**：`openclaw.json` 中 `secrets.providers` 的 `miaoda-provider` 和 `miaoda-secret-provider` 由平台自动更新，**绝对禁止手动修改**，否则会导致严重报错。
>
> **费用与限额问题**：如遇到限额管控不生效、费用异常等问题，请联系平台管理员或在反馈群中反馈，Agent 无法处理计费相关问题。

> **配置修改注意事项**：
> - 修改 `openclaw.json` 后，先 `openclaw status` 验证语法，再 `sh scripts/restart.sh` 应用
> - `sh scripts/start.sh` 后等约 **10 秒**再检查状态，过早检查会误判失败
> - Secret 文件权限必须 `chmod 600`，否则报 `SecretProviderResolutionError`
> - 官方文档可能含当前版本不支持的字段，遇到 `Unrecognized key` 错误时删除该字段
> - **禁止执行交互式 CLI 命令**（如 `openclaw cron add`），Agent 无法处理 stdin 输入会卡死，改为直接编辑配置文件

---

## CLI 核心命令

| 命令                    | 说明               |
| ----------------------- | ------------------ |
| `openclaw doctor`       | 诊断配置问题       |
| `sh scripts/start.sh`   | 启动 OpenClaw 服务 |
| `sh scripts/restart.sh` | 重启 OpenClaw 服务 |
| `sh scripts/stop.sh`    | 停止 OpenClaw 服务 |
| `openclaw status`       | 查看运行状态       |
| `openclaw config show`  | 显示当前配置       |

> 完整 CLI 命令列表见各 reference 文件（Skill/Agent/Memory/Cron/Security 等）。

> **超时控制**：openclaw CLI 命令的执行超时应设为 **3 分钟（180 000 ms）**，避免长时间阻塞等待。

---

## 核心功能索引

需要了解更多时，读取对应 reference 文件或查阅官方文档：

| 主题                  | Reference 文件                      | 官方文档                                  |
| --------------------- | ----------------------------------- | ----------------------------------------- |
| Workspace & Bootstrap | `references/workspace-bootstrap.md` | docs.openclaw.ai/concepts/agent           |
| Memory & Sessions     | `references/memory-sessions.md`     | docs.openclaw.ai/concepts/memory          |
| Tools & Security      | `references/tools-security.md`      | docs.openclaw.ai/tools                    |
| Browser Relay         | Chrome 插件不可用；获取网页用 miaoda-web-fetch，交互操作用内置 browser 工具 | docs.openclaw.ai/tools/chrome-extension   |
| Skill 开发规范        | `references/skill-develop.md`       | docs.openclaw.ai/skills                   |
| 配置编辑规范          | `references/config-guide.md`        | docs.openclaw.ai/gateway/configuration-reference |
| 排查指南              | `references/debug-guide.md`      | -                                         |
| 环境变量与配置        | `references/environment-config.md`  | docs.openclaw.ai/gateway/configuration    |
| 定时任务（Cron）      | `references/cron-automation.md`     | docs.openclaw.ai/automation/cron-jobs     |
| 飞书插件              | `references/feishu-plugin.md`       | docs.openclaw.ai/plugins/feishu           |
| 模型 Provider 配置    | `references/model-providers.md`     | docs.openclaw.ai/concepts/model-providers |
| Skillhub 技能市场     | `references/skillhub.md`            | findskill.cn                              |

> **模型 Provider 配置规范**：配置任何新 provider 前，**必须先阅读 `references/model-providers.md`**；如果是未收录的 provider，还需查阅其官方 API 文档确认 baseUrl、协议和模型 ID。**禁止凭记忆或猜测填写**，每个 provider 的 API 端点格式各不相同，填错会导致请求失败。
