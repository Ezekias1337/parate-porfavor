// Types
import { Device } from "../../../shared/types/Device";

/**
 * Extracts the user device list from the HTML or ASP file content.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logList - Optional flag to log the extracted device list.
 * @returns {Device[] | null} - The extracted device list or null if not found.
*/

const extractDeviceList = (htmlContent: string, logList?: boolean): Device[] | null => {
    const deviceRegex = /new USERDeviceNew\("(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)"\)/g;
    let match;
    const deviceList: Device[] = [];

    try {
        while ((match = deviceRegex.exec(htmlContent)) !== null) {
            deviceList.push({
                domain: match[1],
                ipAddress: match[2].replace(/\\x2e/g, "."), // Convert encoded IP address
                macAddr: match[3].replace(/\\x3a/g, ":"), // Convert encoded MAC address
                hostName: decodeURIComponent(match[11].replace(/\\x2d/g, "-")), // Decode hostnames
                onlineStatus: match[8] === "Online" ? "Online" : "Offline",
                connectionType: match[9] === "ETH" ? "ETH" : "WIFI",
                ssid: match[5].replace(/([a-zA-Z])(\d+)$/, '$1-$2'),
                macFiltered: false,
                parentalControlRestrictionApplied: false
            });
        }
        
        const deDupedArray = [...new Set(deviceList)];
        const onlineDevices = deDupedArray.filter(device => device.onlineStatus === "Online");

        const deviceListSortedByConnectionType = onlineDevices.sort((a, b) => {
            if (a.connectionType === "ETH" && b.connectionType === "WIFI") {
                return -1;
            } else if (a.connectionType === "WIFI" && b.connectionType === "ETH") {
                return 1;
            }
            return 0;
        })

        if (logList) {
            console.log(`Device list extracted: ${JSON.stringify(deviceListSortedByConnectionType)}`);
        }
        return deviceListSortedByConnectionType;
    } catch (error) {
        console.error('Error parsing the HTML content:', error);
        return null;
    }
};

export default extractDeviceList;
