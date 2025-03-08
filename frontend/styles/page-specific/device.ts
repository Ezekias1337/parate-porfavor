// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, fontSizes } from "../variables";

const deviceStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    paddingTop: 40,
    paddingBottom: 20
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "55%",
  },
  alertContainer: {
    width: "100%",
  },
  switchWrapper: {
    paddingTop: 200,  
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  switchContainer: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
    gap: 20
  },
  devicesContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "85%",
  },

  switch: {
    transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }], // Adjusts size
  },
  
  text: {
    color: colors.neutral100,
    fontSize: fontSizes.body,
  }

});

export default deviceStyles;
