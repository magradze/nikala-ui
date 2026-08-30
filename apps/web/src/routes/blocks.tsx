import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";
import { Header } from "@/components/partials/header";
import { DocsSidebar } from "@/components/docs-sidebar";
import { Footer } from "@/components/partials/footer";

const BlocksLayout: Component<RouteSectionProps> = (props) => {
  return (
    <div class="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Global Application Header */}
      <Header />

      <div class="container max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-0 px-4 md:px-0">
        {/* Left Blocks Sidebar Navigation */}
        <DocsSidebar />

        {/* Dynamic Blocks Route Content Container */}
        <main class="relative py-6 lg:py-8 min-w-0 px-0 md:px-4 lg:px-6">
          {props.children}
        </main>
      </div>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
};

export default BlocksLayout;
