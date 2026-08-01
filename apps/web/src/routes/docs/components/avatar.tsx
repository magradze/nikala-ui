import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* --- Code Snippets --- */
const importCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";`;

const defaultCode = `<Avatar>
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Niko Pirosmani" />
  <AvatarFallback>NP</AvatarFallback>
</Avatar>`;

const fallbackCode = `<Avatar>
  <AvatarImage src="/invalid.jpg" alt="Broken User" />
  <AvatarFallback>NP</AvatarFallback>
</Avatar>`;

const sizesCode = `<div class="flex items-center gap-4">
  <Avatar class="h-8 w-8">
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Small Avatar" />
    <AvatarFallback>SM</AvatarFallback>
  </Avatar>

  <Avatar class="h-10 w-10">
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Medium Avatar" />
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>

  <Avatar class="h-14 w-14">
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Large Avatar" />
    <AvatarFallback>LG</AvatarFallback>
  </Avatar>
</div>`;

export default function AvatarDocsPage() {
  return (
    <>
      <Seo
        title="Avatar Component"
        description="An image element with an automatic fallback mechanism for representing users."
        path="/docs/components/avatar"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Avatar"
          badge="Compound"
          description="An image element with an automatic fallback mechanism for displaying user profile photos, initials, or fallback icons."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="avatar" code={defaultCode}>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Niko Pirosmani"
            />
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Fallback State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Fallback State</h3>
            <p class="text-sm text-muted-foreground">
              If the image fails to load or is unavailable, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">AvatarFallback</code> automatically renders.
            </p>
            <ComponentPreview name="avatar" code={fallbackCode}>
              <Avatar>
                <AvatarImage src="/invalid.jpg" alt="Broken User" />
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
            </ComponentPreview>
          </div>

          {/* Custom Dimensions */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Adjust avatar dimensions using Tailwind sizing utility classes (<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">h-8 w-8</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">h-14 w-14</code>).
            </p>
            <ComponentPreview name="avatar" code={sizesCode}>
              <div class="flex items-center gap-4">
                <Avatar class="h-8 w-8">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Small Avatar"
                  />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>

                <Avatar class="h-10 w-10">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Medium Avatar"
                  />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>

                <Avatar class="h-14 w-14">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Large Avatar"
                  />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="AvatarImage"
            items={[
              {
                prop: "src",
                type: "string",
                description: "Image source URL.",
              },
              {
                prop: "alt",
                type: "string",
                description: "Alternative text description for accessibility.",
              },
              {
                prop: "onError",
                type: "(e: Event) => void",
                description: "Callback fired when image fails to load, triggering the fallback.",
              },
            ]}
          />

          <DocApiTable
            title="AvatarFallback"
            items={[
              {
                prop: "children",
                type: "JSX.Element",
                description: "Fallback content (initials, text, or icon) displayed when image fails to load.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Alert Component", href: "/docs/components/alert" }}
          next={{ title: "Badge Component", href: "/docs/components/badge" }}
        />
      </div>
    </>
  );
}