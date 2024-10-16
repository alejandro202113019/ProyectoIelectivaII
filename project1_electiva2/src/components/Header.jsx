import React from 'react';
import '../style/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span>Logo</span>
      </div>
      <nav>
        <ul className="nav">
          <li><a href="#categorias">Categorias</a></li>
          <li><a href="#productos">Productos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
