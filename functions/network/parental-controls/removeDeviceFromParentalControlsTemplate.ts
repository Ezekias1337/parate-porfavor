import fetchData from "../fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define the response type (just the status code)
interface RemoveDeviceResponse {
  status: number;
}

const removeDeviceFromParentalControlsTemplate = async (
  macIndex: number,
  token: string
): Promise<RemoveDeviceResponse> => {
  const url = `${ROUTER_IP}/html/bbsp/parentalctrl/del.cgi?RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`;

  /* 
    ! Here the MAC.NUMBER refers to the 1-based index of the MAC address in the array of devices in the template.Accept

    ! For example, if the device you want to remove from the parental controls template is the second device in the list, then the MAC.NUMBER will be 2.
  */
  // Build the dynamic MAC.NUMBER (e.g., 2 for the second device)
  const body = `InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC.${macIndex}=&x.X_HW_Token=${encodeURIComponent(
    token
  )}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Upgrade-Insecure-Requests": "1",
    Priority: "u=4",
  };

  // Use ROUTER_IP for referrer
  const referrer = `${ROUTER_IP}/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC&RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`;

  const init: RequestInit = {
    method: "POST",
    body,
    headers,
    referrer,
    credentials: "include",
    redirect: "follow",
  };

  try {
    // Call fetchData with the correct return type
    const response = await fetchData(url, init);

    // Check if the response status is 200 OK
    if (response.status === 200) {
      return { status: response.status }; // Return the status code if 200
    } else {
      console.error("Request failed with status:", response.status);
      throw new Error(`Failed to remove device, status: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Error during removing device from parental controls:",
      error
    );
    throw error; // Re-throw to handle it in the calling function if necessary
  }
};

export default removeDeviceFromParentalControlsTemplate;
