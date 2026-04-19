// frontend/src/components/Header.js
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hide the header entirely on the splash screen (same pattern as reference)
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="horizontal-nav">
        <img src={logo} id="logo" alt="ChessRealm Logo" />

        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          {user && (
            <>
              <li><Link to="/create-post">New Post</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;