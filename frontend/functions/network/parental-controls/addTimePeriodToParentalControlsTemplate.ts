import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";
/* 
  Need to use the types defined in shared folder for props
*/

const addTimePeriodToParentalControlsTemplate = async (
  startTime: string,
  endTime: string,
  repeatDays: number[],
  templateNumber: number,
  durationNumber: number | null,
  ontToken: OntToken,
): Promise<boolean> => {
  try {
    const timePeriod = {
      startTime,
      endTime,
      repeatDays,
      templateNumber,
      durationNumber,
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

    if (!response.ok) {
      throw new Error(
        `Failed to add time period parental controls template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to add device to parental controls template, status", error);
    return false;
  }
};

export default addTimePeriodToParentalControlsTemplate;
