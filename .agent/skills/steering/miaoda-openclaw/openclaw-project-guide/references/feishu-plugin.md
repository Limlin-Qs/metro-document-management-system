# 飞书官方插件指南

自定义插件 `feishu-openclaw-plugin` 已预装并启用，内置 `feishu` 插件已禁用。以用户身份操作飞书消息、文档、多维表格、日历和任务。

官方文档（排查辅助资源）：https://bytedance.larkoffice.com/docx/MFK7dDFLFoVlOGxWCv5cTXKmnMh

---

## 插件架构

插件随脚手架模板打包，包含完整源码和 `node_modules`（约 53MB），部署后即可使用。

| 项目 | 内置 feishu | feishu-openclaw-plugin |
|------|-------------|------------------------|
| 状态 | **disabled** | **enabled** |
| npm 包 | — | `@larksuiteoapi/feishu-openclaw-plugin` |
| 安装路径 | — | `extensions/feishu-openclaw-plugin/` |
| 管理工具 | — | `feishu-plugin-onboard` CLI |

`openclaw.json` 中 plugins 配置结构：

```json
{
  "plugins": {
    "allow": ["feishu-openclaw-plugin"],
    "entries": {
      "feishu": { "enabled": false },
      "feishu-openclaw-plugin": { "enabled": true }
    },
    "installs": {
      "feishu-openclaw-plugin": {
        "source": "npm",
        "spec": "@larksuiteoapi/feishu-openclaw-plugin",
        "installPath": "./extensions/feishu-openclaw-plugin"
      }
    }
  }
}
```

---

## 能力总览

| 类别 | 能力 |
|------|------|
| **消息** | 读取（群聊/单聊/话题回复）、发送、回复、搜索、图片/文件下载 |
| **文档** | 创建、读取、更新云文档 |
| **多维表格** | 表格/数据表/字段/记录 CRUD、批量操作、高级筛选、视图管理 |
| **日历** | 日程 CRUD、搜索、参会人管理、忙闲查询 |
| **任务** | 任务/子任务/评论 CRUD、任务列表管理 |
| **搜索** | 文档搜索、消息搜索 |
| **用户** | 用户查找/搜索 |

内置 8 个 AI 技能：`create-doc` / `fetch-doc` / `update-doc` / `bitable` / `calendar` / `task` / `im-read` / `channel-rules`

---

## 已预装说明

以下内容在部署时已全部就绪，**无需执行任何安装或配对步骤**：

- `feishu-openclaw-plugin` 插件已安装并启用
- `feishu-plugin-onboard` CLI 已安装（v1.0.14+ 支持 `OPENCLAW_STATE_DIR`）
- 飞书应用权限已配置并审批通过
- 事件订阅（长连接 + `im.message.receive_v1`）已配置
- `dmPolicy: allowlist` 已配置，owner open_id 已自动注入

---

## 鉴权与权限

### 双身份模式

本插件采用**双身份**架构，工具操作以用户身份执行：

| 身份 | Token 类型 | 用途 | 授权方式 |
|------|-----------|------|---------|
| 应用身份 | Tenant Access Token | channel 层（接收消息、bot 探测等基础设施） | 应用创建时自动获取 |
| 用户身份 | User Access Token | 工具层（文档、日历、任务等用户数据操作） | OAuth Device Flow（对话中扫二维码） |

用户身份令牌自动持久化（macOS Keychain / Linux 加密文件 / Windows DPAPI）并自动刷新。

### 权限与授权

- **三层检查**：工具所需 scope → 应用已授权（Tenant）→ 用户已授权（User）
- **动态工具可见性**：未满足权限的工具对 AI **不可见**（自动隐藏）
- **按需授权**：工具调用时缺权限会自动触发 OAuth 授权（auto-auth）
- **批量授权**：`/feishu auth` 一次性授权所有缺失的用户权限

---

## Channel 配置

配置位于 `openclaw.json` 的 `channels.feishu` 下（注意：不是 `plugins.feishu`）：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxx",
      "appSecret": "xxx",
      "domain": "feishu",
      "requireMention": true,
      "dmPolicy": "allowlist",
      "allowFrom": ["owner_open_id"],
      "groupPolicy": "open"
    }
  }
}
```

**dmPolicy 说明：** 默认 `allowlist`，`allowFrom` 中 owner open_id 由 onboard CLI 自动注入，仅允许列表中用户私聊。无需手动配对。

**常用配置命令：**

| 命令 | 说明 |
|------|------|
| `openclaw config set channels.feishu.streaming true` | 开启流式输出 |
| `openclaw config set channels.feishu.threadSession true` | 话题独立上下文（群聊推荐） |
| `openclaw config set channels.feishu.footer.elapsed true` | 流式卡片显示耗时 |
| `openclaw config set channels.feishu.footer.status true` | 流式卡片显示状态 |

**requireMention 决策树：**

```
requireMention 配置
├─ 所有群都要 @机器人 → requireMention: true（推荐）
├─ 所有群都不用 @ → requireMention: false（需额外权限 im:message.group_msg）
└─ 按群配置
   ├─ 默认 requireMention: "open"
   └─ 指定群 → channels.feishu.groups.<chat_id>.requireMention: true
```

配置变更后需执行 `sh scripts/restart.sh` 生效。

---

## 插件更新

当需要更新插件到最新版本时：

```bash
feishu-plugin-onboard update
```

如需同时更新 onboard CLI 本身：

```bash
curl -o /tmp/feishu-openclaw-plugin-onboard-cli.tgz \
  https://sf3-cn.feishucdn.com/obj/open-platform-opendoc/195a94cb3d9a45d862d417313ff62c9c_gfW8JbxtTd.tgz
npm install /tmp/feishu-openclaw-plugin-onboard-cli.tgz -g
rm /tmp/feishu-openclaw-plugin-onboard-cli.tgz
feishu-plugin-onboard update
```

更新后执行 `sh scripts/restart.sh` 生效。

---

## CLI 命令速查

### Onboard CLI（终端执行）

| 命令 | 说明 |
|------|------|
| `feishu-plugin-onboard update` | 更新插件到最新版本 |
| `feishu-plugin-onboard doctor` | 诊断检查（目录、依赖、配置） |
| `feishu-plugin-onboard doctor --fix` | 诊断并自动修复 |
| `feishu-plugin-onboard info` | 查看 CLI / OpenClaw / 插件版本 |
| `feishu-plugin-onboard info --all` | 查看版本 + 完整配置（反馈问题时附带） |

### 对话命令（飞书对话中发送）

| 命令 | 说明 |
|------|------|
| `/feishu start` | 验证插件是否正常运行（返回版本号） |
| `/feishu doctor` | 检查插件配置是否正常 |
| `/feishu auth` | 批量授权用户飞书工具权限 |

---

## 故障排查

```
飞书插件异常
├─ /feishu start 无响应
│  ├─ /feishu doctor → 根据提示修复
│  └─ 仍失败 → feishu-plugin-onboard doctor --fix
├─ 消息收不到
│  ├─ 检查事件订阅（长连接 + im.message.receive_v1）
│  ├─ 检查权限是否已审批通过
│  └─ 群聊检查 requireMention 配置
├─ 工具不可用 / AI 找不到飞书工具
│  ├─ /feishu auth → 批量授权缺失权限
│  └─ 检查应用权限是否已审批通过
├─ cannot find module xxx
│  └─ cd extensions/feishu-openclaw-plugin && npm install
├─ 配置变更不生效
│  └─ sh scripts/restart.sh
├─ 需要更新插件
│  └─ feishu-plugin-onboard update
└─ 复杂问题
   ├─ feishu-plugin-onboard info --all（附带输出提交反馈群）
   └─ 参考官方文档排查：https://bytedance.larkoffice.com/docx/MFK7dDFLFoVlOGxWCv5cTXKmnMh
```

---

## 飞书场景配置说明

以下配置在 `openclaw doctor` 中可能被标记为警告或严重问题，但在飞书部署场景下属于**预期配置**，无需修改：

| 诊断项 | 当前配置 | 飞书场景说明 |
|--------|----------|-------------|
| Control UI 设备认证被禁用 | `gateway.controlUi.dangerouslyDisableDeviceAuth=true` | 飞书通过应用身份 + 用户 OAuth 双重鉴权，无需设备认证 |
| 群组策略过于开放 | `channels.feishu.groupPolicy="open"` | 飞书群聊通过 `requireMention` 控制响应范围，open 策略允许被拉入任意群 |
| 高风险工具暴露在开放群组 | `tools.profile="full"` | 飞书用户操作受 OAuth 权限约束，工具调用以用户身份执行，权限由飞书应用审批控制 |
| 飞书文档创建权限风险 | `channels.feishu.tools.doc` 启用 | 文档创建是核心功能，权限通过飞书应用权限审批和用户 OAuth 授权双重保障 |

---

## 安全注意事项

| 事项 | 建议 |
|------|------|
| App Secret 保管 | 不要硬编码或明文存储，通过 onboard CLI 写入配置 |
| 权限最小化 | 仅申请实际需要的权限，定期审计 |
| requireMention | 群聊中建议设为 `true`，避免大群刷屏 |
| dmPolicy | 默认 `allowlist`，owner open_id 已自动注入，限制私聊范围 |
| 用户授权 | 通过 `/feishu auth` 按需授权，审计授权用户列表 |
