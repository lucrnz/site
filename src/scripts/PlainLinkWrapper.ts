class PlainLinkWrapper extends HTMLElement {
  private setupDone: boolean = false;
  private name: string;
  private url: string;
  private linkElement: HTMLAnchorElement;

  constructor() {
    super();
    this.url = this.getAttribute("data-url")!;
    this.name = this.getAttribute("data-name")!;
    this.linkElement = document.createElement("a");
  }

  private setupElement() {
    if (this.setupDone) {
      return;
    }

    this.linkElement.setAttribute("href", this.url);
    this.linkElement.setAttribute("rel", "noopener noreferrer");
    this.linkElement.textContent = this.name;

    this.classList.forEach((className) => {
      this.linkElement.classList.add(className);
    });

    const children = Array.from(this.children || []);

    if (children.length > 0) {
      for (const child of children) {
        this.linkElement.appendChild(child);
      }
    }

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

const setupPlainLinkWrapper = () => {
  if (defined) {
    return;
  }
  customElements.define("plain-link-wrapper", PlainLinkWrapper);
  defined = true;
};

export default setupPlainLinkWrapper;
