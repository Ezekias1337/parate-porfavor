// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import { WirelessOrEthernet } from "../../../../shared/types/MacFilter"
import OntToken from "../../../../shared/types/OntToken";

/**
 * Gets the ont token needed for mac filter operations
 * @param {WirelessOrEthernet} wirelessOrEthernet - The wireless or ethernet.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<OntToken>} - A promise that resolves to the ont token or null if not found.
*/

const getOntToken = async (
  wirelessOrEthernet: WirelessOrEthernet,
  ontToken: OntToken
): Promise<OntToken> => {
  try {
    if (typeof ontToken === "string") {
      return ontToken;
    }

    let infoNeededForToken = {
      wirelessOrEthernet: wirelessOrEthernet,
      ontToken: ontToken,
    };
    const response = await fetchData("/api/mac-filter/get-ont-token", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoNeededForToken),
    });

    const responseJson = await response.json();
    if (!response.ok || responseJson === null) {
      throw new Error(
        `Failed to fetch ontToken, status: ${response.status}`
      );
    }
    
    return responseJson;
  } catch (error) {
    console.error("Error fetching ontToken:", error);
    return null;
  }
};

export default getOntToken;
