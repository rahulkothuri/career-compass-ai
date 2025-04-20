
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { cognitoConfig } from '@/config/cognitoConfig';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.USER_POOL_ID,
  ClientId: cognitoConfig.APP_CLIENT_ID,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(currentUser);
        }
      });
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          setIsAuthenticated(true);
          setUser(cognitoUser);
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };

  const logout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
