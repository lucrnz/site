type LinkElementData = {
  element: HTMLAnchorElement;
  url: string;
  name?: string;
};

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

  element.setAttribute("data-link-patched", "true");
}
