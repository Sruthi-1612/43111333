import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface JournalEntry {
  date: string;
  content: string;
}

const JournalPage: React.FC = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Load journal entries for this user
    const savedEntries = localStorage.getItem(`journal_${user.username}`);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, [user, navigate]);

  useEffect(() => {
    // Load entry for selected date
    const entry = entries.find(e => e.date === selectedDate);
    setCurrentEntry(entry ? entry.content : '');
  }, [selectedDate, entries]);

  const saveEntry = () => {
    if (!user) return;

    const updatedEntries = entries.filter(e => e.date !== selectedDate);
    if (currentEntry.trim()) {
      updatedEntries.push({ date: selectedDate, content: currentEntry });
    }

    localStorage.setItem(`journal_${user.username}`, JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveEntry(); // Save current entry before switching dates
    setSelectedDate(new Date(e.target.value).toDateString());
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen p-4 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
      {/* Back Button */}
      <button
        onClick={() => {
          saveEntry();
          navigate('/home');
        }}
        className={`mb-4 p-3 rounded-full transition shadow-lg ${
          isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        title="Back to Home"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Journal Book */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Book Spine Effect */}
          <div className={`h-8 ${isDark ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-amber-700 to-orange-700'}`}></div>
          
          {/* Journal Header */}
          <div className={`p-8 border-b-2 ${isDark ? 'border-gray-700' : 'border-amber-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-4xl font-serif ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                📖 My Journal
              </h1>
              <input
                type="date"
                value={formatDateForInput(selectedDate)}
                onChange={handleDateChange}
                className={`px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'bg-amber-50 border-amber-300 text-gray-800'
                }`}
              />
            </div>
            <p className={`text-lg font-serif italic ${isDark ? 'text-gray-400' : 'text-amber-700'}`}>
              {formatDisplayDate(selectedDate)}
            </p>
          </div>

          {/* Journal Page */}
          <div className={`p-8 ${isDark ? 'bg-gray-800' : 'bg-amber-50/30'}`}>
            {/* Lined Paper Effect */}
            <div className="relative">
              {/* Red Margin Line */}
              <div className={`absolute left-16 top-0 bottom-0 w-0.5 ${isDark ? 'bg-red-900' : 'bg-red-300'}`}></div>
              
              {/* Text Area */}
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                onBlur={saveEntry}
                placeholder="Dear diary, today I..."
                className={`w-full min-h-[500px] p-4 pl-20 font-serif text-lg leading-8 resize-none focus:outline-none ${
                  isDark 
                    ? 'bg-transparent text-gray-200 placeholder-gray-600' 
                    : 'bg-transparent text-gray-800 placeholder-amber-400'
                }`}
                style={{
                  backgroundImage: isDark 
                    ? 'repeating-linear-gradient(transparent, transparent 31px, #374151 31px, #374151 32px)'
                    : 'repeating-linear-gradient(transparent, transparent 31px, #fbbf24 31px, #fbbf24 32px)',
                  lineHeight: '32px'
                }}
              />
            </div>

            {/* Character Count */}
            <div className={`mt-4 text-right text-sm ${isDark ? 'text-gray-500' : 'text-amber-600'}`}>
              {currentEntry.length} characters
            </div>
          </div>

          {/* Book Bottom */}
          <div className={`h-4 ${isDark ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-amber-700 to-orange-700'}`}></div>
        </div>

        {/* Save Reminder */}
        <p className={`mt-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-amber-700'}`}>
          Your entry auto-saves as you type ✨
        </p>
      </div>
    </div>
  );
};

export default JournalPage;
