// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors } from "../variables";

const parentalControlsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    width: "85%",
  },
  alertContainer: {
   width: "100%",
  },

});

export default parentalControlsStyles;
