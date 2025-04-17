// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, fontSizes } from "../variables";

const modemStyles = StyleSheet.create({
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 20,
  },
  alertContainer: {
    width: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%", // Ensures the loader takes up the full height of the screen
  }
});

export default modemStyles;
