import { For } from "solid-js";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

export interface OrderItem {
  id: string;
  customer: string;
  avatar: string;
  initials: string;
  items: string;
  amount: string;
  status: "Completed" | "Processing" | "In Transit" | "Pending";
  date: string;
}

export const SAMPLE_ORDERS: OrderItem[] = [
  {
    id: "ORD-9105",
    customer: "Elena Rostomashvili",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    initials: "ER",
    items: "Pirosmani Canvas Art x2",
    amount: "$240.00",
    status: "Completed",
    date: "10 mins ago",
  },
  {
    id: "ORD-9104",
    customer: "Giorgi Kalandadze",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    initials: "GK",
    items: "SolidJS Masterclass + Book",
    amount: "$89.00",
    status: "Processing",
    date: "35 mins ago",
  },
  {
    id: "ORD-9103",
    customer: "Nino Beridze",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    initials: "NB",
    items: "Tailwind v4 UI Kit License",
    amount: "$199.00",
    status: "In Transit",
    date: "2 hours ago",
  },
  {
    id: "ORD-9102",
    customer: "Sandro Mchedlidze",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
    initials: "SM",
    items: "Enterprise Design System Bundle",
    amount: "$350.00",
    status: "Processing",
    date: "4 hours ago",
  },
  {
    id: "ORD-9101",
    customer: "Luka Tchelidze",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    initials: "LT",
    items: "MCP Agent Pro Subscription",
    amount: "$49.00",
    status: "Pending",
    date: "Yesterday",
  },
];

export interface ShowcaseTableProps {
  selectedOrderId: string;
  onSelectOrder: (order: OrderItem) => void;
}

export function ShowcaseTable(props: ShowcaseTableProps) {
  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" class="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[11px]">
            Completed
          </Badge>
        );
      case "Processing":
        return (
          <Badge variant="outline" class="border-primary/30 text-primary bg-primary/10 text-[11px]">
            Processing
          </Badge>
        );
      case "In Transit":
        return (
          <Badge variant="outline" class="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[11px]">
            In Transit
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="outline" class="border-border text-muted-foreground bg-muted text-[11px]">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div class="rounded-lg border border-border/80 bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader class="bg-muted/40">
          <TableRow>
            <TableHead class="w-[105px] text-xs">Order ID</TableHead>
            <TableHead class="text-xs">Customer</TableHead>
            <TableHead class="hidden sm:table-cell text-xs">Items</TableHead>
            <TableHead class="text-xs">Status</TableHead>
            <TableHead class="text-right text-xs">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={SAMPLE_ORDERS}>
            {(order) => {
              const isSelected = () => props.selectedOrderId === order.id;

              return (
                <TableRow
                  onClick={() => props.onSelectOrder(order)}
                  class={cn(
                    "cursor-pointer transition-colors text-left",
                    isSelected() && "bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  <TableCell class="font-mono text-xs font-semibold text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2.5">
                      <Avatar class="size-6">
                        <AvatarImage src={order.avatar} alt={order.customer} />
                        <AvatarFallback class="text-[10px]">{order.initials}</AvatarFallback>
                      </Avatar>
                      <div class="flex flex-col min-w-0">
                        <span class="text-xs font-medium text-foreground truncate">
                          {order.customer}
                        </span>
                        <span class="text-[10px] text-muted-foreground sm:hidden">
                          {order.date}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell class="hidden sm:table-cell text-xs text-muted-foreground">
                    {order.items}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell class="text-right font-medium text-xs">
                    {order.amount}
                  </TableCell>
                </TableRow>
              );
            }}
          </For>
        </TableBody>
        <TableFooter class="bg-muted/30 text-xs">
          <TableRow>
            <TableCell colSpan={4} class="font-medium text-muted-foreground">
              Total 5 Orders (Active Period)
            </TableCell>
            <TableCell class="text-right font-bold text-foreground">
              $927.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
