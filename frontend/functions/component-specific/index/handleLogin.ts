import getToken from "../../network/auth/getToken";
import login from "../../network/auth/login";

import { SetStateBoolean } from "../../../types/SetState";

const handleLogin = async (
  setIsAuthenticated: SetStateBoolean,
  setAuthError: SetStateBoolean
) => {
  try {
    const token = await getToken();
    if (token !== null) {
      await login(token, setIsAuthenticated);
    }
    setAuthError(false);
  } catch (error) {
    console.error("Failed to handle login:", error);
    setAuthError(true);
  }
};

export default handleLogin;
