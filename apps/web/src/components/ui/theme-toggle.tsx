import { splitProps, type Component, For, Show } from "solid-js";
import { Sun, Moon, Monitor } from "lucide-solid";
import {
  useTheme,
  type AccentColor,
  type Radius,
  type Theme,
} from "../../providers/theme-provider";
import {
  runThemeTransition,
  type ThemeEffect,
} from "../../providers/theme-transitions";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { cn } from "@/lib/cn";

import { createColorMode } from "@nikala-ui/hooks";

export interface ThemeToggleProps {
  /** Display mode: "mini" for compact dropdown, "max" for full customizer panel (default: "mini") */
  mode?: "mini" | "max";
  /** Transition animation effect when changing themes ("none", "circular", "fade") */
  effect?: ThemeEffect;
  class?: string;
}

const ACCENT_OPTIONS: { name: AccentColor; label: string; color: string }[] = [
  { name: "wine", label: "Wine", color: "bg-[#722f37]" },
  { name: "violet", label: "Violet", color: "bg-[#7c3aed]" },
  { name: "sky", label: "Sky", color: "bg-[#0284c7]" },
  { name: "emerald", label: "Emerald", color: "bg-[#059669]" },
  { name: "rose", label: "Rose", color: "bg-[#e11d48]" },
  { name: "amber", label: "Amber", color: "bg-[#d97706]" },
  { name: "zinc", label: "Zinc", color: "bg-[#18181b]" },
];

const RADIUS_OPTIONS: { value: Radius; label: string }[] = [
  { value: "0", label: "0" },
  { value: "0.3", label: "0.3" },
  { value: "0.5", label: "0.5" },
  { value: "0.75", label: "0.75" },
  { value: "1.0", label: "1.0" },
];

/**
 * Interactive UI theme switcher supporting mini/max modes and View Transition animations.
 */
export const ThemeToggle: Component<ThemeToggleProps> = (props) => {
  const [local] = splitProps(props, ["mode", "effect", "class"]);
  const { theme, setTheme, accent, setAccent, radius, setRadius } = useTheme();

  const colorMode = createColorMode({
    initialValue: theme(),
    storageKey: "nikala-theme-mode",
  });

  const mode = () => local.mode || "mini";
  const effect = () => local.effect || "none";

  /* Reactive accessor determining whether dark mode is active via createColorMode hook */
  const isDarkMode = () => {
    const currentTheme = theme();
    if (currentTheme === "dark") return true;
    if (currentTheme === "light") return false;
    return colorMode.isDark();
  };

  const changeThemeWithEffect = (newTheme: Theme, e: MouseEvent) => {
    runThemeTransition(effect(), e, () => {
      setTheme(newTheme);
      colorMode.setMode(newTheme);
    });
  };

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger
        as={Button}
        variant="ghost"
        size="icon"
        class={cn("relative h-9 w-9 cursor-pointer", local.class)}
      >
        {/* Reactive Sun / Moon Icon Toggle */}
        <Show
          when={isDarkMode()}
          fallback={<Sun class="h-4 w-4 text-foreground transition-transform" />}
        >
          <Moon class="h-4 w-4 text-foreground transition-transform" />
        </Show>

        <span class="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>

      <Show
        when={mode() === "max"}
        fallback={
          /* Mini Mode: Compact Dropdown */
          <DropdownMenuContent>
            <DropdownMenuItem onClick={(e: MouseEvent) => changeThemeWithEffect("light", e)}>
              <Sun class="mr-2 h-4 w-4 text-muted-foreground" />
              Light
            </DropdownMenuItem>

            <DropdownMenuItem onClick={(e: MouseEvent) => changeThemeWithEffect("dark", e)}>
              <Moon class="mr-2 h-4 w-4 text-muted-foreground" />
              Dark
            </DropdownMenuItem>

            <DropdownMenuItem onClick={(e: MouseEvent) => changeThemeWithEffect("system", e)}>
              <Monitor class="mr-2 h-4 w-4 text-muted-foreground" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        }
      >
        {/* Max Mode: Full Theme Customizer Panel */}
        <DropdownMenuContent class="w-64 p-3">
          <DropdownMenuLabel class="px-0 pt-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Theme Mode
          </DropdownMenuLabel>
          <div class="grid grid-cols-3 gap-1 my-1.5">
            <Button
              variant={theme() === "light" ? "default" : "outline"}
              size="sm"
              onClick={(e: MouseEvent) => changeThemeWithEffect("light", e)}
              class="h-8 text-xs cursor-pointer"
            >
              Light
            </Button>
            <Button
              variant={theme() === "dark" ? "default" : "outline"}
              size="sm"
              onClick={(e: MouseEvent) => changeThemeWithEffect("dark", e)}
              class="h-8 text-xs cursor-pointer"
            >
              Dark
            </Button>
            <Button
              variant={theme() === "system" ? "default" : "outline"}
              size="sm"
              onClick={(e: MouseEvent) => changeThemeWithEffect("system", e)}
              class="h-8 text-xs cursor-pointer"
            >
              System
            </Button>
          </div>

          <DropdownMenuSeparator class="my-2" />

          <DropdownMenuLabel class="px-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Brand Accent Color
          </DropdownMenuLabel>
          <div class="flex flex-wrap gap-1.5 my-1.5">
            <For each={ACCENT_OPTIONS}>
              {(opt) => (
                <button
                  type="button"
                  title={opt.label}
                  onClick={() => setAccent(opt.name)}
                  class={cn(
                    "h-6 w-6 rounded-md transition-all cursor-pointer border border-border flex items-center justify-center",
                    opt.color,
                    accent() === opt.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"
                  )}
                />
              )}
            </For>
          </div>

          <DropdownMenuSeparator class="my-2" />

          <DropdownMenuLabel class="px-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Border Radius
          </DropdownMenuLabel>
          <div class="grid grid-cols-5 gap-1 my-1.5">
            <For each={RADIUS_OPTIONS}>
              {(r) => (
                <Button
                  variant={radius() === r.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRadius(r.value)}
                  class="h-7 text-xs px-1 cursor-pointer"
                >
                  {r.label}
                </Button>
              )}
            </For>
          </div>
        </DropdownMenuContent>
      </Show>
    </DropdownMenu>
  );
};