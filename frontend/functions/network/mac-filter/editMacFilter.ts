// Functions, Helpers, Utils, and Hooks
import fetchData from "../auth/fetchData";
// Types
import { BlacklistOrWhitelist, MacFilterEnabledOrDisabled, WirelessOrEthernet, MacFilter } from "../../../../shared/types/MacFilter"
import OntToken from "../../../../shared/types/OntToken";

/**
 * Edits the mac filter.
 * @param {BlacklistOrWhitelist} blacklistOrWhitelist - The blacklist or whitelist.
 * @param {MacFilterEnabledOrDisabled} macFilterEnabledOrDisabled - The mac filter enabled or disabled.
 * @param {WirelessOrEthernet} wirelessOrEthernet - The wireless or ethernet.
 * @param {OntToken} ontToken - The token for the ONT.
 * @returns {Promise<Boolean>} - A promise that resolves to true if the mac filter was edited successfully, false otherwise.
*/

const editMacFilter = async (
  blacklistOrWhitelist: BlacklistOrWhitelist,
  macFilterEnabledOrDisabled: MacFilterEnabledOrDisabled,
  wirelessOrEthernet: WirelessOrEthernet,
  ontToken: OntToken
): Promise<Boolean> => {
  try {
    let newMacFilterConfig: MacFilter = {
      blacklistOrWhitelist: blacklistOrWhitelist,
      macFilterEnabledOrDisabled: macFilterEnabledOrDisabled,
      wirelessOrEthernet: wirelessOrEthernet,
      ontToken: ontToken
    };

    const response = await fetchData("/api/mac-filter/edit-mac-filter", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
      body: JSON.stringify(newMacFilterConfig),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to edit MAC filter, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Error editing MAC filter:", error);
    return false;
  }
};

export default editMacFilter;
