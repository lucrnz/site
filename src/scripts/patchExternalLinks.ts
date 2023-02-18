import getCssVariable from "./getCssVariable";

export default async (): Promise<number> => {
  const hoverHandler = (type: "anchor" | "icon") => {
    const handleIcon = (icon: SVGSVGElement | undefined, event: Event) => {
      if (!icon) {
        return;
      }

      switch (event.type) {
        case "mouseout":
          icon.style.color = getCssVariable("icon-color");
          break;
        case "mouseover":
          icon.style.color = getCssVariable("text-color");
          break;
      }
    };

    if (type === "anchor") {
      return (event: Event) => {
        const target = event.target as HTMLAnchorElement;

        if (!target.classList.contains("external-link")) {
          return;
        }

        const icon = target.querySelector("svg") as SVGSVGElement;
        handleIcon(icon, event);
      };
    }

    return (event: Event) => {
      const target = event.target as SVGSVGElement;
      const anchorElement = target.parentElement as HTMLAnchorElement;
      if (!anchorElement.classList.contains("external-link")) {
        return;
      }

      handleIcon(target, event);
    };
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

      for (const anchor of links) {
        const iconName = anchor.href.startsWith("mailto:")
          ? "email"
          : "external-link";
        const templateElement = document.getElementById(
          `template-icon-${iconName}`
        )! as HTMLTemplateElement;
        const importedNode = document.importNode(templateElement.content, true);
        const iconElement = importedNode.firstElementChild as HTMLElement;

        const textFontSize = getComputedStyle(anchor).fontSize;

        const currentStyle = iconElement.getAttribute("style")!;
        iconElement.setAttribute(
          "style",
          currentStyle.replace("22px", textFontSize)
        );
        iconElement.style.color = getCssVariable("icon-color");
        iconElement.style.marginLeft = "5px";
        iconElement.style.marginTop = "2px";
        iconElement.style.verticalAlign = "text-top";

        iconElement.addEventListener("mouseover", hoverHandler("icon"));
        iconElement.addEventListener("mouseout", hoverHandler("icon"));

        anchor.appendChild(iconElement);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
        anchor.addEventListener("mouseover", hoverHandler("anchor"));
        anchor.addEventListener("mouseout", hoverHandler("anchor"));
        anchor.classList.add("external-link");
      }
      resolve(links.length);
    } catch (e) {
      reject(e);
    }
  });
};
