import React, { useState, useEffect } from 'react';
import './Typewriter.css';

function Typewriter({ text, speed = 15 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {text.slice(0, index)}
      {index < text.length && <span className="cursor-blink">█</span>}
    </span>
  );
}

export default Typewriter;