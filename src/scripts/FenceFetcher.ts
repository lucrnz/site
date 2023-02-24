export default class FenceFetcher<T> {
  private element: HTMLDivElement;
  private fenceContents: T;

  constructor() {
    const element = document.getElementById("js-fence") as HTMLDivElement;

    if (!element) {
      throw new Error("Fence not found");
    }

    this.element = element;
    this.fenceContents = this.fetchFenceContents();
  }

  private fetchFenceContents() {
    const dataStr = this.element.getAttribute("data-contents");

    if (!dataStr || dataStr.length === 0) {
      throw new Error("Fence is empty");
    }

    return JSON.parse(decodeURIComponent(dataStr));
  }

  get contents() {
    return this.fenceContents;
  }

  queryChildren<T extends Element>(selector: string): T[] {
    return Array.from(this.element.querySelectorAll(selector) || []);
  }
}
