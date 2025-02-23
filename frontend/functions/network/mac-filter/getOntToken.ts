import fetchData from "../auth/fetchData";
import { WirelessOrEthernet, OntToken } from "../../../../shared/types/MacFilter"

const getOntToken = async (
  wirelessOrEthernet: WirelessOrEthernet,
  ontToken: OntToken
): Promise<OntToken> => {
  try {
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
      },
      body: JSON.stringify(infoNeededForToken),
    });
    
    const responseJson = await response.json();
    if (!response.ok || responseJson === null) {
      throw new Error(
        `Failed to fetch ontToken, status: ${response.status}`
      );
    }
    
    return responseJson.ontToken;
  } catch (error) {
    console.error("Error fetching ontToken:", error);
    return null;
  }
};

export default getOntToken;
