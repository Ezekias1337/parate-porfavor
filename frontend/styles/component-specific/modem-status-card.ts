// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors, borderRadius, fontSizes } from "../variables";

const modemStatusCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 10,
    backgroundColor: colors.neutral700,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default modemStatusCardStyles;
