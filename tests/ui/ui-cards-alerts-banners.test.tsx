import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
} from "@/components/ui/alert";
import {
  Banner,
  bannerVariants,
} from "@/components/ui/banner";

describe("UI Component - Card Suite", () => {
  it("should define Card and subcomponents as functions", () => {
    expect(typeof Card).toBe("function");
    expect(typeof CardHeader).toBe("function");
    expect(typeof CardTitle).toBe("function");
    expect(typeof CardDescription).toBe("function");
    expect(typeof CardContent).toBe("function");
    expect(typeof CardFooter).toBe("function");
  });
});

describe("UI Component - Alert Suite", () => {
  it("should define Alert and subcomponents as functions", () => {
    expect(typeof Alert).toBe("function");
    expect(typeof AlertTitle).toBe("function");
    expect(typeof AlertDescription).toBe("function");
  });

  it("should compute cva alert variants", () => {
    const defaultAlert = alertVariants({ variant: "default" });
    expect(defaultAlert).toContain("relative");

    const infoAlert = alertVariants({ variant: "info" });
    expect(infoAlert).toContain("bg-blue-50");

    const destructiveAlert = alertVariants({ variant: "destructive" });
    expect(destructiveAlert).toContain("bg-destructive/15");
  });
});

describe("UI Component - Banner Suite", () => {
  it("should define Banner as a component function", () => {
    expect(typeof Banner).toBe("function");
  });

  it("should compute cva banner variants", () => {
    const defaultBanner = bannerVariants();
    expect(defaultBanner).toContain("w-full");

    const warningBanner = bannerVariants({ variant: "warning" });
    expect(warningBanner).toContain("bg-amber-500/15");
  });
});
