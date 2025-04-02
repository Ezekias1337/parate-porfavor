// Library Imports
import { Text } from "react-native";
// Components
import Modal from "@/components/Modal";
// Types
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
// Functions, Helpers, Utils, and Hooks
import renderParentalControlsTemplateCards from "./renderParentalControlsTemplateCards";

const renderModal = (
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  parentalControlsData: ParentalControlsData,
  translate: (key: string) => string
) => {
  
  
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {renderParentalControlsTemplateCards(parentalControlsData, translate)}
    </Modal>
  );
};

export default renderModal;
