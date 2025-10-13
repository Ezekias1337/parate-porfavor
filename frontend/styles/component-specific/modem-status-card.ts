// Library Imports
import { StyleSheet } from "react-native";
// CSS
import { colors } from "../colors"
import { borderRadius } from "../borders";
import { fontSizes } from "../typography";

const modemStatusCardStyles = StyleSheet.create({
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
  },
  icon: {
    marginRight: 10,
    color: colors.primary500,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default modemStatusCardStyles;
