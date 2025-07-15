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

  // Récupérer l'ID du rendez-vous
  const appointmentId = location.state?.appointmentId || 
                       new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchAndConfirmAppointment = async () => {
      try {
        if (!appointmentId) {
          throw new Error('Aucun ID de rendez-vous trouvé');
        }

        // 1. Récupération des données depuis Firestore
        const docRef = doc(db, 'appointments', appointmentId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('Rendez-vous non trouvé dans la base de données');
        }

        const data = docSnap.data();
        setAppointmentDetails(data);

        // 2. Envoi de l'email via Formspree (version optimisée)
        const formData = new URLSearchParams();
        formData.append('_replyto', data.userInfo.email);
        formData.append('_subject', `Confirmation RDV - ${data.vehicleInfo.make}`);
        formData.append('nom', data.userInfo.fullName);
        formData.append('telephone', data.userInfo.phone);
        formData.append('vehicule', `${data.vehicleInfo.make} ${data.vehicleInfo.model}`);
        formData.append('immatriculation', data.vehicleInfo.licensePlate);
        formData.append('date', new Date(data.appointmentInfo.date).toLocaleDateString('fr-FR'));
        formData.append('heure', data.appointmentInfo.time);

        const response = await fetch('https://formspree.io/f/myzjayba', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Le service d'email est temporairement indisponible");
        }

        setEmailSent(true);

      } catch (err) {
        console.error("Erreur détaillée:", err);
        setError(err.message.includes('quota') 
          ? "Nous avons atteint notre limite d'envois - Votre RDV est confirmé mais l'email n'a pas pu être envoyé"
          : err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndConfirmAppointment();
  }, [appointmentId]);

  // Formatage de la date
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
              <p>Votre rendez-vous est confirmé malgré cette erreur technique :</p>
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
              <svg className="email-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
              </svg>
              Un email de confirmation vous a été envoyé
            </p>
          ) : (
            <p className="email-warning">
              <svg className="warning-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2L1 21h22M12 6l7.5 13h-15M11 10v4h2v-4m-2 6v2h2v-2"/>
              </svg>
              L'envoi de l'email a échoué mais votre RDV est bien confirmé
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