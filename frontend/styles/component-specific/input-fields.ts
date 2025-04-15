// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, fontSizes } from "../variables";

export const inputFieldStyles = StyleSheet.create({
  textInput: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: borderRadius.borderRadius,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    fontSize: fontSizes.body,
    backgroundColor: colors.neutral800,
    borderColor: colors.primary500,
    borderWidth: 1.5,
    color: colors.primary500,
    width: "100%",
    marginBottom: 10,

  },
  leftIcon: {
    paddingRight: 16,
  },
  rightIcon: {
    paddingLeft: 16,
  },

  formRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  formLabelContainer: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary500,

  },
});