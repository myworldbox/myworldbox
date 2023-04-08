let mouseMove = false;
let radians = 0;
let alpha = 1;
let particles;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

const colors = [
    "#ffffff",
    "#3454da",
    "#edd8f7",
    "#4dd4ff",
    "#fff49e",
    "#ff9e43",
];

var canvas: any = document.getElementById('galaxy');
var c: any = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener("mouseout", () => {
    mouseMove = true;
});

addEventListener("mousemove", () => {
    mouseMove = false;
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

class Particle {
    x: any
    y: any
    radius: any
    color: any

    constructor(x: any, y: any, radius: any, color: any) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.color;
        c.shadowBlur = 12;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
    }
}

var init = () => {
    particles = [];

    for (let i = 0; i < 450; i++) {

        const canvasWidth = canvas.width + 300;
        const canvasHeight = canvas.height + 300;

        const x = Math.random() * canvasWidth - canvasWidth / 2;
        const y = Math.random() * canvasHeight - canvasHeight / 2;

        const radius = 2 * Math.random();

        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, radius, color));
    }
}

var animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = `rgb(11, 10, 28, ${alpha})`;
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(radians);
    particles.forEach((particle) => {
        particle.update();
    });
    c.restore();

    if (!mouseMove) {
        radians -= 0.0055;
        if (alpha >= 0.1) {
            alpha -= 0.01;
        }

        if (mouseMove && alpha < 1) {
            alpha += 0.015;
        }
    }
}

init();
animate();