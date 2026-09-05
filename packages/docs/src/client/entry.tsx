// packages/docs/src/client/entry.tsx
import { render } from "solid-js/web";
import { App } from "./App";
import { defaultMdxComponents } from "../components/mdx-components.jsx";
import "./style.css";

// @ts-ignore
import { routes as pageRoutes } from "virtual:nikala-docs-routes";

if (typeof document !== "undefined") {
  const root = document.getElementById("root");
  if (root) {
    const initialPath = window.location.pathname;
    const loader = pageRoutes[initialPath] || pageRoutes[initialPath.replace(/\/$/, "")] || pageRoutes["/"];
    const wasPrerendered = root.hasAttribute("data-prerendered");

    void (async () => {
      const initialPageModule = loader ? await loader() : undefined;
      root.removeAttribute("data-prerendered");
      // The server-rendered HTML remains available to crawlers. Solid's
      // hydration registry cannot reconcile the Dynamic elements emitted by
      // the copy-paste core components, so mount a fresh client tree after
      // the route module is ready instead of leaving a broken half-hydrated
      // application behind.
      if (wasPrerendered) root.replaceChildren();
      render(() => <App initialPath={initialPath} initialPageModule={initialPageModule} mdxComponents={defaultMdxComponents} />, root);
    })();
  }
}
