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
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Settings,
  Users,
  ChevronRight,
  Sparkles,
  Command,
} from "lucide-solid";
import { createSignal } from "solid-js";

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
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";`;

const defaultCode = `<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <div class="flex items-center gap-2 px-1 py-0.5">
        <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Command class="size-4" />
        </div>
        <div class="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
          <span class="font-bold text-xs">Acme Inc</span>
          <span class="text-[10px] text-muted-foreground">Enterprise Plan</span>
        </div>
      </div>
    </SidebarHeader>

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
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div class="flex items-center gap-2 p-1">
        <Avatar class="size-7">
          <AvatarFallback class="text-xs bg-primary/20 text-primary">GM</AvatarFallback>
        </Avatar>
        <div class="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
          <span class="text-xs font-medium">Giorgi M.</span>
          <span class="text-[10px] text-muted-foreground">admin@acme.dev</span>
        </div>
      </div>
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <header class="flex h-12 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger />
      <span class="text-xs text-muted-foreground font-mono">Press ⌘B to toggle</span>
    </header>
    <div class="flex-1 p-6">
      <h2 class="text-lg font-bold">Dashboard Overview</h2>
    </div>
  </SidebarInset>
</SidebarProvider>`;

const nestedSubmenuCode = `<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton tooltip="Settings">
      <Settings class="size-4" />
      <span>Settings</span>
    </SidebarMenuButton>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton isActive>General</SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>Billing & Plans</SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>API Keys</SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>`;

export default function SidebarDocPage() {
  const [activeTab, setActiveTab] = createSignal("dashboard");

  return (
    <>
      <Seo
        title="Sidebar Component"
        description="A composable, collapsible, and accessible application sidebar navigation suite with icon mode, mobile drawer, and keyboard shortcuts for SolidJS."
        path="/docs/components/sidebar"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Sidebar"
          badge="Compound Suite"
          description="A composable, collapsible, and responsive application sidebar navigation suite with icon mode, mobile drawer overlays, and keyboard shortcuts."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="sidebar" code={defaultCode}>
          <div class="flex items-center justify-center p-2 sm:p-6 w-full">
            <div class="w-full h-[420px] rounded-lg border border-border bg-background overflow-hidden relative shadow-sm">
              <SidebarProvider class="h-full min-h-0">
                <Sidebar collapsible="icon" class="h-full">
                  {/* Header */}
                  <SidebarHeader>
                    <div class="flex items-center gap-2 px-1 py-0.5">
                      <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                        <Command class="size-4" />
                      </div>
                      <div class="flex flex-col gap-0.5 leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span class="font-bold text-xs truncate">Acme Inc</span>
                        <span class="text-[10px] text-muted-foreground truncate">Enterprise Plan</span>
                      </div>
                    </div>
                  </SidebarHeader>

                  {/* Content */}
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Platform</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeTab() === "dashboard"}
                              onClick={() => setActiveTab("dashboard")}
                              tooltip="Dashboard"
                            >
                              <LayoutDashboard class="size-4" />
                              <span>Dashboard</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeTab() === "inbox"}
                              onClick={() => setActiveTab("inbox")}
                              tooltip="Inbox"
                            >
                              <Inbox class="size-4" />
                              <span>Inbox</span>
                              <SidebarMenuBadge>12</SidebarMenuBadge>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeTab() === "projects"}
                              onClick={() => setActiveTab("projects")}
                              tooltip="Projects"
                            >
                              <FolderKanban class="size-4" />
                              <span>Projects</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeTab() === "users"}
                              onClick={() => setActiveTab("users")}
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
                      <SidebarGroupLabel>Preferences</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={activeTab() === "settings"}
                              onClick={() => setActiveTab("settings")}
                              tooltip="Settings"
                            >
                              <Settings class="size-4" />
                              <span>Settings</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>

                  {/* Footer */}
                  <SidebarFooter>
                    <div class="flex items-center gap-2 p-1">
                      <Avatar class="size-7 shrink-0">
                        <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
                      </Avatar>
                      <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span class="text-xs font-semibold truncate">Giorgi M.</span>
                        <span class="text-[10px] text-muted-foreground truncate">admin@acme.dev</span>
                      </div>
                    </div>
                  </SidebarFooter>
                </Sidebar>

                {/* Main Content Viewport */}
                <SidebarInset class="h-full overflow-y-auto">
                  <header class="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-4 bg-card/60 backdrop-blur-xs">
                    <div class="flex items-center gap-2">
                      <SidebarTrigger />
                      <div class="h-4 w-px bg-border" />
                      <span class="text-xs font-medium capitalize text-foreground">{activeTab()}</span>
                    </div>
                    <Badge variant="outline" class="text-[10px] font-mono">
                      ⌘B to Toggle
                    </Badge>
                  </header>

                  <div class="p-6 space-y-4">
                    <div class="space-y-1">
                      <h3 class="text-base font-bold tracking-tight">Active Viewport: {activeTab().toUpperCase()}</h3>
                      <p class="text-xs text-muted-foreground">
                        Click the trigger button in the header or press <kbd class="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">⌘B</kbd> to collapse to Icon Mode.
                      </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div class="p-4 rounded-lg border border-border bg-card space-y-1 shadow-2xs">
                        <span class="text-xs text-muted-foreground">Monthly Active Users</span>
                        <p class="text-xl font-bold">24,592</p>
                      </div>
                      <div class="p-4 rounded-lg border border-border bg-card space-y-1 shadow-2xs">
                        <span class="text-xs text-muted-foreground">API Requests / sec</span>
                        <p class="text-xl font-bold">1,840 req/s</p>
                      </div>
                    </div>
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </div>
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

          {/* Nested Submenu Tree */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Nested Submenu Tree</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">SidebarMenuSub</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">SidebarMenuSubButton</code> for deep hierarchical navigation.
            </p>
            <ComponentPreview name="sidebar" code={nestedSubmenuCode}>
              <div class="flex items-center justify-center p-6 w-full max-w-xs mx-auto">
                <div class="w-full p-3 rounded-lg border border-border bg-card shadow-2xs">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings class="size-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton isActive>General</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>Billing & Plans</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>API Keys</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </div>
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
                type: '"offcanvas" | "icon" | "none"',
                default: '"offcanvas"',
                description: 'How the sidebar collapses. "icon" collapses to a narrow icon bar, "offcanvas" hides completely.',
              },
              {
                prop: "variant",
                type: '"sidebar" | "floating" | "inset"',
                default: '"sidebar"',
                description: "Visual appearance style of the sidebar container.",
              },
              {
                prop: "side",
                type: '"left" | "right"',
                default: '"left"',
                description: "Which edge of the viewport the sidebar docks to.",
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
