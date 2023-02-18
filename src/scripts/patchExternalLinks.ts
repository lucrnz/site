import getCssVariable from "./getCssVariable";

export default async (): Promise<number> => {
  const anchorHoverHandler = (event: Event) => {
    const target = event.target as HTMLAnchorElement;

    if (!target.classList.contains("external-link")) {
      return;
    }

    const icon = target.querySelector("i") as HTMLSpanElement;

    if (!icon) {
      return;
    }

    if (event.type === "mouseout") {
      icon.classList.contains("hover-js") && icon.classList.remove("hover-js");
      return;
    }

    if (event.type === "mouseover") {
      icon.classList.add("hover-js");
    }
  };

  const checkIfURLIsExternal = (url: string) => {
    const tmp = document.createElement("a");
    tmp.href = url;
    return tmp.host !== window.location.host;
  };

  return new Promise((resolve, reject) => {
    try {
      const main = document.querySelector("main");

      if (!main) {
        throw new Error("main element not found");
      }

      const anchors = main.querySelectorAll("a");

      if (!anchors) {
        resolve(0);
      }

      const links = Array.from(anchors).filter(
        (anchor: HTMLAnchorElement) =>
          anchor.href !== "#" &&
          !anchor.classList.contains("external-link") &&
          checkIfURLIsExternal(anchor.href)
      );

      const cssTextColor = getCssVariable("text-color");

      for (const anchor of links) {
        const iconName = anchor.href.startsWith("mailto:")
          ? "email"
          : "external-link";
        const templateElement = document.getElementById(
          `template-icon-${iconName}`
        )! as HTMLTemplateElement;
        const importedNode = document.importNode(templateElement.content, true);
        const iconElement = importedNode.firstElementChild as HTMLElement;

        iconElement.style.color = cssTextColor;

        anchor.appendChild(iconElement);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
        anchor.addEventListener("mouseover", anchorHoverHandler);
        anchor.addEventListener("mouseout", anchorHoverHandler);
        anchor.classList.add("external-link");
      }
      resolve(links.length);
    } catch (e) {
      reject(e);
    }
  });
};
