import React from 'react';
import './BrandsCarousel.css';

// Import des logos SVG
import CitroenLogo from '../public/citroen.svg';
import ToyotaLogo from '../public/toyota.svg';
import RenaultLogo from '../public/renault.svg';
import AudiLogo from '../public/audi.svg';
import MercedesLogo from '../public/mercedes.svg';
import PeugeotLogo from '../public/peugeot.svg';
import BMWLogo from '../public/bmw.svg';
import VolkswagenLogo from '../public/volkswagen.svg';

const BrandsCarousel = () => {
  const brands = [
    {
      name: 'Citroën',
      logo: CitroenLogo,
    },
    {
      name: 'Toyota',
      logo: ToyotaLogo,
    },
    {
      name: 'Renault',
      logo: RenaultLogo,
    },
    {
      name: 'Audi',
      logo: AudiLogo,
    },
    {
      name: 'Mercedes-Benz',
      logo: MercedesLogo,
    },
    {
      name: 'Peugeot',
      logo: PeugeotLogo,
    },
    {
      name: 'BMW',
      logo: BMWLogo,
    },
    {
      name: 'Volkswagen',
      logo: VolkswagenLogo,
    },
  ];

  return (
    <section className="brands-section">
      <div className="section-container">
        <h2 className="section-title">
          NOS <span className="highlight">PARTENAIRES</span>
        </h2>
        <p className="section-subtitle">
          Nous travaillons avec les plus grandes marques automobiles
        </p>

        <div className="brands-carousel-container">
          <div className="brands-carousel-track">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="brand-item">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="brand-fallback">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;