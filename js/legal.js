const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const mobileLinks = document.querySelectorAll(".mobile-navigation a");

const readingProgress = document.getElementById("readingProgress");
const yearElement = document.getElementById("year");
const backToTop = document.getElementById("backToTop");

const productSearch = document.getElementById("productSearch");
const clearSearch = document.getElementById("clearSearch");

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");

let activeFilter = "all";
let stars = [];

function resizeCanvas() {
    const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = Math.floor(
        window.innerWidth * pixelRatio
    );

    canvas.height = Math.floor(
        window.innerHeight * pixelRatio
    );

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    createStars();
}

function createStars() {
    const screenArea =
        window.innerWidth * window.innerHeight;

    const starCount = Math.min(
        190,
        Math.max(75, Math.floor(screenArea / 10000))
    );

    stars = Array.from(
        { length: starCount },
        () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.2 + 0.2,
            opacity: Math.random() * 0.65 + 0.15,
            speed: Math.random() * 0.11 + 0.02,
            pulse: Math.random() * Math.PI * 2
        })
    );
}

function drawStars(time = 0) {
    context.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    stars.forEach((star) => {
        star.y += star.speed;

        if (star.y > window.innerHeight + 5) {
            star.y = -5;
            star.x = Math.random() * window.innerWidth;
        }

        const pulse =
            Math.sin(time * 0.001 + star.pulse) * 0.15;

        const opacity = Math.max(
            0.06,
            star.opacity + pulse
        );

        context.beginPath();

        context.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle =
            `rgba(255, 255, 255, ${opacity})`;

        context.fill();
    });

    requestAnimationFrame(drawStars);
}

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
    const menuIsOpen =
        mobileNavigation.classList.contains("active");

    if (menuIsOpen) {
        closeMenu();
        return;
    }

    openMenu();
}

function updateHeader() {
    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );
}

function updateReadingProgress() {
    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    readingProgress.style.width =
        `${Math.min(100, Math.max(0, progress))}%`;
}

function normaliseSearchValue(value) {
    return value
        .trim()
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filterProducts() {
    const searchValue = normaliseSearchValue(
        productSearch.value
    );

    let visibleProducts = 0;

    productCards.forEach((card) => {
        const division = card.dataset.division;
        const searchableName = normaliseSearchValue(
            card.dataset.name
        );

        const matchesDivision =
            activeFilter === "all" ||
            division === activeFilter;

        const matchesSearch =
            searchValue === "" ||
            searchableName.includes(searchValue);

        const shouldShow =
            matchesDivision && matchesSearch;

        card.classList.toggle(
            "hidden",
            !shouldShow
        );

        if (shouldShow) {
            visibleProducts += 1;
        }
    });

    const noResults = visibleProducts === 0;

    emptyState.classList.toggle(
        "visible",
        noResults
    );

    emptyState.setAttribute(
        "aria-hidden",
        String(!noResults)
    );
}

function setActiveFilter(filterValue) {
    activeFilter = filterValue;

    filterButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filterValue
        );
    });

    filterProducts();
}

function resetProductFilters() {
    productSearch.value = "";
    setActiveFilter("all");
    productSearch.focus();
}

menuButton.addEventListener("click", toggleMenu);

mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();

        if (document.activeElement === productSearch) {
            productSearch.blur();
        }
    }
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setActiveFilter(button.dataset.filter);
    });
});

productSearch.addEventListener(
    "input",
    filterProducts
);

clearSearch.addEventListener("click", () => {
    productSearch.value = "";
    filterProducts();
    productSearch.focus();
});

resetFilters.addEventListener(
    "click",
    resetProductFilters
);

window.addEventListener("scroll", () => {
    updateHeader();
    updateReadingProgress();
}, {
    passive: true
});

window.addEventListener("resize", () => {
    resizeCanvas();

    if (window.innerWidth > 950) {
        closeMenu();
    }
});

backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}

resizeCanvas();
drawStars();
updateHeader();
updateReadingProgress();
filterProducts();