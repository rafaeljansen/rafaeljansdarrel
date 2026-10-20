import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const ekgPathRef = useRef(null);

  const synthwaveAudioSrc = "music/Rain on the Highway.mp3";

  // Fungsi untuk merender jalur path EKG (Lingkaran mulus vs Gelombang aktif)
  const renderEkgPath = (active = false) => {
    if (!ekgPathRef.current) return;
    
    let d = "";
    const numSpikes = 16;
    const baseRadius = 52; // Radius dasar lingkaran
    const centerX = 80;    // Titik tengah viewBox baru (160x160)
    const centerY = 80;

    if (active && dataArrayRef.current && analyserRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    }

    for (let i = 0; i < numSpikes; i++) {
      const angle = (i / numSpikes) * Math.PI * 2;
      const nextAngle = ((i + 1) / numSpikes) * Math.PI * 2;
      
      let spikeHeight = 0;
      if (active && dataArrayRef.current) {
        const freqVal = dataArrayRef.current[i % dataArrayRef.current.length] || 10;
        // Amplitudo dinamis tanpa takut terpotong karena area viewBox sudah diperbesar
        spikeHeight = (freqVal / 255) * 38; 
      }

      const cx = centerX + baseRadius * Math.cos(angle);
      const cy = centerY + baseRadius * Math.sin(angle);
      const peakAngle = angle + (nextAngle - angle) * 0.5;
      const pRadius = baseRadius + spikeHeight;
      const px = centerX + pRadius * Math.cos(peakAngle);
      const py = centerY + pRadius * Math.sin(peakAngle);
      const nextCx = centerX + baseRadius * Math.cos(nextAngle);
      const nextCy = centerY + baseRadius * Math.sin(nextAngle);

      if (i === 0) d += `M ${cx} ${cy} `;
      d += `L ${px} ${py} L ${nextCx} ${nextCy} `;
    }
    d += "Z";

    ekgPathRef.current.setAttribute('d', d);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    // Render awal berbentuk lingkaran mulus
    renderEkgPath(false);

    const setupAudioAnalysis = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaElementSource(audio);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        analyserRef.current.fftSize = 64;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      }
    };

    const attemptAutoplay = async () => {
      try {
        setupAudioAnalysis();
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        const handleInteraction = async () => {
          try {
            setupAudioAnalysis();
            await audio.play();
            setIsPlaying(true);
            window.removeEventListener('click', handleInteraction);
          } catch (e) {}
        };
        window.addEventListener('click', handleInteraction, { once: true });
      }
    };

    attemptAutoplay();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Efek terpisah khusus untuk menangani loop animasi EKG berdasarkan state isPlaying
  useEffect(() => {
    if (isPlaying) {
      const runEkgLoop = () => {
        renderEkgPath(true);
        animationFrameIdRef.current = requestAnimationFrame(runEkgLoop);
      };
      runEkgLoop();
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderEkgPath(false); // Kembalikan ke lingkaran mulus saat berhenti
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      }).catch(err => console.log("Gagal memutar audio:", err));
    }
  };

  return (
    <div className="cyber-audio-node">
      <audio ref={audioRef} src={synthwaveAudioSrc} loop />

      {/* Tombol Bulat Utama dengan EKG Dinamis */}
      <div 
        className={`cyber-core-btn ${isPlaying ? 'playing' : ''}`} 
        onClick={togglePlay}
        title={isPlaying ? "Pause Audio Stream" : "Play Audio Stream"}
      >
        <div className="ekg-ring-wrapper">
          {/* ViewBox diperbesar ke 160x160 agar amplitudo tinggi tidak terpotong */}
          <svg className="ekg-svg-circle" viewBox="0 0 160 160">
            <path ref={ekgPathRef} className="ekg-pulse-path" />
          </svg>
        </div>

        <div className="reactor-ring"></div>
        <div className="reactor-core-glow"></div>
        <div className="core-icon">
          {isPlaying ? '❚❚' : '▶'}
        </div>
      </div>

      {/* Panel HUD Samping (Hover Panel) */}
      <div className="cyber-hud-panel">
        <div className="hud-header-line">
          <span className="hud-sys-tag">NEURAL_BEAT // LIVE_EKG</span>
          <span className={`hud-status-dot ${isPlaying ? 'active' : ''}`}></span>
        </div>
        
        <div className="hud-body-content">
          <div className="track-details">
            <div className="track-title">CYBERPUNK 2099</div>
            <div className="track-genre">BPM: 142 (SYNTHWAVE)</div>
          </div>

          <div className={`cyber-waveform ${isPlaying ? '' : 'paused'}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <button className="hud-action-trigger" onClick={togglePlay}>
            {isPlaying ? 'TERMINATE STREAM' : 'ENGAGE STREAM'}
          </button>
        </div>
      </div>
    </div>
  );
}