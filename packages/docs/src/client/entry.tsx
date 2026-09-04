// packages/docs/src/client/entry.tsx
import { render } from "solid-js/web";
import { App } from "./App.js";
import "./style.css";

const root = document.getElementById("root");
if (root) {
  render(() => <App />, root);
}
