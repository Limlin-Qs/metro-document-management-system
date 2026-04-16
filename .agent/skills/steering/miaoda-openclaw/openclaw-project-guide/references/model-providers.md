# 模型 Provider 配置指南

本文档介绍如何将 OpenClaw 底层模型切换为国产大模型（火山引擎、智谱、MiniMax、Moonshot、阿里云百炼、硅基流动等）。

---

## 配置流程

> **禁止执行 `openclaw onboard`**：该命令会重置 gateway auth token，导致 Control UI 认证 token 不匹配，用户无法访问 Control UI。
>
> **⚠️ 禁止凭记忆或猜测填写 baseUrl / 模型 ID。** 每个 provider 的 API 端点格式各不相同，填错会导致请求失败。
>
> **完整配置流程**：
> 1. **先读文档**：阅读本文件中对应 provider 的配置示例；如果是本文件未收录的新 provider，**必须先搜索该 provider 官方文档中关于如何配置 OpenClaw 的内容**（搜索关键词：`<provider名> OpenClaw 配置`），按官方文档配置。**禁止跳过搜索直接凭记忆配置**
> 2. 将 API Key 写入 secret 文件 + `chmod 600`（推荐放在 workspace 下如 `/home/gem/workspace/agent/.secrets/`）
> 3. 在 `secrets.providers` 添加自定义 secret provider（**禁止修改** `miaoda-provider` / `miaoda-secret-provider`）
> 4. 在 `models.providers` 中添加自定义 provider，`apiKey` 用 SecretRef 引用
> 5. 修改 `agents.defaults.model.primary` 切换到目标模型（或使用 `openclaw models set`）
> 6. 执行 `sh scripts/restart.sh` 重启 OpenClaw 服务使配置生效

### 通用步骤

**Step 1 — 创建 secret 文件**（将 `<name>` 替换为 provider 名称）：

```bash
echo -n "YOUR_KEY" > /home/gem/workspace/agent/.secrets/<name>-api-key && chmod 600 /home/gem/workspace/agent/.secrets/<name>-api-key
```

**Step 2 — 在 `openclaw.json` 中添加 `secrets.providers`**（将 `<name>` 替换为 provider 名称）：

```json
{
  "secrets": {
    "providers": {
      "<name>-secret": {
        "source": "file",
        "path": "/home/gem/workspace/agent/.secrets/<name>-api-key",
        "mode": "singleValue"
      }
    }
  }
}
```

**Step 3 — 在 `openclaw.json` 中添加 `models.providers`**（各 provider 配置见下方）：

| 字段      | 说明                                                                 |
| --------- | -------------------------------------------------------------------- |
| `baseUrl` | Provider API 端点（内置 Provider 可省略）                            |
| `apiKey`  | SecretRef 引用，指向 `secrets.providers` 中定义的 secret provider    |
| `api`     | API 协议：`openai-completions`（OpenAI 兼容）或 `anthropic-messages` |
| `models`  | 可用模型 ID 列表                                                     |

**Step 4 — 切换活跃模型**：

```bash
openclaw models set <provider>/<model-id>
sh scripts/restart.sh
```

---

## 完整配置示例：火山引擎 Coding Plan

- **内置 Provider**：无，需手动配置 `models.providers`
- **API 协议**：`openai-completions`
- **API Key**：在火山方舟控制台「开通管理 → Coding Plan」获取，格式为 UUID 如 `cf4d15ec-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **参考**：https://www.volcengine.com/docs/82379/2183190

```bash
echo -n "YOUR_KEY" > /home/gem/workspace/agent/.secrets/volcengine-api-key && chmod 600 /home/gem/workspace/agent/.secrets/volcengine-api-key
```

```json
{
  "secrets": {
    "providers": {
      "volcengine-secret": {
        "source": "file",
        "path": "/home/gem/workspace/agent/.secrets/volcengine-api-key",
        "mode": "singleValue"
      }
    }
  },
  "models": {
    "providers": {
      "volcengine": {
        "baseUrl": "https://ark.cn-beijing.volces.com/api/coding/v3",
        "apiKey": { "source": "file", "provider": "volcengine-secret", "id": "value" },
        "api": "openai-completions",
        "models": ["ark-code-latest"]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "volcengine/ark-code-latest"
      }
    }
  }
}
```

> `ark-code-latest` 为 Auto 模式，自动选择最优模型（含 Doubao-Seed-Code、GLM-4.7、DeepSeek-V3.2、Kimi-K2 等）。

---

## 其他 Provider 配置

以下只列出 `models.providers` 中的差异化配置片段。secret 文件创建和 `secrets.providers` 配置请参照上方通用步骤，将 `<name>` 替换为对应 provider 名称。

### 智谱 GLM (Z.AI)

- **内置 Provider**：`zai`（可省略 `baseUrl` 和 `api`）
- **Coding Plan baseUrl**：`https://open.bigmodel.cn/api/coding/paas/v4`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/zai-api-key`
- **参考**：https://docs.bigmodel.cn/cn/coding-plan/overview

```json
"zai": {
  "apiKey": { "source": "file", "provider": "zai-secret", "id": "value" },
  "models": ["glm-5", "glm-5-turbo", "glm-4.7"]
}
```

### MiniMax

- **内置 Provider**：`minimax`
- **API 协议**：`anthropic-messages`（推荐）
- **baseUrl**：`https://api.minimaxi.com/anthropic`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/minimax-api-key`
- **参考**：https://platform.minimax.io/docs/coding-plan

```json
"minimax": {
  "baseUrl": "https://api.minimaxi.com/anthropic",
  "apiKey": { "source": "file", "provider": "minimax-secret", "id": "value" },
  "api": "anthropic-messages",
  "models": ["MiniMax-M2.5", "MiniMax-M2.1"]
}
```

### Moonshot

- **内置 Provider**：`moonshot`（可省略 `baseUrl` 和 `api`）
- **baseUrl**：`https://api.moonshot.cn/v1`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/moonshot-api-key`
- **参考**：https://docs.openclaw.ai/providers/moonshot

```json
"moonshot": {
  "apiKey": { "source": "file", "provider": "moonshot-secret", "id": "value" },
  "models": ["kimi-k2.5"]
}
```

### 阿里云百炼 Coding Plan

- **内置 Provider**：无，需手动配置 `models.providers`
- **API 协议**：`openai-completions`
- **baseUrl**：`https://coding.dashscope.aliyuncs.com/v1`
- **API Key**：在[百炼 Coding Plan 控制台](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/efm/coding_plan)获取，格式为 `sk-sp-xxxxx`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/bailian-api-key`
- **参考**：https://help.aliyun.com/zh/model-studio/openclaw-coding-plan

```json
"bailian": {
  "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
  "apiKey": { "source": "file", "provider": "bailian-secret", "id": "value" },
  "api": "openai-completions",
  "models": ["qwen3.5-plus", "qwen3-coder-plus"]
}
```

> Coding Plan 专属 API Key（`sk-sp-` 前缀）与百炼按量付费 Key（`sk-` 前缀）**不通用**，混用会触发按量计费。套餐内可用模型包括 `qwen3.5-plus`、`qwen3-coder-plus`、`qwen3-coder-next`、`qwen3-max-2026-01-23`、`glm-5`、`glm-4.7`、`kimi-k2.5`、`MiniMax-M2.5`。

### Kimi Coding

- **内置 Provider**：无，需手动配置 `models.providers`
- **API 协议**：`openai-completions`
- **baseUrl**：`https://api.kimi.com/coding/v1`
- **API Key**：在 [Kimi Code 会员页面](https://kimi.com/code) 生成，格式为 `sk-kimi-xxxxx`
- **模型 ID**：`kimi-for-coding`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/kimi-coding-api-key`
- **参考**：https://www.kimi.com/code/docs/more/third-party-agents.html

```json
"kimi-coding": {
  "baseUrl": "https://api.kimi.com/coding/v1",
  "apiKey": { "source": "file", "provider": "kimi-coding-secret", "id": "value" },
  "api": "openai-completions",
  "models": ["kimi-for-coding"]
}
```

> **提示**：Kimi Coding Plan 官方支持在 Claude Code 和 Roo Code 中使用，OpenClaw 暂不在官方列表内，配置后如遇异常可能与此有关，建议优先使用平台内置模型或其他已支持的 provider。

### 硅基流动 SiliconFlow

- **内置 Provider**：无，需手动配置 `models.providers`
- **API 协议**：`openai-completions`
- **baseUrl**：`https://api.siliconflow.cn/v1`
- **API Key**：在 [SiliconFlow 模型广场](https://cloud.siliconflow.cn) 获取，格式为 `sk-xxxxx`
- **Secret 文件名**：`/home/gem/workspace/agent/.secrets/siliconflow-api-key`
- **参考**：https://docs.siliconflow.cn/cn/usercases/use-siliconcloud-in-OpenClaw

```json
"siliconflow": {
  "baseUrl": "https://api.siliconflow.cn/v1",
  "apiKey": { "source": "file", "provider": "siliconflow-secret", "id": "value" },
  "api": "openai-completions",
  "models": ["zai-org/GLM-4.6"]
}
```

> SiliconFlow 平台聚合 100+ 模型，模型 ID 需从 [SiliconFlow 模型广场](https://cloud.siliconflow.cn) 复制完整名称（如 `zai-org/GLM-4.6`），不要自行拼写。

---

## 模型对比

| 模型              | 厂商       | 上下文 | 最大输出 | 内置 Provider        | 特点           |
| ----------------- | ---------- | ------ | -------- | -------------------- | -------------- |
| `ark-code-latest` | 火山引擎   | 256K   | 32K      | 无（手动配置）       | Auto 智能选模  |
| `glm-5`           | 智谱       | 128K   | -        | `zai`                | 最新旗舰       |
| `glm-4.7`         | 智谱       | 128K   | 65536    | `zai`                | 推理能力强     |
| `MiniMax-M2.5`    | MiniMax    | 200K   | 8192     | `minimax`            | Coding SOTA    |
| `kimi-k2.5`       | Moonshot   | 256K   | 8192     | `moonshot`           | Agent 能力强   |
| `qwen3.5-plus`    | 阿里云百炼 | 1M     | 65536    | 无（手动配置）       | 图片理解       |
| `kimi-for-coding`  | Kimi       | 256K   | 32K      | 无（手动配置）       | 官方支持列表外，可能受限 |
| `zai-org/GLM-4.6` | 硅基流动   | 200K   | 8192     | 无（手动配置）       | 聚合平台，100+ 模型可选 |

---

## 常见问题

| 问题                     | 原因与解决方案                                                                 |
| ------------------------ | ------------------------------------------------------------------------------ |
| 401 Unauthorized         | API Key 无效或 SecretRef 配置错误，检查 secret 文件内容和权限（`chmod 600`）   |
| Model not found          | 模型 ID 拼写错误，或未在 `models` 数组中声明该模型                             |
| 请求超时                 | 网络问题或 baseUrl 错误，检查端点地址是否正确                                  |
| 配置修改后不生效         | 需执行 `sh scripts/restart.sh` 重启服务                                        |
| Coding Plan 额度异常消耗 | 检查是否误用了套餐外模型（如智谱 Flash），切换回套餐内推荐模型                 |
| `SecretProviderResolutionError: permissions are too open` | Secret 文件权限过宽，OpenClaw 要求严格权限。执行 `chmod 600 <secret-file-path>` 收紧权限后重启：`sh scripts/restart.sh` |
| API rate limit reached   | 用户自行配置的模型 Provider 触发了限流，非平台问题。请到对应模型厂商后台检查 API 额度、QPS/RPM 限制，或稍后重试 |
