// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { LoginCredentials } from "@/screens/Login";

/**
 * Loads the login credentials from secure storage.
 * @param setLoginCredentials The function to set the login credentials.
 * @returns {Promise<void>} A promise that resolves when the credentials are loaded successfully.
*/

const loadCreds = async (setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
    const stored = await loadEncrypted("loginCreds");
    if (stored) {
        setLoginCredentials(stored);
        console.log("Credentials loaded successfully.");
    } else {
        console.log("No stored credentials found.");
    }
};

export default loadCreds;