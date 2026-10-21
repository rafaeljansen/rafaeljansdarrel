import React, { useState, useEffect } from 'react';
import './Typewriter.css';

function Typewriter({ text = "", speed = 15, showWhenIsDone }) {
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setStopped(false);

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setStopped(true); // Pengetikan selesai
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div>
      {/* 1. Teks efek mesin ketik */}
      <span>
        {text.slice(0, index)}
        {!stopped && <span className="cursor-blink">█</span>}
      </span>

      {/* 2. Hanya munculkan elemen dari showWhenIsDone ketika stopped === true */}
      {stopped && showWhenIsDone && (
     <>
     {showWhenIsDone}
     
     </>
          
        
      )}
    </div>
  );
}

export default Typewriter;