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

const readingProgress = document.getElementById(
    "readingProgress"
);

const backToTop = document.getElementById(
    "backToTop"
);

const yearElement = document.getElementById(
    "year"
);

const legalSections = document.querySelectorAll(
    ".legal-section"
);

const contentsLinks = document.querySelectorAll(
    "#tocNavigation a"
);

function openMenu() {
    if (!menuButton || !mobileNavigation) {
        return;
    }

    menuButton.classList.add("active");
    mobileNavigation.classList.add("active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation"
    );
}

function closeMenu() {
    if (!menuButton || !mobileNavigation) {
        return;
    }

    menuButton.classList.remove("active");
    mobileNavigation.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation"
    );
}

function toggleMenu() {
    const isOpen =
        mobileNavigation?.classList.contains(
            "active"
        );

    if (isOpen) {
        closeMenu();
        return;
    }

    openMenu();
}

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 18
    );
}

function updateReadingProgress() {
    if (!readingProgress) {
        return;
    }

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollableHeight > 0
            ? (
                window.scrollY /
                scrollableHeight
            ) * 100
            : 0;

    readingProgress.style.width =
        `${Math.min(
            100,
            Math.max(0, progress)
        )}%`;
}

function updateActiveSection() {
    let currentSection = "";

    legalSections.forEach((section) => {
        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= 165) {
            currentSection = section.id;
        }
    });

    contentsLinks.forEach((link) => {
        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
}

function handleScroll() {
    updateHeader();
    updateReadingProgress();
    updateActiveSection();
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

document.addEventListener(
    "click",
    (event) => {
        if (
            siteHeader &&
            !siteHeader.contains(event.target)
        ) {
            closeMenu();
        }
    }
);

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    }
);

window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);

window.addEventListener(
    "resize",
    () => {
        if (window.innerWidth > 920) {
            closeMenu();
        }
    }
);

backToTop?.addEventListener(
    "click",
    (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}

handleScroll();