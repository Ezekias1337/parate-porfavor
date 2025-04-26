/**
 * Gets the minutes since midnight for a given time.
 * @param {string} time - The time in HH:MM format.
 * @returns {number} - The number of minutes since midnight.
*/

const getMinutesSinceMidnight = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Checks if the start time is greater than the end time.
 * @param {string} startTime - The start time in HH:MM format.
 * @param {string} endTime - The end time in HH:MM format.
 * @returns {boolean} - True if the start time is greater than the end time, false otherwise.
*/

const checkForIncorrectTimeRange = (startTime: string, endTime: string): boolean => {
  const startMinutes = getMinutesSinceMidnight(startTime);
  const endMinutes = getMinutesSinceMidnight(endTime);

  return startMinutes > endMinutes;
}

export default checkForIncorrectTimeRange