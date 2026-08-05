import { createSignal, For } from "solid-js";
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxToken,
} from "@/components/ui/combobox";
import type { ComponentSpec, StageProps } from "@/types";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const COUNTRIES: CountryOption[] = [
  { value: "ge", label: "Georgia", flag: "🇬🇪" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
];

export const config: ComponentSpec = {
  id: "combobox",
  name: "Combobox",
  props: [
    { name: "placeholder", label: "Placeholder", type: "text", default: "Search country..." },
    { name: "multiple", label: "Multi-Select (Tags)", type: "boolean", default: false },
    { name: "clearable", label: "Clear Button", type: "boolean", default: true },
    {
      name: "triggerMode",
      label: "Trigger Mode",
      type: "select",
      options: ["input", "focus", "both", "manual"],
      default: "focus",
    },
    { name: "showAvatars", label: "Show Flags / Avatars", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<Combobox<CountryOption>
  ${v.multiple ? "multiple\n  " : ""}triggerMode="${v.triggerMode || "focus"}"
  options={COUNTRIES}
  optionValue="value"
  optionTextValue="label"
  optionLabel="label"${v.disabled ? "\n  disabled={true}" : ""}
  placeholder="${v.placeholder || "Search country..."}"
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      ${v.showAvatars ? `<span class="text-base mr-1.5">{props.item.rawValue.flag}</span>\n      ` : ""}<span>{props.item.textValue}</span>
    </ComboboxItem>
  )}
>
  <ComboboxControl${v.clearable ? " clearable" : ""}>
    ${
      v.multiple
        ? `<For each={selectedValues()}>
      {(item) => (
        <ComboboxToken item={item}>
          ${v.showAvatars ? `{item.flag} ` : ""}{item.label}
        </ComboboxToken>
      )}
    </For>\n    `
        : ""
    }<ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`,
};

export default function ComboboxStage(props: StageProps) {
  const [singleVal, setSingleVal] = createSignal<CountryOption | null>(COUNTRIES[0]);
  const [multiVal, setMultiVal] = createSignal<CountryOption[]>([COUNTRIES[0], COUNTRIES[1]]);

  return (
    <div class="w-full max-w-sm py-4">
      {props.values.multiple ? (
        <Combobox<CountryOption>
          multiple
          disabled={props.values.disabled}
          triggerMode={props.values.triggerMode || "focus"}
          options={COUNTRIES}
          optionValue="value"
          optionTextValue="label"
          optionLabel="label"
          value={multiVal()}
          onChange={setMultiVal}
          placeholder={props.values.placeholder}
          itemComponent={(p) => (
            <ComboboxItem item={p.item}>
              {props.values.showAvatars && (
                <span class="text-base mr-1.5">{p.item.rawValue.flag}</span>
              )}
              <span>{p.item.textValue}</span>
            </ComboboxItem>
          )}
        >
          <ComboboxControl
            clearable={props.values.clearable}
            onClear={() => setMultiVal([])}
          >
            <For each={multiVal()}>
              {(item) => (
                <ComboboxToken
                  item={item}
                  onRemove={() =>
                    setMultiVal(multiVal().filter((v) => v.value !== item.value))
                  }
                >
                  {props.values.showAvatars && <span class="mr-1">{item.flag}</span>}
                  {item.label}
                </ComboboxToken>
              )}
            </For>
            <ComboboxInput />
          </ComboboxControl>
          <ComboboxContent />
        </Combobox>
      ) : (
        <Combobox<CountryOption>
          disabled={props.values.disabled}
          triggerMode={props.values.triggerMode || "focus"}
          options={COUNTRIES}
          optionValue="value"
          optionTextValue="label"
          optionLabel="label"
          value={singleVal()}
          onChange={setSingleVal}
          placeholder={props.values.placeholder}
          itemComponent={(p) => (
            <ComboboxItem item={p.item}>
              {props.values.showAvatars && (
                <span class="text-base mr-1.5">{p.item.rawValue.flag}</span>
              )}
              <span>{p.item.textValue}</span>
            </ComboboxItem>
          )}
        >
          <ComboboxControl
            clearable={props.values.clearable}
            onClear={() => setSingleVal(null)}
          >
            <ComboboxInput />
          </ComboboxControl>
          <ComboboxContent />
        </Combobox>
      )}
    </div>
  );
}
