import getCssVariable from "./getCssVariable";

const linkIconHoverHandler = (type: "anchor" | "icon") => {
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
      console.log("Hover on anchor event");
      const target = event.target as HTMLAnchorElement;

      const icon = target.querySelector("svg") as SVGSVGElement;
      console.log(icon);
      handleIcon(icon, event);
    };
  }

  return (event: Event) => {
    console.log("Hover on icon event");

    let icon: SVGSVGElement;
    const targetHtml = event.target! as HTMLElement;
    const tagName: string = targetHtml.tagName;

    if (tagName === "svg") {
      icon = event.target! as SVGSVGElement;
    } else if (tagName === "path") {
      icon = targetHtml.parentNode! as SVGSVGElement;
    } else {
      return;
    }

    handleIcon(icon, event);
  };
};

export default linkIconHoverHandler;
