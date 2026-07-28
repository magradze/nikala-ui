import { Palette } from "lucide-solid";
import { DocCallout } from "@/components/docs/doc-callout";

export function IntroPirosmaniCallout() {
  return (
    <DocCallout
      variant="pirosmani"
      title="Niko Pirosmani (Nikala)"
      icon={Palette}
    >
      Nikala UI pays tribute to the iconic primitive Georgian painter Niko Pirosmani. Like his art, Nikala UI embraces simplicity, bold structure, and raw elegance.
    </DocCallout>
  );
}