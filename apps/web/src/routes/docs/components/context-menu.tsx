import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { createSignal } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/toggle";`;

const defaultCode = `<ContextMenu>
  <ContextMenuTrigger class="flex h-36 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border text-sm font-medium text-muted-foreground select-none">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem>
      Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>
      Show Full URLs
    </ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent class="w-48">
        <ContextMenuItem>Save Page As...</ContextMenuItem>
        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Developer Tools</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`;

export default function ContextMenuDocsPage() {
  const [showBookmarks, setShowBookmarks] = createSignal(true);
  const [person, setPerson] = createSignal("pedro");

  return (
    <>
      <Seo
        title="Context Menu Component"
        description="Displays a custom menu located at the pointer status upon right click, built on Kobalte primitives in SolidJS."
        path="/docs/components/context-menu"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Context Menu"
          badge="Kobalte"
          description="Displays a contextual popup menu triggered by right-clicking or tapping and holding target areas."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="context-menu" code={defaultCode}>
          <ContextMenu>
            <ContextMenuTrigger class="flex h-36 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border text-sm font-medium text-muted-foreground select-none bg-muted/30 hover:bg-muted/50 transition-colors cursor-context-menu">
              Right-click inside this container
            </ContextMenuTrigger>
            <ContextMenuContent class="w-64">
              <ContextMenuItem>
                Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={showBookmarks()}
                onChange={setShowBookmarks}
              >
                Show Bookmarks Bar <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent class="w-48">
                  <ContextMenuItem>Save Page As...</ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value={person()} onChange={setPerson}>
                <ContextMenuLabel>People</ContextMenuLabel>
                <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
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
            title="Context Menu Components"
            items={[
              {
                prop: "ContextMenu",
                type: "Component",
                default: "-",
                description: "Root context menu state container.",
              },
              {
                prop: "ContextMenuTrigger",
                type: "Component",
                default: "-",
                description: "Target area component that listens for right-click pointer events.",
              },
              {
                prop: "ContextMenuContent",
                type: "Component",
                default: "-",
                description: "Portal popup container rendered at cursor coordinates.",
              },
              {
                prop: "ContextMenuItem",
                type: "Component",
                default: "-",
                description: "Clickable menu item entry.",
              },
              {
                prop: "ContextMenuCheckboxItem",
                type: "Component",
                default: "-",
                description: "Menu item that can be checked or unchecked.",
              },
              {
                prop: "ContextMenuRadioItem",
                type: "Component",
                default: "-",
                description: "Menu item acting as a single choice radio button.",
              },
              {
                prop: "ContextMenuSub",
                type: "Component",
                default: "-",
                description: "Submenu container for nested hierarchy.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
          next={{ title: "Dialog", href: "/docs/components/dialog" }}
        />
      </div>
    </>
  );
}
