# Memory & Sessions 指南

OpenClaw 的记忆系统让 Agent 跨会话保留知识。Session 管理控制会话的作用域和生命周期。

官方文档：https://docs.openclaw.ai/concepts/memory | https://docs.openclaw.ai/concepts/session

---

## Memory 架构

```
workspace/
├─ MEMORY.md                    # 长期记忆（仅在主私聊会话中加载）
└─ memory/
    ├─ 2024-01-15.md            # 日志记忆（按日期）
    ├─ 2024-01-16.md
    └─ topics/                  # 主题记忆（可选）
        ├─ architecture.md
        └─ debugging.md
```

> 向量索引为 per-agent SQLite 数据库（`~/.openclaw/memory/<agentId>.sqlite`），妙搭平台上对应 `/home/gem/workspace/agent/` 下的路径。

### 记忆类型

| 类型         | 文件                | 加载方式                                       | 用途                     |
| ------------ | ------------------- | ---------------------------------------------- | ------------------------ |
| **长期记忆** | `MEMORY.md`         | 仅在主私聊会话中注入（群聊不加载）             | 关键决策、架构、用户偏好 |
| **日志记忆** | `memory/YYYY-MM-DD.md` | 会话启动时自动加载今天和昨天的日志          | 每日工作记录、临时笔记   |
| **主题记忆** | `memory/topics/*.md`| 按需搜索                                       | 按主题组织的深度知识     |

### MEMORY.md 注意事项

- **主私聊加载**：仅在主私聊会话中注入上下文，群聊场景不加载，保持精简
- **截断限制**：超出 `memoryMaxChars` 配置的部分会被截断
- **建议行数**：< 200 行，聚焦高频引用的信息

---

## Memory 工具

### memory_search — 语义搜索

向量语义搜索记忆内容，适合模糊查找：

```
memory_search("上次讨论的数据库优化方案")
```

搜索机制：
- **混合搜索**：BM25 关键词匹配 + 向量语义匹配
- **MMR 去重**：Maximal Marginal Relevance 避免返回重复内容
- **时间衰减**：近期记忆权重更高
- **范围**：搜索 `memory/` 目录下所有文件

### memory_get — 读取文件

直接读取指定记忆文件：

```
memory_get("memory/2024-01-15.md")
memory_get("memory/topics/architecture.md")
```

---

## 写入模式

### 自动写入

Agent 在以下场景自动写入记忆：

| 触发条件                     | 写入位置                 |
| ---------------------------- | ------------------------ |
| 用户说"记住这个"/"remember"  | `MEMORY.md` 或日志文件   |
| 重要决策或架构变更           | `MEMORY.md`              |
| 日常工作记录                 | `memory/YYYY-MM-DD.md`   |
| 调试发现和解决方案           | 日志文件或主题文件       |

---

## Session 管理

### Session Scope（dmScope）

OpenClaw 使用 `dmScope` 控制会话的作用域，决定 DM 会话如何隔离：

| dmScope                      | 说明                                         |
| ---------------------------- | -------------------------------------------- |
| `main`                       | 所有 DM 共享同一会话（默认）                 |
| `per-peer`                   | 每个用户独立会话                             |
| `per-channel-peer`           | 每个渠道+用户独立会话                        |
| `per-account-channel-peer`   | 每个账号+渠道+用户独立会话（最严格隔离）     |

> 完整优先级说明见官方文档 docs.openclaw.ai/concepts/session

### Session 存储

会话以 JSONL 格式存储：

```
agents/<agentId>/sessions/
├─ <SessionId>.jsonl           # 会话记录
└─ ...
```

> 妙搭平台上对应 `/home/gem/workspace/agent/agents/<agentId>/sessions/`

### Session Reset 配置

通过 `session.reset` 配置会话自动重置策略：

```json
{
  "session": {
    "reset": {
      "mode": "daily",
      "atHour": 4,
      "idleMinutes": 120
    }
  }
}
```

| 配置项         | 说明                                     |
| -------------- | ---------------------------------------- |
| `mode`         | 重置模式：`daily`（每日）等              |
| `atHour`       | 每日重置的小时（0-23）                   |
| `idleMinutes`  | 空闲多少分钟后重置会话                   |

### 常用命令

| 命令                              | 说明               |
| --------------------------------- | ------------------ |
| `openclaw sessions list`          | 列出所有会话       |
| `openclaw sessions show <id>`     | 查看会话详情 (待确认) |
| `openclaw sessions cleanup`       | 清理过期会话 (待确认) |

---

## 最佳实践

1. **MEMORY.md 保持精简**：只存放高频引用的关键信息，详细内容放 `memory/topics/`
2. **主题分类**：复杂项目使用 `memory/topics/` 按主题组织深度知识
3. **日志记忆**：系统会自动加载今天和昨天的日志，无需手动搜索近期记录
