// Types
import { LoginCredentials } from "../../../screens/Login";

/**
 * Handles the input change for the login form
 * @param field The field to update
 * @param loginCredentials The current login credentials
 * @param setLoginCredentials The function to update the login credentials
 * @returns {Text} The updated login credentials
*/

const handleInputChange =
    (field: "username" | "password", loginCredentials: LoginCredentials, setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>) => (text: string) => {
        const newCredentials = {
            ...loginCredentials,
            [field]: text,
        };
        setLoginCredentials(newCredentials);
    };

export default handleInputChange;