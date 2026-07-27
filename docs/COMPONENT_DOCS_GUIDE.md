# Component Documentation Authoring Guide

This guide provides step-by-step instructions for adding a new component documentation page to the **Nikala UI** web portal (`nikala-web`). Follow these conventions strictly to maintain layout consistency, SEO metadata standards, and search indexing.

---

## Directory Structure Overview

All component documentation pages live inside `src/routes/docs/components/`.

```text
nikala-web/
├── src/
│   ├── config/
│   │   └── docs.ts                  # Centralized registry and navigation config
│   ├── components/
│   │   ├── ui/
│   │   │   └── <component>.tsx      # Installed Nikala UI component
│   │   └── docs/
│   │       ├── doc-page-header.tsx  # Page header wrapper
│   │       ├── doc-section-header.tsx# Section title wrapper
│   │       ├── doc-api-table.tsx    # Props reference table
│   │       └── doc-next-steps.tsx   # Footer pagination links
│   └── routes/
│       └── docs/
│           └── components/
│               └── <component>.tsx  # Component documentation page route
```

---

## Step-by-Step Instructions

### Step 1: Register Component in Centralized Config

Open `src/config/docs.ts` and append your new component object to the `COMPONENTS_LIST` array.

```typescript
// src/config/docs.ts

export const COMPONENTS_LIST: DocComponentItem[] = [
  // ... existing components
  {
    name: "component-name",
    title: "Component Name",
    description: "Concise summary describing what this component does.",
    href: "/docs/components/component-name",
  },
];
```

*Note: Adding an entry to `COMPONENTS_LIST` automatically updates both the global Command Palette search (`Ctrl + K`) and the documentation sidebar navigation.*

---

### Step 2: Ensure Component File Exists in UI Directory

Verify that the component implementation file exists inside `src/components/ui/<component-name>.tsx`. Ensure all exports are named exports (e.g., `export const ComponentName = ...`).

---

### Step 3: Create Documentation Route File

Create a new file under `src/routes/docs/components/<component-name>.tsx`.

---

### Step 4: Implement Route Page Code

Follow this standard structure for every component documentation page:

```tsx
// src/routes/docs/components/example-component.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { ExampleComponent } from "@/components/ui/example-component";

/* --- Code Snippets --- */
const importCode = `import { ExampleComponent } from "@/components/ui/example-component";`;

const defaultCode = `<ExampleComponent variant="default">Default Example</ExampleComponent>`;

const variantCode = `<ExampleComponent variant="outline">Outline Variant</ExampleComponent>`;

export default function ExampleComponentDocsPage() {
  return (
    <>
      {/* 1. SEO & OpenGraph Meta Tags */}
      <Seo
        title="Example Component"
        description="Detailed specification and interactive examples for ExampleComponent."
        path="/docs/components/example-component"
      />

      <div class="space-y-10 pb-16">
        {/* 2. Page Header */}
        <DocPageHeader
          title="Example Component"
          badge="cva"
          description="Concise functional description of the component purpose."
        />

        {/* 3. Hero Primary Preview */}
        <ComponentPreview name="example-component" code={defaultCode}>
          <ExampleComponent variant="default">Default Example</ExampleComponent>
        </ComponentPreview>

        {/* 4. Import & Usage Section */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 5. Examples & Variants Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Outline Variant</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="outline"</code> for inverted borders.
            </p>
            <ComponentPreview name="example-component" code={variantCode}>
              <ExampleComponent variant="outline">Outline Variant</ExampleComponent>
            </ComponentPreview>
          </div>
        </div>

        {/* 6. API Reference Section */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ExampleComponent"
            items={[
              {
                prop: "variant",
                type: '"default" | "outline"',
                default: '"default"',
                description: "Visual style variant of the component.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables user interaction.",
              },
            ]}
          />
        </div>

        {/* 7. Sequential Footer Pagination */}
        <DocNextSteps
          prev={{ title: "Previous Component", href: "/docs/components/previous-component" }}
          next={{ title: "Next Component", href: "/docs/components/next-component" }}
        />
      </div>
    </>
  );
}
```

---

## Technical Guidelines and Rules

1. **Props Array Naming in `DocApiTable`:**
   Always pass the array of prop specifications using the `items={[...]}` property. Do not use `props={[...]}` to avoid name collision with component parameters.

2. **Sequential Pagination Links:**
   Ensure the `prev` and `next` props inside `DocNextSteps` accurately match the preceding and succeeding items in the documentation menu hierarchy.

3. **No Emojis:**
   Maintain professional documentation aesthetics. Emojis must not be included in component page code or documentation text.

4. **Self-Contained Imports:**
   Ensure all component imports use clean path aliases (`@/components/ui/...`, `@/components/docs/...`).
