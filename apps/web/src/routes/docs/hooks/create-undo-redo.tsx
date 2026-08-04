import { createUndoRedo } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";

const importCode = `import { createUndoRedo } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { state, set, undo, redo, canUndo, canRedo } = createUndoRedo("Initial Text");

return (
  <div class="space-y-4">
    <input
      value={state()}
      onInput={(e) => set(e.currentTarget.value)}
      class="border rounded p-2 w-full"
    />
    <div class="flex gap-2">
      <button onClick={undo} disabled={!canUndo()}>Undo</button>
      <button onClick={redo} disabled={!canRedo()}>Redo</button>
    </div>
  </div>
);`;

export function UndoRedoDemo() {
  const { state, set, undo, redo, canUndo, canRedo, reset } = createUndoRedo("Nikala UI Editor");

  return (
    <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-muted-foreground">Interactive State History</label>
        <Input
          value={state()}
          onInput={(e) => set(e.currentTarget.value)}
          placeholder="Type something to append history..."
        />
      </div>

      <div class="flex items-center justify-between gap-2 pt-2">
        <div class="flex items-center gap-2">
          <button
            onClick={() => undo()}
            disabled={!canUndo()}
            class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
          >
            Undo
          </button>
          <button
            onClick={() => redo()}
            disabled={!canRedo()}
            class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-40 transition-colors"
          >
            Redo
          </button>
        </div>

        <button
          onClick={() => reset()}
          class="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
        >
          Reset History
        </button>
      </div>
    </div>
  );
}

export default function CreateUndoRedoDocPage() {
  return (
    <>
      <Seo
        title="createUndoRedo Primitive"
        description="SolidJS reactive primitive for state history management, undoing and redoing actions in editors and forms."
        path="/docs/hooks/create-undo-redo"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createUndoRedo"
          badge="primitive"
          description="Reactive primitive for managing state undo/redo history stacks, ideal for rich text editors, playgrounds, and form inputs."
        />

        <ComponentPreview name="create-undo-redo" code={basicUsageCode}>
          <UndoRedoDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Undo / Redo Text State History</h3>
            <p class="text-sm text-muted-foreground">
              Pass an initial value to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createUndoRedo(initialValue)</code> to automatically track state changes.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateUndoRedoOptions"
            items={[
              {
                prop: "maxHistory",
                type: "number",
                default: "50",
                description: "Maximum number of history states to retain in stack.",
              },
            ]}
          />

          <DocApiTable
            title="CreateUndoRedoReturn"
            items={[
              {
                prop: "state",
                type: "Accessor<T>",
                default: "-",
                description: "Signal containing the current state value.",
              },
              {
                prop: "set",
                type: "(nextState: T | ((prev: T) => T)) => void",
                default: "-",
                description: "Updates state value and appends a new state to history.",
              },
              {
                prop: "undo",
                type: "() => void",
                default: "-",
                description: "Reverts to previous state history entry.",
              },
              {
                prop: "redo",
                type: "() => void",
                default: "-",
                description: "Advances to next state history entry.",
              },
              {
                prop: "canUndo",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether undo is available.",
              },
              {
                prop: "canRedo",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether redo is available.",
              },
              {
                prop: "reset",
                type: "(initialState?: T) => void",
                default: "-",
                description: "Resets history stack to initial state value.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createOrientation Primitive", href: "/docs/hooks/create-orientation" }}
          next={{ title: "createFetch Primitive", href: "/docs/hooks/create-fetch" }}
        />
      </div>
    </>
  );
}
