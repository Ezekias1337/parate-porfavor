// Library Imports
import { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
// Components
import Button from "@/components/Button";
import DaySelector from "./DaySelector";
// Functions, Helpers, Utils, and Hooks
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import convertTo24HourFormat from "@/helpers/convertTo24HourFormat";
import addTimePeriodToParentalControlsTemplate from "@/functions/network/parental-controls/addTimePeriodToParentalControlsTemplate";
import checkForIncorrectTimeRange from "@/helpers/checkForIncorrectTimeRange";
// Constants
// Types
import { SelectedDays } from "../parental-controls/ParentalControlsModal";
import OntToken from "../../../../shared/types/OntToken";
// CSS
import { inputFieldStyles } from "../../../styles/component-specific/input-fields";
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
import { colors } from "../../../styles/variables";

interface SchedulePeriodSelectorProps {
  translate: (key: string) => string;
  existingStartTime?: RestrictionTime;
  existingEndTime?: RestrictionTime;
  existingSelectedDays?: SelectedDays;
  ontToken: OntToken;
}

export interface RestrictionTime {
  time: string;
  amOrPm: "AM" | "PM";
}

const SchedulePeriodSelector: React.FC<SchedulePeriodSelectorProps> = ({
  translate,
  existingStartTime,
  existingEndTime,
  existingSelectedDays,
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
    ! Initialize the form with the existing values if they are provided
  */
  useEffect(() => {
    setStartTime(
      existingStartTime || {
        time: "",
        amOrPm: "AM",
      }
    );
    setEndTime(
      existingEndTime || {
        time: "",
        amOrPm: "AM",
      }
    );
    setSelectedDays(
      existingSelectedDays || {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
      }
    );
  }, []);

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

        <View style={parentalControlsStyles.ampmContainer}>
          <View style={parentalControlsStyles.ampmButtonContainer}>
            <Button
              text="AM"
              variant={startTime.amOrPm === "AM" ? "warning" : "neutral"}
              icon="sun-o"
              loading={loading}
              leftIcon
              onClickHandler={() => {
                setStartTime({
                  ...startTime,
                  amOrPm: "AM",
                });
              }}
            />
          </View>
          <View style={parentalControlsStyles.ampmButtonContainer}>
            <Button
              text="PM"
              variant={startTime.amOrPm === "PM" ? "primaryDark" : "neutral"}
              icon="moon-o"
              loading={loading}
              leftIcon
              onClickHandler={() => {
                setStartTime({
                  ...startTime,
                  amOrPm: "PM",
                });
              }}
            />
          </View>
        </View>

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

      <View style={parentalControlsStyles.ampmContainer}>
        <View style={parentalControlsStyles.ampmButtonContainer}>
          <Button
            text="AM"
            variant={endTime.amOrPm === "AM" ? "warning" : "neutral"}
            icon="sun-o"
            loading={loading}
            leftIcon
            onClickHandler={() => {
              setEndTime({
                ...endTime,
                amOrPm: "AM",
              });
            }}
          />
        </View>
        <View style={parentalControlsStyles.ampmButtonContainer}>
          <Button
            text="PM"
            variant={endTime.amOrPm === "PM" ? "primaryDark" : "neutral"}
            icon="moon-o"
            loading={loading}
            leftIcon
            onClickHandler={() => {
              setEndTime({
                ...endTime,
                amOrPm: "PM",
              });
            }}
          />
        </View>
      </View>

      <View style={parentalControlsStyles.buttonContainer}>
        <Button
          text={translate("saveChanges")}
          variant="primary"
          icon="floppy-o"
          leftIcon
          onClickHandler={async () => {
            try {
              setError(null);
              const parsedStartTime = convertTo24HourFormat(startTime);
              const parsedEndTime = convertTo24HourFormat(endTime);
              const parsedRepeatDays: number[] = [];

              for (const [key, value] of Object.entries(selectedDays)) {
                if (value === true) {
                  parsedRepeatDays.push(parseInt(key));
                }
              }

              if (parsedRepeatDays.length === 0) {
                setError(translate("needToSelectDays"));
                throw new Error(translate("needToSelectDays"));
              }

              const isTimeRangeIncorrect = checkForIncorrectTimeRange(
                parsedStartTime,
                parsedEndTime
              );

              if (isTimeRangeIncorrect) {
                setError(translate("incorrectTimeRange"));
                return;
              }

              await addTimePeriodToParentalControlsTemplate(
                parsedStartTime,
                parsedEndTime,
                parsedRepeatDays,
                3,
                null,
                ontToken
              );
            } catch (error) {
              console.error(error);
              setError(translate("addTimePeriodError"));
            }
          }}
        />
      </View>

      {renderErrorMsg(error)}
    </ScrollView>
  );
};

export default SchedulePeriodSelector;
