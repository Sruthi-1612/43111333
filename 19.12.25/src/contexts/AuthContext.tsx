import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const API_URL = 'http://localhost:8080/api/auth';

interface User {
  id?: number;
  username: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, displayName: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const register = async (username: string, password: string, displayName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, displayName }),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        setError(data.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      if (errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch')) {
        setError('Cannot connect to backend. Ensure the server is running on http://localhost:8080');
      } else {
        setError(errorMsg);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData: User = {
          id: data.id,
          username: data.username,
          displayName: data.displayName,
        };
        setUser(userData);
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        return true;
      } else {
        setError(data.message || 'Login failed');
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      if (errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch')) {
        setError('Cannot connect to backend. Ensure the server is running on http://localhost:8080');
      } else {
        setError(errorMsg);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    setLoading(false);
    setError(null);
    const guestUser: User = {
      username: 'guest',
      displayName: 'Guest User',
    };
    setUser(guestUser);
    localStorage.setItem('loggedInUser', JSON.stringify(guestUser));
    localStorage.setItem('isGuest', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginAsGuest, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
