import CryptoJS from "crypto-js";
import getCssVariable from "./getCssVariable";
import checkExternalUrl from "./checkExternalUrl";
import linkIconHoverHandler from "./linkIconHoverHandler";

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

    this.linkElement.setAttribute("href", this.url);
    this.linkElement.setAttribute("rel", "noopener noreferrer");
    this.linkElement.textContent = this.name;

    this.appendChild(this.linkElement);
    this.setupIcon();
    this.setupDone = true;
  }

  private setupIcon() {
    if (this.setupDone) {
      return;
    }

    let iconType: "none" | "external" | "email" = "none";

    if (this.url.startsWith("mailto:")) {
      iconType = "email";
    } else {
      iconType = checkExternalUrl(this.url) ? "external" : "none";
    }

    if (iconType === "none") {
      return;
    }

    const templateElement = document.getElementById(
      `template-icon-${iconType}`
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(templateElement.content, true);
    const iconElement = importedNode.firstElementChild as HTMLElement;
    const textFontSize = getComputedStyle(this.linkElement).fontSize;

    iconElement.style.color = getCssVariable("icon-color");
    iconElement.style.width = textFontSize;
    iconElement.style.marginLeft = "2px";
    iconElement.style.marginTop = "2px";
    iconElement.style.verticalAlign = "text-top";

    iconElement.addEventListener("mouseover", linkIconHoverHandler("icon"));
    iconElement.addEventListener("mouseout", linkIconHoverHandler("icon"));

    this.linkElement.addEventListener(
      "mouseover",
      linkIconHoverHandler("anchor")
    );
    this.linkElement.addEventListener(
      "mouseout",
      linkIconHoverHandler("anchor")
    );

    this.linkElement.appendChild(iconElement);
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
