import { Title, Meta } from "@solidjs/meta";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { ForgotPassword01 } from "@/components/blocks/forgot-password-01";
import { BLOCKS_LIST } from "@/config/blocks";

export default function ForgotPassword01BlockPage() {
  const block = BLOCKS_LIST.find((b) => b.id === "forgot-password-01")!;

  return (
    <>
      <Title>{block?.title || "Forgot Password 01"} — Nikala UI</Title>
      <Meta name="description" content={block?.description || "Password recovery and reset block"} />

      <div class="space-y-8 pb-16">
        <BlockViewer block={block}>
          <ForgotPassword01 />
        </BlockViewer>
      </div>
    </>
  );
}
