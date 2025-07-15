import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animation pour les éléments
    const animateElements = () => {
      const elements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-buttons');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    };

    animateElements();
  }, []);

  const handleRendezVousClick = () => {
    navigate('/login'); // Redirection vers la page Login
  };

  return (
    <section className="hero-section" id="accueil">
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1>VOTRE GARAGE HAUT DE GAMME À <span className="highlight">PARIS</span></h1>
          <p>Réparation, entretien et personnalisation automobile avec une expertise inégalée depuis 15 ans.</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={handleRendezVousClick}>
              Prendre rendez-vous
            </button>
            <button className="secondary-button">Nos services</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="car-image">
            <img 
              src="../public/car1.svg" 
              alt="Voiture de luxe" 
              className="car-img"
              onError={(e) => {
                e.target.src = '../public/car1.svg';
              }}
            />
          </div>
          <div className="hero-badge">
            <span className="badge-text">15 ans d'expertise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;