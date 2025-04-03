// Library Imports
import { Text } from "react-native";
// Components
import Modal from "@/components/Modal";
// Types
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
import { Device } from "../../../../../shared/types/Device";
// Functions, Helpers, Utils, and Hooks
import renderParentalControlsTemplateCards from "./renderParentalControlsTemplateCards";

interface RenderModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalDevice: Device | null;
  parentalControlsData: ParentalControlsData;
  translate: (key: string) => string;
}

const renderModal = ({
  modalVisible,
  setModalVisible,
  parentalControlsData,
  modalDevice,
  translate,
}: RenderModalProps) => {
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {renderParentalControlsTemplateCards(parentalControlsData, modalDevice, translate)}
    </Modal>
  );
};

export default renderModal;
