import React, { useState, useRef } from 'react';
import './Projects.css';

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null); // State untuk Modal Detail Project
  const itemsPerPage = 4;

  // Data Projects Dinamis (Menyertakan Detail Lengkap untuk Modal Popup)
  const projectsList = [
    {
      id: 1,
      title: 'MON WAR',
      category: '3D Game / Unity C#',
      desc: 'Procedural world generation strategy game built using Agile methodology for undergraduate thesis.',
      type: 'video',
      mediaUrl: 'https://drive.google.com/file/d/1DVoHaZxdNbA229m20MRqSBGwxOf_ad1v/view?usp=drive_link',
      posterUrl: 'pr2.png',
      // Detail tambahan yang muncul di dalam Modal
      fullDetails: {
        role: 'Lead Game Developer & System Architect',
        techStack: ['Unity 3D', 'C#', 'Agile/Scrum', 'NavMesh AI', 'ScriptableObjects', 'UI Toolkit'],
        features: [
          'Procedural terrain & map generation algorithm',
          'Custom ScriptableObject skill & status effect architecture',
          'NavMesh AI navigation for autonomous enemy waves',
          'Agile development iteration and unit testing'
        ],
        githubUrl: 'https://github.com/rafaeljansen/Mon-War-Project',
        demoUrl: '#'
      }
    },
    {
      id: 2,
      title: 'ELSOFT PROJECTS',
      category: 'Web App / Laravel & PHP',
      desc: 'Website showcase projects dan penyediaan layanan jasa Freelance IT.',
      type: 'image',
      mediaUrl: 'pr1.png',
      posterUrl: 'pr1.png',
      fullDetails: {
        role: 'Full-Stack Web Developer',
        techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'React JS'],
        features: [
          'Responsive UI with custom dashboard analytics',
          'security captcha and input validation for form submissions',
          'animation effects and interactive elements for better user experience',
          'SEO optimization and meta tags for better search engine visibility'
        ],
        githubUrl: 'https://elsoft.web.id',
        demoUrl: 'https://elsoft.web.id'
      }
    }
  ];

  // Logika Pagination (4 Item per Page)
  const totalPages = Math.ceil(projectsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projectsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2 className="projects-title">// FEATURED_PROJECTS</h2>
        <span className="projects-count">UNITS: {projectsList.length}</span>
      </div>

      {/* Grid Projects */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpenDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Navigasi Pagination */}
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

      {/* Modal Popup Detail Project (Hanya Tampil Saat SelectedProject Ada) */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

// Komponen Card Project
function ProjectCard({ project, onOpenDetails }) {
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
        <button className="card-action-btn" onClick={onOpenDetails}>
          ACCESS_DATA &gt;
        </button>
      </div>
    </div>
  );
}

// Komponen Modal Detail HUD Cyberpunk
function ProjectDetailModal({ project, onClose }) {
  const details = project.fullDetails;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-hud-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-area">
            <span className="modal-sys-code">// DATA_ENTRY: {project.id < 10 ? `0${project.id}` : project.id}</span>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✖ [ESC]</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Media Banner */}
          <div className="modal-media-banner">
            {project.type === 'video' ? (
              <video src={project.mediaUrl} autoPlay muted loop playsInline controls />
            ) : (
              <img src={project.mediaUrl} alt={project.title} />
            )}
          </div>

          <div className="modal-info-grid">
            {/* Meta Info */}
            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">CATEGORY:</span>
                <span className="meta-value text-accent">{project.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ROLE:</span>
                <span className="meta-value">{details?.role || 'Developer'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="modal-section">
              <h4 className="section-heading">// OVERVIEW</h4>
              <p className="section-desc">{project.desc}</p>
            </div>

            {/* Tech Stack Chips */}
            {details?.techStack && (
              <div className="modal-section">
                <h4 className="section-heading">// TECH_STACK</h4>
                <div className="tech-chips-wrapper">
                  {details.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Core Features List */}
            {details?.features && (
              <div className="modal-section">
                <h4 className="section-heading">// KEY_FEATURES</h4>
                <ul className="modal-features-list">
                  {details.features.map((feat, idx) => (
                    <li key={idx}><span className="feature-bullet">&gt;</span> {feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer / External Links */}
        <div className="modal-footer">
          {details?.githubUrl && (
            <a href={details.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
              GITHUB_REPO &gt;
            </a>
          )}
          {details?.demoUrl && details.demoUrl !== '#' && (
            <a href={details.demoUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn primary">
              LIVE_DEMO &gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}