import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const docsChangelogsDir = path.join(rootDir, "docs", "changelogs");
const rootChangelogPath = path.join(rootDir, "CHANGELOG.md");

const REPO_URL = "https://github.com/nikala-ui/ui";

interface CommitInfo {
  hash: string;
  type: string;
  scope: string;
  subject: string;
  author: string;
  raw: string;
}

interface ReleaseGroup {
  tag: string;
  version: string;
  date: string;
  prevTag: string | null;
  categories: Record<string, CommitInfo[]>;
  totalCommits: number;
}

const CATEGORY_MAP: Record<string, string> = {
  feat: "Features",
  fix: "Bug Fixes",
  perf: "Performance Improvements",
  refactor: "Refactoring",
  docs: "Documentation",
  style: "Styling",
  test: "Tests",
  build: "Build System",
  ci: "CI/CD",
  chore: "Maintenance",
  other: "Other Changes",
};

function parseCommitMessage(hash: string, subject: string, author: string): CommitInfo {
  const match = subject.match(/^([a-zA-Z]+)(?:\(([^)]+)\))?:\s*(.*)$/);
  if (match) {
    const type = match[1].toLowerCase();
    const scope = match[2] || "";
    const cleanSubject = match[3] || subject;
    return { hash, type, scope, subject: cleanSubject, author, raw: subject };
  }
  return { hash, type: "other", scope: "", subject, author, raw: subject };
}

function getSortedTags(): string[] {
  try {
    const output = execSync("git tag -l --sort=v:refname", { cwd: rootDir, encoding: "utf-8" });
    const rawTags = output.split("\n").map((t) => t.trim()).filter(Boolean);
    return rawTags.filter((t) => /^v?\d+\.\d+\.\d+/.test(t));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

function getTagDate(tag: string): string {
  try {
    return execSync(`git log -1 --format=%as ${tag}`, { cwd: rootDir, encoding: "utf-8" }).trim();
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

function getCommitsBetween(prevTag: string | null, tag: string): CommitInfo[] {
  const range = prevTag ? `${prevTag}..${tag}` : tag;
  try {
    const output = execSync(`git log --format="%h|%s|%an" ${range}`, { cwd: rootDir, encoding: "utf-8" });
    const lines = output.split("\n").filter(Boolean);
    return lines.map((line) => {
      const [hash, subject, author] = line.split("|");
      return parseCommitMessage(hash, subject, author);
    });
  } catch {
    return [];
  }
}

function categorizeCommits(commits: CommitInfo[]): Record<string, CommitInfo[]> {
  const categories: Record<string, CommitInfo[]> = {
    feat: [],
    fix: [],
    perf: [],
    refactor: [],
    docs: [],
    style: [],
    build: [],
    ci: [],
    chore: [],
    other: [],
  };

  for (const commit of commits) {
    if (categories[commit.type]) {
      categories[commit.type].push(commit);
    } else {
      categories.other.push(commit);
    }
  }

  return categories;
}

function formatCommitLine(commit: CommitInfo): string {
  const hashLink = `[\`${commit.hash}\`](${REPO_URL}/commit/${commit.hash})`;
  const scopePrefix = commit.scope ? `**${commit.scope}**: ` : "";
  return `- ${scopePrefix}${commit.subject} (${hashLink})`;
}

function generateReleaseMarkdown(release: ReleaseGroup): string {
  const lines: string[] = [];
  lines.push(`# Release ${release.tag} (${release.date})`);
  lines.push("");

  if (release.prevTag) {
    lines.push(`> Compare changes: [\`${release.prevTag}...${release.tag}\`](${REPO_URL}/compare/${release.prevTag}...${release.tag})`);
    lines.push("");
  }

  let hasContent = false;
  for (const [key, label] of Object.entries(CATEGORY_MAP)) {
    const commits = release.categories[key];
    if (commits && commits.length > 0) {
      hasContent = true;
      lines.push(`### ${label}`);
      lines.push("");
      for (const commit of commits) {
        lines.push(formatCommitLine(commit));
      }
      lines.push("");
    }
  }

  if (!hasContent) {
    lines.push("Initial release and repository setup.");
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

export function generateAllChangelogs() {
  if (!fs.existsSync(docsChangelogsDir)) {
    fs.mkdirSync(docsChangelogsDir, { recursive: true });
  }

  const tags = getSortedTags();
  if (tags.length === 0) return;

  const releases: ReleaseGroup[] = [];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const prevTag = i > 0 ? tags[i - 1] : null;
    const version = tag.replace(/^v/, "");
    const date = getTagDate(tag);
    const commits = getCommitsBetween(prevTag, tag);
    const categories = categorizeCommits(commits);

    const release: ReleaseGroup = {
      tag,
      version,
      date,
      prevTag,
      categories,
      totalCommits: commits.length,
    };

    releases.push(release);

    // Write individual release file to docs/changelogs/vX.Y.Z.md
    const docFile = path.join(docsChangelogsDir, `${tag}.md`);
    fs.writeFileSync(docFile, generateReleaseMarkdown(release));
  }

  // Generate Compact Root CHANGELOG.md (Index table linking to docs/changelogs/)
  const rootLines: string[] = [];
  rootLines.push("# Changelog");
  rootLines.push("");
  rootLines.push("All notable changes, releases, and version histories across **Nikala UI**.");
  rootLines.push("");
  rootLines.push("Documentation & Live Site: [nikala.dev](https://nikala.dev)");
  rootLines.push("");
  rootLines.push("---");
  rootLines.push("");
  rootLines.push("## Releases");
  rootLines.push("");
  rootLines.push("| Version | Release Date | Release Notes | Commits | Compare |");
  rootLines.push("| :--- | :--- | :--- | :---: | :--- |");

  const descReleases = [...releases].reverse();

  for (const rel of descReleases) {
    const featCount = (rel.categories.feat || []).length;
    const fixCount = (rel.categories.fix || []).length;
    const summaryParts: string[] = [];
    if (featCount > 0) summaryParts.push(`${featCount} feature${featCount > 1 ? "s" : ""}`);
    if (fixCount > 0) summaryParts.push(`${fixCount} fix${fixCount > 1 ? "es" : ""}`);
    const summary = summaryParts.length > 0 ? summaryParts.join(", ") : "Maintenance";

    const compareLink = rel.prevTag
      ? `[\`${rel.prevTag}...${rel.tag}\`](${REPO_URL}/compare/${rel.prevTag}...${rel.tag})`
      : "Initial";

    rootLines.push(
      `| [**\`${rel.tag}\`**](./docs/changelogs/${rel.tag}.md) | \`${rel.date}\` | [${summary}](./docs/changelogs/${rel.tag}.md) | ${rel.totalCommits} | ${compareLink} |`
    );
  }

  rootLines.push("");
  fs.writeFileSync(rootChangelogPath, rootLines.join("\n").trim() + "\n");
  console.log(`Generated compact root CHANGELOG.md (${descReleases.length} releases indexed).`);
}

generateAllChangelogs();
