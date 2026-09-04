// packages/docs/tests/content-scanner.test.ts
import { describe, expect, test } from "bun:test";
import {
  extractTitle,
  extractToc,
  filePathToUrl,
  formatTitleFromFilename,
  slugify,
} from "../src/core/content-scanner.js";

describe("content-scanner", () => {
  describe("slugify", () => {
    test("converts title to kebab-case slug", () => {
      expect(slugify("Getting Started")).toBe("getting-started");
      expect(slugify("Installation & Setup")).toBe("installation-setup");
      expect(slugify("Hello   World---Test")).toBe("hello-world-test");
    });
  });

  describe("filePathToUrl", () => {
    test("normalizes index files to root or folder base", () => {
      expect(filePathToUrl("index.mdx")).toBe("/");
      expect(filePathToUrl("getting-started/index.md")).toBe("/getting-started");
      expect(filePathToUrl("components/forms/input.mdx")).toBe("/components/forms/input");
      expect(filePathToUrl("components/button.mdx")).toBe("/components/button");
    });
  });

  describe("formatTitleFromFilename", () => {
    test("formats kebab-case names to Title Case", () => {
      expect(formatTitleFromFilename("button.mdx")).toBe("Button");
      expect(formatTitleFromFilename("dropdown-menu.mdx")).toBe("Dropdown Menu");
      expect(formatTitleFromFilename("index.mdx")).toBe("Overview");
    });
  });

  describe("extractTitle", () => {
    test("extracts first H1 header while ignoring code blocks", () => {
      const content = `
\`\`\`bash
# Not this comment
bun add @nikala-ui/core
\`\`\`

# Actual Title

Some content here.
`;
      expect(extractTitle(content, "Fallback")).toBe("Actual Title");
    });
  });

  describe("extractToc", () => {
    test("extracts H2 and H3 headings and ignores code blocks", () => {
      const content = `
# Main Title

Introduction text.

## Features
Some features.

\`\`\`markdown
## Fake Header In Code
\`\`\`

### Quick Start
Quick start details.

## API Reference
API table.
`;
      const toc = extractToc(content);
      expect(toc).toHaveLength(3);
      expect(toc[0]).toEqual({ id: "features", text: "Features", depth: 2 });
      expect(toc[1]).toEqual({ id: "quick-start", text: "Quick Start", depth: 3 });
      expect(toc[2]).toEqual({ id: "api-reference", text: "API Reference", depth: 2 });
    });
  });

  describe("scanContent", () => {
    test("reads directory recursively and builds page catalog", async () => {
      const fs = await import("fs-extra");
      const path = await import("node:path");
      const os = await import("node:os");

      const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "nikala-docs-test-"));

      try {
        await fs.ensureDir(path.join(tempDir, "components"));
        await fs.writeFile(
          path.join(tempDir, "index.mdx"),
          `---\ntitle: "Home"\n---\n# Home Page`
        );
        await fs.writeFile(
          path.join(tempDir, "components", "button.mdx"),
          `---\ntitle: "Button"\n---\n## Props\n## Examples`
        );

        const { scanContent } = await import("../src/core/content-scanner.js");
        const pages = await scanContent(tempDir);

        expect(pages).toHaveLength(2);
        expect(pages[0].url).toBe("/");
        expect(pages[0].title).toBe("Home");
        expect(pages[1].url).toBe("/components/button");
        expect(pages[1].toc).toHaveLength(2);
      } finally {
        await fs.remove(tempDir);
      }
    });
  });
});
