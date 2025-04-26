// Functions, Helpers, Utils, and Hooks
import login from "@/functions/network/auth/login";
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { LoginCredentials } from "../../../screens/Login";

/**
 * Handles the login process.
 * @param loginCredentials The login credentials.
 * @param setLoading The function to set the loading state.
 * @param errorMsg The error message.
 * @param setErrorMsg The function to set the error message.
 * @param authenticate The function to authenticate the user.
 * @param translate The function to translate the text.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
*/

interface HandleLoginProps {
    loginCredentials: LoginCredentials;
    setLoading: (loading: boolean) => void;
    errorMsg: string | null;
    setErrorMsg: (errorMsg: string | null) => void;
    authenticate: (token: string) => Promise<void>;
    translate: (key: string) => string;
}

const handleLogin = async ({ loginCredentials, setLoading, errorMsg, setErrorMsg, authenticate, translate }: HandleLoginProps) => {
    try {
        setLoading(true);
        const token = await login(
            loginCredentials.username,
            loginCredentials.password
        );

        if (loginCredentials.username && loginCredentials.password) {
            saveEncrypted("loginCreds", loginCredentials);
        }

        if (token === null) {
            setErrorMsg(translate("authError"));
            setLoading(false);
        } else if (token != null) {
            if (errorMsg !== null) {
                setErrorMsg(null);
            }
            setLoading(false);
            await authenticate(token);
        }
    } catch (error) {
        setLoading(false);
        setErrorMsg(translate("authError"));
        console.error("Login error:", error);
    }
};

export default handleLogin;