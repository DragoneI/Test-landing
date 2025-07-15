import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import vehicleData from './vehicleData.json';
import './Checkout.css';

const JOURS_OUVERTURE = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const HEURES_OUVERTURE = {
  semaine: { start: 8, end: 19 },
  weekend: { start: 9, end: 16 }
};

 const FRENCH_DEPARTMENTS = [
  { code: '01', name: 'Ain' },
  { code: '02', name: 'Aisne' },
  { code: '03', name: 'Allier' },
  { code: '04', name: 'Alpes-de-Haute-Provence' },
  { code: '05', name: 'Hautes-Alpes' },
  { code: '06', name: 'Alpes-Maritimes' },
  { code: '07', name: 'Ardèche' },
  { code: '08', name: 'Ardennes' },
  { code: '09', name: 'Ariège' },
  { code: '10', name: 'Aube' },
  { code: '11', name: 'Aude' },
  { code: '12', name: 'Aveyron' },
  { code: '13', name: 'Bouches-du-Rhône' },
  { code: '14', name: 'Calvados' },
  { code: '15', name: 'Cantal' },
  { code: '16', name: 'Charente' },
  { code: '17', name: 'Charente-Maritime' },
  { code: '18', name: 'Cher' },
  { code: '19', name: 'Corrèze' },
  { code: '2A', name: 'Corse-du-Sud' },
  { code: '2B', name: 'Haute-Corse' },
  { code: '21', name: 'Côte-d\'Or' },
  { code: '22', name: 'Côtes-d\'Armor' },
  { code: '23', name: 'Creuse' },
  { code: '24', name: 'Dordogne' },
  { code: '25', name: 'Doubs' },
  { code: '26', name: 'Drôme' },
  { code: '27', name: 'Eure' },
  { code: '28', name: 'Eure-et-Loir' },
  { code: '29', name: 'Finistère' },
  { code: '30', name: 'Gard' },
  { code: '31', name: 'Haute-Garonne' },
  { code: '32', name: 'Gers' },
  { code: '33', name: 'Gironde' },
  { code: '34', name: 'Hérault' },
  { code: '35', name: 'Ille-et-Vilaine' },
  { code: '36', name: 'Indre' },
  { code: '37', name: 'Indre-et-Loire' },
  { code: '38', name: 'Isère' },
  { code: '39', name: 'Jura' },
  { code: '40', name: 'Landes' },
  { code: '41', name: 'Loir-et-Cher' },
  { code: '42', name: 'Loire' },
  { code: '43', name: 'Haute-Loire' },
  { code: '44', name: 'Loire-Atlantique' },
  { code: '45', name: 'Loiret' },
  { code: '46', name: 'Lot' },
  { code: '47', name: 'Lot-et-Garonne' },
  { code: '48', name: 'Lozère' },
  { code: '49', name: 'Maine-et-Loire' },
  { code: '50', name: 'Manche' },
  { code: '51', name: 'Marne' },
  { code: '52', name: 'Haute-Marne' },
  { code: '53', name: 'Mayenne' },
  { code: '54', name: 'Meurthe-et-Moselle' },
  { code: '55', name: 'Meuse' },
  { code: '56', name: 'Morbihan' },
  { code: '57', name: 'Moselle' },
  { code: '58', name: 'Nièvre' },
  { code: '59', name: 'Nord' },
  { code: '60', name: 'Oise' },
  { code: '61', name: 'Orne' },
  { code: '62', name: 'Pas-de-Calais' },
  { code: '63', name: 'Puy-de-Dôme' },
  { code: '64', name: 'Pyrénées-Atlantiques' },
  { code: '65', name: 'Hautes-Pyrénées' },
  { code: '66', name: 'Pyrénées-Orientales' },
  { code: '67', name: 'Bas-Rhin' },
  { code: '68', name: 'Haut-Rhin' },
  { code: '69', name: 'Rhône' },
  { code: '70', name: 'Haute-Saône' },
  { code: '71', name: 'Saône-et-Loire' },
  { code: '72', name: 'Sarthe' },
  { code: '73', name: 'Savoie' },
  { code: '74', name: 'Haute-Savoie' },
  { code: '75', name: 'Paris' },
  { code: '76', name: 'Seine-Maritime' },
  { code: '77', name: 'Seine-et-Marne' },
  { code: '78', name: 'Yvelines' },
  { code: '79', name: 'Deux-Sèvres' },
  { code: '80', name: 'Somme' },
  { code: '81', name: 'Tarn' },
  { code: '82', name: 'Tarn-et-Garonne' },
  { code: '83', name: 'Var' },
  { code: '84', name: 'Vaucluse' },
  { code: '85', name: 'Vendée' },
  { code: '86', name: 'Vienne' },
  { code: '87', name: 'Haute-Vienne' },
  { code: '88', name: 'Vosges' },
  { code: '89', name: 'Yonne' },
  { code: '90', name: 'Territoire de Belfort' },
  { code: '91', name: 'Essonne' },
  { code: '92', name: 'Hauts-de-Seine' },
  { code: '93', name: 'Seine-Saint-Denis' },
  { code: '94', name: 'Val-de-Marne' },
  { code: '95', name: 'Val-d\'Oise' },
  { code: '971', name: 'Guadeloupe' },
  { code: '972', name: 'Martinique' },
  { code: '973', name: 'Guyane' },
  { code: '974', name: 'La Réunion' },
  { code: '976', name: 'Mayotte' }
];

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    licensePlateDepartment: '75',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState('');
  const [stepErrors, setStepErrors] = useState({ step1: false, step2: false });
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [showCustomVehicle, setShowCustomVehicle] = useState(false);
  const [customVehicleModel, setCustomVehicleModel] = useState('');
  const navigate = useNavigate();

  // Chargement des marques de véhicules
  useEffect(() => {
    if (formData.vehicleType) {
      setIsLoadingMakes(true);
      try {
        const makes = Object.keys(vehicleData[formData.vehicleType] || {});
        setVehicleMakes(makes);
        setFormData(prev => ({ ...prev, vehicleMake: '', vehicleModel: '' }));
      } catch (error) {
        console.error("Erreur chargement marques:", error);
        setSubmitError('Impossible de charger les marques');
      } finally {
        setIsLoadingMakes(false);
      }
    }
  }, [formData.vehicleType]);

  // Chargement des modèles de véhicules
  useEffect(() => {
    if (formData.vehicleMake && formData.vehicleType) {
      setIsLoadingModels(true);
      try {
        const models = vehicleData[formData.vehicleType][formData.vehicleMake] || [];
        setVehicleModels([...models, 'Autre (précisez)']);
        setShowCustomVehicle(false);
      } catch (error) {
        console.error("Erreur chargement modèles:", error);
        setVehicleModels(['Autre (précisez)']);
      } finally {
        setIsLoadingModels(false);
      }
    }
  }, [formData.vehicleMake, formData.vehicleType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'licensePlate') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value.toUpperCase().replace(/[^A-Z0-9 -]/g, '').substring(0, 9)
      }));
    } else if (name === 'vehicleModel' && value === 'Autre (précisez)') {
      setShowCustomVehicle(true);
      setFormData(prev => ({ ...prev, [name]: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    setSubmitError('');
  };

  const validateStep = (step) => {
    if (step === 1) {
      const isValid = (
        formData.fullName.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone) &&
        formData.address.trim().length >= 5
      );
      setStepErrors({...stepErrors, step1: !isValid});
      return isValid;
    }
    
    if (step === 2) {
      const isValid = (
        formData.vehicleType &&
        formData.vehicleMake &&
        (formData.vehicleModel || showCustomVehicle) &&
        /^[A-Z0-9 -]{1,9}$/.test(formData.licensePlate) &&
        formData.licensePlateDepartment &&
        formData.appointmentDate &&
        formData.appointmentTime
      );
      setStepErrors({...stepErrors, step2: !isValid});
      return isValid;
    }
    
    return true;
  };

  const generateTimeSlots = () => {
    if (!formData.appointmentDate) return [];
    const date = new Date(formData.appointmentDate);
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const { start, end } = isWeekend ? HEURES_OUVERTURE.weekend : HEURES_OUVERTURE.semaine;
    const slots = [];
    
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Utilisateur non authentifié');

      const appointmentId = `${user.uid}_${Date.now()}`;
      const vehicleModel = showCustomVehicle ? customVehicleModel : formData.vehicleModel;

      await setDoc(doc(db, 'appointments', appointmentId), {
        userInfo: {
          userId: user.uid,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim()
        },
        vehicleInfo: {
          type: formData.vehicleType,
          make: formData.vehicleMake,
          model: vehicleModel,
          isCustomModel: showCustomVehicle,
          licensePlate: formData.licensePlate,
          licensePlateDepartment: formData.licensePlateDepartment
        },
        appointmentInfo: {
          date: formData.appointmentDate,
          time: formData.appointmentTime,
          createdAt: serverTimestamp()
        },
        status: 'confirmed'
      });

      navigate('/confirmation', { 
        state: { 
          appointmentId,
          fromCheckout: true 
        } 
      });

    } catch (error) {
      console.error('Erreur:', error);
      setSubmitError(`Échec de la réservation: ${error.message}`);
    }
  };

  return (
    <div className="autofix-container">
      <div className="autofix-header">
        <h1 className="autofix-logo">AUTOFIX<span>•</span></h1>
        <p className="autofix-subheader">Veuillez remplir ce formulaire pour prendre rendez-vous</p>
      </div>

      <div className="autofix-card">
        <div className="progress-bar">
          {[1, 2, 3].map(step => (
            <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          {submitError && <div className="global-error">{submitError}</div>}

          {currentStep === 1 && (
            <div className="form-step">
              {stepErrors.step1 && <div className="step-error">Veuillez remplir tous les champs correctement</div>}

              <div className="input-group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Adresse complète"
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              {stepErrors.step2 && <div className="step-error">Veuillez remplir tous les champs</div>}

              <div className="input-group">
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Type de véhicule</option>
                  {Object.keys(vehicleData).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <select
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  required
                  disabled={!formData.vehicleType || isLoadingMakes}
                >
                  <option value="" disabled>Marque du véhicule</option>
                  {vehicleMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <select
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                  disabled={!formData.vehicleMake || isLoadingModels}
                >
                  <option value="" disabled>Modèle du véhicule</option>
                  {vehicleModels.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {showCustomVehicle && (
                <div className="input-group">
                  <input
                    type="text"
                    value={customVehicleModel}
                    onChange={(e) => {
                      setCustomVehicleModel(e.target.value);
                      setFormData(prev => ({ ...prev, vehicleModel: e.target.value }));
                    }}
                    placeholder="Modèle exact de votre véhicule"
                    required
                  />
                </div>
              )}

              <div className="license-plate-container">
                <div className="input-group" style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="Plaque d'immatriculation"
                    required
                    maxLength="9"
                  />
                </div>
                
                <div className="input-group" style={{ width: '120px', marginLeft: '10px' }}>
                  <select
                    name="licensePlateDepartment"
                    value={formData.licensePlateDepartment}
                    onChange={handleChange}
                    required
                  >
                    {FRENCH_DEPARTMENTS.map(dept => (
                      <option key={dept.code} value={dept.code}>
                        {dept.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="appointment-selector">
                <h3>Choisissez votre créneau</h3>
                <div className="date-picker">
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {formData.appointmentDate && (
                  <div className="time-slots">
                    <div className="time-options">
                      {generateTimeSlots().map((time, index) => (
                        <button
                          type="button"
                          key={index}
                          className={`time-slot ${formData.appointmentTime === time ? 'selected' : ''}`}
                          onClick={() => setFormData({...formData, appointmentTime: time})}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="confirmation-step">
              <h2>Récapitulatif</h2>
              <div className="summary-section">
                <h3>Informations personnelles</h3>
                <p><strong>Nom:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Téléphone:</strong> {formData.phone}</p>
                <p><strong>Adresse:</strong> {formData.address}</p>
              </div>

              <div className="summary-section">
                <h3>Véhicule</h3>
                <p><strong>Type:</strong> {formData.vehicleType}</p>
                <p><strong>Marque:</strong> {formData.vehicleMake}</p>
                <p><strong>Modèle:</strong> {showCustomVehicle ? customVehicleModel : formData.vehicleModel}</p>
                <p><strong>Plaque:</strong> {formData.licensePlate} ({formData.licensePlateDepartment})</p>
              </div>

              <div className="summary-section">
                <h3>Rendez-vous</h3>
                <p><strong>Date:</strong> {new Date(formData.appointmentDate).toLocaleDateString('fr-FR')}</p>
                <p><strong>Heure:</strong> {formData.appointmentTime}</p>
              </div>
            </div>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="secondary-btn">
                Retour
              </button>
            )}
            
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="primary-btn">
                Continuer
              </button>
            ) : (
              <button type="submit" className="primary-btn">
                Confirmer le rendez-vous
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;