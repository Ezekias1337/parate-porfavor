// Library Imports
import { View } from "react-native";
// Components
import Badge from "@/components/Badge";
// Types
import { Template } from "../../../../shared/types/ParentalControls";
// CSS
import { templateCardStyles } from "../../../components/page-specific/parental-controls/TemplateCard";

/**
 * Renders badges for the template card based on the provided template and translation function.
 * @param {Template} template - The restriction object containing the days of the week.
 * @param {(key: string) => string} translate - The translation function.
 * @returns {ReactNode} jsx - The JSX to be rendered.
 */

const renderBadges = (
  template: Template,
  translate: (key: string) => string
): React.ReactNode => {
  return (
    <View style={[templateCardStyles.row, templateCardStyles.badgeRow]}>
      {template.restrictions.length <= 0 && (
        <Badge
          text={translate("missingTimePeriods")}
          variant="warning"
          icon="exclamation-triangle"
          iconSize={16}
        />
      )}
      {(!template?.restrictions[0]?.repeatDays ||
        template?.restrictions[0]?.repeatDays?.length === 0) && (
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
