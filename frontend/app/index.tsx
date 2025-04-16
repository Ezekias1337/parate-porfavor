import React from "react";
import MainNavigator from "@/navigation/MainNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// Auth Context
import { AuthProvider } from "../components/auth/authContext";
// Localization Context
import { LocalizationProvider } from "../components/localization/LocalizationContext";

//CSS
import { colors } from "../styles/variables";

const App = () => (
  <NavigationContainer>
    <LocalizationProvider>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" backgroundColor={colors.primary500} />
          <MainNavigator />
        </SafeAreaView>
      </AuthProvider>
    </LocalizationProvider>
  </NavigationContainer>
);

export default App;
