# Interactive Playground Stage Authoring Guide

This guide provides comprehensive, step-by-step instructions for adding a new interactive component stage module to the **Nikala UI** Playground (`/playground`).

The Playground uses **Vite Dynamic Module Auto-Discovery** (`import.meta.glob`). Adding a new component to the Playground requires creating a single self-contained file in the `stages/` directory with zero modifications to core routing or layout files.

---

## Directory Architecture

Playground stage modules are located inside `src/components/playground/stages/`.

```text
nikala-web/
├── src/
│   ├── types/
│   │   └── playground.ts            # PropSpec, ComponentSpec, StageProps interfaces
│   ├── config/
│   │   └── playground.ts            # Auto-discovers stages via import.meta.glob
│   ├── components/
│   │   └── playground/
│   │       ├── stages/
│   │       │   ├── <component>.tsx  # Individual component stage module
│   │       │   └── ...
│   │       ├── playground-sidebar.tsx
│   │       ├── playground-controls.tsx
│   │       └── playground-stage.tsx # Renders stage via import.meta.glob
│   └── routes/
│       └── playground.tsx           # Playground page orchestrator
```

---

## How Dynamic Auto-Discovery Works

1. **`src/config/playground.ts`** scans `src/components/playground/stages/*.tsx` for exported `config` objects to build the sidebar navigation list and dynamic prop controls.
2. **`src/components/playground/playground-stage.tsx`** scans `src/components/playground/stages/*.tsx` for default export components to render live previews dynamically.
3. Therefore, creating `src/components/playground/stages/<id>.tsx` automatically registers the component across the entire Playground system.

---

## Step-by-Step Instructions

### Step 1: Create the Stage Module File

Create a new file in `src/components/playground/stages/<component-id>.tsx`. The file name must use the kebab-case identifier of the component (e.g., `alert.tsx`, `radio-group.tsx`, `input-group.tsx`).

---

### Step 2: Define and Export the Component Configuration (`config`)

Export a `config` object conforming to the `ComponentSpec` interface. This defines the controls rendered in the Playground sidebar and provides the custom code generator.

#### Supported Control Types in `PropSpec`

- `"text"` — Renders a text input field.
- `"number"` — Renders a numeric input field.
- `"select"` — Renders a dropdown selection menu (requires `options` array).
- `"boolean"` — Renders a toggle switch.

```typescript
export const config: ComponentSpec = {
  id: "component-id",              // Must match the filename exactly
  name: "Component Display Name", // Shown in the sidebar list
  props: [
    {
      name: "title",
      label: "Title Label",
      type: "text",
      default: "Default Text",
    },
    {
      name: "variant",
      label: "Style Variant",
      type: "select",
      options: ["default", "outline", "secondary", "destructive"],
      default: "default",
    },
    {
      name: "disabled",
      label: "Disabled State",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    /* Return formatted TSX code string matching current prop values */
    const variantAttr = v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const disabledAttr = v.disabled ? " disabled" : "";

    return `<ComponentName${variantAttr}${disabledAttr}>${v.title || "Default Text"}</ComponentName>`;
  },
};
```

---

### Step 3: Implement and Export the Default Stage Component

Export a default SolidJS component receiving `props: StageProps`. The values of active controls are accessed reactively via `props.values.<propName>`.

```tsx
export default function ComponentStage(props: StageProps) {
  return (
    <ComponentName
      variant={props.values.variant}
      disabled={props.values.disabled}
    >
      {props.values.title}
    </ComponentName>
  );
}
```

---

## Complete Stage Module Example

Below is a complete, production-grade example for an `Alert` component stage module (`src/components/playground/stages/alert.tsx`):

```tsx
// src/components/playground/stages/alert.tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-solid";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "./types";

/* --- 1. Export Component Specification & Code Generator --- */
export const config: ComponentSpec = {
  id: "alert",
  name: "Alert",
  props: [
    { name: "title", label: "Title Text", type: "text", default: "Heads up!" },
    {
      name: "description",
      label: "Description Text",
      type: "text",
      default: "You can add components to your app using Nikala CLI.",
    },
    {
      name: "variant",
      label: "Status Variant",
      type: "select",
      options: ["default", "info", "success", "warning", "destructive"],
      default: "default",
    },
    { name: "closable", label: "Closable Button", type: "boolean", default: true },
    { name: "showIcon", label: "Show Icon", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const variantAttr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const closableAttr = v.closable ? ` closable={true}` : "";
    const iconCode = v.showIcon ? `<Info class="h-4 w-4" />\n  ` : "";

    return `<Alert${variantAttr}${closableAttr} class="max-w-md">
  ${iconCode}<AlertTitle>${v.title || "Heads up!"}</AlertTitle>
  <AlertDescription>
    ${v.description || ""}
  </AlertDescription>
</Alert>`;
  },
};

/* --- 2. Export Default Stage Preview Component --- */
export default function AlertStage(props: StageProps) {
  return (
    <Alert
      variant={props.values.variant}
      closable={props.values.closable}
      class="w-full max-w-md"
    >
      <Show when={props.values.showIcon}>
        <Info class="h-4 w-4" />
      </Show>
      <AlertTitle>{props.values.title}</AlertTitle>
      <AlertDescription>{props.values.description}</AlertDescription>
    </Alert>
  );
}
```

---

## Best Practices and Rules

1. **Controlled Reactive States:**
   When rendering interactive elements like `Checkbox` or `Switch` in stage previews, always use controlled state props (e.g., `checked={Boolean(props.values.checked)}`) rather than uncontrolled props (`defaultChecked`). This ensures that toggling switches in the controls sidebar updates the live preview instantly.

2. **Matching Identifiers:**
   The `id` field in the `config` object must strictly match the filename (without extension). For example, `src/components/playground/stages/radio-group.tsx` must have `id: "radio-group"`.

3. **No Emojis:**
   Do not include emojis in stage strings, code generators, or prop descriptions. Maintain clean, professional UI documentation standards.

4. **Self-Contained Imports:**
   Always import installed components from `@/components/ui/...` and Lucide icons from `lucide-solid`.
