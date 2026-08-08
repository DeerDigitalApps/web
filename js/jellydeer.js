const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const siteHeader = document.querySelector(".site-header");
const navigationLinks = document.querySelectorAll(
    ".mobile-navigation a, .desktop-navigation a"
);
const yearElement = document.getElementById("year");

function openMobileMenu() {
    menuButton.classList.add("active");
    mobileNavigation.classList.add("active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation");
}

function closeMobileMenu() {
    menuButton.classList.remove("active");
    mobileNavigation.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
}

function toggleMobileMenu() {
    const menuIsOpen = mobileNavigation.classList.contains("active");

    if (menuIsOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function updateHeader() {
    if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

menuButton.addEventListener("click", toggleMobileMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

document.addEventListener("click", (event) => {
    const clickedInsideHeader = siteHeader.contains(event.target);

    if (!clickedInsideHeader) {
        closeMobileMenu();
    }
});

window.addEventListener("scroll", updateHeader, {
    passive: true
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

updateHeader();