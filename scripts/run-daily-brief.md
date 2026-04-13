# AI 行业每日简报执行稿

你正在执行固定任务：生成一份北京时间当日的 `AI 行业每日简报`。

目标只有 4 件事：
- 先读项目规则，不临时重设计
- 搜集过去 24 小时最重要的 AI 行业动态
- 输出高信息密度中文日报
- 尽量同时产出 Markdown、HTML、PDF 和日志

---

## 1. 开始前必须读取

先读取以下文件，再开始搜索和写作：

1. `CLAUDE.md`
2. `soul/agent-soul.md`
3. `soul/my-soul.md`
4. `templates/daily-brief.md`
5. `scheduler/rules.md`

如存在，再额外参考：

1. `data/raw/source-whitelist.md`
2. `data/raw/keyword-watchlist.md`
3. 最近 1-3 份 `output/daily/` 日报
4. 最近一次 `output/logs/run-log-*.txt`
5. 当日已有的 `output/source-notes/`

---

## 2. 时间范围与默认范围

- 默认覆盖：北京时间当前执行时刻往前 24 小时
- 如果当天高质量信息较少，可放宽到 36 小时，但只能补“仍有新增量”的事件
- 旧闻无新增，不重复写

优先覆盖这些主题：

- OpenAI / Anthropic / Google / NVIDIA / Meta / xAI / Microsoft
- 大模型发布或更新
- Agent
- 编码 AI
- 多模态
- GPU / 算力 / 数据中心
- AI 硬件 / AI 眼镜 / 机器人
- 重要投融资 / 并购 / API 定价变化
- 政策与监管

---

## 3. 搜索与筛选规则

按以下顺序工作：

1. 优先使用 `data/raw/source-whitelist.md` 里的官方源和高质量媒体
2. 用 `data/raw/keyword-watchlist.md` 做关键词组合搜索
3. 同一事件多来源时，合并为一条，优先官方源
4. 只保留高影响、高确认度、高新增量内容
5. 默认排除小融资、八卦、泛科技新闻、无落地 demo、社媒口水战
6. 未证实消息只能进入“未证实但值得关注”，且必须明确标注“未证实”

搜索时尽量少而准，不为了“看起来很全”而引入低质量噪音。

---

## 4. 生成日报

严格使用 `templates/daily-brief.md` 的栏目结构，不临时改版。

写作要求：

- 默认中文输出
- 公司名、模型名、产品名保留原文
- 正文开头不要额外写标题、生成时间、覆盖时间、版本或来源文件信息，标题统一交给导出模板
- 每条优先回答：
  - 发生了什么
  - 为什么重要
- 每条保留的新闻至少配 1 张图片，优先官方图、官方截图或高质量媒体配图
- 若找不到新闻专属配图，必须用相关图片替代（如涉事公司 Logo、产品官图、相关机构图片、行业主题图），不得因找不到专属图片而跳过该条新闻的配图
- 同一期日报中每条新闻引用的图片 URL 必须唯一，严格去重，不同新闻不得重复引用同一张图片
- 图片链接必须可直接访问并适合本地 HTML/PDF 使用，避免 `_next/image`、动态缩略图、需要鉴权或容易失效的地址；同时避免使用 `lh3.googleusercontent.com` 等带尺寸参数的 Google 图床 URL，此类地址在 PDF 渲染时容易出现裁切异常
- 优先选择宽高比接近 16:9 或 3:2 的横向图片（宽大于高）；避免使用正方形（1:1）或纵向（高大于宽）图片，此类图片在 PDF 中容易产生截断或排版错乱
- 插入图片后需检查是否存在以下显示问题：图片被裁切、仅显示局部内容、文字溢出边框；若出现上述情况，必须替换为来源更稳定、比例更标准的图片，不得保留显示残缺的图片
- 没有足够高优先级内容的栏目直接省略，不写”今日无更新””未检索到”等占位说明
- 事实优先，少量编辑判断
- 不写空话，不写套话，不堆砌重复来源
- 宁可短一点，也不要凑数

---

## 5. 输出文件

使用北京时间日期 `YYYY-MM-DD` 命名，输出到以下路径：

- Markdown：`output/daily/ai-brief-YYYY-MM-DD.md`
- HTML：`output/daily/ai-brief-YYYY-MM-DD.html`
- PDF：`output/daily/ai-brief-YYYY-MM-DD.pdf`
- 日志：`output/logs/run-log-YYYY-MM-DD.txt`

如 `output/source-notes/` 不存在，先创建。

---

## 6. HTML / PDF 导出

先完成 Markdown 正文，再执行导出：

```powershell
node scripts/render-pdf.mjs --input output/daily/ai-brief-YYYY-MM-DD.md --html output/daily/ai-brief-YYYY-MM-DD.html --pdf output/daily/ai-brief-YYYY-MM-DD.pdf --title AIDailyNews-YYYY-MM-DD
```

脚本会：

- 读取 Markdown
- 套用 `templates/pdf-style.html`
- 生成 HTML
- 调用本机 Chromium 浏览器导出 PDF

---

## 7. 失败时降级

遵守以下降级策略：

- 搜索结果不足：输出短版日报，不凑数
- 单个来源访问失败：换替代来源，并写入日志
- HTML 生成失败：至少保留 Markdown
- PDF 生成失败：至少保留 Markdown 和 HTML，并记录失败原因

不要因为单一步骤失败就放弃整次任务。

---

## 8. 日志要求

日志写入 `output/logs/run-log-YYYY-MM-DD.txt`，至少包含：

- 任务名称
- 开始时间
- 结束时间
- 执行状态：`success` / `partial_success` / `failed`
- 读取了哪些关键文件
- 主要使用了哪些来源
- 生成了哪些输出文件
- 若失败或降级，失败步骤和原因

---

## 9. 最终响应要求

完成任务后，不输出长篇解释。

只简要说明：

- 是否成功生成 Markdown
- 是否成功生成 HTML / PDF
- 输出路径
- 若有失败，失败在哪一步
