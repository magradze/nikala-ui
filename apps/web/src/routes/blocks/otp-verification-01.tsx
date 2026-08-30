import { Title, Meta } from "@solidjs/meta";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { OtpVerification01 } from "@/components/blocks/otp-verification-01";
import { BLOCKS_LIST } from "@/config/blocks";

export default function OtpVerification01BlockPage() {
  const block = BLOCKS_LIST.find((b) => b.id === "otp-verification-01")!;

  return (
    <>
      <Title>{block?.title || "OTP Verification 01"} — Nikala UI</Title>
      <Meta name="description" content={block?.description || "Two-Factor OTP Verification block"} />

      <div class="space-y-8 pb-16">
        <BlockViewer block={block}>
          <OtpVerification01 />
        </BlockViewer>
      </div>
    </>
  );
}
