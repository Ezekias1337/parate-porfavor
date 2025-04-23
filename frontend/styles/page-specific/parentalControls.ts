// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, fontSizes } from "../variables";

const parentalControlsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    textAlign: "center",
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
  templatesContainer: {
    justifyContent: "center",
    alignItems: "stretch",
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
  },
  daySelector: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 10,
  },
  dayButtonContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ampmContainer: {
    display: "flex", 
    flexDirection: "row", 
    marginTop: 10, gap: 10, 
    flexWrap: "wrap", 
    //width: "100%", 
    justifyContent: "center",
    alignItems: "center",
  },
  ampmButtonContainer: {
    width: "25%",

  },
});

export default parentalControlsStyles;
