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
  },
  
  alertContainer: {
    marginBottom: 20
  },

  buttonContainer: {
    width: "75%",
  },
  button: {
    width: "75%",
  },
});

export default loginStyles;
