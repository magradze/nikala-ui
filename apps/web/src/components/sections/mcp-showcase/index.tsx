import { McpChat } from "./mcp-chat";
import { McpFeatures } from "./mcp-features";

export function McpShowcase() {
  return (
    <section class="py-16 md:py-24 border-b border-border/40 bg-muted/10">
      <div class="container max-w-7xl px-4 mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Features & Explanation */}
          <McpFeatures />

          {/* Right: Simulated AI Terminal Chat with Tool Calls */}
          <McpChat />
        </div>
      </div>
    </section>
  );
}

export * from "./mcp-chat";
export * from "./mcp-features";
