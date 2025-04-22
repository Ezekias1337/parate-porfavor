// Library Imports
import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
// Components
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import DaySelector from "./DaySelector";
// Types
import {
  ParentalControlsData,
  Template,
} from "../../../../shared/types/ParentalControls";
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";
// Functions, Helpers, Utils, and Hooks
import createParentalControlsTemplate from "@/functions/network/parental-controls/createParentalControlsTemplate";
import handleFetchParentalControls from "../../../functions/page-specific/parental-controls/handleFetchParentalControls";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
import { inputFieldStyles } from "../../../styles/component-specific/input-fields";
import { colors } from "../../../styles/variables";

interface RenderModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  parentalControls: ParentalControlsData | null;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  translate: (key: string) => string;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modalLoading: boolean;
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  templateName: string;
  setTemplateName: React.Dispatch<React.SetStateAction<string>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface SelectedDays {
  [key: number]: boolean;
}

const ParentalControlsModal: React.FC<RenderModalProps> = ({
  modalVisible,
  setModalVisible,
  parentalControls,
  setParentalControls,
  ontToken,
  translate,
  selectedTemplate,
  setSelectedTemplate,
  setLoading,
  modalLoading,
  setModalLoading,
  templateName,
  setTemplateName,
  setErrorMsg,
}: RenderModalProps) => {
  const [selectedDays, setSelectedDays] = useState<SelectedDays>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {!selectedTemplate && parentalControls && (
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
            <View
              style={[inputFieldStyles.formLabelContainer, { marginTop: 40 }]}
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
                  await createParentalControlsTemplate(
                    templateName,
                    0,
                    0,
                    ontToken
                  );
                  const tempParentalControls =
                    await handleFetchParentalControls({
                      setLoading,
                      setParentalControls,
                      setErrorMsg,
                      translate,
                    });

                  const newlyCreatedTemplate =
                    tempParentalControls.templates[templateIndex];
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
      )}

      {selectedTemplate && parentalControls && (
        /* 
          Need to look at the selectedTemplate object and determine what to display
          accordingly.
                    
          If there is a name and time periods then show:
           interface to edit the time periods/days
           
        */

        <View style={parentalControlsStyles.modalContainer}>
          <Text style={[parentalControlsStyles.title, { marginBottom: 40 }]}>
            {translate("modifyScheduledRestriction")}
          </Text>
          <DaySelector
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </View>
      )}
    </Modal>
  );
};

export default ParentalControlsModal;
