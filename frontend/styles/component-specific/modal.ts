import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, fontSizes } from "../variables";

export const modalStyles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background
  },

  modalContents: {
    paddingHorizontal: 20,
    //height: "50%",
    minHeight: "80%",
    minWidth: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral700,
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    borderColor: colors.primary300,
    borderWidth: 2,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "transparent",
  },
});
