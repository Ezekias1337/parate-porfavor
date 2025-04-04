import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";

const removeDeviceFromParentalControlsTemplate = async (
  macIndex: number,
  ontToken: OntToken
): Promise<boolean> => {
  try {
    const response = await fetchData("/api/parental-controls/remove-device-from-parental-controls-template", {
      method: "DELETE",
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
