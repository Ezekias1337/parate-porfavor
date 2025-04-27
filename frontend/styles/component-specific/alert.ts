// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, fontSizes } from "../variables";

export const alertStyles = StyleSheet.create({
  alertWrapper: {
    paddingHorizontal: 20,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
  },
  alert: {
    borderRadius: borderRadius.borderRadius,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertText: {
    fontSize: fontSizes.body,
  },
  icon: {
    marginRight: 10,
  },
  primaryAlert: {
    backgroundColor: colors.primary500,
    color: colors.primary100,
    borderColor: colors.primary100,
  },
  primaryDarkAlert: {
    backgroundColor: colors.primary900,
    color: colors.primary200,
    borderColor: colors.primary200,
  },
  successAlert: {
    backgroundColor: colors.success500,
    color: colors.success900,
    borderColor: colors.success900,
  },
  warningAlert: {
    backgroundColor: colors.warning500,
    color: colors.warning900,
    borderColor: colors.warning900,
  },
  errorAlert: {
    backgroundColor: colors.error500,
    color: colors.error900,
    borderColor: colors.error900,
  },
  infoAlert: {
    backgroundColor: colors.info500,
    color: colors.info900,
    borderColor: colors.info900,
  },
  neutralAlert: {
    backgroundColor: colors.neutral200,
    color: colors.neutral800,
    borderColor: colors.neutral800,
  },
  neutralDarkAlert: {
    backgroundColor: colors.neutral900,
    color: colors.neutral300,
    borderColor: colors.neutral300,
  },
});

export const alertVariantToStyle = {
  primary: alertStyles.primaryAlert,
  primaryDark: alertStyles.primaryDarkAlert,
  success: alertStyles.successAlert,
  warning: alertStyles.warningAlert,
  error: alertStyles.errorAlert,
  info: alertStyles.infoAlert,
  neutral: alertStyles.neutralAlert,
  neutralDark: alertStyles.neutralDarkAlert,
};
