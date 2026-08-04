import { createOrientation } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

const importCode = `import { createOrientation } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { type, angle, isPortrait, isLandscape } = createOrientation();

return (
  <div class="p-4 border rounded-lg space-y-2 text-center">
    <p>Type: {type()}</p>
    <p>Angle: {angle()}°</p>
    <p>Mode: {isPortrait() ? "Portrait" : "Landscape"}</p>
  </div>
);`;

export function OrientationDemo() {
  const { type, angle, isPortrait, isLandscape } = createOrientation();

  return (
    <div class="w-full max-w-sm p-5 rounded-xl border border-border bg-card space-y-4 shadow-sm text-center">
      <div class="space-y-1">
        <h4 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">Screen Orientation Status</h4>
        <div class="text-lg font-bold text-foreground capitalize">{type().replace("-", " ")}</div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <Badge variant={isPortrait() ? "default" : "outline"}>
          Portrait: {isPortrait() ? "Active" : "Inactive"}
        </Badge>
        <Badge variant={isLandscape() ? "default" : "outline"}>
          Landscape: {isLandscape() ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div class="text-xs font-mono text-muted-foreground pt-1 border-t border-border/60">
        Rotation Angle: <span class="text-foreground font-semibold">{angle()}°</span>
      </div>
    </div>
  );
}

export default function CreateOrientationDocPage() {
  return (
    <>
      <Seo
        title="createOrientation Primitive"
        description="SolidJS reactive primitive for observing device screen orientation changes, rotation angles, and layout mode."
        path="/docs/hooks/create-orientation"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createOrientation"
          badge="primitive"
          description="Reactive primitive for detecting mobile and desktop screen orientation changes, rotation angles, and portrait/landscape state."
        />

        <ComponentPreview name="create-orientation" code={basicUsageCode}>
          <OrientationDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Detecting Screen Orientation & Angle</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createOrientation()</code> to observe real-time orientation type and rotation degree updates.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateOrientationOptions"
            items={[
              {
                prop: "onChange",
                type: "(orientation: ScreenOrientationType, angle: number) => void",
                default: "-",
                description: "Callback fired when screen orientation or rotation angle changes.",
              },
            ]}
          />

          <DocApiTable
            title="CreateOrientationReturn"
            items={[
              {
                prop: "type",
                type: "Accessor<ScreenOrientationType>",
                default: "-",
                description: "Signal indicating current orientation type (e.g. 'portrait-primary', 'landscape-primary').",
              },
              {
                prop: "angle",
                type: "Accessor<number>",
                default: "-",
                description: "Signal indicating current rotation angle in degrees (0, 90, 180, 270).",
              },
              {
                prop: "isPortrait",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether the screen is currently in portrait orientation.",
              },
              {
                prop: "isLandscape",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether the screen is currently in landscape orientation.",
              },
              {
                prop: "lock",
                type: "(orientation: string) => Promise<void>",
                default: "-",
                description: "Requests screen orientation lock if supported by the browser.",
              },
              {
                prop: "unlock",
                type: "() => void",
                default: "-",
                description: "Unlocks previously locked screen orientation.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createAudio & createVideo Primitives", href: "/docs/hooks/create-audio" }}
          next={{ title: "createUndoRedo Primitive", href: "/docs/hooks/create-undo-redo" }}
        />
      </div>
    </>
  );
}
