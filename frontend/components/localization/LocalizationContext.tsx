// Library Imports
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
// Functions, Helpers, Utils, and Hooks
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
          parentalControls: "Parental Controls",
          scheduledRestriction: "Restriction",
          createScheduledRestriction: "Create Scheduled Restriction",
          createScheduledRestrictionAlert:
            "Enter the desired name of the scheduled restriction. \n \n When you want to apply this restriction to devices in the future this will be the name you reference.",
          devices: "Devices",
          deviceDescription: "Device Description",
          cpuUsed: "CPU Used",
          ramUsed: "RAM Used",
          systemTime: "System Time",
          serverError:
            "Could not communicate with the server. Please try again later.",
          errorGettingModemStatus:
            "Could not get modem status. Press button to try again. If it still doesn't work, try logging out and logging back in.",
          rebootModem: "Reboot Modem",
          modemIsRebooting: "Modem is rebooting in... Logging you out in:",
          seconds: "seconds",
          refresh: "Refresh",
          macFilter: "MAC Filter",
          enabled: "Enabled",
          disabled: "Disabled",
          filterMode: "Filter Mode",
          blacklist: "Blacklist",
          whitelist: "Whitelist",
          deviceName: "Device Name",
          ipAddress: "IP Address",
          ssid: "SSID",
          macAddress: "MAC Address",
          addDevice: "Add Device to Filter",
          noParentalControlTemplates:
            "No parental control templates found.\n\n\nGo to the parental controls page to create one.\n\n\nIf you have already created a template, close this window and refresh the page.",
          addToParentalControls: "Add Device to Parental Controls",
          failedToAddParentalControls:
            "Failed to add device to parental controls. Please try again.",
          removeDevice: "Remove Device from Parental Controls",
          deviceAdded: "Device added successfully!",
          deviceRemoved: "Device removed successfully!",
          blockInternetIndefinitely: "Block Indefinitely",
          blockInternetOnSchedule: "Block on Schedule",
          addNewSchedule: "Add New Schedule",
          removeScheduleRestriction: "Remove Schedule",
          unblockDevice: "Unblock Device",
          connectionStatus: "Connection Status",
          connected: "Connected",
          online: "Online",
          offline: "Offline",
          blocked: "Blocked",
          or: "or",
          saveChanges: "Save Changes",
          cancel: "Cancel",
          sunday: "Sunday",
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          allowedInternetPeriod: "Allowed Internet Period",
          applyRestriction: "Apply Restriction",
          devicesUnderRestriction: "Devices Under Restriction",
          description: "Description",
          modifyScheduledRestriction: "Modify Schedule",
          noDevices: "No devices",
          settings: "Settings",
          serverUrl: "Server URL",
          modemUrl: "Modem URL",
          settingsSaved: "Profile updated successfully!",
          settingsError:
            "Failed to save settings. Check to make sure all fields are filled out and try again.",
          serverUrlNeeded:
            "Please create a profile.\n\nThis allows you to manage several modems without having to retype your password.",
          createProfileInstructions:
            "The Username and Password fields are for your modem's login credentials, the same one you use to access the web interface. \n\nThe Server URL is the address where the server is hosted. \n\nThe Modem URL is the local IP address of your modem.",
          edit: "Edit",
          delete: "Delete",
          missingDays: "Missing Days",
          missingTimePeriods: "Missing Time Periods",
          restrictionName: "Restriction Name",
          allowedDays: "Allowed Days",
          allowedStartTime: "Allowed Start Time (HH:MM)",
          allowedEndTime: "Allowed End Time (HH:MM)",
          addTimePeriodError:
            "Please enter a valid start and end time. The time must be in the 12 hour format of HH:MM. For example:\n\n8:00 AM - 9:00 PM",
          needToSelectDays: "Please select at least one day.",
          incorrectTimeRange:
            "Your start time must be before your end time and your end time must be after your start time.",
          tooManySchedules:
            "There is a maximum of 4 scheduled restrictions that can be added to each template.",
          deleteCache: "Delete Cache",
          search: "Search",
          noResults: "No results",
          searchExplanation:
            "Search for devices by name, IP address, SSID, or MAC address.",
          wakeOnLan: "Wake On Lan",
          addProfile: "Create Profile",
          editProfile: "Edit Profile",
          profileDescription: "Profile Description",
          profileAdded: "Profile added successfully!",
          profileEdited: "Profile edited successfully!",
          profileDeleted: "Profile deleted successfully!",
          confirmDeleteProfile: "Are you sure you want to delete this profile?",
          deleteProfile: "Delete Profile",
          noProfiles: "No profiles",
          favorites: "Favorites",
          favoritesExplanation: "Here you can quickly access your favorite devices of the last used profile.",
          noFavorites:
            "No favorite devices have been added. You can add devices to your favorites by going to the devices page and tapping the heart icon next to a device.",
          note: "Note",
          addNote: "Add Note",
          deleteNote: "Delete Note",
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
          scheduledRestriction: "Restricción",
          createScheduledRestriction: "Crear Restricción Programada",
          createScheduledRestrictionAlert:
            "Ingrese el nombre deseado de la restricción programada. \n \n Cuando quiera aplicar esta restricción a dispositivos en el futuro, esto será el nombre que referencia.",
          devices: "Dispositivos",
          deviceDescription: "Descripción del Dispositivo",
          cpuUsed: "CPU Usado",
          ramUsed: "RAM Usada",
          systemTime: "Tiempo del Sistema",
          serverError:
            "No se pudo comunicar con el servidor. Por favor, inténtelo de nuevo mas tarde.",
          errorGettingModemStatus:
            "No se pudo obtener el estado del modem. Presione el botón para intentarlo de nuevo. Si sigue sin funcionar, inténtelo cerrando y vuelvéndose a iniciar sesión.",
          rebootModem: "Reiniciar Modem",
          modemIsRebooting:
            "El modem se esta reiniciando... Cerrando sesión en:",
          seconds: "segundos",
          refresh: "Actualizar",
          macFilter: "Filtro MAC",
          enabled: "Activado",
          disabled: "Desactivado",
          filterMode: "Modo de Filtro",
          blacklist: "Lista Negra",
          whitelist: "Lista Blanca",
          deviceName: "Nombre del Dispositivo",
          ipAddress: "Dirección IP",
          ssid: "SSID",
          macAddress: "Dirección MAC",
          addDevice: "Agregar Dispositivo a Filtro",
          noParentalControlTemplates:
            "No hay plantillas de controles parentales disponibles.\n\n\nVe a la sección de Controles Parentales para crear una.\n\n\nSí ya creaste una cierre esa dialogo y toca el botón para actualizar.",
          addToParentalControls: "Agregar Dispositivo a Controles Parentales",
          failedToAddParentalControls:
            "No se pudo agregar el dispositivo a los controles parentales. Por favor, inténtelo de nuevo.",
          removeDevice: "Eliminar Dispositivo a Controles Parentales",
          deviceAdded: "Dispositivo agregado correctamente!",
          deviceRemoved: "Dispositivo eliminado correctamente!",
          blockInternetIndefinitely: "Bloquear Indefinidamente",
          blockInternetOnSchedule: "Bloquear en Horario",
          addNewSchedule: "Agregar Nuevo Horario",
          removeScheduleRestriction: "Eliminar Horario",
          unblockDevice: "Desbloquear Dispositivo",
          connectionStatus: "Estado de Conexión",
          connected: "Conectado",
          online: "En Línea",
          offline: "Desconectado",
          blocked: "Bloqueado",
          or: "o",
          saveChanges: "Guardar Cambios",
          cancel: "Cancelar",
          sunday: "Domingo",
          monday: "Lunes",
          tuesday: "Martes",
          wednesday: "Miercoles",
          thursday: "Jueves",
          friday: "Viernes",
          saturday: "Sabado",
          allowedInternetPeriod: "Período de Internet Permitido",
          applyRestriction: "Aplicar Restricción",
          devicesUnderRestriction: "Dispositivos Restringidos",
          description: "Descripción",
          modifyScheduledRestriction: "Modificar Horario",
          noDevices: "No hay dispositivos",
          settings: "Ajustes",
          serverUrl: "URL del Servidor",
          modemUrl: "URL del Modem",
          settingsSaved: "Perfil actualizado exitosamente!",
          settingsError:
            "No se pudieron guardar los ajustes. Por favor, inténtelo de nuevo. Verifique que todos los campos estén completos.",
          serverUrlNeeded:
            "Cree un perfil.\n\nEsto le permitirá administrar varios módems sin tener que volver a escribir su contraseña.",
          createProfileInstructions:
            "Los campos de Usuario y Contraseña son para las credenciales de inicio de sesión de su módem, las mismas que usa para acceder a la interfaz web. \n\nLa URL del Servidor es la dirección donde se aloja el servidor. \n\nLa URL del Modem es la dirección IP local de su módem.",
          edit: "Editar",
          delete: "Eliminar",
          missingDays: "Faltan Días",
          missingTimePeriods: "Faltan Períodos de Tiempo",
          restrictionName: "Nombre de la Restricción",
          allowedDays: "Días Permitidos",
          allowedStartTime: "Hora de Inicio Permitida (HH:MM)",
          allowedEndTime: "Hora de Fin Permitida (HH:MM)",
          addTimePeriodError:
            "Ingrese una hora de inicio y de fin válida. La hora debe estar en formato de 12 horas (HH:MM). Por ejemplo:\n\n8:00 AM - 9:00 PM",
          needToSelectDays: "Debe seleccionar al menos un día",
          incorrectTimeRange:
            "La hora de inicio debe ser menor que la hora de fin y la hora de fin debe ser mayor que la hora de inicio",
          tooManySchedules:
            "Hay un máximo de 4 horarios permitidos por cada restricción programada",
          deleteCache: "Borrar Cache",
          search: "Buscar",
          noResults: "No se encontraron resultados",
          searchExplanation:
            "Ingrese el nombre del dispositivo, la dirección MAC, el SSID o la dirección IP para a buscar",
          wakeOnLan: "Despertar Dispositivo",
          addProfile: "Agregar Perfil",
          editProfile: "Editar Perfil",
          profileDescription: "Descripción del Perfil",
          profileAdded: "¡Perfil agregado correctamente!",
          profileEdited: "¡Perfil editado correctamente!",
          profileDeleted: "¡Perfil eliminado correctamente!",
          confirmDeleteProfile:
            "¿Está seguro de que desea eliminar este perfil?",
          deleteProfile: "Eliminar Perfil",
          noProfiles: "No hay perfiles",
          favorites: "Favoritos",
          favoritesExplanation: "Aquí puedes acceder rápidamente a tus dispositivos favoritos del último perfil usado.",
          noFavorites:
            "No hay favoritos. Puede agregar dispositivos a sus favoritos yendo a la página de dispositivos y tocando el ícono de corazón junto a un dispositivo.",
          note: "Nota",
          addNote: "Agregar Nota",
          deleteNote: "Eliminar Nota",
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
