// Library Imports
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Functions, Helpers, Utils, and Hooks
import createDayString from "../../../functions/component-specific/template-card/createDaysString";
import convertTo12HourFormat from "../../../helpers/convertTo12HourFormat";
// Types
import { Restriction } from "../../../../shared/types/ParentalControls";
// CSS
import utilityStyles from "@/styles/utilities";
import { colors, borderWidth, borderRadius } from "../../../styles/variables";
import  templateCardStyles  from "../../../styles/component-specific/template-card";

interface RestrictionProps {
  restriction: Restriction;
  translate: (key: string) => string;
}

const RestrictionDisplay: React.FC<RestrictionProps> = ({
  restriction,
  translate,
}) => {
  return (
    <View
      style={[
        utilityStyles.padding10,
        utilityStyles.marginTop10,
        utilityStyles.marginBottom10,
        {
          borderWidth: borderWidth.borderWidth,
          borderRadius: borderRadius.borderRadius,
          borderColor: colors.primary300,
        },
      ]}
    >
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
