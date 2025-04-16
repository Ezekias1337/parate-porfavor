import React, { useEffect, useState } from "react";
import { loadEncrypted } from "../utils/secureStorage"; // adjust if needed
import { useAuth } from "../components/auth/authContext";
import BottomTabs from "./BottomTabs";
import Login from "../screens/Login";
import Settings from "../screens/Settings";

const MainNavigator = () => {
  const { isAuthenticated } = useAuth();
  const [urlIsSet, setUrlIsSet] = useState<boolean | null>(null); // null means "still loading"

  useEffect(() => {
    const checkServerUrl = async () => {
      const urlSettings = await loadEncrypted("urlSettings");

      if (
        !urlSettings ||
        typeof urlSettings !== "object" ||
        !urlSettings.serverUrl ||
        urlSettings.serverUrl.trim() === ""
      ) {
        setUrlIsSet(false);
      } else {
        setUrlIsSet(true);
      }
    };

    checkServerUrl();
  }, []);

  if (urlIsSet === null) {
    // Optional: render a loading indicator here
    return null;
  }
  
  if (!urlIsSet) {
    return <Settings isFirstLoad={true} setUrlIsSet={setUrlIsSet} />;
  }
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  

  return <BottomTabs />;
};

export default MainNavigator;
