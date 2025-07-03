
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    // Simulate Google OAuth - in real app, this would be actual Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
