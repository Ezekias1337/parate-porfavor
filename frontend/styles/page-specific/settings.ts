// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, fontSizes } from "../variables";

const loginStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: fontSizes.header1, color: colors.primary200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
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
