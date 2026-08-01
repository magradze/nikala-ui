import { JSX } from "solid-js"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export const Showcase: () => JSX.Element = () => {
  return (
    <>
      {/* 3. Interactive Component Demo Showcase */}
      <section class="py-16 md:py-24 bg-muted/30 border-b border-border/40">
        <div class="container max-w-7xl px-4 mx-auto">
          <div class="text-center space-y-3 mb-12">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Built with Nikala UI Components</h2>
            <p class="text-muted-foreground max-w-lg mx-auto">
              Components live directly inside your project code (`src/components/ui`). Fully customizable and reactive.
            </p>
          </div>

          {/* Showcase Card Grid */}
          <div class="max-w-md mx-auto">
            <Card class="shadow-xl border-border/80 backdrop-blur-sm bg-card/90 rounded-lg">
              <CardHeader>
                <div class="flex items-center justify-between">
                  <CardTitle class="text-xl">Nikala UI Demo</CardTitle>
                  <Badge variant="default" class="bg-primary text-primary-foreground">SolidJS</Badge>
                </div>
                <CardDescription>
                  Interactive sample card powered by fine-grained reactivity.
                </CardDescription>
              </CardHeader>

              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <label class="text-xs font-medium text-muted-foreground">Subscribe for Updates</label>
                  <Input placeholder="nikala@pirosmani.ge" />
                </div>
              </CardContent>

              <CardFooter class="flex items-center justify-between border-t border-border/50 pt-4">
                <span class="text-xs text-muted-foreground">Tailwind CSS v4 Native</span>
                <Button onClick={() => alert("Gamarjoba Nikala!")} size="sm">
                  Say Hello
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
