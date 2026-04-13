#!/usr/bin/env node

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

function printUsage() {
  console.log(`用法:
  node scripts/render-pdf.mjs --input <input.md|input.html> --pdf <output.pdf> [--html <output.html>] [--template <template.html>] [--title <title>] [--browser <path>]

说明:
  - 输入为 HTML 时：直接导出 PDF
  - 输入为 Markdown 时：先套用 HTML 模板，再导出 PDF
  - 默认模板：templates/pdf-style.html
  - 默认浏览器：自动查找 Microsoft Edge / Chrome / Chromium
`);
}

function exitWithError(message) {
  console.error(`render-pdf: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      exitWithError(`无法识别的参数: ${token}`);
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function ensureFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    exitWithError(`${label}不存在: ${filePath}`);
  }

  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    exitWithError(`${label}不是文件: ${filePath}`);
  }
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function formatTimestamp() {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Shanghai",
  }).format(new Date());
}

function applyInlineFormatting(text) {
  let value = escapeHtml(text);

  value = value.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_match, alt, src) =>
      `<img alt="${escapeAttribute(alt)}" src="${escapeAttribute(src)}" />`,
  );
  value = value.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, href) =>
      `<a href="${escapeAttribute(href)}">${label}</a>`,
  );
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  value = value.replace(/(^|[\s(])\*([^*]+)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>");
  value = value.replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>");

  return value;
}

function renderParagraph(lines) {
  const content = lines.map((line) => line.trim()).join(" ");
  return `<p>${applyInlineFormatting(content)}</p>`;
}

function renderBlockquote(lines) {
  const content = lines
    .map((line) => line.replace(/^>\s?/, "").trim())
    .filter(Boolean)
    .map((line) => applyInlineFormatting(line))
    .join("<br />");

  return `<blockquote>${content}</blockquote>`;
}

function renderList(lines, ordered) {
  const tag = ordered ? "ol" : "ul";
  const items = lines
    .map((line) =>
      line.replace(ordered ? /^\d+\.\s+/ : /^[-*+]\s+/, "").trim(),
    )
    .filter(Boolean)
    .map((item) => `<li>${applyInlineFormatting(item)}</li>`)
    .join("");

  return `<${tag}>${items}</${tag}>`;
}

function renderCodeBlock(lines, language) {
  const languageClass = language
    ? ` class="language-${escapeAttribute(language)}"`
    : "";
  const content = escapeHtml(lines.join("\n"));
  return `<pre><code${languageClass}>${content}</code></pre>`;
}

function renderTable(lines) {
  const rows = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let normalized = line;
      if (normalized.startsWith("|")) {
        normalized = normalized.slice(1);
      }
      if (normalized.endsWith("|")) {
        normalized = normalized.slice(0, -1);
      }
      return normalized.split("|").map((cell) => cell.trim());
    });

  if (rows.length < 2) {
    return renderParagraph(lines);
  }

  const header = rows[0];
  const body = rows.slice(2);
  const headHtml = header
    .map((cell) => `<th>${applyInlineFormatting(cell)}</th>`)
    .join("");
  const bodyHtml = body
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${applyInlineFormatting(cell)}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  return `<table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function markdownToHtml(markdown) {
  const source = markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const lines = source.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const codeLines = [];
      index += 1;

      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push(renderCodeBlock(codeLines, language));
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      const level = trimmed.match(/^#+/)[0].length;
      const content = trimmed.replace(/^#{1,6}\s+/, "");
      blocks.push(`<h${level}>${applyInlineFormatting(content)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      blocks.push("<hr />");
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines = [];

      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderBlockquote(quoteLines));
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      const listLines = [];

      while (index < lines.length && /^[-*+]\s+/.test(lines[index].trim())) {
        listLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderList(listLines, false));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const listLines = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        listLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderList(listLines, true));
      continue;
    }

    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      /^\s*\|?[-:\s|]+\|?\s*$/.test(lines[index + 1])
    ) {
      const tableLines = [lines[index], lines[index + 1]];
      index += 2;

      while (index < lines.length && lines[index].includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderTable(tableLines));
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index];
      const nextTrimmed = nextLine.trim();

      if (
        !nextTrimmed ||
        /^#{1,6}\s+/.test(nextTrimmed) ||
        /^```/.test(nextTrimmed) ||
        /^>\s?/.test(nextTrimmed) ||
        /^[-*+]\s+/.test(nextTrimmed) ||
        /^\d+\.\s+/.test(nextTrimmed) ||
        /^---+$/.test(nextTrimmed) ||
        /^\*\*\*+$/.test(nextTrimmed)
      ) {
        break;
      }

      if (
        nextTrimmed.includes("|") &&
        index + 1 < lines.length &&
        /^\s*\|?[-:\s|]+\|?\s*$/.test(lines[index + 1])
      ) {
        break;
      }

      paragraphLines.push(nextLine);
      index += 1;
    }

    blocks.push(renderParagraph(paragraphLines));
  }

  if (!blocks.length) {
    return '<div class="empty-note">输入内容为空，未生成正文。</div>';
  }

  return blocks.join("\n");
}

function fillTemplate(template, values) {
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_match, key) => {
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
}

function shortenText(value, maxLength) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}

function inferExtensionFromContentType(contentType, sourceUrl) {
  const normalizedType = String(contentType || "").toLowerCase();

  if (normalizedType.includes("image/svg+xml")) {
    return ".svg";
  }
  if (normalizedType.includes("image/png")) {
    return ".png";
  }
  if (normalizedType.includes("image/jpeg")) {
    return ".jpg";
  }
  if (normalizedType.includes("image/webp")) {
    return ".webp";
  }
  if (normalizedType.includes("image/gif")) {
    return ".gif";
  }
  if (normalizedType.includes("image/avif")) {
    return ".avif";
  }

  try {
    const url = new URL(sourceUrl);
    const extension = path.extname(url.pathname).toLowerCase();
    if (extension) {
      return extension;
    }
  } catch {
    // Ignore invalid URLs and fall back to a generic binary extension.
  }

  return ".img";
}

function buildFallbackSvg(altText, sourceUrl) {
  let host = "Image source";

  try {
    host = new URL(sourceUrl).hostname.replace(/^www\./i, "");
  } catch {
    // Ignore invalid URLs and keep generic label.
  }

  const title = shortenText(altText || "配图加载失败，已使用本地占位图", 52);
  const subtitle = shortenText(`来源：${host}`, 52);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(title)}</title>
  <desc id="desc">${escapeHtml(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6efe3" />
      <stop offset="100%" stop-color="#e3edf5" />
    </linearGradient>
  </defs>
  <rect width="1200" height="675" rx="28" fill="url(#bg)" />
  <rect x="34" y="34" width="1132" height="607" rx="24" fill="#fffdf8" stroke="#d8deea" stroke-width="2" />
  <circle cx="120" cy="132" r="32" fill="#155e75" opacity="0.14" />
  <circle cx="1080" cy="560" r="54" fill="#155e75" opacity="0.08" />
  <text x="88" y="118" font-family="Aptos, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" fill="#155e75" font-weight="700">AIDailyNews Visual</text>
  <text x="88" y="212" font-family="Aptos, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="42" fill="#102a43" font-weight="700">${escapeHtml(title)}</text>
  <text x="88" y="280" font-family="Aptos, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="26" fill="#5b6472">${escapeHtml(subtitle)}</text>
  <text x="88" y="350" font-family="Aptos, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" fill="#6b7280">原始图片链接不可直接加载，已自动替换为本地占位图。</text>
</svg>`;
}

function findExistingCachedImage(cacheRoot, hash) {
  if (!fs.existsSync(cacheRoot)) {
    return null;
  }

  const entries = fs.readdirSync(cacheRoot);
  const preferred = entries.find((name) => name.startsWith(`${hash}.`));
  if (preferred) {
    return path.join(cacheRoot, preferred);
  }

  const fallback = entries.find((name) => name.startsWith(`${hash}-fallback.`));
  return fallback ? path.join(cacheRoot, fallback) : null;
}

async function materializeRemoteImage(sourceUrl, altText, htmlPath, projectRoot) {
  const cacheRoot = path.join(projectRoot, "output", "cache", "report-images");
  ensureDir(cacheRoot);

  const hash = crypto.createHash("sha1").update(sourceUrl).digest("hex").slice(0, 20);
  const existing = findExistingCachedImage(cacheRoot, hash);
  if (existing) {
    return path.relative(path.dirname(htmlPath), existing).replaceAll("\\", "/");
  }

  try {
    const response = await fetch(sourceUrl, {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = String(response.headers.get("content-type") || "");
    if (!contentType.toLowerCase().startsWith("image/")) {
      throw new Error(`unexpected content-type: ${contentType || "unknown"}`);
    }

    const extension = inferExtensionFromContentType(contentType, sourceUrl);
    const assetPath = path.join(cacheRoot, `${hash}${extension}`);
    const bytes = Buffer.from(await response.arrayBuffer());

    if (!bytes.length) {
      throw new Error("empty image response");
    }

    fs.writeFileSync(assetPath, bytes);
    return path.relative(path.dirname(htmlPath), assetPath).replaceAll("\\", "/");
  } catch {
    const fallbackPath = path.join(cacheRoot, `${hash}-fallback.svg`);

    if (!fs.existsSync(fallbackPath)) {
      fs.writeFileSync(fallbackPath, buildFallbackSvg(altText, sourceUrl), "utf8");
    }

    return path.relative(path.dirname(htmlPath), fallbackPath).replaceAll("\\", "/");
  }
}

async function localizeRemoteImages(html, htmlPath, projectRoot) {
  const imagePattern = /<img\b([^>]*?)src="([^"]+)"([^>]*)>/gi;
  let result = "";
  let lastIndex = 0;

  for (const match of html.matchAll(imagePattern)) {
    const [fullMatch, beforeSrc, rawSrc, afterSrc] = match;
    const startIndex = match.index ?? 0;

    result += html.slice(lastIndex, startIndex);

    const decodedSrc = decodeHtmlEntities(rawSrc);
    if (!/^https?:\/\//i.test(decodedSrc)) {
      result += fullMatch;
      lastIndex = startIndex + fullMatch.length;
      continue;
    }

    const altMatch = fullMatch.match(/\balt="([^"]*)"/i);
    const altText = altMatch ? decodeHtmlEntities(altMatch[1]) : "";
    const localSrc = await materializeRemoteImage(decodedSrc, altText, htmlPath, projectRoot);

    result += `<img${beforeSrc}src="${escapeAttribute(localSrc)}"${afterSrc}>`;
    lastIndex = startIndex + fullMatch.length;
  }

  result += html.slice(lastIndex);
  return result;
}

function extractTitleFromMarkdown(markdown, fallbackTitle) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallbackTitle;
}

function inferTitleFromFilename(inputPath, fallbackTitle) {
  const basename = path.basename(inputPath, path.extname(inputPath));
  const dailyMatch = basename.match(/^ai-brief-(\d{4}-\d{2}-\d{2})$/i);
  const weeklyMatch = basename.match(/^ai-weekly-review-(\d{4}-\d{2}-\d{2})$/i);

  if (dailyMatch) {
    return `AIDailyNews-${dailyMatch[1]}`;
  }

  if (weeklyMatch) {
    return `AIWeeklyReview-${weeklyMatch[1]}`;
  }

  return fallbackTitle;
}

function extractTitleFromHtml(html, fallbackTitle) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  return h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : fallbackTitle;
}

function findExecutableByWhere(binary) {
  const result = spawnSync("where.exe", [binary], {
    encoding: "utf8",
    windowsHide: true,
  });

  if (result.status !== 0) {
    return null;
  }

  const candidates = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function findBrowser(explicitPath) {
  const directCandidates = [
    explicitPath,
    process.env.PDF_BROWSER,
    findExecutableByWhere("msedge"),
    findExecutableByWhere("chrome"),
    findExecutableByWhere("chromium"),
    path.join(
      process.env["ProgramFiles(x86)"] || "",
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
    path.join(
      process.env.ProgramFiles || "",
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
    path.join(
      process.env.LOCALAPPDATA || "",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
    path.join(
      process.env.ProgramFiles || "",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
    path.join(
      process.env["ProgramFiles(x86)"] || "",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
    path.join(
      process.env.ProgramFiles || "",
      "Chromium",
      "Application",
      "chrome.exe",
    ),
  ].filter(Boolean);

  for (const candidate of directCandidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function renderPdf(browserPath, htmlPath, pdfPath) {
  const result = spawnSync(
    browserPath,
    [
      "--headless",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--allow-file-access-from-files",
      "--no-pdf-header-footer",
      "--print-to-pdf-no-header",
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    {
      encoding: "utf8",
      windowsHide: true,
      timeout: 30000,
    },
  );

  if (result.error) {
    exitWithError(`调用浏览器导出 PDF 失败: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    exitWithError(
      `浏览器导出 PDF 失败（退出码 ${result.status}）${details ? `:\n${details}` : ""}`,
    );
  }

  if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).size === 0) {
    exitWithError("浏览器执行完成，但 PDF 文件未成功生成。");
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || args.h) {
    printUsage();
    return;
  }

  if (!args.input) {
    exitWithError("缺少 --input 参数。");
  }

  if (!args.pdf) {
    exitWithError("缺少 --pdf 参数。");
  }

  const projectRoot = process.cwd();
  const inputPath = path.resolve(projectRoot, String(args.input));
  const pdfPath = path.resolve(projectRoot, String(args.pdf));
  const templatePath = path.resolve(
    projectRoot,
    String(args.template || "templates/pdf-style.html"),
  );

  ensureFileExists(inputPath, "输入文件");

  const inputExtension = path.extname(inputPath).toLowerCase();
  const isHtmlInput = inputExtension === ".html" || inputExtension === ".htm";
  const isMarkdownInput = [".md", ".markdown"].includes(inputExtension);

  if (!isHtmlInput && !isMarkdownInput) {
    exitWithError(`只支持 .md / .markdown / .html 输入，当前文件为: ${inputExtension}`);
  }

  ensureParentDir(pdfPath);

  let htmlPath = args.html
    ? path.resolve(projectRoot, String(args.html))
    : pdfPath.replace(/\.pdf$/i, ".html");

  if (!/\.html?$/i.test(htmlPath)) {
    htmlPath = `${htmlPath}.html`;
  }

  ensureParentDir(htmlPath);

  let htmlContent = "";
  let documentTitle = String(
    args.title ||
      inferTitleFromFilename(inputPath, path.basename(inputPath, path.extname(inputPath))),
  );

  if (isMarkdownInput) {
    ensureFileExists(templatePath, "HTML 模板");

    const markdown = fs.readFileSync(inputPath, "utf8");
    const template = fs.readFileSync(templatePath, "utf8");
    const contentHtml = markdownToHtml(markdown);
    documentTitle = String(
      args.title ||
        extractTitleFromMarkdown(
          markdown,
          inferTitleFromFilename(inputPath, documentTitle),
        ),
    );

    htmlContent = fillTemplate(template, {
      title: documentTitle,
      generated_at: formatTimestamp(),
      source_path: path.relative(projectRoot, inputPath).replaceAll("\\", "/"),
      content: contentHtml,
    });
    htmlContent = await localizeRemoteImages(htmlContent, htmlPath, projectRoot);

    fs.writeFileSync(htmlPath, htmlContent, "utf8");
  } else {
    htmlContent = fs.readFileSync(inputPath, "utf8");
    documentTitle = String(
      args.title ||
        extractTitleFromHtml(
          htmlContent,
          inferTitleFromFilename(inputPath, documentTitle),
        ),
    );
    htmlContent = await localizeRemoteImages(htmlContent, htmlPath, projectRoot);

    if (path.resolve(inputPath) !== path.resolve(htmlPath)) {
      fs.writeFileSync(htmlPath, htmlContent, "utf8");
    } else {
      fs.writeFileSync(htmlPath, htmlContent, "utf8");
    }
  }

  const browserPath = findBrowser(args.browser ? path.resolve(projectRoot, String(args.browser)) : null);

  if (!browserPath) {
    exitWithError(
      "未找到可用于导出 PDF 的 Chromium 浏览器。请安装 Microsoft Edge 或 Chrome，或设置 PDF_BROWSER 环境变量。",
    );
  }

  renderPdf(browserPath, htmlPath, pdfPath);

  console.log(`HTML 已生成: ${htmlPath}`);
  console.log(`PDF 已生成: ${pdfPath}`);
  console.log(`浏览器: ${browserPath}`);
  console.log(`标题: ${documentTitle}`);
}

main().catch((error) => {
  exitWithError(error instanceof Error ? error.message : String(error));
});
