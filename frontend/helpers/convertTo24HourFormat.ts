// Types
import { RestrictionTime } from "../components/page-specific/parental-controls/SchedulePeriodSelector";

/**
 * Converts a time in 12-hour format to 24-hour format and verifies that the time is valid.
 * @param {RestrictionTime} restrictionTime - The time in 12-hour format.
 * @returns {string} - The time in 24-hour format.
*/

const convertTo24HourFormat = (restrictionTime: RestrictionTime): string => {
    const { time, amOrPm } = restrictionTime;
    
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours);
    let formattedMinutes = parseInt(minutes);
    
    /* 
        ! Error handling
    */
    if (isNaN(formattedHours) || isNaN(formattedMinutes)) {
        throw new Error('You can only enter a time in the format HH:MM');
    }   
    if (formattedMinutes < 0 || formattedMinutes > 59) {
        throw new Error('Minutes must be between 0 and 59');
    }
    if (formattedHours < 0 || formattedHours > 23) {
        throw new Error('Hours must be between 0 and 23');
    }
    if (amOrPm !== 'AM' && amOrPm !== 'PM') {
        throw new Error('AM or PM must be provided');
    }
    if (amOrPm === 'AM' && formattedHours > 12) {
        throw new Error('AM hours must be between 1 and 12');
    }
    if (amOrPm === 'PM' && formattedHours > 12) {
        throw new Error('PM hours must be between 1 and 12');
    }

    /* 
        ! If data provided is good, proceed
    */
    
    if (amOrPm === 'PM' && formattedHours !== 12) {
        formattedHours += 12;
    } else if (amOrPm === 'AM' && formattedHours === 12) {
        formattedHours = 0;
    }

    return `${formattedHours.toString().padStart(2, '0')}:${minutes}`;
};

export default convertTo24HourFormat;
