/**
 * Generates a random ID of the specified length.   
 * @param length The length of the random ID to be generated. Default is 16.
 * @returns A random ID string.
 */

const generateRandomId = (length = 16): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default generateRandomId;
