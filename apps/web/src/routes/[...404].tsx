// src/routes/[...404].tsx
import { A } from "@solidjs/router";
import { Seo } from "@/components/seo";
import { Header } from "@/components/partials/header";
import { Footer } from "@/components/partials/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, BookOpen } from "lucide-solid";

export default function NotFoundPage() {
  return (
    <>
      {/* Dynamic 404 Meta Tags */}
      <Seo
        title="404 — Page Not Found"
        description="The page you are looking for could not be found on Nikala UI."
        noindex={true}
      />

      <div class="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {/* Site Navigation Header */}
        <Header />

        {/* 404 Main Centered Content */}
        <main class="flex-1 container max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-20 md:py-32 text-center">
          {/* Background Ambient Glow */}
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-125 h-75 bg-primary/10 blur-[100px] rounded-lg pointer-events-none" />

          <div class="space-y-6 max-w-md">
            {/* Status Badge */}
            <div class="inline-flex items-center justify-center">
              <Badge variant="outline" class="px-3 py-1 text-xs rounded-lg border-primary/30 bg-primary/5 text-primary">
                Error 404
              </Badge>
            </div>

            {/* Giant Error Code & Heading */}
            <div class="space-y-2">
              <h1 class="text-6xl sm:text-8xl font-black tracking-tight text-primary">
                404
              </h1>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
                Page Not Found
              </h2>
            </div>

            {/* Description */}
            <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Sorry, the page you are looking for doesn't exist, may have been moved, or is currently under construction.
            </p>

            {/* Action Buttons */}
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <A href="/" class="w-full sm:w-auto">
                <Button size="lg" class="w-full sm:w-auto gap-2 text-sm h-10 px-6 font-semibold shadow-md shadow-primary/20">
                  <Home class="w-4 h-4" />
                  Return Home
                </Button>
              </A>

              <A href="/docs" class="w-full sm:w-auto">
                <Button variant="outline" size="lg" class="w-full sm:w-auto gap-2 text-sm h-10 px-6 font-semibold">
                  <BookOpen class="w-4 h-4" />
                  Browse Docs
                </Button>
              </A>
            </div>
          </div>
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </>
  );
}