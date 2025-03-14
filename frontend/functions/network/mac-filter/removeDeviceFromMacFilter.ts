import fetchData from "../auth/fetchData";
import { WirelessOrEthernet, OntToken } from "../../../../shared/types/MacFilter"

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
    console.log("infoOfDeviceToRemove: ", infoOfDeviceToRemove);

    const response = await fetchData("/api/mac-filter/remove-device-from-mac-filter", {
      method: "POST",
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
