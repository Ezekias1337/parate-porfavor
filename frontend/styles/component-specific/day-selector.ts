// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius } from "../variables";

const daySelectorStyles = StyleSheet.create({
  inactiveButton: {
    backgroundColor: colors.neutral100,
    color: colors.neutral800,
    padding: 15,
    marginTop: 20,
    borderRadius: borderRadius.borderRadius,
  },
  activeButton: {
    backgroundColor: colors.primary500,
    color: colors.neutral100,
    padding: 15,
    marginTop: 20,
    borderRadius: borderRadius.borderRadius,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 10,
  },
});

export default daySelectorStyles;
