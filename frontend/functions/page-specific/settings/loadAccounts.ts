// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Account } from "../../../../shared/types/Account";

/**
 * Loads the account information from secure storage.
 * @param setAccounts The function to set the account information.
 * @returns {Promise<void>} A promise that resolves when the account information is loaded successfully.
*/

const loadAccounts = async (setAccounts: React.Dispatch<React.SetStateAction<Account>>) => {
    const stored = await loadEncrypted("accounts");
    if (stored) {
        setAccounts(stored);
        console.log("Accounts loaded successfully.");
    } else {
        console.log("No stored accounts found.");
    }
};

export default loadAccounts;