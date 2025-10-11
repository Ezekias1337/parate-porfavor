// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors } from "../colors";

export const bottomTabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.neutral700, 
    borderTopWidth: 0, 
    elevation: 0, 
    shadowOpacity: 0, 
    boxShadow: "none", 
  },
});
