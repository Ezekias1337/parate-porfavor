// Library Imports
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Components

// Functions, Helpers, Utils, and Hooks
import createDayString from "../../../functions/component-specific/template-card/createDaysString";
import convertTo12HourFormat from "../../../helpers/convertTo12HourFormat";
// Types
import {
  Restriction,
  Template,
} from "../../../../shared/types/ParentalControls";
// CSS
import { colors } from "../../../styles/variables";
import { templateCardStyles } from "./TemplateCard";

interface RestrictionProps {
  restriction: Restriction;
  translate: (key: string) => string;
}

const RestrictionDisplay: React.FC<RestrictionProps> = ({
  restriction,
  translate,
}) => {
  return (
    <View style={{borderWidth: 1, borderRadius: 5, borderColor: colors.primary300, padding: 10, marginBottom: 10, marginTop: 10}}>
      <View style={templateCardStyles.row}>
        <FontAwesome name="clock-o" size={40} color={colors.primary300} />

        <Text style={templateCardStyles.text}>
          {`${convertTo12HourFormat(
            restriction.startTime
          )} - ${convertTo12HourFormat(restriction.endTime)} `}
        </Text>
      </View>

      <View style={templateCardStyles.row}>
        <FontAwesome name="calendar" size={35} color={colors.primary300} />
        <Text style={templateCardStyles.text}>
          {createDayString({ restriction, translate })}
        </Text>
      </View>
    </View>
  );
};

export default RestrictionDisplay;
