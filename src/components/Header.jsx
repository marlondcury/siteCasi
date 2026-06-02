import React, { useState } from 'react';
import "../styles/Header.css";
export default function Header() {
  const [navActive, setNavActive] = useState(false);

  return (
    <header>
      <nav className={`container ${navActive ? 'nav-active' : ''}`}>
        <a href="#home" className="logo">
          <img src="./assets/images/CORVOLOGO.jpg" alt="Logo Oficial CASI" />
        </a>          
        <ul className="nav-links">
          <li><a href="#sobre" onClick={() => setNavActive(false)}>Sobre</a></li>
          <li><a href="#docentes" onClick={() => setNavActive(false)}>Docentes</a></li>
          <li><a href="#grade-curricular" onClick={() => setNavActive(false)}>Grade</a></li>
          <li><a href="#horarios" onClick={() => setNavActive(false)}>Horários</a></li>
          <li><a href="#vagas" onClick={() => setNavActive(false)}>Vagas</a></li>
          <li><a href="#cardapio-ru" onClick={() => setNavActive(false)}>Cardápio RU</a></li>
          <li><a href="#contato" onClick={() => setNavActive(false)}>Contato</a></li>
        </ul>
        <div className="menu-icon" aria-label="Abrir Menu" onClick={() => setNavActive(!navActive)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
}