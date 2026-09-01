import { Header } from "@/components/partials/header";
import { Seo } from "@/components/seo";
import { Hero } from "@/components/sections/hero";
import { DesktopShowcase } from "@/components/sections/desktop-showcase";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { HooksShowcase } from "@/components/sections/hooks-showcase";
import { McpShowcase } from "@/components/sections/mcp-showcase";
import { Features } from "@/components/sections/features";
import { CtaSection } from "@/components/sections/cta";
import { Footer } from "@/components/partials/footer";

export default function Home() {
  return (
    <>
      {/* Dynamic SEO Meta Tags */}
      <Seo path="/" />

      <div class="relative min-h-screen flex flex-col text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-clip w-full">
        {/* 1. Header Navigation */}
        <Header />

        {/* Main Content */}
        <main class="flex-1">
          {/* 1. Hero & Bento Grid */}
          <Hero />

          {/* 2. Native Tauri v2 & Desktop Suite Showcase */}
          <DesktopShowcase />

          {/* 3. Interactive Mini-Dashboard Composition */}
          <DashboardShowcase />

          {/* 3. 40+ Reactive Hooks & Primitives */}
          <HooksShowcase />

          {/* 4. AI MCP Server Integration */}
          <McpShowcase />

          {/* 5. Why Nikala UI Features */}
          <Features />

          {/* 6. Call To Action Banner */}
          <CtaSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}