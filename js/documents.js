const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const mobileLinks = document.querySelectorAll(".mobile-navigation a");

const readingProgress = document.getElementById("readingProgress");
const backToTop = document.getElementById("backToTop");
const yearElement = document.getElementById("year");

const documentSections = document.querySelectorAll(".legal-section");
const contentsLinks = document.querySelectorAll(".contents-panel a");

let stars = [];
let animationFrameId = null;

function createStars() {
    const area = canvas.width * canvas.height;
    const starCount = Math.min(
        190,
        Math.max(70, Math.floor(area / 10500))
    );

    stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.25 + 0.2,
        opacity: Math.random() * 0.65 + 0.18,
        speed: Math.random() * 0.12 + 0.025,
        pulse: Math.random() * Math.PI * 2
    }));
}

function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(window.innerWidth * pixelRatio);
    canvas.height = Math.floor(window.innerHeight * pixelRatio);

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

    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;

    context.scale(pixelRatio, pixelRatio);

    createStars();
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
            Math.sin(time * 0.001 + star.pulse) * 0.16;

        const opacity = Math.max(
            0.08,
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

    animationFrameId = requestAnimationFrame(drawStars);
}

function openMenu() {
    menuButton.classList.add("active");
    mobileNavigation.classList.add("active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute(
        "aria-label",
        "Close table of contents"
    );
}

function closeMenu() {
    menuButton.classList.remove("active");
    mobileNavigation.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
        "aria-label",
        "Open table of contents"
    );
}

function toggleMenu() {
    const isOpen =
        mobileNavigation.classList.contains("active");

    if (isOpen) {
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

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    readingProgress.style.width =
        `${Math.min(100, Math.max(0, progress))}%`;
}

function updateActiveSection() {
    let currentSectionId = "";

    documentSections.forEach((section) => {
        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= 180) {
            currentSectionId = section.id;
        }
    });

    contentsLinks.forEach((link) => {
        const linkTarget =
            link.getAttribute("href").replace("#", "");

        link.classList.toggle(
            "active",
            linkTarget === currentSectionId
        );
    });
}

function handleScroll() {
    updateHeader();
    updateReadingProgress();
    updateActiveSection();
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
    }
});

window.addEventListener("scroll", handleScroll, {
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
    yearElement.textContent = new Date().getFullYear();
}

resizeCanvas();
drawStars();
handleScroll();