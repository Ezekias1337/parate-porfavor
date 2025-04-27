// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors } from "../variables";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral800,
    width: "100%",
    minHeight: "100%",
  },
  alertContainer: {
    marginBottom: 40,
  },

  buttonContainer: {
    width: "100%",
  },
});

export default loginStyles;
