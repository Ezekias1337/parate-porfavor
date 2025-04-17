// Library Imports
import { Fragment } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Functions, Helpers, Utils, and Hooks
import convertTo12HourFormat from "../../helpers/convertTo12HourFormat";
// Constants
import daysMap from "../../constants/Days";
// Types
import { Device } from "../../../shared/types/Device";
import { Template } from "../../../shared/types/ParentalControls";
// CSS
import { colors } from "../../styles/variables";
import { templateCardStyles } from "../../components/page-specific/parental-controls/TemplateCard";

interface ParseDataProps {
  template: Template;
  translate: (key: string) => string;
}

const parseParentalControlsDataForDisplay = ({
  template,
  translate,
}: ParseDataProps) => {
  let arrayOfDays: string[] = [];

  for (const day in template.repeatDays) {
    let dayName = daysMap.get(parseInt(day));
    if (dayName) {
      arrayOfDays.push(translate(dayName));
    }
  }

  return (
    <>
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.title}>{template.name}</Text>
      </View>

      {template.startTime && template.endTime && (
        <View style={templateCardStyles.row}>
          <FontAwesome name="clock-o" size={40} color={colors.primary300} />
          <Text style={templateCardStyles.text}>
            {`${convertTo12HourFormat(
              template.startTime
            )} - ${convertTo12HourFormat(template.endTime)} `}
          </Text>
        </View>
      )}

      {arrayOfDays.length > 0 && (
        <View style={templateCardStyles.row}>
          <FontAwesome name="calendar" size={35} color={colors.primary300} />
          <Text style={templateCardStyles.text}>{arrayOfDays.join(", ")}</Text>
        </View>
      )}

      {template?.devices?.length > 0 && (
        <View style={templateCardStyles.row}>
          <FontAwesome name="desktop" size={30} color={colors.primary300} />
          <Text style={templateCardStyles.text}>
            {translate("devicesUnderRestriction")}:{" "}
            {template.devices.map((device, index) => (
              <Fragment key={device.macAddr}>
                {device.description}
                {index !== template.devices.length - 1 && ", "}
              </Fragment>
            ))}
          </Text>
        </View>
      )}
    </>
  );
};

export default parseParentalControlsDataForDisplay;
