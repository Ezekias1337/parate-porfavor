import * as Localization from "expo-localization";

const SUPPORTED_LANGUAGES = ["en", "es"];

export const getInitialLanguage = (): string => {
  const deviceLanguage = Localization.locale.split("-")[0]; // This will extract "es" from "es-MX"

  // Return language if supported, else fallback to "en"
  return SUPPORTED_LANGUAGES.includes(deviceLanguage) ? deviceLanguage : "en";
};
