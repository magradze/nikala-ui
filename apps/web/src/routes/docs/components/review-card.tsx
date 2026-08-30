import { Component, For } from "solid-js";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Seo } from "@/components/seo";
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
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    name: "Alex River",
    username: "@alexriver",
    role: "Staff Engineer at Vercel",
    body: "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works out of the box.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 days ago",
  },
  {
    name: "Sarah Chen",
    username: "@sarahc_dev",
    role: "Frontend Lead",
    body: "Tailwind v4 integration is flawless. Design tokens make dark mode and custom palettes completely seamless.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week ago",
  },
  {
    name: "Davit Kakhidze",
    username: "@davit_k",
    role: "Founder at Studio",
    body: "The copy-paste model gives complete ownership. No locked dependencies, just clean, readable TypeScript components.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 weeks ago",
  },
];

/* Code Snippets */
const importCode = `import {
  ReviewCard,
  ReviewHeader,
  ReviewProfile,
  ReviewAvatar,
  ReviewAuthor,
  ReviewRating,
  ReviewBody,
  ReviewFooter,
} from "@/components/ui/review-card";`;

const defaultCode = `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <For each={reviews}>
    {(review) => (
      <ReviewCard variant="default">
        <ReviewHeader>
          <ReviewProfile>
            <ReviewAvatar src={review.img} alt={review.name} />
            <ReviewAuthor
              name={review.name}
              role={review.role}
              verified={true}
            />
          </ReviewProfile>
          <ReviewRating value={review.rating} />
        </ReviewHeader>

        <ReviewBody>
          "{review.body}"
        </ReviewBody>

        <ReviewFooter>
          <span>Verified Buyer</span>
          <span>{review.date}</span>
        </ReviewFooter>
      </ReviewCard>
    )}
  </For>
</div>`;

const variantsCode = `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* 1. Default Card */}
  <ReviewCard variant="default">
    <ReviewHeader>
      <ReviewProfile>
        <ReviewAvatar fallback="AR" />
        <ReviewAuthor name="Alex River" username="@alexriver" verified />
      </ReviewProfile>
      <ReviewRating value={5} />
    </ReviewHeader>
    <ReviewBody>Default card variant with subtle shadow and border.</ReviewBody>
  </ReviewCard>

  {/* 2. Flat Style */}
  <ReviewCard variant="flat">
    <ReviewHeader>
      <ReviewProfile>
        <ReviewAvatar fallback="SC" />
        <ReviewAuthor name="Sarah Chen" username="@sarahc" verified />
      </ReviewProfile>
      <ReviewRating value={5} />
    </ReviewHeader>
    <ReviewBody>Flat variant with muted background and no outer border.</ReviewBody>
  </ReviewCard>

  {/* 3. Bordered High-Contrast */}
  <ReviewCard variant="bordered">
    <ReviewHeader>
      <ReviewProfile>
        <ReviewAvatar fallback="DK" />
        <ReviewAuthor name="Davit K." username="@davit" verified />
      </ReviewProfile>
      <ReviewRating value={5} />
    </ReviewHeader>
    <ReviewBody>Bordered variant with high contrast border width.</ReviewBody>
  </ReviewCard>
</div>`;

export default function ReviewCardDocPage() {
  return (
    <>
      <Seo
        title="Review Card Component — SolidJS Tailwind v4"
        description="A versatile, structured card component for user testimonials, ratings, and social proof in SolidJS."
        path="/docs/components/review-card"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Review Card"
          badge="Data Display"
          description="A versatile, structured card component for customer testimonials, product ratings, verified buyer badges, and social proof."
        />

        {/* Hero Preview */}
        <ComponentPreview name="review-card" code={defaultCode} allowOverflow={true}>
          <div class="w-full max-w-4xl p-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <For each={reviews}>
                {(review) => (
                  <ReviewCard variant="default">
                    <ReviewHeader>
                      <ReviewProfile>
                        <ReviewAvatar src={review.img} alt={review.name} />
                        <ReviewAuthor
                          name={review.name}
                          role={review.role}
                          verified={true}
                        />
                      </ReviewProfile>
                      <ReviewRating value={review.rating} />
                    </ReviewHeader>

                    <ReviewBody>
                      "{review.body}"
                    </ReviewBody>

                    <ReviewFooter>
                      <span class="font-medium text-foreground/80">Verified User</span>
                      <span>{review.date}</span>
                    </ReviewFooter>
                  </ReviewCard>
                )}
              </For>
            </div>
          </div>
        </ComponentPreview>

        {/* Usage Section */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Example 1: Style Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Visual Style Variants</h3>
            <p class="text-sm text-muted-foreground">
              Choose between <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">flat</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bordered</code> presentations.
            </p>
            <ComponentPreview name="review-card" code={variantsCode} allowOverflow={true}>
              <div class="w-full max-w-4xl p-2">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ReviewCard variant="default">
                    <ReviewHeader>
                      <ReviewProfile>
                        <ReviewAvatar fallback="AR" />
                        <ReviewAuthor name="Alex River" username="@alexriver" verified />
                      </ReviewProfile>
                      <ReviewRating value={5} />
                    </ReviewHeader>
                    <ReviewBody>Default card variant with subtle shadow and border.</ReviewBody>
                  </ReviewCard>

                  <ReviewCard variant="flat">
                    <ReviewHeader>
                      <ReviewProfile>
                        <ReviewAvatar fallback="SC" />
                        <ReviewAuthor name="Sarah Chen" username="@sarahc" verified />
                      </ReviewProfile>
                      <ReviewRating value={5} />
                    </ReviewHeader>
                    <ReviewBody>Flat variant with muted background and no outer border.</ReviewBody>
                  </ReviewCard>

                  <ReviewCard variant="bordered">
                    <ReviewHeader>
                      <ReviewProfile>
                        <ReviewAvatar fallback="DK" />
                        <ReviewAuthor name="Davit K." username="@davit" verified />
                      </ReviewProfile>
                      <ReviewRating value={5} />
                    </ReviewHeader>
                    <ReviewBody>Bordered variant with high contrast border width.</ReviewBody>
                  </ReviewCard>
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ReviewCard"
            description="Root card container managing visual styles and responsive spacing."
            items={[
              {
                prop: "variant",
                type: '"default" | "bordered" | "flat" | "glass"',
                default: '"default"',
                description: "Visual style variant.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="ReviewAuthor"
            description="Author name, verification checkmark badge, and subtitle/handle."
            items={[
              {
                prop: "name",
                type: "string",
                description: "Reviewer full name.",
              },
              {
                prop: "username",
                type: "string",
                default: "undefined",
                description: "Reviewer handle (e.g. @username).",
              },
              {
                prop: "role",
                type: "string",
                default: "undefined",
                description: "Reviewer job title or company.",
              },
              {
                prop: "verified",
                type: "boolean",
                default: "false",
                description: "Shows a verified checkmark badge next to the name.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="ReviewRating"
            description="Star rating rating score display."
            items={[
              {
                prop: "value",
                type: "number",
                default: "5",
                description: "Number of filled active stars (1-5).",
              },
              {
                prop: "max",
                type: "number",
                default: "5",
                description: "Maximum star count.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="ReviewAvatar"
            description="Reviewer profile image avatar with automatic fallback initials."
            items={[
              {
                prop: "src",
                type: "string",
                default: "undefined",
                description: "Avatar image URL destination.",
              },
              {
                prop: "fallback",
                type: "string",
                default: "undefined",
                description: "Fallback initials if image fails or is absent.",
              },
            ]}
          />

          <DocApiTable
            title="ReviewBody"
            description="Main quote or testimonial text content."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="ReviewFooter"
            description="Bottom row container for date timestamps and platform tags."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{
            title: "Marquee",
            href: "/docs/components/marquee",
          }}
          next={{
            title: "Stat",
            href: "/docs/components/stat",
          }}
        />
      </div>
    </>
  );
}
