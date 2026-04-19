// frontend/src/pages/ContactPage.js
import { useState } from 'react';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(''); setEmailError(''); setMessageError('');
    let isValid = true;

    if (!name.trim()) { setNameError('Name is required!'); isValid = false; }
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Valid email is required!'); isValid = false;
    }
    if (!message.trim()) { setMessageError('Message cannot be empty!'); isValid = false; }

    if (isValid) {
      setSubmitted(true);
      setName(''); setEmail(''); setMessage('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const resources = [
    { name: 'Chess.com', url: 'https://chess.com', desc: 'The world\'s largest chess community. Play, learn, and improve daily.' },
    { name: 'Lichess.org', url: 'https://lichess.org', desc: 'Free, open-source chess server. No ads, no paywalls — pure chess.' },
    { name: 'Chessable', url: 'https://chessable.com', desc: 'Science-backed learning for openings, tactics, and endgames.' },
    { name: 'Chess24', url: 'https://chess24.com', desc: 'Live tournaments, commentary, and training from top grandmasters.' },
    { name: 'World Chess Federation', url: 'https://fide.com', desc: 'FIDE — the official governing body of international chess.' },
  ];

  return (
    <div className="contact-page-wrapper">

      {/* Contact Form */}
      <section className="signup-form">
        <h2>♞ Get In Touch</h2>
        <p style={{ marginBottom: '24px', textAlign: 'center', color: '#94a3b8' }}>
          Have a question, challenge, or want to collaborate? Make your move.
        </p>

        {submitted && (
          <p className="success-msg">✓ Message sent! We'll respond shortly.</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderColor: nameError ? '#ef4444' : '' }}
            />
            {nameError && <span className="error">{nameError}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? '#ef4444' : '' }}
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              style={{ borderColor: messageError ? '#ef4444' : '' }}
            />
            {messageError && <span className="error">{messageError}</span>}
          </div>

          <input type="submit" value="Send Message ♟" />
        </form>
      </section>

      {/* Chess Resources Table */}
      <section className="bg-gray">
        <h2>♖ Chess Resources</h2>
        <p style={{ marginBottom: '20px', color: '#94a3b8' }}>
          Trusted platforms to sharpen your game.
        </p>
        <table className="resources-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Description</th>
              <th>Visit</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.name}>
                <td><strong style={{ color: '#d4af37' }}>{r.name}</strong></td>
                <td>{r.desc}</td>
                <td>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Open →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Map */}
      <section className="bg-gray map-section">
        <h2>♗ Our Location</h2>
        <div className="map-wrapper">
          <iframe
            title="ChessRealm Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61344.63407094821!2d120.40112400000001!3d16.0634332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339169ba84015665%3A0xb8448085826e2726!2sMangaldan%2C%20Pangasinan!5e0!3m2!1sen!2sph!4v1769336527131!5m2!1sen!2sph"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  );
}

export default ContactPage;