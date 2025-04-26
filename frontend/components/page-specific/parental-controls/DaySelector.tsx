// Library Imports
import { View } from "react-native";
// Components
import DayButton from "./DayButton";
// Types
import { SelectedDays } from "../parental-controls/ParentalControlsModal";
// CSS
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";

interface DaySelectorProps {
  selectedDays: SelectedDays;
  setSelectedDays: React.Dispatch<React.SetStateAction<SelectedDays>>;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  setSelectedDays,
}: DaySelectorProps) => {
  return (
    <View style={parentalControlsStyles.daySelector}>
      {Object.keys(selectedDays).map((key: string, index: number) => (
        <DayButton
          key={index}
          day={parseInt(key)}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      ))}
    </View>
  );
};

export default DaySelector;
