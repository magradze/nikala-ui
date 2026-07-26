import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";
import { SiteHeader } from "@/components/site-header";
import { DocsSidebar } from "@/components/docs-sidebar";

const DocsLayout: Component<RouteSectionProps> = (props) => {
  return (
    <div class="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Global Application Header */}
      <SiteHeader />

      <div class="container max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-6 px-4 md:px-8">
        {/* Left Documentation Sidebar Navigation */}
        <DocsSidebar />

        {/* Dynamic Route Content Container */}
        <main class="relative py-6 lg:py-8 min-w-0">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;