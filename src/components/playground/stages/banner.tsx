import { Banner } from "@/components/ui/banner";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "banner",
  name: "Banner",
  props: [
    { name: "children", label: "Banner Text", type: "text", default: "Website is under active construction." },
    { name: "variant", label: "Variant", type: "select", options: ["default", "warning", "info", "success", "destructive", "pirosmani"], default: "warning" },
    { name: "dismissible", label: "Dismissible", type: "boolean", default: true },
    { name: "showIcon", label: "Show Icon", type: "boolean", default: true },
    { name: "link", label: "Link URL", type: "text", default: "https://github.com/magradze/nikala-ui" },
    { name: "linkText", label: "Link Label", type: "text", default: "GitHub" },
  ],
};

export default function BannerStage(props: StageProps) {
  return (
    <div class="w-full max-w-lg">
      <Banner
        variant={props.values.variant}
        dismissible={props.values.dismissible}
        showIcon={props.values.showIcon}
        link={props.values.link}
        linkText={props.values.linkText}
      >
        {props.values.children}
      </Banner>
    </div>
  );
}