import {
  ReviewCard,
  ReviewHeader,
  ReviewProfile,
  ReviewAvatar,
  ReviewAuthor,
  ReviewRating,
  ReviewBody,
  ReviewFooter,
} from "@/components/ui/review-card";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "review-card",
  name: "Review Card",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "bordered", "flat", "glass"],
      default: "default",
    },
    {
      name: "rating",
      label: "Rating (Stars)",
      type: "select",
      options: ["5", "4", "3", "2", "1"],
      default: "5",
    },
    {
      name: "verified",
      label: "Verified Buyer",
      type: "boolean",
      default: true,
    },
    {
      name: "name",
      label: "Author Name",
      type: "text",
      default: "Alex River",
    },
    {
      name: "role",
      label: "Role / Subtitle",
      type: "text",
      default: "Staff Engineer at Vercel",
    },
    {
      name: "date",
      label: "Timestamp",
      type: "text",
      default: "2 days ago",
    },
    {
      name: "body",
      label: "Review Text",
      type: "text",
      default:
        "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works out of the box.",
    },
  ],
  generateCode: (v) => {
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const rating = Number(v.rating) || 5;
    const verifiedStr = v.verified !== false ? " verified" : "";
    const name = v.name || "Alex River";
    const role = v.role || "Staff Engineer at Vercel";
    const date = v.date || "2 days ago";
    const body =
      v.body ||
      "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works out of the box.";

    return `<ReviewCard${variantStr} class="w-full max-w-md">
  <ReviewHeader>
    <ReviewProfile>
      <ReviewAvatar fallback="${name.slice(0, 2).toUpperCase()}" />
      <ReviewAuthor
        name="${name}"
        role="${role}"${verifiedStr}
      />
    </ReviewProfile>
    <ReviewRating value={${rating}} />
  </ReviewHeader>

  <ReviewBody>
    "${body}"
  </ReviewBody>

  <ReviewFooter>
    <span>Verified User</span>
    <span>${date}</span>
  </ReviewFooter>
</ReviewCard>`;
  },
};

export default function ReviewCardStage(props: StageProps) {
  const variant = () => (props.values.variant as "default" | "bordered" | "flat" | "glass") || "default";
  const rating = () => Number(props.values.rating) || 5;
  const verified = () => props.values.verified !== false;
  const name = () => String(props.values.name || "Alex River");
  const role = () => String(props.values.role || "Staff Engineer at Vercel");
  const date = () => String(props.values.date || "2 days ago");
  const body = () =>
    String(
      props.values.body ||
        "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works out of the box."
    );

  return (
    <div class="w-full max-w-md p-4 flex items-center justify-center">
      <ReviewCard variant={variant()} class="w-full">
        <ReviewHeader>
          <ReviewProfile>
            <ReviewAvatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt={name()}
              fallback={name().slice(0, 2).toUpperCase()}
            />
            <ReviewAuthor
              name={name()}
              role={role()}
              verified={verified()}
            />
          </ReviewProfile>
          <ReviewRating value={rating()} />
        </ReviewHeader>

        <ReviewBody>
          "{body()}"
        </ReviewBody>

        <ReviewFooter>
          <span class="font-medium text-foreground/80">Verified User</span>
          <span>{date()}</span>
        </ReviewFooter>
      </ReviewCard>
    </div>
  );
}
