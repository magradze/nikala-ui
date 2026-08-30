// src/routes/docs/components/sidebar.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Settings,
  Users,
  Command,
  CreditCard,
  ChevronRight,
  Shield,
  LifeBuoy,
  Database,
  Key,
  ChevronsUpDown,
  Check,
  Plus,
  Building2,
  Sparkles,
} from "lucide-solid";
import { createSignal, For, Show } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";`;

const defaultCode = `<SidebarProvider class="w-full justify-center">
  <div class="flex flex-col items-start gap-3">
    <div class="flex items-center gap-2">
      <SidebarTrigger />
      <span class="text-xs text-muted-foreground font-mono">Toggle icon collapse</span>
    </div>

    <Sidebar collapsible="icon" class="rounded-lg border border-border bg-card shadow-sm h-[480px]">
      {/* 1. Workspace / Team Switcher Header */}
      <SidebarHeader>
        <DropdownMenu placement="bottom-start">
          <DropdownMenuTrigger class="w-full text-left">
            <SidebarMenuButton size="lg" class="w-full justify-between">
              <div class="flex items-center gap-2.5 overflow-hidden">
                <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                  <Command class="size-4" />
                </div>
                <div class="flex flex-col gap-0.5 leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                  <span class="font-bold text-xs truncate">Nikala Studio</span>
                  <span class="text-[10px] text-muted-foreground truncate">Pro Workspace</span>
                </div>
              </div>
              <ChevronsUpDown class="ml-auto size-4 text-muted-foreground shrink-0 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-60">
            <DropdownMenuLabel class="text-[11px] font-semibold uppercase text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            <DropdownMenuItem class="flex items-center gap-2.5 p-2 cursor-pointer">
              <div class="flex size-6 items-center justify-center rounded-md border border-border bg-background">
                <Command class="size-3.5" />
              </div>
              <div class="flex flex-col leading-tight flex-1">
                <span class="text-xs font-semibold">Nikala Studio</span>
                <span class="text-[10px] text-muted-foreground">Pro Workspace</span>
              </div>
              <Check class="size-3.5 text-primary ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem class="flex items-center gap-2.5 p-2 cursor-pointer">
              <div class="flex size-6 items-center justify-center rounded-md border border-border bg-background">
                <Building2 class="size-3.5" />
              </div>
              <div class="flex flex-col leading-tight flex-1">
                <span class="text-xs font-semibold">Acme Enterprise</span>
                <span class="text-[10px] text-muted-foreground">Scale Tier</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="flex items-center gap-2.5 p-2 cursor-pointer text-muted-foreground hover:text-foreground">
              <div class="flex size-6 items-center justify-center rounded-md border border-dashed border-border bg-background">
                <Plus class="size-3.5" />
              </div>
              <span class="text-xs font-medium">Create New Workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      {/* 2. Scrollable Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Dashboard">
                  <LayoutDashboard class="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox">
                  <Inbox class="size-4" />
                  <span>Inbox</span>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Projects">
                  <FolderKanban class="size-4" />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Team">
                  <Users class="size-4" />
                  <span>Team Members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Preferences">
                  <Settings class="size-4" />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Billing">
                  <CreditCard class="size-4" />
                  <span>Billing & Plans</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. User Profile Footer */}
      <SidebarFooter>
        <div class="flex items-center gap-2.5 p-1">
          <Avatar class="size-7 shrink-0">
            <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
          </Avatar>
          <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
            <span class="text-xs font-semibold truncate">Giorgi M.</span>
            <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  </div>
</SidebarProvider>`;

const collapsibleCode = `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight, Settings, Database, Key } from "lucide-solid";

return (
  <SidebarProvider class="w-full justify-center">
    <div class="w-72 rounded-lg border border-border bg-card p-2 shadow-sm">
      <SidebarMenu>
        {/* Collapsible Submenu */}
        <SidebarMenuItem>
          <Collapsible defaultOpen class="group/collapsible w-full">
            <CollapsibleTrigger class="w-full text-left">
              <SidebarMenuButton class="w-full justify-between">
                <div class="flex items-center gap-2">
                  <Settings class="size-4" />
                  <span>Configuration</span>
                </div>
                <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton isActive>General Settings</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Billing & Invoices</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>API Credentials</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Database class="size-4" />
            <span>Database Storage</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Key class="size-4" />
            <span>Access Tokens</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  </SidebarProvider>
);`;

export default function SidebarDocPage() {
  const [activeItem, setActiveItem] = createSignal("dashboard");

  const teams = [
    { name: "Nikala Studio", plan: "Pro Workspace", icon: Command },
    { name: "Acme Enterprise", plan: "Scale Tier", icon: Building2 },
    { name: "Personal Lab", plan: "Free Tier", icon: Sparkles },
  ];

  const [activeTeam, setActiveTeam] = createSignal(teams[0]);

  return (
    <>
      <Seo
        title="Sidebar Component"
        description="A composable, collapsible, and accessible application sidebar navigation suite for SolidJS."
        path="/docs/components/sidebar"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Sidebar"
          badge="Compound Suite"
          description="A composable, structured sidebar navigation suite with team switchers, grouped menus, badges, collapsible submenus, icon collapse mode, and footers."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="sidebar" code={defaultCode}>
          <div class="flex items-center justify-center p-6 sm:p-10 w-full">
            <SidebarProvider class="w-full justify-center">
              <div class="flex flex-col items-start gap-3">
                <div class="flex items-center gap-2">
                  <SidebarTrigger />
                  <span class="text-xs text-muted-foreground font-mono">Toggle icon collapse</span>
                </div>

                <Sidebar collapsible="icon" class="rounded-lg border border-border bg-card shadow-sm h-[480px]">
                  {/* 1. Workspace / Team Switcher Header */}
                  <SidebarHeader>
                    <DropdownMenu placement="bottom-start">
                      <DropdownMenuTrigger class="w-full text-left">
                        <SidebarMenuButton size="lg" class="w-full justify-between">
                          <div class="flex items-center gap-2.5 overflow-hidden">
                            <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                              {(() => {
                                const IconComp = activeTeam().icon;
                                return <IconComp class="size-4" />;
                              })()}
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                              <span class="font-bold text-xs truncate">{activeTeam().name}</span>
                              <span class="text-[10px] text-muted-foreground truncate">{activeTeam().plan}</span>
                            </div>
                          </div>
                          <ChevronsUpDown class="ml-auto size-4 text-muted-foreground shrink-0 group-data-[collapsible=icon]:hidden" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent class="w-60">
                        <DropdownMenuLabel class="text-[11px] font-semibold uppercase text-muted-foreground">
                          Workspaces
                        </DropdownMenuLabel>
                        <For each={teams}>
                          {(team) => (
                            <DropdownMenuItem
                              onClick={() => setActiveTeam(team)}
                              class="flex items-center gap-2.5 p-2 cursor-pointer"
                            >
                              <div class="flex size-6 items-center justify-center rounded-md border border-border bg-background">
                                {(() => {
                                  const IconComp = team.icon;
                                  return <IconComp class="size-3.5 text-foreground" />;
                                })()}
                              </div>
                              <div class="flex flex-col leading-tight flex-1">
                                <span class="text-xs font-semibold">{team.name}</span>
                                <span class="text-[10px] text-muted-foreground">{team.plan}</span>
                              </div>
                              <Show when={activeTeam().name === team.name}>
                                <Check class="size-3.5 text-primary ml-auto" />
                              </Show>
                            </DropdownMenuItem>
                          )}
                        </For>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex items-center gap-2.5 p-2 cursor-pointer text-muted-foreground hover:text-foreground">
                          <div class="flex size-6 items-center justify-center rounded-md border border-dashed border-border bg-background">
                            <Plus class="size-3.5" />
                          </div>
                          <span class="text-xs font-medium">Create New Workspace</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarHeader>

                  {/* 2. Navigation Content */}
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Platform</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "dashboard"}
                              onClick={() => setActiveItem("dashboard")}
                              tooltip="Dashboard"
                            >
                              <LayoutDashboard class="size-4" />
                              <span>Dashboard</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "inbox"}
                              onClick={() => setActiveItem("inbox")}
                              tooltip="Inbox"
                            >
                              <Inbox class="size-4" />
                              <span>Inbox</span>
                              <SidebarMenuBadge>12</SidebarMenuBadge>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "projects"}
                              onClick={() => setActiveItem("projects")}
                              tooltip="Projects"
                            >
                              <FolderKanban class="size-4" />
                              <span>Projects</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "users"}
                              onClick={() => setActiveItem("users")}
                              tooltip="Team"
                            >
                              <Users class="size-4" />
                              <span>Team Members</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarSeparator />

                    <SidebarGroup>
                      <SidebarGroupLabel>Settings</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "settings"}
                              onClick={() => setActiveItem("settings")}
                              tooltip="Preferences"
                            >
                              <Settings class="size-4" />
                              <span>Preferences</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeItem() === "billing"}
                              onClick={() => setActiveItem("billing")}
                              tooltip="Billing"
                            >
                              <CreditCard class="size-4" />
                              <span>Billing & Plans</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>

                  {/* 3. Footer */}
                  <SidebarFooter>
                    <div class="flex items-center gap-2.5 p-1">
                      <Avatar class="size-7 shrink-0">
                        <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
                      </Avatar>
                      <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span class="text-xs font-semibold truncate">Giorgi M.</span>
                        <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
                      </div>
                    </div>
                  </SidebarFooter>
                </Sidebar>
              </div>
            </SidebarProvider>
          </div>
        </ComponentPreview>

        {/* 3. Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Example: Collapsible Submenu with Kobalte Primitive */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Collapsible Tree Menu</h3>
            <p class="text-sm text-muted-foreground">
              Integrate <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Collapsible</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">SidebarMenuSub</code> for animated expand/collapse dropdown navigation.
            </p>
            <ComponentPreview name="sidebar" code={collapsibleCode}>
              <div class="flex items-center justify-center p-6 w-full">
                <SidebarProvider class="w-full justify-center">
                  <div class="w-72 rounded-lg border border-border bg-card p-2 shadow-sm">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <Collapsible defaultOpen class="group/collapsible w-full">
                          <CollapsibleTrigger class="w-full text-left">
                            <SidebarMenuButton class="w-full justify-between">
                              <div class="flex items-center gap-2">
                                <Settings class="size-4" />
                                <span>Configuration</span>
                              </div>
                              <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton isActive>General Settings</SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton>Billing & Invoices</SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton>API Credentials</SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Database class="size-4" />
                          <span>Database Storage</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Key class="size-4" />
                          <span>Access Tokens</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </div>
                </SidebarProvider>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="SidebarProvider"
            items={[
              {
                prop: "defaultOpen",
                type: "boolean",
                default: "true",
                description: "Initial expanded state when rendered uncontrolled.",
              },
              {
                prop: "open",
                type: "Accessor<boolean>",
                default: "undefined",
                description: "Controlled signal accessor for the expanded state.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                default: "undefined",
                description: "Event callback invoked when the sidebar state toggles.",
              },
            ]}
          />

          <DocApiTable
            title="Sidebar"
            items={[
              {
                prop: "collapsible",
                type: '"icon" | "offcanvas" | "none"',
                default: '"icon"',
                description: 'Collapse behavior. "icon" collapses into narrow icon bar with tooltips.',
              },
              {
                prop: "variant",
                type: '"sidebar" | "floating" | "inset"',
                default: '"sidebar"',
                description: "Visual styling variant of the sidebar container.",
              },
            ]}
          />

          <DocApiTable
            title="SidebarMenuButton"
            items={[
              {
                prop: "isActive",
                type: "boolean",
                default: "false",
                description: "Highlights the button as the current active route.",
              },
              {
                prop: "tooltip",
                type: "string",
                default: "undefined",
                description: "Tooltip text shown on hover when sidebar is collapsed in icon mode.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg"',
                default: '"default"',
                description: "Dimensions and padding of the menu button.",
              },
            ]}
          />
        </div>

        {/* 6. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
          next={{ title: "Pagination Component", href: "/docs/components/pagination" }}
        />
      </div>
    </>
  );
}
