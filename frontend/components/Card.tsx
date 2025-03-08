// Library Imports
import React, { FC, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";
import { ButtonVariant } from "./Button";

// Components
import Button from "./Button";
// CSS
import cardStyles from "../styles/component-specific/card";
import { colors } from "../styles/variables";

type ButtonLink = {
  name: string;
  params: undefined;
};

type CardProps = {
  headerText: string;
  bodyText?: string;
  buttonCount: 0 | 1 | 2 | 3 | 4;
  button1Text: string;
  button1Variant: ButtonVariant;
  button1OnClick?: Function;
  button1Icon?: FontAwesomeIconNames;
  button1Link?: string;
  button2Text: string;
  button2Type?: "button" | "reset";
  button2Variant: ButtonVariant;
  button2OnClick?: Function;
  button2Icon?: FontAwesomeIconNames;
  button2Link?: string;
  button3Text?: string;
  button3Type?: "button" | "reset";
  button3Variant?: ButtonVariant;
  button3OnClick?: Function;
  button3Icon?: FontAwesomeIconNames;
  button3Link?: string;
  button4Text?: string;
  button4Type?: "button" | "reset";
  button4Variant?: ButtonVariant;
  button4OnClick?: Function;
  button4Icon?: FontAwesomeIconNames;
  button4Link?: string;
  buttonSize?: "small" | "medium" | "large";
  imageSource: any;
  cardIcon: FontAwesomeIconNames;
};

export const Card: FC<CardProps> = ({
  headerText,
  bodyText,
  buttonCount,
  button1Text,
  button1Variant,
  button1OnClick,
  button1Icon,
  button1Link,
  button2Text,
  button2Variant,
  button2OnClick,
  button2Icon,
  button2Link,
  button3Text = "",
  button3Variant = "error",
  button3OnClick,
  button3Icon,
  button3Link,
  button4Text = "",
  button4Variant = "error",
  button4OnClick,
  button4Icon,
  button4Link,
  imageSource,
  cardIcon,
}) => {
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={cardStyles.card}>
      {/* <Image source={imageSource} style={cardStyles.image} /> */}
      <FontAwesome name={cardIcon} size={32} color={`${colors.primary500}`} />
      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.headerText}>{headerText}</Text>
        {bodyText && (
          <Text style={cardStyles.bodyText}>
            {bodyText.split("/n").map((line, index) => (
              <Fragment key={index}>
                {line}
                {"\n"}
              </Fragment>
            ))}
          </Text>
        )}
      </View>
      <View style={cardStyles.buttonWrapper}>
        {buttonCount >= 1 && button1OnClick !== undefined && (
          <Button
            text={button1Text}
            variant={button1Variant}
            leftIcon
            icon={button1Icon}
            iconSize={32}
            onClickHandler={() => button1OnClick()}
            url={button1Link}
            buttonSize="small"
          ></Button>
        )}
        {buttonCount >= 2 && button2OnClick && (
          <Button
            text={button2Text}
            variant={button2Variant}
            leftIcon
            icon={button2Icon}
            iconSize={32}
            onClickHandler={() => button2OnClick()}
            url={button2Link}
            buttonSize="small"
          ></Button>
        )}

        {buttonCount >= 3 && button3OnClick && (
          <Button
            text={button3Text}
            variant={button3Variant}
            leftIcon
            icon={button3Icon}
            iconSize={32}
            onClickHandler={() => button3OnClick()}
            url={button3Link}
            buttonSize="small"
          ></Button>
        )}

        {buttonCount >= 4 && button4OnClick && (
          <Button
            text={button4Text}
            variant={button4Variant}
            icon={button4Icon}
            leftIcon
            iconSize={32}
            onClickHandler={() => button4OnClick()}
            url={button4Link}
            buttonSize="small"
          ></Button>
        )}
      </View>
    </View>
  );
};

export default Card;
