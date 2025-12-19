import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestFlag = localStorage.getItem('isGuest') === 'true';
    setIsGuest(guestFlag);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <div className={`shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            User Profile
          </h1>
          <button
            onClick={() => navigate('/home')}
            className={`p-3 rounded-lg transition ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="Back to Home"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Guest Badge */}
        {isGuest && (
          <div className={`rounded-lg p-4 mb-6 border-l-4 ${isDark ? 'bg-yellow-900 border-yellow-400 text-yellow-200' : 'bg-yellow-50 border-yellow-400 text-yellow-800'}`}>
            <p className="font-semibold">👤 Guest Mode</p>
            <p className="text-sm">You are logged in as a guest. Register to save your data permanently!</p>
          </div>
        )}

        {/* Profile Card */}
        <div className={`rounded-2xl shadow-xl p-8 max-w-md mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg ${
              isDark ? 'bg-gradient-to-br from-cyan-600 to-purple-600' : 'bg-gradient-to-br from-cyan-500 to-purple-500'
            }`}>
              👤
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6 text-center">
            {/* Display Name */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Display Name
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                {user.displayName}
              </p>
            </div>

            {/* Username */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Username
              </p>
              <p className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                @{user.username}
              </p>
            </div>

            {/* User ID */}
            {user.id && (
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  User ID
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.id}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Account Info Section */}
        <div className={`rounded-2xl shadow-xl p-8 max-w-md mx-auto mt-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Account Information
          </h3>
          <div className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>✓ Registered with Habit Tracker</p>
            <p>✓ All data synced with backend</p>
            <p>✓ Secure login with password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
