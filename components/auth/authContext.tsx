import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isAuthenticated: boolean;
  authCookie: string | null; // sid cookie
  token: string | null; // x.X_HW_Token
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCookie, setAuthCookie] = useState<string | null>(null); // Store sid cookie
  const [token, setToken] = useState<string | null>(null); // Store x.X_HW_Token

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const cookie = await AsyncStorage.getItem("authCookie");
      const savedToken = await AsyncStorage.getItem("x.X_HW_Token");
      if (cookie && savedToken) {
        setIsAuthenticated(true); // Set authenticated if both cookie and token exist
        setAuthCookie(cookie); // Set sid cookie
        setToken(savedToken); // Set x.X_HW_Token
      }
    };

    checkAuthStatus();
  }, []); // Run only on component mount

  const login = async (token: string) => {
    await AsyncStorage.setItem("x.X_HW_Token", token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authCookie");
    await AsyncStorage.removeItem("x.X_HW_Token");
    setIsAuthenticated(false);
    setAuthCookie(null); // Clear sid cookie
    setToken(null); // Clear x.X_HW_Token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authCookie, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
