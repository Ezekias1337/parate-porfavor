// Library Imports
import * as expoRandom from "expo-random";

/**
 * Helper function to generate a random IV using expo-random
 * @param {number} length - The length of the IV to generate
 * @returns {Uint8Array} - The generated IV
*/

const generateRandomIV = (length: number): Uint8Array => {
  return expoRandom.getRandomBytes(length); // Returns a Uint8Array
};

export default generateRandomIV;