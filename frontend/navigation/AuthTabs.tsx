// Library Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import LoginScreen from "../screens/Login";
import SettingsScreen from "../screens/Settings";
// Components
import TabIcon from "./TabIcon";
// Hooks
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { bottomTabStyles } from "../styles/component-specific/bottom-tabs";
import { colors } from "../styles/variables";

const Tab = createBottomTabNavigator();

const AuthTabs = () => {
  const { translate } = useLocalization();

  return (
    <Tab.Navigator
      initialRouteName={translate("login")}
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomTabStyles.tabBar,
        tabBarInactiveTintColor: colors.neutral200,
        tabBarActiveTintColor: colors.primary500,
        sceneStyle: { backgroundColor: colors.neutral800 },
      }}
    >
      <Tab.Screen
        name={translate("login")}
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="sign-in" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate("settings")}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="gears" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthTabs;
