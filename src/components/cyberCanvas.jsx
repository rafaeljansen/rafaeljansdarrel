import { useEffect, useRef } from 'react';

export default function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Helper Lerp agar pergerakan grid mengikuti kursor terasa mulus dan berbobot
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const render = () => {
      // Interpolasi posisi kursor secara halus
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);

      ctx.clearRect(0, 0, width, height);

      const gridSize = 40;

      // 1. Render Garis Grid Dasar (Cyberpunk subtle lines)
      ctx.lineWidth = 1;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Interaktif: Titik Persimpangan Grid yang Menyala di Sekitar Kursor
      const highlightRadius = 220;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const distX = x - currentX;
          const distY = y - currentY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < highlightRadius) {
            const intensity = (1 - dist / highlightRadius);
            
            // Titik persimpangan grid menyala cyan/magenta terang mendekati kursor
            ctx.fillStyle = `rgba(0, 240, 255, ${intensity * 0.6})`;
            ctx.fillRect(x - 1, y - 1, 2.5, 2.5);
          }
        }
      }

      // 3. Garis Pemindai Crosshair Mengikuti Kursor (Tanpa Glow Lingkaran)
      // Garis Vertikal (Pink Accent)
      ctx.strokeStyle = 'rgba(255, 0, 85, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(currentX, 0);
      ctx.lineTo(currentX, height);
      ctx.stroke();

      // Garis Horizontal (Cyan Accent)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, currentY);
      ctx.lineTo(width, currentY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}