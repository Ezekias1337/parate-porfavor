// Components
import Modal from "@/components/Modal";
// Types
import { ParentalControlsData, Template } from "../../../../../shared/types/ParentalControls";
import { Device } from "../../../../../shared/types/Device";
import OntToken from "../../../../../shared/types/OntToken";
// Functions, Helpers, Utils, and Hooks
import renderParentalControlsTemplateCards from "./renderParentalControlsTemplateCards";

interface RenderModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalDevice: Device | null;
  parentalControlsData: ParentalControlsData;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  translate: (key: string) => string;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderModal = ({
  modalVisible,
  setModalVisible,
  parentalControlsData,
  modalDevice,
  ontToken,
  translate,
  selectedTemplate,
  setSelectedTemplate,
}: RenderModalProps) => {

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {renderParentalControlsTemplateCards({
        parentalControlsData,
        modalDevice,
        selectedTemplate,
        setSelectedTemplate,
        setModalVisible,
        ontToken,
        translate,
      })}
    </Modal>
  );
};

export default renderModal;
