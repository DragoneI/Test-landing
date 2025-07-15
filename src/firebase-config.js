import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Ajoutez cette importation

const firebaseConfig = {
  apiKey: "AIzaSyAxtRCpJuUuW6hxps2hDZbz2jUMO-5BF4w",
  authDomain: "autofix-8fb3a.firebaseapp.com",
  projectId: "autofix-8fb3a",
  storageBucket: "autofix-8fb3a.appspot.com", // J'ai corrigé l'URL ici
  messagingSenderId: "1055581469333",
  appId: "1:1055581469333:web:68235ce9bb589a343af99c"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const auth = getAuth(app);
export const db = getFirestore(app); // Exportez la référence à Firestore