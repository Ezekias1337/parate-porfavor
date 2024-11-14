// Library Imports
import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";

// CSS
import {
  buttonStyles,
  buttonVariantToStyle,
  buttonSizeToStyle,
} from "../styles/component-specific/button";

interface ButtonProps {
  text: string;
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
  iconSize?: number;
  leftIcon?: boolean;
  rightIcon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClickHandler?: ((event: GestureResponderEvent) => void) | null;
  url?: string;
  buttonId?: string | null;
  additionalClassNames?: string;
  buttonSize?: "small" | "medium" | "large";
}

const Button: FC<ButtonProps> = ({
  text,
  variant,
  icon,
  iconSize = 32,
  leftIcon = false,
  rightIcon = false,
  loading = false,
  disabled = false,
  onClickHandler = null,
  url,
  buttonId = null,
  additionalClassNames,
  buttonSize = "small",
}) => {
  const navigation = useNavigation();

  const handlePress = (event: GestureResponderEvent) => {
    if (url) {
      navigation.navigate(url as never);
    } else if (onClickHandler) {
      onClickHandler(event);
    }
  };

  const renderButtonContent = () => (
    <View style={buttonStyles.buttonContent}>
      {leftIcon && icon && (
        <FontAwesome
          name={icon}
          style={buttonStyles.leftIcon}
          size={iconSize}
        />
      )}
      {loading ? (
        <ActivityIndicator color={buttonStyles.loader.color} />
      ) : (
        <Text style={buttonStyles.buttonText}>{text}</Text>
      )}
      {rightIcon && icon && (
        <FontAwesome
          name={icon}
          style={buttonStyles.rightIcon}
          size={iconSize}
        />
      )}
    </View>
  );

  const variantStyles = buttonVariantToStyle[variant];
  const sizeStyles = buttonSizeToStyle[buttonSize];

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        variantStyles,
        sizeStyles,
        additionalClassNames ? (buttonStyles as any)[additionalClassNames] : {},
        (disabled || loading) && buttonStyles.disabledButton,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={buttonId || undefined}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

export default Button;
