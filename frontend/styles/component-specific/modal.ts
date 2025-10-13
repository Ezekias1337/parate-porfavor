import { StyleSheet } from "react-native";
// CSS
import { colors } from "../colors"
import { borderRadius } from "../borders";

export const modalStyles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentBlack500,
  },

  modalContents: {
    maxWidth: "95%",
    maxHeight: "90%",
    width: "100%",
    backgroundColor: colors.neutral600,
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    borderColor: colors.primary300,
    borderWidth: 2,
    position: "relative",
    overflow: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1000,
  },
});
