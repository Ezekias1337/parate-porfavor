import React from "react";
import { useAuth } from "../components/auth/authContext"; // Auth context
import BottomTabs from "./BottomTabs"; // Bottom tabs
import Login from "../screens/Login"; // Login screen

const MainNavigator = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <BottomTabs /> : <Login />;
};

export default MainNavigator;
