# Skillhub 技能市场

Skillhub（FindSkill）是字节/火山的 Skills Hub 服务，提供技能的检索、下载、安装和安全扫描。门户无需登录即可访问，CLI 直接使用 `npx skills`（Vercel find-skills），通过 `SKILLS_API_URL` 指向火山 API。

门户地址：findskill.cn | findskill.com

---

## 核心能力

| 能力         | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| Skills 广场  | GitHub 开源 Skills 的国内镜像源 + AgentKit/OpenClaw 二方 Skills |
| Skills 检索  | 自然语言模糊检索，兼容 `npx skills find`                   |
| Skills 展示  | 元信息 & SKILL.md 内容展示                                 |
| Skills 安全  | 基于火山安全团队的恶意 Skill 扫描与审核                    |
| Skills 安装  | 兼容 `npx skills add`，支持 zip 下载、API & SDK            |

---

## CLI 使用

无需额外安装，直接通过 `npx -y skills` 使用，执行时带上 `SKILLS_API_URL` 指向火山 Skillhub 服务即可。

---

## CLI 命令速查

### find — 搜索技能

```bash
SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills find <关键词>
```

示例：

```bash
SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills find calendar        # 搜索日历相关技能
SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills find "code review"   # 搜索代码审查技能
```

### add — 安装技能

`find` 输出格式为 `owner/repo@skill`，安装时需要拆解为 URL + `-s` 参数：

```bash
# find 输出示例：
#   https://skills.volces.com/skills/bytedance/agentkit-samples@web-search
#
# 拆解为：
#   URL = https://skills.volces.com/skills/bytedance/agentkit-samples
#   -s  = web-search

SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills add <URL> -s <skill> -a openclaw -y --copy
```

示例：

```bash
# find 返回 bytedance/agentkit-samples@deepsearch
SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills add https://skills.volces.com/skills/bytedance/agentkit-samples -s deepsearch -a openclaw -y --copy
```

## 使用方式决策树

```text
安装技能的方式？
├─ 使用 CLI（推荐）→ SKILLS_API_URL=https://skills.volces.com/v1 npx -y skills find/add
├─ 通过门户 → 访问 findskill.cn 搜索并下载 zip
└─ 手动安装 → 将 Skill 目录放到 skills/<skill-name>/（参考主指南"Skill 安装"章节）
```
