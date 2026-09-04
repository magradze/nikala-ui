// packages/docs/src/themes/default/Layout.tsx
import { createSignal, Show, splitProps, type ParentComponent } from "solid-js";
import {
  SidebarProvider,
  SidebarInset,
  Container,
  SectionHeading,
} from "@nikala-ui/core";
import { DocsNavbar } from "./Navbar.jsx";
import { DocsSidebar } from "./Sidebar.jsx";
import { DocsBreadcrumbs } from "./Breadcrumbs.jsx";
import { DocsPager } from "./Pager.jsx";
import { DocsTableOfContents } from "./TableOfContents.jsx";
import { DocsSearchDialog } from "./SearchDialog.jsx";
import type { DocsLayoutProps } from "../types.js";

export const DocsLayout: ParentComponent<DocsLayoutProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "config",
    "tree",
    "currentPage",
    "breadcrumbs",
    "toc",
    "prev",
    "next",
    "children",
    "class",
  ]);

  const [searchOpen, setSearchOpen] = createSignal(false);

  const currentUrl = () => local.currentPage?.url;
  const showToc = () =>
    Boolean(
      local.toc &&
      local.toc.length > 0 &&
      local.currentPage?.frontmatter?.toc !== false
    );

  return (
    <SidebarProvider defaultOpen={true} class="min-h-screen flex flex-col w-full">
      <DocsNavbar
        config={local.config}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <Container as="div" size="full" class="flex-1 flex w-full items-start px-0 sm:px-0 lg:px-0">
        <DocsSidebar
          tree={local.tree}
          currentUrl={currentUrl()}
        />

        <SidebarInset class={local.class} {...rest}>
          <Container as="main" size="2xl" class="flex-1 flex gap-8 py-8">
            {/* Documentation Article Body */}
            <Container as="article" size="xl" class="flex-1 min-w-0 px-0 sm:px-4">
              <Show when={local.breadcrumbs && local.breadcrumbs.length > 0}>
                <DocsBreadcrumbs items={local.breadcrumbs!} class="mb-6" />
              </Show>

              <Show when={local.currentPage?.title}>
                <SectionHeading
                  variant="page"
                  title={local.currentPage!.title}
                  description={local.currentPage?.description}
                  class="mb-8"
                />
              </Show>

              <Container as="div" size="full" class="prose prose-zinc dark:prose-invert max-w-none px-0 sm:px-0 lg:px-0">
                {local.children}
              </Container>

              <Show when={local.prev || local.next}>
                <DocsPager prev={local.prev} next={local.next} />
              </Show>
            </Container>

            {/* Right Column: Table of Contents */}
            <Show when={showToc() && local.currentPage?.url} keyed>
              <Container as="aside" size="sm" class="hidden xl:block w-64 shrink-0 px-0 sticky top-14 h-[calc(100vh-3.5rem)]">
                <DocsTableOfContents items={local.toc!} />
              </Container>
            </Show>
          </Container>

          {/* Global Search Dialog */}
          <DocsSearchDialog
            open={searchOpen()}
            onOpenChange={setSearchOpen}
          />
        </SidebarInset>
      </Container>
    </SidebarProvider>
  );
};
