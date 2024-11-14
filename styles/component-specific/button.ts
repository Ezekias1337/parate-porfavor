// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors, borderRadius, fontSizes } from "../variables";

export const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: borderRadius.borderRadius,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: fontSizes.body,
  },
  leftIcon: {
    paddingRight: 16,
  },
  rightIcon: {
    paddingLeft: 16,
  },
  disabledButton: {
    backgroundColor: colors.neutral200,
    borderColor: colors.neutral400,
  },
  smallButton: {
    fontSize: fontSizes.general,
  },
  mediumButton: {
    fontSize: fontSizes.header3,
  },
  largeButton: {
    fontSize: fontSizes.header2,
  },
  loader: {
    color: colors.neutral800,
  },
  primaryButton: {
    backgroundColor: colors.primary500,
    color: colors.primary100,
    borderColor: colors.primary100,
  },
  primaryDarkButton: {
    backgroundColor: colors.primary900,
    color: colors.primary200,
    borderColor: colors.primary200,
  },
  successButton: {
    backgroundColor: colors.success500,
    color: colors.success900,
    borderColor: colors.success900,
  },
  warningButton: {
    backgroundColor: colors.warning500,
    color: colors.warning900,
    borderColor: colors.warning900,
  },
  errorButton: {
    backgroundColor: colors.error500,
    color: colors.error900,
    borderColor: colors.error900,
  },
  infoButton: {
    backgroundColor: colors.info500,
    color: colors.info900,
    borderColor: colors.info900,
  },
  neutralButton: {
    backgroundColor: colors.neutral200,
    color: colors.neutral800,
    borderColor: colors.neutral800,
  },
  neutralDarkButton: {
    backgroundColor: colors.neutral900,
    color: colors.neutral300,
    borderColor: colors.neutral300,
  },
});

export const buttonVariantToStyle = {
  primary: buttonStyles.primaryButton,
  primaryDark: buttonStyles.primaryDarkButton,
  success: buttonStyles.successButton,
  warning: buttonStyles.warningButton,
  error: buttonStyles.errorButton,
  info: buttonStyles.infoButton,
  neutral: buttonStyles.neutralButton,
  neutralDark: buttonStyles.neutralDarkButton,
};

export const buttonSizeToStyle = {
  small: buttonStyles.smallButton,
  medium: buttonStyles.mediumButton,
  large: buttonStyles.largeButton,
};
