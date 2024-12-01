import fetchData from "../fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Reboot modem function
const rebootModem = async (): Promise<boolean> => {
  const url = `${ROUTER_IP}/html/ssmp/reset/set.cgi?x=InternetGatewayDevice.X_HW_DEBUG.SMP.DM.ResetBoard&RequestFile=html/ssmp/reset/reset.asp`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      credentials: "include", // Ensure authentication is handled with cookies
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        Priority: "u=4",
      },
      referrer: `${ROUTER_IP}/html/ssmp/reset/reset.asp`,
      body: "x.X_HW_Token=85d15d41b2bf2d0b60410407f90d9c3d5b387169e6356705",
    });

    if (!response.ok) {
      throw new Error(`Failed to reboot modem, status: ${response.status}`);
    }

    return true; // Return true if reboot request is successful
  } catch (error) {
    console.error("Error rebooting modem:", error);
    return false; // Return false in case of an error
  }
};

export default rebootModem;
