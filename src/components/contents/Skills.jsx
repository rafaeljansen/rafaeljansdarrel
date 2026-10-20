import React from 'react';
import './Skills.css';

function Skills() {
  const skills = [
    "REACT JS", "JAVASCRIPT (ES6+)", "PHP", "C#", 
    "LARAVEL", "CODEIGNITER 4", "UNITY 3D ENGINE", 
    "NAVMESH AI", "UI TOOLKIT", "GIT / GITHUB"
  ];

  return (
    <div className="skills-container">
      <h2>TECH STACK MATRIX</h2>
      <div className="skills-tags">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">&gt; {skill}</span>
        ))}
      </div>
    </div>
  );
}

export default Skills;