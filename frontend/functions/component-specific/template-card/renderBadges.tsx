// Library Imports
import { View } from "react-native";
// Components
import Badge from "@/components/Badge";
// Types
import { Template } from "../../../../shared/types/ParentalControls";
// CSS
import { templateCardStyles } from "../../../components/page-specific/parental-controls/TemplateCard";

const renderBadges = (
  template: Template,
  translate: (key: string) => string
) => {
  return (
    <View style={[templateCardStyles.row, templateCardStyles.badgeRow]}>
      {(!template.startTime || !template.endTime) && (
        <Badge
          text={translate("missingTimePeriods")}
          variant="warning"
          icon="exclamation-triangle"
          iconSize={16}
        />
      )}
      {(!template.repeatDays || template.repeatDays.length === 0) && (
        <Badge
          text={translate("missingDays")}
          variant="warning"
          icon="exclamation-triangle"
          iconSize={16}
        />
      )}
      {(!template.devices || template.devices.length === 0) && (
        <Badge
          text={translate("noDevices")}
          variant="warning"
          icon="exclamation-triangle"
          iconSize={16}
        />
      )}
    </View>
  );
};

export default renderBadges;
