import { Show, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";

interface PlaygroundStageProps {
  componentId: string;
  values: Record<string, any>;
}

/* Dynamically auto-discover all stage renderer components */
const stageModules = import.meta.glob<{ default: Component<any> }>(
  "./stages/*.tsx",
  { eager: true }
);

export function PlaygroundStage(props: PlaygroundStageProps) {
  const getStageComponent = () => {
    const filePath = `./stages/${props.componentId}.tsx`;
    return stageModules[filePath]?.default;
  };

  return (
    <div class="relative rounded-lg border border-border bg-background/50 p-4 sm:p-6 md:p-10 backdrop-blur-xs min-h-60 sm:min-h-75 flex items-center justify-center w-full max-w-full overflow-x-auto">
      <Show
        when={getStageComponent()}
        fallback={<div class="text-xs text-muted-foreground font-mono">No stage preview found for this component.</div>}
      >
        <Dynamic component={getStageComponent()!} values={props.values} />
      </Show>
    </div>
  );
}