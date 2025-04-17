// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import handleFetchParentalControls from "../handleFetchParentalControls";
// Types
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
// CSS
import parentalControlsStyles from "../../../../styles/page-specific/parentalControls";

interface RenderControlButtonsProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  translate: (key: string) => string;
}

const renderControlButtons = ({
  setLoading,
  setParentalControls,
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
      />
    </View>
  );
};

export default renderControlButtons;
