// Library Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Localization from "expo-localization";

const translations: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  en: {
    welcome: "Welcome",
    login: "Login",
  },
  es: {
    welcome: "Bienvenido",
    login: "Iniciar Sesión",
  },
};

// Create a context
const LocalizationContext = createContext({
  translate: (key: string) => key,
  locale: "en",
  setLocale: (locale: string) => {},
});

// Localization provider component
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState(Localization.locale.split("-")[0]);

  const translate = (key: string) => {
    return translations[locale][key] || key;
  };

  useEffect(() => {
    const deviceLanguage = Localization.locale.split("-")[0];
    setLocale(deviceLanguage);
  }, []);

  return (
    <LocalizationContext.Provider value={{ translate, locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use the localization context
export const useLocalization = () => useContext(LocalizationContext);
