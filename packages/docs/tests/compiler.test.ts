// packages/docs/tests/compiler.test.ts
import { describe, expect, test } from "bun:test";
import { compileMdx } from "../src/mdx/compiler.js";

describe("mdx-compiler", () => {
  test("compiles markdown content into SolidJS JSX code", async () => {
    const raw = `---
title: "Quick Start"
description: "How to quickly get started"
order: 1
---

# Introduction

Welcome to the docs!

## Installation

Run this command:

\`\`\`bash
bun add @nikala-ui/core
\`\`\`

### Next Steps

Check out components.
`;

    const result = await compileMdx(raw);

    expect(result.frontmatter.title).toBe("Quick Start");
    expect(result.frontmatter.description).toBe("How to quickly get started");
    expect(result.frontmatter.order).toBe(1);

    expect(result.toc).toHaveLength(2);
    expect(result.toc[0]).toEqual({ id: "installation", text: "Installation", depth: 2 });
    expect(result.toc[1]).toEqual({ id: "next-steps", text: "Next Steps", depth: 3 });

    expect(result.code).toContain("solid-js");
    expect(result.code).toContain("nikala-code-block");
  });

  test("dynamically loads languages on-demand without hardcoding", async () => {
    const raw = `
# Multi-language Guide

\`\`\`python
def calculate_total(items):
    return sum(item.price for item in items)
\`\`\`

\`\`\`go
package main
import "fmt"
func main() {
    fmt.Println("Hello Go")
}
\`\`\`
`;

    const result = await compileMdx(raw);
    expect(result.code).toContain("solid-js");
    expect(result.code).toContain('data-lang="python"');
    expect(result.code).toContain('data-lang="go"');
  });

  test("supports custom themes configured via ShikiConfig", async () => {
    const raw = `
\`\`\`rust
fn main() {
    println!("Testing custom theme");
}
\`\`\`
`;

    const result = await compileMdx(raw, {
      shiki: {
        themes: {
          light: "nord",
          dark: "vitesse-dark",
        },
      },
    });

    expect(result.code).toContain("vitesse-dark");
    expect(result.code).toContain('data-lang="rust"');
  });
});
