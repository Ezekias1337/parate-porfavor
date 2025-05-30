// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import { WirelessOrEthernet } from "../../../../shared/types/MacFilter"
import OntToken from "../../../../shared/types/OntToken";

/**
 * Removes a device from the mac filter.
 * @param {number[]} deviceIndecesToRemove - The index of the device to remove.
 * @param {WirelessOrEthernet} wirelessOrEthernet - The wireless or ethernet.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<Boolean>} - A promise that resolves to true if the device was removed successfully, false otherwise.
*/

const removeDeviceFromMacFilter = async (
  deviceIndecesToRemove: number[],
  wirelessOrEthernet: WirelessOrEthernet,
  ontToken: OntToken
): Promise<Boolean> => {
  try {
    let infoOfDeviceToRemove = {
      deviceIndecesToRemove: deviceIndecesToRemove,
      wirelessOrEthernet: wirelessOrEthernet,
      ontToken: ontToken,
    };

    const response = await fetchData("/api/mac-filter/remove-device-from-mac-filter", {
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
        `Failed to remove device from MAC filter, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Error removing device from MAC filter:", error);
    return false;
  }
};

export default removeDeviceFromMacFilter;
