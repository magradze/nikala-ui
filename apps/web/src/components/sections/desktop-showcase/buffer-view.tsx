export function getBufferCode(index: number) {
  return `import { createSignal } from "solid-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DocumentBuffer${index}() {
  const [count, setCount] = createSignal(0);

  return (
    <Card class="p-6 space-y-3">
      <h3 class="text-lg font-bold">Document Buffer #${index}</h3>
      <p class="text-xs text-muted-foreground">Reactive count: {count()}</p>
      <Button onClick={() => setCount(c => c + 1)}>
        Increment Signal
      </Button>
    </Card>
  );
}`;
}
