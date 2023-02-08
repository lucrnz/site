document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("menu-toggle")!;
    menu.addEventListener("click", () => {
        const expanded = menu.getAttribute("aria-expanded") === "true";
        if (expanded) {
            menu.setAttribute("aria-expanded", "false");
            console.log("Menu is now closed");
        } else {
            menu.setAttribute("aria-expanded", "true");
            console.log("Menu is now open");
        }
    });
});
