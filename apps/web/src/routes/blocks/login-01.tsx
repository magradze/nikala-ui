import { Title, Meta } from "@solidjs/meta";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { Login01 } from "@/components/blocks/login-01";
import { BLOCKS_LIST } from "@/config/blocks";

export default function Login01BlockPage() {
  const block = BLOCKS_LIST.find((b) => b.id === "login-01")!;

  return (
    <>
      <Title>{block.title} — Nikala UI</Title>
      <Meta name="description" content={block.description} />

      <div class="space-y-8 pb-16">
        <BlockViewer block={block}>
          <Login01 />
        </BlockViewer>
      </div>
    </>
  );
}
