import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="#">
            <span className="logo-text">AUTOFIX</span>
            <span className="logo-dot">•</span>
          </a>
        </div>

        {/* Liens de navigation - Version desktop */}
        <div className="navbar-links">
          <a href="#accueil" className="nav-link">Accueil</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#avis" className="nav-link">Avis</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Bouton RDV */}
        <div className="navbar-cta">
          <button className="cta-button" >Prendre RDV</button>
        </div>

        {/* Menu mobile - Hamburger */}
        <div 
          className="mobile-menu-button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Menu mobile - Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#accueil" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Accueil</a>
        <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#galerie" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Galerie</a>
        <a href="#avis" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Avis</a>
        <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <button className="mobile-cta-button">Prendre RDV</button>
      </div>
    </nav>
  );
};

export default Navbar;