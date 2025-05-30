// Library Imports
import React, { FC } from "react";
import { Modal as RNModal, View, Pressable, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// CSS
import { colors } from "../styles/variables";
import { modalStyles } from "../styles/component-specific/modal";

interface ModalProps {
  additionalClassNames?: string;
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({
  additionalClassNames,
  children,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ScrollView contentContainerStyle={modalStyles.modalWrapper} automaticallyAdjustKeyboardInsets={true}>
        <View
          style={[
            modalStyles.modalContents,
            additionalClassNames && (modalStyles as any)[additionalClassNames],
          ]}
        >
          <Pressable
            style={modalStyles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="close" color={colors.neutral100} size={36} />
          </Pressable>
          {children}
        </View>
      </ScrollView>
    </RNModal>
  );
};

export default Modal;
