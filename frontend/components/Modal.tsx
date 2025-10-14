import React, { FC } from "react";
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
// CSS
import { colors } from "../styles/colors";
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
  if (!modalVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}
    >
      <View style={modalStyles.modalWrapper} pointerEvents="box-none">
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setModalVisible(false)}
          android_ripple={{ color: "transparent" }}
        />

        <View style={styles.centerContainer} pointerEvents="box-none">
          <View
            style={[
              modalStyles.modalContents,
              additionalClassNames &&
                (modalStyles as any)[additionalClassNames],
            ]}
            onStartShouldSetResponder={() => false}
            onMoveShouldSetResponder={() => false}
          >
            <Pressable
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="close" color={colors.neutral100} size={36} />
            </Pressable>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true} // important for Android
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator
              automaticallyAdjustKeyboardInsets
              bounces={false}
              onStartShouldSetResponder={() => false}
              onMoveShouldSetResponder={() => false}
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // ensure it won't block touches to inner ScrollView
  },
});

export default Modal;
