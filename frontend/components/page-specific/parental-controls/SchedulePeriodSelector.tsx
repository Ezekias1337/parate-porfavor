// Library Imports
import { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
// Components
import Button from "@/components/Button";
import DaySelector from "./DaySelector";
import AmPmSelector from "./AmPmSelector";
// Functions, Helpers, Utils, and Hooks
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import handleAddTimePeriod from "@/functions/page-specific/parental-controls/handleAddTimePeriod";
import convertToRestrictionTimeType from "@/helpers/convertToRestrictionTimeType";
import convertToRepeatDays from "@/helpers/convertToRepeatDays";
// Types
import { SelectedDays } from "../parental-controls/ParentalControlsModal";
import OntToken from "../../../../shared/types/OntToken";
import {
  Template,
  ParentalControlsData,
  Restriction,
} from "../../../../shared/types/ParentalControls";
// CSS
import { inputFieldStyles } from "../../../styles/component-specific/input-fields";
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
import { colors } from "../../../styles/variables";

interface SchedulePeriodSelectorProps {
  translate: (key: string) => string;
  template: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  restrictionToEdit: Restriction | null;
  setShowSchedulePeriodSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  ontToken: OntToken;
}

export type RestrictionTime = {
  time: string;
  amOrPm: "AM" | "PM";
};

export interface AmPmButtonProps {
  restrictionTime: RestrictionTime;
  handleClick: () => void;
}

const SchedulePeriodSelector: React.FC<SchedulePeriodSelectorProps> = ({
  translate,
  template,
  setSelectedTemplate,
  restrictionToEdit,
  setShowSchedulePeriodSelector,
  setParentalControls,
  ontToken,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<RestrictionTime>({
    time: "",
    amOrPm: "AM",
  });
  const [endTime, setEndTime] = useState<RestrictionTime>({
    time: "",
    amOrPm: "AM",
  });
  const [selectedDays, setSelectedDays] = useState<SelectedDays>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  /* 
    ? Initialize values on mount
  */
  useEffect(() => {
    if (restrictionToEdit?.startTime) {
      const tempStartTime = convertToRestrictionTimeType(
        restrictionToEdit.startTime
      );
      setStartTime(tempStartTime);
    }

    if (restrictionToEdit?.endTime) {
      const tempEndTime = convertToRestrictionTimeType(
        restrictionToEdit.endTime
      );
      setEndTime(tempEndTime);
    }

    if (restrictionToEdit?.repeatDays) {
      const tempSelectedDays = convertToRepeatDays(
        restrictionToEdit.repeatDays
      );
      setSelectedDays(tempSelectedDays);
    }
  }, [restrictionToEdit]);

  useEffect(() => {
    console.log(template);
  }, [template]);

  return (
    <ScrollView
      contentContainerStyle={[
        parentalControlsStyles.modalContainer,
        { flexGrow: 1 },
      ]}
    >
      <Text style={[parentalControlsStyles.title, { marginBottom: 40 }]}>
        {translate("modifyScheduledRestriction")}
      </Text>

      <View style={[inputFieldStyles.formLabelContainer, { marginTop: 20 }]}>
        <Text style={inputFieldStyles.formLabel}>
          {translate("allowedDays")}
        </Text>
      </View>
      <DaySelector
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />

      <View style={inputFieldStyles.formRow}>
        <View style={[inputFieldStyles.formLabelContainer, { marginTop: 20 }]}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("allowedStartTime")}
          </Text>
        </View>

        <TextInput
          placeholder="00:00"
          value={startTime.time}
          keyboardType="number-pad"
          onChangeText={(text) => {
            const newObj = { ...startTime };
            newObj.time = text;

            setStartTime(newObj);
          }}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="startTime"
        />
        <AmPmSelector restrictionTime={startTime} setTime={setStartTime} />

        <View style={[inputFieldStyles.formLabelContainer, { marginTop: 20 }]}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("allowedEndTime")}
          </Text>
        </View>
        <TextInput
          placeholder="00:00"
          value={endTime.time}
          keyboardType="number-pad"
          onChangeText={(text) => {
            const newObj = { ...endTime };
            newObj.time = text;

            setEndTime(newObj);
          }}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="endTime"
        />
      </View>
      <AmPmSelector restrictionTime={endTime} setTime={setEndTime} />

      <View style={parentalControlsStyles.buttonContainer}>
        <Button
          text={translate("saveChanges")}
          variant="primary"
          icon="floppy-o"
          leftIcon
          onClickHandler={async () => {
            await handleAddTimePeriod({
              template,
              restrictionToEdit,
              startTime,
              endTime,
              selectedDays,
              setShowSchedulePeriodSelector,
              setLoading,
              setParentalControls,
              setSelectedTemplate,
              setError,
              ontToken,
              translate,
            });
          }}
        />
        <Button
          text={translate("cancel")}
          variant="neutral"
          leftIcon
          icon="ban"
          onClickHandler={() => {
            setShowSchedulePeriodSelector(false);
          }}
        />
      </View>

      {renderErrorMsg(error)}
    </ScrollView>
  );
};

export default SchedulePeriodSelector;
