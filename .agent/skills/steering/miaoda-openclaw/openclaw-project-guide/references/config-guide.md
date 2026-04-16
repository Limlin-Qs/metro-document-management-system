# OpenClaw 配置编辑规范

修改 `openclaw.json` 前必须遵循本规范，避免因配置错误导致启动失败。

**配置参考文档**：https://docs.openclaw.ai/gateway/configuration-reference

**版本差异提醒**：当前部署的 OpenClaw 是固定版本，官方文档始终是最新版。文档中的某些字段可能在当前版本中不支持。如果按文档配置后报 `Unrecognized key`，说明当前版本不支持该字段，删除并告知用户。

## 配置修改标准流程（严格按顺序，不允许跳步）

```
1. 查看当前配置：openclaw config get <key>（如 openclaw config get channels.feishu）
2. 确认字段合法性：不确定字段名或合法值时，查阅本文档或官方文档，不要凭记忆添加
3. 修改配置：
   a. 必须先用 openclaw config set <key> <value> 尝试
   b. 只有当命令明确报错或返回不支持的信息后，才能直接编辑 openclaw.json
   c. 禁止预设"命令行做不到"就直接编辑文件
   d. 直接编辑时：参考文档和已有结构，精确修改（不要全量覆写）
4. 验证语法：openclaw status
5. 应用配置：sh scripts/restart.sh
6. 确认健康：等约 10 秒后 openclaw health 确认服务正常
如有报错，根据报错修复（见 references/debug-guide.md）
```

**注意：只查阅官方文档获取配置信息，不要搜索博客、论坛等非官方来源**

## 禁止事项

| 禁止 | 原因 |
|------|------|
| 不查文档、不读配置直接写入 | 不确定的字段写错会导致启动失败 |
| 不试 `config set` 就直接编辑 `openclaw.json` | 必须先用 `openclaw config set` 尝试，命令明确报错后才能编辑文件 |
| 凭印象猜字段名或格式 | 查文档确认后再写 |
| 搜索非官方来源的配置写法 | 博客、论坛、其他框架的配置格式不适用于 OpenClaw，只查官方文档 |
| 写完配置不验证 | `openclaw status` 检查语法 → `sh scripts/restart.sh` 应用 → 等 10 秒 → `openclaw health` 确认 |
| 修改文档内容 | 文档是只读参考 |
| 服务管理用 `openclaw gateway start/restart/stop` | 用 `sh scripts/start.sh` / `restart.sh` / `stop.sh` |
| 修改 `secrets.providers` 中的 `miaoda-provider` 或 `miaoda-secret-provider`，或修改其引用的文件（`/home/gem/workspace/.force/openclaw/miaoda-provider-key`、`/home/gem/workspace/.force/openclaw/miaoda-openclaw-secrets.json`） | 由平台自动更新，手动修改会导致严重报错 |

## 不确定的字段怎么处理

1. **先查文档**：到配置参考文档搜索相关配置说明
2. **再看现有配置**：`openclaw config get <key>` 查看当前值，或参考 `openclaw.json` 中已有的同类型条目
3. 按文档写了还报 `Unrecognized key` → 当前版本不支持 → 删除并告知用户
4. 文档里也没有 → 无效字段 → 删除

## 模型配置
结合 `references/model-providers.md` 和官方文档的配置说明进行修改，禁止直接修改。

## Common Mistakes

| 错误模式 | 正确模式 |
|----------|----------|
| 不查文档不读配置，直接写入 | 先查文档，再 `config get` 看现有配置，再修改 |
| 不试 `config set` 就直接编辑文件 | 先 `config set` 尝试，报错后才编辑文件 |
| 凭印象猜字段名 | 查文档确认字段名和格式 |
| 按文档配了报错就反复猜其他写法 | 按文档改还报错 = 当前版本不支持，删除并告知用户 |
| 写完不验证 | `openclaw status` → `sh scripts/restart.sh` → 等 10 秒 → `openclaw health` |
| 创建 secrets 文件忘记 chmod | `chmod 600 <file>` |
