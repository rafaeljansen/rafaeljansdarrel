// src/workers/mouseWorker.js
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// Helper Linear Interpolation (Lerp)
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Menerima posisi kursor asli dari Main Thread
self.onmessage = function (e) {
  if (e.data.type === 'MOUSE_MOVE') {
    targetX = e.data.x;
    targetY = e.data.y;
  }
};

// Menjalankan loop perhitungan di background thread (60 FPS setara dengan timer interval)
setInterval(() => {
  currentX = lerp(currentX, targetX, 0.1);
  currentY = lerp(currentY, targetY, 0.1);

  // Mengirim balik koordinat yang sudah di-smoothing ke Main Thread
  self.postMessage({ x: currentX, y: currentY });
}, 1000 / 60);