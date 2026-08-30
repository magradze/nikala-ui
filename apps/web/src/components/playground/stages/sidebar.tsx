import {
  Sidebar,
  SidebarProvider,
  useSidebar,
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
  SidebarInset,
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
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Settings,
  Users,
  Command,
  CreditCard,
  ChevronRight,
  Database,
  Key,
  ChevronsUpDown,
  Check,
  Plus,
  Building2,
  Sparkles,
  BadgeCheck,
  Bell,
  LogOut,
} from "lucide-solid";
import { createSignal, For, Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "sidebar",
  name: "Sidebar",
  props: [
    {
      name: "variant",
      label: "Variant Style",
      type: "select",
      options: ["sidebar", "floating", "inset"],
      default: "sidebar",
    },
    {
      name: "side",
      label: "Sidebar Side",
      type: "select",
      options: ["left", "right"],
      default: "left",
    },
    {
      name: "collapsible",
      label: "Collapsible Mode",
      type: "select",
      options: ["icon", "offcanvas", "none"],
      default: "icon",
    },
    {
      name: "showOrgSwitcher",
      label: "Organization Switcher",
      type: "boolean",
      default: true,
    },
    {
      name: "showCollapsibleMenu",
      label: "Collapsible Submenu",
      type: "boolean",
      default: true,
    },
    {
      name: "showUserDropdown",
      label: "User Profile Dropdown",
      type: "boolean",
      default: true,
    },
    {
      name: "showBadges",
      label: "Notification Badges",
      type: "boolean",
      default: true,
    },
  ],
  generateCode: (v) => `<SidebarProvider side="${v.side || "left"}">
  <Sidebar${v.variant !== "sidebar" ? ` variant="${v.variant}"` : ""}${v.collapsible !== "icon" ? ` collapsible="${v.collapsible}"` : ' collapsible="icon"'}${v.side !== "left" ? ` side="${v.side}"` : ""}>
    {/* 1. Header */}${
      v.showOrgSwitcher
        ? `\n    <SidebarHeader>
      <DropdownMenu placement="${v.side === "right" ? "bottom-end" : "bottom-start"}">
        <DropdownMenuTrigger class="w-full text-left">
          <SidebarMenuButton size="lg" class="w-full justify-between" tooltip="Nikala Studio">
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
          <DropdownMenuLabel class="text-[11px] font-semibold uppercase text-muted-foreground">Workspaces</DropdownMenuLabel>
          <DropdownMenuItem class="flex items-center gap-2.5 p-2 cursor-pointer">
            <Command class="size-3.5" />
            <span class="text-xs font-semibold">Nikala Studio</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>`
        : `\n    <SidebarHeader>
      <div class="flex items-center gap-2.5 px-1 py-0.5">
        <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
          <Command class="size-4" />
        </div>
        <div class="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
          <span class="font-bold text-xs">Nikala Studio</span>
          <span class="text-[10px] text-muted-foreground">Pro Workspace</span>
        </div>
      </div>
    </SidebarHeader>`
    }

    {/* 2. Content */}
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <LayoutDashboard class="size-4 shrink-0" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inbox">
                <Inbox class="size-4 shrink-0" />
                <span>Inbox</span>${v.showBadges ? `\n                <SidebarMenuBadge>12</SidebarMenuBadge>` : ""}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Projects">
                <FolderKanban class="size-4 shrink-0" />
                <span>Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator />
${
  v.showCollapsibleMenu
    ? `      <SidebarGroup>
        <SidebarGroupLabel>Preferences</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible defaultOpen class="group/collapsible w-full">
                <CollapsibleTrigger as="div" class="w-full text-left">
                  <SidebarMenuButton class="w-full justify-between" tooltip="Configuration">
                    <Settings class="size-4 shrink-0" />
                    <span class="truncate flex-1 group-data-[collapsible=icon]:hidden">Configuration</span>
                    <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden shrink-0 ml-auto" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent class="group-data-[collapsible=icon]:hidden">
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive>General Settings</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Billing & Plans</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>`
    : `      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Preferences">
                <Settings class="size-4 shrink-0" />
                <span>Preferences</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Billing">
                <CreditCard class="size-4 shrink-0" />
                <span>Billing & Plans</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>`
}
    </SidebarContent>

    {/* 3. Footer */}${
      v.showUserDropdown
        ? `\n    <SidebarFooter>
      <DropdownMenu placement="${v.side === "right" ? "top-end" : "top-start"}">
        <DropdownMenuTrigger class="w-full text-left">
          <SidebarMenuButton size="lg" class="w-full justify-between" tooltip="Giorgi M.">
            <div class="flex items-center gap-2.5 overflow-hidden">
              <Avatar class="size-7 shrink-0">
                <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
              </Avatar>
              <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                <span class="text-xs font-semibold truncate">Giorgi M.</span>
                <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
              </div>
            </div>
            <ChevronsUpDown class="ml-auto size-4 text-muted-foreground shrink-0 group-data-[collapsible=icon]:hidden" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer">
            <Sparkles class="size-3.5 text-primary" />
            <span class="text-xs">Upgrade to Pro</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer text-destructive">
            <LogOut class="size-3.5" />
            <span class="text-xs">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>`
        : `\n    <SidebarFooter>
      <div class="flex items-center gap-2.5 p-1">
        <Avatar class="size-7 shrink-0">
          <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
        </Avatar>
        <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
          <span class="text-xs font-semibold truncate">Giorgi M.</span>
          <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
        </div>
      </div>
    </SidebarFooter>`
    }
  </Sidebar>
</SidebarProvider>`,
};

export default function SidebarStage(props: StageProps) {
  const [activeItem, setActiveItem] = createSignal("dashboard");

  const teams = [
    { name: "Nikala Studio", plan: "Pro Workspace", icon: Command },
    { name: "Acme Enterprise", plan: "Scale Tier", icon: Building2 },
    { name: "Personal Lab", plan: "Free Tier", icon: Sparkles },
  ];

  const [activeTeam, setActiveTeam] = createSignal(teams[0]);

  const side = () => props.values.side || "left";
  const variant = () => props.values.variant || "sidebar";
  const collapsible = () => props.values.collapsible || "icon";

  const renderSidebar = () => (
    <Sidebar
      variant={variant()}
      collapsible={collapsible()}
      side={side()}
      class="h-full"
    >
      {/* 1. Header */}
      <SidebarHeader>
        <Show
          when={props.values.showOrgSwitcher}
          fallback={
            <div class="flex items-center gap-2.5 px-1 py-0.5">
              <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                <Command class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                <span class="font-bold text-xs truncate">Nikala Studio</span>
                <span class="text-[10px] text-muted-foreground truncate">Pro Workspace</span>
              </div>
            </div>
          }
        >
          <DropdownMenu placement={side() === "right" ? "bottom-end" : "bottom-start"}>
            <DropdownMenuTrigger as="div" class="w-full text-left cursor-pointer">
              <SidebarMenuButton size="lg" class="w-full justify-between" tooltip={activeTeam().name}>
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
        </Show>
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
                  <LayoutDashboard class="size-4 shrink-0" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeItem() === "inbox"}
                  onClick={() => setActiveItem("inbox")}
                  tooltip="Inbox"
                >
                  <Inbox class="size-4 shrink-0" />
                  <span>Inbox</span>
                  <Show when={props.values.showBadges}>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </Show>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeItem() === "projects"}
                  onClick={() => setActiveItem("projects")}
                  tooltip="Projects"
                >
                  <FolderKanban class="size-4 shrink-0" />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeItem() === "users"}
                  onClick={() => setActiveItem("users")}
                  tooltip="Team"
                >
                  <Users class="size-4 shrink-0" />
                  <span>Team Members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <Show
          when={props.values.showCollapsibleMenu}
          fallback={
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
                      <Settings class="size-4 shrink-0" />
                      <span>Preferences</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem() === "billing"}
                      onClick={() => setActiveItem("billing")}
                      tooltip="Billing"
                    >
                      <CreditCard class="size-4 shrink-0" />
                      <span>Billing & Plans</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          }
        >
          <SidebarGroup>
            <SidebarGroupLabel>Preferences</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Show
                    when={useSidebar().state() === "collapsed"}
                    fallback={
                      <Collapsible defaultOpen class="group/collapsible w-full">
                        <CollapsibleTrigger as="div" class="w-full">
                          <SidebarMenuButton class="w-full justify-between">
                            <div class="flex items-center gap-2.5 overflow-hidden">
                              <Settings class="size-4 shrink-0" />
                              <span>Configuration</span>
                            </div>
                            <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90 shrink-0" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={activeItem() === "general"}
                                onClick={() => setActiveItem("general")}
                              >
                                General Settings
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={activeItem() === "billing"}
                                onClick={() => setActiveItem("billing")}
                              >
                                Billing & Invoices
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={activeItem() === "keys"}
                                onClick={() => setActiveItem("keys")}
                              >
                                API Credentials
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    }
                  >
                    <DropdownMenu placement={side() === "right" ? "left-start" : "right-start"}>
                      <DropdownMenuTrigger class="w-full text-left">
                        <SidebarMenuButton tooltip="Configuration">
                          <Settings class="size-4 shrink-0" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent class="w-52">
                        <DropdownMenuLabel>Configuration</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setActiveItem("general")}
                          class="cursor-pointer"
                        >
                          General Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setActiveItem("billing")}
                          class="cursor-pointer"
                        >
                          Billing & Invoices
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setActiveItem("keys")}
                          class="cursor-pointer"
                        >
                          API Credentials
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Show>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem() === "database"}
                    onClick={() => setActiveItem("database")}
                    tooltip="Database"
                  >
                    <Database class="size-4 shrink-0" />
                    <span>Database Storage</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem() === "tokens"}
                    onClick={() => setActiveItem("tokens")}
                    tooltip="Security"
                  >
                    <Key class="size-4 shrink-0" />
                    <span>Access Tokens</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </Show>
      </SidebarContent>

      {/* 3. Footer */}
      <SidebarFooter>
        <Show
          when={props.values.showUserDropdown}
          fallback={
            <div class="flex items-center gap-2.5 p-1">
              <Avatar class="size-7 shrink-0">
                <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
              </Avatar>
              <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                <span class="text-xs font-semibold truncate">Giorgi M.</span>
                <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
              </div>
            </div>
          }
        >
          <DropdownMenu placement={side() === "right" ? "top-end" : "top-start"}>
            <DropdownMenuTrigger as="div" class="w-full text-left cursor-pointer">
              <SidebarMenuButton size="lg" class="w-full justify-between" tooltip="Giorgi Magradze">
                <div class="flex items-center gap-2.5 overflow-hidden">
                  <Avatar class="size-7 shrink-0">
                    <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col leading-none overflow-hidden group-data-[collapsible=icon]:hidden">
                    <span class="text-xs font-semibold truncate">Giorgi M.</span>
                    <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
                  </div>
                </div>
                <ChevronsUpDown class="ml-auto size-4 text-muted-foreground shrink-0 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-56">
              <div class="flex items-center gap-2.5 p-2 border-b border-border/50">
                <Avatar class="size-8 shrink-0">
                  <AvatarFallback class="text-xs bg-primary/20 text-primary font-bold">GM</AvatarFallback>
                </Avatar>
                <div class="flex flex-col leading-tight overflow-hidden">
                  <span class="text-xs font-semibold truncate">Giorgi Magradze</span>
                  <span class="text-[10px] text-muted-foreground truncate">giorgi@nikala.dev</span>
                </div>
              </div>
              <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer">
                <Sparkles class="size-3.5 text-primary" />
                <span class="text-xs">Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer">
                <BadgeCheck class="size-3.5" />
                <span class="text-xs">Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer">
                <CreditCard class="size-3.5" />
                <span class="text-xs">Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer">
                <Bell class="size-3.5" />
                <span class="text-xs">Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="flex items-center gap-2 p-2 cursor-pointer text-destructive focus:text-destructive">
                <LogOut class="size-3.5" />
                <span class="text-xs">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Show>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarProvider side={side()} class="w-full justify-center">
      <div class="w-full max-w-2xl h-[520px] rounded-lg border border-border bg-card/40 overflow-hidden flex flex-col shadow-sm">
        {/* Top bar */}
        <header class="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border px-4 bg-background/80 backdrop-blur-xs">
          <div class="flex items-center gap-2">
            <Show
              when={collapsible() !== "none"}
              fallback={
                <Badge variant="secondary" class="text-[10px] font-mono">
                  Fixed Width
                </Badge>
              }
            >
              <SidebarTrigger />
              <span class="text-xs text-muted-foreground font-mono">Toggle Collapse</span>
            </Show>
          </div>
          <div class="flex items-center gap-2">
            <Badge variant="outline" class="text-[10px] capitalize font-mono">
              {variant()} • side: {side()}
            </Badge>
          </div>
        </header>

        {/* Viewport Frame */}
        <div class="flex flex-1 min-h-0 relative overflow-hidden bg-background">
          {/* Side: Left -> Sidebar on left */}
          <Show when={side() === "left"}>
            {renderSidebar()}
          </Show>

          {/* Inset Main Content Area */}
          <SidebarInset class="flex-1 p-6 overflow-y-auto bg-muted/10">
            <div class="space-y-4">
              <div class="space-y-1">
                <h4 class="text-sm font-bold tracking-tight">Main Content Viewport</h4>
                <p class="text-xs text-muted-foreground">
                  The sidebar is positioned on the <span class="font-semibold text-foreground font-mono">{side()}</span> with <span class="font-semibold text-foreground font-mono">{variant()}</span> styling.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div class="p-3.5 rounded-lg border border-border bg-card shadow-2xs space-y-1">
                  <span class="text-[11px] text-muted-foreground">Active Workspace</span>
                  <p class="text-sm font-bold">{activeTeam().name}</p>
                </div>
                <div class="p-3.5 rounded-lg border border-border bg-card shadow-2xs space-y-1">
                  <span class="text-[11px] text-muted-foreground">Active Route</span>
                  <p class="text-sm font-bold capitalize">{activeItem()}</p>
                </div>
              </div>
            </div>
          </SidebarInset>

          {/* Side: Right -> Sidebar on right */}
          <Show when={side() === "right"}>
            {renderSidebar()}
          </Show>
        </div>
      </div>
    </SidebarProvider>
  );
}
