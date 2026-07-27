// src/routes/docs/components/card.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, ArrowUpRight } from "lucide-solid";
import {Button} from "@/components/ui/button";

/* --- Code Snippets --- */
const importCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`;

const defaultCode = `<Card class="w-87.5">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="space-y-2">
      <Label for="name">Name</Label>
      <Input id="name" placeholder="Name of your project" />
    </div>
  </CardContent>
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`;

const notificationCardCode = `<Card class="w-87.5">
  <CardHeader class="flex flex-row items-center justify-between pb-2">
    <div class="space-y-1">
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Manage push alert preferences.</CardDescription>
    </div>
    <Bell class="w-5 h-5 text-muted-foreground" />
  </CardHeader>
  <CardContent class="space-y-4 pt-2">
    <div class="flex items-center justify-between">
      <Label for="alerts" class="text-xs">Email Alerts</Label>
      <Switch id="alerts" defaultChecked />
    </div>
    <div class="flex items-center justify-between">
      <Label for="security" class="text-xs">Security Warnings</Label>
      <Switch id="security" defaultChecked />
    </div>
  </CardContent>
</Card>`;

const profileCardCode = `<Card class="w-87.5">
  <CardHeader class="flex flex-row items-center gap-4">
    <Avatar class="h-12 w-12">
      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Niko Pirosmani" />
      <AvatarFallback>NP</AvatarFallback>
    </Avatar>
    <div>
      <CardTitle class="text-base">Niko Pirosmani</CardTitle>
      <CardDescription class="text-xs">Artist & Painter</CardDescription>
    </div>
    <Badge variant="outline" class="ml-auto text-[10px]">Verified</Badge>
  </CardHeader>
  <CardContent>
    <p class="text-xs text-muted-foreground leading-relaxed">
      Famous Georgian primitive painter known for bold brush strokes and authentic folk aesthetics.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" class="w-full gap-1 text-xs">
      View Profile
      <ArrowUpRight class="w-3.5 h-3.5" />
    </Button>
  </CardFooter>
</Card>`;

const statsCardCode = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
  <Card>
    <CardHeader class="pb-2">
      <CardDescription class="text-xs uppercase font-mono tracking-wider">Total Revenue</CardDescription>
      <CardTitle class="text-2xl font-bold">$45,231.89</CardTitle>
    </CardHeader>
    <CardContent>
      <span class="text-xs text-emerald-600 font-medium">+20.1% from last month</span>
    </CardContent>
  </Card>

  <Card>
    <CardHeader class="pb-2">
      <CardDescription class="text-xs uppercase font-mono tracking-wider">Active Users</CardDescription>
      <CardTitle class="text-2xl font-bold">+2,350</CardTitle>
    </CardHeader>
    <CardContent>
      <span class="text-xs text-emerald-600 font-medium">+180.1% new signups</span>
    </CardContent>
  </Card>
</div>`;

export default function CardDocsPage() {
    return (
        <>
            <Seo
                title="Card Component"
                description="Displays a card with header, title, description, content, and footer sections."
                path="/docs/components/card"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Card"
                    badge="Compound"
                    description="Displays a structured container with header, title, description, main body content, and action footer."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="card" code={defaultCode}>
                    <Card class="w-87.5">
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>Deploy your new project in one click.</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label for="hero-name">Name</Label>
                                <Input id="hero-name" placeholder="Name of your project" />
                            </div>
                        </CardContent>
                        <CardFooter class="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
                </ComponentPreview>

                {/* Usage & Import */}
                <div class="space-y-4">
                    <DocSectionHeader title="Usage" />
                    <CodeBlock code={importCode} lang="tsx" />
                </div>

                {/* Examples */}
                <div class="space-y-8 pt-4">
                    <DocSectionHeader title="Examples" />

                    {/* Notification Settings Card */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Notification Settings Card</h3>
                        <p class="text-sm text-muted-foreground">
                            Combine <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Card</code> with switches and icons for preferences panels.
                        </p>
                        <ComponentPreview name="card" code={notificationCardCode}>
                            <Card class="w-87.5">
                                <CardHeader class="flex flex-row items-center justify-between pb-2">
                                    <div class="space-y-1">
                                        <CardTitle>Notifications</CardTitle>
                                        <CardDescription>Manage push alert preferences.</CardDescription>
                                    </div>
                                    <Bell class="w-5 h-5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent class="space-y-4 pt-2">
                                    <div class="flex items-center justify-between">
                                        <Label for="alerts" class="text-xs cursor-pointer">Email Alerts</Label>
                                        <Switch id="alerts" defaultChecked />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <Label for="security" class="text-xs cursor-pointer">Security Warnings</Label>
                                        <Switch id="security" defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </ComponentPreview>
                    </div>

                    {/* Profile Card */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">User Profile Card</h3>
                        <p class="text-sm text-muted-foreground">
                            Combine with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Avatar</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Badge</code> components.
                        </p>
                        <ComponentPreview name="card" code={profileCardCode}>
                            <Card class="w-87.5">
                                <CardHeader class="flex flex-row items-center gap-4">
                                    <Avatar class="h-12 w-12">
                                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Niko Pirosmani" />
                                        <AvatarFallback>NP</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle class="text-base">Niko Pirosmani</CardTitle>
                                        <CardDescription class="text-xs">Artist & Painter</CardDescription>
                                    </div>
                                    <Badge variant="outline" class="ml-auto text-[10px]">Verified</Badge>
                                </CardHeader>
                                <CardContent>
                                    <p class="text-xs text-muted-foreground leading-relaxed">
                                        Famous Georgian primitive painter known for bold brush strokes and authentic folk aesthetics.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" size="sm" class="w-full gap-1 text-xs">
                                        View Profile
                                        <ArrowUpRight class="w-3.5 h-3.5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </ComponentPreview>
                    </div>

                    {/* Metric Dashboard Cards */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Metrics & Dashboard Cards</h3>
                        <p class="text-sm text-muted-foreground">
                            Minimal cards for displaying analytics and dashboard KPI numbers.
                        </p>
                        <ComponentPreview name="card" code={statsCardCode}>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                                <Card>
                                    <CardHeader class="pb-2">
                                        <CardDescription class="text-xs uppercase font-mono tracking-wider">Total Revenue</CardDescription>
                                        <CardTitle class="text-2xl font-bold">$45,231.89</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <span class="text-xs text-emerald-600 font-medium">+20.1% from last month</span>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader class="pb-2">
                                        <CardDescription class="text-xs uppercase font-mono tracking-wider">Active Users</CardDescription>
                                        <CardTitle class="text-2xl font-bold">+2,350</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <span class="text-xs text-emerald-600 font-medium">+180.1% new signups</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="Card"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                description: "Card sub-components (CardHeader, CardContent, CardFooter).",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="CardHeader"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                description: "Header wrapper housing CardTitle and CardDescription.",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="CardTitle"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                description: "Main heading element (rendered as h3).",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="CardDescription"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                description: "Subheading text label (rendered as paragraph).",
                            },
                        ]}
                    />
                </div>

                {/* Footer Navigation */}
                <DocNextSteps
                    prev={{ title: "Breadcrumb Component", href: "/docs/components/breadcrumb" }}
                    next={{ title: "Checkbox Component", href: "/docs/components/checkbox" }}
                />
            </div>
        </>
    );
}