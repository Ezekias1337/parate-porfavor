// Types
import { LoginCredentials } from "../../../screens/Login";

const handleInputChange =
    (field: "username" | "password", loginCredentials: LoginCredentials, setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>) => (text: string) => {
        const newCredentials = {
            ...loginCredentials,
            [field]: text,
        };
        setLoginCredentials(newCredentials);
    };

export default handleInputChange;