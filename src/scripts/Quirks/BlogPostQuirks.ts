import {
  GenericArgument,
  GenericArgumentType
} from "../../types/GenericArgument";
import type { Quirk } from "../../interfaces/Quirk";
import anchorLinkPatch from "../anchorLinkPatch";

export default class BlogPostQuirks<T extends HTMLElement> implements Quirk {
  private wrapper: T | null = null;
  private templateParent: HTMLElement | null = null;

  Setup(args: GenericArgument[]): void {
    const argWrapperId = args.find((x) => x.name === "wrapperId");

    if (!argWrapperId) {
      throw new Error("wrapperId not supplied");
    }

    if (argWrapperId.type !== GenericArgumentType.String) {
      throw new Error("wrapperId invalid type");
    }

    const wrapperId = <string>argWrapperId.value;

    if (wrapperId.length === 0) {
      throw new Error("wrapperId is empty");
    }

    const element = document.getElementById(wrapperId) as T | null;

    if (!element) {
      throw new Error("wrapperId not found");
    }

    this.wrapper = element;

    // getTemplateParent
    const argTemplateParentGetter = args.find(
      (x) => x.name === "templateParentGetter"
    );

    if (!argTemplateParentGetter) {
      throw new Error("getTemplateParent not supplied");
    }

    if (argTemplateParentGetter.type !== GenericArgumentType.Function) {
      throw new Error("getTemplateParent invalid type");
    }

    const getTemplateParent = <() => HTMLElement>argTemplateParentGetter.value;

    if (!getTemplateParent) {
      throw new Error("getTemplateParent is empty");
    }

    this.templateParent = getTemplateParent();
  }

  public Apply(): void {
    if (!this.wrapper || !this.templateParent) {
      throw new Error("Setup was not called");
    }

    this.patchLinks();
  }

  private patchLinks(): void {
    if (!this.wrapper || !this.templateParent) {
      throw new Error("Setup was not called");
    }

    const links = Array.from(this.wrapper.querySelectorAll("a") || []);

    for (const link of links) {
      const linkUrl = link.getAttribute("href");

      if (!linkUrl) {
        continue;
      }

      anchorLinkPatch({
        element: link,
        name: link.textContent || "",
        url: linkUrl,
        templateParent: this.templateParent
      });
    }
  }
}
