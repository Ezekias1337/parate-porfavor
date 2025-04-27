// Functions, Helpers, Utils, and Hooks
import addTimePeriodToParentalControlsTemplate from "@/functions/network/parental-controls/addTimePeriodToParentalControlsTemplate";
import handleFetchParentalControls from "./handleFetchParentalControls";
import checkForIncorrectTimeRange from "../../../helpers/checkForIncorrectTimeRange";
import convertTo24HourFormat from "../../../helpers/convertTo24HourFormat";
// Types
import { Template, Restriction, ParentalControlsData } from "../../../../shared/types/ParentalControls";
import { SelectedDays } from "../../../components/page-specific/parental-controls/ParentalControlsModal";
import { RestrictionTime } from "../../../components/page-specific/parental-controls/SchedulePeriodSelector";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Handles adding a time period to a template, associated state updates, and error handling.
 * @param {Template} template - The template to add the time period to.
 * @param {Restriction | null} restrictionToEdit - The time period to edit (if any).
 * @param {RestrictionTime} startTime - The start time of the time period.
 * @param {RestrictionTime} endTime - The end time of the time period.
 * @param {SelectedDays} selectedDays - The selected days for the time period.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShowSchedulePeriodSelector - The function to set the showSchedulePeriodSelector state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ParentalControlsData>>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<Template | null>>} setSelectedTemplate - The function to set the selected template state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setError - The function to set the error state.
 * @param {OntToken} ontToken - The ONT token.
 * @param {Function} translate - The function to translate the text.
 * @returns {Promise<void>} A promise that resolves when the time period is added to the template.
*/

interface handleAddTimePeriodProps {
    template: Template;
    restrictionToEdit: Restriction | null;
    startTime: RestrictionTime;
    endTime: RestrictionTime;
    selectedDays: SelectedDays;
    setShowSchedulePeriodSelector: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setParentalControls: React.Dispatch<React.SetStateAction<ParentalControlsData>>;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    ontToken: OntToken;
    translate: (key: string) => string;
}


const handleAddTimePeriod = async ({ template, restrictionToEdit, startTime, endTime, selectedDays, setShowSchedulePeriodSelector, setLoading, setParentalControls, setSelectedTemplate, setError, ontToken, translate }: handleAddTimePeriodProps) => {
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

        if (isTimeRangeIncorrect || parsedStartTime === parsedEndTime) {
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
}

export default handleAddTimePeriod