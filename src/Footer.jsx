import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section full-width-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Colonne 1 - Logo et description */}
          <div className="footer-column">
            <div className="footer-logo">
              <span className="logo-text">AUTOFIX</span>
              <span className="logo-dot">•</span>
            </div>
            <p className="footer-about">
              Votre partenaire de confiance pour l'entretien et la réparation automobile depuis 2008.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebook className="social-icon" /></a>
              <a href="#" aria-label="Twitter"><FaTwitter className="social-icon" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="social-icon" /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin className="social-icon" /></a>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div className="footer-column">
            <h3 className="footer-title">Liens rapides</h3>
            <ul className="footer-links">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#services">Nos services</a></li>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#avis">Témoignages</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div className="footer-column">
            <h3 className="footer-title">Nos services</h3>
            <ul className="footer-links">
              <li><a href="#">Réparation mécanique</a></li>
              <li><a href="#">Carrosserie</a></li>
              <li><a href="#">Vidange & entretien</a></li>
              <li><a href="#">Diagnostic électronique</a></li>
              <li><a href="#">Contrôle technique</a></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className="footer-column">
            <h3 className="footer-title">Contactez-nous</h3>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Avenue des Champs-Élysées, 75008 Paris</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:contact@autofix.com">contact@autofix.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Autofix. Tous droits réservés.
          </div>
          <div className="footer-legal">
            <a href="#">Mentions légales</a>
            <span> | </span>
            <a href="#">Politique de confidentialité</a>
            <span> | </span>
            <a href="#">Conditions générales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;