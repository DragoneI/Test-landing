import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import Checkout from './Checkout';
import Confirmation from './Confirmation'; // Import ajouté
import Hero from './Hero';
import BrandsCarousel from './BrandsCarousel';
import Services from './Services';
import About from './About';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Contact from './Contact';
import Footer from './Footer';
import './App.css';

// Composant pour les routes protégées (inchangé)
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Login */}
        <Route path="/login" element={<Login />} />

        {/* Route Checkout (protégée) */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />

        {/* Nouvelle Route Confirmation (protégée) */}
        <Route 
          path="/confirmation" 
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          } 
        />

        {/* Page d'accueil */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <BrandsCarousel />
              <Services />
              <Contact />
              <Testimonials />
              <CTA />
              <About />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;