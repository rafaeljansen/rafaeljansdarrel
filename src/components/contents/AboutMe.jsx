import React, { useState } from 'react';
import Typewriter from './Typewriter';
import './AboutMe.css';

function AboutMe() {
  const [activeTab, setActiveTab] = useState('edu');

  // Path foto profil kamu
  const profilePhoto = "me23.jpg";

  const contentData = {
    edu: "Sarjana Komputer (S.Kom) — Teknik Informatika, Universitas Negeri Manado (UNIMA) dengan IPK 3.57. Berfokus pada metodologi Agile dan pengembangan game 3D.",
    skill: "React JS, C#, PHP, Unity 3D Engine, NavMesh AI, Laravel, CodeIgniter 4, JavaScript (ES6+), Git & GitHub.",
    exp: "Pengembangan game strategi 3D 'Mon War' dengan procedural world generation, serta pembuatan aplikasi web profesional untuk layanan instansi lokal."
  };

  return (
    <div className="about-grid-layout">
      {/* Kolom Grid 1: Foto Profil Mepet Kiri */}
      <div className="about-photo-column">
        <img src={profilePhoto} alt="Rafael Jansen" className="photo-grid-img" />
      </div>

      {/* Kolom Grid 2: Area Konten Utama */}
      <div className="about-content-column">
        {/* Tombol Navigasi yang Konsisten dengan Sidebar (game-menu-btn) */}
        <div className="about-hud-nav">
          <button 
            className={`game-menu-btn ${activeTab === 'edu' ? 'active' : ''}`}
            onClick={() => setActiveTab('edu')}
          >
            <span className="btn-indicator">&gt;</span>
            <span className="btn-text">EDU</span>
          </button>
          
          <button 
            className={`game-menu-btn ${activeTab === 'skill' ? 'active' : ''}`}
            onClick={() => setActiveTab('skill')}
          >
            <span className="btn-indicator">&gt;</span>
            <span className="btn-text">SKILL</span>
          </button>
          
          <button 
            className={`game-menu-btn ${activeTab === 'exp' ? 'active' : ''}`}
            onClick={() => setActiveTab('exp')}
          >
            <span className="btn-indicator">&gt;</span>
            <span className="btn-text">EXP</span>
          </button>
        </div>

        {/* Display Teks Informasi */}
        <div className="about-center-display" key={activeTab}>
          <div className="center-text-box">
            <h3 className="center-title">// {activeTab.toUpperCase()} DOSSIER</h3>
            <p className="center-desc">
              <Typewriter text={contentData[activeTab]} speed={10} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;