# Source Note 模板

> 用途：将单条来源信息整理成结构化信息卡片  
> 适用来源：官网、官方博客、官方 X / Twitter、媒体报道、论文、社区讨论、传闻  
> 输出目标：高密度、可复用、便于后续汇总到日报 / 周报 / 选题池  
> 默认语言：中文  
> 保留专有名词原文

---

# Source Note - {{note_id}}

## 基本信息

- **标题**：{{title}}
- **事件类型**：{{event_type}}
- **来源名称**：{{source_name}}
- **来源级别**：{{source_tier}}
- **来源链接**：{{source_url}}
- **发布时间**：{{published_at}}
- **抓取时间**：{{captured_at}}
- **相关公司 / 机构**：{{related_entities}}
- **相关产品 / 模型 / 关键词**：{{related_keywords}}
- **地区 / 市场**：{{region}}
- **状态**：{{status}}

### 字段说明
- `event_type` 可选：
  - model_update
  - product_update
  - company_news
  - infra_update
  - policy_update
  - funding
  - acquisition
  - research
  - rumor
  - market_signal
  - other

- `source_tier` 可选：
  - tier_1_official
  - tier_2_quality_media
  - tier_3_community
  - tier_4_unverified

- `status` 可选：
  - confirmed
  - partially_confirmed
  - unverified
  - rumor
  - archived

---

## 一句话结论

> 规则：
> - 用 1 句话说清这条信息最核心的意思
> - 适合后续被直接复用到列表或摘要中
> - 不要空泛
> - 不要只是重复标题

{{one_line_takeaway}}

---

## 事实摘要

> 规则：
> - 只写事实，不写判断
> - 用 3-6 条 bullet 归纳原始信息
> - 若原始信息冗长，先压缩成关键事实
> - 不要把猜测混进事实

- {{fact_1}}
- {{fact_2}}
- {{fact_3}}
- {{fact_4_optional}}
- {{fact_5_optional}}
- {{fact_6_optional}}

---

## 为什么重要

> 规则：
> - 解释这条信息为什么值得用户花时间看
> - 重点从行业、产品、竞争、投资、内容选题价值里选最 relevant 的角度
> - 可以写 1-3 段短内容
> - 允许少量判断，但必须以事实为基础

{{why_it_matters}}

---

## 对用户的相关性

> 规则：
> - 直接结合 `my-soul.md`
> - 回答“为什么这条信息和当前用户相关”
> - 若相关性低，也要明确写低，不要硬凹

### 相关性等级
- {{relevance_level}}

### 相关性说明
{{relevance_reason}}

### 命中的用户关注点
- {{matched_interest_1}}
- {{matched_interest_2_optional}}
- {{matched_interest_3_optional}}

---

## 可归入的栏目

> 规则：
> - 判断这条信息后续应归入日报/周报的哪个栏目
> - 可多选，但要有主栏目

- **主栏目**：{{primary_section}}
- **次栏目**：{{secondary_section_optional}}

### 可选栏目
- 今日重点
- 模型与技术
- 产品与应用
- 公司动态
- 算力与基础设施
- 政策与监管
- 投融资与市场信号
- 未证实但值得关注
- 周报重点事件
- 内容选题池

---

## 重要性评分

> 规则：
> - 用于后续排序
> - 分数不是绝对真理，而是帮助筛选
> - 评分时优先考虑：影响面、确认度、新增量、用户相关性、时效性

- **综合评分**：{{importance_score}} / 10
- **影响面**：{{impact_score}} / 10
- **确认度**：{{confidence_score}} / 10
- **新增量**：{{novelty_score}} / 10
- **用户相关性**：{{user_fit_score}} / 10
- **时效性**：{{timeliness_score}} / 10

### 评分说明
{{score_reason}}

---

## 置信度判断

> 规则：
> - 必须明确说明这条信息到底有多可信
> - 特别是媒体转述、社区爆料、截图消息，必须单独说明

- **置信度**：{{confidence_level}}

### 可选值
- 高
- 中
- 低

### 置信度说明
{{confidence_reason}}

### 验证情况
- 是否找到原始来源：{{has_primary_source}}
- 是否被多家高质量来源交叉验证：{{cross_verified}}
- 是否存在明显冲突信息：{{has_conflict}}

---

## 与其他信息的关系

> 规则：
> - 用于后续去重、合并、串联成事件链
> - 如果它是某个更大事件的一部分，要写清楚

- **是否为新事件**：{{is_new_event}}
- **是否为既有事件的更新**：{{is_followup}}
- **关联事件 ID**：{{related_event_ids}}
- **建议合并对象**：{{merge_candidates}}
- **是否可能重复**：{{duplicate_risk}}

### 关系说明
{{relation_note}}

---

## 可直接复用的日报文案

> 规则：
> - 这里写的是“可直接放进日报”的压缩版
> - 方便后续拼装日报，节省 token
> - 一般控制在 2-4 句话
> - 包含：发生了什么 + 为什么重要

{{daily_brief_ready_copy}}

---

## 可直接复用的周报文案

> 规则：
> - 这里写的是“如果进周报，可以怎么写”
> - 可以比日报稍微强调趋势和影响
> - 一般控制在 2-5 句话

{{weekly_review_ready_copy}}

---

## 可延展内容角度

> 规则：
> - 面向内容创作
> - 不是简单复述新闻，而是提炼“能进一步展开”的内容方向
> - 若这条信息没有内容延展价值，可以写无

### 选题角度 1
- **标题**：{{content_angle_1_title}}
- **角度说明**：{{content_angle_1_desc}}

### 选题角度 2
- **标题**：{{content_angle_2_title_optional}}
- **角度说明**：{{content_angle_2_desc_optional}}

### 选题角度 3
- **标题**：{{content_angle_3_title_optional}}
- **角度说明**：{{content_angle_3_desc_optional}}

---

## 是否推荐进入日报

> 规则：
> - 这是最关键的筛选判断之一
> - 不是所有 source note 都要进入日报
> - 若不推荐进入，也要说明原因

- **推荐进入日报**：{{include_in_daily}}
- **推荐进入周报**：{{include_in_weekly}}
- **推荐进入选题池**：{{include_in_content_pool}}

### 原因说明
{{inclusion_reason}}

---

## 风险与注意事项

> 规则：
> - 若存在误读风险、营销性质、来源偏差、数据不完整、标题党风险，要在这里标出
> - 没有风险时可写“无明显风险提示”

{{risk_note}}

---

## 原始材料摘录

> 规则：
> - 这里只摘录最关键的原始内容
> - 不要无脑复制大段全文
> - 控制长度
> - 用于后续快速回看原文重点

### 原文关键句 1
{{raw_excerpt_1}}

### 原文关键句 2
{{raw_excerpt_2_optional}}

### 原文关键句 3
{{raw_excerpt_3_optional}}

---

## 标签

> 规则：
> - 标签尽量短
> - 便于筛选与聚合
> - 既可写公司，也可写主题、赛道、事件类型

- {{tag_1}}
- {{tag_2}}
- {{tag_3}}
- {{tag_4_optional}}
- {{tag_5_optional}}

---

## 附：填写规则

### 必须遵守
- 先写事实，再写判断
- 不得编造来源
- 不得编造时间
- 不得把未证实内容写成已确认
- 同一条 note 只描述一个核心事件
- 若一个来源同时包含多个事件，应拆成多条 note
- 摘要优先压缩，不优先堆字数

### 默认优先级
优先处理以下类型来源：
1. 官网 / 官方博客 / 官方公告
2. 官方 X / Twitter
3. Reuters / Bloomberg / FT / The Information / TechCrunch / The Verge
4. Hacker News / Reddit / 开发者社区
5. 其他二次传播

### 与用户画像对齐
当前用户更关注：
- OpenAI
- Anthropic
- Google
- NVIDIA
- Meta
- xAI
- Microsoft
- 大模型更新
- Agent
- 编码 AI
- 多模态
- GPU / 算力 / 数据中心
- AI 硬件 / AI 眼镜 / 机器人
- 投融资
- AI 应用出海

当前用户默认降权内容：
- 小融资
- 八卦
- 泛科技新闻
- 没落地 demo
- 社媒口水战

### 输出原则
一条高质量 source note 应该满足：
- 读完 1 分钟内就知道这条信息值不值得进日报
- 能判断它该归哪个栏目
- 能判断它是否需要继续跟踪
- 能直接复用到日报 / 周报 / 选题池