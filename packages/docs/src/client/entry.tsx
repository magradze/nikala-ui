// packages/docs/src/client/entry.tsx
import { render } from "solid-js/web";
import { App } from "./App";
import "./style.css";

if (typeof document !== "undefined") {
  const root = document.getElementById("root");
  if (root) {
    render(() => <App />, root);
  }
}
