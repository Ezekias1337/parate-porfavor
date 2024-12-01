import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define the response type
interface ModemStatus {
  cpuUsed: string | null;
  memUsed: string | null;
  systemTime: string | null;
}

// Fetch modem status function
const getModemStatus = async (): Promise<ModemStatus | null> => {
  const url = `${ROUTER_IP}/html/ssmp/deviceinfo/deviceinfo.asp`;

  try {
    const response = await fetchData(url, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        Priority: "u=4",
      },
      referrer: `${ROUTER_IP}/index.asp`,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch modem status, status: ${response.status}`
      );
    }

    const htmlText = await response.text();

    // Extract JavaScript variables using regular expressions
    const cpuUsedMatch = htmlText.match(/var cpuUsed = '(.+?)';/);
    const memUsedMatch = htmlText.match(/var memUsed = '(.+?)';/);
    const systemTimeMatch = htmlText.match(/var systemdsttime = '(.+?)';/);

    // Return extracted data
    return {
      cpuUsed: cpuUsedMatch ? cpuUsedMatch[1] : null,
      memUsed: memUsedMatch ? memUsedMatch[1] : null,
      systemTime: systemTimeMatch ? systemTimeMatch[1] : null,
    };
  } catch (error) {
    console.error("Error fetching modem status:", error);
    return null; // Return null in case of error
  }
};

export default getModemStatus;
