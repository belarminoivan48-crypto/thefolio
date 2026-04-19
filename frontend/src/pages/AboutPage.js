// frontend/src/pages/AboutPage.js
import { Link } from 'react-router-dom';

function AboutPage() {
  const timeline = [
    { year: '2019', text: 'Learned the basic rules and piece movements.' },
    { year: '2020', text: 'Joined the school chess club and practiced regularly.' },
    { year: '2021', text: 'Studied opening theory — Sicilian Defence, Italian Game.' },
    { year: '2022', text: 'Participated in local and regional chess competitions.' },
    { year: '2023', text: 'Improved through daily tactical puzzles and GM game analysis.' },
    { year: '2026', text: 'Built ChessRealm — this portfolio platform.' },
  ];

  const pieces = [
    { symbol: '♙', name: 'Pawn', desc: 'The soul of chess. Controls the center and promotes to any piece.' },
    { symbol: '♘', name: 'Knight', desc: 'The trickster. Leaps in an L-shape, the only piece that jumps.' },
    { symbol: '♗', name: 'Bishop', desc: 'The diagonal master. Deadly in open positions and endgames.' },
    { symbol: '♖', name: 'Rook', desc: 'The tower. Controls open files and dominates the endgame.' },
    { symbol: '♕', name: 'Queen', desc: 'The most powerful piece. Combines Rook and Bishop movement.' },
    { symbol: '♔', name: 'King', desc: 'The most important piece. Protect at all costs. Activate in the endgame.' },
  ];

  return (
    <div className="about-page-wrapper">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h2>♟ About ChessRealm</h2>
          <p>
            Chess is more than a game — it is a language of logic, creativity, and will.
            Every position tells a story. Every sacrifice has a reason. Every endgame demands precision.
            This platform exists to share that story and connect players who understand it.
          </p>
        </div>
        <div className="about-board-deco">
          <div className="mini-board">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`mini-sq ${(Math.floor(i / 4) + i) % 2 === 0 ? 'sq-light' : 'sq-dark'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chess Pieces Guide */}
      <section className="bg-gray">
        <h2>The Six Pieces</h2>
        <div className="pieces-grid">
          {pieces.map((p) => (
            <div key={p.name} className="piece-card">
              <div className="piece-symbol">{p.symbol}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray">
        <h2>My Chess Journey</h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot">♟</div>
              <div className="timeline-text">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gray">
        <blockquote>
          "Chess is the gymnasium of the mind." — Blaise Pascal
        </blockquote>
        <blockquote style={{ marginTop: '16px' }}>
          "Every chess master was once a beginner." — Irving Chernev
        </blockquote>
      </section>

      {/* CTA to Quiz */}
      <section className="bg-gray" style={{ textAlign: 'center' }}>
        <h2>Test Your Chess Knowledge</h2>
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Think you know the game? Take the quiz and find out.
        </p>
        <Link to="/quiz" className="cta-link">Start the Quiz ♟</Link>
      </section>

    </div>
  );
}

export default AboutPage;