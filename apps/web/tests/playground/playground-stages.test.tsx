import { describe, it, expect } from "vitest";

import AccordionStage, { config as accordionConfig } from "@/components/playground/stages/accordion";
import AlertStage, { config as alertConfig } from "@/components/playground/stages/alert";
import AvatarStage, { config as avatarConfig } from "@/components/playground/stages/avatar";
import BadgeStage, { config as badgeConfig } from "@/components/playground/stages/badge";
import BannerStage, { config as bannerConfig } from "@/components/playground/stages/banner";
import BreadcrumbStage, { config as breadcrumbConfig } from "@/components/playground/stages/breadcrumb";
import ButtonStage, { config as buttonConfig } from "@/components/playground/stages/button";
import CardStage, { config as cardConfig } from "@/components/playground/stages/card";
import CheckboxStage, { config as checkboxConfig } from "@/components/playground/stages/checkbox";
import CommandStage, { config as commandConfig } from "@/components/playground/stages/command";
import DialogStage, { config as dialogConfig } from "@/components/playground/stages/dialog";
import DropdownMenuStage, { config as dropdownConfig } from "@/components/playground/stages/dropdown-menu";
import FieldStage, { config as fieldConfig } from "@/components/playground/stages/field";
import InputGroupStage, { config as inputGroupConfig } from "@/components/playground/stages/input-group";
import InputStage, { config as inputConfig } from "@/components/playground/stages/input";
import KbdStage, { config as kbdConfig } from "@/components/playground/stages/kbd";
import LabelStage, { config as labelConfig } from "@/components/playground/stages/label";
import ListStage, { config as listConfig } from "@/components/playground/stages/list";
import RadioGroupStage, { config as radioGroupConfig } from "@/components/playground/stages/radio-group";
import SelectStage, { config as selectConfig } from "@/components/playground/stages/select";
import SeparatorStage, { config as separatorConfig } from "@/components/playground/stages/separator";
import SheetStage, { config as sheetConfig } from "@/components/playground/stages/sheet";
import SkeletonStage, { config as skeletonConfig } from "@/components/playground/stages/skeleton";
import SpinnerStage, { config as spinnerConfig } from "@/components/playground/stages/spinner";
import SwitchStage, { config as switchConfig } from "@/components/playground/stages/switch";
import TabsStage, { config as tabsConfig } from "@/components/playground/stages/tabs";
import TextareaStage, { config as textareaConfig } from "@/components/playground/stages/textarea";
import ThemeManagerStage, { config as themeManagerConfig } from "@/components/playground/stages/theme-manager";

describe("Playground Stage Components & Configurations", () => {
  it("should define all stage component functions", () => {
    expect(typeof AccordionStage).toBe("function");
    expect(typeof AlertStage).toBe("function");
    expect(typeof AvatarStage).toBe("function");
    expect(typeof BadgeStage).toBe("function");
    expect(typeof BannerStage).toBe("function");
    expect(typeof BreadcrumbStage).toBe("function");
    expect(typeof ButtonStage).toBe("function");
    expect(typeof CardStage).toBe("function");
    expect(typeof CheckboxStage).toBe("function");
    expect(typeof CommandStage).toBe("function");
    expect(typeof DialogStage).toBe("function");
    expect(typeof DropdownMenuStage).toBe("function");
    expect(typeof FieldStage).toBe("function");
    expect(typeof InputGroupStage).toBe("function");
    expect(typeof InputStage).toBe("function");
    expect(typeof KbdStage).toBe("function");
    expect(typeof LabelStage).toBe("function");
    expect(typeof ListStage).toBe("function");
    expect(typeof RadioGroupStage).toBe("function");
    expect(typeof SelectStage).toBe("function");
    expect(typeof SeparatorStage).toBe("function");
    expect(typeof SheetStage).toBe("function");
    expect(typeof SkeletonStage).toBe("function");
    expect(typeof SpinnerStage).toBe("function");
    expect(typeof SwitchStage).toBe("function");
    expect(typeof TabsStage).toBe("function");
    expect(typeof TextareaStage).toBe("function");
    expect(typeof ThemeManagerStage).toBe("function");
  });

  it("should define valid configs for each stage component", () => {
    const configs = [
      accordionConfig, alertConfig, avatarConfig, badgeConfig, bannerConfig,
      breadcrumbConfig, buttonConfig, cardConfig, checkboxConfig, commandConfig,
      dialogConfig, dropdownConfig, fieldConfig, inputGroupConfig, inputConfig, kbdConfig,
      labelConfig, listConfig, radioGroupConfig, selectConfig, separatorConfig,
      sheetConfig, skeletonConfig, spinnerConfig, switchConfig, tabsConfig, textareaConfig, themeManagerConfig
    ];

    configs.forEach((cfg) => {
      expect(cfg).toBeDefined();
      expect(cfg.id).toBeDefined();
      expect(cfg.name).toBeDefined();
      expect(Array.isArray(cfg.props)).toBe(true);
    });
  });
});
