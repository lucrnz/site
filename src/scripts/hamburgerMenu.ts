import getCssVariable from "./getCssVariable";

export default function setupHamburgerMenu() {
  const tabletBreakpoint = Number.parseInt(getCssVariable("tablet-breakpoint"));
  const menuBtn = document.querySelector(
    "header > nav > .menu-toggle"
  )! as HTMLAnchorElement;
  const logo = document.querySelector(
    "header > nav > .logo"
  )! as HTMLSpanElement;
  const navList = document.querySelector("header > nav > ul")!;
  const nav = document.querySelector("header > nav")!;

  const showAttr = "data-js-show";

  const adapatElementsResize = () => {
    const isTabletViewport = window.innerWidth <= tabletBreakpoint;

    if (isTabletViewport) {
      closeMenu(getNavigationLinks());
    } else {
      navList.setAttribute("aria-hidden", "false");
      logo.setAttribute("aria-hidden", "true");
    }
  };

  const closeMenu = (links: HTMLLIElement[]) => {
    navList.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");

    navList.hasAttribute(showAttr) && navList.removeAttribute(showAttr);
    nav.hasAttribute(showAttr) && nav.removeAttribute(showAttr);

    for (const link of links) {
      link.hasAttribute(showAttr) && link.removeAttribute(showAttr);
    }
  };

  const openMenu = (links: HTMLLIElement[]) => {
    menuBtn.setAttribute("aria-expanded", "true");
    navList.removeAttribute("aria-hidden");

    navList.setAttribute(showAttr, "true");
    nav.setAttribute(showAttr, "true");
    for (const link of links) {
      link.setAttribute(showAttr, "true");
    }
  };

  const getNavigationLinks = () =>
    Array.from(
      document.querySelectorAll(
        "header > nav > ul > li"
      ) as NodeListOf<HTMLLIElement>
    );

  menuBtn.addEventListener("click", (event) => {
    console.log("Click event");
    event.preventDefault();
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    const links = getNavigationLinks();

    if (expanded) {
      closeMenu(links);
    } else {
      openMenu(links);
    }
  });

  window.addEventListener("resize", () => {
    closeMenu(getNavigationLinks());
    adapatElementsResize();
  });

  adapatElementsResize();
}
