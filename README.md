# Daily AI News Agent

An editorial-style Claude Code agent that produces a high-quality **Chinese daily brief** of the AI industry — and a weekly review on top of it — with stable structure, low noise, and low token cost.

This is not a general chatbot. It is a narrow, rule-driven agent whose only job is:

1. Find what actually matters in AI today / this week.
2. Write it up against a fixed template.
3. Run stably, quietly, and cheaply day after day.

## What it does

- **Daily brief** — scans the last 24h of AI industry news, filters / dedupes / ranks, and produces a Chinese-language brief targeted at a ~15-minute read.
- **Weekly review** — aggregates the past 7 days of daily briefs and source notes into trend analysis and next-week watchlist (not a concatenation of dailies).
- **Source notes** — single-event cards with relevance, importance score, confidence, and a recommendation on whether the item should surface in the daily or weekly.
- **Multi-format export** — every brief ships as Markdown, HTML, and PDF.

## Editorial focus

Priority companies: OpenAI, Anthropic, Google, NVIDIA, Meta, xAI, Microsoft.

Priority topics: frontier model releases, agents, coding AI, multimodal, GPU / compute / datacenters, AI hardware / robotics, funding & M&A, AI going global.

Default voice: neutral, analyst-leaning, fact-first, light editorial judgment — never rumor-as-fact, never filler.

## Project layout

```
.
├── CLAUDE.md                 # Master rules — read first on every run
├── soul/
│   ├── agent-soul.md         # Agent persona & editorial principles
│   └── my-soul.md            # User profile & preferences
├── templates/
│   ├── daily-brief.md        # Daily brief template
│   ├── weekly-review.md      # Weekly review template
│   ├── source-note.md        # Single-event card template
│   └── pdf-style.html        # PDF rendering stylesheet
├── scheduler/
│   └── rules.md              # Run cadence & task rules
├── scripts/
│   ├── run-daily-brief.md    # Prompt that drives the daily run
│   ├── run-weekly-review.md  # Prompt that drives the weekly run
│   ├── run-maintenance.md    # Housekeeping prompt
│   └── render-pdf.mjs        # Markdown/HTML → PDF renderer
├── output/
│   ├── daily/                # ai-brief-YYYY-MM-DD.{md,html,pdf}
│   ├── weekly/               # ai-weekly-review-YYYY-MM-DD.{md,html,pdf}
│   ├── source-notes/         # per-event cards
│   ├── logs/                 # run-log-YYYY-MM-DD.txt
│   └── cache/
├── data/
│   ├── raw/                  # fetched source material
│   └── feedback/             # user feedback for iteration
└── gen-brief.bat             # Windows one-click runner
```

## Requirements

- [Claude Code](https://docs.claude.com/en/docs/claude-code) CLI installed and authenticated.
- Node.js (for the PDF renderer in `scripts/render-pdf.mjs`).
- Windows / macOS / Linux — the included `gen-brief.bat` is Windows-only; on other platforms invoke the prompt directly.

## Usage

### Generate today's daily brief

Windows:

```bat
gen-brief.bat
```

Any platform:

```bash
claude -p "$(cat scripts/run-daily-brief.md)" --dangerously-skip-permissions
```

Output lands in [output/daily/](output/daily/) as `ai-brief-YYYY-MM-DD.md` / `.html` / `.pdf`, with a run log in [output/logs/](output/logs/).

### Generate the weekly review

```bash
claude -p "$(cat scripts/run-weekly-review.md)" --dangerously-skip-permissions
```

Output lands in [output/weekly/](output/weekly/).

### Run maintenance

```bash
claude -p "$(cat scripts/run-maintenance.md)" --dangerously-skip-permissions
```

## Operating principles

The agent always follows these rules (full details in [CLAUDE.md](CLAUDE.md)):

- **Low token, low noise first.** Reuse templates, skip intermediate chain-of-thought, never pad.
- **High signal-to-noise.** Drop small funding rounds, gossip, generic tech news, unverified rumors, and title-bait.
- **Facts before judgment.** Never dress opinion up as fact; unverified items must be marked as such.
- **Stable outputs.** Fixed sections, fixed filenames, fixed paths, fixed voice — run after run.
- **Graceful degradation.** If PDF rendering fails, keep the Markdown + HTML. If sources are thin, ship a shorter brief rather than filler.

## Source hierarchy

1. **Primary** — official sites, blogs, announcements, official X/Twitter, docs, arXiv / conference pages.
2. **Secondary** — Reuters, Bloomberg, FT, The Information, TechCrunch, The Verge, Wired, CNBC, Semafor.
3. **Supporting** — Hacker News, Reddit, developer communities, founder/employee public posts.

Official sources always win. Media reports should be cross-verified. Community-only items get a lower confidence tag.

## License

Personal project. No license specified.
