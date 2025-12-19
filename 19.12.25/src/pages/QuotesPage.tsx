import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const quotes = [
  "The present moment is all you ever have.",
  "Breathe in peace, breathe out worry.",
  "Progress, not perfection.",
  "One day at a time, one step at a time.",
  "You are stronger than you think.",
  "Small steps lead to big changes.",
  "Be patient with yourself.",
  "Every moment is a fresh beginning.",
  "You are worthy of rest and peace.",
  "Embrace the journey, not just the destination.",
  "Your mental health matters.",
  "It's okay to take a break.",
  "You are doing better than you think.",
  "Self-care is not selfish.",
  "Growth happens outside your comfort zone.",
  "You are enough, just as you are.",
  "Focus on what you can control.",
  "Tomorrow is a new opportunity.",
  "Be kind to yourself today.",
  "Your feelings are valid.",
];

const QuotesPage: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    generateNewQuote();
  }, []);

  const generateNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className={`absolute top-4 left-4 p-3 rounded-full transition ${
          isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title="Back to Home"
      >
        ← Back
      </button>

      {/* Quote Box */}
      <div className={`max-w-2xl w-full rounded-3xl shadow-2xl p-12 text-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mb-8">
          <span className="text-6xl">🧘</span>
        </div>
        
        <blockquote className={`text-2xl md:text-3xl font-light italic mb-8 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          "{currentQuote}"
        </blockquote>

        <button
          onClick={generateNewQuote}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default QuotesPage;
