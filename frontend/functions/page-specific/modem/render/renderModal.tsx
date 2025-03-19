// Library Imports
import { Text } from "react-native";
// Components
import Modal from "@/components/Modal";

const renderModal = (
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <Text>Modal</Text>
    </Modal>
  );
};

export default renderModal;
