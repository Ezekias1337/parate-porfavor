// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { UrlSettings } from "@/screens/Settings";

/**
 * Loads the URL settings from secure storage and sets them to the state.
 * @param setUrlSettings The function to set the URL settings.
 * @returns {Promise<void>} A promise that resolves when the URL settings are loaded successfully.
*/

interface LoadCredsProps {
    setUrlSettings: React.Dispatch<UrlSettings>;
}

const loadCreds = async ({ setUrlSettings }: LoadCredsProps) => {
    const stored = await loadEncrypted("urlSettings");
    if (stored) {
        setUrlSettings(stored);
    }
}

export default loadCreds;