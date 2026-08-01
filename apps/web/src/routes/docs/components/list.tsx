// src/routes/docs/components/list.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { List, ListGroup, ListHeader, ListItem } from "@/components/ui/list";
import { BookOpen, Terminal, Palette, Settings, User, Shield, Bell } from "lucide-solid";

const listGroupCode = `<List class="max-w-md border border-border rounded-lg p-2 bg-card">
  <ListGroup>
    <ListHeader title="Account Settings" />
    <ListItem title="Profile" subtitle="Manage profile details" icon={User} />
    <ListItem title="Security" subtitle="Password and 2FA" icon={Shield} />
  </ListGroup>
  <ListGroup>
    <ListHeader title="Preferences" />
    <ListItem title="Notifications" subtitle="Email and push alerts" icon={Bell} />
  </ListGroup>
</List>`;

/* --- Code Snippets --- */
const importCode = `import { List, ListGroup, ListHeader, ListItem } from "@/components/ui/list";`;

const defaultCode = `<List class="max-w-md border border-border rounded-lg p-2 bg-card">
  <ListGroup>
    <ListHeader title="Navigation" />
    <ListItem
      title="Getting Started"
      subtitle="Architecture philosophy and installation guide"
      showChevron={true}
      href="/docs"
    />
    <ListItem
      title="CLI Reference"
      subtitle="Commands guide for initializing and managing components"
      showChevron={true}
      href="/docs/cli"
    />
  </ListGroup>
</List>`;

const iconsAndShortcutsCode = `<List class="max-w-md border border-border rounded-lg p-2 bg-card">
  <ListItem
    title="Documentation"
    subtitle="Read system overview"
    icon={BookOpen}
    shortcut="⌘1"
  />
  <ListItem
    title="CLI Reference"
    subtitle="Terminal commands"
    icon={Terminal}
    shortcut="⌘2"
  />
  <ListItem
    title="Theming"
    subtitle="Colors and palettes"
    icon={Palette}
    shortcut="⌘3"
  />
</List>`;

const avatarCode = `<List class="max-w-md border border-border rounded-lg p-2 bg-card">
  <ListItem
    title="Niko Pirosmani"
    subtitle="Georgian Painter & Artist"
    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  />
  <ListItem
    title="Magradze"
    subtitle="Nikala UI Creator"
    avatarFallback="M"
  />
</List>`;

const hoverVariantsCode = `<List class="max-w-md border border-border rounded-lg p-2 bg-card">
  <ListItem title="Default Hover Variant" hoverVariant="default" />
  <ListItem title="Primary Accent Hover" hoverVariant="primary" />
  <ListItem title="Subtle Accent Hover" hoverVariant="accent" />
  <ListItem title="Muted Background Hover" hoverVariant="muted" />
</List>`;

export default function ListDocsPage() {
  return (
    <>
      <Seo
        title="List Component"
        description="Compound list components supporting titles, subtitles, icons, avatars, hotkey badges, chevron indicators, and interactive links."
        path="/docs/components/list"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="List / List Item"
          badge="Compound"
          description="Flexible list items for navigation menus, search results, dropdowns, and group lists."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="list" code={defaultCode}>
          <List class="w-full max-w-md border border-border rounded-lg p-2 bg-card/60 shadow-xs">
            <ListGroup>
              <ListHeader title="Navigation" />
              <ListItem
                title="Getting Started"
                subtitle="Architecture philosophy and installation guide"
                showChevron={true}
                href="/docs"
              />
              <ListItem
                title="CLI Reference"
                subtitle="Commands guide for initializing and managing components"
                showChevron={true}
                href="/docs/cli"
              />
            </ListGroup>
          </List>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Icons & Shortcuts */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Icons & Hotkey Badges</h3>
            <p class="text-sm text-muted-foreground">
              Pass Lucide icons via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">icon</code> and shortcut text via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">shortcut</code>.
            </p>
            <ComponentPreview name="list" code={iconsAndShortcutsCode}>
              <List class="w-full max-w-md border border-border rounded-lg p-2 bg-card/60 shadow-xs">
                <ListItem
                  title="Documentation"
                  subtitle="Read system overview"
                  icon={BookOpen}
                  shortcut="⌘1"
                />
                <ListItem
                  title="CLI Reference"
                  subtitle="Terminal commands"
                  icon={Terminal}
                  shortcut="⌘2"
                />
                <ListItem
                  title="Theming"
                  subtitle="Colors and palettes"
                  icon={Palette}
                  shortcut="⌘3"
                />
              </List>
            </ComponentPreview>
          </div>

          {/* Avatars */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Avatars & Fallbacks</h3>
            <p class="text-sm text-muted-foreground">
              Supports avatar images via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">avatar</code> or text initials via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">avatarFallback</code>.
            </p>
            <ComponentPreview name="list" code={avatarCode}>
              <List class="w-full max-w-md border border-border rounded-lg p-2 bg-card/60 shadow-xs">
                <ListItem
                  title="Niko Pirosmani"
                  subtitle="Georgian Painter & Artist"
                  avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                />
                <ListItem
                  title="Magradze"
                  subtitle="Nikala UI Creator"
                  avatarFallback="M"
                />
              </List>
            </ComponentPreview>
          </div>

          {/* List Groups & Headers */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">List Groups & Headers</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ListGroup</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ListHeader</code> to organize items into labeled categories.
            </p>
            <ComponentPreview name="list" code={listGroupCode}>
              <List class="w-full max-w-md border border-border rounded-lg p-2 bg-card/60 shadow-xs">
                <ListGroup>
                  <ListHeader title="Account Settings" />
                  <ListItem title="Profile" subtitle="Manage profile details" icon={User} />
                  <ListItem title="Security" subtitle="Password and 2FA" icon={Shield} />
                </ListGroup>
                <ListGroup>
                  <ListHeader title="Preferences" />
                  <ListItem title="Notifications" subtitle="Email and push alerts" icon={Bell} />
                </ListGroup>
              </List>
            </ComponentPreview>
          </div>

          {/* Hover Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Hover Variants</h3>
            <p class="text-sm text-muted-foreground">
              Customize hover colors using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hoverVariant</code> ("default", "primary", "accent", "muted").
            </p>
            <ComponentPreview name="list" code={hoverVariantsCode}>
              <List class="w-full max-w-md border border-border rounded-lg p-2 bg-card/60 shadow-xs">
                <ListItem title="Default Hover Variant" hoverVariant="default" />
                <ListItem title="Primary Accent Hover" hoverVariant="primary" />
                <ListItem title="Subtle Accent Hover" hoverVariant="accent" />
                <ListItem title="Muted Background Hover" hoverVariant="muted" />
              </List>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ListItem"
            items={[
              {
                prop: "title",
                type: "string",
                description: "Main item title header text.",
              },
              {
                prop: "subtitle",
                type: "string",
                description: "Secondary muted description text below the title.",
              },
              {
                prop: "icon",
                type: "Component<{ class?: string }>",
                description: "Leading Lucide icon component.",
              },
              {
                prop: "avatar",
                type: "string",
                description: "Image URL for profile avatars or icons.",
              },
              {
                prop: "avatarFallback",
                type: "string",
                description: "Text initials to display when no avatar image exists.",
              },
              {
                prop: "shortcut",
                type: "string",
                description: "Trailing hotkey badge text (e.g. ⌘K).",
              },
              {
                prop: "showChevron",
                type: "boolean",
                default: "false",
                description: "Renders trailing right arrow chevron icon.",
              },
              {
                prop: "href",
                type: "string",
                description: "Converts list item to an interactive link anchor.",
              },
              {
                prop: "hoverVariant",
                type: '"default" | "accent" | "primary" | "muted"',
                default: '"default"',
                description: "Hover background color style.",
              },
              {
                prop: "size",
                type: '"sm" | "md" | "lg"',
                default: '"md"',
                description: "Padding and typography size scale.",
              },
              {
                prop: "active",
                type: "boolean",
                default: "false",
                description: "Highlights the item with active focus styles.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Label Component", href: "/docs/components/label" }}
          next={{ title: "Radio Group", href: "/docs/components/radio-group" }}
        />
      </div>
    </>
  );
}