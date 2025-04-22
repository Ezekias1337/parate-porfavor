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
    maxWidth: "95%",
    maxHeight: "95%",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral600,
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
    zIndex: 1000,
  },
});
