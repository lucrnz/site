// Anonymous inmediately-executed function to avoid polluting the global scope
(async () => {
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
    for (const link of links) {
      link.classList.contains("show") && link.classList.remove("show");
    }
  };

  const openMenu = (links: NodeListOf<HTMLLIElement>) => {
    menuBtn.setAttribute("aria-expanded", "true");
    navList.removeAttribute("aria-hidden");
    navList.classList.add("open");
    nav.classList.add("open");
    for (const link of links) {
      link.classList.add("show");
    }
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

  const patchExternalLinks = async (): Promise<number> => {
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
        icon.classList.contains("hover-js") &&
          icon.classList.remove("hover-js");
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

        for (const anchor of links) {
          const iconClass = anchor.href.startsWith("mailto:")
            ? ["fa-regular", "fa-envelope"]
            : ["fa-solid", "fa-external-link"];
          const icon = document.createElement("i");
          icon.classList.add(...iconClass, "fa-fw", "external-link");
          anchor.appendChild(icon);
          anchor.classList.add("external-link");
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener noreferrer");
          anchor.addEventListener("mouseover", anchorHoverHandler);
          anchor.addEventListener("mouseout", anchorHoverHandler);
        }
        resolve(links.length);
      } catch (e) {
        reject(e);
      }
    });
  };

  const decryptProtectedLinks = async (passphrase: string): Promise<number> => {
    // Rationale for encrypting some links:
    // A lot of bots are crawling the web and are looking for email addresses, phone numbers, etc.
    // @TODO: Find another library, this one is not maintained anymore.

    return new Promise((resolve, reject) => {
      const elements = document.querySelectorAll(
        "a[data-protected-link]"
      ) as NodeListOf<HTMLAnchorElement>;

      if (!elements.length) {
        resolve(0);
        return;
      }

      const runDecode = (elements: NodeListOf<HTMLAnchorElement>) => {
        let decodeTotal = 0;

        for (const element of elements) {
          const cryptedStr = element.getAttribute("data-protected-link");

          if (!cryptedStr) {
            continue;
          }

          let decoded: string | undefined;
          try {
            decoded = CryptoJS.Rabbit.decrypt(cryptedStr, passphrase).toString(
              CryptoJS.enc.Utf8
            );
          } catch (e) {
            console.error(`Error decrypting: ${cryptedStr}`);
            reject(e);
            return;
          }

          if (decoded) {
            element.removeAttribute("href");
            element.setAttribute("href", decoded);
            element.removeAttribute("data-protected-link");
            decodeTotal++;
          }
        }

        resolve(decodeTotal);
      };

      // If the script is not loaded yet, load it and then run the decode
      if (!document.querySelector("#crypto-js-script")) {
        const script = document.createElement("script");
        script.id = "crypto-js-script";
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
        script.setAttribute(
          "integrity",
          "sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA=="
        );
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("referrerpolicy", "no-referrer");
        script.onload = () => runDecode(elements);
        document.head.appendChild(script);
      } else {
        runDecode(elements);
      }
    });
  };

  await decryptProtectedLinks("qOftmrDIWgroKAZQGxiL130nARSLstcYNwyJaIc2");
  await patchExternalLinks();
})();
