import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { ApiTable, type ApiTableItem } from "@/components/ui/api-table";

/* --- Code Snippets --- */
const importCode = `import { ApiTable, type ApiTableItem } from "@/components/ui/api-table";`;

const sampleItems: ApiTableItem[] = [
  {
    prop: "variant",
    type: '"default" | "primary" | "outline" | "ghost" | "destructive"',
    default: '"default"',
    description: "Visual style variant applied to the button.",
  },
  {
    prop: "size",
    type: '"xs" | "sm" | "default" | "lg" | "icon"',
    default: '"default"',
    description: "Size dimensions and internal padding scale.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether user interaction and events are disabled.",
  },
  {
    prop: "onClick",
    type: "(event: MouseEvent) => void",
    default: "undefined",
    description: "Event handler callback triggered on click.",
  },
];

const defaultCode = `<ApiTable
  title="Button"
  badge="Props"
  description="All reactive properties and event bindings supported by the Button component."
  items={[
    {
      prop: "variant",
      type: '"default" | "primary" | "outline" | "ghost" | "destructive"',
      default: '"default"',
      description: "Visual style variant applied to the button.",
    },
    {
      prop: "size",
      type: '"xs" | "sm" | "default" | "lg" | "icon"',
      default: '"default"',
      description: "Size dimensions and internal padding scale.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether user interaction and events are disabled.",
    },
  ]}
/>`;

export default function ApiTableDocsPage() {
  return (
    <>
      <Seo
        title="API Table Component"
        description="Structured API reference table component for documenting props, types, defaults, and descriptions in technical documentation."
        path="/docs/components/api-table"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="API Table"
          badge="utility"
          description="A structured API reference table component for documenting props, types, default values, and event bindings in technical documentation and component systems."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="api-table" code={defaultCode}>
          <div class="w-full">
            <ApiTable
              title="Button"
              badge="Props"
              description="All reactive properties and event bindings supported by the Button component."
              items={sampleItems}
            />
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="ApiTable"
            items={[
              {
                prop: "title",
                type: "string",
                default: "undefined",
                description: "Title header displayed above the table.",
              },
              {
                prop: "badge",
                type: "string",
                default: '"Props"',
                description: "Tag badge label displayed next to the title.",
              },
              {
                prop: "description",
                type: "string",
                default: "undefined",
                description: "Subheading or explanatory notes.",
              },
              {
                prop: "items",
                type: "ApiTableItem[]",
                default: "[]",
                description: "Array of property definition rows to render in the table.",
                required: true,
              },
            ]}
          />
          <DocApiTable
            title="ApiTableItem"
            items={[
              {
                prop: "prop",
                type: "string",
                default: "undefined",
                description: "Property, attribute, or method name.",
                required: true,
              },
              {
                prop: "type",
                type: "string",
                default: "undefined",
                description: "TypeScript type definition string.",
                required: true,
              },
              {
                prop: "default",
                type: "string",
                default: "undefined",
                description: "Default fallback value.",
              },
              {
                prop: "description",
                type: "string",
                default: "undefined",
                description: "Detailed description of purpose and usage.",
                required: true,
              },
              {
                prop: "required",
                type: "boolean",
                default: "false",
                description: "Displays a red required asterisk next to the prop name.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Alert", href: "/docs/components/alert" }}
          next={{ title: "Avatar", href: "/docs/components/avatar" }}
        />
      </div>
    </>
  );
}
