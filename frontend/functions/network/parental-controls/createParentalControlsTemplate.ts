// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";

/**
 * Creates a parental controls template.
 * @param {string} name - The name of the parental controls template.
 * @param {number} startDate - The start date of the parental controls template.
 * @param {number} endDate - The end date of the parental controls template.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<boolean>} - A promise that resolves to true if the parental controls template was created successfully, false otherwise.
*/

const createParentalControlsTemplate = async (
  name: string,
  startDate: number,
  endDate: number,
  ontToken: OntToken
): Promise<boolean> => {
  try {
    const infoOfTemplateToCreate = {
      templateName: name,
      templateStartDate: startDate,
      templateEndDate: endDate,
      ontToken: ontToken
    }
    
    const response = await fetchData("/api/parental-controls/create-parental-controls-template", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoOfTemplateToCreate),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create parental controls template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to create parental controls template, status", error);
    return false;
  }
};

export default createParentalControlsTemplate;
