import { showToast, ToastRegion, ToastList } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "toast",
  name: "Toast",
  props: [
    { name: "title", label: "Title", type: "text", default: "Notification sent" },
    {
      name: "description",
      label: "Description",
      type: "text",
      default: "Your message has been successfully transmitted.",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "success", "destructive", "warning", "info"],
      default: "default",
    },
  ],
  generateCode: (v) => {
    const variantAttr = v.variant && v.variant !== "default" ? `\n  variant: "${v.variant}",` : "";
    const descAttr = v.description ? `\n  description: "${v.description}",` : "";

    return `// Import toaster utilities
import { showToast, ToastRegion, ToastList } from "@/components/ui/toast";

// Trigger notification
showToast({
  title: "${v.title || "Notification sent"}",${descAttr}${variantAttr}
});

// Render ToastRegion in your App layout root:
// <ToastRegion><ToastList /></ToastRegion>`;
  },
};

export default function ToastStage(props: StageProps) {
  const triggerToast = () => {
    showToast({
      title: (props.values.title as string) || "Notification sent",
      description: (props.values.description as string) || undefined,
      variant: (props.values.variant as any) || "default",
    });
  };

  return (
    <div class="flex flex-col items-center justify-center p-6 space-y-4">
      <Button onClick={triggerToast}>Show Toast Notification</Button>
      <p class="text-xs text-muted-foreground text-center">
        Click the button to trigger a live toast in the viewport.
      </p>

      {/* Embedded Region for Stage Previews */}
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </div>
  );
}