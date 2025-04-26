// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Components
import Button, { ButtonProps } from "./Button";
import Badge, { BadgeProps } from "./Badge";
// Types and Interfaces
import FontAwesomeIconNames from "../types/FontAwesome";
// CSS
import { colors } from "../styles/variables";
import cardStyles from "../styles/component-specific/card";

interface CardProps {
  headerText: string;
  bodyText?: string;
  imageSource: any;
  cardIcon: FontAwesomeIconNames;
  buttons?: ButtonProps[];
  badges?: BadgeProps[];
}

export const Card: FC<CardProps> = ({
  headerText,
  bodyText,
  cardIcon,
  buttons = [],
  badges = [],
}) => {
  return (
    <View style={cardStyles.card}>
      <FontAwesome name={cardIcon} size={32} color={colors.primary500} />
      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.headerText}>{headerText}</Text>
        {bodyText && (
          <Text style={cardStyles.bodyText}>
            {bodyText.split("/n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {"\n"}
              </React.Fragment>
            ))}
          </Text>
        )}
      </View>
      <View style={cardStyles.buttonWrapper}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            variant={button.variant}
            leftIcon
            icon={button.icon}
            iconSize={32}
            onClickHandler={button.onClickHandler}
            url={button.url}
            buttonSize="small"
          />
        ))}
      </View>
      <View style={cardStyles.badgeWrapper}>
        {badges.map((badge, index) => (
          <Badge
            key={index}
            text={badge.text}
            variant={badge.variant}
            icon={badge.icon}
            iconSize={16}
            size={badge.size}
            additionalStyle={badge.additionalStyle}
          />
        ))}
      </View>
    </View>
  );
};

export default Card;
