// Library Imports
import React, { useEffect } from "react";
import MainNavigator from "@/navigation/MainNavigator";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { AuthProvider } from "../components/auth/authContext";
import { LocalizationProvider } from "../components/localization/LocalizationContext";

const App = () => {
  useEffect(() => {
    const configureNavBar = async () => {
      try {
        await NavigationBar.setVisibilityAsync("visible");
        await NavigationBar.setButtonStyleAsync("light");
      } catch (e) {
        console.warn("Failed to set navigation bar color:", e);
      }
    };

    configureNavBar();
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <LocalizationProvider>
        <AuthProvider>
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <StatusBar
              style="light"
              backgroundColor="transparent"
              translucent
            />
            <MainNavigator />
          </View>
        </AuthProvider>
      </LocalizationProvider>
    </NavigationContainer>
  );
};

export default App;
