// Library Imports
import * as Localization from "expo-localization";

const SUPPORTED_LANGUAGES = ["en", "es"];

export const getInitialLanguage = (): string => {
  const locales = Localization.getLocales();

  if (!locales || locales.length === 0) {
    console.warn("No locales found, falling back to English");
    return "en";
  }

  const { languageCode } = locales[0]; // e.g. "es"

  // Return language if supported, else fallback to "en"
  return SUPPORTED_LANGUAGES.includes(languageCode ?? "")
    ? languageCode!
    : "en";
};
