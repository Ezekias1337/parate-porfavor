import { StyleSheet } from "react-native";
import { colors, fontSizes, borderRadius, borderWidth } from "../variables";

export const badgeStyles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.borderRadius,
    borderWidth: borderWidth.borderWidth,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: fontSizes.body,
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: fontSizes.general,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: fontSizes.header3,
  },
  large: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: fontSizes.header2,
  },
  primary: {
    backgroundColor: colors.primary500,
    color: colors.primary900,
    borderColor: colors.primary900,
  },
  primaryDark: {
    backgroundColor: colors.primary900,
    color: colors.primary200,
    borderColor: colors.primary200,
  },
  success: {
    backgroundColor: colors.success500,
    color: colors.success900,
    borderColor: colors.success900,
  },
  warning: {
    backgroundColor: colors.warning500,
    color: colors.warning900,
    borderColor: colors.warning900,
  },
  error: {
    backgroundColor: colors.error500,
    color: colors.error900,
    borderColor: colors.error900,
  },
  info: {
    backgroundColor: colors.info500,
    color: colors.info900,
    borderColor: colors.info900,
  },
  neutral: {
    backgroundColor: colors.neutral200,
    color: colors.neutral800,
    borderColor: colors.neutral800,
  },
  neutralDark: {
    backgroundColor: colors.neutral900,
    color: colors.neutral300,
    borderColor: colors.neutral300,
  },
});

export const badgeVariantToStyle = {
  primary: badgeStyles.primary,
  primaryDark: badgeStyles.primaryDark,
  success: badgeStyles.success,
  warning: badgeStyles.warning,
  error: badgeStyles.error,
  info: badgeStyles.info,
  neutral: badgeStyles.neutral,
  neutralDark: badgeStyles.neutralDark,
};

export const badgeSizeToStyle = {
  small: badgeStyles.small,
  medium: badgeStyles.medium,
  large: badgeStyles.large,
};
