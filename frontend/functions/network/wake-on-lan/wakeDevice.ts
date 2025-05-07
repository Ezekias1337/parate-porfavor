// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";

/**
 * Adds a device to a parental controls template.
 * @param {string} macAddress - The MAC address of the device to wake up.
 * @returns {Promise<boolean>} - A promise that resolves to true if the device was woken successfully, false otherwise.
*/

const wakeDevice = async (
  macAddress: string,
): Promise<boolean> => {
  try {
    const response = await fetchData("/api/wake-on-lan/wake-device", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({macAddress}),
    });

    if (response.ok) {
      return true
    } else {
      throw new Error(
        `Failed to wake device, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Failed to wake device, status", error);
    return false;
  }
}


export default wakeDevice;
