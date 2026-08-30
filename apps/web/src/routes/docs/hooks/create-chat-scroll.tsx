// src/routes/docs/hooks/create-chat-scroll.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { createChatScroll } from "@/hooks/create-chat-scroll";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createSignal, For, Show } from "solid-js";
import { ArrowDown, Send } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { createChatScroll } from "@/hooks/create-chat-scroll";`;

const defaultCode = `const [messages, setMessages] = createSignal([
  { id: 1, sender: "bot", text: "Connecting to agent streaming runtime..." },
  { id: 2, sender: "me", text: "Explain SolidJS fine-grained signals." },
]);

let chatContainer!: HTMLDivElement;

const chatScroll = createChatScroll({
  target: () => chatContainer,
  trigger: () => messages().length,
});

const sendReply = () => {
  setMessages((prev) => [
    ...prev,
    { id: Date.now(), sender: "bot", text: \`Streaming token chunk #\${prev.length + 1} directly to the DOM without virtual diffing.\` },
  ]);
};

return (
  <div class="relative w-full max-w-sm border border-border rounded-lg bg-card p-4">
    <div ref={chatContainer} class="h-48 overflow-y-auto space-y-3 p-1">
      <For each={messages()}>
        {(msg) => (
          <Message align={msg.sender === "me" ? "end" : "start"}>
            <MessageContent>
              <Bubble variant={msg.sender === "me" ? "default" : "muted"}>
                <BubbleContent>{msg.text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        )}
      </For>
    </div>

    <Show when={chatScroll.isScrolledUp()}>
      <Button
        variant="secondary"
        size="sm"
        class="absolute bottom-16 right-6 shadow-md text-xs gap-1 rounded-md"
        onClick={() => chatScroll.scrollToBottom()}
      >
        <ArrowDown class="size-3" /> Scroll to bottom
      </Button>
    </Show>

    <div class="mt-3 pt-3 border-t border-border flex gap-2">
      <Button size="sm" onClick={sendReply} class="w-full">
        Generate Response Stream
      </Button>
    </div>
  </div>
);`;

export default function CreateChatScrollDocPage() {
  const [messages, setMessages] = createSignal([
    { id: 1, sender: "bot", text: "Connecting to agent streaming runtime..." },
    { id: 2, sender: "me", text: "Explain SolidJS fine-grained signals." },
    { id: 3, sender: "bot", text: "SolidJS signals track dependencies at the exact DOM node level, bypassing virtual DOM diffing entirely." },
  ]);

  let chatContainer!: HTMLDivElement;

  const chatScroll = createChatScroll({
    target: () => chatContainer,
    trigger: () => messages().length,
  });

  const sendReply = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: prev.length % 2 === 0 ? "bot" : "me", text: `Token payload #${prev.length + 1} streamed to chat container.` },
    ]);
  };

  return (
    <>
      <Seo
        title="createChatScroll Hook"
        description="SolidJS reactive primitive for automated chat container scrolling with manual scroll-up detection."
        path="/docs/hooks/create-chat-scroll"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="createChatScroll"
          badge="Reactive Hook"
          description="A SolidJS reactive primitive for automated chat scrolling, sticky bottom alignment during live streaming, and scroll-up user detection."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="create-chat-scroll" code={defaultCode}>
          <div class="flex flex-col items-center justify-center p-6 w-full">
            <div class="relative w-full max-w-sm border border-border rounded-lg bg-card p-4 shadow-sm">
              <div
                ref={chatContainer}
                class="h-52 overflow-y-auto space-y-3 p-1 pr-2 scroll-smooth"
              >
                <For each={messages()}>
                  {(msg) => (
                    <Message align={msg.sender === "me" ? "end" : "start"}>
                      <MessageAvatar>
                        <Avatar>
                          <AvatarFallback class={msg.sender === "me" ? "bg-primary text-primary-foreground text-xs" : "bg-muted text-foreground text-xs"}>
                            {msg.sender === "me" ? "GM" : "AI"}
                          </AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <Bubble variant={msg.sender === "me" ? "default" : "muted"}>
                          <BubbleContent>{msg.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  )}
                </For>
              </div>

              <Show when={chatScroll.isScrolledUp()}>
                <div class="absolute bottom-16 right-6 z-20 animate-in fade-in zoom-in-95">
                  <Button
                    variant="outline"
                    size="sm"
                    class="shadow-md text-xs gap-1 rounded-md bg-background/95 backdrop-blur-xs"
                    onClick={() => chatScroll.scrollToBottom({ smooth: true })}
                  >
                    <ArrowDown class="size-3 text-primary animate-bounce" />
                    <span>Scroll to bottom</span>
                  </Button>
                </div>
              </Show>

              <div class="mt-3 pt-3 border-t border-border flex gap-2">
                <Button size="sm" onClick={sendReply} class="w-full gap-1">
                  <Send class="size-3.5" />
                  <span>Stream Next Message</span>
                </Button>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* 3. Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateChatScrollOptions"
            items={[
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "required",
                description: "The scrollable container DOM element reference or accessor.",
              },
              {
                prop: "trigger",
                type: "Accessor<any>",
                default: "undefined",
                description: "Accessor signal (e.g. messages length or stream buffer) that triggers auto-scroll when changed.",
              },
              {
                prop: "threshold",
                type: "number",
                default: "40",
                description: "Pixel distance from bottom to consider the viewport actively at the bottom.",
              },
              {
                prop: "behavior",
                type: '"smooth" | "auto"',
                default: '"smooth"',
                description: "Scrolling transition behavior.",
              },
            ]}
          />

          <DocApiTable
            title="CreateChatScrollReturn"
            items={[
              {
                prop: "isAtBottom",
                type: "Accessor<boolean>",
                default: "true",
                description: "Indicates whether the container is currently scrolled to the bottom.",
              },
              {
                prop: "isScrolledUp",
                type: "Accessor<boolean>",
                default: "false",
                description: "Indicates whether the user has scrolled up to read past messages.",
              },
              {
                prop: "scrollToBottom",
                type: "(options?: { smooth?: boolean }) => void",
                default: "function",
                description: "Programmatically scrolls container immediately or smoothly to the bottom.",
              },
            ]}
          />
        </div>

        {/* 5. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createPagination", href: "/docs/hooks/create-pagination" }}
          next={{ title: "Message Component", href: "/docs/components/message" }}
        />
      </div>
    </>
  );
}
