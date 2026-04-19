// frontend/src/pages/SplashPage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';
import logo from '../assets/logo.png';

function SplashPage() {
  const [dotCount, setDotCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  // Animate loading dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  // After 3s: fade out, then navigate
  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      const navTimeout = setTimeout(() => navigate('/home'), 500);
      return () => clearTimeout(navTimeout);
    }, 3000);
    return () => clearTimeout(fadeTimeout);
  }, [navigate]);

  return (
    <div className="splash-body">
      <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
        <img src={logo} id="splash-logo" alt="ChessRealm Logo" />
        <h1>♔ ChessRealm ♔</h1>
        <div className="splash-tagline">Every Move Counts</div>
        <div className="spinner" />
        <div className="loading-text">
          Loading<span className="dots">{'.'.repeat(dotCount)}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;