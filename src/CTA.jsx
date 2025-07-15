import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section full-width-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Prêt à donner une seconde vie à votre véhicule ?</h2>
          <p className="cta-subtitle">Prenez rendez-vous en ligne dès maintenant et bénéficiez de 10% de réduction sur votre première intervention !</p>
          
          <div className="cta-buttons">
            <a href="#contact" className="cta-button primary">
              Prendre RDV en ligne
              <span className="button-icon">→</span>
            </a>
            <a href="tel:+33123456789" className="cta-button secondary">
              Nous appeler
              <span className="button-icon">📞</span>
            </a>
          </div>

          <div className="social-icons">
            <p className="social-text">Suivez-nous sur :</p>
            <div className="icons-container">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;