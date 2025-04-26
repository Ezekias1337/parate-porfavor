// Library Imports
import { View } from "react-native";
// Components
import Button from "../../Button";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
// Types
import { AmPmButtonProps } from "./SchedulePeriodSelector";

const AmButton: React.FC<AmPmButtonProps> = ({
  restrictionTime,
  handleClick,
}) => {
  return (
    <View style={parentalControlsStyles.ampmButtonContainer}>
      <Button
        text="AM"
        variant={restrictionTime.amOrPm === "AM" ? "warning" : "neutral"}
        icon="sun-o"
        leftIcon
        onClickHandler={() => {
          handleClick();
        }}
      />
    </View>
  );
};

export default AmButton;
