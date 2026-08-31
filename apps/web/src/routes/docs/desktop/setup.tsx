import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal, Shield, Sparkles, AppWindow } from "lucide-solid";

export default function DesktopSetupDocsPage() {
  return (
    <>
      <Seo
        title="Tauri v2 Setup Guide — Nikala UI Desktop"
        description="Learn how to configure Tauri v2 permissions, capabilities, window frameless decorations, and SolidJS with Nikala UI."
        path="/docs/desktop/setup"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <h1 class="text-3xl font-bold tracking-tight">Tauri v2 Setup</h1>
            <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
            <Badge variant="secondary" class="text-xs">Guide</Badge>
          </div>
          <p class="text-base text-muted-foreground">
            Complete guide for setting up Tauri v2 with SolidJS, configuring capabilities, security permissions, and frameless window styling for Nikala UI.
          </p>
        </div>

        {/* 1. Project Initialization */}
        <div class="space-y-4">
          <DocSectionHeader
            title="1. Initialize Tauri v2 Project"
            description="Create a new cross-platform app with SolidJS and TypeScript"
          />

          <CodeBlock
            code="bun create tauri-app@latest my-app --template solid-ts"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* 2. Tauri Configuration */}
        <div class="space-y-4">
          <DocSectionHeader
            title="2. Configure Window Decorations & Titlebar"
            description="Update src-tauri/tauri.conf.json to enable custom titlebars"
          />

          <p class="text-sm text-muted-foreground">
            To allow Nikala UI's <code>&lt;Titlebar /&gt;</code> to control the window, set <code>decorations: false</code> and enable transparency or custom sizes:
          </p>

          <CodeBlock
            code={`{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "my-app",
  "version": "0.1.0",
  "identifier": "com.mycompany.myapp",
  "build": {
    "beforeDevCommand": "bun run dev",
    "devUrl": "http://localhost:3000",
    "beforeBuildCommand": "bun run build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "My App",
        "width": 1100,
        "height": 750,
        "decorations": false,
        "shadow": true,
        "transparent": true
      }
    ],
    "security": {
      "csp": null
    }
  }
}`}
            lang="json"
          />
        </div>

        {/* 3. Capabilities & Permissions */}
        <div class="space-y-4">
          <DocSectionHeader
            title="3. Capabilities & Permissions"
            description="Grant frontend permissions to control windows and listen to events"
          />

          <p class="text-sm text-muted-foreground">
            In Tauri v2, permissions are declared in <code>src-tauri/capabilities/default.json</code>. Ensure the default capability includes core window controls:
          </p>

          <CodeBlock
            code={`{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Default permissions for Nikala Desktop Suite",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "core:window:allow-minimize",
    "core:window:allow-maximize",
    "core:window:allow-unmaximize",
    "core:window:allow-toggle-maximize",
    "core:window:allow-close",
    "core:window:allow-start-dragging",
    "core:window:allow-set-fullscreen"
  ]
}`}
            lang="json"
          />
        </div>

        {/* 4. Installing Nikala Desktop Suite */}
        <div class="space-y-4">
          <DocSectionHeader
            title="4. Add Nikala Desktop Suite"
            description="Install the Titlebar component and reactive primitives"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add titlebar -h create-tauri-window"
            lang="bash"
            isCli={true}
          />
        </div>

        <DocNextSteps
          prev={{
            title: "Desktop Overview",
            href: "/docs/desktop",
          }}
          next={{
            title: "Titlebar Component",
            href: "/docs/desktop/titlebar",
          }}
        />
      </div>
    </>
  );
}
