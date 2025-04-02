// Library Imports
import React, { FC, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "../../localization/LocalizationContext";
// Constants
import daysMap from "../../../constants/Days";
// Functions, Helpers, Utils, and Hooks
import convertTo12HourFormat from "@/helpers/convertTo12HourFormat";

// Interfaces and Types
import {
  ParentalControlsData,
  ParentalControlsDevice,
  Template,
} from "../../../../shared/types/ParentalControls";

// Components

// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";

interface ParentalControlsTemplateCardProps {
  template: Template;
  devices: ParentalControlsDevice[];
}

const ParentalControlsTemplateCard: FC<ParentalControlsTemplateCardProps> = ({
  template,
  devices,
}) => {
  const { translate } = useLocalization();
  const devicesBelongingToTemplate: ParentalControlsDevice[] = devices.filter(
    (device) => device.templateId === template.id
  );
  let arrayOfDays: string[] = [];

  for (const day in template.repeatDays) {
    let dayName = daysMap.get(parseInt(day));
    if (dayName) {
      arrayOfDays.push(translate(dayName));
    }
  }

  return (
    <View style={templateCardStyles.card}>
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.title}>{template.name}</Text>
      </View>

      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.text}>
          {`${convertTo12HourFormat(
            template.startTime
          )} - ${convertTo12HourFormat(template.endTime)} `}
        </Text>
      </View>
      
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.text}>{arrayOfDays.join(", ")}</Text>
      </View>
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.text}>
          Devices Associated:{" "}
          {devicesBelongingToTemplate.map((device) => (
            <Fragment key={device.macAddr}>
              {device.description}
              {", "}
            </Fragment>
          ))}
        </Text>
      </View>
    </View>
  );
};

const templateCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral700,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    /* elevation: 5,
    width: "85%", */
  },
  title: {
    fontSize: fontSizes.header3,
    color: colors.neutral100,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: fontSizes.header3,
    color: colors.neutral100,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default ParentalControlsTemplateCard;
