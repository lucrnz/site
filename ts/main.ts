// This code is a bit messy, but it works. - https://xkcd.com/1513/

document.addEventListener("DOMContentLoaded", () => {
    const mobileBreakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--mobile-breakpoint"));
    // const laptopBreakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--laptop-breakpoint"));
	
	const menuBtn = document.querySelector("header > nav > .menu-toggle")! as HTMLAnchorElement;
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
		menuBtn.setAttribute("aria-expanded", "false");
        navList.setAttribute("aria-hidden", "true");
		navList.classList.contains("open") && navList.classList.remove("open");
		nav.classList.contains("open") && nav.classList.remove("open");
		links.forEach(link => link.classList.contains("show") && link.classList.remove("show"));
	}

	const openMenu = (links: NodeListOf<HTMLLIElement>) => {
		menuBtn.setAttribute("aria-expanded", "true");
        navList.removeAttribute("aria-hidden");
		navList.classList.add("open");
		nav.classList.add("open");
		links.forEach(link => link.classList.add("show"));
	}

	const getNavigationLinks = () => document.querySelectorAll("header > nav > ul > li") as NodeListOf<HTMLLIElement>;

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

	const progressBar = document.querySelector("header > .progress-bar")! as HTMLDivElement;

	window.addEventListener("scroll", () => {
		const totalHeight = document.body.scrollHeight - window.innerHeight;
		const percentage = parseFloat(((window.pageYOffset / totalHeight) * 100).toFixed(2));

		if (percentage > 0) {
			progressBar.style.display = "block";
			progressBar.style.width = `${percentage}%`;
		} else {
			progressBar.style.display = "none";
			progressBar.style.width = "0";

		}
	});
});
