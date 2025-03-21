import { ParentalControlsDevice, ParentalControlsData, TimeRestriction } from "../../../shared/types/ParentalControls";

/**
 * Extracts parental controls data from HTML/ASP file content, including devices, templates, and time restrictions.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logList - Optional flag to log the extracted data.
 * @returns {ParentalControlsData} - An object containing templates, connection attempts, devices, and time restrictions.
 */
const extractParentalControlsData = (htmlContent: string, logList?: boolean): ParentalControlsData => {
    
    /* 
        Current problems: 
        The devices array doesn't specify which template the device is associated with.
        The start and end date of the template is not being parsed and sent.
        Need to investigate every parameter of DurationListArray to figure out what the numbers for Templates.1 and Duration.1 are
        The indeces of timeRestrictions should just be Objects, but they have an array nested inside:
        
        "timeRestrictions": {
    "1": [
      {
        "startTime": 1600,
        "endTime": 2200,
        "repeatDays": [
          7,
          1,
          2,
          3,
          5
        ]
      }
    ],
    "2": [
      {
        "startTime": 800,
        "endTime": 1000,
        "repeatDays": [
          1,
          2
        ]
      }
    ]
  }
    
  should become:
  
  "timeRestrictions": [
    "index": 1
    "startTime": 1600,
    "endTime": 2200,
    "repeatDays": [
        7,
        1,
        2,
        3,
        5
    ],
    
    "index": 2
    "startTime": 1600,
    "endTime": 2200,
    "repeatDays": [
        7,
        1,
        2,
        3,
        5
    ],
  
  ]
    */
   
    const childListRegex = /new ChildListClass\("InternetGatewayDevice[^"]*","(.*?)","(.*?)","(\d+)"\)/g;
    const templatesListRegex = /new TemplatesListClass\("InternetGatewayDevice[^"]*","(.*?)"/g;
    const statsListRegex = /new StatsListClass\("InternetGatewayDevice[^"]*","\d+","(\d+)"/;
    const durationListRegex = /new DurationListClass\("InternetGatewayDevice\.X_HW_Security\.ParentalCtrl\.Templates\.(\d+)\.Duration\.\d+","([\d\\x3a]+)","([\d\\x3a]+)","([\d\\x2c]+)"\)/g;

    let match;
    const deviceList: ParentalControlsDevice[] = [];
    const templateNames: string[] = [];
    let connectionAttempts = 0;
    const timeRestrictions: Record<string, TimeRestriction[]> = {}; // Maps template IDs to time restrictions

    // Extract template names
    let templateMatch;
    while ((templateMatch = templatesListRegex.exec(htmlContent)) !== null) {
        templateNames.push(templateMatch[1]);
    }

    // Extract connection attempts (single value)
    const statsMatch = statsListRegex.exec(htmlContent);
    if (statsMatch) {
        connectionAttempts = parseInt(statsMatch[1], 10);
    }

    try {
        while ((match = childListRegex.exec(htmlContent)) !== null) {
            const macAddress = match[1].replace(/\\x3a/g, ":");
            const description = decodeURIComponent(match[2]);

            deviceList.push({
                domain: "",
                ipAddress: "",
                macAddr: macAddress,
                hostName: "",
                onlineStatus: "Unknown",
                connectionType: "Unknown",
                ssid: "Unknown",
                description: description
            });
        }

        // Extract time restrictions from DurationListArray
        while ((match = durationListRegex.exec(htmlContent)) !== null) {
            const templateId = match[1]; // Extracts the template ID
            const startTimeStr = match[2].replace(/\\x3a/g, ""); // Remove colons
            const endTimeStr = match[3].replace(/\\x3a/g, ""); // Remove colons
            const repeatDays = match[4].replace(/\\x2c/g, ",").split(",").map(day => parseInt(day, 10)); // Convert repeat days to an array
        
            const startTime = parseInt(startTimeStr, 10);
            const endTime = parseInt(endTimeStr, 10);
        
            if (!timeRestrictions[templateId]) {
                timeRestrictions[templateId] = [];
            }
        
            timeRestrictions[templateId].push({
                startTime,
                endTime,
                repeatDays,
            });
        }

        if (logList) {
            console.log(`Extracted Data: ${JSON.stringify({ templates: templateNames, connectionAttempts, devices: deviceList, timeRestrictions })}`);
        }

        return { templates: templateNames, connectionAttempts, devices: deviceList, timeRestrictions };
    } catch (error) {
        console.error("Error parsing the parental controls data:", error);
        return { templates: [], connectionAttempts: 0, devices: [], timeRestrictions: {} };
    }
};

export default extractParentalControlsData;
