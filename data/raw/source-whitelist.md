# AI 行业热点来源白名单

> 用途：为日报搜索提供稳定、低噪音的固定来源池。  
> 原则：优先官方，其次高质量媒体，社区只作辅助。  
> 注意：这不是“全网目录”，而是默认优先搜索名单。

---

## 使用规则

1. 同一事件优先找官方原始来源。
2. 如果官方源不完整，再用高质量媒体补背景和数字。
3. 社区讨论只作线索，不单独充当主信息源。
4. 同一事件最多保留 1 个主来源 + 1-2 个补充来源。
5. 若来源不在本名单，但明显更接近原始事实，可酌情使用，并在日志中注明。

---

## 一级优先：官方源

这些来源适合直接确认发布、更新、定价、合作、组织调整、论文或产品上线。

| 来源 | 主要域名 / 入口 | 适用范围 | 备注 |
| --- | --- | --- | --- |
| OpenAI | `openai.com` / `platform.openai.com` / `help.openai.com` | 模型、产品、API、定价、官方公告 | 优先官网与官方博客 |
| Anthropic | `anthropic.com` / `docs.anthropic.com` | Claude、API、企业产品、政策说明 | 文档和公告都要看 |
| Google AI / DeepMind | `blog.google` / `deepmind.google` / `ai.google.dev` / `developers.googleblog.com` | Gemini、研究、开发者平台、产品更新 | 优先 DeepMind 与 Google 官方博客 |
| Microsoft / Azure | `blogs.microsoft.com` / `news.microsoft.com` / `azure.microsoft.com` | Copilot、Azure AI、商业化、企业落地 | 常见于 Azure 与公司新闻稿 |
| NVIDIA | `nvidia.com` / `blogs.nvidia.com` | GPU、芯片、算力、数据中心、合作 | 基础设施类高优先级 |
| Meta AI | `ai.meta.com` / `about.fb.com` / `engineering.fb.com` | Llama、研究、产品、组织动作 | 开源模型与研究突破重点看 |
| xAI | `x.ai` / `docs.x.ai` | Grok、API、产品与模型更新 | 若官网信息不足，再看官方 X |
| Hugging Face | `huggingface.co` / `huggingface.co/blog` | 开源模型、模型卡、生态趋势 | 适合确认开源模型落地信息 |
| GitHub / GitHub Blog | `github.com` / `github.blog` | 开源项目发布、代码 AI、Copilot、开发者工具 | 只看项目官方仓库或官方博客 |
| arXiv / 会议官网 | `arxiv.org` / 会议官方站点 | 研究论文、benchmark、技术突破 | 研究类消息优先原文 |
| 美国 / 欧盟 / 英国等监管官网 | 官方政府与监管机构网站 | 政策、监管、版权、出口限制 | 政策类优先原始文件 |

### 官方 X / 公开账号

可作为官方站点的补充确认源，适合快速确认发布时间、产品截图或临时说明：

- OpenAI / ChatGPT / OpenAI Developers
- Anthropic / Claude
- Google / Google DeepMind / Google AI Developers
- Microsoft / Microsoft Copilot / Satya Nadella
- NVIDIA / Jensen Huang
- Meta / Meta AI / Yann LeCun
- xAI / Grok / Elon Musk

规则：

- 只有在账号明显属于官方或核心负责人时才可作为高优先级来源
- 如 X 帖文与官网信息冲突，以官网或正式公告为准

---

## 二级优先：高质量媒体

这些来源适合补充背景、财务信息、合作细节、行业反应与交叉验证。

| 来源 | 域名 | 适用范围 | 使用方式 |
| --- | --- | --- | --- |
| Reuters | `reuters.com` | 快讯、财务、监管、并购 | 默认高优先级补充源 |
| Bloomberg | `bloomberg.com` | 商业化、融资、资本开支、交易 | 有数值信息时优先参考 |
| Financial Times | `ft.com` | 大公司战略、监管、全球产业链 | 适合趋势与高层动作 |
| The Information | `theinformation.com` | 行业内幕、产品路线、组织动作 | 需注意与官方源交叉验证 |
| TechCrunch | `techcrunch.com` | 产品发布、创业公司、融资 | 只保留足够重要的条目 |
| The Verge | `theverge.com` | 消费产品、平台更新、AI 硬件 | 适合产品与应用栏目 |
| Wired | `wired.com` | 深度背景、政策、科技影响 | 适合辅助解释，不作唯一来源 |
| CNBC | `cnbc.com` | 市场、财务、企业动作 | 适合投融资与市场信号 |
| Semafor | `semafor.com` | 行业动态、商业信息 | 作补充，不单独撑主线 |

---

## 三级辅助：社区与线索源

这些来源只用于发现线索、观察开发者反馈或补充行业讨论热度。

| 来源 | 域名 / 范围 | 适用范围 | 限制 |
| --- | --- | --- | --- |
| Hacker News | `news.ycombinator.com` | 开发者反馈、产品真实讨论 | 不单独作为事实来源 |
| Reddit | `reddit.com` | 社区讨论、用户体验、传闻线索 | 只能辅助，不直接定性 |
| GitHub Issues / Releases | 官方项目仓库 | 版本变更、功能上线、开源生态 | 必须是项目官方仓库 |
| 开发者博客 / 工程师公开发言 | 个人博客、播客、演讲 | 补充观点与实现细节 | 仅在作者身份可靠时使用 |

---

## 默认降权或排除

以下来源或内容默认降权，除非事件本身极其重要且可被高质量来源补强：

- 新闻聚合站的二次转载
- 标题党自媒体
- 纯流量型 AI 资讯号
- 无法定位原始来源的截图
- 单一账号爆料且无交叉验证的传闻
- 小融资 PR 稿
- 泛科技八卦站

---

## 复核顺序建议

发现线索后，按这个顺序复核：

1. 官网 / 官方博客 / 官方文档
2. 官方 X / 官方项目仓库
3. Reuters / Bloomberg / FT / The Information
4. TechCrunch / The Verge / Wired / CNBC
5. Hacker News / Reddit / 其他社区反馈
