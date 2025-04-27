// Types
import { ParentalControlsData } from "../../shared/types/ParentalControls"

/**
 * Checks if there are any valid restrictions in the parental controls data.
 * @param {ParentalControlsData} parentalControls - The parental controls data.
 * @returns {boolean} - True if there are no valid restrictions, false otherwise.
*/

const checkForLackOfRestrictions = (parentalControls: ParentalControlsData): boolean => {
    let hasLackOfRestrictions = true;

    for (const template of parentalControls.templates) {
        if (template.restrictions.length > 0) {
            hasLackOfRestrictions = false;
            break;
        }
    }

    return hasLackOfRestrictions
}

export default checkForLackOfRestrictions