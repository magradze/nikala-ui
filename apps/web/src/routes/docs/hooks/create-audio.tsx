import { createAudio } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Progress } from "@/components/ui/progress";

const importCode = `import { createAudio, createVideo } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { isPlaying, currentTime, duration, toggle, seek, setVolume, volume } = createAudio(
  "/music.mp3"
);

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Progress value={duration() ? (currentTime() / duration()) * 100 : 0} />
    <button onClick={toggle} class="px-4 py-2 bg-primary text-primary-foreground rounded-md">
      {isPlaying() ? "Pause" : "Play"}
    </button>
  </div>
);`;

export function AudioDemo() {
  const sampleAudioUrl = "/music.mp3";
  const { isPlaying, currentTime, duration, toggle, volume, setVolume, isMuted, toggleMute } = createAudio(
    sampleAudioUrl
  );

  return (
    <div class="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-4 shadow-sm">
      <div class="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>{Math.floor(currentTime())}s</span>
        <span class="text-foreground font-semibold">Audio Controller</span>
        <span>{Math.floor(duration())}s</span>
      </div>

      <Progress value={duration() ? (currentTime() / duration()) * 100 : 0} />

      <div class="flex items-center justify-between gap-2">
        <button
          onClick={() => toggle()}
          class="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isPlaying() ? "Pause Audio" : "Play Audio"}
        </button>

        <button
          onClick={() => toggleMute()}
          class="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          {isMuted() ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}

export default function CreateAudioDocPage() {
  return (
    <>
      <Seo
        title="createAudio & createVideo Primitives"
        description="SolidJS reactive primitives for controlling HTML audio and video playback, duration, volume, and seeking."
        path="/docs/hooks/create-audio"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createAudio & createVideo"
          badge="primitive"
          description="Reactive primitives for controlling audio and video playback, state, duration, volume levels, and seek positioning."
        />

        <ComponentPreview name="create-audio" code={basicUsageCode}>
          <AudioDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Reactive Audio Player Control</h3>
            <p class="text-sm text-muted-foreground">
              Pass an audio source URL to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createAudio(url)</code> to control play, pause, volume, and playback positioning reactively.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateAudioOptions"
            items={[
              {
                prop: "playing",
                type: "boolean | Accessor<boolean | undefined>",
                default: "undefined",
                description: "Controlled playing state signal or boolean value.",
              },
              {
                prop: "defaultPlaying",
                type: "boolean",
                default: "false",
                description: "Uncontrolled default playing state.",
              },
              {
                prop: "muted",
                type: "boolean | Accessor<boolean | undefined>",
                default: "undefined",
                description: "Controlled muted state signal or boolean value.",
              },
              {
                prop: "defaultMuted",
                type: "boolean",
                default: "false",
                description: "Uncontrolled default muted state.",
              },
              {
                prop: "volume",
                type: "number",
                default: "1.0",
                description: "Initial volume level between 0.0 and 1.0.",
              },
              {
                prop: "loop",
                type: "boolean",
                default: "false",
                description: "Whether the audio should loop continuously upon finishing.",
              },
              {
                prop: "onPlayingChange",
                type: "(playing: boolean) => void",
                default: "-",
                description: "Callback fired whenever playing state changes.",
              },
              {
                prop: "onMutedChange",
                type: "(muted: boolean) => void",
                default: "-",
                description: "Callback fired whenever muted state changes.",
              },
            ]}
          />

          <DocApiTable
            title="CreateAudioReturn"
            items={[
              {
                prop: "isPlaying",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether audio is currently playing.",
              },
              {
                prop: "currentTime",
                type: "Accessor<number>",
                default: "-",
                description: "Signal indicating current playback position in seconds.",
              },
              {
                prop: "duration",
                type: "Accessor<number>",
                default: "-",
                description: "Signal indicating total audio track duration in seconds.",
              },
              {
                prop: "isMuted",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether audio is currently muted.",
              },
              {
                prop: "play",
                type: "() => Promise<void>",
                default: "-",
                description: "Plays the audio element.",
              },
              {
                prop: "pause",
                type: "() => void",
                default: "-",
                description: "Pauses playback.",
              },
              {
                prop: "toggle",
                type: "() => void",
                default: "-",
                description: "Toggles play/pause state.",
              },
              {
                prop: "toggleMute",
                type: "() => void",
                default: "-",
                description: "Toggles mute status.",
              },
              {
                prop: "seek",
                type: "(time: number) => void",
                default: "-",
                description: "Seeks to specified timestamp in seconds.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createFullscreen Primitive", href: "/docs/hooks/create-fullscreen" }}
          next={{ title: "createOrientation Primitive", href: "/docs/hooks/create-orientation" }}
        />
      </div>
    </>
  );
}
