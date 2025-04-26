/**
 * Converts a time in 24-hour format to a time in 12-hour format (0600 => 6:00 AM).
 * @param {number} time - The time in 24-hour format.
 * @returns {string} - The time in 12-hour format.
*/

const convertTo12HourFormat = (time: number): string => {
    if (time < 0 || time > 2359 || time % 100 >= 60) {
        throw new Error('Invalid time format. Expected HHMM as a number.');
    }

    const hour = Math.floor(time / 100); // Extract hours
    const minute = time % 100; // Extract minutes

    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12; // Convert 0/12 to 12 for AM/PM format
    const amPm = isPM ? 'PM' : 'AM';

    return `${hour12}:${minute.toString().padStart(2, '0')} ${amPm}`;
};

export default convertTo12HourFormat;
