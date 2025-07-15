import { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.map-container, .contact-info, .hours-container');
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

    const section = document.querySelector('.contact-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">NOUS <span className="highlight">TROUVER</span></h2>
          <p className="section-subtitle">Visitez notre garage pour un service personnalisé</p>
        </div>

        <div className="contact-content">
          {/* Carte Google Maps */}
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623251234567!5m2!1sfr!2sfr" 
              width="100%" 
              height="400"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du garage Autofix"
            ></iframe>
          </div>

          {/* Informations de contact */}
          <div className="contact-info">
            <div className="info-card">
              <h3>Adresse</h3>
              <p>123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
            </div>

            <div className="info-card">
              <h3>Contact</h3>
              <p>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a><br />
                <a href="mailto:contact@autofix.com">contact@autofix.com</a>
              </p>
            </div>

            <div className="info-card hours-container">
              <h3>Horaires</h3>
              <div className="hours-grid">
                <div className="hour-item">
                  <span>Lundi - Vendredi</span>
                  <span>8h - 19h</span>
                </div>
                <div className="hour-item">
                  <span>Samedi</span>
                  <span>9h - 18h</span>
                </div>
                <div className="hour-item">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com?q=123+Avenue+des+Champs-Élysées+75008+Paris" 
              className="contact-button"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Itinéraire →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;