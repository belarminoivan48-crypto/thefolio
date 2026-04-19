// frontend/src/pages/Quiz.js
import { useState } from 'react';
import './Quiz.css';

const quizData = [
  {
    question: '1. How many squares are on a standard chess board?',
    options: ['32', '64', '81', '100'],
    answer: 1,
  },
  {
    question: '2. Which piece can move in an L-shape?',
    options: ['Bishop', 'Knight', 'Rook', 'Queen'],
    answer: 1,
  },
  {
    question: '3. What is the most powerful piece in chess?',
    options: ['Pawn', 'Rook', 'Queen', 'Bishop'],
    answer: 2,
  },
  {
    question: '4. Which piece can only move diagonally?',
    options: ['Rook', 'Knight', 'Bishop', 'King'],
    answer: 2,
  },
  {
    question: '5. What is it called when the king is under attack?',
    options: ['Check', 'Mate', 'Draw', 'Castle'],
    answer: 0,
  },
  {
    question: '6. What is the goal of chess?',
    options: [
      'Capture all pieces',
      "Checkmate the opponent's king",
      'Reach the other side',
      'Protect the queen',
    ],
    answer: 1,
  },
  {
    question: '7. Which move involves the king and rook?',
    options: ['Promotion', 'Castling', 'En passant', 'Fork'],
    answer: 1,
  },
  {
    question: '8. What happens when a pawn reaches the last rank?',
    options: [
      'It is removed',
      'It becomes a queen or another piece',
      'The turn ends',
      'The game ends',
    ],
    answer: 1,
  },
  {
    question: '9. How many pawns does each player start with?',
    options: ['6', '7', '8', '9'],
    answer: 2,
  },
  {
    question: '10. Which color moves first in chess?',
    options: ['Black', 'White', 'Either', 'Random'],
    answer: 1,
  },
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const currentData = quizData[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (!submitted) setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;

    if (selectedOptionIndex === currentData.answer) {
      setScore((prev) => prev + 1);
      setResult('Correct!');
    } else {
      setResult(`Wrong! Correct answer: ${currentData.options[currentData.answer]}`);
    }
    setSubmitted(true);

    setTimeout(() => {
      const next = currentQuestionIndex + 1;
      if (next < quizData.length) {
        setCurrentQuestionIndex(next);
        setSelectedOptionIndex(null);
        setResult('');
        setSubmitted(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  return (
    <div className="quiz-body">
      <div className="quiz-container">
        {showScore ? (
          <>
            <h2>♔ Quiz Complete! ♔</h2>
            <p style={{ marginTop: '12px' }}>
              Your final score is{' '}
              <strong>{score}</strong> out of{' '}
              <strong>{quizData.length}</strong>.
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>

            <h2>{currentData.question}</h2>

            <div className="options">
              {currentData.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${selectedOptionIndex === index ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(index)}
                  style={{ cursor: submitted ? 'default' : 'pointer' }}
                >
                  {option}
                </div>
              ))}
            </div>

            <button
              className="quiz-btn"
              onClick={handleSubmit}
              disabled={selectedOptionIndex === null || submitted}
            >
              Submit Answer
            </button>

            <div
              className="result"
              style={{ color: result === 'Correct!' ? '#22c55e' : '#ef4444' }}
            >
              {result}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;