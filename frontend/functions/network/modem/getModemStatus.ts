import fetchData from "../auth/fetchData";
import { ModemStatus } from "../../../../shared/types/Modem"

/**
 * Gets the modem status.
 * @returns {Promise<ModemStatus | null>} - A promise that resolves to the modem status or null if not found.
*/

const getModemStatus = async (): Promise<ModemStatus | null> => {
  try {
    const response = await fetchData("/api/modem/get-modem-status", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch modem status, status: ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching modem status:", error);
    return null;
  }
};

export default getModemStatus;
