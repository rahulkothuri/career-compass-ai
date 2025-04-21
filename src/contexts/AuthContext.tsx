
import { createContext, useContext, useState } from 'react';

// Define the AuthContext types
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

// AuthProvider component that will wrap the app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simplified login function without Cognito
  const login = async (username: string, password: string) => {
    // This is a placeholder - no actual authentication happens
    setIsAuthenticated(true);
    console.log(`User logged in: ${username}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
