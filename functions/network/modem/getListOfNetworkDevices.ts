import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define a type for a single DHCP device
interface DHCPDevice {
  devtype: string;
  ip: string;
  domain: string;
  name: string;
  mac: string;
  remaintime: string;
  interfacetype: string;
  AddressSource: string;
  ConnectedTime: string;
}

// Function to extract and parse the UserDhcpinfo array
const extractDHCPInfo = (responseText: string): DHCPDevice[] => {
  try {
    // Create a temporary function to capture the UserDhcpinfo array
    const extractArray = new Function(`
        ${responseText}
        return UserDhcpinfo;
      `);

    // Execute the function to get the array and filter out null values
    const dhcpInfoArray: DHCPDevice[] = extractArray().filter(
      (item: any) => item !== null
    );

    return dhcpInfoArray;
  } catch (error) {
    console.error("Error extracting DHCP info:", error);
    return [];
  }
};

// Function to fetch and process DHCP info
const getListOfNetworkDevices = async (): Promise<DHCPDevice[]> => {
  const url = `${ROUTER_IP}/html/bbsp/common/GetLanUserDhcpInfo.asp`;

  try {
    const response = await fetchData(url, {
      method: "POST",
      credentials: "include", // Ensure authentication is handled with cookies
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Requested-With": "XMLHttpRequest",
      },
      referrer: `${ROUTER_IP}/html/bbsp/userdevinfo/userdevinfo.asp`,
    });

    const responseText = await response.text();

    // Extract and parse the DHCP info
    const dhcpInfoArray = extractDHCPInfo(responseText);

    // Log the DHCP info as a JSON string for debugging
    const dhcpInfoJSON = JSON.stringify(dhcpInfoArray, null, 2);
    console.log("DHCP Info JSON:", dhcpInfoJSON);

    return dhcpInfoArray;
  } catch (error) {
    console.error("Error fetching DHCP info:", error);
    return [];
  }
};

// Export the function for use in other parts of the application
export default getListOfNetworkDevices;
