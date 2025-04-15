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
  alertContainer: {
    marginBottom: 20
  },

  buttonContainer: {
    width: "100%",
  },

});

export default loginStyles;
