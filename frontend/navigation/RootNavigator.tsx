import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../app";

export type RootStackParamList = {
  Home: undefined;
  Preferences: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    {/* Add other screens like Preferences here */}
  </Stack.Navigator>
);

export default RootNavigator;
