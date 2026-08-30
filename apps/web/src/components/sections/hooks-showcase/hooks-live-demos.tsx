import { createSignal } from "solid-js";
import {
  createClipboard,
  createUndoRedo,
  createNetworkStatus,
  createIdle,
} from "@nikala-ui/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Copy,
  Undo2,
  Redo2,
  Wifi,
  Clock,
} from "lucide-solid";

/* --- 1. Clipboard Live Demo --- */
export function ClipboardLiveDemo() {
  const [text, setText] = createSignal("npx @nikala-ui/cli add button");
  const { copied, copy } = createClipboard({ timeout: 1500 });

  return (
    <div class="space-y-2 py-0.5">
      <div class="flex items-center gap-2">
        <Input
          value={text()}
          onInput={(e) => setText(e.currentTarget.value)}
          class="h-8 text-xs font-mono"
        />
        <Button
          size="sm"
          onClick={() => copy(text())}
          class="h-8 text-xs shrink-0 gap-1.5 cursor-pointer"
        >
          {copied() ? <Check class="size-3.5 text-emerald-400" /> : <Copy class="size-3.5" />}
          <span>{copied() ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <p class="text-[10px] text-muted-foreground">Reactive clipboard with navigator fallback.</p>
    </div>
  );
}

/* --- 2. Undo / Redo Live Demo --- */
export function UndoRedoLiveDemo() {
  const historyManager = createUndoRedo(10, { maxHistory: 15 });

  return (
    <div class="space-y-2 py-0.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground font-medium">Value:</span>
          <span class="text-sm font-bold font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10">
            {historyManager.state()}
          </span>
        </div>

        <div class="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => historyManager.undo()}
            disabled={!historyManager.canUndo()}
            class="size-7 p-0 cursor-pointer"
            title="Undo"
          >
            <Undo2 class="size-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => historyManager.redo()}
            disabled={!historyManager.canRedo()}
            class="size-7 p-0 cursor-pointer"
            title="Redo"
          >
            <Redo2 class="size-3.5" />
          </Button>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => historyManager.set(historyManager.state() + 1)}
          class="h-7 text-xs flex-1 cursor-pointer"
        >
          +1 Inc
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => historyManager.set(historyManager.state() * 2)}
          class="h-7 text-xs flex-1 cursor-pointer"
        >
          ×2 Double
        </Button>
      </div>
    </div>
  );
}

/* --- 3. Network Status Live Demo --- */
export function NetworkStatusLiveDemo() {
  const network = createNetworkStatus();

  return (
    <div class="flex items-center justify-between gap-3 py-1">
      <div class="flex items-center gap-3 min-w-0">
        <div class="size-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
          <Wifi class="size-4.5" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-semibold text-foreground truncate">
            Navigator Status
          </span>
          <span class="text-[10px] text-muted-foreground truncate">
            reactive window listener
          </span>
        </div>
      </div>

      <Badge
        variant="outline"
        class="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs gap-1.5 py-1 px-2.5 shrink-0"
      >
        <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {network.isOnline() ? "Online" : "Offline"}
      </Badge>
    </div>
  );
}

/* --- 4. User Idle Detector Live Demo --- */
export function IdleDetectorLiveDemo() {
  const idle = createIdle({ timeout: 5000 });

  return (
    <div class="flex items-center justify-between gap-3 py-1">
      <div class="flex items-center gap-3 min-w-0">
        <div class="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <Clock class="size-4.5" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-semibold text-foreground truncate">
            Idle Tracker (5s)
          </span>
          <span class="text-[10px] text-muted-foreground truncate">
            activity detector
          </span>
        </div>
      </div>

      <Badge
        variant="outline"
        class="text-xs gap-1.5 py-1 px-2.5 shrink-0"
      >
        {idle.isIdle() ? (
          <span class="text-amber-500 font-medium">Idle (5s)</span>
        ) : (
          <span class="text-emerald-500 font-medium">Active</span>
        )}
      </Badge>
    </div>
  );
}
