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
  },
  alertContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  buttonContainer: {
    width: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  }
});

export default loginStyles;
