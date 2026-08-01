import { describe, it, expect } from "vitest";
import { PlaygroundControls } from "@/components/playground/playground-controls";
import { PlaygroundStage } from "@/components/playground/playground-stage";
import { PlaygroundCodeViewer } from "@/components/playground/playground-code-viewer";
import { PlaygroundSidebar } from "@/components/playground/playground-sidebar";

describe("Playground Core Components", () => {
  it("should define all playground core components", () => {
    expect(typeof PlaygroundControls).toBe("function");
    expect(typeof PlaygroundStage).toBe("function");
    expect(typeof PlaygroundCodeViewer).toBe("function");
    expect(typeof PlaygroundSidebar).toBe("function");
  });
});
