import fetchData from "../auth/fetchData";

/* 
  Need to use the types defined in shared folder for props
*/

const addValidationPeriodToTemplate = async (

): Promise<boolean> => {
  try {
    const response = await fetchData("/api/parental-controls/add-validation-period-to-template", {
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
        `Failed to add validation period to template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to add validation period to template, status", error);
    return false;
  }
};

export default addValidationPeriodToTemplate;
