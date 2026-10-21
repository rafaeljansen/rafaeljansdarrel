import React, { useState } from 'react';
import Typewriter from './Typewriter';
import './AboutMe.css';

// Terima prop setActiveTab dari App.jsx
function AboutMe({ setActiveTab: setMainTab }) {
  const [activeTab, setActiveTab] = useState('about');

  // Path foto profil kamu
  const profilePhoto = "me23.jpg";

  const contentData = {
    about: `Halo, dengan Rafael di sini! Saya seorang programmer dan pengembang web, yang memiliki passion dalam menciptakan solusi digital dengan cara yang kreatif dan efisien. 
    \n Saya menekuni dunia Rekayasa Perangkat Lunak sejak berada di sekolah dasar, sehingga saya memiliki cara berpikir komputasional yang kuat dengan kemampuan ini saya dapat selalu beradaptasi dengan cepat terhadap perubahan teknologi.
    \nSaya selalu menyukai hal keren yang saya buat dapat digunakan menyelesaikan masalah. Selain itu, saya menyukai tantangan baru dan mengeksplorasi hal-hal keren seputar teknologi dan rekayasa perangkat Lunak. Cek project saya>> `
  };

  return (
    <div className="about-grid-layout">
      {/* Kolom Grid 1: Foto Profil Mepet Kiri */}
      <div className="about-photo-column">
        <img src={profilePhoto} alt="Rafael Jansen" className="photo-grid-img" />
      </div>

      {/* Kolom Grid 2: Area Konten Utama */}
      <div className="about-content-column">
        {/* Tombol Navigasi */}
        <div className="about-hud-nav">
          <button 
            className={`game-menu-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="btn-indicator">&gt;</span>
            <span className="btn-text">About Me</span>
          </button>
        </div>

        {/* Display Teks Informasi */}
        <div className="about-center-display" key={activeTab}>
          <div className="center-text-box">
            <h3 className="center-title">// {activeTab.toUpperCase()} ME</h3>
            <p className="center-desc">
              <Typewriter text={contentData[activeTab]} speed={10}
              showWhenIsDone={

              <button 
                type="button"
                className="cyber-redirect-link"
                onClick={() => setMainTab('projects')}
              >
                PROJECTS &gt;
              </button>


              }
              
              />           
             
              
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;