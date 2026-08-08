const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const siteHeader = document.getElementById("siteHeader");
const yearElement = document.getElementById("year");

const mobileLinks = document.querySelectorAll(".mobile-navigation a");

function openMenu() {
    menuButton.classList.add("active");
    mobileNavigation.classList.add("active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation");
}

function closeMenu() {
    menuButton.classList.remove("active");
    mobileNavigation.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
}

function toggleMenu() {
    const isOpen = mobileNavigation.classList.contains("active");

    if (isOpen) {
        closeMenu();
        return;
    }

    openMenu();
}

function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 15);
}

menuButton.addEventListener("click", toggleMenu);

mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
        closeMenu();
    }
});

window.addEventListener("scroll", updateHeader, {
    passive: true
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        closeMenu();
    }
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

updateHeader();