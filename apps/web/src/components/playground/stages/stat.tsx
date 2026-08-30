import { Show } from "solid-js";
import {
  Stat,
  StatGroup,
  StatHeader,
  StatLabel,
  StatIcon,
  StatValue,
  StatUnit,
  StatTrend,
  StatHelpText,
} from "@/components/ui/stat";
import { DollarSign, Users, CreditCard, Activity } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "stat",
  name: "Stat",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "flat", "bordered", "ghost"],
      default: "default",
    },
    {
      name: "columns",
      label: "Grid Columns",
      type: "select",
      options: ["4", "3", "2", "1"],
      default: "4",
    },
    {
      name: "trendType",
      label: "Trend Direction",
      type: "select",
      options: ["up", "down", "neutral"],
      default: "up",
    },
    {
      name: "showIcon",
      label: "Show Icon",
      type: "boolean",
      default: true,
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      default: "Total Revenue",
    },
    {
      name: "value",
      label: "Value",
      type: "text",
      default: "45,231.89",
    },
    {
      name: "unit",
      label: "Unit / Currency",
      type: "text",
      default: "$",
    },
    {
      name: "trendText",
      label: "Trend Text",
      type: "text",
      default: "+20.1%",
    },
    {
      name: "helpText",
      label: "Comparison Note",
      type: "text",
      default: "vs last month",
    },
  ],
  generateCode: (v) => {
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const cols = Number(v.columns) || 4;
    const colsStr = cols !== 4 ? ` columns={${cols}}` : "";
    const showIcon = v.showIcon !== false;
    const label = v.label || "Total Revenue";
    const value = v.value || "45,231.89";
    const unit = v.unit || "$";
    const trendType = (v.trendType as "up" | "down" | "neutral") || "up";
    const trendText = v.trendText || "+20.1%";
    const helpText = v.helpText || "vs last month";

    return `<StatGroup${colsStr}>
  <Stat${variantStr}>
    <StatHeader>
      <StatLabel>${label}</StatLabel>${
      showIcon
        ? `
      <StatIcon>
        <DollarSign class="size-4" />
      </StatIcon>`
        : ""
    }
    </StatHeader>
    <StatValue>${unit ? `\n      <StatUnit>${unit}</StatUnit>` : ""}
      <span>${value}</span>
    </StatValue>
    <StatHelpText>
      <StatTrend type="${trendType}">${trendText}</StatTrend>
      <span>${helpText}</span>
    </StatHelpText>
  </Stat>
</StatGroup>`;
  },
};

export default function StatStage(props: StageProps) {
  const variant = () => (props.values.variant as "default" | "flat" | "bordered" | "ghost") || "default";
  const columns = () => (Number(props.values.columns) || 4) as 1 | 2 | 3 | 4;
  const showIcon = () => props.values.showIcon !== false;
  const trendType = () => (props.values.trendType as "up" | "down" | "neutral") || "up";
  const label = () => String(props.values.label || "Total Revenue");
  const value = () => String(props.values.value || "45,231.89");
  const unit = () => String(props.values.unit || "$");
  const trendText = () => String(props.values.trendText || "+20.1%");
  const helpText = () => String(props.values.helpText || "vs last month");

  return (
    <div class="w-full max-w-4xl p-2 min-h-[220px] flex items-center justify-center">
      <StatGroup columns={columns()}>
        <Stat variant={variant()}>
          <StatHeader>
            <StatLabel>{label()}</StatLabel>
            <Show when={showIcon()}>
              <StatIcon>
                <DollarSign class="size-4" />
              </StatIcon>
            </Show>
          </StatHeader>
          <StatValue>
            <Show when={unit()}>
              <StatUnit>{unit()}</StatUnit>
            </Show>
            <span>{value()}</span>
          </StatValue>
          <StatHelpText>
            <StatTrend type={trendType()}>{trendText()}</StatTrend>
            <span>{helpText()}</span>
          </StatHelpText>
        </Stat>

        <Show when={columns() >= 2}>
          <Stat variant={variant()}>
            <StatHeader>
              <StatLabel>Subscriptions</StatLabel>
              <Show when={showIcon()}>
                <StatIcon>
                  <Users class="size-4" />
                </StatIcon>
              </Show>
            </StatHeader>
            <StatValue>+2,350</StatValue>
            <StatHelpText>
              <StatTrend type="up">+180.1%</StatTrend>
              <span>vs last month</span>
            </StatHelpText>
          </Stat>
        </Show>

        <Show when={columns() >= 3}>
          <Stat variant={variant()}>
            <StatHeader>
              <StatLabel>Sales Count</StatLabel>
              <Show when={showIcon()}>
                <StatIcon>
                  <CreditCard class="size-4" />
                </StatIcon>
              </Show>
            </StatHeader>
            <StatValue>12,234</StatValue>
            <StatHelpText>
              <StatTrend type="up">+19%</StatTrend>
              <span>vs last month</span>
            </StatHelpText>
          </Stat>
        </Show>

        <Show when={columns() >= 4}>
          <Stat variant={variant()}>
            <StatHeader>
              <StatLabel>Active Now</StatLabel>
              <Show when={showIcon()}>
                <StatIcon>
                  <Activity class="size-4" />
                </StatIcon>
              </Show>
            </StatHeader>
            <StatValue>+573</StatValue>
            <StatHelpText>
              <StatTrend type="down">-4.2%</StatTrend>
              <span>vs last hour</span>
            </StatHelpText>
          </Stat>
        </Show>
      </StatGroup>
    </div>
  );
}
