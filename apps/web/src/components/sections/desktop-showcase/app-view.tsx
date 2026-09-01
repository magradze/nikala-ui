export function getAppCode(platform: string) {
  return `import { createSignal } from "solid-js";
import { Titlebar, TitlebarControls, TitlebarTabs } from "@/components/ui/titlebar";
import { createDocumentTabs } from "@/hooks/create-document-tabs";

export function DesktopApp() {
  const tabs = createDocumentTabs({
    initialTabs: [{ id: "App.tsx", title: "App.tsx" }]
  });
  const [platform, setPlatform] = createSignal("${platform}");

  return (
    <div class="h-screen w-screen flex flex-col bg-background">
      {/* 1. Frameless Native Titlebar */}
      <Titlebar platform={platform()}>
        <TitlebarControls />
        <TitlebarTabs manager={tabs} variant="pills" />
      </Titlebar>

      {/* 2. Main Studio Canvas */}
      <main class="flex-1 p-6 overflow-auto">
        <h1 class="text-xl font-bold">Nikala Studio Canvas</h1>
      </main>
    </div>
  );
}`;
}
