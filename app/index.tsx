import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@/navigation/RootNavigator";
import MainNavigator from "@/navigation/MainNavigator";
// Auth Context
import { AuthProvider, useAuth } from "../components/auth/authContext";
// Localization Context
import { LocalizationProvider } from "../components/localization/LocalizationContext";
// Screens and Navigation
import Login from "../screens/Login";
import BottomTabs from "../navigation/BottomTabs";
import Home from "@/screens/Home";



const App = () => (
  <AuthProvider>
    <LocalizationProvider>
      {/* <NavigationContainer>
        <MainNavigator />
        <Login />
      </NavigationContainer> */}
      {/* <Login /> */}
      {/* <Home /> */}
      <MainNavigator />
    </LocalizationProvider>
  </AuthProvider>
);

export default App;
