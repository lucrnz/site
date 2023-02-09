// This code is a bit messy, but it works. - https://xkcd.com/1513/

document.addEventListener("DOMContentLoaded", () => {
    const mobileBreakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--mobile-breakpoint"));
    // const laptopBreakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--laptop-breakpoint"));

	const menu = document.querySelector("header > nav > .menu-toggle")! as HTMLAnchorElement;
    const logo = document.querySelector("header > nav > .logo")! as HTMLSpanElement;
    const navList = document.querySelector("header > nav > ul")!;
	const nav = document.querySelector("header > nav")!;

    const adapatElementsResize = () => {
        const isMobileViewport = window.innerWidth <= mobileBreakpoint;

        if (isMobileViewport) {
            navList.setAttribute("aria-hidden", "true");
            logo.setAttribute("aria-hidden", "false");
        } else {
            navList.setAttribute("aria-hidden", "false");
            logo.setAttribute("aria-hidden", "true");
        }
    };

	const closeMenu = (links: NodeListOf<HTMLLIElement>) => {
		menu.setAttribute("aria-expanded", "false");
        navList.setAttribute("aria-hidden", "true");
		nav.classList.contains("open") && nav.classList.remove("open");
		for (let i = 0; i < links.length - 1; i++) {
			links[i].classList.contains("show") && links[i].classList.remove("show");
		}
	}

	const openMenu = (links: NodeListOf<HTMLLIElement>) => {
		menu.setAttribute("aria-expanded", "true");
        navList.removeAttribute("aria-hidden");
		nav.classList.add("open");
		for (let i = 0; i < links.length - 1; i++) {
			links[i].classList.add("show");
		}
	}

	const getNavigationLinks = () => document.querySelectorAll("header > nav > ul > li") as NodeListOf<HTMLLIElement>;

	menu.addEventListener("click", (event) => {
		event.preventDefault();
		const expanded = menu.getAttribute("aria-expanded") === "true";
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
});
