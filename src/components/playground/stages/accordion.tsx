import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "accordion",
  name: "Accordion",
  props: [
    { name: "type", label: "Expansion Mode", type: "select", options: ["single", "multiple"], default: "single" },
    { name: "collapsible", label: "Collapsible", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<Accordion type="${v.type || "single"}"${v.collapsible ? " collapsible" : ""}${v.disabled ? " disabled" : ""} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is Nikala UI reactive?</AccordionTrigger>
    <AccordionContent>
      Yes, Nikala UI uses fine-grained SolidJS reactivity and splitProps.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
};

export default function AccordionStage(props: StageProps) {
  return (
    <Accordion
      type={props.values.type}
      collapsible={props.values.collapsible}
      defaultValue="item-1"
      class="w-full max-w-md"
    >
      <AccordionItem value="item-1" disabled={props.values.disabled}>
        <AccordionTrigger>Is Nikala UI reactive?</AccordionTrigger>
        <AccordionContent>
          Yes, Nikala UI uses fine-grained SolidJS reactivity and splitProps.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled={props.values.disabled}>
        <AccordionTrigger>Does it support Tailwind v4?</AccordionTrigger>
        <AccordionContent>
          Designed natively around Tailwind v4 CSS-first theme configuration.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}