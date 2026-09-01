/**
 * Clean bidirectional HTML <-> Markdown serializer for Nikala Rich Text Editor.
 */

export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let md = html;

  // Replace headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");

  // Replace blockquotes
  md = md.replace(/<blockquote[^>]*>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/blockquote>/gi, "> $1\n\n");
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n");

  // Replace code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n");

  // Replace inline formatting
  md = md.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b>(.*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i>(.*?)<\/i>/gi, "*$1*");
  md = md.replace(/<s>(.*?)<\/s>/gi, "~~$1~~");
  md = md.replace(/<del>(.*?)<\/del>/gi, "~~$1~~");
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");
  md = md.replace(/<mark[^>]*>(.*?)<\/mark>/gi, "==$1==");

  // Replace task list items
  md = md.replace(/<li[^>]*data-checked="true"[^>]*>[\s\S]*?<label>[\s\S]*?<\/label>[\s\S]*?<div>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/div><\/li>/gi, "- [x] $1\n");
  md = md.replace(/<li[^>]*data-checked="false"[^>]*>[\s\S]*?<label>[\s\S]*?<\/label>[\s\S]*?<div>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/div><\/li>/gi, "- [ ] $1\n");
  md = md.replace(/<li[^>]*data-checked="true"[^>]*>[\s\S]*?<label>[\s\S]*?<\/label>[\s\S]*?<div>(.*?)<\/div><\/li>/gi, "- [x] $1\n");
  md = md.replace(/<li[^>]*data-checked="false"[^>]*>[\s\S]*?<label>[\s\S]*?<\/label>[\s\S]*?<div>(.*?)<\/div><\/li>/gi, "- [ ] $1\n");
  md = md.replace(/<li[^>]*data-checked="true"[^>]*>([\s\S]*?)<\/li>/gi, "- [x] $1\n");
  md = md.replace(/<li[^>]*data-checked="false"[^>]*>([\s\S]*?)<\/li>/gi, "- [ ] $1\n");

  // Replace ordered list items inside <ol>
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, listContent) => {
    let index = 1;
    return listContent.replace(/<li[^>]*>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/li>/gi, () => `${index++}. $1\n`)
      .replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${index++}. $1\n`) + "\n";
  });

  // Replace unordered list items inside <ul>
  md = md.replace(/<ul(?:(?!data-type="taskList")[^>])*>([\s\S]*?)<\/ul>/gi, (match, listContent) => {
    return listContent.replace(/<li[^>]*>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/li>/gi, "- $1\n")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n") + "\n";
  });

  // Replace links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Replace images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, "![]($1)");

  // Replace paragraphs and line breaks
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
  md = md.replace(/<br\s*[\/]?>/gi, "\n");
  md = md.replace(/<hr\s*[\/]?>/gi, "---\n\n");

  // Strip remaining HTML tags securely (iterative loop prevents bypasses)
  let prev: string;
  do {
    prev = md;
    md = md.replace(/<[^>]*>/g, "");
  } while (md !== prev);

  // Clean multiple extra line breaks
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

export function markdownToHtml(md: string): string {
  if (!md) return "";

  let processed = md;

  // Headings
  processed = processed.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  processed = processed.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  processed = processed.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Code blocks
  processed = processed.replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>");

  // Blockquotes
  processed = processed.replace(/^\> (.*$)/gim, "<blockquote><p>$1</p></blockquote>");

  // Bold, Italic, Strikethrough, Inline Code, Highlight
  processed = processed.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  processed = processed.replace(/\*(.*?)\*/gim, "<em>$1</em>");
  processed = processed.replace(/~~(.*?)~~/gim, "<s>$1</s>");
  processed = processed.replace(/`([^`]+)`/gim, "<code>$1</code>");
  processed = processed.replace(/==([^=]+)==/gim, "<mark>$1</mark>");

  // Links & Images
  processed = processed.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />');
  processed = processed.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>');

  // Group consecutive Task Checklist items (- [x] or - [ ])
  processed = processed.replace(/(?:^|\n)((?:- \[[ xX]\] .*(?:\n|$))+)/g, (match, block) => {
    const items = block
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line: string) => {
        const checked = /^- \[[xX]\]/.test(line.trim());
        const text = line.trim().replace(/^- \[[ xX]\]\s*/, "");
        return `<li data-checked="${checked}" data-type="taskItem"><label><input type="checkbox"${checked ? ' checked="checked"' : ""}><span></span></label><div><p>${text}</p></div></li>`;
      })
      .join("");
    return `\n<ul data-type="taskList">${items}</ul>\n`;
  });

  // Group consecutive Bullet List items (- or *)
  processed = processed.replace(/(?:^|\n)((?:(?:-|\*) (?!\[[ xX]\]).*(?:\n|$))+)/g, (match, block) => {
    const items = block
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line: string) => {
        const text = line.trim().replace(/^(?:-|\*)\s*/, "");
        return `<li><p>${text}</p></li>`;
      })
      .join("");
    return `\n<ul>${items}</ul>\n`;
  });

  // Group consecutive Numbered List items (1. 2. 3.)
  processed = processed.replace(/(?:^|\n)((?:^\d+\. .*(?:\n|$))+)/gm, (match, block) => {
    const items = block
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line: string) => {
        const text = line.trim().replace(/^\d+\.\s*/, "");
        return `<li><p>${text}</p></li>`;
      })
      .join("");
    return `\n<ol>${items}</ol>\n`;
  });

  // Paragraphs for remaining text blocks
  const finalHtml = processed
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return finalHtml;
}
