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
    const deviceList: Device[] = [];
    let match;

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

        // Remove duplicate entries based on macAddr
        const uniqueDevices = Array.from(
            new Map(deviceList.map(device => [device.macAddr, device])).values()
        );

        // Sort devices: Online first, then Offline
        const sortedDevices = uniqueDevices.sort((a, b) => {
            if (a.onlineStatus === "Online" && b.onlineStatus === "Offline") {
                return -1;
            } else if (a.onlineStatus === "Offline" && b.onlineStatus === "Online") {
                return 1;
            } else {
                // If both have the same status, prefer ETH over WIFI
                if (a.connectionType === "ETH" && b.connectionType === "WIFI") {
                    return -1;
                } else if (a.connectionType === "WIFI" && b.connectionType === "ETH") {
                    return 1;
                }
                return 0;
            }
        });

        if (logList) {
            console.log(`Device list extracted: ${JSON.stringify(sortedDevices, null, 2)}`);
        }

        return sortedDevices;
    } catch (error) {
        console.error('Error parsing the HTML content:', error);
        return null;
    }
};

export default extractDeviceList;
