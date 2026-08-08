const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const siteHeader = document.getElementById("siteHeader");

const navigationLinks = document.querySelectorAll(
    ".mobile-navigation a"
);

const screenshotButtons = document.querySelectorAll(".screenshot-card");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const yearElement = document.getElementById("year");

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
    const menuIsOpen = mobileNavigation.classList.contains("active");

    if (menuIsOpen) {
        closeMenu();
        return;
    }

    openMenu();
}

function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}

function openImageModal(imageSource) {
    if (!imageSource) {
        return;
    }

    modalImage.src = imageSource;

    imageModal.classList.add("active");
    imageModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    modalClose.focus();
}

function closeImageModal() {
    imageModal.classList.remove("active");
    imageModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    modalImage.src = "";
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

screenshotButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openImageModal(button.dataset.image);
    });
});

modalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
        closeImageModal();
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