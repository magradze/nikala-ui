// src/components/site-header.tsx
import { A } from "@solidjs/router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Banner } from "@/components/ui/banner";
import { Info } from "lucide-solid";

export function Header() {
  return (
    <>
      {/* Global Announcement Banner */}
      <Banner
        variant="warning"
        dismissible={true}
        sticky={false}
        icon={Info}
        storageKey="nikala-under-construction-banner"
        link="https://github.com/magradze/nikala-ui"
        linkText="GitHub"
      >
        Website is under active construction. Some pages and components are in preview mode.
      </Banner>


      {/* Main Header Element */}
      <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div class="container-full flex h-14 max-w-full items-center justify-between px-4">
          {/* Left: Brand Logo & Title */}
          <div class="flex items-center gap-6">
            <A href="/" class="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground font-extrabold text-sm shadow-sm">
                N
              </span>
              <span>Nikala UI</span>
              <Badge variant="outline" class="ml-1 text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                v0.4.0
              </Badge>
            </A>

            {/* Main Navigation */}
            <nav class="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <A href="/docs" class="hover:text-foreground transition-colors">Documentation</A>
              <A href="/docs/components/button" class="hover:text-foreground transition-colors">Components</A>
              <A href="/playground" class="hover:text-foreground transition-colors">Playground</A>
            </nav>
          </div>

          {/* Right: Actions */}
          <div class="flex items-center gap-3">
            {/* GitHub Link */}
            <a
              href="https://github.com/magradze/nikala-ui"
              target="_blank"
              rel="noreferrer"
              class="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" class="gap-2 h-8 text-xs">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle mode="max" effect="circular" />
          </div>
        </div>
      </header>
    </>
  );
}