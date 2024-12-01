import fetchData from "../fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define the response type (we'll check for status 200)
interface AddTimePeriodResponse {
  status: number;
}

const addTimePeriodToParentalControls = async (
  startTime: string,
  endTime: string,
  repeatDays: string, // A string of comma-separated days (e.g., "7,1,2,3,4,5,6")
  token: string,
  isWholeDay: boolean = false // Optional flag for Whole Day, Every Day
): Promise<AddTimePeriodResponse> => {
  const baseUrl = `${ROUTER_IP}/html/bbsp/parentalctrl/`;

  // Depending on whether it's a "whole day" setting or a custom time range, determine the URL and body.
  const url = isWholeDay
    ? `${baseUrl}add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2.Duration&y=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2&RequestFile=html/ipv6/not_find_file.asp`
    : `${baseUrl}set.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2.Duration.1&y=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2&RequestFile=html/ipv6/not_find_file.asp`;

  const body = `x.StartTime=${encodeURIComponent(
    startTime
  )}&x.EndTime=${encodeURIComponent(endTime)}&x.RepeatDay=${encodeURIComponent(
    repeatDays
  )}&y.DurationRight=0&y.DurationPolicy=0&x.X_HW_Token=${encodeURIComponent(
    token
  )}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Priority: "u=0",
  };

  // Using the ROUTER_IP variable for the referrer
  const referrer = `${ROUTER_IP}/html/bbsp/parentalctrl/parentalctrltime.asp?TemplateId=2&FlagStatus=EditTemplate`;

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
        `Failed to add time period to parental controls, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error adding time period to parental controls:", error);
    throw error; // Re-throw to handle it in the calling function if necessary
  }
};

export default addTimePeriodToParentalControls;
