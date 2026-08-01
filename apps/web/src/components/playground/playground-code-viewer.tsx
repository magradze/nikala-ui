import { CodeBlock } from "@/components/code-block";

interface PlaygroundCodeViewerProps {
  code: string;
}

export function PlaygroundCodeViewer(props: PlaygroundCodeViewerProps) {
  return (
    <div class="space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
        Generated TSX Code
      </h3>
      <CodeBlock code={props.code} lang="tsx" />
    </div>
  );
}