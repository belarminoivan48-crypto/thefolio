// frontend/src/components/Footer.js
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-crown">♔</span>
          <span className="footer-title">ChessRealm</span>
        </div>

        <div className="footer-links">
          <Link to="/home">Board</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/quiz">Quiz</Link>
        </div>

        <p className="footer-copy">
          &copy; 2026 ChessRealm. Every move matters. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;