(function () {
  // Guard: skip if already running to avoid double-download on rapid clicks
  if (window.__mdExportRunning) return;
  window.__mdExportRunning = true;
  setTimeout(() => { window.__mdExportRunning = false; }, 3000);

  // --- 1. Extract main content with Readability ---
  const docClone = document.cloneNode(true);
  const reader = new Readability(docClone, { keepClasses: false });
  const article = reader.parse();

  if (!article || !article.content) {
    alert("Page to Markdown: Could not extract readable content from this page.");
    window.__mdExportRunning = false;
    return;
  }

  // --- 2. Convert HTML → Markdown with Turndown ---
  const turndown = new TurndownService({
    headingStyle: "atx",       // # H1, ## H2, etc.
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
    strongDelimiter: "**",
  });

  // Keep images as ![alt](src)
  turndown.keep(["img"]);
  turndown.addRule("images", {
    filter: "img",
    replacement: (_content, node) => {
      const alt = (node.getAttribute("alt") || "").trim();
      const src = node.getAttribute("src") || "";
      if (!src) return "";
      return `![${alt}](${src})`;
    },
  });

  // Remove script/style/noscript leftovers
  turndown.remove(["script", "style", "noscript"]);

  let markdown = turndown.turndown(article.content);

  // --- 3. Prepend title and source URL ---
  const title = article.title || document.title || "page";
  const sourceUrl = location.href;
  const header = `# ${title}\n\n> Source: ${sourceUrl}\n\n---\n\n`;
  markdown = header + markdown;

  // --- 4. Build a safe filename from the title ---
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
  const filename = (slug || "page") + ".md";

  // --- 5. Trigger download ---
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
})();
