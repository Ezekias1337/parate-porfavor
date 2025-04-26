// Constants
import daysMap from "../../../constants/Days";
// Types
import { Restriction } from "../../../../shared/types/ParentalControls";

/**
 * Creates a string representation of the days of the week for a given restriction.
 * @param {Restriction} restriction - The restriction object containing the days of the week.
 * @param {(key: string) => string} translate - The translation function.
 * @returns {string} - The string representation of the days of the week.
*/


interface createDayStringProps {
    restriction: Restriction
    translate: (key: string) => string
}

const createDayString = ({ restriction, translate }: createDayStringProps): string => {
    const arrayOfDays: string[] = [];

    for (const day of restriction.repeatDays) {
        let dayName = daysMap.get(day);
        if (dayName) {
            arrayOfDays.push(translate(dayName));
        }
    }

    return arrayOfDays.join(", ");
}

export default createDayString