import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModemStatus } from "../../../../shared/types/Modem"

// Fetch modem status function
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
