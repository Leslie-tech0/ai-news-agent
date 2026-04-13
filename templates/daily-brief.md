# AI 行业每日简报模板

> 用途：生成每日 AI 行业日报  
> 输出目标：高信息密度、结构稳定、便于导出 PDF  
> 默认语言：中文  
> 默认时区：北京时间（UTC+8）

---

## 今日重点

> 规则：
> - 只保留当天最重要的 3-5 条
> - 必须是“值得优先花时间看”的信息
> - 优先头部公司、模型发布、API/产品重大更新、重要融资并购、开源突破、算力重大变化
> - 每条都要写清“发生了什么 + 为什么重要”
> - 每条保留的新闻至少配 1 张图片，优先使用官方图、官方截图或高质量媒体配图
> - 图片建议放在对应小标题下方，格式为：`![图片说明](图片URL)`
> - 图片链接必须是可直接访问的原图或静态 CDN 链接，避免 `_next/image`、动态缩略图、需鉴权或易失效的临时图片地址
> - 若无足够高质量内容，可少写，不强行凑满

### 1. {{top_story_1_title}}
- **摘要**：{{top_story_1_summary}}
- **为什么重要**：{{top_story_1_why_it_matters}}
- **来源**：{{top_story_1_source}}

### 2. {{top_story_2_title}}
- **摘要**：{{top_story_2_summary}}
- **为什么重要**：{{top_story_2_why_it_matters}}
- **来源**：{{top_story_2_source}}

### 3. {{top_story_3_title}}
- **摘要**：{{top_story_3_summary}}
- **为什么重要**：{{top_story_3_why_it_matters}}
- **来源**：{{top_story_3_source}}

### 4. {{top_story_4_title_optional}}
- **摘要**：{{top_story_4_summary_optional}}
- **为什么重要**：{{top_story_4_why_it_matters_optional}}
- **来源**：{{top_story_4_source_optional}}

### 5. {{top_story_5_title_optional}}
- **摘要**：{{top_story_5_summary_optional}}
- **为什么重要**：{{top_story_5_why_it_matters_optional}}
- **来源**：{{top_story_5_source_optional}}

---

## 模型与技术

> 规则：
> - 收录模型发布、更新、benchmark、推理能力、开源权重、论文突破、Agent 技术框架等
> - 用户重点关注：大模型更新、Agent、编码 AI、多模态、开源模型突破
> - 按重要性排序
> - 同一事件多来源时，合并为一条
> - 若没有足够高优先级内容，整个栏目直接省略，不写“今日无更新”或“未检索到”
> - 每条保留的新闻至少配 1 张图片

### {{model_item_1_title}}
- **摘要**：{{model_item_1_summary}}
- **为什么重要**：{{model_item_1_why_it_matters}}
- **来源**：{{model_item_1_source}}

### {{model_item_2_title}}
- **摘要**：{{model_item_2_summary}}
- **为什么重要**：{{model_item_2_why_it_matters}}
- **来源**：{{model_item_2_source}}

### {{model_item_3_title_optional}}
- **摘要**：{{model_item_3_summary_optional}}
- **为什么重要**：{{model_item_3_why_it_matters_optional}}
- **来源**：{{model_item_3_source_optional}}

---

## 产品与应用

> 规则：
> - 收录 AI 产品发布、功能更新、企业应用落地、开发工具变化、内容创作工具变化
> - 用户偏好“摘要 + 稍深入一点的行业解读”
> - 重点关注：编码 AI、多模态、AI 应用出海、头部平台产品更新
> - 若没有足够高优先级内容，整个栏目直接省略，不写“今日无更新”或“未检索到”
> - 每条保留的新闻至少配 1 张图片

### {{product_item_1_title}}
- **摘要**：{{product_item_1_summary}}
- **为什么重要**：{{product_item_1_why_it_matters}}
- **来源**：{{product_item_1_source}}

### {{product_item_2_title}}
- **摘要**：{{product_item_2_summary}}
- **为什么重要**：{{product_item_2_why_it_matters}}
- **来源**：{{product_item_2_source}}

### {{product_item_3_title_optional}}
- **摘要**：{{product_item_3_summary_optional}}
- **为什么重要**：{{product_item_3_why_it_matters_optional}}
- **来源**：{{product_item_3_source_optional}}

---

## 公司动态

> 规则：
> - 优先收录用户重点公司：OpenAI、Anthropic、Google、NVIDIA、Meta、xAI、Microsoft
> - 包括合作、组织架构调整、商业化动作、API 策略变化、生态动作
> - 若“今日重点”已写过，同一事件这里不重复展开，除非有额外增量信息
> - 若没有足够高优先级内容，整个栏目直接省略
> - 每条保留的新闻至少配 1 张图片

### {{company_item_1_title}}
- **公司**：{{company_item_1_company}}
- **摘要**：{{company_item_1_summary}}
- **为什么重要**：{{company_item_1_why_it_matters}}
- **来源**：{{company_item_1_source}}

### {{company_item_2_title}}
- **公司**：{{company_item_2_company}}
- **摘要**：{{company_item_2_summary}}
- **为什么重要**：{{company_item_2_why_it_matters}}
- **来源**：{{company_item_2_source}}

### {{company_item_3_title_optional}}
- **公司**：{{company_item_3_company_optional}}
- **摘要**：{{company_item_3_summary_optional}}
- **为什么重要**：{{company_item_3_why_it_matters_optional}}
- **来源**：{{company_item_3_source_optional}}

---

## 算力与基础设施

> 规则：
> - 收录 GPU、芯片、云、数据中心、推理基础设施、供应链、能耗、集群部署等
> - 用户重点关注：GPU / 算力 / 数据中心
> - 若与 NVIDIA、云厂商、推理成本相关，优先级更高
> - 若没有足够高优先级内容，整个栏目直接省略
> - 每条保留的新闻至少配 1 张图片

### {{infra_item_1_title}}
- **摘要**：{{infra_item_1_summary}}
- **为什么重要**：{{infra_item_1_why_it_matters}}
- **来源**：{{infra_item_1_source}}

### {{infra_item_2_title_optional}}
- **摘要**：{{infra_item_2_summary_optional}}
- **为什么重要**：{{infra_item_2_why_it_matters_optional}}
- **来源**：{{infra_item_2_source_optional}}

---

## 政策与监管

> 规则：
> - 收录 AI 政策、版权诉讼、数据合规、安全规定、出口限制、监管框架
> - 若当天无重要增量，整个栏目直接省略
> - 不强行凑内容
> - 每条保留的新闻至少配 1 张图片

### {{policy_item_1_title_or_none}}
- **摘要**：{{policy_item_1_summary_or_none}}
- **为什么重要**：{{policy_item_1_why_it_matters_or_none}}
- **来源**：{{policy_item_1_source_or_none}}

### {{policy_item_2_title_optional}}
- **摘要**：{{policy_item_2_summary_optional}}
- **为什么重要**：{{policy_item_2_why_it_matters_optional}}
- **来源**：{{policy_item_2_source_optional}}

---

## 投融资与市场信号

> 规则：
> - 只收录“足够重要”的融资、并购、估值变化、收入验证、行业采用信号
> - 用户不喜欢小融资新闻
> - 重点关注重要融资 / 并购、商业化验证、头部赛道信号
> - 小额、低影响、纯 PR 融资默认不写
> - 若没有足够高优先级内容，整个栏目直接省略
> - 每条保留的新闻至少配 1 张图片

### {{market_item_1_title}}
- **摘要**：{{market_item_1_summary}}
- **为什么重要**：{{market_item_1_why_it_matters}}
- **来源**：{{market_item_1_source}}

### {{market_item_2_title_optional}}
- **摘要**：{{market_item_2_summary_optional}}
- **为什么重要**：{{market_item_2_why_it_matters_optional}}
- **来源**：{{market_item_2_source_optional}}

---

## 未证实但值得关注

> 规则：
> - 只有在“行业热度足够高”时才可收录
> - 必须明确标注“未证实”
> - 不得与正式确认信息混写
> - 最多放 1-3 条
> - 若无高质量传闻，则整个栏目省略
> - 每条保留的新闻至少配 1 张图片

### {{rumor_item_1_title_optional}}
- **状态**：未证实
- **摘要**：{{rumor_item_1_summary_optional}}
- **为什么值得关注**：{{rumor_item_1_why_watch_optional}}
- **来源**：{{rumor_item_1_source_optional}}

### {{rumor_item_2_title_optional}}
- **状态**：未证实
- **摘要**：{{rumor_item_2_summary_optional}}
- **为什么值得关注**：{{rumor_item_2_why_watch_optional}}
- **来源**：{{rumor_item_2_source_optional}}

---

## 今日一句判断

> 规则：
> - 1-3 句话
> - 不是喊口号
> - 不是空泛总结
> - 要能帮助用户快速把握“今天最重要的行业变化”
> - 允许少量编辑判断，但以事实为基础

{{daily_takeaway}}

---

## 今日可延展选题

> 规则：
> - 面向内容创作
> - 从当天热点里提炼 2-5 个值得继续展开的方向
> - 不是简单复述新闻标题
> - 要尽量接近“可以写成内容”的角度

1. {{content_angle_1}}
2. {{content_angle_2}}
3. {{content_angle_3_optional}}
4. {{content_angle_4_optional}}
5. {{content_angle_5_optional}}

---

## 信息来源

> 规则：
> - 优先列官方来源
> - 再列高质量媒体
> - 同一来源不重复刷屏
> - 写来源名即可，必要时附标题

- {{source_1}}
- {{source_2}}
- {{source_3}}
- {{source_4}}
- {{source_5}}
- {{source_6_optional}}
- {{source_7_optional}}

---

## 附：生成规则

### 必须遵守
- 全文默认中文输出
- 公司名、模型名、产品名保留原文
- 正文开头不要额外输出标题、生成时间、覆盖时间、版本或来源文件信息，页面标题统一由导出模板生成
- 优先事实，少量判断
- 不写空话
- 不写套话
- 不写低质量噪音
- 不重复同一事件
- 没有高质量信息时，宁少勿滥

### 默认优先级
1. OpenAI / Anthropic / Google / NVIDIA / Meta / xAI / Microsoft
2. 大模型发布与更新
3. Agent / 编码 AI / 多模态
4. GPU / 算力 / 数据中心
5. 大厂产品变化
6. 重要融资 / 并购 / API 定价变化
7. AI 应用出海
8. 政策监管

### 默认排除
- 小融资
- 八卦
- 泛科技新闻
- 无落地 demo
- 社媒口水战
- 标题党聚合内容

### 篇幅原则
- 默认偏详细
- 目标阅读时长约 15 分钟
- 信息密度高于篇幅长度
- 可以长，但不能散
- 没有内容的栏目直接省略，不输出占位说明

### 输出文件约定
- Markdown：`output/daily/ai-brief-{{date}}.md`
- HTML：`output/daily/ai-brief-{{date}}.html`
- PDF：`output/daily/ai-brief-{{date}}.pdf`
