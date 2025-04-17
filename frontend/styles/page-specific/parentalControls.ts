// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, fontSizes } from "../variables";

const parentalControlsStyles = StyleSheet.create({
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
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    //width: "85%",
  },
  templatesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 20,
    marginTop: 20
  },

  alertContainer: {
    width: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  }
});

export default parentalControlsStyles;
