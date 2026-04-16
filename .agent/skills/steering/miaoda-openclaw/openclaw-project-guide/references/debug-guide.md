# OpenClaw 排查指南

当 OpenClaw 服务异常（启动失败、无响应、功能异常等）时，按本指南排查。

**配置参考文档**：https://docs.openclaw.ai/gateway/configuration-reference

**版本差异提醒**：当前部署的 OpenClaw 是固定版本，官方文档始终是最新版。文档中的某些字段可能在当前版本中不支持。按文档改了还报错 = 当前版本不支持，删除并告知用户。

## 排查流程

```
Step 1: 并行跑诊断命令（openclaw status + curl health + ps aux）
  ↓
Step 2: 根据 status 输出判断问题类型 → 直接修复
  ↓
Step 2 输出正常？→ Step 3: 深入排查隐藏问题（doctor + 日志 + 端到端测试）
  ↓
Step 4: sh scripts/restart.sh → 等 10 秒 → openclaw status 验证
```

## Step 1：快速诊断（并行执行）

```bash
openclaw status 2>&1
curl -s --max-time 5 http://127.0.0.1:18789/health
ps aux | grep openclaw-gateway | grep -v grep
```

## Step 2：根据输出判断问题

| `openclaw status` 输出 | 问题 |
|------------------------|------|
| `Unrecognized key: "xxx"` | 配置中有不支持的 key。先查文档确认，确认不支持则删除 |
| `Invalid input` | Provider/Secret 配置格式错误。结合 `references/model-providers.md` 修复 |
| `Gateway ... unreachable` / `ECONNREFUSED` | Gateway 未运行。用 `lsof -i :18789` 查端口占用，restart 仍失败则 `timeout 10 openclaw gateway run --port 18789` 看具体报错 |
| `syntaxerror` / JSON 解析失败 | JSON 格式错误（中文引号/注释/截断）。如配置被截断，从 `openclaw.json.bak` 恢复 |
| `permissions are too open` | 密钥文件权限 644，`chmod 600 <报错路径>` |
| `unauthorized: gateway token mismatch` | Control UI 设备认证被修改。检查 `gateway.controlUi.dangerouslyDisableDeviceAuth=true` |
| `SandboxGatewayClient DoRequest failed` / 504 | 沙箱基础设施错误，`sh scripts/restart.sh` 1 次后上报 |
| **正常（reachable + OK）** | 进入 Step 3 深入排查 |

### 常见 Unrecognized key 速查

| 用户写的 | 正确做法 |
|---------|---------|
| `mcpServers` | 放到 `config/mcporter.json` |
| `skills.entries.*.path` | 删除 `path`，skill 通过目录自动发现 |
| `agents.defaults.imageModel` | 已废弃，删除 |
| `agents.entries` | 应为 `agents.list` |
| `agents.subagents.local` | 不支持 `local` 子项，删除 |
| `sessionTimeout` | 已废弃，删除 |
| `gateway.origins` | 不支持，删除 |

### secret source 合法值

`file`（推荐）、`env`。~~`literal`~~ 和 ~~`fixed`~~ 无效，是常见用户错误。

## Step 3：status 正常时深入排查

status 正常时**仍可能有隐藏问题**。并行执行：

```bash
openclaw doctor 2>&1
tail -50 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log 2>&1 | grep -iE "(error|fail)"
tail -50 /tmp/openclaw-gateway.log 2>&1 | grep -iE "(error|fail)"
openclaw agent --agent main --message "测试" --timeout 30 2>&1
```

### 信号 → 根因映射

| 发现的信号 | 根因 |
|-----------|------|
| `openclaw agent` 超时 | 模型 API 不可用（403/超时/额度用完） |
| 日志中 `403 status code` | API Key 权限不足 |
| 日志中 `422 对话额度已用完` | 妙搭免费额度用完，切换到其他已配置模型 |
| 日志中 `ENOENT: MEMORY.md` | 工作区文件缺失 |
| 日志中 `plugin id mismatch` | 插件 ID 不匹配 |
| 日志中 `Cannot find module` | 插件依赖缺失 |
| 日志中 `deleteWebhook failed` | Telegram/非飞书通道网络不通 |
| 日志中 `Label cannot be longer than 63 bytes` | mDNS 主机名超长，添加 `"discovery":{"mdns":{"mode":"off"}}` |
| `permissions are too open` | 密钥文件权限问题 |
| `no bootstrap files` | 非致命警告，可忽略 |

## Step 4：验证

Gateway 启动需约 10 秒，不要提前判定失败。

```bash
sleep 10
openclaw status 2>&1 | head -20
curl -s --max-time 5 http://127.0.0.1:18789/health
```

## 禁止事项

| 禁止 | 原因 |
|------|------|
| 手动拼启动命令（nohup、setsid、exec -a） | 用 `sh scripts/start.sh` / `restart.sh` |
| `openclaw gateway start/restart/stop` | 用 `sh scripts/start.sh` / `restart.sh` / `stop.sh` |
| `openclaw logs --follow/--tail/--lines` | 参数不存在，用管道 `\| tail -N` |
| `openclaw update` | 平台固定版本部署，不支持自行更新 |
| `openclaw onboard` | 会重置 gateway auth token，导致 Control UI 认证不匹配 |
| 沙箱 504 后反复 `openclaw doctor` | doctor 也走沙箱，同样超时 |
| 修改 `secrets.providers` 中的 `miaoda-provider` / `miaoda-secret-provider` | 由平台自动更新，禁止手动修改 |
| 不查文档直接猜测修复 | 先查官方文档确认正确格式 |

## 诊断命令能力边界

| 命令 | 能检测 | **不能检测** |
|------|--------|------------|
| `openclaw status` | Gateway 连通性、运行状态 | 模型 API 可用性、配置语法错误 |
| `openclaw doctor` | 配置完整性、权限、Skill 加载 | 模型 API 可达性（Gateway 不可用时 60% 超时） |
| `curl health` | 端口是否监听 | 服务能否正常处理请求 |
| `openclaw agent --message` | 端到端功能 | 具体错误原因 |

> 端口 18789 的 Browser Relay 连接失败不是启动问题，属于环境限制。
>
> 地域限制：部分地域（如 US）可能无法访问服务，是平台网络策略限制，非配置问题。
