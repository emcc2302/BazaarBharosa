// src/Components/Slogan/Slogan.jsx
import React from 'react';
import './Slogan.css'; // Create this CSS file next

export default function Slogan() {
  return (
    <div className="slogan-container">
      <p className="slogan-text">Where The <span className="slogan-underline-gradient">Trust</span> Seals The Deal</p>
    </div>
  );
}