import { describe, it, expect } from "vitest";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput, addonVariants } from "@/components/ui/input-group";

describe("UI Component - Input & Textarea", () => {
  it("should define Input and Textarea as functions", () => {
    expect(typeof Input).toBe("function");
    expect(typeof Textarea).toBe("function");
  });
});

describe("UI Component - Checkbox, RadioGroup & Switch", () => {
  it("should define Checkbox, RadioGroup, and Switch components as functions", () => {
    expect(typeof Checkbox).toBe("function");
    expect(typeof RadioGroup).toBe("function");
    expect(typeof RadioGroupItem).toBe("function");
    expect(typeof RadioGroupItemLabel).toBe("function");
    expect(typeof Switch).toBe("function");
  });
});

describe("UI Component - Label & InputGroup", () => {
  it("should define Label and InputGroup components as functions", () => {
    expect(typeof Label).toBe("function");
    expect(typeof InputGroup).toBe("function");
    expect(typeof InputGroupAddon).toBe("function");
    expect(typeof InputGroupInput).toBe("function");
  });

  it("should compute addon variants correctly", () => {
    const defaultAddon = addonVariants({ align: "inline-start" });
    expect(defaultAddon).toContain("order-first");

    const endAddon = addonVariants({ align: "inline-end" });
    expect(endAddon).toContain("order-last");
  });
});
