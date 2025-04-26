// Types
import { ParentalControlsData } from "../../../../shared/types/ParentalControls";
import { Device } from "../../../../shared/types/Device";

/**
 * Extracts the devices from the parental controls data.
 * @param {ParentalControlsData} parentalControlsData - The parental controls data.
 * @returns {Device[]} The list of devices.
*/

const extractParentalControlsDevicesFromTemplates = (
    parentalControlsData: ParentalControlsData | null,
): Device[] => {
    if (!parentalControlsData) {
        return [];
    }

    const parentalControlsDevices: Device[] = [];

    for (const template of parentalControlsData.templates) {
        if (template.devices) {
            /* 
              ? I know nested loops are not performant but it's needed here for now, will possibly refactor
            */

            for (const nestedDevice of template.devices) {
                parentalControlsDevices.push(nestedDevice);
            }
        }
    }

    return parentalControlsDevices
};

export default extractParentalControlsDevicesFromTemplates;