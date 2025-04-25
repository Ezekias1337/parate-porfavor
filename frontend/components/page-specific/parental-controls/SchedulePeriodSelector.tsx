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
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
import convertToRestrictionTimeType from "@/helpers/convertToRestrictionTimeType";
import convertToRepeatDays from "@/helpers/convertToRepeatDays";
// Constants
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

              let durationNumber: number | null = null;
              let usedIds: number[] = [];
              
              if (restrictionToEdit) {
                durationNumber = restrictionToEdit.id;
              } else if (template?.restrictions?.length > 0) {
                /* 
                  ? There is a maximum of 4 time periods per template, but we cannot
                  ? guarantee that the id of each time period will be sequential,
                  ? so we have to check for which ids are available and use the lowest
                  ? available id.
                */
                for (const restriction of template.restrictions) {
                  usedIds.push(restriction.id);
                }
                usedIds.sort();

                if (usedIds.length >= 4) {
                  setError(translate("tooManySchedules"));
                  throw new Error(translate("tooManySchedules"));
                }
                const possibleIds = [1, 2, 3, 4];
                const availableIds = possibleIds.filter(
                  (id) => !usedIds.includes(id)
                );
                durationNumber = availableIds[0];
              }

              await addTimePeriodToParentalControlsTemplate({
                startTime: parsedStartTime,
                endTime: parsedEndTime,
                repeatDays: parsedRepeatDays,
                templateNumber: template.id,
                durationNumber: durationNumber,
                usedIds: usedIds,
                isEditingRestriction: restrictionToEdit ? true : false,
                ontToken: ontToken,
              });

              setShowSchedulePeriodSelector(false);
              const newParentalControls = await handleFetchParentalControls({
                setLoading,
                setParentalControls,
                setErrorMsg: setError,
                translate,
              });
              const updatedTemplate = newParentalControls.templates.find(
                (temp) => temp.id === template.id
              );
              if (updatedTemplate) {
                setSelectedTemplate(updatedTemplate);
              }
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
