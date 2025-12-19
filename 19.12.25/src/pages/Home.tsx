import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface Habit {
  id: string;
  name: string;
  time: string; // Time in HH:MM format
  completedDates: string[];
  createdAt: string;
}

type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1 = very sad, 5 = very happy

interface MoodEntry {
  date: string;
  mood: MoodLevel | 0;
}

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('08:00');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const today = new Date().toDateString();

  // Get current week (Sunday to Saturday) for the viewDate
  const getCurrentWeek = () => {
    const curr = new Date(viewDate);
    const first = curr.getDate() - curr.getDay(); // First day is Sunday
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(curr);
      date.setDate(first + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getCurrentWeek();
  const currentMonth = viewDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const goToPreviousMonth = () => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Load habits for this user
    const savedHabits = localStorage.getItem(`habits_${user.username}`);
    if (savedHabits) {
      const parsed = JSON.parse(savedHabits) as any[];
      let needsMigration = false;
      const migrated: Habit[] = parsed.map((h) => {
        if (!('createdAt' in h)) {
          needsMigration = true;
          const dates: string[] = Array.isArray(h.completedDates) ? h.completedDates : [];
          let createdAt = today;
          if (dates.length > 0) {
            const minTime = Math.min(
              ...dates.map((d) => {
                const dt = new Date(d);
                return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
              })
            );
            createdAt = new Date(minTime).toDateString();
          }
          return { ...h, createdAt } as Habit;
        }
        return h as Habit;
      });
      if (needsMigration) {
        saveHabits(migrated);
      } else {
        setHabits(migrated);
      }
    }

    // Load moods for this user
    const savedMoods = localStorage.getItem(`moods_${user.username}`);
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    }
  }, [user, navigate]);

  const saveHabits = (updatedHabits: Habit[]) => {
    if (user) {
      localStorage.setItem(`habits_${user.username}`, JSON.stringify(updatedHabits));
      setHabits(updatedHabits);
    }
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      time: newHabitTime,
      completedDates: [],
      createdAt: today,
    };

    const updatedHabits = [...habits, newHabit];
    saveHabits(updatedHabits);
    setNewHabitName('');
    setNewHabitTime('08:00');
    setShowAddForm(false);
  };

  const toggleHabit = (habitId: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompletedToday
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today],
        };
      }
      return habit;
    });
    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    saveHabits(updatedHabits);
  };


  const setMoodForToday = (mood: MoodLevel) => {
    const updatedMoods = moods.filter((m) => m.date !== today);
    updatedMoods.push({ date: today, mood });
    saveMoods(updatedMoods);
  };

  const getTodayMood = (): MoodLevel | 0 | null => {
    const todayMood = moods.find((m) => m.date === today);
    return todayMood ? todayMood.mood : null;
  };

  const getMoodColor = (mood: MoodLevel): string => {
    switch (mood) {
      case 1: return 'bg-red-600';      // Very sad
      case 2: return 'bg-orange-500';   // Sad
      case 3: return 'bg-yellow-500';   // Neutral
      case 4: return 'bg-lime-500';     // Happy
      case 5: return 'bg-green-600';    // Very happy
      default: return 'bg-gray-300';
    }
  };

  const getMoodEmoji = (mood: MoodLevel): string => {
    switch (mood) {
      case 1: return '😢';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😄';
      default: return '😐';
    }
  };

  const getLast49Days = (): MoodEntry[] => {
    const result: MoodEntry[] = [];
    for (let i = 48; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const mood = moods.find((m) => m.date === dateString);
      result.push({
        date: dateString,
        mood: mood ? mood.mood : (0 as any), // 0 = no mood set
      });
    }
    return result;
  };

  const getWeeklyMoodData = () => {
    const weeks: { weekStart: string; days: MoodEntry[] }[] = [];
    const last49Days = getLast49Days();
    
    for (let i = 0; i < last49Days.length; i += 7) {
      const weekDays = last49Days.slice(i, i + 7);
      const firstDay = new Date(weekDays[0].date);
      const weekStart = firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      weeks.push({ weekStart, days: weekDays });
    }
    
    return weeks;
  };

  const isCompletedToday = (habit: Habit) => {
    return habit.completedDates.includes(today);
  };

  const isCompletedOn = (habit: Habit, dateStr: string) => {
    return habit.completedDates.includes(dateStr);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const saveMoods = (updatedMoods: MoodEntry[]) => {
    if (user) {
      localStorage.setItem(`moods_${user.username}`, JSON.stringify(updatedMoods));
      setMoods(updatedMoods);
    }
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <div className={`shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Habit Tracker</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg transition ${isDark ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mindful Quotes, Journal, and Profile Icons */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={() => navigate('/profile')}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isDark ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-500 hover:bg-cyan-600'
            }`}
            title={`User Profile - ${user.displayName}`}
          >
            <span className="text-2xl">👤</span>
          </button>
          <button
            onClick={() => navigate('/journal')}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isDark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
            }`}
            title="My Journal"
          >
            <span className="text-2xl">📖</span>
          </button>
          <button
            onClick={() => navigate('/quotes')}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
            }`}
            title="View Mindful Quotes"
          >
            <span className="text-2xl">🧘</span>
          </button>
        </div>

        {/* Welcome Box */}
        <div className={`rounded-2xl shadow-xl p-8 mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            Welcome back, {user.displayName}! 🎉
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your daily habits and build better routines
          </p>
        </div>

        {/* Mood Jar Section */}
        <div className={`rounded-2xl shadow-xl p-8 mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>How's your mood today?</h3>
          
          {/* Mood Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {([1, 2, 3, 4, 5] as MoodLevel[]).map((mood) => (
              <button
                key={mood}
                onClick={() => setMoodForToday(mood)}
                className={`p-4 rounded-xl transition-all transform hover:scale-110 ${
                  getTodayMood() === mood
                    ? `${getMoodColor(mood)} text-white shadow-lg scale-105`
                    : isDark
                    ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                title={['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'][mood - 1]}
              >
                <span className="text-3xl">{getMoodEmoji(mood)}</span>
              </button>
            ))}
          </div>

          {/* Mood Heatmap */}
          <div>
            <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Mood Heat Map
            </h4>
            
            {/* Day of Week Headers */}
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="w-16"></div>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div key={idx} className={`text-center text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap Grid by Weeks */}
            <div className="space-y-2">
              {getWeeklyMoodData().map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-cols-8 gap-2 items-center">
                  {/* Week Start Label */}
                  <div className={`text-sm font-medium w-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {week.weekStart}
                  </div>
                  
                  {/* Day Squares */}
                  {week.days.map((entry, dayIdx) => {
                    const isToday = entry.date === today;
                    return (
                      <div
                        key={dayIdx}
                        className={`w-12 h-12 rounded transition-all hover:scale-110 cursor-default ${
                          entry.mood === 0
                            ? isDark
                              ? 'bg-gray-700'
                              : 'bg-gray-200'
                            : getMoodColor(entry.mood)
                        } ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                        title={entry.mood === 0 ? entry.date : `${entry.date}: ${getMoodEmoji(entry.mood)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Days and Dates Calendar */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Month/Year Header with Navigation */}
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={goToPreviousMonth}
              className={`p-2 hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} rounded-lg transition`}
              aria-label="Previous month"
            >
              <span className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>←</span>
            </button>
            <div className="mx-8 px-6 py-2 bg-cyan-200 rounded-full">
              <span className="font-semibold text-gray-800">{currentMonth}</span>
            </div>
            <button 
              onClick={goToNextMonth}
              className={`p-2 hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} rounded-lg transition`}
              aria-label="Next month"
            >
              <span className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>→</span>
            </button>
          </div>

          {/* Days of Week and Dates */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date, index) => {
              const isToday = date.toDateString() === today;
              const dateStr = date.toDateString();
              const isSelected = dateStr === selectedDate;
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayDate = date.getDate();
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <span className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {dayName}
                  </span>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold transition-all ${
                      isToday 
                        ? 'bg-cyan-400 text-gray-900' 
                        : isDark ? 'text-gray-300' : 'text-gray-800'
                    } ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-transparent' : ''}`}
                  >
                    {dayDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* History for Selected Date */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Habit History — {selectedDate}
          </h3>
          {(() => {
            const selected = new Date(selectedDate);
            const startOfSelected = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
            const applicable = habits.filter((h) => {
              const created = new Date(h.createdAt);
              const startOfCreated = new Date(created.getFullYear(), created.getMonth(), created.getDate());
              return startOfCreated.getTime() <= startOfSelected.getTime();
            });
            const completed = applicable.filter((h) => isCompletedOn(h, selectedDate));
            const missed = applicable.filter((h) => !isCompletedOn(h, selectedDate));
            const notApplicable = habits.filter((h) => {
              const created = new Date(h.createdAt);
              const startOfCreated = new Date(created.getFullYear(), created.getMonth(), created.getDate());
              return startOfCreated.getTime() > startOfSelected.getTime();
            });

            if (habits.length === 0) {
              return (
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No habits yet.</p>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                    Completed ({completed.length})
                  </h4>
                  {completed.length === 0 ? (
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>None</p>
                  ) : (
                    <ul className="space-y-2">
                      {completed.map((h) => (
                        <li key={h.id} className={`flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                          <span className="text-green-500">✓</span>
                          <span className="font-medium">{h.name}</span>
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>• {h.time}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                    Missed ({missed.length})
                  </h4>
                  {missed.length === 0 ? (
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>None</p>
                  ) : (
                    <ul className="space-y-2">
                      {missed.map((h) => (
                        <li key={h.id} className={`flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                          <span className="text-red-500">✗</span>
                          <span className="font-medium">{h.name}</span>
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>• {h.time}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {notApplicable.length > 0 && (
                  <div className="md:col-span-2">
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Not Applicable Yet ({notApplicable.length})
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {notApplicable.map((h) => (
                        <li key={h.id} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                          {h.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Add Habit Button */}
        <div className="mb-8 flex justify-center">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
            >
              ➕ Add New Habit
            </button>
          ) : (
            <div className={`rounded-xl shadow-lg p-6 w-full max-w-md ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="Habit name..."
                className={`w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && addHabit()}
              />
              <input
                type="time"
                value={newHabitTime}
                onChange={(e) => setNewHabitTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <div className="flex gap-2">
                <button
                  onClick={addHabit}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewHabitName('');
                    setNewHabitTime('08:00');
                  }}
                  className={`flex-1 ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} py-2 rounded-lg transition`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Habits Timeline */}
        {habits.length === 0 ? (
          <div className={`text-center text-xl p-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="mb-2">No habits yet! 🌟</p>
            <p className="text-lg opacity-90">Click "Add New Habit" to get started</p>
          </div>
        ) : (
          <div className={`rounded-2xl shadow-xl p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Today's Schedule</h3>
            <div className="space-y-4">
              {habits
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((habit) => {
                  const isCompleted = isCompletedToday(habit);
                  return (
                    <div
                      key={habit.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border-l-4 transition ${
                        isCompleted
                          ? isDark
                            ? 'bg-green-900 border-green-500'
                            : 'bg-green-50 border-green-500'
                          : isDark
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {/* Time */}
                      <div className={`font-semibold text-lg w-20 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {habit.time}
                      </div>

                      {/* Habit Name */}
                      <div className="flex-1">
                        <p className={`font-semibold ${isCompleted ? (isDark ? 'text-green-300' : 'text-green-700') : isDark ? 'text-gray-100' : 'text-gray-800'} ${isCompleted ? 'line-through' : ''}`}>
                          {habit.name}
                        </p>
                      </div>

                      {/* Status Circle */}
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all transform hover:scale-110 font-bold text-sm ${
                          isCompleted
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-600'
                        }`}
                        title={`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}
                      >
                        {isCompleted ? '✓' : '○'}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${habit.name}"?`)) {
                            deleteHabit(habit.id);
                          }
                        }}
                        className={`text-lg opacity-60 hover:opacity-100 transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
