// Library Imports
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
// Components
import { useLocalization } from "../../localization/LocalizationContext";
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
// Constants
import daysMap from "@/constants/Days";
// Types
import { SelectedDays } from "../parental-controls/ParentalControlsModal";
// CSS

interface DayButtonProps {
  day: number;
  selectedDays: SelectedDays;
  setSelectedDays: React.Dispatch<React.SetStateAction<SelectedDays>>;
}

const determineIsSelected = (day: number, selectedDays: SelectedDays) => {
  let isSelected = false;

  if (selectedDays[day] === true) {
    isSelected = true;
  }

  return isSelected;
};

const DayButton: React.FC<DayButtonProps> = ({
  day,
  selectedDays,
  setSelectedDays,
}) => {
  const { translate } = useLocalization();
  const [dayString, setDayString] = useState<string | undefined>(
    daysMap.get(day)
  );
  const [dayStringLocalized, setDayStringLocalized] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>();

  useEffect(() => {
    console.log("dayStringPreTranslate", dayString);
    let tempLocalizedString: string;

    if (dayString !== undefined) {
      tempLocalizedString = translate(dayString);
    } else {
      tempLocalizedString = "";
    }
    setDayStringLocalized(tempLocalizedString);
  }, [dayString, setDayStringLocalized]);

  useEffect(() => {
    setIsSelected(determineIsSelected(day, selectedDays));
  }, [day, selectedDays, setIsSelected]);

  return (
    <Button
      variant={isSelected ? "primary" : "neutral"}
      buttonSize="small"
      onClickHandler={() => {
        const tempSelectedDays = { ...selectedDays };
        tempSelectedDays[day] = !tempSelectedDays[day];
        setSelectedDays(tempSelectedDays);
      }}
      text={dayStringLocalized}
    ></Button>
  );
};

export default DayButton;
