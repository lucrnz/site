import {
  dateDifference,
  prettyPrintDateDifference,
  roundDateDifference
} from "../../helpers/DateDifference";

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
    const renderedText = prettyPrintDateDifference(
      roundDateDifference(dateDifference(this.start, this.end))
    );
    this.textContent = renderedText;
  }
}

export default function setupTimeDifferenceWrapper() {
  customElements.define("time-difference-wrapper", TimeDifferenceWrapper);
}
