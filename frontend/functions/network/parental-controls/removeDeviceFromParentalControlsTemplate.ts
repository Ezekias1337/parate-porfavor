// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";

/**
 * Removes a device from a parental controls template.
 * @param {number} macIndex - The index of the device to remove.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<boolean>} - A promise that resolves to true if the device was removed successfully, false otherwise.
*/

const removeDeviceFromParentalControlsTemplate = async (
  macIndex: number,
  ontToken: OntToken
): Promise<boolean> => {
  try {
    const infoOfDeviceToRemove = {
      macIndex: macIndex,
      ontToken: ontToken
    }
    
    const response = await fetchData("/api/parental-controls/remove-device-from-parental-controls", {
      method: "DELETE",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoOfDeviceToRemove),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to remove device from parental controls template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to remove device from parental controls template, status", error);
    return false;
  }
};

export default removeDeviceFromParentalControlsTemplate;
