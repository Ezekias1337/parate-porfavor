// Library Imports
import { View } from "react-native";
// Components
import AmButton from "./AmButton";
import PmButton from "./PmButton";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
// Types
import { RestrictionTime } from "./SchedulePeriodSelector";

interface AmPmSelectorProps {
  restrictionTime: RestrictionTime;
  setTime: React.Dispatch<React.SetStateAction<RestrictionTime>>;
}

const AmPmSelector: React.FC<AmPmSelectorProps> = ({
  restrictionTime,
  setTime,
}) => {
  return (
    <View style={parentalControlsStyles.ampmContainer}>
      <AmButton
        restrictionTime={restrictionTime}
        handleClick={() => {
          setTime({
            ...restrictionTime,
            amOrPm: "AM",
          });
        }}
      />
      <PmButton
        restrictionTime={restrictionTime}
        handleClick={() => {
          setTime({
            ...restrictionTime,
            amOrPm: "PM",
          });
        }}
      />
    </View>
  );
};

export default AmPmSelector;
