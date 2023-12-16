import React from "react";
import { createRoot } from "react-dom/client";
import Show from "./react/pages/Show";

class ShowElement extends HTMLElement {
   connectedCallback() {
      const root = createRoot(this)
      root.render(<Show />)
   }

}

customElements.define('show-element', ShowElement)