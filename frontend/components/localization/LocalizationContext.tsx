import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { getInitialLanguage } from "./languageDetector";
import rebootModem from "@/functions/network/modem/rebootModem";

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
          parentalControls: "Parental Controls",
          devices: "Devices",
          cpuUsed: "CPU Used",
          ramUsed: "RAM Used",
          systemTime: "System Time",
          serverError: "Could not communicate with the server. Please try again later.",
          errorGettingModemStatus: "Could not get modem status. Press button to try again. If it still doesn't work, try logging out and logging back in.",
          rebootModem: "Reboot Modem",
          modemIsRebooting: "Modem is rebooting in... Logging you out in:",
          seconds: "seconds",
          refresh: "Refresh"
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
          parentalControls: "Controles Parentales",
          devices: "Dispositivos",
          cpuUsed: "CPU Usado",
          ramUsed: "RAM Usada",
          systemTime: "Tiempo del Sistema",
          serverError: "No se pudo comunicar con el servidor. Por favor, inténtelo de nuevo mas tarde.",
          errorGettingModemStatus: "No se pudo obtener el estado del modem. Presione el botón para intentarlo de nuevo. Si sigue sin funcionar, inténtelo cerrando y vuelvéndose a iniciar sesión.",
          rebootModem: "Reiniciar Modem",
          modemIsRebooting: "El modem se esta reiniciando... Cerrando sesión en:",
          seconds: "segundos",
          refresh: "Actualizar"
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
