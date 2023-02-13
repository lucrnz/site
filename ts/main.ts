// This code is a bit messy, but it works. - https://xkcd.com/1513/

document.addEventListener("DOMContentLoaded", () => {
  const getCSSVariableValue = (variableName: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--${variableName}`
    );

  //   const mobileBreakpoint = parseInt(getCSSVariableValue("mobile-breakpoint"));
  const tabletBreakpoint = parseInt(getCSSVariableValue("tablet-breakpoint"));

  const menuBtn = document.querySelector(
    "header > nav > .menu-toggle"
  )! as HTMLAnchorElement;
  const logo = document.querySelector(
    "header > nav > .logo"
  )! as HTMLSpanElement;
  const navList = document.querySelector("header > nav > ul")!;
  const nav = document.querySelector("header > nav")!;

  const adapatElementsResize = () => {
    const isTabletViewport = window.innerWidth <= tabletBreakpoint;

    if (isTabletViewport) {
      closeMenu(getNavigationLinks());
    } else {
      navList.setAttribute("aria-hidden", "false");
      logo.setAttribute("aria-hidden", "true");
    }
  };

  const closeMenu = (links: NodeListOf<HTMLLIElement>) => {
    navList.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    navList.classList.contains("open") && navList.classList.remove("open");
    nav.classList.contains("open") && nav.classList.remove("open");
    links.forEach(
      (link) => link.classList.contains("show") && link.classList.remove("show")
    );
  };

  const openMenu = (links: NodeListOf<HTMLLIElement>) => {
    menuBtn.setAttribute("aria-expanded", "true");
    navList.removeAttribute("aria-hidden");
    navList.classList.add("open");
    nav.classList.add("open");
    links.forEach((link) => link.classList.add("show"));
  };

  const getNavigationLinks = () =>
    document.querySelectorAll(
      "header > nav > ul > li"
    ) as NodeListOf<HTMLLIElement>;

  menuBtn.addEventListener("click", (event) => {
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

  const progressBar = document.querySelector(
    "header > .progress-bar"
  )! as HTMLDivElement;

  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = parseFloat(
      ((window.pageYOffset / totalHeight) * 100).toFixed(2)
    );

    if (percentage > 0) {
      progressBar.style.display = "block";
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.display = "none";
      progressBar.style.width = "0";
    }
  });

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

  const main = document.querySelector("main")!;
  Array.from(main.querySelectorAll("a") || [])
    .filter(
      (anchor: HTMLAnchorElement) =>
        !anchor.classList.contains("external-link") &&
        checkIfURLIsExternal(anchor.href)
    )
    .forEach((anchor: HTMLAnchorElement) => {
      const iconClass = anchor.href.startsWith("mailto:")
        ? ["fa-regular", "fa-envelope"]
        : ["fa-solid", "fa-external-link"];
      const icon = document.createElement("i");
      icon.classList.add(...iconClass, "fa-fw", "external-link");
      anchor.appendChild(icon);
      anchor.classList.add("external-link");
      anchor.addEventListener("mouseover", anchorHoverHandler);
      anchor.addEventListener("mouseout", anchorHoverHandler);
    });
});
