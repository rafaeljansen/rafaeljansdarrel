import React, { useState, useRef } from 'react';
import './Projects.css';

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Batasi maksimal 4 content/card per page

  // Data Projects milikmu
  const projectsList = [
    {
      id: 1,
      title: 'MON WAR',
      category: '3D Game / Unity C#',
      desc: 'Procedural world generation strategy game built using Agile methodology for undergraduate thesis.',
      type: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-robot-character-42935-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'WEB ELSOFT & INSTANSI',
      category: 'Web App / Laravel & PHP',
      desc: 'Custom enterprise web application and institutional dynamic portal services.',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      posterUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'MINECRAFT NEOFORGE MOD',
      category: 'Java / Mixin Injections',
      desc: 'Custom entity behavior mod allowing villagers and entities to sit on stairs with custom configs.',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop',
      posterUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'NATURAL LANGUAGE PROCESSING',
      category: 'Python / ML Dashboard',
      desc: 'Machine learning sentiment analysis visualizer using Random Forest, SVM, XGBoost, and Streamlit.',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      posterUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'CYBER PORTFOLIO HUD',
      category: 'React JS / Web Worker',
      desc: 'Performance-optimized modular cyberpunk portfolio with EKG audio reactive HUD.',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
      posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // Hitung total halaman berdasarkan jumlah data
  const totalPages = Math.ceil(projectsList.length / itemsPerPage);

  // Potong array data agar hanya menampilkan 4 item sesuai halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projectsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2 className="projects-title">// FEATURED_PROJECTS</h2>
        <span className="projects-count">UNITS: {projectsList.length}</span>
      </div>

      {/* Grid Projects (Maksimal 4 Content per Page) */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Kontrol Pagination (Hanya tampil jika total halaman > 1) */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button 
            className="page-nav-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            &lt; PREV
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-num-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                0{index + 1}
              </button>
            ))}
          </div>

          <button 
            className="page-nav-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            NEXT &gt;
          </button>
        </div>
      )}
    </div>
  );
}

// Sub-komponen Card
function ProjectCard({ project }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-media-wrapper">
        {project.type === 'video' ? (
          <video 
            ref={videoRef}
            className="card-media"
            src={project.mediaUrl}
            poster={project.posterUrl}
            muted
            loop
            playsInline
          />
        ) : (
          <img 
            className="card-media" 
            src={project.mediaUrl} 
            alt={project.title} 
          />
        )}
        <div className="media-overlay-tag">{project.type.toUpperCase()} PREVIEW</div>
      </div>

      <div className="card-content">
        <div className="card-tag">{project.category}</div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>
        <button className="card-action-btn">ACCESS_DATA &gt;</button>
      </div>
    </div>
  );
}