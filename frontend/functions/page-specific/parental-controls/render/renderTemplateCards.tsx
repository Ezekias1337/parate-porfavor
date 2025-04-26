// Library Imports
import { View } from "react-native";
// Components
import TemplateCard from "@/components/page-specific/parental-controls/TemplateCard";
// Types
import { Template } from "../../../../../shared/types/ParentalControls";
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
import OntToken from "../../../../../shared/types/OntToken";
// CSS
import parentalControlsStyles from "../../../../styles/page-specific/parentalControls";

interface RenderTemplateCardsProps {
  templates: Template[];
  translate: (key: string) => string;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<React.SetStateAction<ParentalControlsData>>;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderTemplateCards = ({
  templates,
  translate,
  ontToken,
  setOntToken,
  setErrorMsg,
  setLoading,
  setParentalControls,
  setSelectedTemplate,
  setModalVisible,
}: RenderTemplateCardsProps) => {
  const templateCards = templates.map((template) => (
    <TemplateCard
      key={template.id}
      template={template}
      translate={translate}
      ontToken={ontToken}
      setOntToken={setOntToken}
      setErrorMsg={setErrorMsg}
      setLoading={setLoading}
      setParentalControls={setParentalControls}
      setSelectedTemplate={setSelectedTemplate}
      setModalVisible={setModalVisible}
    />
  ));

  return (
    <View style={parentalControlsStyles.templatesContainer}>
      {templateCards}
    </View>
  );
};

export default renderTemplateCards;
