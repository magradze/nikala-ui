import { describe, it, expect } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { ThemeToggle } from "@/components/ui/theme-toggle";

describe("UI Component - Accordion Suite", () => {
  it("should define all Accordion subcomponents", () => {
    expect(typeof Accordion).toBe("function");
    expect(typeof AccordionItem).toBe("function");
    expect(typeof AccordionTrigger).toBe("function");
    expect(typeof AccordionContent).toBe("function");
  });
});

describe("UI Component - Dialog Suite", () => {
  it("should define all Dialog subcomponents", () => {
    expect(typeof Dialog).toBe("function");
    expect(typeof DialogOverlay).toBe("function");
    expect(typeof DialogContent).toBe("function");
    expect(typeof DialogHeader).toBe("function");
    expect(typeof DialogFooter).toBe("function");
    expect(typeof DialogTitle).toBe("function");
    expect(typeof DialogDescription).toBe("function");
    expect(DialogTrigger).toBeDefined();
    expect(DialogClose).toBeDefined();
  });
});

describe("UI Component - DropdownMenu & Sheet Suites", () => {
  it("should define DropdownMenu subcomponents", () => {
    expect(typeof DropdownMenu).toBe("function");
    expect(DropdownMenuTrigger).toBeDefined();
    expect(typeof DropdownMenuContent).toBe("function");
    expect(typeof DropdownMenuItem).toBe("function");
  });

  it("should define Sheet subcomponents", () => {
    expect(typeof Sheet).toBe("function");
    expect(SheetTrigger).toBeDefined();
    expect(typeof SheetContent).toBe("function");
    expect(typeof SheetHeader).toBe("function");
    expect(typeof SheetTitle).toBe("function");
    expect(typeof SheetDescription).toBe("function");
    expect(typeof SheetFooter).toBe("function");
  });
});

describe("UI Component - Select, Command & ThemeToggle", () => {
  it("should define Select, Command, and ThemeToggle subcomponents", () => {
    expect(typeof Select).toBe("function");
    expect(typeof SelectTrigger).toBe("function");
    expect(typeof SelectValue).toBe("function");
    expect(typeof SelectContent).toBe("function");
    expect(typeof SelectItem).toBe("function");

    expect(typeof Command).toBe("function");
    expect(typeof CommandInput).toBe("function");
    expect(typeof CommandList).toBe("function");
    expect(typeof CommandItem).toBe("function");

    expect(typeof ThemeToggle).toBe("function");
  });
});
