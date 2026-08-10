import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { IconButton } from "@/components/ui/icon-button";
import { Settings, Trash2, Plus, Menu } from "lucide-solid";

const importCode = `import { IconButton } from "@/components/ui/icon-button";`;

const defaultCode = `<IconButton label="Open settings">
  <Settings />
</IconButton>`;

const variantsCode = `<div class="flex items-center gap-3">
  <IconButton label="Add item" variant="default">
    <Plus />
  </IconButton>
  <IconButton label="Open settings" variant="outline">
    <Settings />
  </IconButton>
  <IconButton label="Delete item" variant="destructive">
    <Trash2 />
  </IconButton>
</div>`;

const sizesCode = `<div class="flex items-center gap-3">
  <IconButton label="Small menu" size="sm">
    <Menu />
  </IconButton>
  <IconButton label="Default menu">
    <Menu />
  </IconButton>
  <IconButton label="Large menu" size="lg">
    <Menu />
  </IconButton>
</div>`;

export default function IconButtonDocsPage() {
  return (
    <>
      <Seo
        title="Icon Button Component"
        description="An accessible square button for icon-only actions in SolidJS."
        path="/docs/components/icon-button"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Icon Button"
          badge="Button"
          description="A compact accessible button for single-icon actions in toolbars, headers, and compact controls."
        />

        <ComponentPreview name="icon-button" code={defaultCode}>
          <IconButton label="Open settings">
            <Settings />
          </IconButton>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Icon buttons support the same visual variants as <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Button</code>.
            </p>
            <ComponentPreview name="icon-button" code={variantsCode}>
              <div class="flex items-center gap-3">
                <IconButton label="Add item" variant="default">
                  <Plus />
                </IconButton>
                <IconButton label="Open settings" variant="outline">
                  <Settings />
                </IconButton>
                <IconButton label="Delete item" variant="destructive">
                  <Trash2 />
                </IconButton>
              </div>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Choose a size to match the density of the surrounding controls.
            </p>
            <ComponentPreview name="icon-button" code={sizesCode}>
              <div class="flex items-center gap-3">
                <IconButton label="Small menu" size="sm">
                  <Menu />
                </IconButton>
                <IconButton label="Default menu">
                  <Menu />
                </IconButton>
                <IconButton label="Large menu" size="lg">
                  <Menu />
                </IconButton>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="IconButton"
            items={[
              {
                prop: "label",
                type: "string",
                description: "Required accessible label announced for the icon-only action.",
              },
              {
                prop: "size",
                type: '"sm" | "default" | "lg"',
                default: '"default"',
                description: "Controls the square button dimensions.",
              },
              {
                prop: "variant",
                type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
                default: '"default"',
                description: "Visual style inherited from Button.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Button Component", href: "/docs/components/button" }}
          next={{ title: "Checkbox Component", href: "/docs/components/checkbox" }}
        />
      </div>
    </>
  );
}
