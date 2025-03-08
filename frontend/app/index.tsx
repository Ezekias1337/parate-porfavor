import React from "react";
import MainNavigator from "@/navigation/MainNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
// Auth Context
import { AuthProvider } from "../components/auth/authContext";
// Localization Context
import { LocalizationProvider } from "../components/localization/LocalizationContext";

//CSS
import { colors } from "../styles/variables";

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <AuthProvider>
      <LocalizationProvider>
        <StatusBar style="light" backgroundColor={colors.primary500} />
        <MainNavigator />
      </LocalizationProvider>
    </AuthProvider>
  </SafeAreaView>
);

export default App;
