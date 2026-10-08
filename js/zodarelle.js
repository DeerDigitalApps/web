const siteHeader = document.getElementById(
    "siteHeader"
);

const menuButton = document.getElementById(
    "menuButton"
);

const mobileNavigation = document.getElementById(
    "mobileNavigation"
);

const mobileLinks = document.querySelectorAll(
    ".mobile-navigation a"
);

const screenshotCards = document.querySelectorAll(
    ".screenshot-card"
);

const imageModal = document.getElementById(
    "imageModal"
);

const modalImage = document.getElementById(
    "modalImage"
);

const modalClose = document.getElementById(
    "modalClose"
);

const yearElement = document.getElementById(
    "year"
);

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );
}

function openMenu() {
    if (
        !menuButton ||
        !mobileNavigation
    ) {
        return;
    }

    menuButton.classList.add(
        "active"
    );

    mobileNavigation.classList.add(
        "active"
    );

    document.body.classList.add(
        "menu-open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );
}

function closeMenu() {
    if (
        !menuButton ||
        !mobileNavigation
    ) {
        return;
    }

    menuButton.classList.remove(
        "active"
    );

    mobileNavigation.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}

function toggleMenu() {
    const isOpen =
        mobileNavigation?.classList.contains(
            "active"
        );

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openModal(imagePath) {
    if (
        !imageModal ||
        !modalImage
    ) {
        return;
    }

    modalImage.src = imagePath;

    imageModal.classList.add(
        "active"
    );

    imageModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}

function closeModal() {
    if (!imageModal) {
        return;
    }

    imageModal.classList.remove(
        "active"
    );

    imageModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    setTimeout(
        () => {
            if (modalImage) {
                modalImage.src = "";
            }
        },
        200
    );
}

menuButton?.addEventListener(
    "click",
    toggleMenu
);

mobileLinks.forEach((link) => {
    link.addEventListener(
        "click",
        closeMenu
    );
});

screenshotCards.forEach((card) => {
    card.addEventListener(
        "click",
        () => {
            const imagePath =
                card.dataset.image;

            if (imagePath) {
                openModal(imagePath);
            }
        }
    );
});

modalClose?.addEventListener(
    "click",
    closeModal
);

imageModal?.addEventListener(
    "click",
    (event) => {
        if (
            event.target ===
            imageModal
        ) {
            closeModal();
        }
    }
);

document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key ===
            "Escape"
        ) {
            closeMenu();
            closeModal();
        }
    }
);

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth >
            950
        ) {
            closeMenu();
        }
    }
);

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}

updateHeader();