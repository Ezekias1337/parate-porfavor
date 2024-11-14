// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors } from "../variables";

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral100,
    shadowColor: colors.neutral900,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: 200,
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 14,
    color: colors.neutral300,
  },
  cardTextWrapper: {
    marginVertical: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
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