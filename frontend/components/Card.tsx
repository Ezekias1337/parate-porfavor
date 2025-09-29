// Library Imports
import React, { FC, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
// CSS
import cardStyles from "../styles/component-specific/card";

interface CardProps {
  children: ReactNode;
  additionalStyle?: ViewStyle | ViewStyle[];
}

const Card: FC<CardProps> = ({ children, additionalStyle }) => {
  return <View style={[cardStyles.card, additionalStyle]}>{children}</View>;
};

export default Card;
