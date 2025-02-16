// Library Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import HomeScreen from "../screens/Home";
import ParentalControlsScreen from "../screens/ParentalControls";
import ModemScreen from "../screens/Modem";
import DevicesScreen from "../screens/Devices";
// Components
import TabIcon from "./TabIcon";
// Hooks
import { useLocalization } from "../components/localization/LocalizationContext";
import { useAuth } from "../components/auth/authContext";
// CSS
import { bottomTabStyles } from "../styles/component-specific/bottom-tabs";
import { colors } from "../styles/variables";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { translate } = useLocalization();
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={translate("home")}
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomTabStyles.tabBar,
        tabBarInactiveTintColor: colors.neutral200,
        tabBarActiveTintColor: colors.primary500,
        sceneStyle: { backgroundColor: colors.neutral800 },
      }}
    >
      <Tab.Screen
        name={translate("home")}
        component={HomeScreen} // Home screen is now part of the navigator
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
        name={translate("devices")}
        component={DevicesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="cogs" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate("logout")}
        component={HomeScreen}
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
            await logout();
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
