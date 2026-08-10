import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyAction,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderOpen, Plus, SearchX } from "lucide-solid";

const importCode = `import {
  Empty,
  EmptyAction,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from "@/components/ui/empty";`;

const defaultCode = `<Empty>
  <EmptyIcon>
    <FolderOpen />
  </EmptyIcon>
  <EmptyTitle>No projects yet</EmptyTitle>
  <EmptyDescription>
    Create your first project to get started.
  </EmptyDescription>
  <EmptyAction>
    <Button>
      <Plus />
      Create project
    </Button>
  </EmptyAction>
</Empty>`;

const searchCode = `<Empty class="min-h-52">
  <EmptyIcon>
    <SearchX />
  </EmptyIcon>
  <EmptyTitle>No results found</EmptyTitle>
  <EmptyDescription>
    Try adjusting your search or filter criteria.
  </EmptyDescription>
</Empty>`;

export default function EmptyDocsPage() {
  return (
    <>
      <Seo
        title="Empty Component"
        description="A compound empty-state layout for collections, search results, and initial application states."
        path="/docs/components/empty"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Empty"
          badge="Compound"
          description="A flexible empty-state layout for communicating that a collection has no content yet."
        />

        <ComponentPreview name="empty" code={defaultCode}>
          <Empty>
            <EmptyIcon>
              <FolderOpen />
            </EmptyIcon>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project to get started.
            </EmptyDescription>
            <EmptyAction>
              <Button>
                <Plus />
                Create project
              </Button>
            </EmptyAction>
          </Empty>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">No Search Results</h3>
            <p class="text-sm text-muted-foreground">
              Customize the minimum height or omit the action area for compact empty states.
            </p>
            <ComponentPreview name="empty" code={searchCode}>
              <Empty class="min-h-52">
                <EmptyIcon>
                  <SearchX />
                </EmptyIcon>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or filter criteria.
                </EmptyDescription>
              </Empty>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Empty"
            items={[
              {
                prop: "class",
                type: "string",
                description: "Additional classes for sizing, spacing, borders, and layout customization.",
              },
            ]}
          />
          <DocApiTable
            title="EmptyIcon / EmptyTitle / EmptyDescription / EmptyAction"
            items={[
              {
                prop: "children",
                type: "JSX.Element",
                description: "Content rendered inside the compound empty-state section.",
              },
              {
                prop: "class",
                type: "string",
                description: "Additional Tailwind classes for the individual section.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
          next={{ title: "Field Component", href: "/docs/components/field" }}
        />
      </div>
    </>
  );
}
