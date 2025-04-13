// Types
import { ParentalControlsDevice, ParentalControlsData } from "../../../../shared/types/ParentalControls";

const extractParentalControlsDevicesFromTemplates = (
    parentalControlsData: ParentalControlsData | null,
): ParentalControlsDevice[] => {
    if (!parentalControlsData) {
        return [];
    }

    const parentalControlsDevices: ParentalControlsDevice[] = [];

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