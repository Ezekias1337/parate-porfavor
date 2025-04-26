// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import handleFetchParentalControls from "../handleFetchParentalControls";
// Types
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
import { Template } from "../../../../../shared/types/ParentalControls";
// CSS
import parentalControlsStyles from "../../../../styles/page-specific/parentalControls";

/**
 * Renders the control buttons for the Parental Controls page.
 * @param setLoading The function to set the loading state.
 * @param setParentalControls The function to set the parental controls state.
 * @param setModalVisible The function to set the modal visible state.
 * @param setSelectedTemplate The function to set the selected template state.
 * @param setErrorMsg The function to set the error message state.
 * @param translate The function to translate the text.
 * @returns {JSX.Element} The rendered control buttons.
*/

interface RenderControlButtonsProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  translate: (key: string) => string;
}

const renderControlButtons = ({
  setLoading,
  setParentalControls,
  setModalVisible,
  setSelectedTemplate,
  setErrorMsg,
  translate,
}: RenderControlButtonsProps) => {
  return (
    <View style={parentalControlsStyles.buttonContainer}>
      <Button
        text={translate("refresh")}
        variant="primary"
        icon="refresh"
        leftIcon
        onClickHandler={async () => {
          await handleFetchParentalControls({
            setLoading,
            setParentalControls,
            setErrorMsg,
            translate,
          });
        }}
      />
      <Button
        text={translate("createScheduledRestriction")}
        variant="success"
        icon="plus"
        leftIcon
        onClickHandler={() => {
          setSelectedTemplate(null);
          setModalVisible(true);
        }}
      />
    </View>
  );
};

export default renderControlButtons;
