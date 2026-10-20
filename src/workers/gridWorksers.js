// src/workers/gridWorker.js
let canvas = null;
let ctx = null;
let mouseX = window?.innerWidth ? window.innerWidth / 2 : 500;
let mouseY = window?.innerHeight ? window.innerHeight / 2 : 500;
let width = 0;
let height = 0;

self.onmessage = function (e) {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    canvas = payload.canvas;
    width = payload.width;
    height = payload.height;
    ctx = canvas.getContext('2d');
    render();
  } else if (type === 'RESIZE') {
    width = payload.width;
    height = payload.height;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  } else if (type === 'MOUSE_MOVE') {
    mouseX = payload.x;
    mouseY = payload.y;
  }
};

function render() {
  if (ctx && canvas) {
    // Bersihkan frame sebelumnya
    ctx.clearRect(0, 0, width, height);

    // Render Garis Grid Cyberpunk
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 40;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Render Efek Sorotan Lampu Radial (Glow) Mengikuti Posisi Mouse
    const gradient = ctx.createRadialGradient(
      mouseX, mouseY, 0,
      mouseX, mouseY, 600
    );
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
    gradient.addColorStop(0.4, 'rgba(255, 0, 85, 0.08)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  requestAnimationFrame(render);
}