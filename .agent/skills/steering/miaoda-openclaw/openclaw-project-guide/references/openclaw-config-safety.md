# openclaw.json lint 约束参考

`node scripts/validate-configs.mjs`（即 `npm run lint`）对以下三个区块做强制校验，修改这些区块时必须满足约束，否则 lint 失败。

---

## 1. lint 覆盖范围

| 区块 | 校验内容 |
|------|---------|
| `secrets.providers` | 两个 provider 必须同时存在且结构完整 |
| `models.providers.miaoda` | 必填字段、枚举值、`miaoda-model-auto` 存在性 |
| `agents.defaults.model` / `agents.defaults.models` | 已知模型名称拼写错误自动报告 |

其他区块（tools、channels、gateway、plugins、agents.defaults 其余字段等）**不在 lint 覆盖范围内**。

---

## 2. `secrets.providers` — 禁止破坏的结构

两个 provider 必须同时存在，且每个 provider 必须包含 `source` 和 `path` 字段。

```
secrets.providers
├── miaoda-provider        必须存在，必填 source + path
└── miaoda-secret-provider 必须存在，必填 source + path
```

**会导致 lint 失败的修改：**
- 删除 `miaoda-provider` 或 `miaoda-secret-provider`
- 删除任一 provider 的 `source` 或 `path` 字段
- 将 `secrets.providers` 整体替换为非对象类型

---

## 3. `models.providers.miaoda` — 禁止破坏的结构

### 3.1 必填字段

`models.providers.miaoda` 必须包含以下所有字段：

| 字段 | 类型 | 约束 |
|------|------|------|
| `baseUrl` | string | 必填 |
| `apiKey` | object | 必填，见下 |
| `api` | string | 枚举，见下 |
| `headers` | object | 必填，须含 `x-api-key` |
| `models` | array | 至少 1 项，且必须含 `id: "miaoda-model-auto"` 的条目 |

### 3.2 枚举约束（改错值会 lint 失败）

| 字段 | 允许值 |
|------|--------|
| `models.providers.miaoda.api` | `"openai-completions"` \| `"anthropic-messages"` |
| `models.providers.miaoda.apiKey.provider` | `"miaoda-provider"`（固定值） |
| `models.providers.miaoda.headers.x-api-key.provider` | `"miaoda-secret-provider"`（固定值） |

### 3.3 `miaoda-model-auto` 存在性

`models.providers.miaoda.models` 数组中必须至少有一项 `id` 为 `"miaoda-model-auto"`，缺失会 lint 失败。

---

## 4. `agents.defaults.models` — 拼写检查

以下模型名称写法会被 lint 标记（`--fix` 可自动修正）：

| 错误写法 | 正确写法 |
|---------|---------|
| `"miaoda/miaoda-auto"` | `"miaoda/miaoda-model-auto"` |

涉及位置：`agents.defaults.model.primary` 和 `agents.defaults.models` 的 key。

---

## 5. 跨引用关系（修改时须手动保持一致）

以下跨引用关系 **lint 不自动检查**，但破坏后会导致运行时异常：

```
secrets.providers
├── miaoda-provider        ◄── models.providers.miaoda.apiKey.provider
└── miaoda-secret-provider ◄── models.providers.miaoda.headers.x-api-key.provider
                            ◄── channels.feishu.appSecret.provider
                            ◄── gateway.auth.token.provider

models.providers.miaoda.models[].id
└── "miaoda-model-auto"    ◄── agents.*.model.primary = "miaoda/miaoda-model-auto"
                            ◄── agents.*.models["miaoda/miaoda-model-auto"]
```
