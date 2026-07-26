// src/routes/index.tsx
import { SiteHeader } from "@/components/site-header";

import { Seo } from "@/components/seo";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { Features } from "@/components/sections/features";
import { Footer } from "~/components/partials/footer";

export default function Home() {
  return (
    <>
      {/* Dynamic SEO Meta Tags */}
      <Seo
        title="Nikala UI — SolidJS & Tailwind CSS v4 Component System"
        description="A simple, copy-paste component system for SolidJS built natively for Tailwind CSS v4."
        path="/"
      />
      <div class="relative min-h-screen flex flex-col text-foreground selection:bg-primary selection:text-primary-foreground">
        {/* 1. Header Navigation */}
        <SiteHeader />

        {/* Main Content */}
        <main class="flex-1">
          <Hero />
          <Showcase />
          <Features />
        </main>

        <Footer />
      </div>
    </>
  );
}