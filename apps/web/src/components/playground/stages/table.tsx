import { For } from "solid-js";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "table",
  name: "Table",
  props: [
    { name: "showFooter", label: "Show Footer", type: "boolean", default: true },
    { name: "showBadges", label: "Status Badges", type: "boolean", default: true },
    { name: "showCaption", label: "Show Caption", type: "boolean", default: false },
    { name: "captionText", label: "Caption Text", type: "text", default: "A list of recent transactions." },
    { name: "dense", label: "Compact Padding", type: "boolean", default: false },
    { name: "rowsCount", label: "Rows", type: "select", options: ["3", "4", "5"], default: "4" },
  ],
  generateCode: (v) => `<div class="rounded-lg border border-border bg-card overflow-hidden">
  <Table>
    ${v.showCaption ? `<TableCaption>${v.captionText || "A list of recent transactions."}</TableCaption>\n    ` : ""}<TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium font-mono">INV-001</TableCell>
        <TableCell>${v.showBadges ? `<Badge variant="outline">Paid</Badge>` : "Paid"}</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right font-mono">$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium font-mono">INV-002</TableCell>
        <TableCell>${v.showBadges ? `<Badge variant="secondary">Pending</Badge>` : "Pending"}</TableCell>
        <TableCell>PayPal</TableCell>
        <TableCell class="text-right font-mono">$150.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium font-mono">INV-003</TableCell>
        <TableCell>${v.showBadges ? `<Badge variant="destructive">Unpaid</Badge>` : "Unpaid"}</TableCell>
        <TableCell>Bank Transfer</TableCell>
        <TableCell class="text-right font-mono">$350.00</TableCell>
      </TableRow>
    </TableBody>
    ${v.showFooter ? `<TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell class="text-right font-mono font-bold">$750.00</TableCell>
      </TableRow>
    </TableFooter>` : ""}
  </Table>
</div>`,
};

export default function TableStage(props: StageProps) {
  const data = [
    { id: "INV-001", status: "Paid", variant: "outline" as const, method: "Credit Card", amount: "$250.00" },
    { id: "INV-002", status: "Pending", variant: "secondary" as const, method: "PayPal", amount: "$150.00" },
    { id: "INV-003", status: "Unpaid", variant: "destructive" as const, method: "Bank Transfer", amount: "$350.00" },
    { id: "INV-004", status: "Paid", variant: "outline" as const, method: "Credit Card", amount: "$450.00" },
    { id: "INV-005", status: "Paid", variant: "outline" as const, method: "Apple Pay", amount: "$550.00" },
  ];

  const visibleData = () => {
    const count = parseInt(props.values.rowsCount || "4", 10);
    return data.slice(0, count);
  };

  const totalAmount = () => {
    const sum = visibleData().reduce((acc, curr) => {
      return acc + parseFloat(curr.amount.replace("$", ""));
    }, 0);
    return `$${sum.toFixed(2)}`;
  };

  const cellClass = () => (props.values.dense ? "p-2" : "p-4");
  const headClass = () => (props.values.dense ? "h-8 px-2" : "h-10 px-4");

  return (
    <div class="w-full max-w-lg rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        {props.values.showCaption && (
          <TableCaption>{props.values.captionText || "A list of recent transactions."}</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead class={`w-[100px] ${headClass()}`}>Invoice</TableHead>
            <TableHead class={headClass()}>Status</TableHead>
            <TableHead class={headClass()}>Method</TableHead>
            <TableHead class={`text-right ${headClass()}`}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={visibleData()}>
            {(item) => (
              <TableRow>
                <TableCell class={`font-medium font-mono ${cellClass()}`}>{item.id}</TableCell>
                <TableCell class={cellClass()}>
                  {props.values.showBadges ? (
                    <Badge variant={item.variant} class="text-xs">{item.status}</Badge>
                  ) : (
                    item.status
                  )}
                </TableCell>
                <TableCell class={cellClass()}>{item.method}</TableCell>
                <TableCell class={`text-right font-mono ${cellClass()}`}>{item.amount}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
        {props.values.showFooter && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} class={cellClass()}>Total</TableCell>
              <TableCell class={`text-right font-mono font-bold ${cellClass()}`}>
                {totalAmount()}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
