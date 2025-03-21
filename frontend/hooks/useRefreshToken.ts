// Library Imports
import { useEffect, useRef } from "react";
// Functions, Helpers, and Utils
import refreshToken from "../functions/network/auth/refreshToken";

const useRefreshToken = (isLoggedIn: boolean) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      intervalRef.current = setInterval(async () => {
        const success = await refreshToken();
        if (!success) {
          console.warn("Failed to refresh token, consider logging out.");
        }
      }, 3000); // Refresh every 3 seconds
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

  return null; // No need to return anything
};

export default useRefreshToken;
