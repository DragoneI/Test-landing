import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from './firebase-config';
import './Login.css';
import logo from '../public/logo.jpg';

const Login = () => {
  // États du formulaire
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const recaptchaRef = useRef();

  // Clé reCAPTCHA (utilisez votre propre clé en production)
  const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test pour développement

  // Initialisation du token CSRF
  useEffect(() => {
    setCsrfToken(Math.random().toString(36).substring(2, 15));
  }, []);

  // Réinitialiser le reCAPTCHA quand il y a une erreur ou changement de mode
  useEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  }, [error, isRegistering]);

  // Fonctions de validation
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8 
      && /[A-Z]/.test(password) 
      && /[0-9]/.test(password)
      && /[^A-Za-z0-9]/.test(password);
  };

  const sanitizeInput = (input) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  // Basculer entre login et register
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setAddress('');
  };

  // Gestion de l'authentification
  const handleAuth = async () => {
    await setPersistence(auth, browserSessionPersistence);
    
    if (isRegistering) {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Inscription réussie !');
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
    }
    navigate('/checkout');
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLocked) {
      setError("Trop de tentatives. Veuillez réessayer dans 5 minutes.");
      setIsLoading(false);
      return;
    }

    // Validation reCAPTCHA
    if (!recaptchaToken) {
      setError("Veuillez vérifier que vous n'êtes pas un robot");
      setIsLoading(false);
      return;
    }

    try {
      // Validation des entrées
      if (!email || !password || (isRegistering && (!confirmPassword || !firstName || !lastName || !address))) {
        throw new Error('Veuillez remplir tous les champs');
      }

      if (!validateEmail(email)) {
        throw new Error('Adresse email invalide');
      }

      if (!validatePassword(password)) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial');
      }

      if (isRegistering && password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      await handleAuth();
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 300000); // 5 minutes
      }

      setError(err.message || 'Une erreur est survenue lors de l\'authentification');
    } finally {
      setIsLoading(false);
    }
  };

  // Authentification Google
  const handleGoogleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, googleProvider);
      navigate('/checkout');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Autofix Logo" className="login-logo" />
          <h2>{isRegistering ? 'Créer un compte' : 'Bienvenue chez Autofix'}</h2>
          <p>{isRegistering ? 'Inscrivez-vous pour commencer' : 'Connectez-vous pour accéder à votre espace'}</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="hidden" name="csrfToken" value={csrfToken} />

          {isRegistering && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Votre prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(sanitizeInput(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Votre nom"
                  value={lastName}
                  onChange={(e) => setLastName(sanitizeInput(e.target.value))}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              placeholder="email@exemple.com"
              value={email}
              onChange={(e) => setEmail(sanitizeInput(e.target.value))}
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                placeholder="Votre adresse complète"
                value={address}
                onChange={(e) => setAddress(sanitizeInput(e.target.value))}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegistering && (
              <small className="password-hint">
                Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial
              </small>
            )}
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

          {!isRegistering && (
            <Link to="/forgot-password" className="forgot-password">
              Mot de passe oublié ?
            </Link>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLocked || isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : isRegistering ? (
              'S\'inscrire'
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-separator"><span>ou</span></div>

        <div className="google-login">
          <button
            className="login-button google-button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
              style={{ marginRight: '10px' }}
            >
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <div className="login-footer">
          {isRegistering ? (
            <>
              Déjà un compte ?{' '}
              <button 
                onClick={toggleMode} 
                className="auth-toggle-button"
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              Pas encore de compte ?{' '}
              <button 
                onClick={toggleMode} 
                className="auth-toggle-button"
              >
                S'inscrire
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;