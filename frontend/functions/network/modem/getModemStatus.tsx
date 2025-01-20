import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the response type
export interface ModemStatus {
  cpuUsed: string | null;
  memUsed: string | null;
  systemTime: string | null;
}

// Fetch modem status function
const getModemStatus = async (): Promise<ModemStatus | null> => {
  try {
    // Step 4: Fetch modem status using the auth cookie
    const url = `/html/ssmp/deviceinfo/deviceinfo.asp`;

    const response = await fetchData(url, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "Priority": "u=4",
        //"Cookie": `authCookie=${authCookie}`, // Include the auth cookie in the request
        "X-Requested-With": "XMLHttpRequest", // Make it look like an Ajax request
        "Upgrade-Insecure-Requests": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      },
      mode: "cors", // Ensure CORS mode is set correctly
      referrer: `${ROUTER_IP}/index.asp`, // Use the router IP as the referrer
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch modem status, status: ${response.status}`
      );
    }

    const htmlText = await response.text();
    console.log("HTML Response:", htmlText);

    const cpuUsedMatch = htmlText.match(/var cpuUsed = '(.+?)';/);
    const memUsedMatch = htmlText.match(/var memUsed = '(.+?)';/);
    const systemTimeMatch = htmlText.match(/var systemdsttime = '(.+?)';/);

    return {
      cpuUsed: cpuUsedMatch ? cpuUsedMatch[1] : null,
      memUsed: memUsedMatch ? memUsedMatch[1] : null,
      systemTime: systemTimeMatch ? systemTimeMatch[1] : null,
    };
  } catch (error) {
    console.error("Error fetching modem status:", error);
    return null;
  }
};

export default getModemStatus;
