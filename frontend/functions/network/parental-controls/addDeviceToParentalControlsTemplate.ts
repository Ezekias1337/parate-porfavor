import fetchData from "../auth/fetchData";
// Types
import OntToken from "../../../../shared/types/OntToken";

const addDeviceToParentalControlsTemplate = async (
  macAddress: string,
  description: string = "",
  templateInst: number = 1,
  ontToken: OntToken
): Promise<boolean> => {
  try {
    const infoOfDeviceToAdd = {
      deviceToAdd: {
        deviceMac: macAddress,
        deviceDescription: description,
        templateInst: templateInst
      },
      ontToken: ontToken
    }

    const response = await fetchData("/api/parental-controls/add-device-to-parental-controls", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoOfDeviceToAdd),
    });

    if (response.status === 404) {
      return true
    } else {
      throw new Error(
        `Failed to add device to parental controls template, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Failed to add device to parental controls template, status", error);
    return false;
  }
}


export default addDeviceToParentalControlsTemplate;
