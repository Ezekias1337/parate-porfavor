// Types
import { RestrictionTime } from "../components/page-specific/parental-controls/SchedulePeriodSelector";

/**
 * Converts a time in 24-hour format to a RestrictionTime object.
 * @param {number} time - The time in 24-hour format.
 * @returns {RestrictionTime} - The RestrictionTime object.
*/

const convertToRestrictionTimeType = (time: number): RestrictionTime => {
    if (time < 0 || time > 2359 || time % 100 >= 60) {
        throw new Error('Invalid time format. Expected HHMM as a number.');
    }

    const hour = Math.floor(time / 100); // Extract hours
    const minute = time % 100; // Extract minutes

    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12; // Convert 0/12 to 12 for AM/PM format
    const amPm = isPM ? 'PM' : 'AM';

    const objToReturn: RestrictionTime = {
        time: `${hour12}:${minute.toString().padStart(2, '0')}`,
        amOrPm: amPm
    }

    return objToReturn;
};

export default convertToRestrictionTimeType;
