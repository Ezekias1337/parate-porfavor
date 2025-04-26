import { StyleSheet } from "react-native";
import { colors, fontSizes, borderRadius } from "../variables";

const templateCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral800,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    display: "flex",
    flexDirection: "column",
    maxWidth: "95%",
    width: "100%",
  },

  title: {
    fontSize: fontSizes.header2,
    color: colors.primary100,
    fontWeight: "bold",
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: fontSizes.header3,
    color: colors.neutral100,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },

  buttonRow: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
  },
});

export default templateCardStyles;