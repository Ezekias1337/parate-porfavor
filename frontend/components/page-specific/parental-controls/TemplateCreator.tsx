// Library Imports
import { View, Text, TextInput } from "react-native";
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

  return (
    <View style={[parentalControlsStyles.modalContainer]}>
      <Text style={[parentalControlsStyles.title, { marginBottom: 40 }]}>
        {translate("createScheduledRestriction")}
      </Text>

      <Alert
        bodyText={translate("createScheduledRestrictionAlert")}
        variant="info"
        icon="info-circle"
      />

      <View style={inputFieldStyles.formRow}>
        <View style={[inputFieldStyles.formLabelContainer, { marginTop: 40 }]}>
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
            const templateIndex = parentalControls.templates.length;
            await createParentalControlsTemplate(templateName, 0, 0, ontToken);
            const tempParentalControls = await handleFetchParentalControls({
              setLoading,
              setParentalControls,
              setErrorMsg,
              translate,
            });
            
            let newlyCreatedTemplate: Template | null = null;
            for (const template of tempParentalControls.templates) {
              if(template.name === templateName) {
                newlyCreatedTemplate = template;
                break;
              }
            }
            
            
            console.log("newlyCreatedTemplate", newlyCreatedTemplate);
            setSelectedTemplate(newlyCreatedTemplate);
            setModalLoading(false);
          } catch (error) {
            setModalLoading(false);
            setErrorMsg(translate("serverError"));
          }
        }}
      />
    </View>
  );
};

export default TemplateCreator;
