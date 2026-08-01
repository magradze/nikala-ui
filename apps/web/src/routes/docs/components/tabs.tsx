// src/routes/docs/components/tabs.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";`;

const defaultCode = `<Tabs defaultValue="account" class="w-100">
  <TabsList class="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>

  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <Label for="name">Name</Label>
          <Input id="name" value="Niko Pirosmani" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </TabsContent>

  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <Label for="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div class="space-y-1">
          <Label for="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  </TabsContent>
</Tabs>`;

const verticalCode = `<Tabs orientation="vertical" defaultValue="general" class="w-112.5">
  <TabsList class="w-35">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="notifications">Alerts</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
  </TabsList>

  <div class="flex-1">
    <TabsContent value="general" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
      <h4 class="font-bold text-sm text-foreground">General Settings</h4>
      <p class="text-muted-foreground">Manage your workspace overview and profile defaults.</p>
    </TabsContent>

    <TabsContent value="notifications" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
      <h4 class="font-bold text-sm text-foreground">Notification Preferences</h4>
      <p class="text-muted-foreground">Configure push alerts and email summaries.</p>
    </TabsContent>

    <TabsContent value="advanced" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
      <h4 class="font-bold text-sm text-foreground">Advanced Options</h4>
      <p class="text-muted-foreground">API keys, tokens, and system exports.</p>
    </TabsContent>
  </div>
</Tabs>`;

export default function TabsDocsPage() {
  return (
    <>
      <Seo
        title="Tabs Component"
        description="Layered content switcher supporting horizontal and vertical layout orientations built for SolidJS."
        path="/docs/components/tabs"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Tabs"
          badge="Compound"
          description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="tabs" code={defaultCode}>
          <Tabs defaultValue="account" class="w-100">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                  <div class="space-y-1">
                    <Label for="hero-tabs-name">Name</Label>
                    <Input id="hero-tabs-name" value="Niko Pirosmani" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                  <div class="space-y-1">
                    <Label for="hero-tabs-curr">Current password</Label>
                    <Input id="hero-tabs-curr" type="password" />
                  </div>
                  <div class="space-y-1">
                    <Label for="hero-tabs-new">New password</Label>
                    <Input id="hero-tabs-new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Vertical Orientation */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Vertical Orientation</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for vertical sidebar tab navigation.
            </p>
            <ComponentPreview name="tabs" code={verticalCode}>
              <Tabs orientation="vertical" defaultValue="general" class="w-112.5">
                <TabsList class="w-35">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Alerts</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <div class="flex-1">
                  <TabsContent value="general" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
                    <h4 class="font-bold text-sm text-foreground">General Settings</h4>
                    <p class="text-muted-foreground">Manage your workspace overview and profile defaults.</p>
                  </TabsContent>

                  <TabsContent value="notifications" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
                    <h4 class="font-bold text-sm text-foreground">Notification Preferences</h4>
                    <p class="text-muted-foreground">Configure push alerts and email summaries.</p>
                  </TabsContent>

                  <TabsContent value="advanced" class="p-4 border border-border rounded-lg bg-card text-xs space-y-1">
                    <h4 class="font-bold text-sm text-foreground">Advanced Options</h4>
                    <p class="text-muted-foreground">API keys, tokens, and system exports.</p>
                  </TabsContent>
                </div>
              </Tabs>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Tabs"
            items={[
              {
                prop: "defaultValue",
                type: "string",
                default: "-",
                description: "Initial active tab value for uncontrolled state.",
              },
              {
                prop: "value",
                type: "string",
                default: "-",
                description: "Controlled active tab value string.",
              },
              {
                prop: "onChange",
                type: "(value: string) => void",
                default: "-",
                description: "Callback function triggered when active tab value changes.",
              },
              {
                prop: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Layout direction orientation of tab triggers and content panels.",
              },
            ]}
          />

          <DocApiTable
            title="TabsTrigger"
            items={[
              {
                prop: "value",
                type: "string",
                required: true,
                description: "Unique string value matching the corresponding TabsContent value.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces trigger button opacity.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Switch Component", href: "/docs/components/switch" }}
          next={{ title: "Textarea Component", href: "/docs/components/textarea" }}
        />
      </div>
    </>
  );
}