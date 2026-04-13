# 定时任务规则

> 用途：定义 AI 行业热点日报 Agent 的全部定时任务  
> 权威来源：本文件是 scheduler 任务配置的唯一权威规则  
> 默认时区：北京时间（UTC+8 / Asia/Shanghai）  
> 调度原则：少任务、强约束、低 token、稳定输出

---

## 一、总原则

### 1. 任务目标
本 Agent 的定时任务，核心只做三件事：

1. 每天生成一份 AI 行业每日简报
2. 每周生成一份 AI 行业周报
3. 定期清理缓存、归档日志，保证目录稳定可维护

### 2. 低 token 原则
所有定时任务都必须遵守以下约束：

- 优先复用项目内已有文件，不重复生成说明文字
- 优先读取 `soul/agent-soul.md`、`soul/my-soul.md`、`templates/` 中的现成模板
- 生成内容时，以最终产物为目标，避免冗长中间输出
- 搜索时优先官方源和高质量媒体，减少低价值来源噪音
- 若高质量信息不足，宁少勿滥，不强行凑篇幅
- 默认不创建多余中间文件，除非对后续复用有明显价值
- 同一事件多来源时，合并处理，避免重复总结

### 3. 稳定性原则
- 每个任务都必须有固定输入、固定输出路径、固定文件命名
- 单个步骤失败时优先降级，而不是让整次任务完全中断
- PDF 导出失败时，至少保留 Markdown 成果
- 所有任务执行结果都应写入日志

### 4. 用户偏好约束
执行任务时，必须优先遵守以下用户偏好：

- 用户是 **AI 内容创作者 + 投资视角跟踪者**
- 目标是 **紧跟 AI 行业第一梯队**
- 重点关注：
  - OpenAI
  - Anthropic
  - Google
  - NVIDIA
  - Meta
  - xAI
  - Microsoft
  - 大模型发布 / 更新
  - Agent
  - 编码 AI
  - 多模态
  - GPU / 算力 / 数据中心
  - AI 硬件 / AI 眼镜 / 机器人
  - 投融资
  - AI 应用出海
- 默认降权：
  - 小融资
  - 八卦
  - 泛科技新闻
  - 无落地 demo
  - 社媒口水战

---

## 二、全局执行规则

### 1. 每次任务启动前必须读取
执行任何任务前，必须先读取：

1. `soul/agent-soul.md`
2. `soul/my-soul.md`
3. 对应模板文件
4. 最近一次相关输出（如有）
5. 最近一次执行日志（如有）

### 2. 默认搜索时间范围
- **日报任务**：默认覆盖过去 24 小时
- **周报任务**：默认覆盖过去 7 天
- 若当天信息较少，可适度参考最近 36 小时内的重要延续事件，但不得把旧闻当新内容重复写

### 3. 来源优先级
默认优先使用以下来源：

#### 一级优先
- 官网
- 官方博客
- 官方公告
- 官方 X / Twitter
- 官方文档
- 论文原文 / arXiv / 正式会议页面

#### 二级优先
- Reuters
- Bloomberg
- Financial Times
- The Information
- TechCrunch
- The Verge
- Wired
- CNBC
- Semafor

#### 三级辅助
- Hacker News
- Reddit
- 开发者社区
- 创始人 / 核心员工公开发言

### 4. 输出目录约定
所有任务默认写入以下目录：

- 每日简报：`output/daily/`
- 周报：`output/weekly/`
- 日志：`output/logs/`
- 缓存：`output/cache/`
- Source notes：`output/source-notes/`

### 5. 文件命名约定

#### 日报
- Markdown：`ai-brief-YYYY-MM-DD.md`
- HTML：`ai-brief-YYYY-MM-DD.html`
- PDF：`ai-brief-YYYY-MM-DD.pdf`

#### 周报
- Markdown：`ai-weekly-review-YYYY-MM-DD.md`
- HTML：`ai-weekly-review-YYYY-MM-DD.html`
- PDF：`ai-weekly-review-YYYY-MM-DD.pdf`

#### 日志
- `run-log-YYYY-MM-DD.txt`
- `weekly-run-log-YYYY-MM-DD.txt`
- `maintenance-log-YYYY-MM-DD.txt`

#### Source notes
- `source-note-YYYY-MM-DD-001.md`
- `source-note-YYYY-MM-DD-002.md`

### 6. 日志要求
每个任务执行后，必须至少记录以下内容：

- 任务名称
- 开始时间
- 结束时间
- 执行状态（success / partial_success / failed）
- 读取了哪些关键文件
- 主要使用了哪些来源
- 生成了哪些输出文件
- 若失败，失败在哪一步
- 若降级，降级原因是什么

---

## 三、每日任务

---

## 任务 A：AI 行业每日简报

### 目标
每天生成一份 AI 行业热点日报，供用户在北京时间 22:30 左右阅读。

### 执行时间
- cron：`30 21 * * *`
- 含义：每天北京时间 21:30 执行

### 为什么设为 21:30
- 用户主要阅读时间是北京时间 22:30
- 21:30 执行，通常能在用户阅读前准备好成品
- 同时能覆盖当天白天的大部分新闻与更新

### 输入文件
执行前必须读取：

- `soul/agent-soul.md`
- `soul/my-soul.md`
- `templates/daily-brief.md`
- `scripts/run-daily-brief.md`

如存在以下文件，可一并参考：
- 最近 1-3 天日报
- 当日已有 source notes
- 前一日日报日志

### 搜索范围
默认搜索以下范围内的 AI 行业热点：

- 过去 24 小时内的重要动态
- 优先头部公司、模型、产品、算力、监管、重要融资并购
- 对已在昨日出现但今日有实质增量的事件，可继续跟进
- 无实质增量的旧闻不重复写

### 执行步骤
1. 读取 `agent-soul.md` 与 `my-soul.md`
2. 读取 `templates/daily-brief.md`
3. 搜索过去 24 小时的 AI 行业热点
4. 按来源优先级筛选信息
5. 去重、合并同类事件
6. 如有必要，先生成少量 source notes
7. 按日报模板生成 Markdown 简报
8. 将 Markdown 转为 HTML
9. 将 HTML 导出为 PDF
10. 写入执行日志

### 输出文件
- `output/daily/ai-brief-YYYY-MM-DD.md`
- `output/daily/ai-brief-YYYY-MM-DD.html`
- `output/daily/ai-brief-YYYY-MM-DD.pdf`
- `output/logs/run-log-YYYY-MM-DD.txt`

### 内容要求
- 以 `templates/daily-brief.md` 为唯一模板来源
- 保持主题分类结构
- 同主题下按重要性排序
- 默认包含以下栏目：
  - 今日重点
  - 模型与技术
  - 产品与应用
  - 公司动态
  - 算力与基础设施
  - 政策与监管
  - 投融资与市场信号
  - 今日一句判断
  - 今日可延展选题

### 图文要求
用户偏好图文并茂，但要遵守以下原则：

- 图片必须服务信息表达，不做纯装饰
- 优先使用：
  - 官方发布图
  - 官方产品截图
  - 官方博客图示
  - 高质量媒体配图
- 若无高质量图片素材，可退化为纯文本高可读版
- 不得因为凑图而降低信息质量
- 默认每日报告最多插入 2-4 张关键图片
- 若当日无明显适合图片的热点，可不插图

### 失败时降级策略
#### 若搜索结果较少
- 输出较短日报
- 不强行凑满每个栏目

#### 若单个来源无法访问
- 用替代来源补充
- 在日志中注明

#### 若 HTML 生成失败
- 至少保留 Markdown
- 在日志中记录失败

#### 若 PDF 导出失败
- 保留 Markdown 和 HTML
- 在日志中写明 PDF 失败原因
- 不视为整次任务完全失败

### 成功标准
一次成功的日报任务应满足：
- 产出 Markdown 文件
- 最好同时产出 PDF 文件
- 内容结构稳定
- 高信噪比
- 用户可在 15 分钟内读完并掌握当天主线

---

## 四、每周任务

---

## 任务 B：AI 行业周报

### 目标
每周生成一份 AI 行业周报，提炼本周最重要变化、趋势和下周观察重点。

### 执行时间
- cron：`40 21 * * 0`
- 含义：每周日北京时间 21:40 执行

### 输入文件
执行前必须读取：

- `soul/agent-soul.md`
- `soul/my-soul.md`
- `templates/weekly-review.md`
- `scripts/run-weekly-review.md`

可选参考：
- 本周 7 天日报
- 本周 source notes
- 上一周周报
- 本周执行日志

### 搜索与聚合范围
- 默认覆盖过去 7 天
- 优先使用本周已生成的日报和 source notes
- 如需要补充，可少量补查重要遗漏事件
- 不要把周报写成“日报内容简单拼接”

### 执行步骤
1. 读取 `agent-soul.md`
2. 读取 `my-soul.md`
3. 读取 `templates/weekly-review.md`
4. 聚合过去 7 天的日报与 source notes
5. 提炼本周最重要变化
6. 按主题归类
7. 写出趋势判断、下周观察清单、内容选题方向
8. 输出 Markdown
9. 转为 HTML
10. 导出 PDF
11. 写入周报日志

### 输出文件
- `output/weekly/ai-weekly-review-YYYY-MM-DD.md`
- `output/weekly/ai-weekly-review-YYYY-MM-DD.html`
- `output/weekly/ai-weekly-review-YYYY-MM-DD.pdf`
- `output/logs/weekly-run-log-YYYY-MM-DD.txt`

### 内容要求
- 以周趋势、周主线、下周观察点为核心
- 不是新闻堆砌
- 不是日报复制
- 必须帮助用户回答：
  - 这周真正重要的变化是什么
  - 哪些趋势在强化
  - 哪些值得下周继续追踪
  - 哪些可以做成内容选题

### 失败时降级策略
- 若 PDF 失败，至少保留 Markdown 和 HTML
- 若本周日报缺失较多，可结合搜索补全，但明确在日志里说明
- 若信息密度不足，宁可做短周报，不凑长篇

---

## 五、维护任务

---

## 任务 C：每周清理与归档

### 目标
定期清理缓存、整理目录、保证输出目录可长期维护。

### 执行时间
- cron：`10 23 * * 0`
- 含义：每周日北京时间 23:10 执行

### 设计原则
这是轻量维护任务，不做内容生成，主要做目录管理，尽量少消耗 token。

### 执行入口
- `scripts/run-maintenance.md`

### 执行内容
1. 检查以下目录是否存在，不存在则创建：
   - `output/daily/`
   - `output/weekly/`
   - `output/logs/`
   - `output/cache/`
   - `output/source-notes/`

2. 清理过旧缓存文件：
   - 默认删除 14 天前的缓存
   - 不删除日报、周报、日志正式产物

3. 可选压缩归档：
   - 若 source notes 数量过多，可将超过 30 天的 notes 归档到按月份命名的子目录
   - 不直接删除高价值归档内容

4. 输出维护日志

### 输出文件
- `output/logs/maintenance-log-YYYY-MM-DD.txt`

### 注意事项
- 不得删除正式日报 / 周报 / PDF
- 不得删除用户手工编辑文件
- 清理动作必须保守，宁可少删，不要误删

---

## 六、默认关闭的任务

> 以下任务暂不默认启用。  
> 原因：当前阶段目标是“先把日报稳定跑起来”，不是做高频提醒系统。  
> 这些任务会增加 token 消耗和系统复杂度，因此默认关闭。

### 关闭任务 1：午间热点快报
- 建议 cron：`30 12 * * *`
- 状态：disabled
- 原因：会增加一次每日执行成本，当前非必须

### 关闭任务 2：突发热点提醒
- 状态：disabled
- 原因：会显著提升搜索频率与成本

### 关闭任务 3：每日关键词监控快照
- 状态：disabled
- 原因：对当前“日报优先”的目标帮助有限，可后续再加

### 关闭任务 4：每日自动生成大量 source notes
- 状态：disabled
- 原因：若每次都全面生成，会额外消耗 token
- 当前建议：只对高价值信息生成少量 source notes

---

## 七、任务注册建议

> 以下是建议注册到 scheduler 插件中的任务集合。  
> 当前阶段只建议注册 3 个任务。

### 建议启用
1. AI 行业每日简报  
   - cron：`30 21 * * *`
   - 入口：`scripts/run-daily-brief.md`

2. AI 行业周报  
   - cron：`40 21 * * 0`
   - 入口：`scripts/run-weekly-review.md`

3. 每周清理与归档  
   - cron：`10 23 * * 0`
   - 入口：`scripts/run-maintenance.md`

### 暂不启用
- 午间热点快报
- 突发提醒
- 高频关键词跟踪
- 高频 source note 批量生成

---

## 八、任务执行时的统一 Prompt 约束

所有 scheduler 任务在执行时，都必须遵守以下规则：

1. 先读项目文件，再开始写内容
2. 优先生成最终产物，不输出长篇解释
3. 以项目内模板为准，不临时改结构
4. 若信息不足，输出短版，而不是瞎补
5. 若存在未证实信息，必须单独标注
6. 先事实，后判断
7. 默认保持专业、中性、信息密度高的风格
8. 输出必须适合后续直接导出 PDF

---

## 九、未来可扩展方向

当前版本先聚焦最小可用闭环。未来可增加：

- 关键词监控独立任务
- 特定公司专项跟踪
- AI 眼镜 / 机器人专刊
- 投资线索单独日报
- 内容选题单独任务
- 飞书 / Telegram / 邮件推送
- 数据库存档与检索
- 自动封面图生成
- 更丰富的图文排版

但在默认配置下，不应提前启用这些任务，以免增加复杂度和成本。

---

## 十、当前版本的最终目标

当前版本 scheduler 的目标不是“做尽可能多的自动化”，而是：

**用最少的任务，把 AI 行业日报稳定跑起来。**

衡量标准只有 3 个：

1. 每晚能稳定生成一份高质量 AI 日报
2. 每周能稳定生成一份有趋势判断的 AI 周报
3. 整个过程尽量少消耗 token、少出错、少维护成本
