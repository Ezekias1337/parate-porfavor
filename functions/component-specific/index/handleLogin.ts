import getToken from "../../network/getToken";
import login from "../../network/login";

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
