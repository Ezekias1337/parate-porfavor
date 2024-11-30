// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";

// CSS
import {
  alertStyles,
  alertVariantToStyle,
} from "../styles/component-specific/alert";

interface AlertProps {
  bodyText: string;
  variant:
    | "primary"
    | "primaryDark"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
    | "neutralDark";
  icon?: FontAwesomeIconNames; // Ensuring the icon is a valid FontAwesome icon name
  additionalClassNames?: string;
}

const Alert: FC<AlertProps> = ({
  bodyText,
  variant,
  icon,
  additionalClassNames,
}) => {
  const variantStyles = alertVariantToStyle[variant];

  return (
    <View
      style={[
        alertStyles.alertWrapper,
        additionalClassNames && (alertStyles as any)[additionalClassNames],
      ]}
    >
      <View style={[alertStyles.alert, variantStyles]}>
        {icon && <FontAwesome name={icon} size={24} style={alertStyles.icon} />}
        <Text style={alertStyles.alertText}>{bodyText}</Text>
      </View>
    </View>
  );
};

export default Alert;
