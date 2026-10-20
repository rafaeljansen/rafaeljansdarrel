import React, { useRef } from 'react';
import Typewriter from './Typewriter';
import './Projects.css';

// Komponen Preview Video dengan Optimasi Performa & Batas 20 Detik
function VideoPreview({ src, poster }) {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 20) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset ke frame awal
    }
  };

  return (
    <div 
      className="video-hover-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata" /* Hanya memuat metadata awal untuk menghemat bandwidth & mencegah lag */
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="hover-badge-preview">▶ HOVER TO PREVIEW</div>
    </div>
  );
}

function Projects() {
  const projectList = [
    {
      title: "MON WAR // 3D STRATEGY GAME",
      description: "Game strategi 3D dengan fitur procedural world generation. Dibangun menggunakan Unity engine dan Agile methodology sebagai sistem tugas akhir.",
      mediaType: "video",
      mediaSrc: "videoproject/vd1.mp4",
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      tech: ["Unity 3D", "C#", "NavMesh", "Agile"]
    },
    {
      title: "WEB ELSOFT & INSTANSI",
      description: "Pengembangan web profesional dan sistem manajemen data terpadu untuk keperluan instansi lokal berbasis PHP dan JavaScript modern.",
      mediaType: "image",
      mediaSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      tech: ["PHP", "JavaScript", "Laravel", "MySQL"]
    }
  ];

  return (
    <div className="projects-container">
      <h2>DEPLOYED PROJECTS MATRIX</h2>
      <div className="projects-grid">
        {projectList.map((proj, idx) => (
          <div key={idx} className="project-card">
            <div className="project-media-container">
              {proj.mediaType === 'video' ? (
                <VideoPreview src={proj.mediaSrc} poster={proj.poster} />
              ) : (
                <img src={proj.mediaSrc} alt={proj.title} className="project-static-img" />
              )}
            </div>
            <h3>{proj.title}</h3>
            <p><Typewriter text={proj.description} speed={8} /></p>
            <div className="project-tech-tags">
              {proj.tech.map((t, i) => (
                <span key={i} className="tech-mini-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;