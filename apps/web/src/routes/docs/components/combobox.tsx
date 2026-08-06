import { createSignal, For } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxToken,
  ComboboxEmpty,
} from "@/components/ui/combobox";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
  region: string;
}

interface UserOption {
  value: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

interface CountryGroup {
  region: string;
  countries: CountryOption[];
}

const COUNTRIES: CountryOption[] = [
  { value: "ge", label: "Georgia", flag: "🇬🇪", region: "Europe" },
  { value: "us", label: "United States", flag: "🇺🇸", region: "Americas" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { value: "de", label: "Germany", flag: "🇩🇪", region: "Europe" },
  { value: "fr", label: "France", flag: "🇫🇷", region: "Europe" },
  { value: "jp", label: "Japan", flag: "🇯🇵", region: "Asia" },
  { value: "ca", label: "Canada", flag: "🇨🇦", region: "Americas" },
];

const USERS: UserOption[] = [
  { value: "niko", name: "Niko Pirosmani", email: "niko@pirosmani.ge", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", initials: "NP" },
  { value: "lasha", name: "Giorgi Magradze", email: "giorgi@magradze.dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", initials: "LM" },
  { value: "alex", name: "Alex Rivers", email: "alex@nikala.dev", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", initials: "AR" },
];

const GROUPS: CountryGroup[] = [
  {
    region: "Europe",
    countries: [COUNTRIES[0], COUNTRIES[2], COUNTRIES[3], COUNTRIES[4]],
  },
  {
    region: "Americas",
    countries: [COUNTRIES[1], COUNTRIES[6]],
  },
];

const importCode = `import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxToken,
  ComboboxEmpty,
} from "@/components/ui/combobox";`;

export default function ComboboxDocsPage() {
  const [singleValue, setSingleValue] = createSignal<CountryOption | null>(COUNTRIES[0]);
  const [multiValue, setMultiValue] = createSignal<CountryOption[]>([COUNTRIES[0], COUNTRIES[1]]);
  const [userValue, setUserValue] = createSignal<UserOption | null>(USERS[0]);
  const [groupedValue, setGroupedValue] = createSignal<CountryOption | null>(COUNTRIES[0]);

  return (
    <>
      <Seo
        title="Combobox / AutoComplete Component"
        description="Searchable dropdown component built on Kobalte with single/multi-select, tags, clear button, groups, and custom avatars."
        path="/docs/components/combobox"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Combobox"
          badge="UI Component"
          description="Searchable autocomplete dropdown with single/multi-selection tags, avatars, group headers, and customizable clear controls."
        />

        {/* 1. Basic Single Select */}
        <DocSectionHeader
          title="Basic Single Select"
          description="Simple autocomplete dropdown with searchable items and clear button."
        />

        <ComponentPreview
          name="combobox"
          code={`const [value, setValue] = createSignal(COUNTRIES[0]);

<Combobox<CountryOption>
  options={COUNTRIES}
  optionValue="value"
  optionTextValue="label"
  optionLabel="label"
  value={singleValue()}
  onChange={setSingleValue}
  placeholder="Search country..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
      <span>{props.item.textValue}</span>
    </ComboboxItem>
  )}
>
  <ComboboxControl clearable onClear={() => setSingleValue(null)}>
    <ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`}
        >
          <div class="w-full max-w-sm">
            <Combobox<CountryOption>
              options={COUNTRIES}
              optionValue="value"
              optionTextValue="label"
              optionLabel="label"
              value={singleValue()}
              onChange={setSingleValue}
              placeholder="Search country..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                  <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
                  <span>{props.item.textValue}</span>
                </ComboboxItem>
              )}
            >
              <ComboboxControl clearable onClear={() => setSingleValue(null)}>
                <ComboboxInput />
              </ComboboxControl>
              <ComboboxContent />
            </Combobox>
          </div>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Open on Focus / Click */}
        <DocSectionHeader
          title="Open on Focus / Click"
          description="Set triggerMode='focus' or triggerMode='both' to automatically open the dropdown options as soon as the input is clicked or focused."
        />

        <ComponentPreview
          name="combobox"
          code={`<Combobox<CountryOption>
  triggerMode="focus"
  options={COUNTRIES}
  optionValue="value"
  optionTextValue="label"
  optionLabel="label"
  placeholder="Click or focus to open options..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
      <span>{props.item.textValue}</span>
    </ComboboxItem>
  )}
>
  <ComboboxControl clearable>
    <ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`}
        >
          <div class="w-full max-w-sm">
            <Combobox<CountryOption>
              triggerMode="focus"
              options={COUNTRIES}
              optionValue="value"
              optionTextValue="label"
              optionLabel="label"
              placeholder="Click or focus to open options..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                  <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
                  <span>{props.item.textValue}</span>
                </ComboboxItem>
              )}
            >
              <ComboboxControl clearable>
                <ComboboxInput />
              </ComboboxControl>
              <ComboboxContent />
            </Combobox>
          </div>
        </ComponentPreview>

        {/* 2. Multi-Select with Tags */}
        <DocSectionHeader
          title="Multi-Select with Tags"
          description="Multiple item selection with removable tag pills in the input container."
        />

        <ComponentPreview
          name="combobox"
          code={`const [selected, setSelected] = createSignal([COUNTRIES[0], COUNTRIES[1]]);

<Combobox<CountryOption>
  multiple
  options={COUNTRIES}
  optionValue="value"
  optionTextValue="label"
  optionLabel="label"
  value={multiValue()}
  onChange={setMultiValue}
  placeholder="Select countries..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
      <span>{props.item.textValue}</span>
    </ComboboxItem>
  )}
>
  <ComboboxControl clearable onClear={() => setMultiValue([])}>
    <For each={multiValue()}>
      {(item) => (
        <ComboboxToken 
          item={item}
          onRemove={() => setMultiValue(multiValue().filter((v) => v.value !== item.value))}
        >
          {item.flag} {item.label}
        </ComboboxToken>
      )}
    </For>
    <ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`}
        >
          <div class="w-full max-w-md">
            <Combobox<CountryOption>
              multiple
              options={COUNTRIES}
              optionValue="value"
              optionTextValue="label"
              optionLabel="label"
              value={multiValue()}
              onChange={setMultiValue}
              placeholder="Select countries..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                  <span class="text-base mr-1.5">{props.item.rawValue.flag}</span>
                  <span>{props.item.textValue}</span>
                </ComboboxItem>
              )}
            >
              <ComboboxControl clearable onClear={() => setMultiValue([])}>
                <For each={multiValue()}>
                  {(item) => (
                    <ComboboxToken
                      item={item}
                      onRemove={() =>
                        setMultiValue(multiValue().filter((v) => v.value !== item.value))
                      }
                    >
                      <span class="mr-1">{item.flag}</span> {item.label}
                    </ComboboxToken>
                  )}
                </For>
                <ComboboxInput />
              </ComboboxControl>
              <ComboboxContent />
            </Combobox>
          </div>
        </ComponentPreview>

        {/* 3. Custom Items with Avatars */}
        <DocSectionHeader
          title="Custom Items & Avatars"
          description="Combobox item templates with user avatar images, names, and email subtext."
        />

        <ComponentPreview
          name="combobox"
          code={`<Combobox<UserOption>
  options={USERS}
  optionValue="value"
  optionTextValue="name"
  optionLabel="name"
  value={userValue()}
  onChange={setUserValue}
  placeholder="Search team member..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      <Avatar class="h-6 w-6 shrink-0 mr-1">
        <AvatarImage src={props.item.rawValue.avatar} alt={props.item.rawValue.name} />
        <AvatarFallback>{props.item.rawValue.initials}</AvatarFallback>
      </Avatar>
      <div class="flex flex-col min-w-0">
        <span class="font-medium text-xs text-foreground truncate">{props.item.rawValue.name}</span>
        <span class="text-[10px] text-muted-foreground truncate">{props.item.rawValue.email}</span>
      </div>
    </ComboboxItem>
  )}
>
  <ComboboxControl clearable onClear={() => setUserValue(null)}>
    <ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`}
        >
          <div class="w-full max-w-sm">
            <Combobox<UserOption>
              options={USERS}
              optionValue="value"
              optionTextValue="name"
              optionLabel="name"
              value={userValue()}
              onChange={setUserValue}
              placeholder="Search team member..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                  <Avatar class="h-6 w-6 shrink-0 mr-1">
                    <AvatarImage src={props.item.rawValue.avatar} alt={props.item.rawValue.name} />
                    <AvatarFallback>{props.item.rawValue.initials}</AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col min-w-0">
                    <span class="font-medium text-xs text-foreground truncate">{props.item.rawValue.name}</span>
                    <span class="text-[10px] text-muted-foreground truncate">{props.item.rawValue.email}</span>
                  </div>
                </ComboboxItem>
              )}
            >
              <ComboboxControl clearable onClear={() => setUserValue(null)}>
                <ComboboxInput />
              </ComboboxControl>
              <ComboboxContent />
            </Combobox>
          </div>
        </ComponentPreview>

        {/* 4. Grouped Options */}
        <DocSectionHeader
          title="Grouped Options"
          description="Organize options into categorised groups with section headers."
        />

        <ComponentPreview
          name="combobox"
          code={`const GROUPS = [
  {
    region: "Europe",
    countries: [COUNTRIES[0], COUNTRIES[2], COUNTRIES[3], COUNTRIES[4]],
  },
  {
    region: "Americas",
    countries: [COUNTRIES[1], COUNTRIES[6]],
  },
];

<Combobox<CountryOption, CountryGroup>
  options={GROUPS}
  optionValue="value"
  optionTextValue="label"
  optionLabel="label"
  optionGroupChildren="countries"
  value={groupedValue()}
  onChange={setGroupedValue}
  placeholder="Select grouped country..."
  itemComponent={(props) => (
    <ComboboxItem item={props.item}>
      <span class="mr-1.5">{props.item.rawValue.flag}</span>
      <span>{props.item.textValue}</span>
    </ComboboxItem>
  )}
  sectionComponent={(props) => (
    <ComboboxGroup label={props.section.rawValue.region} />
  )}
>
  <ComboboxControl clearable>
    <ComboboxInput />
  </ComboboxControl>
  <ComboboxContent />
</Combobox>`}
        >
          <div class="w-full max-w-sm">
            <Combobox<CountryOption, CountryGroup>
              options={GROUPS}
              optionValue="value"
              optionTextValue="label"
              optionLabel="label"
              optionGroupChildren="countries"
              value={groupedValue()}
              onChange={setGroupedValue}
              placeholder="Select grouped country..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                  <span class="mr-1.5">{props.item.rawValue.flag}</span>
                  <span>{props.item.textValue}</span>
                </ComboboxItem>
              )}
              sectionComponent={(props) => (
                <ComboboxGroup label={props.section.rawValue.region} />
              )}
            >
              <ComboboxControl clearable>
                <ComboboxInput />
              </ComboboxControl>
              <ComboboxContent />
            </Combobox>
          </div>
        </ComponentPreview>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Combobox (Root)"
            items={[
              {
                prop: "options",
                type: "T[]",
                default: "[]",
                description: "Array of option objects or strings to filter and select from.",
              },
              {
                prop: "multiple",
                type: "boolean",
                default: "false",
                description: "Enables multi-selection mode with tag pills.",
              },
              {
                prop: "triggerMode",
                type: '"focus" | "input" | "both" | "manual"',
                default: '"focus"',
                description: "Determines whether popover opens on input focus, click, both, or button only.",
              },
              {
                prop: "placeholder",
                type: "string",
                default: '"Select..."',
                description: "Placeholder text when no value is selected.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and dims trigger control.",
              },
            ]}
          />

          <DocApiTable
            title="ComboboxControl"
            items={[
              {
                prop: "clearable",
                type: "boolean",
                default: "false",
                description: "Shows X button to clear current selection.",
              },
              {
                prop: "onClear",
                type: "() => void",
                default: "—",
                description: "Custom callback fired when clear button is clicked.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Checkbox Component", href: "/docs/components/checkbox" }}
          next={{ title: "Command Component", href: "/docs/components/command" }}
        />
      </div>
    </>
  );
}
