// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";

/**
 * Loads the URL settings from secure storage and sets them to the state.
 * @returns {Promise<void>} A promise that resolves when the last used profile is saved successfully.
*/

interface LoadCredsProps {
    setLastUsedProfile: React.Dispatch<string>;
}

const loadCreds = async ({ setLastUsedProfile }: LoadCredsProps): Promise<string | null> => {
    const stored = await loadEncrypted("lastUsedProfile");
    if (stored) {
        setLastUsedProfile(stored);
        return stored;
    }
    return null;
}

export default loadCreds;