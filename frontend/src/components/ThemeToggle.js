// frontend/src/components/ThemeToggle.js
import { useEffect, useState } from 'react';

function ThemeToggle() {
  // Initialize state based on localStorage immediately
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Sync the body class with the state on initial load and on every change
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <button id="themeToggle" onClick={toggleTheme}>
      {/* Light mode → show Moon to switch to dark. Dark mode → show Sun to switch to light. */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;