import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { getInitialLanguage } from "./languageDetector";

interface LocalizationContextValue {
  translate: (key: string) => string;
  language: string;
}

const LocalizationContext = createContext<LocalizationContextValue>({
  translate: (key) => key,
  language: "es",
});

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState("es");

  useEffect(() => {
    // Set the language based on device settings
    const initialLanguage = getInitialLanguage();
    setLanguageState(initialLanguage);
  }, []);

  const translate = useCallback(
    (key: string) => {
      const translations: { [key: string]: { [key: string]: string } } = {
        en: {
          welcome: "Welcome",
          login: "Login",
          logout: "Logout",
          username: "Username",
          password: "Password",
          authSuccess: "Authentication successful!",
          authError:
            "Failed to login. Please verify your username & password and try again.",
          home: "Home",
          modem: "Modem",
          devices: "Devices",
        },
        es: {
          welcome: "Bienvenido",
          login: "Iniciar Sesión",
          logout: "Cerrar Sesión",
          username: "Usuario",
          password: "Contraseña",
          authSuccess: "¡Autenticación exitosa!",
          authError:
            "No se pudo iniciar sesión. Verifique su nombre de usuario y contraseña e inténtelo nuevamente.",
          home: "Inicio",
          modem: "Modem",
          devices: "Dispositivos",
        },
      };

      return translations[language]?.[key] || key;
    },
    [language]
  );

  return (
    <LocalizationContext.Provider value={{ translate, language }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
