// packages/docs/src/client/entry.tsx
import { render } from "solid-js/web";
import { App } from "./App";
import "./style.css";

if (typeof document !== "undefined") {
  const root = document.getElementById("root");
  if (root) {
    // Production builds contain prerendered HTML for SEO. The client app is
    // currently mounted with render() rather than hydrate(), so clear that
    // static shell before mounting to avoid rendering the page twice.
    root.replaceChildren();
    root.removeAttribute("data-prerendered");
    render(() => <App />, root);
  }
}
