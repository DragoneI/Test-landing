// Confirmation.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const appointmentId = location.state?.appointmentId || 
                       new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchAndConfirmAppointment = async () => {
      try {
        if (!appointmentId) throw new Error('Aucun ID de rendez-vous trouvé');

        const docRef = doc(db, 'appointments', appointmentId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error('Rendez-vous non trouvé');

        const data = docSnap.data();
        setAppointmentDetails(data);

        // 👉 À personnaliser : Intégration d'un service email comme EmailJS, SendGrid ou autre
        // const response = await sendEmail(data);
        // if (response.success) setEmailSent(true);

      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndConfirmAppointment();
  }, [appointmentId]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="loading-spinner"></div>
          <p>Validation de votre rendez-vous...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card error">
          <h2>Erreur</h2>
          <p>{error}</p>
          {appointmentDetails && (
            <div className="confirmation-details">
              <p>Votre rendez-vous est confirmé malgré cette erreur :</p>
              <p><strong>Date :</strong> {formatDate(appointmentDetails.appointmentInfo.date)}</p>
              <p><strong>Heure :</strong> {appointmentDetails.appointmentInfo.time}</p>
            </div>
          )}
          <button onClick={() => navigate('/')} className="primary-btn">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <svg className="confirmation-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
          </svg>
          <h1>Rendez-vous confirmé !</h1>
          <p className="confirmation-subheader">Merci pour votre réservation</p>
        </div>

        {appointmentDetails && (
          <div className="confirmation-details">
            <div className="detail-section">
              <h3>Informations personnelles</h3>
              <p><strong>Nom :</strong> {appointmentDetails.userInfo.fullName}</p>
              <p><strong>Email :</strong> {appointmentDetails.userInfo.email}</p>
              <p><strong>Téléphone :</strong> {appointmentDetails.userInfo.phone}</p>
            </div>

            <div className="detail-section">
              <h3>Détails du véhicule</h3>
              <p><strong>Marque :</strong> {appointmentDetails.vehicleInfo.make}</p>
              <p><strong>Modèle :</strong> {appointmentDetails.vehicleInfo.model}</p>
              <p><strong>Immatriculation :</strong> {appointmentDetails.vehicleInfo.licensePlate}</p>
            </div>

            <div className="detail-section">
              <h3>Détails du rendez-vous</h3>
              <p><strong>Date :</strong> {formatDate(appointmentDetails.appointmentInfo.date)}</p>
              <p><strong>Heure :</strong> {appointmentDetails.appointmentInfo.time}</p>
            </div>
          </div>
        )}

        <div className="confirmation-footer">
          {emailSent ? (
            <p className="email-confirmation">
              ✅ Un email de confirmation vous a été envoyé
            </p>
          ) : (
            <p className="email-warning">
              ⚠️ L'envoi de l'email n'est pas activé dans cette version
            </p>
          )}

          <button onClick={() => navigate('/')} className="primary-btn">
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;