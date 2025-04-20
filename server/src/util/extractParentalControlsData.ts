import { ParentalControlsData, Template, Restriction } from "../../../shared/types/ParentalControls";

import { Device } from "../../../shared/types/Device";

const extractParentalControlsData = (htmlContent: string, logList?: boolean): ParentalControlsData => {
    const childListRegex = /new ChildListClass\("InternetGatewayDevice[^"]*","(.*?)","(.*?)","(\d+)"\)/g;
    const templatesListRegex = /new TemplatesListClass\("InternetGatewayDevice[^"]*","(.*?)"/g;
    const statsListRegex = /new StatsListClass\("InternetGatewayDevice[^"]*","\d+","(\d+)"/;
    const durationListRegex = /new DurationListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.Templates\.(\d+)\.Duration\.(\d+)","([\d\\x3a]+)","([\d\\x3a]+)","([\d\\x2c]+)"\)/g;

    const decodeString = (str: string): string => decodeURIComponent(str.replace(/\\x/g, "%"));

    const deviceList: Device[] = [];
    const templates: Template[] = [];
    const tempTemplateNames: string[] = [];
    const timeRestrictionsMap: Record<number, Restriction[]> = {};
    let connectionAttempts = 0;

    // Extract template names
    let templateMatch;
    while ((templateMatch = templatesListRegex.exec(htmlContent)) !== null) {
        tempTemplateNames.push(decodeString(templateMatch[1]));
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
            const macAddress = match[1].replace(/\\x3a/g, ":");
            const description = decodeString(match[2]);
            const templateId = parseInt(match[3], 10);

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
                parentalControlRestrictionApplied: true
            });
        }

        // Extract restrictions
        while ((match = durationListRegex.exec(htmlContent)) !== null) {
            const templateIndex = parseInt(match[1], 10) - 1;
            const startTime = parseInt(match[3].replace(/\\x3a/g, ""), 10);
            const endTime = parseInt(match[4].replace(/\\x3a/g, ""), 10);
            const repeatDays = match[5].replace(/\\x2c/g, ",").split(",").map(Number);

            if (!timeRestrictionsMap[templateIndex]) {
                timeRestrictionsMap[templateIndex] = [];
            }

            timeRestrictionsMap[templateIndex].push({
                startTime,
                endTime,
                repeatDays
            });
        }

        // Combine templates
        tempTemplateNames.forEach((name, index) => {
            templates.push({
                id: index + 1,
                name,
                restrictions: timeRestrictionsMap[index] || [],
                devices: []
            });
        });

        // Assign devices to templates
        deviceList.forEach(device => {
            const templateId = device.templateId;
            if (templateId && templates[templateId - 1]) {
                templates[templateId - 1].devices.push(device);
            }
        });

        if (logList) {
            console.log(`Extracted Data: ${JSON.stringify({ templates, connectionAttempts, devices: deviceList })}`);
        }

        return { templates, connectionAttempts };
    } catch (error) {
        console.error("Error parsing the parental controls data:", error);
        return { templates: [], connectionAttempts: 0 };
    }
};

export default extractParentalControlsData;