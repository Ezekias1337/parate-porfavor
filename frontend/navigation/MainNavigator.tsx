// Library Imports
import React, { useEffect, useState } from "react";
// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "../utils/secure-storage/secureStorage"; // adjust if needed
import { useAuth } from "../components/auth/authContext";
// Components
import AuthTabs from "./AuthTabs";
import BottomTabs from "./BottomTabs";
// Screens
import Settings from "../screens/Settings";

const MainNavigator = () => {
  const { isAuthenticated } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null); // null means "still loading"

  useEffect(() => {
    const checkIfIsFirstLaunch = async () => {
      const accounts = await loadEncrypted("accounts");

      if (!accounts || accounts?.length === 0) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkIfIsFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  if (isFirstLaunch) {
    return (
      <Settings isFirstLaunch={true} setIsFirstLaunch={setIsFirstLaunch} />
    );
  }

  if (!isAuthenticated) {
    return <AuthTabs />;
  }

  return <BottomTabs />;
};

export default MainNavigator;
