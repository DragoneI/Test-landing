import { useEffect } from 'react';
import { FaTools, FaCarCrash, FaOilCan, FaCarBattery, FaTachometerAlt, FaCarSide } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  useEffect(() => {
    const animateCards = () => {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 150);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCards();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.services-section'));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <FaTools className="service-icon" />,
      title: "Réparation Mécanique",
      description: "Diagnostic et réparation de tous problèmes mécaniques avec des pièces de qualité.",
      highlight: "Garantie 12 mois"
    },
    {
      icon: <FaCarCrash className="service-icon" />,
      title: "Carrosserie",
      description: "Rénovation complète après accident avec peinture professionnelle et alignement parfait.",
      highlight: "Peinture garantie"
    },
    {
      icon: <FaOilCan className="service-icon" />,
      title: "Vidange & Entretien",
      description: "Entretien régulier pour prolonger la durée de vie de votre véhicule.",
      highlight: "Forfaits économiques"
    },
    {
      icon: <FaCarBattery className="service-icon" />,
      title: "Électricité Auto",
      description: "Diagnostic et réparation des systèmes électriques et électroniques de votre véhicule.",
      highlight: "Diagnostic gratuit"
    },
    {
      icon: <FaTachometerAlt className="service-icon" />,
      title: "Contrôle Technique",
      description: "Préparation et passage du contrôle technique avec expertise professionnelle.",
      highlight: "Pré-contrôle offert"
    },
    {
      icon: <FaCarSide className="service-icon" />,
      title: "Personnalisation",
      description: "Personnalisation de votre véhicule selon vos goûts et préférences.",
      highlight: "Sur devis"
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">NOS <span className="highlight">SERVICES</span></h2>
          <p className="services-subtitle">Des solutions complètes pour tous vos besoins automobiles</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon-container">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-highlight">
                <span>{service.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;