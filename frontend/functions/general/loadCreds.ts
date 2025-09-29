// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Account } from "../../../shared/types/Account";

/**
 * Loads the URL settings from secure storage and sets them to the state.
 * @param setAccounts The function to set the account details.
 * @returns {Promise<void>} A promise that resolves when the account details are loaded successfully.
*/

interface LoadCredsProps {
    setAccounts: React.Dispatch<Account[]>;
}

const loadCreds = async ({ setAccounts }: LoadCredsProps) => {
    const stored = await loadEncrypted("accounts");
    if (stored) {
        setAccounts(stored);
    }
}

export default loadCreds;