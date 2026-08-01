// src/routes/docs/components/sheet.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";`;

const defaultCode = `<Sheet>
  <SheetTrigger as={Button} variant="outline">
    Open Right Sheet
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div class="space-y-4 py-4">
      <div class="space-y-2">
        <Label for="name">Name</Label>
        <Input id="name" value="Niko Pirosmani" />
      </div>
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input id="username" value="@pirosmani" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose as={Button} variant="outline">Cancel</SheetClose>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const sidesCode = `<div class="grid grid-cols-2 gap-4">
  <Sheet>
    <SheetTrigger as={Button} variant="outline">Top</SheetTrigger>
    <SheetContent side="top">
      <SheetHeader>
        <SheetTitle>Top Sheet</SheetTitle>
        <SheetDescription>Slides down from the top edge.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger as={Button} variant="outline">Bottom</SheetTrigger>
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Bottom Sheet</SheetTitle>
        <SheetDescription>Slides up from the bottom edge.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger as={Button} variant="outline">Left</SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Left Navigation</SheetTitle>
        <SheetDescription>Slides in from the left edge.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger as={Button} variant="outline">Right</SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Right Drawer</SheetTitle>
        <SheetDescription>Slides in from the right edge.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</div>`;

export default function SheetDocsPage() {
  return (
    <>
      <Seo
        title="Sheet Component"
        description="Sliding panel component with 4-directional slide-in animations and backdrop blur built on Kobalte primitives."
        path="/docs/components/sheet"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Sheet / Drawer"
          badge="Kobalte"
          description="Extends the dialog component to display content that slides in from any screen edge (top, bottom, left, right)."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="sheet" code={defaultCode}>
          <Sheet>
            <SheetTrigger as={Button} variant="outline">
              Open Right Sheet
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div class="space-y-4 py-4">
                <div class="space-y-2">
                  <Label for="sheet-name">Name</Label>
                  <Input id="sheet-name" value="Niko Pirosmani" />
                </div>
                <div class="space-y-2">
                  <Label for="sheet-user">Username</Label>
                  <Input id="sheet-user" value="@pirosmani" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose as={Button} variant="outline">Cancel</SheetClose>
                <Button>Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* 4 Slide Directions */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Slide Directions</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">side="top | bottom | left | right"</code> to choose the slide direction.
            </p>
            <ComponentPreview name="sheet" code={sidesCode}>
              <div class="grid grid-cols-2 gap-4">
                <Sheet>
                  <SheetTrigger as={Button} variant="outline">Top</SheetTrigger>
                  <SheetContent side="top">
                    <SheetHeader>
                      <SheetTitle>Top Sheet</SheetTitle>
                      <SheetDescription>Slides down from the top edge.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger as={Button} variant="outline">Bottom</SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>Bottom Sheet</SheetTitle>
                      <SheetDescription>Slides up from the bottom edge.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger as={Button} variant="outline">Left</SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Left Navigation</SheetTitle>
                      <SheetDescription>Slides in from the left edge.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger as={Button} variant="outline">Right</SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Right Drawer</SheetTitle>
                      <SheetDescription>Slides in from the right edge.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="SheetContent"
            items={[
              {
                prop: "side",
                type: '"top" | "bottom" | "left" | "right"',
                default: '"right"',
                description: "Screen edge from which the sheet slides in.",
              },
              {
                prop: "showCloseButton",
                type: "boolean",
                default: "true",
                description: "Shows or hides the top-right X close button.",
              },
              {
                prop: "closeOnOutsideClick",
                type: "boolean",
                default: "true",
                description: "Determines if clicking outside closes the sheet.",
              },
              {
                prop: "blur",
                type: "boolean",
                default: "true",
                description: "Toggles background backdrop blur on overlay.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Separator Component", href: "/docs/components/separator" }}
          next={{ title: "Skeleton Component", href: "/docs/components/skeleton" }}
        />
      </div>
    </>
  );
}