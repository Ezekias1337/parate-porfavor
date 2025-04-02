import { Device } from "../../../shared/types/Device";

/**
 * Extracts MAC filter list from HTML/ASP file content.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logList - Optional flag to log the extracted device list.
 * @returns {Device[] | null} - The extracted device list or null if not found.
 */
const extractMacFilterList = (htmlContent: string, logList?: boolean): Device[] | null => {
    const macFilterRegex = /new stMacFilter\("(.*?)","(.*?)","(.*?)","(.*?)"\)/g;
    let match;
    const deviceList: Device[] = [];

    try {
        while ((match = macFilterRegex.exec(htmlContent)) !== null) {
            deviceList.push({
                domain: "", // No domain available in this format
                ipAddress: "", // Not provided in the mac filter list
                macAddr: match[4].replace(/\\x3a/g, ":"), // Convert encoded MAC address
                hostName: decodeURIComponent(match[3]).replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))), // Device Name (e.g., Chromecast)
                onlineStatus: "Unknown", // Not specified in this format
                connectionType: "WIFI", // Not specified in this format
                ssid: match[2].replace(/\\x2d/g, "-") // Convert SSID encoding
            });
        }

        if (logList) {
            console.log(`MAC Filter list extracted: ${JSON.stringify(deviceList)}`);
        }
        return deviceList.length > 0 ? deviceList : null;
    } catch (error) {
        console.error('Error parsing the MAC filter list:', error);
        return null;
    }
};

export default extractMacFilterList;
