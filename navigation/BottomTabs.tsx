// navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home"; // Import screens
import ModemScreen from "../screens/Modem"; // Import screens
import DevicesScreen from "../screens/Devices"; // Import screens
import TabIcon from "../navigation/TabIcon"; // Custom icon component
import { bottomTabStyles } from "../styles/component-specific/bottom-tabs"; // Import styles
import { colors } from "../styles/variables";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomTabStyles.tabBar,
        tabBarInactiveTintColor: colors.neutral200,
        tabBarActiveTintColor: colors.primary500,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen} // Home screen is now part of the navigator
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Modem"
        component={ModemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="wifi" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="cogs" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
