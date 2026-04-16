# 定时任务（Cron Automation）

OpenClaw 支持通过 `cron/jobs.json` 配置定时任务，让 Agent 按计划自动执行 prompt。

> 官方文档：[docs.openclaw.ai/automation/cron-jobs](https://docs.openclaw.ai/automation/cron-jobs)

---

## 配置文件

定时任务定义在 `OPENCLAW_STATE_DIR/cron/jobs.json`：

```json
{
  "jobs": [
    {
      "name": "daily-report",
      "schedule": { "type": "every", "interval": "24h" },
      "prompt": "生成今日工作日报并发送到飞书群",
      "execution": "isolated",
      "delivery": "announce",
      "enabled": true
    }
  ]
}
```

### 字段说明

| 字段        | 必需 | 说明                                          |
| ----------- | ---- | --------------------------------------------- |
| `name`      | 是   | 任务唯一标识，kebab-case                      |
| `schedule`  | 是   | 调度规则（见下方 Schedule 类型）               |
| `prompt`    | 是   | Agent 执行的 prompt 内容                      |
| `execution` | 否   | 执行方式：`main`（默认）/ `isolated`          |
| `delivery`  | 否   | 结果通知：`announce`（默认）/ `webhook` / `none` |
| `enabled`   | 否   | 是否启用，默认 `true`                         |

---

## Schedule 类型

| 类型    | 格式                                      | 示例                                    |
| ------- | ----------------------------------------- | --------------------------------------- |
| `at`    | 指定时间点（ISO 8601 / 自然语言）         | `{ "type": "at", "time": "09:00" }`    |
| `every` | 固定间隔（`30m`, `2h`, `1d` 等）          | `{ "type": "every", "interval": "6h" }`|
| `cron`  | 标准 cron 表达式（5 位）                  | `{ "type": "cron", "expr": "0 9 * * 1-5" }` |

---

## 执行方式

| 方式       | 说明                                         |
| ---------- | -------------------------------------------- |
| `main`     | 在主 Agent 会话中执行，可访问当前上下文      |
| `isolated` | 启动独立会话执行，不影响主会话状态（推荐用于长任务） |

---

## Delivery（结果通知）

| 方式       | 说明                                         |
| ---------- | -------------------------------------------- |
| `announce` | 将结果输出到主会话（默认）                   |
| `webhook`  | 将结果发送到配置的 webhook URL               |
| `none`     | 不通知，仅记录日志                           |

---

## CLI 命令速查

| 命令                          | 说明                 |
| ----------------------------- | -------------------- |
| `openclaw cron list`          | 列出所有定时任务     |
| `openclaw cron rm <name>`     | 删除指定任务         |
| `openclaw cron run <name>`    | 立即执行指定任务     |
| `openclaw cron status`        | 查看任务运行状态     |
| `openclaw cron enable <name>` | 启用指定任务         |
| `openclaw cron disable <name>`| 禁用指定任务         |

> **添加任务**：直接编辑 `cron/jobs.json` 文件，不要使用 `openclaw cron add`（交互式命令，Agent 无法执行）。

> **超时控制**：cron CLI 命令同样遵循 3 分钟（180 000 ms）超时限制。
