import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, register, loginAsGuest, loading, error } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (isRegister) {
      if (!username || !password || !displayName) {
        setLocalError('All fields are required');
        return;
      }
      const success = await register(username, password, displayName);
      if (success) {
        setLocalError('');
        setIsRegister(false);
        alert('Registration successful! Please login.');
        setUsername('');
        setPassword('');
        setDisplayName('');
      } else {
        // Error is already set from AuthContext
      }
    } else {
      if (!username || !password) {
        setLocalError('Username and password are required');
        return;
      }
      const success = await login(username, password);
      if (success) {
        navigate('/home');
      }
      // Error is already set from AuthContext
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/home');
  };

  const displayError = localError || error;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg transition shadow-lg ${isDark ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
          title="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
      <div className={`rounded-2xl shadow-2xl p-8 w-full max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter your password"
            />
          </div>

          {isRegister && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="How should we call you?"
              />
            </div>
          )}

          {displayError && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
              {displayError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Guest Login Option */}
        <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}>
          <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Want to try it out first?
          </p>
          <button
            onClick={handleGuestLogin}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
          >
            Continue as Guest
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setLocalError('');
              setUsername('');
              setPassword('');
              setDisplayName('');
            }}
            className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'}`}
          >
            {isRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
