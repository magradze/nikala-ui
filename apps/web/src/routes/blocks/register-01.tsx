import { Title, Meta } from "@solidjs/meta";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { Register01 } from "@/components/blocks/register-01";
import { BLOCKS_LIST } from "@/config/blocks";

export default function Register01BlockPage() {
  const block = BLOCKS_LIST.find((b) => b.id === "register-01")!;

  return (
    <>
      <Title>{block?.title || "Register 01"} — Nikala UI</Title>
      <Meta name="description" content={block?.description || "Sign-up card with password strength meter"} />

      <div class="space-y-8 pb-16">
        <BlockViewer block={block}>
          <Register01 />
        </BlockViewer>
      </div>
    </>
  );
}
