// src/routes/docs/hooks/create-storage.tsx
import { createLocalStorage } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const importCode = `import { createLocalStorage, createSessionStorage } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [name, setName, removeName] = createLocalStorage("user-name", "Nikala Guest");

return (
  <div class="space-y-3">
    <Input
      value={name()}
      onInput={(e) => setName(e.currentTarget.value)}
      placeholder="Type your name..."
    />
    <p>Stored Name: {name()}</p>
    <Button variant="outline" onClick={removeName}>
      Reset to Default
    </Button>
  </div>
);`;

export function StorageDemo() {
  const [name, setName, removeName] = createLocalStorage("nikala-demo-user", "Niko Pirosmani");

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div class="w-full space-y-3 p-4 rounded-lg border border-border bg-card text-left shadow-xs">
        <label class="text-xs font-medium text-foreground">Reactive LocalStorage Value:</label>
        <Input
          value={name()}
          onInput={(e) => setName(e.currentTarget.value)}
          placeholder="Type name to persist..."
          class="h-8 text-xs"
        />
        <div class="text-xs font-mono text-muted-foreground pt-1">
          Stored Value: <span class="font-bold text-emerald-500">{name()}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={removeName} class="h-7 text-xs">
          Reset Storage
        </Button>
      </div>
    </div>
  );
}

export default function CreateStorageDocPage() {
  return (
    <>
      <Seo
        title="createLocalStorage & createSessionStorage Primitives"
        description="SolidJS reactive primitives for Web Storage state synchronization across components and browser tabs."
        path="/docs/hooks/create-storage"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createLocalStorage"
          badge="primitive"
          description="Reactive primitives for synchronizing Web Storage (localStorage / sessionStorage) across SolidJS components and active browser tabs."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-storage" code={basicUsageCode}>
          <StorageDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Synchronize LocalStorage</h3>
            <p class="text-sm text-muted-foreground">
              Pass a storage key and fallback initial value to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createLocalStorage(key, fallback)</code> to receive a reactive tuple <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">[value, setValue, remove]</code>.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateStorage Return Tuple & Parameters"
            items={[
              {
                prop: "key",
                type: "string",
                default: "-",
                description: "Web storage item key name.",
                required: true,
              },
              {
                prop: "initialValue",
                type: "T | Accessor<T>",
                default: "-",
                description: "Default initial value if storage key is not set.",
                required: true,
              },
              {
                prop: "value",
                type: "Accessor<T>",
                default: "-",
                description: "Signal accessor returning current reactive storage value.",
                required: true,
              },
              {
                prop: "setValue",
                type: "(val: T | ((prev: T) => T)) => void",
                default: "-",
                description: "Function to update storage value and notify all active tabs.",
              },
              {
                prop: "remove",
                type: "() => void",
                default: "-",
                description: "Function to remove storage key and reset to initial fallback value.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createHover Primitive", href: "/docs/hooks/create-hover" }}
          next={{ title: "createPrevious Primitive", href: "/docs/hooks/create-previous" }}
        />
      </div>
    </>
  );
}
