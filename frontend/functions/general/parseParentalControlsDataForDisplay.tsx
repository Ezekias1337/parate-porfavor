// Library Imports
import { View, Text } from "react-native";
// Components
import RestrictionDisplay from "../../components/page-specific/parental-controls/RestrictionDisplay";
import DevicesDisplay from "../../components/page-specific/parental-controls/DevicesDisplay";
// Types
import { Template, Restriction } from "../../../shared/types/ParentalControls";
// CSS
import { templateCardStyles } from "../../components/page-specific/parental-controls/TemplateCard";

/**
 * Parses the parental controls data for display.
 * @param {Template} template - The template object containing the parental controls data.
 * @param {(key: string) => string} translate - The translation function.
 * @returns {ReactNode} jsx - The JSX to be rendered.
*/

interface ParseDataProps {
  template: Template;
  translate: (key: string) => string;
}

const parseParentalControlsDataForDisplay = ({
  template,
  translate,
}: ParseDataProps): React.ReactNode => {
  const arrayOfRestrictions: Restriction[] = [];

  for (const restriction of template.restrictions) {
    arrayOfRestrictions.push(restriction);
  }

  return (
    <>
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.title}>{template.name}</Text>
      </View>

      {arrayOfRestrictions.map((restriction, index) => (
        <RestrictionDisplay
          key={index}
          restriction={restriction}
          translate={translate}
        />
      ))}

      {template?.devices?.length > 0 && (
        <DevicesDisplay template={template} translate={translate} />
      )}
    </>
  );
};

export default parseParentalControlsDataForDisplay;
