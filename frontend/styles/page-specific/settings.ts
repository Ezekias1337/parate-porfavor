// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, fontSizes } from "../variables";

const settingsStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    maxWidth: "100%",
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral800,
    width: "100%",
    minHeight: "100%",
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
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    minWidth: "10%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  }
});

export default settingsStyles;
