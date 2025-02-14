import React from "react";
import MainNavigator from "@/navigation/MainNavigator";
import { StatusBar } from "expo-status-bar";
// Auth Context
import { AuthProvider, } from "../components/auth/authContext";
// Localization Context
import { LocalizationProvider } from "../components/localization/LocalizationContext";

//CSS
import { colors } from "../styles/variables";

const App = () => (
  <AuthProvider>
    <LocalizationProvider>
      {/* <NavigationContainer>
        <MainNavigator />
        <Login />
      </NavigationContainer> */}
      {/* <Login /> */}
      {/* <Home /> */}
      <StatusBar style="light" backgroundColor={colors.primary500} />
      <MainNavigator />
    </LocalizationProvider>
  </AuthProvider>
);

export default App;
