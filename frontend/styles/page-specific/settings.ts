// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors } from "../colors"
import { fontSizes } from "../typography";

const settingsStyles = StyleSheet.create({
  title: {
    fontSize: fontSizes.header1,
    color: colors.primary200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  alertContainer: {
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  }
});

export default settingsStyles;
