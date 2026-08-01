import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "breadcrumb",
  name: "Breadcrumb",
  props: [
    { name: "separator", label: "Separator Character", type: "text", default: "/" },
    { name: "showEllipsis", label: "Show Ellipsis", type: "boolean", default: false },
  ],
};

export default function BreadcrumbStage(props: StageProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>{props.values.separator}</BreadcrumbSeparator>

        <Show when={props.values.showEllipsis}>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator>{props.values.separator}</BreadcrumbSeparator>
        </Show>

        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>{props.values.separator}</BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage>Playground</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}