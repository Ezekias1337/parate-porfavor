// Library Imports
import React, { FC } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";
// CSS
import {
  badgeStyles,
  badgeVariantToStyle,
  badgeSizeToStyle,
} from "../styles/component-specific/badge";

type BadgeVariant = keyof typeof badgeVariantToStyle;
type BadgeSize = keyof typeof badgeSizeToStyle;

export type BadgeProps = {
  text: string;
  variant: BadgeVariant;
  icon?: FontAwesomeIconNames;
  iconSize?: number;
  size?: BadgeSize;
  additionalStyle?: StyleProp<ViewStyle>;
};

const Badge: FC<BadgeProps> = ({
  text,
  variant,
  icon,
  iconSize = 16,
  size = "small",
  additionalStyle,
}) => {
  return (
    <View
      style={[
        badgeStyles.badge,
        badgeVariantToStyle[variant],
        badgeSizeToStyle[size],
        additionalStyle,
      ]}
    >
      {icon && (
        <FontAwesome
          name={icon}
          size={iconSize}
          color={badgeVariantToStyle[variant].color}
          style={badgeStyles.icon}
        />
      )}
      <Text style={[badgeStyles.text, badgeVariantToStyle[variant]]}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
