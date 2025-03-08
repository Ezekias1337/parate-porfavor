import fetchData from "../auth/fetchData";
import { WirelessOrEthernet, SSIDName, MacDevice, OntToken } from "../../../../shared/types/MacFilter"

const addDevicetoMacFilter = async (
  sourceMacAddress: string,
  deviceName: string,
  ssidName: SSIDName,
  wirelessOrEthernet: WirelessOrEthernet,
  ontToken: OntToken
): Promise<Boolean> => {
  try {
    let infoOfDeviceToAdd: MacDevice = {
      deviceToAdd: {
        deviceMac: sourceMacAddress,
        deviceName: deviceName !== "" ? deviceName : sourceMacAddress,
      },
      ssidName: ssidName,
      wirelessOrEthernet: wirelessOrEthernet,
      ontToken: ontToken,
    };

    const response = await fetchData("/api/mac-filter/add-device-to-mac-filter", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoOfDeviceToAdd),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add device to mac filter, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Error adding device to mac filter, status", error);
    return false;
  }
};

export default addDevicetoMacFilter;
