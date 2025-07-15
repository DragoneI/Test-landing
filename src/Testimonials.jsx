import React from 'react';
import Slider from 'react-slick';
import './Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Client fidèle",
      content: "Service exceptionnel ! Mon véhicule n'a jamais aussi bien fonctionné. L'équipe d'Autofix est professionnelle et transparente sur les prix.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Marie Lambert",
      role: "Nouvelle cliente",
      content: "J'ai été impressionnée par le diagnostic rapide et précis. Réparation effectuée en moins d'une journée. Je recommande vivement !",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Thomas Martin",
      role: "Client professionnel",
      content: "Notre flotte de véhicules est toujours entretenue chez Autofix. Leur expertise nous fait gagner un temps précieux.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: 4,
      name: "Sophie Leroy",
      role: "Particulier",
      content: "Accueil chaleureux et explications claires. J'ai enfin trouvé un garage en qui j'ai pleinement confiance.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 5,
      name: "Ahmed Khan",
      role: "Client occasionnel",
      content: "Dépannage rapide en urgence. Prix très correct pour la qualité de service. Je reviendrai pour l'entretien annuel.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "0"
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0"
        }
      }
    ]
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials-section full-width-section" id="avis">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">NOS CLIENTS <span className="highlight">TEMOIGNENT</span></h2>
          <p className="section-subtitle">Ce qu'ils pensent de notre service</p>
        </div>

        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card-wrapper">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    {renderStars(testimonial.rating)}
                    <p className="testimonial-text">"{testimonial.content}"</p>
                  </div>
                  <div className="testimonial-author">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="author-avatar"
                      onError={(e) => {
                        e.target.src = 'https://www.gravatar.com/avatar/default?s=200&d=mp';
                      }}
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;