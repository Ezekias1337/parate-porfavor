// Types
import { ParentalControlsData, Template, Restriction } from "../../../shared/types/ParentalControls";
import { Device } from "../../../shared/types/Device";

/**
 * Extracts the parental controls data from the HTML or ASP file content.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logList - Optional flag to log the extracted device list.
 * @returns {ParentalControlsData} - The extracted parental controls data.
 *
*/

const extractParentalControlsData = (htmlContent: string, logList?: boolean): ParentalControlsData => {
    const childListRegex = /new ChildListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.MAC\.(\d+)","(.*?)","(.*?)","(\d+)"\)/g;
    const templatesListRegex = /new TemplatesListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.Templates\.(\d+)","(.*?)"/g;
    const statsListRegex = /new StatsListClass\("InternetGatewayDevice[^"]*","\d+","(\d+)"/;
    const durationListRegex = /new DurationListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.Templates\.(\d+)\.Duration\.(\d+)","([\d\\x3a]+)","([\d\\x3a]+)","([\d\\x2c]+)"\)/g;

    const decodeString = (str: string): string => decodeURIComponent(str.replace(/\\x/g, "%"));

    const deviceList: Device[] = [];
    const templates: Template[] = [];
    const tempTemplateNames: Record<number, string> = {};
    const timeRestrictionsMap: Record<number, Restriction[]> = {};
    let connectionAttempts = 0;

    // Extract template names
    let templateMatch;
    while ((templateMatch = templatesListRegex.exec(htmlContent)) !== null) {
        const templateId = parseInt(templateMatch[1], 10);
        const templateName = decodeString(templateMatch[2]);
        tempTemplateNames[templateId] = templateName;
    }

    // Extract connection attempts
    const statsMatch = statsListRegex.exec(htmlContent);
    if (statsMatch) {
        connectionAttempts = parseInt(statsMatch[1], 10);
    }

    try {
        // Extract devices
        let match;
        while ((match = childListRegex.exec(htmlContent)) !== null) {
            const macIndex = parseInt(match[1], 10);
            const macAddress = match[2].replace(/\\x3a/g, ":");
            const description = decodeString(match[3]);
            const templateId = parseInt(match[4], 10);
        
            deviceList.push({
                domain: "",
                ipAddress: "",
                macAddr: macAddress,
                hostName: "",
                onlineStatus: "Unknown",
                connectionType: "Unknown",
                ssid: "Unknown",
                description,
                templateId,
                parentalControlRestrictionApplied: true,
                macIndex
            });
        }
        

        // Extract restrictions
        while ((match = durationListRegex.exec(htmlContent)) !== null) {
            const templateId = parseInt(match[1], 10);
            const restrictionId = parseInt(match[2], 10);
            const startTime = parseInt(match[3].replace(/\\x3a/g, ""), 10);
            const endTime = parseInt(match[4].replace(/\\x3a/g, ""), 10);
            const repeatDays = match[5].replace(/\\x2c/g, ",").split(",").map(Number);

            if (!timeRestrictionsMap[templateId]) {
                timeRestrictionsMap[templateId] = [];
            }

            timeRestrictionsMap[templateId].push({
                id: restrictionId,
                startTime,
                endTime,
                repeatDays
            });
        }

        // Combine templates
        Object.entries(tempTemplateNames).forEach(([idStr, name]) => {
            const id = parseInt(idStr, 10);
            templates.push({
                id,
                name,
                restrictions: timeRestrictionsMap[id] || [],
                devices: []
            });
        });

        // Assign devices to templates
        deviceList.forEach(device => {
            const templateId = device.templateId;
            const template = templates.find(t => t.id === templateId);
            if (template) {
                template.devices.push(device);
            }
        });

        if (logList) {
            console.log(`Extracted Data: ${JSON.stringify({ templates, connectionAttempts, devices: deviceList }, null, 2)}`);
        }

        return { templates, connectionAttempts };
    } catch (error) {
        console.error("Error parsing the parental controls data:", error);
        return { templates: [], connectionAttempts: 0 };
    }
};

export default extractParentalControlsData;
