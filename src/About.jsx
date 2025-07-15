import { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.about-content, .about-image');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElements();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.about-section'));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="apropos">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">NOTRE <span className="highlight">HISTOIRE</span></h2>
          <p className="about-subtitle">Depuis 2008, nous redéfinissons l'excellence automobile</p>
          
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Expertise Technique</h3>
                <p>Une équipe certifiée avec plus de 15 ans d'expérience</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Équipement High-Tech</h3>
                <p>Des outils de diagnostic dernier cri pour une précision maximale</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Transparence</h3>
                <p>Devis détaillés et explications claires pour chaque intervention</p>
              </div>
            </div>
          </div>
          
          <button className="about-button">Découvrir notre équipe</button>
        </div>
        
        <div className="about-image">
          <div className="image-wrapper">
            <img 
              src="../public/image2.jpg" 
              alt="Notre atelier" 
              className="main-image"
              onError={(e) => {
                e.target.src = '/default-image.jpg'; // Fallback optionnel
              }}
            />
            <div className="experience-badge">
              <span className="years">15+</span>
              <span className="text">Ans d'expérience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;