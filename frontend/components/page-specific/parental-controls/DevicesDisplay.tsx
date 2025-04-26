// Library Imports
import { Fragment } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Types
import {
  Template,
} from "../../../../shared/types/ParentalControls";
// CSS
import { colors } from "../../../styles/variables";
import { templateCardStyles } from "./TemplateCard";

interface RestrictionProps {
  template: Template;
  translate: (key: string) => string;
}

const DevicesDisplay: React.FC<RestrictionProps> = ({
  template,
  translate,
}) => {
  return (
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
  );
};

export default DevicesDisplay;
