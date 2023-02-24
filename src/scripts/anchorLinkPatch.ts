import checkExternalUrl from "./checkExternalUrl";
import { styleElement, StyleRuleMode } from "./styleElement";
import linkIconHoverHandler from "./linkIconHoverHandler";

enum IconType {
  None = "none",
  External = "external",
  Email = "email"
}

type LinkElementData = {
  element: HTMLAnchorElement;
  url: string;
  name?: string;
  templateParent: HTMLElement;
};

function setupIcon(data: LinkElementData) {
  const { element: linkElement, url, templateParent } = data;

  let iconType: IconType = IconType.None;

  if (url.startsWith("mailto:")) {
    iconType = IconType.Email;
  } else {
    iconType = checkExternalUrl(url) ? IconType.External : IconType.None;
  }

  if (iconType === IconType.None) {
    return;
  }

  const templateElement = templateParent.querySelector(
    `#template-icon-${iconType}`
  )! as HTMLTemplateElement;
  const importedNode = document.importNode(templateElement.content, true);
  const iconElement = importedNode.firstElementChild as HTMLElement;

  styleElement(iconElement, {
    color: "$icon-color",
    width: "$font-size-regular",
    "margin-left": "2px",
    "margin-top": "2px",
    "vertical-align": "text-top"
  });

  const handlerForIcon = linkIconHoverHandler("icon");
  const handlerForAnchor = linkIconHoverHandler("anchor");

  iconElement.addEventListener("mouseover", handlerForIcon);
  iconElement.addEventListener("mouseout", handlerForIcon);

  linkElement.addEventListener("mouseover", handlerForAnchor);
  linkElement.addEventListener("mouseout", handlerForAnchor);

  linkElement.appendChild(iconElement);
}

function setupStyling(data: LinkElementData) {
  const { element } = data;

  styleElement(element, {
    color: "$accent-2-color",
    "text-decoration": "none",
    "background-color": "$forth-color"
  });

  styleElement(
    element,
    {
      "text-decoration": "underline",
      cursor: "pointer"
    },
    StyleRuleMode.Hover
  );
}

export default function anchorLinkPatch(data: LinkElementData) {
  const linkPatched = data.element.hasAttribute("data-link-patched");

  if (linkPatched) {
    return;
  }

  const { element, url, name } = data;

  element.setAttribute("rel", "noopener noreferrer");
  element.setAttribute("href", url);

  if (name) {
    element.textContent = name;
  }

  setupIcon(data);
  setupStyling(data);

  element.setAttribute("data-link-patched", "true");
}
