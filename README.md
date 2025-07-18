# 🚗 Autofix – Application de Réservation pour Garage (React + Firebase)

Bienvenue dans **Autofix**, une application web moderne permettant aux clients d’un garage automobile de réserver un rendez-vous en ligne pour leur véhicule.  
Ce projet est parfait pour les développeurs souhaitant une base fonctionnelle pour digitaliser un garage ou créer un service similaire.

---

## 🧩 Fonctionnalités principales

- 📆 Formulaire de réservation intuitif
- 🔐 Sauvegarde sécurisée des rendez-vous avec Firebase Firestore
- ✅ Page de confirmation de réservation
- 🤖 Intégration d’un reCAPTCHA (clé de test fournie)
- 📧 Bloc email désactivé (à personnaliser avec EmailJS, SendGrid ou autre)
- 🎨 Interface sobre, personnalisable et responsive

---

## 🛠️ Stack technique

- **React** (avec React Router)
- **Firebase Firestore** pour stocker les rendez-vous
- **CSS personnalisé**
- **reCAPTCHA v2** (mode test)
- Envoi d'email à intégrer facilement

---

## 📁 Arborescence du projet

Autofix/ ├── public/ ├── src/ │   ├── App.jsx │   ├── Confirmation.jsx │   ├── firebase-config.js │   ├── components/ │   ├── Confirmation.css │   └── ... ├── README.md └── package.json

---

## ⚙️ Installation et configuration

### 1. Cloner le projet

```bash
git clone https://votre-url-github.com/autofix.git
cd autofix
npm install
npm start


---

2. Configurer Firebase 🔥

1. Va sur console.firebase.google.com


2. Crée un nouveau projet


3. Active Cloud Firestore


4. Copie tes identifiants dans firebase-config.js :



const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_ID",
  appId: "VOTRE_APP_ID"
};


---

3. Structure d’un document dans Firestore

Dans la collection appointments, chaque document contient :

{
  userInfo: {
    fullName: "Jean Dupont",
    email: "jean@gmail.com",
    phone: "0612345678"
  },
  vehicleInfo: {
    make: "Renault",
    model: "Clio",
    licensePlate: "AA-123-BB"
  },
  appointmentInfo: {
    date: "2025-07-20T00:00:00.000Z",
    time: "14:30"
  }
}


---

4. reCAPTCHA (version test)

L'intégration utilise un reCAPTCHA de test fourni par Google. Aucun email ou compte n’est requis pour le faire fonctionner.
Tu peux remplacer cette clé par une vraie clé v2 si tu veux l’utiliser en production.


---

5. Envoi d’email (facultatif)

Le code d’envoi d’email est commenté dans Confirmation.jsx pour ne pas générer d’erreur.
Tu peux l’activer avec :

EmailJS (facile à intégrer dans React)

SendGrid

Formsubmit


À l’endroit suivant :

// 👉 À personnaliser : Intégration d'un service email comme EmailJS, SendGrid ou autre


---

✅ Points forts de ce projet

✅ Simple à déployer

✅ Facile à personnaliser

✅ Sans backend complexe

✅ Code commenté et propre

✅ Idéal pour portfolio ou client local



---

🚀 Déploiement (optionnel)

Tu peux facilement déployer ce projet :

sur Vercel

ou Netlify

ou Firebase Hosting



---

📄 Licence

Ce projet est fourni sans support officiel, pour un usage personnel ou professionnel.
Tu peux l’utiliser pour tes clients ou pour ton portfolio.
Il est interdit de le revendre en l’état sans modifications.


---

🙏 Remerciements

Créé avec ❤️ par un développeur passionné pour faciliter la digitalisation des garages indépendants.


---

💬 Besoin d'aide ?

Si tu rencontres des difficultés pour configurer Firebase, intégrer un service d'email ou déployer le projet, tu peux chercher sur Google ou contacter un développeur expérimenté pour t’accompagner.

