// styles/component-specific/bottom-tabs.ts

import { StyleSheet } from "react-native";
import { colors } from "../variables"; // Import your color and effect variables

export const bottomTabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.neutral700, 
    borderTopWidth: 0, 
    elevation: 0, 
    shadowOpacity: 0, 
    boxShadow: "none", 
  },
});
