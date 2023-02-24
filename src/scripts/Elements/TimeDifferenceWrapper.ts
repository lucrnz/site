import { dateDifferencePretty } from "../../helpers/DateDifference";

class TimeDifferenceWrapper extends HTMLElement {
  private start: Date;
  private end: Date;
  private setupDone = false;

  constructor() {
    super();
    const startStr: string = this.getAttribute("data-start")!;
    const endStr: string = this.getAttribute("data-end")!;

    this.start = new Date(startStr);
    this.end = endStr === "now" ? new Date() : new Date(endStr);
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    if (this.setupDone) {
      return;
    }

    this.setup();
  }

  adoptedCallback() {
    if (!this.isConnected) {
      return;
    }

    if (this.setupDone) {
      return;
    }

    this.setup();
  }

  private setup() {
    const renderedText = dateDifferencePretty(this.start, this.end);
    this.textContent = renderedText;
  }
}

let defined = false;

export default function setupTimeDifferenceWrapper() {
  if (defined) {
    return;
  }
  customElements.define("time-difference-wrapper", TimeDifferenceWrapper);
  defined = true;
}
