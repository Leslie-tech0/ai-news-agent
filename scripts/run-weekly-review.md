# AI 行业周报执行稿

你正在执行固定任务：生成一份北京时间本周的 `AI 行业周报`。

目标只有 4 件事：
- 先读项目规则，不临时重设计
- 聚合过去 7 天真正重要的 AI 行业变化
- 输出带趋势判断的中文周报
- 尽量同时产出 Markdown、HTML、PDF 和日志

---

## 1. 开始前必须读取

先读取以下文件，再开始整理和写作：

1. `CLAUDE.md`
2. `soul/agent-soul.md`
3. `soul/my-soul.md`
4. `templates/weekly-review.md`
5. `scheduler/rules.md`

如存在，再额外参考：

1. `data/raw/source-whitelist.md`
2. `data/raw/keyword-watchlist.md`
3. 最近 7 份 `output/daily/` 日报
4. 本周已有的 `output/source-notes/`
5. 最近 1 份 `output/weekly/` 周报
6. 最近一次 `output/logs/weekly-run-log-*.txt`

---

## 2. 聚合范围与默认范围

- 默认覆盖：北京时间当前执行时刻往前 7 天
- 优先使用本周已经产出的日报与 source notes
- 如本周日报有明显缺口，可少量补查关键遗漏事件
- 不要把周报写成日报拼接

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

## 3. 提炼与筛选规则

按以下顺序工作：

1. 先从本周日报中找出重复出现的主线
2. 合并同一事件链，只保留“本周最重要变化”
3. 判断哪些是趋势，哪些只是单日噪音
4. 默认排除小融资、八卦、泛科技新闻、无落地 demo、社媒口水战
5. 只有在讨论度足够高时，才把未证实信息放入相关栏目，并明确标注

周报必须帮助用户回答：

- 这周真正重要的变化是什么
- 为什么重要
- 哪些趋势在强化
- 下周该继续盯什么
- 哪些可以发展成内容选题

---

## 4. 生成周报

严格使用 `templates/weekly-review.md` 的栏目结构，不临时改版。

写作要求：

- 默认中文输出
- 公司名、模型名、产品名保留原文
- 先结论，再展开
- 正文开头不要额外写标题、生成时间、覆盖时间、版本或来源文件信息，标题统一交给导出模板
- 每条保留的新闻至少配 1 张图片，优先官方图、官方截图或高质量媒体配图
- 图片链接必须可直接访问并适合本地 HTML/PDF 使用，避免 `_next/image`、动态缩略图、需要鉴权或容易失效的地址
- 没有足够高优先级内容的栏目直接省略，不写“本周无更新”等占位说明
- 强调趋势与影响，不堆新闻
- 事实优先，少量编辑判断
- 不写空话，不写套话
- 宁可短一点，也不要凑数

---

## 5. 输出文件

使用北京时间日期 `YYYY-MM-DD` 命名，输出到以下路径：

- Markdown：`output/weekly/ai-weekly-review-YYYY-MM-DD.md`
- HTML：`output/weekly/ai-weekly-review-YYYY-MM-DD.html`
- PDF：`output/weekly/ai-weekly-review-YYYY-MM-DD.pdf`
- 日志：`output/logs/weekly-run-log-YYYY-MM-DD.txt`

如 `output/source-notes/` 不存在，先创建。

---

## 6. HTML / PDF 导出

先完成 Markdown 正文，再执行导出：

```powershell
node scripts/render-pdf.mjs --input output/weekly/ai-weekly-review-YYYY-MM-DD.md --html output/weekly/ai-weekly-review-YYYY-MM-DD.html --pdf output/weekly/ai-weekly-review-YYYY-MM-DD.pdf
```

脚本会：

- 读取 Markdown
- 套用 `templates/pdf-style.html`
- 生成 HTML
- 调用本机 Chromium 浏览器导出 PDF

---

## 7. 失败时降级

遵守以下降级策略：

- 本周信息不足：输出短版周报，不凑数
- 单个来源访问失败：换替代来源，并写入日志
- HTML 生成失败：至少保留 Markdown
- PDF 生成失败：至少保留 Markdown 和 HTML，并记录失败原因

不要因为单一步骤失败就放弃整次任务。

---

## 8. 日志要求

日志写入 `output/logs/weekly-run-log-YYYY-MM-DD.txt`，至少包含：

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
