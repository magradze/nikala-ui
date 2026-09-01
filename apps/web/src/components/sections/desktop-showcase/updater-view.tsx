export function getUpdaterCode() {
  return `import { createAppUpdater } from "@/hooks/create-app-updater";
import { UpdaterModal } from "@/components/ui/updater-modal";

export function AppUpdater() {
  const updater = createAppUpdater({
    target: "x86_64-unknown-linux-gnu",
    autoCheck: true,
  });

  return (
    <UpdaterModal
      isOpen={updater.hasUpdate()}
      version={updater.updateInfo()?.version}
      notes={updater.updateInfo()?.body}
      onInstall={() => updater.downloadAndInstall()}
    />
  );
}
`;
}
