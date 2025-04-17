// Library Imports
import { View, Text, StyleSheet } from "react-native";
// Components
import TemplateCard from "@/components/page-specific/parental-controls/TemplateCard";
// Functions, Helpers, Utils, and Hooks
// Types
import { Template } from "../../../../../shared/types/ParentalControls";
// CSS
import { colors, fontSizes, borderRadius } from "../../../../styles/variables";
import parentalControlsStyles from "../../../../styles/page-specific/parentalControls";

interface RenderTemplateCardsProps {
  templates: Template[];
  translate: (key: string) => string;
}

const renderTemplateCards = ({
  templates,
  translate,
}: RenderTemplateCardsProps) => {
  const templateCards = templates.map((template) => (
    <TemplateCard key={template.id} template={template} translate={translate} />
  ));

  return (
    <View style={parentalControlsStyles.templatesContainer}>
      {templateCards}
    </View>
  );
};

export default renderTemplateCards;
