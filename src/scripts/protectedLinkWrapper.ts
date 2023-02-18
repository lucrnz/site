import CryptoJS from "crypto-js";
import getCssVariable from "./getCssVariable";
import checkExternalUrl from "./checkExternalUrl";
import linkIconHoverHandler from "./linkIconHoverHandler";

class ProtectedLinkWrapper extends HTMLElement {
  private setupDone: boolean = false;
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
    this.linkElement = document.createElement("a");
  }

  private setupElement() {
    if (this.setupDone) {
      return;
    }

    this.removeAttribute("data-protected-url");
    const childWrapper = this.firstElementChild! as HTMLDivElement;

    for (const child of childWrapper.childNodes) {
      this.linkElement.appendChild(child);
    }

    childWrapper.parentElement!.removeChild(childWrapper);

    this.classList.forEach((className) => {
      this.linkElement.classList.add(className);
    });

    this.linkElement.setAttribute("href", this.url);
    this.linkElement.setAttribute("rel", "noopener noreferrer");

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

    const currentStyle = iconElement.getAttribute("style")!;
    iconElement.setAttribute(
      "style",
      currentStyle.replace("22px", textFontSize)
    );
    iconElement.style.color = getCssVariable("icon-color");
    iconElement.style.marginLeft = "5px";
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

export default ProtectedLinkWrapper;
