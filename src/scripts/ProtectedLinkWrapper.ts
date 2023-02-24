import CryptoJS from "crypto-js";

import anchorLinkPatch from "./anchorLinkPatch";

class ProtectedLinkWrapper extends HTMLElement {
  private setupDone: boolean = false;
  private name: string;
  private url: string;
  private passphrase: string;
  private linkElement: HTMLAnchorElement;

  constructor() {
    super();
    this.passphrase = "qOftmrDIWgroKAZQGxiL130nARSLstcYNwyJaIc2";
    this.url = CryptoJS.Rabbit.decrypt(
      this.getAttribute("data-protected-url")!,
      this.passphrase
    ).toString(CryptoJS.enc.Utf8);
    this.name = this.getAttribute("data-name")!;
    this.linkElement = document.createElement("a");
  }

  private setupElement() {
    if (this.setupDone) {
      return;
    }

    this.classList.forEach((className) => {
      this.linkElement.classList.add(className);
    });

    anchorLinkPatch({
      element: this.linkElement,
      name: this.name,
      url: this.url,
      templateParent: this
    });

    this.appendChild(this.linkElement);
    this.setupDone = true;
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    if (!this.setupDone) {
      this.setupElement();
    }
  }

  adoptedCallback() {
    if (!this.isConnected) {
      return;
    }

    if (!this.setupDone) {
      this.setupElement();
    }
  }
}

let defined = false;

const setupProtectedLinkWrapper = () => {
  if (defined) {
    return;
  }
  customElements.define("protected-link-wrapper", ProtectedLinkWrapper);
  defined = true;
};

export default setupProtectedLinkWrapper;
