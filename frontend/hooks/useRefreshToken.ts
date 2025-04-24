// Library Imports
import { useEffect, useRef } from "react";
// Functions, Helpers, and Utils
import refreshToken from "../functions/network/auth/refreshToken";
import logout from "../functions/network/auth/logout";
import { useAuth } from "../components/auth/authContext";

const useRefreshToken = (isLoggedIn: boolean) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { logout: logoutAuthentication } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      intervalRef.current = setInterval(async () => {
        const success = await refreshToken();
        if (!success) {
          await logout();
          await logoutAuthentication();
        }
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoggedIn]);

  return null;
};

export default useRefreshToken;
