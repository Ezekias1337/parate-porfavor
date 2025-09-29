// Types
import { Account } from "../../../../shared/types/Account";

/**
 * Handles the input change for the settings page.
 * @param field The field to update.
 * @param selectedAccount The current account settings.
 * @param setSelectedAccount The function to update the account settings.
 * @returns {string} The updated account settings.
*/

type fields = "serverUrl" | "modemUrl" | "username" | "password" | "description";

const handleInputChange =
    (field: fields, selectedAccount: Account,
        setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>) => (text: string) => {
            const newUrlSettings = {
                ...selectedAccount,
                [field]: text,
            };

            setSelectedAccount(newUrlSettings);
        };

export default handleInputChange;