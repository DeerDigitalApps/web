const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

const yearElement = document.getElementById("year");

let stars = [];

function resizeCanvas() {
    const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width =
        Math.floor(
            window.innerWidth * pixelRatio
        );

    canvas.height =
        Math.floor(
            window.innerHeight * pixelRatio
        );

    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;

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
        window.innerWidth *
        window.innerHeight;

    const starCount = Math.min(
        180,
        Math.max(
            70,
            Math.floor(
                screenArea / 10500
            )
        )
    );

    stars = Array.from(
        {
            length: starCount
        },
        () => ({
            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            radius:
                Math.random() *
                1.15 +
                0.2,

            opacity:
                Math.random() *
                0.6 +
                0.15,

            speed:
                Math.random() *
                0.08 +
                0.015,

            pulse:
                Math.random() *
                Math.PI *
                2
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

        if (
            star.y >
            window.innerHeight + 5
        ) {
            star.y = -5;

            star.x =
                Math.random() *
                window.innerWidth;
        }

        const pulse =
            Math.sin(
                time * 0.001 +
                star.pulse
            ) * 0.14;

        const opacity =
            Math.max(
                0.05,
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

window.addEventListener(
    "resize",
    resizeCanvas
);

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}

resizeCanvas();
drawStars();