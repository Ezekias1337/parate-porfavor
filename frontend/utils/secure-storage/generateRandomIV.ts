// Library Imports
import * as Crypto from "expo-crypto";

/**
 * Helper function to generate a random IV using expo-crypto
 * @param {number} length - The length of the IV to generate
 * @returns {Uint8Array} - The generated IV
*/
const generateRandomIV = (length: number): Uint8Array => {
  return Crypto.getRandomBytes(length); // Returns a Uint8Array
};

export default generateRandomIV;
