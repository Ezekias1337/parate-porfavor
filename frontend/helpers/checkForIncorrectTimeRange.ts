const getMinutesSinceMidnight = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
const checkForIncorrectTimeRange = (startTime: string, endTime: string): boolean => {
    const startMinutes = getMinutesSinceMidnight(startTime);
    const endMinutes = getMinutesSinceMidnight(endTime);
  
    return startMinutes > endMinutes;
}  

export default checkForIncorrectTimeRange