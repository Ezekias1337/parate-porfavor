// Library Imports
import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";

interface TabIconProps {
  name: FontAwesomeIconNames;
  size: number;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, size, color }) => {
  return (
    <View>
      <FontAwesome name={name} size={size} color={color} />
    </View>
  );
};

export default TabIcon;
