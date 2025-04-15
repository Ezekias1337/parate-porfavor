import {  ParentalControlsData, Template } from "../../../shared/types/ParentalControls";

import { Device } from "../../../shared/types/Device";

const extractParentalControlsData = (htmlContent: string, logList?: boolean): ParentalControlsData => {
    const childListRegex = /new ChildListClass\("InternetGatewayDevice[^"]*","(.*?)","(.*?)","(\d+)"\)/g;
    const templatesListRegex = /new TemplatesListClass\("InternetGatewayDevice[^"]*","(.*?)"/g;
    const statsListRegex = /new StatsListClass\("InternetGatewayDevice[^"]*","\d+","(\d+)"/;
    const durationListRegex = /new DurationListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.Templates\.(\d+)\.Duration\.(\d+)","([\d\\x3a]+)","([\d\\x3a]+)","([\d\\x2c]+)"\)/g;

    let match;
    const deviceList: Device[] = [];
    const templates: Template[] = [];
    let connectionAttempts = 0;
    const tempTemplateNames: string[] = [];
    const timeRestrictionsMap: Record<number, Omit<Template, "id" | "name">> = {};

    // Function to decode encoded strings like "Test\\x202" → "Test 2"
    const decodeString = (str: string): string => {
        return decodeURIComponent(str.replace(/\\x/g, "%"));
    };

    // Extract template names
    let templateMatch;
    while ((templateMatch = templatesListRegex.exec(htmlContent)) !== null) {
        tempTemplateNames.push(decodeString(templateMatch[1])); // Decode template names
    }

    // Extract connection attempts (single value)
    const statsMatch = statsListRegex.exec(htmlContent);
    if (statsMatch) {
        connectionAttempts = parseInt(statsMatch[1], 10);
    }

    try {
        while ((match = childListRegex.exec(htmlContent)) !== null) {
            const macAddress = match[1].replace(/\\x3a/g, ":");
            const description = decodeString(match[2]); // Decode device descriptions
            const templateId = parseInt(match[3], 10); // 1-based template ID

            deviceList.push({
                domain: "",
                ipAddress: "",
                macAddr: macAddress,
                hostName: "",
                onlineStatus: "Unknown",
                connectionType: "Unknown",
                ssid: "Unknown",
                description: description,
                templateId: templateId,
                parentalControlRestrictionApplied: true
            });
        }

        // Extract time restrictions from DurationListArray
        while ((match = durationListRegex.exec(htmlContent)) !== null) {
            const templateIndex = parseInt(match[1], 10) - 1; // Convert 1-based index to 0-based
            const startTimeStr = match[3].replace(/\\x3a/g, "");
            const endTimeStr = match[4].replace(/\\x3a/g, "");
            const repeatDays = match[5].replace(/\\x2c/g, ",").split(",").map(day => parseInt(day, 10));

            timeRestrictionsMap[templateIndex] = {
                startTime: parseInt(startTimeStr, 10),
                endTime: parseInt(endTimeStr, 10),
                repeatDays,
                devices: []
            };
        }

        // Combine template names with their respective time restrictions
        tempTemplateNames.forEach((name, index) => {
            templates.push({
                id: index + 1, // Keep it 1-based
                name,
                ...timeRestrictionsMap[index], // Merge the time restriction data
            });
        });

        // Combine template names with their respective associated devices
        deviceList.forEach(device => {
            const templateId = device.templateId;
            if (templateId) {
                templates[templateId - 1].devices.push(device);
            }
        })

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
