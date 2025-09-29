// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks

// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

/**
 * Renders the control buttons for the Settings page.
 * @param setModalVisible The function to set the modal visible state.
 * @param translate The function to translate the text.
 * @returns {JSX.Element} The rendered control buttons.
 */

interface RenderControlButtonsProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  translate: (key: string) => string;
}

const renderControlButtons = ({
  setModalVisible,
  translate,
}: RenderControlButtonsProps) => {
  return (
    <View style={settingsStyles.buttonContainer}>
      <Button
        text={translate("addProfile")}
        variant="success"
        icon="plus"
        leftIcon
        onClickHandler={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
};

export default renderControlButtons;
