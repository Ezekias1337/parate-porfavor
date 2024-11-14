// Library Imports
import React, { FC, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Interfaces and Types
import FontAwesomeIconNames from "../types/FontAwesome";

// Components
import { RootStackParamList } from "../navigation/RootNavigator";
// CSS
import cardStyles from "../styles/component-specific/card";

type ButtonLink = {
  name: string;
  params: undefined;
};

type CardProps = {
  cardVariant: "mobile" | "imageOnly" | "imageAndBody";
  headerText: string;
  bodyText?: string;
  buttonCount: 0 | 1 | 2;
  button1Text?: string;
  button1Variant?:
    | "primary"
    | "primary-dark"
    | "warning"
    | "info"
    | "neutral"
    | "neutral-dark"
    | "success"
    | "error";
  button1OnClick?: Function;
  button1Icon?: FontAwesomeIconNames;
  button1Link?: string;
  button2Text?: string;
  button2Type?: "button" | "reset";
  button2Variant?:
    | "primary"
    | "primary-dark"
    | "warning"
    | "info"
    | "neutral"
    | "neutral-dark"
    | "success"
    | "error";
  button2OnClick?: Function;
  button2Icon?: FontAwesomeIconNames;
  button2Link?: ButtonLink;
  buttonSize?: "small" | "medium" | "large";
  imageSource: any;
};

export const Card: FC<CardProps> = ({
  cardVariant,
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
  imageSource,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (cardVariant === "mobile") {
    return (
      <View style={cardStyles.card}>
        <Image source={imageSource} style={cardStyles.image} />
        <Text style={cardStyles.headerText}>{headerText}</Text>
        {bodyText && <Text style={cardStyles.bodyText}>{bodyText}</Text>}
      </View>
    );
  } else if (cardVariant === "imageOnly") {
    return (
      <View style={[cardStyles.card, cardStyles.imageOnlyCard]}>
        <Image source={imageSource} style={cardStyles.image} />
        {bodyText && <Text style={cardStyles.bodyText}>{bodyText}</Text>}
        <Text style={cardStyles.headerText}>{headerText}</Text>
      </View>
    );
  } else if (cardVariant === "imageAndBody") {
    return (
      <View style={cardStyles.card}>
        <Image source={imageSource} style={cardStyles.image} />
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
          {buttonCount >= 1 && (
            <TouchableOpacity
              style={[
                cardStyles.button,
                cardStyles[button1Variant || "neutral"],
              ]}
              onPress={() => {
                if (button1OnClick) {
                  button1OnClick();
                } else if (button1Link) {
                  navigation.navigate(button1Link as never);
                }
              }}
            >
              {button1Icon && (
                <FontAwesome
                  name={button1Icon}
                  style={cardStyles.buttonIcon}
                  size={32}
                />
              )}
              <Text style={cardStyles.buttonText}>{button1Text}</Text>
            </TouchableOpacity>
          )}
          {buttonCount === 2 && button2OnClick && (
            <TouchableOpacity
              style={[cardStyles.button, cardStyles[button2Variant || "error"]]}
              onPress={button2OnClick}
            >
              {button2Icon && (
                <FontAwesome
                  name={button2Icon}
                  style={cardStyles.buttonIcon}
                  size={32}
                />
              )}
              <Text style={cardStyles.buttonText}>{button2Text}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return null;
  }
};
