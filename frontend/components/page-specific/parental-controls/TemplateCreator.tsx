// Library Imports
import { View, Text, TextInput, ScrollView } from "react-native";
// Components
import Alert from "@/components/Alert";
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import createParentalControlsTemplate from "@/functions/network/parental-controls/createParentalControlsTemplate";
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
// Types
import {
  ParentalControlsData,
  Template,
} from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
import utilityStyles from "@/styles/utilities";
import { inputFieldStyles } from "../../../styles/component-specific/input-fields";
import { colors } from "../../../styles/variables";

interface TemplateCreatorProps {
  parentalControls: ParentalControlsData | null;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  ontToken: OntToken;
  translate: (key: string) => string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modalLoading: boolean;
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  templateName: string;
  setTemplateName: React.Dispatch<React.SetStateAction<string>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const TemplateCreator: React.FC<TemplateCreatorProps> = ({
  parentalControls,
  setParentalControls,
  ontToken,
  translate,
  setSelectedTemplate,
  setLoading,
  modalLoading,
  setModalLoading,
  templateName,
  setTemplateName,
  setErrorMsg,
}) => {
  if (!parentalControls) {
    return <></>;
  }

  if (parentalControls.templates.length >= 8) {
    <Alert
      bodyText={translate("maxTemplates")}
      variant="error"
      icon="info-circle"
    />;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        parentalControlsStyles.modalContainer,
        
        { flexGrow: 1 },
      ]}
    >
      <Text style={[parentalControlsStyles.title, utilityStyles.marginBottom40]}>
        {translate("createScheduledRestriction")}
      </Text>

      <View style={utilityStyles.marginBottom20}>
        <Alert
          bodyText={translate("createScheduledRestrictionAlert")}
          variant="info"
          icon="info-circle"
        />
      </View>

      <View style={inputFieldStyles.formRow}>
        <View
          style={[
            inputFieldStyles.formLabelContainer,
            utilityStyles.marginTop20,
          ]}
        >
          <Text style={inputFieldStyles.formLabel}>
            {translate("restrictionName")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("restrictionName")}
          value={templateName}
          onChangeText={setTemplateName}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="username"
        />
      </View>
      <View style={parentalControlsStyles.buttonContainer}>
        <Button
          text={translate("saveChanges")}
          variant="primary"
          icon="floppy-o"
          loading={modalLoading}
          leftIcon
          onClickHandler={async () => {
            /* 
            ! after saving need to refresh the parental controls data
            ! and set the selected template to the one that was created  
          */
            try {
              setModalLoading(true);
              await createParentalControlsTemplate(
                templateName,
                0,
                0,
                ontToken
              );
              const tempParentalControls = await handleFetchParentalControls({
                setLoading,
                setParentalControls,
                setErrorMsg,
                translate,
              });

              let newlyCreatedTemplate: Template | null = null;
              for (const template of tempParentalControls.templates) {
                if (template.name === templateName) {
                  newlyCreatedTemplate = template;
                  break;
                }
              }

              setSelectedTemplate(newlyCreatedTemplate);
              setModalLoading(false);
            } catch (error) {
              setModalLoading(false);
              setErrorMsg(translate("serverError"));
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default TemplateCreator;
