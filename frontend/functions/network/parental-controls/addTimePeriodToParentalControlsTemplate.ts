// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";

/**
 * Adds a time period to a parental controls template.
 * @param {string} startTime - The start time of the time period.
 * @param {string} endTime - The end time of the time period.
 * @param {number[]} repeatDays - The repeat days of the time period.
 * @param {number} templateNumber - The instance number of the parental controls template.
 * @param {number} durationNumber - The duration number of the time period.
 * @param {number[]} usedIds - The used ids of the time periods.
 * @param {boolean} isEditingRestriction - Whether the time period is being edited.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<boolean>} - A promise that resolves to true if the time period was added successfully, false otherwise.
*/

interface addTimePeriodArgs {
  startTime: string,
  endTime: string,
  repeatDays: number[],
  templateNumber: number,
  durationNumber: number | null,
  usedIds: number[],
  isEditingRestriction: boolean
  ontToken: OntToken
}

const addTimePeriodToParentalControlsTemplate = async (
  {
    startTime,
    endTime,
    repeatDays,
    templateNumber,
    durationNumber,
    usedIds,
    isEditingRestriction,
    ontToken
  }: addTimePeriodArgs
): Promise<boolean> => {
  try {
    if (usedIds.length >= 4) {
      throw new Error(
        `Failed to add time period parental controls template`
      );
    }


    const timePeriod = {
      startTime,
      endTime,
      repeatDays,
      templateNumber,
      durationNumber,
      usedIds,
      isEditingRestriction,
      ontToken,
    }

    const response = await fetchData("/api/parental-controls/add-time-period-to-parental-controls-template", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timePeriod),
    });

    if (response.status === 404) {
      return true
    } else {
      throw new Error(
        `Failed to add time period parental controls template`
      );
    }
  } catch (error) {
    console.error("Failed to add device to parental controls template, status", error);
    return false;
  }
};

export default addTimePeriodToParentalControlsTemplate;
