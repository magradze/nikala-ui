// src/routes/docs/components/table.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { For, createSignal } from "solid-js";
import { MoreHorizontal, ArrowUpDown } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";`;

const defaultCode = `<Table>
  <TableHeader>
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
      <TableCell><Badge variant="outline">Paid</Badge></TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right font-mono">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium font-mono">INV-002</TableCell>
      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell class="text-right font-mono">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium font-mono">INV-003</TableCell>
      <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell class="text-right font-mono">$350.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell class="text-right font-mono font-bold">$750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`;

const teamCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Member</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
      <TableHead class="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <div class="flex items-center gap-3">
          <Avatar class="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Niko" />
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
          <div class="flex flex-col">
            <span class="font-medium leading-none">Niko Pirosmani</span>
            <span class="text-xs text-muted-foreground">niko@nikala.dev</span>
          </div>
        </div>
      </TableCell>
      <TableCell>Lead Artist</TableCell>
      <TableCell><Badge variant="outline" class="text-emerald-500 border-emerald-500/30">Active</Badge></TableCell>
      <TableCell class="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <div class="flex items-center gap-3">
          <Avatar class="h-8 w-8">
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
          <div class="flex flex-col">
            <span class="font-medium leading-none">Elene Kakabadze</span>
            <span class="text-xs text-muted-foreground">elene@nikala.dev</span>
          </div>
        </div>
      </TableCell>
      <TableCell>Designer</TableCell>
      <TableCell><Badge variant="secondary">Offline</Badge></TableCell>
      <TableCell class="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const selectableCode = `const [selected, setSelected] = createSignal<string[]>(["INV-001"]);

<Table>
  <TableHeader>
    <TableRow>
      <TableHead class="w-12">
        <Checkbox />
      </TableHead>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state={selected().includes("INV-001") ? "selected" : undefined}>
      <TableCell>
        <Checkbox checked={selected().includes("INV-001")} />
      </TableCell>
      <TableCell class="font-medium font-mono">INV-001</TableCell>
      <TableCell><Badge variant="outline">Paid</Badge></TableCell>
      <TableCell class="text-right font-mono">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const tanstackSnippet = `import { createSolidTable, getCoreRowModel, flexRender } from "@tanstack/solid-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// Combine TanStack Table's headless logic with Nikala UI's pure JSX table components
const table = createSolidTable({
  data: data(),
  columns,
  getCoreRowModel: getCoreRowModel(),
});

return (
  <Table>
    <TableHeader>
      <For each={table.getHeaderGroups()}>
        {(headerGroup) => (
          <TableRow>
            <For each={headerGroup.headers}>
              {(header) => (
                <TableHead>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )}
            </For>
          </TableRow>
        )}
      </For>
    </TableHeader>
    <TableBody>
      <For each={table.getRowModel().rows}>
        {(row) => (
          <TableRow>
            <For each={row.getVisibleCells()}>
              {(cell) => (
                <TableCell>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              )}
            </For>
          </TableRow>
        )}
      </For>
    </TableBody>
  </Table>
);`;

export default function TableDocsPage() {
  const invoices = [
    { id: "INV-001", status: "Paid", variant: "outline" as const, method: "Credit Card", amount: "$250.00" },
    { id: "INV-002", status: "Pending", variant: "secondary" as const, method: "PayPal", amount: "$150.00" },
    { id: "INV-003", status: "Unpaid", variant: "destructive" as const, method: "Bank Transfer", amount: "$350.00" },
    { id: "INV-004", status: "Paid", variant: "outline" as const, method: "Credit Card", amount: "$450.00" },
    { id: "INV-005", status: "Paid", variant: "outline" as const, method: "Apple Pay", amount: "$550.00" },
  ];

  const [selectedIds, setSelectedIds] = createSignal<string[]>(["INV-001", "INV-003"]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds().length === invoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(invoices.map((inv) => inv.id));
    }
  };

  return (
    <>
      <Seo
        title="Table Component"
        description="A responsive and accessible table component for structured data presentation in SolidJS."
        path="/docs/components/table"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Table"
          badge="compound"
          description="A responsive, accessible data table component with headers, rows, cells, footer summaries, and selectable rows."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="table" code={defaultCode}>
          <div class="w-full max-w-2xl rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={invoices}>
                  {(invoice) => (
                    <TableRow>
                      <TableCell class="font-medium font-mono">{invoice.id}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.variant}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>{invoice.method}</TableCell>
                      <TableCell class="text-right font-mono">{invoice.amount}</TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell class="text-right font-mono font-bold">$1,750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Team / Users Example */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Avatars & Actions</h3>
            <p class="text-sm text-muted-foreground">
              Rich compound cells combining avatars, titles, roles, status badges, and action buttons.
            </p>
            <ComponentPreview name="table" code={teamCode}>
              <div class="w-full max-w-2xl rounded-lg border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead class="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div class="flex items-center gap-3">
                          <Avatar class="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Niko" />
                            <AvatarFallback>NP</AvatarFallback>
                          </Avatar>
                          <div class="flex flex-col">
                            <span class="font-medium leading-none">Niko Pirosmani</span>
                            <span class="text-xs text-muted-foreground">niko@nikala.dev</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell class="text-muted-foreground">Lead Artist</TableCell>
                      <TableCell>
                        <Badge variant="outline" class="text-emerald-500 border-emerald-500/30">Active</Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <Button variant="ghost" size="sm" class="h-8 px-2 text-xs">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div class="flex items-center gap-3">
                          <Avatar class="h-8 w-8">
                            <AvatarFallback>EK</AvatarFallback>
                          </Avatar>
                          <div class="flex flex-col">
                            <span class="font-medium leading-none">Elene Kakabadze</span>
                            <span class="text-xs text-muted-foreground">elene@nikala.dev</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell class="text-muted-foreground">Designer</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Offline</Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <Button variant="ghost" size="sm" class="h-8 px-2 text-xs">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div class="flex items-center gap-3">
                          <Avatar class="h-8 w-8">
                            <AvatarFallback>DG</AvatarFallback>
                          </Avatar>
                          <div class="flex flex-col">
                            <span class="font-medium leading-none">David Guramishvili</span>
                            <span class="text-xs text-muted-foreground">david@nikala.dev</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell class="text-muted-foreground">Engineer</TableCell>
                      <TableCell>
                        <Badge variant="outline" class="text-emerald-500 border-emerald-500/30">Active</Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <Button variant="ghost" size="sm" class="h-8 px-2 text-xs">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ComponentPreview>
          </div>

          {/* Selectable Rows Example */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Selectable Rows</h3>
            <p class="text-sm text-muted-foreground">
              Rows highlight when selected via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">data-state="selected"</code> attribute.
            </p>
            <ComponentPreview name="table" code={selectableCode}>
              <div class="w-full max-w-2xl rounded-lg border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="w-12">
                        <Checkbox
                          checked={selectedIds().length === invoices.length}
                          onChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead class="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead class="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <For each={invoices.slice(0, 3)}>
                      {(invoice) => {
                        const isSelected = () => selectedIds().includes(invoice.id);
                        return (
                          <TableRow data-state={isSelected() ? "selected" : undefined}>
                            <TableCell>
                              <Checkbox
                                checked={isSelected()}
                                onChange={() => toggleSelect(invoice.id)}
                                aria-label={`Select ${invoice.id}`}
                              />
                            </TableCell>
                            <TableCell class="font-medium font-mono">{invoice.id}</TableCell>
                            <TableCell>
                              <Badge variant={invoice.variant}>{invoice.status}</Badge>
                            </TableCell>
                            <TableCell>{invoice.method}</TableCell>
                            <TableCell class="text-right font-mono">{invoice.amount}</TableCell>
                          </TableRow>
                        );
                      }}
                    </For>
                  </TableBody>
                </Table>
              </div>
            </ComponentPreview>
          </div>

          {/* TanStack Table Integration */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Headless Integration (TanStack Solid Table)</h3>
            <p class="text-sm text-muted-foreground">
              Nikala UI's table primitives integrate seamlessly with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">@tanstack/solid-table</code> for powerful sorting, filtering, column visibility, and pagination.
            </p>
            <CodeBlock code={tanstackSnippet} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Table Components"
            items={[
              {
                prop: "Table",
                type: "Component<TableProps>",
                default: "-",
                description: "Root table element wrapped in a horizontal overflow container.",
              },
              {
                prop: "TableHeader",
                type: "Component<TableHeaderProps>",
                default: "-",
                description: "The thead wrapper element with bottom border divider styling.",
              },
              {
                prop: "TableBody",
                type: "Component<TableBodyProps>",
                default: "-",
                description: "The tbody container element for data rows.",
              },
              {
                prop: "TableFooter",
                type: "Component<TableFooterProps>",
                default: "-",
                description: "The tfoot element for summary and total aggregation rows.",
              },
              {
                prop: "TableRow",
                type: "Component<TableRowProps>",
                default: "-",
                description: "Interactive tr row element supporting hover highlight and data-state='selected'.",
              },
              {
                prop: "TableHead",
                type: "Component<TableHeadProps>",
                default: "-",
                description: "Header cell th element with muted text and vertical alignment.",
              },
              {
                prop: "TableCell",
                type: "Component<TableCellProps>",
                default: "-",
                description: "Standard data td cell element with consistent padding.",
              },
              {
                prop: "TableCaption",
                type: "Component<TableCaptionProps>",
                default: "-",
                description: "Accessible caption element rendered beneath table content.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Skeleton Component", href: "/docs/components/skeleton" }}
          next={{ title: "Tabs Component", href: "/docs/components/tabs" }}
        />
      </div>
    </>
  );
}
