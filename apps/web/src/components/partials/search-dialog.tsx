import { createSignal, createEffect, onCleanup, For, Show, type Component } from "solid-js";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";
import { COMPONENTS_LIST, DOCUMENTATION_LIST, HOOKS_LIST } from "@/config/docs";
import { searchAlgolia, isAlgoliaConfigured, type AlgoliaSearchResult } from "@/lib/algolia";
import {
  BookOpen,
  Boxes,
  Component as ComponentIcon,
  Webhook,
} from "lucide-solid";

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog: Component<SearchDialogProps> = (props) => {
  return (
    <CommandDialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      enableHotkey={true}
    >
      {({ search }) => {
        const query = () => search().toLowerCase().trim();
        const [algoliaHits, setAlgoliaHits] = createSignal<AlgoliaSearchResult[]>([]);
        const [isSearching, setIsSearching] = createSignal(false);

        createEffect(() => {
          const q = search().trim();
          if (!q || !isAlgoliaConfigured()) {
            setAlgoliaHits([]);
            return;
          }

          let active = true;
          setIsSearching(true);

          const timer = setTimeout(async () => {
            try {
              const hits = await searchAlgolia(q);
              if (active) setAlgoliaHits(hits);
            } catch (e) {
              console.warn("Algolia live search:", e);
            } finally {
              if (active) setIsSearching(false);
            }
          }, 80);

          onCleanup(() => {
            active = false;
            clearTimeout(timer);
          });
        });

        const useAlgolia = () => isAlgoliaConfigured() && algoliaHits().length > 0;

        const filteredDocs = () => {
          if (useAlgolia()) {
            return algoliaHits()
              .filter((hit) => hit.type === "doc")
              .map((hit) => ({
                title: hit.title,
                subtitle: hit.description,
                href: hit.url,
                icon: BookOpen,
              }));
          }
          return DOCUMENTATION_LIST.filter(
            (doc) =>
              !query() ||
              doc.title.toLowerCase().includes(query()) ||
              doc.subtitle.toLowerCase().includes(query())
          );
        };

        const filteredHooks = () => {
          if (useAlgolia()) {
            return algoliaHits()
              .filter((hit) => hit.type === "hook")
              .map((hit) => ({
                title: hit.title,
                description: hit.description,
                href: hit.url,
              }));
          }
          if (!query()) return [];
          return HOOKS_LIST.filter(
            (hook) =>
              hook.title.toLowerCase().includes(query()) ||
              hook.description.toLowerCase().includes(query()) ||
              hook.name.toLowerCase().includes(query())
          );
        };

        const filteredComponents = () => {
          if (useAlgolia()) {
            return algoliaHits()
              .filter((hit) => hit.type === "component")
              .map((hit) => ({
                title: hit.title,
                description: hit.description,
                href: hit.url,
              }));
          }
          if (!query()) return [];
          return COMPONENTS_LIST.filter(
            (comp) =>
              comp.title.toLowerCase().includes(query()) ||
              comp.description.toLowerCase().includes(query()) ||
              comp.name.toLowerCase().includes(query())
          );
        };

        const filteredBlocks = () => {
          if (useAlgolia()) {
            return algoliaHits()
              .filter((hit) => hit.type === "block")
              .map((hit) => ({
                title: hit.title,
                description: hit.description,
                href: hit.url,
              }));
          }
          return [];
        };

        const hasAnyResults = () =>
          filteredDocs().length > 0 ||
          filteredHooks().length > 0 ||
          filteredComponents().length > 0 ||
          filteredBlocks().length > 0;

        return (
          <>
            <CommandInput placeholder="Search documentation, CLI, hooks, components..." />

            <CommandList>
              <Show when={query().length > 0 && !hasAnyResults() && !isSearching()}>
                <CommandEmpty />
              </Show>

              {/* Documentation Section */}
              <Show when={filteredDocs().length > 0}>
                <CommandGroup heading="Documentation">
                  <For each={filteredDocs()}>
                    {(doc) => (
                      <CommandItem
                        title={doc.title}
                        subtitle={doc.subtitle}
                        icon={doc.icon || BookOpen}
                        href={doc.href}
                        shouldFilter={false}
                        showChevron={true}
                        onSelect={() => props.onOpenChange(false)}
                      />
                    )}
                  </For>
                </CommandGroup>
              </Show>

              {/* Hooks Section */}
              <Show when={filteredHooks().length > 0}>
                <CommandGroup heading="Hooks & Primitives">
                  <For each={filteredHooks()}>
                    {(hook) => (
                      <CommandItem
                        title={hook.title}
                        subtitle={hook.description}
                        icon={Webhook}
                        href={hook.href}
                        shouldFilter={false}
                        showChevron={true}
                        onSelect={() => props.onOpenChange(false)}
                      />
                    )}
                  </For>
                </CommandGroup>
              </Show>

              {/* Components Section */}
              <Show when={filteredComponents().length > 0}>
                <CommandGroup heading="Components">
                  <For each={filteredComponents()}>
                    {(comp) => (
                      <CommandItem
                        title={comp.title}
                        subtitle={comp.description}
                        icon={ComponentIcon}
                        href={comp.href}
                        shouldFilter={false}
                        showChevron={true}
                        onSelect={() => props.onOpenChange(false)}
                      />
                    )}
                  </For>
                </CommandGroup>
              </Show>

              {/* Blocks Section */}
              <Show when={filteredBlocks().length > 0}>
                <CommandGroup heading="Blocks & Templates">
                  <For each={filteredBlocks()}>
                    {(block) => (
                      <CommandItem
                        title={block.title}
                        subtitle={block.description}
                        icon={Boxes}
                        href={block.href}
                        shouldFilter={false}
                        showChevron={true}
                        onSelect={() => props.onOpenChange(false)}
                      />
                    )}
                  </For>
                </CommandGroup>
              </Show>
            </CommandList>

            <CommandFooter>
              <a
                href="https://www.algolia.com/?utm_medium=AOS-referral"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
                title="Search powered by Algolia"
              >
                <span class="text-[10px] text-muted-foreground/80 group-hover:text-foreground transition-colors">Search by</span>
                <img
                  src="/algolia-logo.svg"
                  alt="Algolia"
                  class="h-4 w-auto opacity-70 group-hover:opacity-100 transition-opacity dark:brightness-100 brightness-0"
                />
              </a>
            </CommandFooter>
          </>
        );
      }}
    </CommandDialog>
  );
};
