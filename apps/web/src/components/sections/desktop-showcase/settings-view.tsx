export function getSettingsCode() {
  return `import { createSignal } from "solid-js";
import { useTheme } from "@/providers/theme-provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [hardwareAccel, setHardwareAccel] = createSignal(true);

  return (
    <div class="space-y-4 p-6 select-text">
      <h2 class="text-xl font-bold">Studio Preferences</h2>

      <Card class="p-4 space-y-3">
        <CardHeader class="p-0">
          <CardTitle class="text-sm">Appearance & Lighting</CardTitle>
        </CardHeader>
        <CardContent class="p-0 flex gap-2">
          <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
          <Button onClick={() => setAccent("emerald")}>Emerald Accent</Button>
        </CardContent>
      </Card>
    </div>
  );
}`;
}
