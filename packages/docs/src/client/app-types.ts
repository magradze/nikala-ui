import type { Component } from "solid-js";

export interface PageModule {
  default: Component<{ components?: Record<string, unknown> }>;
}

export type PageLoader = () => Promise<PageModule>;
export type PageRouteLoaders = Record<string, PageLoader>;

export interface AppProps {
  initialPath?: string;
  initialPageModule?: PageModule;
  mdxComponents?: Record<string, unknown>;
}
