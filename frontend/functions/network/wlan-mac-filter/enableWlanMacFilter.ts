import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define the response type (we'll check for status 200)
interface EnableWlanMacFilterResponse {
  status: number;
}

const enableWlanMacFilter = async (
  wlanMacFilterPolicy: string,
  wlanMacFilterRight: string,
  token: string
): Promise<EnableWlanMacFilterResponse> => {
  const url = `${ROUTER_IP}/html/bbsp/wlanmacfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp`;

  const body = `x.WlanMacFilterPolicy=${encodeURIComponent(
    wlanMacFilterPolicy
  )}&x.WlanMacFilterRight=${encodeURIComponent(
    wlanMacFilterRight
  )}&x.X_HW_Token=${encodeURIComponent(token)}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Upgrade-Insecure-Requests": "1",
    Priority: "u=4",
  };

  // Using the ROUTER_IP variable for the referrer
  const referrer = `${ROUTER_IP}/html/bbsp/wlanmacfilter/add.cgi?x=InternetGatewayDevice.X_HW_Security.WLANMacFilter&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp`;

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
      throw new Error(
        `Failed to enable WLAN MAC filter, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error enabling WLAN MAC filter:", error);
    throw error; // Re-throw to handle it in the calling function if necessary
  }
};

export default enableWlanMacFilter;
