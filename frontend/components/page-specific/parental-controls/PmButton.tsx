// Library Imports
import { View } from "react-native";
// Components
import Button from "../../Button";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
// Types
import { AmPmButtonProps } from "./SchedulePeriodSelector";

const PmButton: React.FC<AmPmButtonProps> = ({
  restrictionTime,
  handleClick,
}) => {
  return (
    <View style={parentalControlsStyles.ampmButtonContainer}>
      <Button
        text="PM"
        variant={restrictionTime.amOrPm === "PM" ? "neutralDark" : "neutral"}
        icon="moon-o"
        leftIcon
        onClickHandler={() => {
          handleClick();
        }}
      />
    </View>
  );
};

export default PmButton;
