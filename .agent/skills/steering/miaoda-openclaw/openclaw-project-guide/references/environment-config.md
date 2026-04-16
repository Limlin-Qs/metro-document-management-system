# 环境变量与配置指南

OpenClaw 运行环境由 `OPENCLAW_STATE_DIR` 和 `openclaw.json` 中的变量共同定义。本文档说明妙搭平台的定制点。

---

## OPENCLAW_STATE_DIR

`OPENCLAW_STATE_DIR` = `/home/gem/workspace/agent`

Skills 路径：

| 类型            | 路径                                    |
| --------------- | --------------------------------------- |
| 全局 Skill      | `/home/gem/workspace/agent/skills/`              |
| Workspace Skill | `/home/gem/workspace/agent/<workspace>/skills/` |

### 数据存储路径

> 详见 [FAQ: Where does OpenClaw store its data](https://docs.openclaw.ai/help/faq)

| 路径                                          | 用途                                           |
| --------------------------------------------- | ---------------------------------------------- |
| `openclaw.json`                               | 主配置（JSON5）                                |
| `agents/<agentId>/agent/auth-profiles.json`   | 认证配置（OAuth、API keys、可选 keyRef/tokenRef）|
| `agents/<agentId>/sessions/`                  | 会话历史与状态                                 |
| `agents/<agentId>/sessions/sessions.json`     | 会话元数据                                     |

---

## controlUi 配置

| 字段                              | 说明                                       |
| --------------------------------- | ------------------------------------------ |
| `controlUi.allowedOrigins`        | 允许访问的域名列表（由平台在创建应用时预配置） |
| `controlUi.dangerouslyDisableDeviceAuth` | 禁用设备认证（`true` = 免授权访问）  |
| `controlUi.enabled`               | 是否启用 Control UI                        |

```json
{
  "gateway": {
    "controlUi": {
      "allowedOrigins": ["https://your-app-domain.example.com"],
      "dangerouslyDisableDeviceAuth": true,
      "enabled": true
    }
  }
}
```

> **注意**：`dangerouslyDisableDeviceAuth` 仅在可信网络环境（如平台内部）使用，生产公网环境应保持 `false`。
