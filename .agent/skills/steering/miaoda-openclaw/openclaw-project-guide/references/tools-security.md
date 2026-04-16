# Tools & Security 指南

OpenClaw 的工具系统控制 Agent 可执行的操作，安全配置保护用户数据和系统资源。

官方文档：https://docs.openclaw.ai/tools | https://docs.openclaw.ai/gateway/security

---

## 工具分类

| 分类         | 工具组              | 包含工具                                                                  |
| ------------ | ------------------- | ------------------------------------------------------------------------- |
| **运行时**   | `group:runtime`     | `exec`, `bash`, `process`                                                 |
| **文件系统** | `group:fs`          | `read`, `write`, `edit`, `apply_patch`                                    |
| **网络**     | `group:web`         | `web_search`, `web_fetch`                                                 |
| **UI**       | `group:ui`          | `browser`, `canvas`                                                       |
| **消息**     | `group:messaging`   | `message`                                                                 |
| **会话**     | `group:sessions`    | `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`, `session_status` |
| **自动化**   | `group:automation`  | `cron`, `gateway`                                                         |
| **节点**     | `group:nodes`       | `nodes`                                                                   |
| **记忆**     | `group:memory`      | `memory_search`, `memory_get`                                             |
| **全局**     | `group:openclaw`    | 所有内置工具                                                              |

---

## Tool Profiles

预置的工具权限配置方案，适用于不同场景：

| Profile      | 包含工具组/工具                                                                             | 适用场景         |
| ------------ | ------------------------------------------------------------------------------------------- | ---------------- |
| `minimal`    | `session_status` only                                                                       | 只读查询型 Agent |
| `coding`     | `group:fs` + `group:runtime` + `group:sessions` + `group:memory` + `image`                  | 开发编码型 Agent |
| `messaging`  | `group:messaging` + `sessions_list` + `sessions_history` + `sessions_send` + `session_status` | 消息通知型 Agent |
| `full`       | 无限制（默认）                                                                              | 全能型 Agent     |

在 `openclaw.json` 中配置：

```json
{
  "tools": {
    "profile": "coding"
  }
}
```

---

## Tool Groups — Allow/Deny 策略

细粒度控制工具权限：

```json
{
  "tools": {
    "profile": "coding",
    "allow": ["group:web", "memory_search"],
    "deny": ["bash", "process"]
  }
}
```

### 策略优先级

```
deny > allow > profile > 默认拒绝
```

- `deny` 列表优先级最高，显式拒绝的工具不可覆盖
- `allow` 在 profile 基础上额外允许工具
- 未在 profile 和 allow 中的工具默认拒绝

---

## Browser 工具说明

Chrome Browser Relay 插件无法连接，这是部署环境限制，非 Bug。

| 需求 | 替代方案 |
|------|----------|
| 获取网页信息 | `miaoda-web-fetch`（`miaoda-studio-cli web-crawl --url "..."`） |
| 交互操作（点击/填表/截图等） | 使用内置 `browser` 工具 |

> 用户报告 Browser Relay 连接失败时，说明这是环境限制并引导使用上述替代方案。

---

## 沙箱模式

### 沙箱配置

Agent 可通过沙箱隔离系统资源。沙箱支持多种模式：

```json
{
  "sandbox": {
    "mode": "tools",
    "runtime": "docker",
    "image": "openclaw/sandbox:latest",
    "workspaceAccess": "readwrite",
    "network": {
      "enabled": true,
      "allowlist": ["api.example.com"]
    }
  }
}
```

### 沙箱模式说明

| Mode           | 说明                                     |
| -------------- | ---------------------------------------- |
| `off`          | 关闭沙箱（默认）                         |
| `all`          | 所有操作均在沙箱中执行                   |
| `tools`        | 仅工具调用在沙箱中执行                   |
| `restricted`   | 仅受限工具在沙箱中执行                   |

- `workspaceAccess`：`"readwrite"`（默认）或 `"readonly"`，控制沙箱内对工作区的访问权限
- `network.enabled`：是否允许网络访问
- `network.allowlist`：网络白名单（仅允许访问列表中的域名）

---

## DM（私信）策略

控制 Agent 的私信行为：

| 策略        | 说明                                     |
| ----------- | ---------------------------------------- |
| `pairing`   | 仅与配对用户通信（默认）                 |
| `allowlist` | 仅与白名单用户通信                       |
| `open`      | 允许与任何用户通信                       |
| `disabled`  | 禁用私信功能                             |

```json
{
  "messaging": {
    "dm": {
      "policy": "allowlist",
      "allowlist": ["user1", "user2"]
    }
  }
}
```

### 飞书 Channel 的 dmPolicy

妙搭飞书 channel 的 DM 策略配置在 `channels.feishu` 下，推荐使用 `allowlist`（跳过配对码）：

```json
{
  "channels": {
    "feishu": {
      "dmPolicy": "allowlist",
      "allowFrom": ["ou_xxxxxxxxxxxx"]
    }
  }
}
```

`allowFrom` 的值为飞书用户 open_id（`ou_` 前缀），由平台在创建应用时预配置。

---

## 群聊控制

| 配置              | 说明                                |
| ----------------- | ----------------------------------- |
| `requireMention`  | 群聊中必须 @Agent 才会响应（推荐） |
| `autoRespond`     | 自动响应所有消息                    |

```json
{
  "messaging": {
    "channel": {
      "requireMention": true
    }
  }
}
```

---

## CLI 命令速查

| 命令                         | 说明                 |
| ---------------------------- | -------------------- |
| `openclaw security audit`    | 安全审计与检查（支持 `--deep`、`--fix`、`--json`） |
| `sh scripts/start.sh`        | 启动服务             |
| `sh scripts/restart.sh`     | 重启服务             |
| `sh scripts/stop.sh`        | 停止服务             |
| `openclaw gateway health`    | 网关健康检查         |
| `openclaw gateway status`    | 网关运行状态         |
| `openclaw secrets`           | 密钥管理             |
| `openclaw channels login`    | 配对消息渠道         |
| `openclaw channels list`     | 列出已配对渠道       |
| `openclaw plugins list`      | 列出插件             |
| `openclaw plugins install`   | 安装插件             |

---

## 沙箱环境默认配置说明

妙搭平台部署的 OpenClaw 实例运行在受控沙箱中，以下配置是平台预设的合理默认值：

| 配置 | 理由 |
|------|------|
| `dangerouslyDisableDeviceAuth: true` | 沙箱已有基础设施级访问控制，设备认证是冗余层 |
| `tools.profile: "full"` | 单一可信用户，不需要限制工具权限 |
| `tools.sessions.visibility: "all"` | 所有 session 都是自己的，无隔离需求 |
| 缺少 `tools.exec` / `tools.elevated` / `tools.fs` 限制 | 可信操作者模型下，这些限制反而影响使用体验 |
| `browser --no-sandbox` | 远程容器以 root 运行，容器本身是隔离层 |

> 这些配置与下方"硬化基线"不同，是因为沙箱环境本身提供了隔离保障。**不要在沙箱环境中尝试应用硬化基线**。

---

## 硬化基线配置

生产环境推荐的最小权限配置：

```json
{
  "tools": {
    "profile": "coding",
    "deny": ["bash", "process", "message"]
  },
  "sandbox": {
    "mode": "tools",
    "runtime": "docker",
    "workspaceAccess": "readwrite",
    "network": {
      "enabled": true,
      "allowlist": []
    }
  },
  "messaging": {
    "dm": {
      "policy": "pairing"
    },
    "channel": {
      "requireMention": true
    }
  }
}
```

**要点**：最小工具权限 + Docker 沙箱 + 网络白名单 + DM pairing + 群聊 @mention + 定期 `openclaw security audit`
