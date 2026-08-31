import {
  createSignal,
  createContext,
  useContext,
  splitProps,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { createElementSize } from "@/hooks/create-resize-observer";
import { GripVertical, GripHorizontal } from "lucide-solid";
import { cn } from "@/lib/cn";

export interface ResizableContextValue {
  orientation: Accessor<"horizontal" | "vertical">;
  registerPanel: (id: string, initialSizes: number) => void;
  sizes: Accessor<Record<string, number>>;
  startDragging: (handleIndex: number, event: PointerEvent) => void;
  containerRef: () => HTMLDivElement | undefined;
}

const ResizableContext = createContext<ResizableContextValue>();

export interface ResizableGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  class?: string;
  children?: JSX.Element;
}

export const ResizableGroup: Component<ResizableGroupProps> = (props) => {
  const [local, rest] = splitProps(props, ["orientation", "class", "children"]);
  const orientation = () => local.orientation || "horizontal";
  let containerEl: HTMLDivElement | undefined;

  const [panelOrder, setPanelOrder] = createSignal<string[]>([]);
  const [sizes, setSizes] = createSignal<Record<string, number>>({});

  const registerPanel = (id: string, initialSize: number) => {
    setPanelOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setSizes((prev) => (prev[id] !== undefined ? prev : { ...prev, [id]: initialSize }));
  };

  const startDragging = (handleIndex: number, event: PointerEvent) => {
    if (!containerEl) return;
    event.preventDefault();

    const order = panelOrder();
    if (handleIndex < 0 || handleIndex >= order.length - 1) return;

    const leftId = order[handleIndex];
    const rightId = order[handleIndex + 1];

    const isHoriz = orientation() === "horizontal";
    const startPos = isHoriz ? event.clientX : event.clientY;
    const rect = containerEl.getBoundingClientRect();
    const totalPx = isHoriz ? rect.width : rect.height;

    const startLeftPct = sizes()[leftId] ?? 50;
    const startRightPct = sizes()[rightId] ?? 50;

    const onPointerMove = (e: PointerEvent) => {
      const currentPos = isHoriz ? e.clientX : e.clientY;
      const deltaPx = currentPos - startPos;
      const deltaPct = (deltaPx / totalPx) * 100;

      let newLeft = startLeftPct + deltaPct;
      let newRight = startRightPct - deltaPct;

      // Min size limits (10% minimum)
      if (newLeft < 10) {
        newLeft = 10;
        newRight = startLeftPct + startRightPct - 10;
      } else if (newRight < 10) {
        newRight = 10;
        newLeft = startLeftPct + startRightPct - 10;
      }

      setSizes((prev) => ({
        ...prev,
        [leftId]: newLeft,
        [rightId]: newRight,
      }));
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <ResizableContext.Provider
      value={{
        orientation,
        registerPanel,
        sizes,
        startDragging,
        containerRef: () => containerEl,
      }}
    >
      <div
        ref={containerEl}
        class={cn(
          "flex h-full w-full overflow-hidden rounded-lg border border-border bg-background",
          orientation() === "vertical" ? "flex-col" : "flex-row",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </ResizableContext.Provider>
  );
};

export interface ResizablePanelProps extends JSX.HTMLAttributes<HTMLDivElement> {
  id: string;
  initialSize?: number;
  class?: string;
  children?: JSX.Element;
}

export const ResizablePanel: Component<ResizablePanelProps> = (props) => {
  const [local, rest] = splitProps(props, ["id", "initialSize", "class", "children"]);
  const ctx = useContext(ResizableContext);

  if (!ctx) {
    throw new Error("ResizablePanel must be used within a ResizableGroup");
  }

  ctx.registerPanel(local.id, local.initialSize ?? 50);

  const currentPct = () => ctx.sizes()[local.id] ?? local.initialSize ?? 50;

  // Utilize Nikala UI createElementSize hook for reactive size inspection
  const containerSize = createElementSize(() => ctx.containerRef());

  return (
    <div
      class={cn("overflow-auto transition-[flex-basis] duration-75", local.class)}
      style={{
        "flex-basis": `${currentPct()}%`,
        "flex-grow": 0,
        "flex-shrink": 0,
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export interface ResizableHandleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  handleIndex: number;
  withHandle?: boolean;
  class?: string;
}

export const ResizableHandle: Component<ResizableHandleProps> = (props) => {
  const [local, rest] = splitProps(props, ["handleIndex", "withHandle", "class"]);
  const ctx = useContext(ResizableContext);

  if (!ctx) {
    throw new Error("ResizableHandle must be used within a ResizableGroup");
  }

  const isHoriz = () => ctx.orientation() === "horizontal";

  return (
    <div
      role="separator"
      tabIndex={0}
      class={cn(
        "relative flex select-none items-center justify-center bg-border transition-colors hover:bg-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-col-resize",
        isHoriz() ? "h-full w-1.5 cursor-col-resize" : "h-1.5 w-full cursor-row-resize",
        local.class
      )}
      onPointerDown={(e) => ctx.startDragging(local.handleIndex, e)}
      {...rest}
    >
      {local.withHandle && (
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border border-border bg-muted shadow-2xs">
          {isHoriz() ? (
            <GripVertical class="h-2.5 w-2.5 text-muted-foreground" />
          ) : (
            <GripHorizontal class="h-2.5 w-2.5 text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
};
