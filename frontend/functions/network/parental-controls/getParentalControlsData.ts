import fetchData from "../auth/fetchData";
import { ParentalControlsData } from "../../../../shared/types/ParentalControls"

const getParentalControlsData = async (): Promise<ParentalControlsData> => {
  try {
    const response = await fetchData("/api/parental-controls/get-parental-controls-data", {
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
    return {
      templates: [],
      connectionAttempts: 0,
    };
  }
};

export default getParentalControlsData;
