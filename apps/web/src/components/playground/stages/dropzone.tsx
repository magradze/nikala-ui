import { createSignal, For, Show } from "solid-js";
import {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileItem,
} from "@/components/ui/dropzone";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "dropzone",
  name: "Dropzone",
  props: [
    { name: "title", label: "Title", type: "text", default: "Click to upload or drag and drop" },
    { name: "description", label: "Description", type: "text", default: "SVG, PNG, JPG, or PDF (max. 5MB)" },
    { name: "compact", label: "Compact Padding", type: "boolean", default: false },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
    { name: "showFileList", label: "Show Demo Files", type: "boolean", default: true },
  ],
  generateCode: (v) => `<Dropzone
  class="${v.compact ? "p-4" : "p-8"}"${v.disabled ? "\n  disabled" : ""}
>
  <DropzoneIcon />
  <DropzoneTitle>${v.title || "Click to upload or drag and drop"}</DropzoneTitle>
  <DropzoneDescription>${v.description || "SVG, PNG, JPG, or PDF (max. 5MB)"}</DropzoneDescription>
</Dropzone>`,
};

export default function DropzoneStage(props: StageProps) {
  const [demoFiles, setDemoFiles] = createSignal([
    { name: "architecture-diagram.png", size: "2.4 MB" },
    { name: "project-spec.pdf", size: "1.1 MB" },
  ]);

  return (
    <div class="w-full max-w-md space-y-3">
      <Dropzone
        class={props.values.compact ? "p-4 cursor-pointer" : "p-8 cursor-pointer"}
        disabled={props.values.disabled}
      >
        <DropzoneIcon />
        <DropzoneTitle>{props.values.title || "Click to upload or drag and drop"}</DropzoneTitle>
        <DropzoneDescription>{props.values.description || "SVG, PNG, JPG, or PDF (max. 5MB)"}</DropzoneDescription>
      </Dropzone>

      <Show when={props.values.showFileList && demoFiles().length > 0}>
        <DropzoneFileList>
          <For each={demoFiles()}>
            {(file) => (
              <DropzoneFileItem
                name={file.name}
                size={file.size}
                onRemove={() => {
                  setDemoFiles(demoFiles().filter((f) => f !== file));
                }}
              />
            )}
          </For>
        </DropzoneFileList>
      </Show>
    </div>
  );
}
