// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secureStorage";
// Types
import { LoginCredentials } from "@/screens/Login";

const loadCreds = async (setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
    const stored = await loadEncrypted("loginCreds");
    if (stored) {
        setLoginCredentials(stored);
    }
};

export default loadCreds;