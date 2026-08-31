import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { AppWindow, Monitor, Sparkles, Terminal, ShieldCheck, Zap, ArrowRight } from "lucide-solid";
import { A } from "@solidjs/router";

export default function DesktopDocsPage() {
  return (
    <>
      <Seo
        title="Desktop Suite (Tauri v2) — Nikala UI"
        description="Craft ultra-fast, cross-platform desktop applications with SolidJS fine-grained reactivity and native Tauri v2 capabilities."
        path="/docs/desktop"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">Desktop Suite</h1>
            <Badge variant="outline" class="border-primary/40 text-primary">Tauri v2</Badge>
            <Badge variant="secondary">SolidJS Native</Badge>
          </div>
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Nikala UI offers first-class desktop components and OS-level reactive primitives crafted specifically for <strong>Tauri v2</strong> and <strong>SolidJS</strong>.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card class="bg-card/50 border-border/60">
            <CardHeader class="p-4 space-y-1.5">
              <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1">
                <AppWindow class="size-4" />
              </div>
              <CardTitle class="text-base font-semibold">Custom Window Chrome</CardTitle>
              <CardDescription class="text-xs">
                Native-feeling titlebars with macOS traffic lights, Windows 11 Fluent controls, and frameless window support.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card class="bg-card/50 border-border/60">
            <CardHeader class="p-4 space-y-1.5">
              <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1">
                <Zap class="size-4" />
              </div>
              <CardTitle class="text-base font-semibold">Zero-Virtual-DOM Speed</CardTitle>
              <CardDescription class="text-xs">
                Sub-millisecond window events and fine-grained signal tracking without electron-style memory overhead.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card class="bg-card/50 border-border/60">
            <CardHeader class="p-4 space-y-1.5">
              <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1">
                <ShieldCheck class="size-4" />
              </div>
              <CardTitle class="text-base font-semibold">Tauri v2 Permissions</CardTitle>
              <CardDescription class="text-xs">
                Pre-configured capability templates for window dragging, global hotkeys, auto-updates, and native dialogs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quickstart Setup */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Quickstart Guide"
            description="Initialize a new Tauri v2 + SolidJS application with Nikala UI in seconds"
          />

          <p class="text-sm text-muted-foreground">
            1. Scaffold a fresh SolidJS project with Tauri v2 CLI:
          </p>

          <CodeBlock
            code="bun create tauri-app@latest my-desktop-app --template solid-ts"
            lang="bash"
            isCli={true}
          />

          <p class="text-sm text-muted-foreground mt-4">
            2. Initialize Nikala UI and configure Tailwind CSS v4:
          </p>

          <CodeBlock
            code="bunx @nikala-ui/cli init"
            lang="bash"
            isCli={true}
          />

          <p class="text-sm text-muted-foreground mt-4">
            3. Add desktop titlebars and reactive OS primitives:
          </p>

          <CodeBlock
            code="bunx @nikala-ui/cli add titlebar -h create-tauri-window"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Explore Links */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Explore Desktop Suite"
            description="Browse components and reactive primitives"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <A
              href="/docs/desktop/titlebar"
              class="group flex items-center justify-between p-4 rounded-lg border border-border/60 bg-card/40 hover:bg-accent/40 hover:border-primary/40 transition-all"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <AppWindow class="size-4" />
                  <span>Titlebar Component</span>
                </div>
                <p class="text-xs text-muted-foreground">
                  Frameless window headers for macOS, Windows 11, and Linux.
                </p>
              </div>
              <ArrowRight class="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </A>

            <A
              href="/docs/desktop/create-tauri-window"
              class="group flex items-center justify-between p-4 rounded-lg border border-border/60 bg-card/40 hover:bg-accent/40 hover:border-primary/40 transition-all"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Monitor class="size-4" />
                  <span>createTauriWindow</span>
                </div>
                <p class="text-xs text-muted-foreground">
                  Reactive signals for window maximize, minimize, drag, and fullscreen.
                </p>
              </div>
              <ArrowRight class="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </A>
          </div>
        </div>
      </div>
    </>
  );
}
