// Library Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import ParentalControlsScreen from "../screens/ParentalControls";
import ModemScreen from "../screens/Modem";
import DevicesScreen from "../screens/Devices";
import SettingsScreen from "../screens/Settings";
// Components
import TabIcon from "./TabIcon";
// Functions
import logout from "../functions/network/auth/logout";
// Hooks
import { useLocalization } from "../components/localization/LocalizationContext";
import { useAuth } from "../components/auth/authContext";
// CSS
import { bottomTabStyles } from "../styles/component-specific/bottom-tabs";
import { colors } from "../styles/variables";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { translate } = useLocalization();
  const { logout: logoutAuthentication } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={translate("devices")}
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomTabStyles.tabBar,
        tabBarInactiveTintColor: colors.neutral200,
        tabBarActiveTintColor: colors.primary500,
        sceneStyle: { backgroundColor: colors.neutral800 },
      }}
    >
      <Tab.Screen
        name={translate("devices")}
        component={DevicesScreen} // Home screen is now part of the navigator
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate("parentalControls")}
        component={ParentalControlsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate("modem")}
        component={ModemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="wifi" size={size} color={color} />
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
      <Tab.Screen
        name={translate("logout")}
        component={DevicesScreen}
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
            await logout();
            await logoutAuthentication();
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="close" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
