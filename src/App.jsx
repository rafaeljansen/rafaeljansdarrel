import React, { useState, useEffect, useRef, lazy, Suspense, useTransition } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CyberCanvas from './components/cyberCanvas';
import HitmarkerEffect from './components/Hitmarker';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

const AboutMe = lazy(() => import('./components/contents/AboutMe'));
const Projects = lazy(() => import('./components/contents/Projects'));
const Contact = lazy(() => import('./components/contents/Contact'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const [isPending, startTransition] = useTransition();

  const workerRef = useRef(null);

  const bgImages = {
    about: 'milkyway.jpg',
    projects: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    contact: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop'
  };

  const handleTabChange = (tabId) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  // Web Worker untuk Mouse Smoothing
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./workers/mouseWorker.js', import.meta.url),
      { type: 'module' }
    );

    const handleMouseMove = (e) => {
      if (workerRef.current) {
        workerRef.current.postMessage({
          type: 'MOUSE_MOVE',
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    workerRef.current.onmessage = (e) => {
      const { x, y } = e.data;
      const gridGlow = document.querySelector('.grid-rgb-glow');
      if (gridGlow) {
        gridGlow.style.setProperty('--mouse-x', `${x}px`);
        gridGlow.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Preload Background Images
  useEffect(() => {
    Object.values(bgImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Terminal loading intro otomatis masuk saat 100%
  useEffect(() => {
    const cyberLogs = [
      "BYPASSING SECURITY FIREWALL...",
      "INJECTING REACT_VIRTUAL_DOM CORE...",
      "SYNCHRONIZING CYBERNETIC MODULES...",
      "ESTABLISHING NEURAL LINK TO PORTFOLIO...",
      "ACCESS GRANTED. WELCOME TO THE GRID."
    ];

    let currentProgress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress % 20 === 0 && stepIndex < cyberLogs.length) {
        setLogs(prev => [...prev, cyberLogs[stepIndex]]);
        stepIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Otomatis masuk ke website setelah bar 100% penuh
        setTimeout(() => {
          setIsLoading(false);
        }, 350);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div 
        key={activeTab}
        className="dynamic-bg-layer"
        style={{ backgroundImage: `url(${bgImages[activeTab]})` }}
      />

      <div className="grid-rgb-glow" />
      <MusicPlayer />
      <CyberCanvas />
      <HitmarkerEffect />

      {isLoading ? (
        <div className="loading-screen">
          <div className="cyber-loader-core">
            <div className="reactor-ring"></div>
            <div>
              <div className="terminal-header-cyber">CYBER CORE v4.0</div>
              <div style={{ fontSize: '11px', color: '#ff0055', marginTop: '4px' }}>
                LOADING NEURAL MATRIX [{progress}%]
              </div>
            </div>
          </div>
          <div className="terminal-body">
            {logs.map((log, index) => (
              <div key={index} className="log-line">&gt; {log}</div>
            ))}
          </div>
          <div className="cyber-progress-container">
            <div className="cyber-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : (
        <>
          <Header activeTab={activeTab} setActiveTab={handleTabChange} isPending={isPending} />
          
          <div className={`right-panel-wrapper ${isPending ? 'pending-switch' : ''}`}>
            <main className="content-area">
              <Suspense fallback={<div className="async-loader">// LOADING NEURAL MODULE...</div>}>
                {activeTab === 'about' && <AboutMe setActiveTab={handleTabChange} />}
                {activeTab === 'projects' && <Projects />}
                {activeTab === 'contact' && <Contact />}
              </Suspense>
            </main>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;