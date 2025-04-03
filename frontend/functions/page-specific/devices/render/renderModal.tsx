// Library Imports
import { Text } from "react-native";
import {useState, useEffect} from "react";
// Components
import Modal from "@/components/Modal";
// Types
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
import { Device } from "../../../../../shared/types/Device";
import OntToken from "../../../../../shared/types/OntToken";
// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
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
  const [ontToken, setOntToken] = useState<OntToken | null>(null);
  
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {renderParentalControlsTemplateCards(parentalControlsData, modalDevice, translate)}
    </Modal>
  );
};

export default renderModal;
