import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/* --- Code Snippets --- */
const importCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";`;

const defaultCode = `<DropdownMenu>
  <DropdownMenuTrigger as={Button} variant="outline">
    Open Menu
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <span>Profile</span>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span>Billing</span>
      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span>Settings</span>
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const subMenuCode = `<DropdownMenu>
  <DropdownMenuTrigger as={Button} variant="outline">
    Options & Submenu
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span>Invite users</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent class="w-48">
        <DropdownMenuItem>
          <span>Email</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Message</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`;

const checkboxCode = `const [showStatusBar, setShowStatusBar] = createSignal(true);
const [showActivityBar, setShowActivityBar] = createSignal(false);

return (
  <DropdownMenu>
    <DropdownMenuTrigger as={Button} variant="outline">
      View Preferences
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        checked={showStatusBar()}
        onChange={setShowStatusBar}
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar()}
        onChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);`;

const radioCode = `const [position, setPosition] = createSignal("bottom");

return (
  <DropdownMenu>
    <DropdownMenuTrigger as={Button} variant="outline">
      Panel Position ({position()})
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position()} onChange={setPosition}>
        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);`;

export default function DropdownMenuDocsPage() {
    const [showStatusBar, setShowStatusBar] = createSignal(true);
    const [showActivityBar, setShowActivityBar] = createSignal(false);
    const [position, setPosition] = createSignal("bottom");

    return (
        <>
            <Seo
                title="Dropdown Menu Component"
                description="Full-featured context menu with submenus, checkboxes, radio items, shortcuts, and trigger buttons built on Kobalte."
                path="/docs/components/dropdown-menu"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Dropdown Menu"
                    badge="Kobalte"
                    description="Displays a menu of actions or functions triggered by a button, supporting submenus, checkboxes, radio items, and keyboard shortcuts."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="dropdown-menu" code={defaultCode}>
                    <DropdownMenu>
                        <DropdownMenuTrigger as={Button} variant="outline">
                            Open Menu
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                                <span>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ComponentPreview>

                {/* Usage & Import */}
                <div class="space-y-4">
                    <DocSectionHeader title="Usage" />
                    <CodeBlock code={importCode} lang="tsx" />
                </div>

                {/* Examples */}
                <div class="space-y-8 pt-4">
                    <DocSectionHeader title="Examples" />

                    {/* Submenu */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">With Submenu</h3>
                        <p class="text-sm text-muted-foreground">
                            Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuSub</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuSubTrigger</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuSubContent</code> to create nested menus.
                        </p>
                        <ComponentPreview name="dropdown-menu" code={subMenuCode}>
                            <DropdownMenu>
                                <DropdownMenuTrigger as={Button} variant="outline">
                                    Options & Submenu
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <span>Invite users</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent class="w-48">
                                            <DropdownMenuItem>
                                                <span>Email</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Message</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ComponentPreview>
                    </div>

                    {/* Checkbox Items */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Checkbox Items</h3>
                        <p class="text-sm text-muted-foreground">
                            Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuCheckboxItem</code> for toggleable menu choices.
                        </p>
                        <ComponentPreview name="dropdown-menu" code={checkboxCode}>
                            <DropdownMenu>
                                <DropdownMenuTrigger as={Button} variant="outline">
                                    View Preferences
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        checked={showStatusBar()}
                                        onChange={setShowStatusBar}
                                    >
                                        Status Bar
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={showActivityBar()}
                                        onChange={setShowActivityBar}
                                    >
                                        Activity Bar
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ComponentPreview>
                    </div>

                    {/* Radio Group Items */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Radio Items</h3>
                        <p class="text-sm text-muted-foreground">
                            Combine <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuRadioGroup</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuRadioItem</code> for single-choice option sets.
                        </p>
                        <ComponentPreview name="dropdown-menu" code={radioCode}>
                            <DropdownMenu>
                                <DropdownMenuTrigger as={Button} variant="outline">
                                    Panel Position ({position()})
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={position()} onChange={setPosition}>
                                        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="DropdownMenuItem"
                        items={[
                            {
                                prop: "variant",
                                type: '"default" | "destructive"',
                                default: '"default"',
                                description: "Visual style variant (destructive for dangerous actions like logout or delete).",
                            },
                            {
                                prop: "inset",
                                type: "boolean",
                                default: "false",
                                description: "Pads the item to align with checkbox/radio items.",
                            },
                            {
                                prop: "disabled",
                                type: "boolean",
                                default: "false",
                                description: "Disables user interaction on the menu item.",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="DropdownMenuCheckboxItem"
                        items={[
                            {
                                prop: "checked",
                                type: "boolean",
                                description: "Controlled checked state of the menu item.",
                            },
                            {
                                prop: "onChange",
                                type: "(checked: boolean) => void",
                                description: "Event handler fired when the item checked state toggles.",
                            },
                        ]}
                    />
                </div>

                {/* Footer Navigation */}
                <DocNextSteps
                    prev={{ title: "Dialog Component", href: "/docs/components/dialog" }}
                    next={{ title: "Input Component", href: "/docs/components/input" }}
                />
            </div>
        </>
    );
}