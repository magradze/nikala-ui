import { createSignal, createEffect } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { Seo } from "@/components/seo";
import { Header } from "@/components/partials/header";
import { Footer } from "@/components/partials/footer";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { PlaygroundSidebar } from "@/components/playground/playground-sidebar";
import { PlaygroundControls } from "@/components/playground/playground-controls";
import { PlaygroundStage } from "@/components/playground/playground-stage";
import { PlaygroundCodeViewer } from "@/components/playground/playground-code-viewer";
import { PLAYGROUND_COMPONENTS } from "@/config/playground";

export default function PlaygroundPage() {
  const [searchParams, setSearchParams] = useSearchParams<{ c?: string }>();

  const initialId = () => {
    if (searchParams.c && PLAYGROUND_COMPONENTS.some((c) => c.id === searchParams.c)) {
      return searchParams.c;
    }
    return PLAYGROUND_COMPONENTS[0].id;
  };

  const [selectedId, setSelectedId] = createSignal(initialId());
  const [propValues, setPropValues] = createSignal<Record<string, any>>({});

  // Sync selectedId when searchParams.c changes (e.g. from MobileNav or URL)
  createEffect(() => {
    if (searchParams.c && searchParams.c !== selectedId()) {
      if (PLAYGROUND_COMPONENTS.some((c) => c.id === searchParams.c)) {
        setSelectedId(searchParams.c);
      }
    }
  });

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSearchParams({ c: id });
  };

  const currentSpec = () =>
    PLAYGROUND_COMPONENTS.find((c) => c.id === selectedId()) || PLAYGROUND_COMPONENTS[0];

  /* Reset prop values on component selection change */
  createEffect(() => {
    const spec = currentSpec();
    const initial: Record<string, any> = {};
    spec.props.forEach((p) => {
      initial[p.name] = p.default;
    });
    setPropValues(initial);
  });

  const updatePropValue = (key: string, val: any) => {
    setPropValues((prev) => ({ ...prev, [key]: val }));
  };

  /* Dynamic code generation calling component-specific generateCode if available */
  const generatedCode = () => {
    const spec = currentSpec();
    const vals = propValues();

    if (typeof spec.generateCode === "function") {
      return spec.generateCode(vals);
    }

    const propsList: string[] = [];
    spec.props.forEach((p) => {
      if (p.name === "children" || p.name === "title" || p.name === "description" || p.name === "label") return;
      const v = vals[p.name];
      if (v !== undefined && v !== p.default) {
        if (typeof v === "boolean") {
          if (v) propsList.push(p.name);
        } else if (typeof v === "number") {
          propsList.push(`${p.name}={${v}}`);
        } else {
          propsList.push(`${p.name}="${v}"`);
        }
      }
    });

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";
    const childrenStr = vals.children || vals.title || vals.label || "";

    if (spec.id === "input") return `<Input${propsStr} />`;
    if (childrenStr) return `<${spec.name}${propsStr}>${childrenStr}</${spec.name}>`;
    return `<${spec.name}${propsStr} />`;
  };

  return (
    <>
      <Seo
        title="Interactive Playground"
        description="Dynamic interactive component customizer for Nikala UI."
        path="/playground"
      />

      <div class="relative min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <div class="container max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-0 px-4 md:px-0">
          <PlaygroundSidebar
            selectedId={selectedId()}
            onSelect={handleSelect}
          />

          <main class="relative py-6 lg:py-8 min-w-0 px-0 md:px-4 lg:px-6 space-y-6 sm:space-y-8">
            <DocPageHeader
              title={`${currentSpec().name} Playground`}
              badge="Interactive"
              description="Customize props in real-time and export production-ready code."
            />

            <div class="space-y-3">
              <DocSectionHeader title="Preview" />
              <PlaygroundStage
                componentId={selectedId()}
                values={propValues()}
              />
            </div>

            <PlaygroundControls
              spec={currentSpec()}
              values={propValues()}
              setValue={updatePropValue}
            />

            <PlaygroundCodeViewer code={generatedCode()} />
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}