/* 
    ! This is to encode strings for the modem.  
    ! decodeURIComponent() Does not work for the modem because it doesn't follow standard practices
    ! spaces encoded as +, and symbols like : as x3a, etc.
*/

const customModemDecode = (input: string): string => {
    return input
        .replace(/\\x3a/g, ":") // "x3a" becomes ":"
        .replace(/\\x2d/g, "-") // "x2d" becomes "-"
        .replace(/\+/g, " ") // "+" becomes space
        .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16)) // Convert remaining hex codes
        );
}

export default customModemDecode;
