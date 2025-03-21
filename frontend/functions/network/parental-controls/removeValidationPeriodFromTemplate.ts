import fetchData from "../auth/fetchData";

/* 
  Need to use the types defined in shared folder for props
*/

const removeValidationPeriodFromTemplate = async (
  startTime: string,
  endTime: string,
  repeatDays: string, // A string of comma-separated days (e.g., "7,1,2,3,4,5,6")
  token: string,
  isWholeDay: boolean = false // Optional flag for Whole Day, Every Day
): Promise<boolean> => {
  try {
    const response = await fetchData("/api/parental-controls/remove-validation-period-from-template", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(infoOfDeviceToAdd),
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

export default removeValidationPeriodFromTemplate;
