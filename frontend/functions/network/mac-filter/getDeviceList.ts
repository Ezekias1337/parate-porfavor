// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import { Device } from "../../../../shared/types/Device";

/**
 * Gets the device list.
 * @returns {Device[]} - The device list.
*/

const getDeviceList = async (): Promise<Device[]> => {
  try {
    const response = await fetchData("/api/mac-filter/get-device-list", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get device list, status: ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error getting device list, error", error);
    return []
  }
};

export default getDeviceList;
