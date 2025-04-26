// Library Imports
import { useEffect, useRef } from "react";
// Functions, Helpers, and Utils
import refreshToken from "../functions/network/auth/refreshToken";
import logout from "../functions/network/auth/logout";
import { useAuth } from "../components/auth/authContext";

/**
 * A custom hook that refreshes the authentication token every 3 seconds while the user is logged in.
 * @param {boolean} isLoggedIn - A boolean indicating whether the user is logged in or not.
 * @returns {null} - This hook does not return any value.
*/

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
