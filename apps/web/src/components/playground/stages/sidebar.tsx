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
      name: "collapsible",
      label: "Collapsible Mode",
      type: "select",
      options: ["icon", "none"],
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
    {
      name: "side",
      label: "Sidebar Side",
      type: "select",
      options: ["left", "right"],
      default: "left",
    },
  ],
  generateCode: (v) => `<SidebarProvider>
  <Sidebar${v.variant !== "sidebar" ? ` variant="${v.variant}"` : ""}${v.collapsible !== "icon" ? ` collapsible="${v.collapsible}"` : ' collapsible="icon"'}${v.side !== "left" ? ` side="${v.side}"` : ""}>
    {/* 1. Header */}${
      v.showOrgSwitcher
        ? `\n    <SidebarHeader>
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
                <LayoutDashboard class="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inbox">
                <Inbox class="size-4" />
                <span>Inbox</span>${v.showBadges ? `\n                <SidebarMenuBadge>12</SidebarMenuBadge>` : ""}
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

      <SidebarSeparator />
${
  v.showCollapsibleMenu
    ? `      <SidebarGroup>
        <SidebarGroupLabel>Preferences</SidebarGroupLabel>
        <SidebarGroupContent>
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
      </SidebarGroup>`
}
    </SidebarContent>

    {/* 3. Footer */}${
      v.showUserDropdown
        ? `\n    <SidebarFooter>
      <DropdownMenu placement="top-start">
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

  return (
    <SidebarProvider class="w-full justify-center">
      <div class="flex flex-col items-start gap-3">
        <div class="flex items-center gap-2">
          <SidebarTrigger />
          <span class="text-xs text-muted-foreground font-mono">Toggle icon collapse</span>
        </div>

        <Sidebar
          variant={props.values.variant || "sidebar"}
          collapsible={props.values.collapsible || "icon"}
          side={props.values.side || "left"}
          class="h-[490px] border border-border rounded-lg bg-card shadow-sm"
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
              }
            >
              <SidebarGroup>
                <SidebarGroupLabel>Preferences</SidebarGroupLabel>
                <SidebarGroupContent>
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
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeItem() === "database"}
                        onClick={() => setActiveItem("database")}
                        tooltip="Database"
                      >
                        <Database class="size-4" />
                        <span>Database Storage</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeItem() === "tokens"}
                        onClick={() => setActiveItem("tokens")}
                        tooltip="Security"
                      >
                        <Key class="size-4" />
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
              <DropdownMenu placement="top-start">
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
      </div>
    </SidebarProvider>
  );
}
