import React, { useState, useEffect } from 'react';
import './Hitmarker.css';

export default function Hitmarker() {
  const [hits, setHits] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newHit = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };

      setHits((prev) => [...prev, newHit]);

      // Hapus elemen hitmarker dari DOM setelah animasi selesai (350ms)
      setTimeout(() => {
        setHits((prev) => prev.filter((hit) => hit.id !== newHit.id));
      }, 350);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="hitmarker-container">
      {hits.map((hit) => (
        <div
          key={hit.id}
          className="fps-hitmarker"
          style={{
            left: `${hit.x}px`,
            top: `${hit.y}px`
          }}
        >
          <div className="hit-line top-left"></div>
          <div className="hit-line top-right"></div>
          <div className="hit-line bottom-left"></div>
          <div className="hit-line bottom-right"></div>
        </div>
      ))}
    </div>
  );
}