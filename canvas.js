const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
var ms;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch() {
  for (var i = 1; i >= 1; i++) {
    document.getElementsByClassName("absolute-style")[0].innerHTML = motto[Math.floor(Math.random() * motto.length) + 0];
    await delay(Math.floor(Math.random() * 50) + 10);

    if (!(i % 10)) {
      document.getElementsByClassName("absolute-style")[0].innerHTML = motto[Math.floor(Math.random() * motto.length) + 0];
      await delay(5000);
    }
  }
}

window.onload = () => {
  fetch();
}

canvas.width = innerWidth;
canvas.height = innerHeight;

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

let mouseMove = false;

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
  constructor(x, y, radius, color) {
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

let particles;

function init() {
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

let radians = 0;
let alpha = 1;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgb(11, 10, 28, ${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  //c.textAlign = 'center'; 
  //c.fillStyle = 'gold';
  //c.fillText("祝你在亂流下平安", canvas.width / 2, canvas.height / 2);

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