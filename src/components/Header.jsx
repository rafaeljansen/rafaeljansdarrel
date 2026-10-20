import React, { useState } from 'react';
import './Header.css';

function Header({ activeTab, setActiveTab, isPending }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'about', label: '01 // ABOUT', code: '01' },
    { id: 'projects', label: '02 // PROJECTS', code: '02' },
    { id: 'contact', label: '03 // CONTACT', code: '03' }
  ];

  return (
    <aside className={`game-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Tombol Toggle Hexagon Melayang */}
      <button 
        className="toggle-hex-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <span className={`hex-arrow-icon ${isCollapsed ? 'rotated' : ''}`}>◀</span>
      </button>

      {/* Area Logo */}
      <div className="game-logo-area">
        <div className="logo-text-wrapper">
          <div className="system-status">● {isPending ? 'PROCESSING...' : 'ONLINE'}</div>
          <h1 className="logo-title">RAFAEL.SYS</h1>
          <div className="version-tag">VER_2.0.26</div>
        </div>
      </div>

      {/* Navigasi Vertikal */}
      <nav className="game-nav">
        <ul className="nav-list-vertical">
          {navItems.map((item) => (
            <li key={item.id}>
              {isCollapsed ? (
                <button
                  className={`hex-menu-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                >
                  {item.code}
                </button>
              ) : (
                <button
                  className={`game-menu-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="btn-indicator">&gt;</span>
                  <span className="btn-text">{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer-decor">
        <div className="decor-line"></div>
        <span>PRESS [TAB] TO NAVIGATE</span>
      </div>
    </aside>
  );
}

export default Header;