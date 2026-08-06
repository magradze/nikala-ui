import { createResource, Show, splitProps, type Component, type JSX } from "solid-js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface GithubButtonProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  repo?: string;
  class?: string;
}

/* Helper to format numbers: 1000 -> 1k, 1200 -> 1.2k */
function formatStars(count: number): string {
  if (count >= 1000) {
    const num = (count / 1000).toFixed(1);
    return num.endsWith(".0") ? `${Math.floor(count / 1000)}k` : `${num}k`;
  }
  return count.toString();
}

/* Fetch dynamic repository star count from GitHub API */
async function fetchGithubStars(repo: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch (e) {
    return null;
  }
}

/**
 * GitHub Button with dynamic live repository star counter.
 */
export const GithubButton: Component<GithubButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["repo", "class"]);
  const repoName = () => local.repo || "nikala-ui/ui";

  const [stars] = createResource(repoName, fetchGithubStars);

  return (
    <a
      href={`https://github.com/${repoName()}`}
      target="_blank"
      rel="noopener noreferrer"
      class={cn("inline-flex items-center", local.class)}
      aria-label="GitHub Repository"
      {...rest}
    >
      <Button variant="outline" size="sm" class="gap-1.5 h-8 px-2 text-xs font-mono cursor-pointer flex items-center justify-center">
        {/* GitHub Logo Icon */}
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>

        {/* Optical Center Aligned Star Badge */}
        <Show when={stars()}>
          {(count) => (
            <span class="ml-1 text-xs font-mono text-muted-foreground translate-y-[1px]">
              {formatStars(count())}
            </span>
          )}
        </Show>
      </Button>
    </a>
  );
};