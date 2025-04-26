// Library Imports
import { useState, useEffect } from "react";
import { View,  } from "react-native";
// Components
import Modal from "@/components/Modal";
import TemplateCreator from "./TemplateCreator";
import SchedulePeriodSelector from "./SchedulePeriodSelector";
import RestrictionList from "./RestrictionList";
// Types
import {
  ParentalControlsData,
  Template,
  Restriction,
} from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";

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
  const [showSchedulePeriodSelector, setShowSchedulePeriodSelector] =
    useState(false);
  const [restrictionToEdit, setRestrictionToEdit] =
    useState<Restriction | null>(null);

  useEffect(() => {
    if (selectedTemplate?.restrictions.length === 0) {
      setShowSchedulePeriodSelector(true);
    } else {
      setShowSchedulePeriodSelector(false);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (modalVisible) {
      return;
    } else if (!modalVisible) {
      setShowSchedulePeriodSelector(false);
      setRestrictionToEdit(null);
      setSelectedTemplate(null);
    }
  }, [modalVisible]);

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {!selectedTemplate && (
        <TemplateCreator
          parentalControls={parentalControls}
          setParentalControls={setParentalControls}
          ontToken={ontToken}
          translate={translate}
          setSelectedTemplate={setSelectedTemplate}
          setLoading={setLoading}
          modalLoading={modalLoading}
          setModalLoading={setModalLoading}
          templateName={templateName}
          setTemplateName={setTemplateName}
          setErrorMsg={setErrorMsg}
        />
      )}

      {selectedTemplate && parentalControls && (
        <View style={{ width: "100%", maxHeight: "100%", display: "flex" }}>
          {showSchedulePeriodSelector && (
            <SchedulePeriodSelector
              translate={translate}
              template={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setShowSchedulePeriodSelector={setShowSchedulePeriodSelector}
              setParentalControls={setParentalControls}
              ontToken={ontToken}
              restrictionToEdit={restrictionToEdit}
            />
          )}

          {!showSchedulePeriodSelector && (
            <RestrictionList
              template={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              translate={translate}
              ontToken={ontToken}
              setLoading={setLoading}
              setParentalControls={setParentalControls}
              setErrorMsg={setErrorMsg}
              setRestrictionToEdit={setRestrictionToEdit}
              setShowSchedulePeriodSelector={setShowSchedulePeriodSelector}
              setModalVisible={setModalVisible}
            />
          )}
        </View>
      )}
    </Modal>
  );
};

export default ParentalControlsModal;
