// Functions, Helpers, Utils, and Hooks
import login from "@/functions/network/auth/login";
import { saveEncrypted } from "@/utils/secureStorage";
// Types
import { LoginCredentials } from "../../../screens/Login";

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