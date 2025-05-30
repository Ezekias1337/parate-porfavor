// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, borderWidth, fontSizes } from "../variables";

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    borderWidth: borderWidth.borderWidth,
    borderColor: colors.primary500,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral800,
    shadowColor: colors.neutral900,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
    maxWidth: 400,

  },
  imageOnlyCard: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  headerText: {
    fontSize: fontSizes.header3,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.primary500,
  },
  bodyText: {
    fontSize: 14,
    color: colors.neutral200,
  },
  cardTextWrapper: {
    marginVertical: 10,
  },
  buttonWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral100,
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primary: {
    backgroundColor: colors.primary500,
  },
  "primary-dark": {
    backgroundColor: colors.primary800,
  },
  warning: {
    backgroundColor: colors.warning500,
  },
  info: {
    backgroundColor: colors.info500,
  },
  neutral: {
    backgroundColor: colors.neutral200,
  },
  "neutral-dark": {
    backgroundColor: colors.neutral800,
  },
  success: {
    backgroundColor: colors.success500,
  },
  error: {
    backgroundColor: colors.error500,
  },
});

export default cardStyles;