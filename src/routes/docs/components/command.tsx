// src/routes/docs/components/command.tsx
import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  BookOpen,
  Terminal,
} from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";`;

const inlineCode = `<Command class="max-w-md border border-border shadow-sm">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="Suggestions">
      <CommandItem title="Calendar" icon={Calendar} shortcut="⌘P" />
      <CommandItem title="Search Emoji" icon={Smile} />
      <CommandItem title="Calculator" icon={Calculator} />
    </CommandGroup>
    <CommandGroup heading="Settings">
      <CommandItem title="Profile" icon={User} />
      <CommandItem title="Billing" icon={CreditCard} />
      <CommandItem title="Settings" icon={Settings} shortcut="⌘S" />
    </CommandGroup>
  </CommandList>
  <CommandFooter />
</Command>`;

const modalCode = `const [open, setOpen] = createSignal(false);

return (
  <>
    <Button onClick={() => setOpen(true)} variant="outline" size="sm" class="gap-2">
      <span>Search documentation...</span>
      <KbdGroup>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </KbdGroup>
    </Button>

    <CommandDialog open={open()} onOpenChange={setOpen} enableHotkey={true}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty />
        <CommandGroup heading="Documentation">
          <CommandItem
            title="Introduction"
            href="/docs"
            icon={BookOpen}
            onSelect={() => setOpen(false)}
          />
          <CommandItem
            title="CLI Reference"
            href="/docs/cli"
            icon={Terminal}
            onSelect={() => setOpen(false)}
          />
        </CommandGroup>
      </CommandList>
      <CommandFooter />
    </CommandDialog>
  </>
);`;

export default function CommandDocsPage() {
  const [dialogOpen, setDialogOpen] = createSignal(false);

  return (
    <>
      <Seo
        title="Command Palette Component"
        description="Fast, accessible command palette and search modal built on Kobalte Dialog primitives with auto-filtering in SolidJS."
        path="/docs/components/command"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Command / Command Palette"
          badge="Kobalte"
          description="A fast, accessible command palette for global search, action lists, keyboard shortcuts, and modal triggers."
        />

        {/* Hero Live Preview (Inline Container) */}
        <ComponentPreview name="command" code={inlineCode}>
          <div class="w-full max-w-md">
            <Command class="border border-border shadow-md">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty />
                <CommandGroup heading="Suggestions">
                  <CommandItem title="Calendar" icon={Calendar} shortcut="⌘P" />
                  <CommandItem title="Search Emoji" icon={Smile} />
                  <CommandItem title="Calculator" icon={Calculator} />
                </CommandGroup>
                <CommandGroup heading="Settings">
                  <CommandItem title="Profile" icon={User} />
                  <CommandItem title="Billing" icon={CreditCard} />
                  <CommandItem title="Settings" icon={Settings} shortcut="⌘S" />
                </CommandGroup>
              </CommandList>
              <CommandFooter />
            </Command>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Modal Command Dialog Trigger */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Modal Command Dialog</h3>
            <p class="text-sm text-muted-foreground">
              Wrap with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">CommandDialog</code> to open as a floating search modal with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Ctrl + K</code> shortcut listener.
            </p>
            <ComponentPreview name="command" code={modalCode}>
              <div class="flex items-center justify-center">
                <Button
                  onClick={() => setDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  class="gap-2"
                >
                  <span>Open Command Modal...</span>
                  <KbdGroup>
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">K</Kbd>
                  </KbdGroup>
                </Button>

                <CommandDialog
                  open={dialogOpen()}
                  onOpenChange={setDialogOpen}
                  enableHotkey={true}
                >
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty />
                    <CommandGroup heading="Documentation">
                      <CommandItem
                        title="Introduction"
                        subtitle="System overview and architecture"
                        icon={BookOpen}
                        href="/docs"
                        onSelect={() => setDialogOpen(false)}
                      />
                      <CommandItem
                        title="CLI Reference"
                        subtitle="nikala init, add, validate, diff"
                        icon={Terminal}
                        href="/docs/cli"
                        onSelect={() => setDialogOpen(false)}
                      />
                    </CommandGroup>
                  </CommandList>
                  <CommandFooter />
                </CommandDialog>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CommandDialog"
            items={[
              {
                prop: "open",
                type: "boolean",
                description: "Controlled open/closed state of the modal dialog.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                description: "Callback invoked when modal open state changes.",
              },
              {
                prop: "enableHotkey",
                type: "boolean",
                default: "true",
                description: "Automatically listens for Ctrl+K / Cmd+K global hotkeys to toggle modal.",
              },
            ]}
          />

          <DocApiTable
            title="CommandGroup"
            items={[
              {
                prop: "heading",
                type: "string",
                required: true,
                description: "Header text for the category group.",
              },
            ]}
          />

          <DocApiTable
            title="CommandItem"
            items={[
              {
                prop: "title",
                type: "string",
                description: "Command title header text.",
              },
              {
                prop: "subtitle",
                type: "string",
                description: "Secondary muted description text.",
              },
              {
                prop: "keywords",
                type: "string[]",
                description: "Additional search terms used during fuzzy auto-filtering.",
              },
              {
                prop: "href",
                type: "string",
                description: "Target URL to navigate upon selection or Enter keypress.",
              },
              {
                prop: "onSelect",
                type: "() => void",
                description: "Callback invoked when the item is clicked or selected with Enter.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Input Group", href: "/docs/components/input-group" }}
          next={{ title: "Theme Manager", href: "/docs/components/theme-manager" }}
        />
      </div>
    </>
  );
}