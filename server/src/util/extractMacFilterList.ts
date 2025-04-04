import { Device } from "../../../shared/types/Device";

/**
 * Extracts MAC filter list from HTML/ASP file content.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logList - Optional flag to log the extracted device list.
 * @returns {Device[] | null} - The extracted device list or null if not found.
 */
const extractMacFilterList = (htmlContent: string, logList?: boolean): Device[] | null => {
    const macFilterRegex = /new stMacFilter\("(.*?)","(.*?)","(.*?)"(?:,"(.*?)")?\)/g;
    let match;
    const deviceList: Device[] = [];

    try {
        while ((match = macFilterRegex.exec(htmlContent)) !== null) {
            // Determine whether match[3] is a MAC address or a hostname
            const isMacAddress = match[3].includes("\\x3a");
            const macAddr = match[4] || match[2]; // Use match[4] if available; otherwise, use match[2]
            const hostName = isMacAddress ? macAddr.replace(/\\x3a/g, ":") : 
                decodeURIComponent(match[3]).replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
            const isEthernet = match[2].includes("\\x2d") ? false : true;

            deviceList.push({
                domain: "",
                ipAddress: "",
                macAddr: macAddr.replace(/\\x3a/g, ":"), // Convert MAC address format
                hostName, // Either the hostname or the MAC address if unavailable
                onlineStatus: "Unknown",
                connectionType: isEthernet ? "ETH" : "WIFI",
                ssid: isEthernet ? "" : match[2].replace(/\\x2d/g, "-"), // SSID only applies to WLAN format
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