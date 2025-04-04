/* 
    ! This is to encode strings for the modem.  
    ! encodeURIComponent() Does not work for the modem because it doesn't follow standard practices
    ! spaces encoded as +, and symbols like : as x3a, etc.
*/

const customModemEncode = (input: string): string => {
    return input
        .replace(/[^a-zA-Z0-9:\- ]/g, "") // Remove only non-standard characters, KEEP spaces
        .replace(/ /g, "+") // Convert spaces to "+"
        .replace(/:/g, "%3A"); // Convert ":" to "%3A"
};



export default customModemEncode;
