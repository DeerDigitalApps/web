const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const siteHeader = document.querySelector(".site-header");
const navigationLinks = document.querySelectorAll(
    ".mobile-navigation a, .desktop-navigation a"
);

const screenshotButtons = document.querySelectorAll(".screenshot-card");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

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

function openImageModal(imageSource) {
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

menuButton.addEventListener("click", toggleMobileMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

screenshotButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const imageSource = button.dataset.image;

        if (imageSource) {
            openImageModal(imageSource);
        }
    });
});

modalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
        closeImageModal();
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
    if (window.innerWidth > 950) {
        closeMobileMenu();
    }
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

updateHeader();