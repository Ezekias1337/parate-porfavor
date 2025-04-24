import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";
/* 
  Need to use the types defined in shared folder for props
*/

interface removeTimePeriodArgs {
  templateNumber: number,
  durationNumber: number | null,
  ontToken: OntToken
}

const removeTimePeriodFromParentalControlsTemplate = async (
  {
    templateNumber,
    durationNumber,
    ontToken
  }: removeTimePeriodArgs
): Promise<boolean> => {
  try {
    const timePeriodToRemove = {
      templateNumber,
      durationNumber,
      ontToken,
    }

    const response = await fetchData("/api/parental-controls/remove-time-period-from-parental-controls-template", {
      method: "DELETE",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timePeriodToRemove),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to remove time period from parental controls template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to remove time period from parental controls template, status", error);
    return false;
  }
};

export default removeTimePeriodFromParentalControlsTemplate;
